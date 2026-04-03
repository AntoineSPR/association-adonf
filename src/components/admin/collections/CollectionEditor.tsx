import React, { useEffect, useState } from "react";
import api from "../../../lib/api";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

// We store the collection list inside the pagecontent database using the plural name as slug (ex: 'concerts')
// The `content` will simply be an array containing all items inside a key: { items: [...] }

export default function CollectionEditor({
  collection,
}: {
  collection: string;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/pagecontent/${collection}`);
        let contentData = response.data?.content;
        if (typeof contentData === "string") {
          try {
            contentData = JSON.parse(contentData);
          } catch (e) {}
        }
        if (contentData?.items) {
          setItems(contentData.items);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [collection]);

  const handleSave = async (updatedItems: any[]) => {
    setIsSaving(true);
    setMessage(null);
    try {
      await api.put(`/api/pagecontent/${collection}`, {
        content: { items: updatedItems },
      });
      setMessage({ text: "Enregistrement réussi !", isError: false });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ text: "Erreur lors de l'enregistrement.", isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = () => {
    window.location.href = `/admin/collections/edit?collection=${collection}&id=new`;
  };

  const handleDelete = (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
    handleSave(newItems);
  };

  if (isLoading) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <a
            href="/admin"
            className="text-blue-600 hover:underline flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au tableau de bord
          </a>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            Gestion : {collection}
          </h1>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex gap-2 items-center shadow-sm w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Ajouter {collection === "concerts" ? "un concert" : "un élément"}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${message.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
        >
          {message.text}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg border text-gray-500">
          Aucun élément trouvé. Ajoutez-en un !
        </div>
      ) : (
        <div className="grid gap-4 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                {(item.image || item.image) && (
                  <img
                    src={(item.image || item.image)}
                    className="w-full sm:w-24 h-48 sm:h-16 object-cover rounded"
                    alt="cover"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg">
                    { item.titre}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {(item.date || item.datePublication) &&
                      new Date(
                        item.date || item.datePublication,
                      ).toLocaleDateString("fr-FR")}{" "}
                    {item.lieu ? `- ${item.lieu}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <a
                  href={`/admin/collections/edit?collection=${collection}&id=${item.id}`}
                  className="flex-1 sm:flex-none justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" /> Éditer
                </a>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center gap-2 transition-colors border border-transparent hover:border-red-200"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
