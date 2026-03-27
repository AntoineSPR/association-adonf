import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import JoditEditor from "jodit-react";

interface PageEditorProps {
  slug: string;
}

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
    const isHtml = path[path.length - 1]?.toLowerCase().includes("html");
    const isImage =
      path[path.length - 1]?.toLowerCase().includes("image") ||
      path[path.length - 1]?.toLowerCase().includes("url");

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
    return (
      <div className="space-y-4">
        {Object.keys(data).map((key) => {
          if (path.length === 0 && key === "contacts" && availableContacts && availableContacts.length > 0) return null;

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
                {key.replace(/([A-Z])/g, " $1").trim()}
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
  const [jsonString, setJsonString] = useState<string>("{}");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableContacts, setAvailableContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const [response, contactsResponse] = await Promise.all([
          api.get(`/api/pagecontent/${slug}`),
          slug !== "contacts" ? api.get('/api/pagecontent/contacts').catch(() => null) : Promise.resolve(null)
        ]);

        const pageData = response.data?.content || {};
        setContent(pageData);
        setJsonString(JSON.stringify(pageData, null, 2));

        if (contactsResponse && contactsResponse.data?.content?.contacts) {
          setAvailableContacts(contactsResponse.data.content.contacts);
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
      setJsonString(JSON.stringify(val, null, 2));
      return;
    }

    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setContent(newContent);
    setJsonString(JSON.stringify(newContent, null, 2));
  };

  const handleJsonStringChange = (val: string) => {
    setJsonString(val);
    try {
      setContent(JSON.parse(val));
      setError(null);
    } catch {
      // Don't crash, just wait for valid JSON
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      // Validate JSON before sending (in case they edited code view)
      const parsedContent = JSON.parse(jsonString);

      await api.put(`/api/pagecontent/${slug}`, {
        content: parsedContent,
      });

      setSuccess("Contenu de la page enregistré avec succès.");
      // Synchronise visual mode with newly validated strict JSON
      setContent(parsedContent);
      setJsonString(JSON.stringify(parsedContent, null, 2));

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <a
            href="/admin"
            className="text-blue-600 hover:underline flex items-center gap-2 mb-4 text-sm"
          >
            <i className="pi pi-arrow-left"></i> Retour au tableau de bord
          </a>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            Édition : {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600 mt-1">
            Modifiez le contenu dynamique de la page
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:bg-blue-300 shadow-sm"
          >
            {isSaving ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              <i className="pi pi-save"></i>
            )}
            Enregistrer
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200 flex items-center gap-3">
          <i className="pi pi-exclamation-triangle text-xl"></i>
          <div>
            <strong>Erreur :</strong> {error}
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 border border-green-200 flex items-center gap-3">
          <i className="pi pi-check-circle text-xl"></i>
          <div>{success}</div>
        </div>
      )}

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

          {!isContentEmpty && slug !== "contacts" && availableContacts.length > 0 && (
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
                  const isChecked = Array.isArray(content.contacts) && content.contacts.some(
                    (c: any) => c.name === contact.name
                  );
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-3 cursor-pointer p-3 hover:bg-white rounded-md transition-shadow border border-gray-200 hover:shadow-sm bg-white/50"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentContacts = Array.isArray(content.contacts)
                            ? content.contacts
                            : [];
                          let newContacts;
                          if (e.target.checked) {
                            newContacts = [...currentContacts, contact];
                          } else {
                            newContacts = currentContacts.filter(
                              (c: any) => c.name !== contact.name
                            );
                          }
                          handleFieldChange(["contacts"], newContacts);
                        }}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {contact.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {contact.role} {contact.email ? `• ${contact.email}` : ""}
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
