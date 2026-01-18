import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

const socials = [
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

const menuItems = [
  { label: "", href: "/", icon: Home, isHome: true }, // Home icon
  { label: "Agenda", href: "/agenda" },
  {
    label: "École de Musique",
    children: [
      { label: "Cours de Musique", href: "/cours-de-musique" },
      { label: "Inscriptions et Tarifs", href: "/inscriptions-tarifs" },
      { label: "Projet Pédagogique", href: "/projet-pedagogique" },
    ],
  },
  { label: "Répétitions", href: "/repetitions" },
  { label: "Studio d'Enregistrement", href: "/studio-enregistrement" },
  {
    label: "Prestations diverses",
    children: [
      { label: "Sonorisation", href: "/prestations#sonorisation" },
      { label: "Régie", href: "/prestations#regie" },
      { label: "Festivals", href: "/prestations#festivals" },
      {
        label: "Accompagnement artistique",
        href: "/prestations#accompagnement",
      },
    ],
  },
];

const Separator = () => (
  <div className="h-6 w-[2px] bg-[#dc143c] mx-2 hidden xl:block" />
);

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a1a1a] p-2 text-white shadow-md font-sans">
      <div className="container mx-auto flex flex-col gap-2">
        {/* Top Row: Logo - Navigation - Billetterie */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="block shrink-0">
            <img
              src="/assets/logo-adonf.png"
              alt="Association A Donf"
              className="w-[150px] md:w-[200px] h-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden min-[1150px]:flex flex-1 justify-center items-center">
            <nav>
              <ul className="flex items-center">
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Separator />}
                    <li className="relative group">
                      {item.children ? (
                        <>
                          <button
                            className="flex items-center gap-1 px-3 py-2 text-sm font-bold tracking-wide text-white uppercase transition-colors bg-transparent rounded hover:bg-[#dc143c]/10 hover:text-[#dc143c] focus:outline-none"
                            aria-expanded="false"
                          >
                            {item.label}
                            <svg
                              width="10"
                              height="6"
                              viewBox="0 0 10 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180"
                            >
                              <path
                                d="M1 1L5 5L9 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {/* Dropdown Menu - Standard Absolute Positioning */}
                          <div className="absolute left-0 z-50 invisible w-[240px] pt-2 transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2">
                            <ul className="py-2 bg-[#1a1a1a] border border-[#333] shadow-xl rounded-sm">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <a
                                    href={child.href}
                                    className="block px-4 py-2.5 text-sm text-gray-200 transition-colors hover:bg-[#dc143c] hover:text-white no-underline"
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          className={cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded px-3 py-2 text-sm uppercase font-bold tracking-wide transition-colors hover:bg-[#dc143c]/10 hover:text-[#dc143c] focus:bg-[#dc143c] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:no-underline text-white",
                            item.isHome ? "px-2" : "",
                          )}
                        >
                          {item.isHome && item.icon ? (
                            <item.icon className="h-5 w-5" />
                          ) : (
                            item.label
                          )}
                        </a>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </div>

          {/* Billetterie Button */}
          <div className="hidden min-[1150px]:block shrink-0 ml-4">
            <Button
              asChild
              className="bg-[#dc143c] hover:bg-[#b8112f] text-white rounded-full px-6 font-bold uppercase tracking-wider text-sm shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <a
                href="/billetterie"
                className="flex items-center gap-2 no-underline"
              >
                <Ticket className="h-4 w-4" />
                <span>Billetterie</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="min-[1150px]:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-[#dc143c] hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#1a1a1a] text-white border-l-gray-800 overflow-y-auto"
              >
                <nav className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      {item.children ? (
                        <>
                          <div className="font-bold text-[#dc143c] px-2 uppercase tracking-wide">
                            {item.label}
                          </div>
                          <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-700 ml-2">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="text-sm hover:text-[#dc143c] py-2 transition-colors block"
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          className="font-bold hover:text-[#dc143c] px-2 py-1 uppercase tracking-wide transition-colors flex items-center gap-2"
                        >
                          {item.isHome && item.icon ? (
                            <>
                              <item.icon className="h-5 w-5" /> Accueil
                            </>
                          ) : (
                            item.label
                          )}
                        </a>
                      )}
                    </div>
                  ))}

                  <div className="mt-4">
                    <Button
                      asChild
                      className="w-full bg-[#dc143c] hover:bg-[#b8112f] text-white rounded-full font-bold uppercase"
                    >
                      <a
                        href="/billetterie"
                        className="flex items-center justify-center gap-2"
                      >
                        <Ticket className="h-4 w-4" />
                        <span>Billetterie</span>
                      </a>
                    </Button>
                  </div>

                  {/* Mobile Socials */}
                  <div className="flex justify-center gap-8 mt-8 pb-8">
                    {socials.map((social) => (
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
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Second Row: Social Icons (Desktop only) */}
        {/* Adjusted to be centered below the main nav bar as typically seen in legacy stacked headers if indicated */}
        <div className="hidden min-[1150px]:flex justify-center gap-8 pb-2">
          {socials.map((social) => (
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
      </div>
    </header>
  );
};

export default Header;
