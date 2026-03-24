import ocpLogo from "@/assets/clients/ocp.png";
import centraleDanoneLogo from "@/assets/clients/centrale-danone.jpg";
import addLogo from "@/assets/clients/add.png";
import ministereSanteLogo from "@/assets/clients/ministere-sante.png";
import um6ssLogo from "@/assets/clients/um6ss.jpg";
import hopitalMohammedViLogo from "@/assets/clients/hopital-mohammed-vi.png";
import avisaPartnersLogo from "@/assets/clients/avisa-partners.jpg";
import ceisLogo from "@/assets/clients/ceis.png";
import gingerLogo from "@/assets/clients/ginger-international.png";
import presidenceSenegalLogo from "@/assets/clients/presidence-senegal.png";
import cidcLogo from "@/assets/clients/cidc.png";
import rajaLogo from "@/assets/clients/raja-club-athletic.jpg";

const clients = [
  { name: "OCP", logo: ocpLogo },
  { name: "Centrale Danone", logo: centraleDanoneLogo },
  { name: "ADD", logo: addLogo },
  { name: "Ministère de la Santé", logo: ministereSanteLogo },
  { name: "UM6SS", logo: um6ssLogo },
  { name: "Hôpital Universitaire International Mohammed VI", logo: hopitalMohammedViLogo },
  { name: "Avisa Partners", logo: avisaPartnersLogo },
  { name: "CEIS", logo: ceisLogo },
  { name: "Ginger International", logo: gingerLogo },
  { name: "Présidence du Sénégal", logo: presidenceSenegalLogo },
  { name: "CIDC", logo: cidcLogo },
  { name: "Raja Club Athletic", logo: rajaLogo },
];

const ClientProofStrip = () => {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-10 px-12 py-6"
      style={{ background: "hsl(var(--navy))" }}
    >
      {clients.map((client) => (
        <img
          key={client.name}
          src={client.logo}
          alt={client.name}
          className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  );
};

export default ClientProofStrip;
