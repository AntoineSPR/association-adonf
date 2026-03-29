import React, { useEffect, useState } from "react";
import api, { getApiUrl } from "../../lib/api";
import { Loader2, Upload } from "lucide-react";
import JoditEditor from "jodit-react";

interface PageEditorProps {
  slug: string;
}

const ImageUploader = ({
  data,
  onChange,
}: {
  data: string;
  onChange: (val: string) => void;
}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/File", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const relativeUrl = response.data;
      const fullUrl = `${getApiUrl().replace(/\/$/, "")}${relativeUrl}`;
      onChange(fullUrl);
    } catch (err) {
      console.error("Erreur d'upload", err);
      alert("Échec de l'upload de l'image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="file"
          onChange={handleUpload}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          disabled={uploading}
        />
        <button
          type="button"
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 text-gray-700 py-3 rounded-lg transition-colors disabled:opacity-50 relative z-10"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Téléchargement...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>{data ? "Changer l'image" : "Sélectionner une image"}</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ou collez une URL d'image ici..."
        />
      </div>

      {data && (
        <div className="mt-2 relative rounded-lg overflow-hidden h-40 bg-gray-100 border flex items-center justify-center max-w-sm">
          <img
            src={data}
            alt="Aperçu"
            className="w-full h-full object-contain z-10 relative"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling)
                (
                  e.currentTarget.nextElementSibling as HTMLElement
                ).style.display = "flex";
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = "block";
              if (e.currentTarget.nextElementSibling)
                (
                  e.currentTarget.nextElementSibling as HTMLElement
                ).style.display = "none";
            }}
          />
          <div
            className="absolute inset-0 bg-black/5 items-center justify-center font-sm text-gray-500"
            style={{ display: "none" }}
          >
            [Image invalide]
          </div>
        </div>
      )}
    </div>
  );
};

class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean; error: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="p-4 bg-red-100 text-red-700">
          Render error: {this.state.error?.message}
        </div>
      );
    return this.props.children;
  }
}

