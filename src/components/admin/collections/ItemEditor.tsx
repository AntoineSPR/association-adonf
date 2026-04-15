import React, { useState, useEffect, useRef, useMemo } from "react";
import api from "../../../lib/api";
import JoditEditor from "jodit-react";
import {
  Loader2,
  Plus,
  Trash2,
  ArrowLeft,
  Upload,
  ChevronRight,
} from "lucide-react";
import { getApiUrl } from "../../../lib/api";

interface Section {
  titre?: string;
  contenuHtml?: string;
}

interface Item {
  id: string | number;
  titre?: string;
  slug?: string;
  date?: string;
  datePublication?: string;
  heure?: string;
  lieu?: string;
  prix?: string;
  image?: string;
  extrait?: string;
  contenuHtml?: string;
  texteBouton?: string;
  lienBouton?: string;
  statut?: string;
  enAvant?: boolean;
  sections?: Section[];
  [key: string]: any;
}

interface ItemEditorProps {
  collection?: string;
  itemId?: string;
}

const getEmptyTemplate = (type: string): Item => {
  if (type === "concerts") {
    return {
      id: "new",
      slug: "nouveau-concert",
      titre: "",
      date: new Date().toISOString().split("T")[0],
      heure: "20:00",
      lieu: "Le Parallèle",
      prix: "Gratuit",
      image: "",
      contenuHtml: "",
      texteBouton: "",
      lienBouton: "",
      statut: "",
      enAvant: false,
      sections: [],
    };
  }
  if (type === "cours") {
    return {
      id: "new",
      slug: "nouveau-cours",
      titre: "",
      image: "",
      contenuHtml: "",
      sections: [],
    };
  }

  if (type === "projets-pedagogiques") {
    return {
      id: "new",
      slug: "nouveau-projet",
      titre: "",
      image: "",
      extrait: "",
      contenuHtml: "",
      sections: [],
    };
  }
  if (type === "actualites") {
    return {
      id: "new",
      slug: "nouvelle-actualite",
      titre: "",
      datePublication: new Date().toISOString().split("T")[0],
      extrait: "",
      contenuHtml: "",
      image: "",
      enAvant: false,
      sections: [],
    };
  }
  if (type === "studios") {
    return {
      id: "new",
      slug: "nouveau-studio",
      titre: "",
      image: "",
      lienVideo: "",
    };
  }
  return { id: "new", titre: "Nouvel élément" };
};

