import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Status = "idle" | "loading" | "none" | "pending" | "sent" | "error";

export const useInvitationRequest = () => {
  const { session } = useAuth();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const uid = session?.user?.id ?? null;

  useEffect(() => {
    if (!uid) {
      setStatus("none");
      return;
    }
    setStatus("loading");
    (async () => {
      const { data, error: err } = await (supabase as unknown as {
        from: (t: string) => {
          select: (c: string) => {
            eq: (k: string, v: string) => {
              eq: (k: string, v: string) => {
                maybeSingle: () => Promise<{ data: { id: string } | null; error: unknown }>;
              };
            };
          };
        };
      })
        .from("invitation_requests")
        .select("id")
        .eq("user_id", uid)
        .eq("status", "pending")
        .maybeSingle();
      if (err) {
        setStatus("error");
        setError(String((err as { message?: string })?.message ?? err));
        return;
      }
      setStatus(data ? "pending" : "none");
    })();
  }, [uid]);

  const submit = async () => {
    if (!uid) return;
    setStatus("loading");
    setError(null);
    const { error: err } = await (supabase as unknown as {
      from: (t: string) => { insert: (row: Record<string, unknown>) => Promise<{ error: unknown }> };
    })
      .from("invitation_requests")
      .insert({ user_id: uid, status: "pending" });
    if (err) {
      setStatus("error");
      setError(String((err as { message?: string })?.message ?? err));
      return;
    }
    setStatus("sent");
  };

  return { status, error, submit };
};