// A recursive component to render a form for our JSON schema
const JsonFormNode = ({
  path,
  data,
  onChange,
  availableContacts,
}: {
  path: string[];
  data: any;
  onChange: (path: string[], val: any) => void;
  availableContacts?: any[];
}) => {
  if (data === null || data === undefined) {
    return <span className="text-gray-400 italic">null</span>;
  }

  const type = typeof data;

  if (type === "string") {
    const isIcon = path[path.length - 1] === "iconId";
    if (isIcon) {
      return (
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          value={data}
          onChange={(e) => onChange(path, e.target.value)}
        >
          <option value="FacebookIcon">Facebook</option>
          <option value="InstagramIcon">Instagram</option>
          <option value="YoutubeIcon">YouTube</option>
          <option value="TwitterIcon">Twitter / X</option>
          <option value="TiktokIcon">TikTok</option>
          <option value="SoundcloudIcon">Soundcloud</option>
          <option value="SpotifyIcon">Spotify</option>
        </select>
      );
    }

    const isHtml = path[path.length - 1]?.toLowerCase().includes("html");
    const isImage =
      path[path.length - 1]?.toLowerCase().includes("image") ||
      path[path.length - 1]?.toLowerCase().includes("photo") ||
      path[path.length - 1]?.toLowerCase() === "logo";

    if (isImage) {
      return (
        <ImageUploader data={data} onChange={(val) => onChange(path, val)} />
      );
    }

    if (isHtml) {
      return (
        <div className="bg-white">
          <JoditEditor
            key={path.join("-")}
            value={data || ""}
            onBlur={(val) => onChange(path, val)}
          />
        </div>
      );
    }

    return (
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
      />
    );
  }

  if (type === "number") {
    return (
      <input
        type="number"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        value={data}
        onChange={(e) => onChange(path, parseFloat(e.target.value))}
      />
    );
  }

  if (type === "boolean") {
    return (
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600 border-gray-300 rounded"
        checked={data}
        onChange={(e) => onChange(path, e.target.checked)}
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="pl-4 border-l-2 border-gray-200 ml-2 space-y-4 my-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm relative group"
          >
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                onClick={() => {
                  const newArr = [...data];
                  newArr.splice(index, 1);
                  onChange(path, newArr);
                }}
                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 w-8 h-8 rounded flex items-center justify-center transition-colors"
                title="Supprimer"
              >
                <i className="pi pi-trash"></i>
              </button>
            </div>
            <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Item {index + 1}
            </div>
            <JsonFormNode
              path={[...path, index.toString()]}
              data={item}
              onChange={onChange}
              availableContacts={availableContacts}
            />
          </div>
        ))}
        <button
          className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2 transition-colors border border-gray-300"
          onClick={() => {
            const lastItem = data.length > 0 ? data[data.length - 1] : "";
            let newItem = "";
            try {
              newItem =
                lastItem !== undefined
                  ? JSON.parse(JSON.stringify(lastItem))
                  : "";
            } catch (e) {
              newItem = "";
            }
            // Clear string values in template
            if (typeof newItem === "object") {
              const clearObj = (obj: any) => {
                for (let k in obj) {
                  if (typeof obj[k] === "string") obj[k] = "";
                  else if (typeof obj[k] === "boolean") obj[k] = false;
                  else if (typeof obj[k] === "number") obj[k] = 0;
                  else if (Array.isArray(obj[k])) obj[k] = [];
                  else if (typeof obj[k] === "object") clearObj(obj[k]);
                }
              };
              clearObj(newItem);
            }
            onChange(path, [...data, newItem]);
          }}
        >
          <i className="pi pi-plus"></i> Ajouter un item
        </button>
      </div>
    );
  }

  if (type === "object") {
    // Liste optionnelle pour forcer un ordre d'affichage cohérent
    // car la base de données (PostgreSQL jsonb) ne préserve pas l'ordre des clés d'origine.
    const PREFERRED_ORDER = [
      "titre",
      "titrePartie1",
      "titrePartie2",
      "presentation",
      "presentation",
      "description",
      "reservation",
      "horaires",
      "prixAdhesion",
      "periodeAdhesion",
      "tarifsLocation",
      "alerteTarifs",
      "tarification",
      "inscriptions",
      "services",
      "planning",
      "contacts",
      "sections",
    ];

    const sortedKeys = Object.keys(data).sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a);
      const idxB = PREFERRED_ORDER.indexOf(b);
      // Les deux sont dans la liste : on respecte l'ordre défini
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      // Seulement A est dans la liste : A passe en premier
      if (idxA !== -1) return -1;
      // Seulement B est dans la liste : B passe en premier
      if (idxB !== -1) return 1;
      // Aucun des deux : on les laisse dans l'ordre naturel
      return 0;
    });

    return (
      <div className="space-y-4">
        {sortedKeys.map((key) => {
          if (
            path.length === 0 &&
            key === "contacts" &&
            availableContacts &&
            availableContacts.length > 0
          )
            return null;

          const isComplex = typeof data[key] === "object" && data[key] !== null;
          return (
            <div
              key={key}
              className={
                isComplex
                  ? "mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50/50"
                  : ""
              }
            >
              <label
                className={`block capitalize mb-2 ${
                  isComplex
                    ? "text-lg font-bold text-gray-900 border-b border-gray-200 pb-2"
                    : "text-sm font-medium text-gray-700"
                }`}
              >
                {key
                  .replace(/Html/gi, "")
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </label>
              <JsonFormNode
                path={[...path, key]}
                data={data[key]}
                onChange={onChange}
                availableContacts={availableContacts}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return <span>Unknown type</span>;
};

export default function PageEditor({ slug }: PageEditorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableContacts, setAvailableContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const [response, contactsResponse] = await Promise.all([
          api.get(`/api/pagecontent/${slug}`),
          slug !== "contacts" &&
          slug !== "contenu-global" &&
          slug !== "partenaires" &&
          slug !== "cgv-statuts" &&
          slug !== "mentions-legales" &&
          slug !== "politique-confidentialite"
            ? api.get(`/api/pagecontent/contacts`)
            : Promise.resolve(null),
        ]);

        let pageData = response.data?.content || {};
        if (typeof pageData === "string") {
          try {
            pageData = JSON.parse(pageData);
          } catch (e) {
            console.error("Failed to parse page data", e);
          }
        }
        setContent(pageData);

        if (contactsResponse && contactsResponse.data?.content) {
          let contactsData = contactsResponse.data.content;
          if (typeof contactsData === "string") {
            try {
              contactsData = JSON.parse(contactsData);
            } catch (e) {
              console.error("Failed to parse contacts data", e);
            }
          }
          if (contactsData?.contacts) {
            setAvailableContacts(contactsData.contacts);
          }
        }
      } catch (err: any) {
        console.error(err);
        setError("Erreur lors du chargement des données.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [slug]);

  const handleFieldChange = (path: string[], val: any) => {
    if (path.length === 0) {
      setContent(val);
      return;
    }

    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setContent(newContent);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      await api.put(`/api/pagecontent/${slug}`, {
        content: content,
      });

      setSuccess("Contenu de la page enregistré avec succès.");

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setError("Format JSON invalide. Veuillez vérifier la syntaxe.");
      } else {
        setError(
          "Erreur d'enregistrement : " +
            (err.response?.data?.message || err.message),
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si l'objet est totalement vide (nouvelle page non initialisée)
  const isContentEmpty =
    content === null ||
    content === undefined ||
    (typeof content === "object" && Object.keys(content).length === 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 relative">
      <div className="sticky top-24 min-[1150px]:top-32 z-40 space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="w-full max-w-[calc(100%-150px)] overflow-hidden">
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
              <a
                href="/admin"
                className="hover:text-blue-600 transition-colors flex-shrink-0"
              >
                Tableau de bord
              </a>
              <i className="pi pi-chevron-right text-xs mx-2 flex-shrink-0 text-gray-400"></i>
              <span
                className="text-gray-800 capitalize truncate"
                title={slug.replace(/-/g, " ")}
              >
                {slug.replace(/-/g, " ")}
              </span>
            </nav>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 capitalize truncate">
              {slug.replace(/-/g, " ")}
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 font-medium shadow-sm active:scale-95"
            >
              {isSaving ? (
                <i className="pi pi-spin pi-spinner mr-2"></i>
              ) : (
                <i className="pi pi-save mr-2"></i>
              )}
              {isSaving ? "Sauvegarde..." : "Enregistrer"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <i className="pi pi-exclamation-triangle mt-1 text-xl"></i>
            <div>
              <strong>Erreur :</strong> {error}
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <i className="pi pi-check-circle mt-1 text-xl"></i>
            <div>{success}</div>
          </div>
        )}
      </div>

      {isContentEmpty && (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-yellow-800 text-center mb-6">
          <i className="pi pi-info-circle text-3xl mb-3"></i>
          <h3 className="font-bold text-lg mb-2">Aucun contenu trouvé</h3>
          <p className="mb-4">
            Cette page n'a pas encore de structure définie en base de données.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          {!isContentEmpty && (
            <ErrorBoundary>
              <JsonFormNode
                path={[]}
                data={content}
                onChange={handleFieldChange}
                availableContacts={availableContacts}
              />
            </ErrorBoundary>
          )}

          {slug !== "contacts" &&
            slug !== "contenu-global" &&
            slug !== "partenaires" &&
            slug !== "cgv-statuts" &&
            slug !== "mentions-legales" &&
            slug !== "politique-confidentialite" &&
            availableContacts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                    Contacts associés à cette page
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Sélectionnez les personnes à afficher en bas de la page.
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-4 bg-gray-50/50 rounded-lg border border-gray-200">
                  {availableContacts.map((contact: any, idx: number) => {
                    const isChecked =
                      Array.isArray(content.contacts) &&
                      content.contacts.some((c: any) => c.nom === contact.nom);
                    return (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer p-3 hover:bg-white rounded-md transition-shadow border border-gray-200 hover:shadow-sm bg-white/50"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const currentContacts = Array.isArray(
                              content.contacts,
                            )
                              ? content.contacts
                              : [];
                            let newContacts;
                            if (e.target.checked) {
                              newContacts = [...currentContacts, contact];
                            } else {
                              newContacts = currentContacts.filter(
                                (c: any) => c.nom !== contact.nom,
                              );
                            }
                            handleFieldChange(["contacts"], newContacts);
                          }}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {contact.nom}
                          </span>
                          <span className="text-xs text-gray-500">
                            {contact.role}{" "}
                            {contact.email ? `• ${contact.email}` : ""}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