class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ItemEditor rendering error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-800 rounded-xl border border-red-200 shadow-sm max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            ⚠️ Erreur de rendu (Blank Page Fix)
          </h2>
          <p className="mb-4">Le composant a planté lors de l'affichage :</p>
          <pre className="bg-white p-4 rounded text-xs whitespace-pre-wrap font-mono shadow-inner border border-red-100 overflow-x-auto">
            {this.state.error?.message}
            {"\n\n"}
            {this.state.error?.stack}
          </pre>
          <p className="mt-6 text-sm opacity-75">
            Regardez la console F12 pour plus de détails.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function ItemEditorInner(props: ItemEditorProps) {
  const [collection, setCollection] = useState(props.collection || "");
  const [itemId, setItemId] = useState(props.itemId || "");
  const [document, setDocument] = useState<any>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editorRef = useRef(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      height: 250,
      toolbarSticky: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "ul",
        "ol",
        "font",
        "fontsize",
        "paragraph",
        "image",
        "link",
        "align",
        "undo",
        "redo",
        "hr",
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!props.collection || !props.itemId) {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        setCollection(params.get("collection") || "");
        setItemId(params.get("id") || "");
      }
    }
  }, [props.collection, props.itemId]);

  useEffect(() => {
    if (collection && itemId) {
      fetchData();
    }
  }, [collection, itemId]);

  const fetchData = async () => {
    try {
      const res = await api.get(`/api/PageContent/${collection}`);
      const doc = res.data;
      setDocument(doc);

      // Initialize content structure if missing
      let content = doc.content;
      if (typeof content === "string") {
        try {
          content = JSON.parse(content);
        } catch (e) {}
      }
      if (!content || typeof content !== "object") {
        content = { items: [] };
        content.items = [];
      }

      if (itemId === "new") {
        // Create mode
        setItem(getEmptyTemplate(collection));
      } else {
        // Edit mode
        const foundItem = content.items.find(
          (i: Item) => String(i.id) === String(itemId),
        );
        if (foundItem) {
          if (!foundItem.sections) foundItem.sections = [];
          setItem(foundItem);
        } else {
          setError(
            `Élément avec l'ID "${itemId}" introuvable dans "${collection}".`,
          );
        }
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        if (itemId === "new") {
          // Parent document doesn't exist yet, we can scaffold it
          setDocument({
            slug: collection,
            titre: collection,
            content: { items: [] },
          });
          setItem(getEmptyTemplate(collection));
        } else {
          setError("Collection introuvable.");
        }
      } else {
        setError(err.message || "Échec de récupération des données.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Item, value: any) => {
    if (!item) return;
    setItem({ ...item, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !item) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/File", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const relativeUrl = response.data;
      const fullUrl = `${getApiUrl().replace(/\/$/, "")}${relativeUrl}`;
      setItem({
        ...item,
        image: fullUrl,
      });
    } catch (err) {
      console.error("Erreur d'upload", err);
      setError("Échec de l'upload de l'image");
      setTimeout(() => setError(null), 3000);
    } finally {
      setUploadingImage(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string,
  ) => {
    if (!item || !item.sections) return;
    const newSections = [...item.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setItem({ ...item, sections: newSections });
  };

  const addSection = () => {
    if (!item) return;
    const currentSections = item.sections || [];
    setItem({
      ...item,
      sections: [...currentSections, { titre: "", contenuHtml: "" }],
    });
  };

  const removeSection = (index: number) => {
    if (!item || !item.sections) return;
    const newSections = item.sections.filter((_, i) => i !== index);
    setItem({ ...item, sections: newSections });
  };

  const handleSave = async () => {
    if (!item || !document) return;
    setSaving(true);
    setError(null);

    try {
      let content = document.content;
      if (typeof content === "string") {
        content = JSON.parse(content);
      }

      // Deep copy to prevent mutating string values erroneously later
      const contentCopy = JSON.parse(JSON.stringify(content || { items: [] }));
      if (!Array.isArray(contentCopy.items)) {
        contentCopy.items = [];
      }

      const itemToSave = { ...item };

      if (itemToSave.id === "new") {
        itemToSave.id = Date.now().toString(); // assign a real DB ID
      }

      // Auto-generate a clean, unique slug from the title if it's the default string
      if (
        !itemToSave.slug ||
        itemToSave.slug === "nouveau-concert" ||
        itemToSave.slug === "nouvel-element" ||
        itemToSave.slug === "nouvelle-actualite"
      ) {
        const itemTitle = itemToSave.titre;
        const generatedSlug = itemTitle
          ? String(itemTitle)
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") // Remove accents
              .replace(/[^a-z0-9]+/g, "-") // Replace special chars with hyphens
              .replace(/(^-|-$)+/g, "") // Remove leading/trailing hyphens
          : "element";

        // Append small ID snippet to guarantee uniqueness
        itemToSave.slug = `${generatedSlug}-${String(itemToSave.id).slice(-4)}`;
      }

      const itemIndex = contentCopy.items.findIndex(
        (i: Item) =>
          String(i.id) === String(item.id) ||
          (item.id === "new" && i.id === "new") ||
          i.id === "new",
      );

      if (itemIndex >= 0) {
        contentCopy.items[itemIndex] = itemToSave;
      } else {
        contentCopy.items.push(itemToSave);
      }

      const payload = {
        content: contentCopy, // Standard serialization for .NET JsonDocument
      };

      await api.put(`/api/PageContent/${collection}`, payload);

      setSuccess("Sauvegardé avec succès !");
      setTimeout(() => setSuccess(null), 3000);

      // Update UI URL if we just created a new one so it doesn't duplicate on next save
      if (itemId === "new") {
        window.history.replaceState(
          {},
          "",
          `/admin/collections/edit?collection=${collection}&id=${itemToSave.id}`,
        );
        setItemId(String(itemToSave.id));
        setItem(itemToSave);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-3 text-lg">Chargement...</span>
      </div>
    );
  }

  if (error && !item) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl relative max-w-4xl mx-auto mt-10">
        <h3 className="text-lg font-bold mb-2">Erreur</h3>
        <p>{error}</p>
        <a
          href={`/admin/collections/${collection}`}
          className="inline-block mt-4 text-purple-600 hover:underline font-medium"
        >
          &larr; Retour à la collection
        </a>
      </div>
    );
  }

  if (!item) {
    return <div>Élément introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
      <div className="sticky top-24 min-[1150px]:top-32 z-40 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="w-full max-w-[calc(100%-150px)] overflow-hidden">
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
              <a
                href="/admin"
                className="hover:text-purple-600 transition-colors flex-shrink-0"
              >
                Tableau de bord
              </a>
              <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-400" />
              <a
                href={`/admin/collections/${collection}`}
                className="hover:text-purple-600 transition-colors capitalize flex-shrink-0"
              >
                {collection.replace(/-/g, " ")}
              </a>
              <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0 text-gray-400" />
              <span
                className="text-gray-800 truncate"
                title={item.titre || "Nouvel élément"}
              >
                {item.titre || "Nouveau"}
              </span>
            </nav>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 truncate">
              {item.titre || "Nouveau"}
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 font-medium shadow-sm active:scale-95"
          >
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {saving ? "Sauvegarde..." : "Enregistrer"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg shadow-sm">
            {success}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div
          className={`grid grid-cols-1 ${collection !== "studios" ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl mx-auto"} gap-8`}
        >
          {/* Base Fields */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Informations principales
            </h2>

            {collection !== "studios" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={item.titre || ""}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow outline-none"
                  placeholder={
                    collection === "cours"
                      ? "Ex: Guitare"
                      : collection === "projets-pedagogiques"
                        ? "Ex: Eveil Musical"
                        : collection === "actualites"
                          ? "Ex: Nouvel album studio"
                          : "Ex: Concert Rock Adonf"
                  }
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="relative mb-2">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  disabled={uploadingImage}
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 text-gray-700 py-3 rounded-lg transition-colors disabled:opacity-50 relative z-10"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Téléchargement...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>
                        {item.image
                          ? "Changer l'image"
                          : "Sélectionner une image"}
                      </span>
                    </>
                  )}
                </button>
              </div>
              {item.image && (
                <div className="mt-3 relative rounded-lg overflow-hidden h-40 bg-gray-100 border flex items-center justify-center">
                  <img
                    src={item.image}
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

            {collection === "studios" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lien de la vidéo (Youtube, Vimeo, etc...)
                </label>
                <input
                  type="url"
                  value={item.lienVideo || ""}
                  onChange={(e) => handleChange("lienVideo", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: https://www.youtube.com/watch?v=..."
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {collection !== "cours" &&
                collection !== "projets-pedagogiques" &&
                collection !== "studios" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date {collection === "actualites" ? "de publication" : ""}
                    </label>
                    <input
                      type="date"
                      value={
                        item[
                          collection === "actualites"
                            ? "datePublication"
                            : "date"
                        ] || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          collection === "actualites"
                            ? "datePublication"
                            : "date",
                          e.target.value,
                        )
                      }
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${collection === "actualites" ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
                      disabled={collection === "actualites"}
                    />
                  </div>
                )}
              {collection === "concerts" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={item.heure || ""}
                    onChange={(e) => handleChange("heure", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              )}
            </div>

            {collection === "concerts" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={item.lieu || ""}
                    onChange={(e) => handleChange("lieu", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ex: Salle des fêtes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix
                  </label>
                  <input
                    type="text"
                    value={item.prix || ""}
                    onChange={(e) => handleChange("prix", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ex: 5€ ou Gratuit"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description & Action Button */}
          {collection !== "studios" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">
                {collection === "actualites"
                  ? "Contenu de l'actualité"
                  : "Description & Action"}
              </h2>

              {["actualites", "projets-pedagogiques"].includes(
                collection || "",
              ) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extrait (Résumé court)
                  </label>
                  <textarea
                    value={item.extrait || ""}
                    onChange={(e) => handleChange("extrait", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none h-24"
                  />
                </div>
              )}

              {collection !== "studios" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Le contenu de la page
                  </label>
                  <div className="bg-white">
                    <JoditEditor
                      ref={editorRef}
                      value={item["contenuHtml"] || ""}
                      config={joditConfig}
                      onBlur={(newContent) =>
                        handleChange("contenuHtml", newContent)
                      }
                      onChange={(newContent) => {}}
                    />
                  </div>
                </div>
              )}

              {collection !== "cours" &&
                collection !== "projets-pedagogiques" &&
                collection !== "studios" && (
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 mt-8 shadow-sm">
                    <h3 className="font-medium text-gray-900 mb-3 block">
                      Bouton d'action (optionnel)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Texte du bouton
                        </label>
                        <input
                          type="text"
                          value={item.texteBouton || ""}
                          onChange={(e) =>
                            handleChange("texteBouton", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                          placeholder="Ex: Réserver ma place"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lien cible (URL)
                        </label>
                        <input
                          type="text"
                          value={item.lienBouton || ""}
                          onChange={(e) =>
                            handleChange("lienBouton", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none font-mono"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Sections */}
      {collection !== "studios" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4 mt-2">
            <h2 className="text-xl font-semibold">
              Paragraphes supplémentaires (Sections)
            </h2>
            <button
              onClick={addSection}
              className="flex items-center text-sm px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Ajouter un paragraphe
            </button>
          </div>

          {(!item.sections || item.sections.length === 0) && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">Aucun paragraphe supplémentaire.</p>
            </div>
          )}

          <div className="space-y-6">
            {item.sections?.map((section, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group transition-colors hover:border-purple-300"
              >
                <button
                  onClick={() => removeSection(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-lg shadow-sm border md:opacity-0 md:group-hover:opacity-100"
                  title="Supprimer ce paragraphe"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre du paragraphe {index + 1}
                  </label>
                  <input
                    type="text"
                    value={section.titre || ""}
                    onChange={(e) =>
                      handleSectionChange(index, "titre", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Ex: Programme de la soirée"
                  />
                </div>

                <div className="h-[280px] flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenu
                  </label>
                  <div className="flex-grow bg-white">
                    <JoditEditor
                      ref={editorRef}
                      value={section.contenuHtml || ""}
                      config={joditConfig}
                      onBlur={(val) =>
                        handleSectionChange(index, "contenuHtml", val)
                      }
                      onChange={(newContent) => {}}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ItemEditor(props: ItemEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <ItemEditorInner {...props} />
    </ErrorBoundary>
  );
}
