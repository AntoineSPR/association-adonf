import React, { useEffect, useState } from "react";

interface PageItem {
  title: string;
  path: string;
  description: string;
  icon: string;
}

const pages: PageItem[] = [
  {
    title: "Association",
    path: "/admin/pages/association",
    description: "Présentation de l'association",
    icon: "pi pi-users",
  },
  {
    title: "Actualités",
    path: "/admin/collections/actualites",
    description: "Gestion des articles d'actualité",
    icon: "pi pi-megaphone",
  },
  {
    title: "Concerts",
    path: "/admin/collections/concerts",
    description: "Gestion des concerts",
    icon: "pi pi-ticket",
  },
  {
    title: "Mes Cours de musique",
    path: "/admin/collections/lessons",
    description: "Gestion des cours de musique",
    icon: "pi pi-list",
  },
  {
    title: "Cours de musique (Page)",
    path: "/admin/pages/cours-de-musique",
    description: "Présentation des cours",
    icon: "pi pi-play",
  },
  {
    title: "Accompagnement artistique",
    path: "/admin/pages/accompagnement-artistique",
    description: "Page accompagnement",
    icon: "pi pi-star",
  },
  {
    title: "Mes Projets pédagogiques",
    path: "/admin/collections/projets-pedagogiques",
    description: "Gestion des projets pédagogiques",
    icon: "pi pi-book",
  },
  {
    title: "Régie",
    path: "/admin/pages/regie",
    description: "Prestations de régie",
    icon: "pi pi-cog",
  },
  {
    title: "Répétitions",
    path: "/admin/pages/repetitions",
    description: "Locaux de répétition",
    icon: "pi pi-volume-up",
  },
  {
    title: "Sonorisation",
    path: "/admin/pages/sonorisation",
    description: "Prestations de sonorisation",
    icon: "pi pi-volume-down",
  },
  {
    title: "Studio d'enregistrement",
    path: "/admin/pages/studio-enregistrement",
    description: "Le studio",
    icon: "pi pi-microphone",
  },
  {
    title: "Festivals",
    path: "/admin/pages/festivals",
    description: "Les festivals",
    icon: "pi pi-flag",
  },
  {
    title: "Partenaires",
    path: "/admin/pages/partenaires",
    description: "Liste des partenaires",
    icon: "pi pi-heart",
  },
  {
    title: "Contacts",
    path: "/admin/pages/contacts",
    description: "Informations de contact",
    icon: "pi pi-envelope",
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">
            Bienvenue, {user?.name || user?.email || "Administrateur"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <i className="pi pi-sign-out"></i>
          Déconnexion
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Contenus éditables
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sélectionnez une page ou une collection pour la modifier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {pages.map((page, index) => (
            <a
              key={page.path}
              href={page.path}
              className={`p-6 hover:bg-blue-50 transition-colors group flex items-start gap-4
                ${index % 3 !== 2 ? "lg:border-r border-gray-200" : ""}
                ${index < pages.length - 3 ? "lg:border-b border-gray-200" : ""}
                ${index % 2 !== 1 ? "md:border-r border-gray-200" : ""}
                ${index < pages.length - 2 ? "md:border-b border-gray-200" : ""}
                border-b border-gray-200 md:border-b-0
              `}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className={`${page.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{page.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
