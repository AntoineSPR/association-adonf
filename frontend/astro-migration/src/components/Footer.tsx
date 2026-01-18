import React from "react";
// import { Facebook, Instagram, Youtube } from "lucide-react"; (Brand icons deprecated in latest Lucid versions)

// SimpleIcons SVG paths - Keeping these as requested
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.354-2.618-6.782-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
          {/* Logo Section - Hidden on screens narrower than 961px to match original SCSS breakpoint (max-width: 960px) */}
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
              className="hover:underline" // Added standard link hover behavior as typically implied if not specified differently
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
