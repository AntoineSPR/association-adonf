import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FacebookIcon,
      url: "https://www.facebook.com/AssociationADonf/",
      label: "Facebook",
    },
    {
      icon: InstagramIcon,
      url: "https://www.instagram.com/association_adonf/",
      label: "Instagram",
    },
    {
      icon: YoutubeIcon,
      url: "https://www.youtube.com/@rockschooladonf7634",
      label: "YouTube",
    },
  ];

  const footerLinks = [
    { label: "Accueil", route: "/" },
    { label: "Association", route: "/association" },
    { label: "Contacts", route: "/contacts" },
    { label: "Plan d'accès", route: "/plan-acces" },
    {
      label: "Politique de confidentialité",
      route: "/politique-confidentialite",
    },
    { label: "Mentions légales", route: "/mentions-legales" },
    { label: "CGV / Statuts", route: "/cgv-statuts" },
    { label: "Partenaires", route: "/partenaires" },
  ];

  return (
    <footer className="bg-[#1a1a1a] py-6 px-4 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Footer Top Content */}
        <div className="flex flex-col min-[961px]:flex-row min-[961px]:justify-between items-center gap-8 mb-8">
          {/* Logo Section - Hidden on screens narrower than 961px */}
          <div className="hidden min-[961px]:block footer-logo">
            <a href="/" className="no-underline">
              <img
                src="/assets/logo-adonf.png"
                alt="Accueil"
                className="w-[200px] h-auto"
                style={{ width: "200px" }}
              />
            </a>
          </div>

          {/* Main Content (Socials + Links) */}
          <div className="flex flex-col gap-6 max-w-[600px] items-center w-full min-[961px]:w-auto">
            {/* Social Section */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dc143c] transition-colors duration-300 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>

            {/* Links Section */}
            <nav>
              <ul className="flex flex-wrap gap-8 justify-center list-none p-0 m-0">
                {footerLinks.map((link) => (
                  <li key={link.route}>
                    <a
                      href={link.route}
                      className="text-[#ccc] no-underline transition-colors duration-300 hover:text-[#dc143c]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Address Section */}
          <div className="text-center">
            <p className="text-[#ccc] leading-[1.6] m-0">
              <strong>Association Adonf</strong>
              <br />
              29 avenue de Onda
              <br />
              17130 Montendre
              <br />
              Tél : 05 46 49 03 18
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#333] pt-4 text-center text-[#888] text-[0.9rem]">
          <p className="my-2">&copy; {currentYear} Association Adonf</p>
          <p className="my-2 text-[0.85rem]">
            Réalisation :{" "}
            <a
              href="https://github.com/AntoineSPR"
              target="_blank"
              style={{ color: "inherit" }}
              className="hover:underline"
            >
              Antoine Simper
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
