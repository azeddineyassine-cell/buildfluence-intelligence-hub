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
    <div className="overflow-hidden bg-white py-8">
      <div className="marquee-track flex w-max items-center gap-16">
        {/* Render logos twice for seamless loop */}
        {[...clients, ...clients].map((client, i) => (
          <img
            key={`${client.name}-${i}`}
            src={client.logo}
            alt={client.name}
            className="h-10 w-auto flex-shrink-0 object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ClientProofStrip;
