import React, { useEffect, useState } from "react";
import api from "../../lib/api";

interface PageEditorProps {
  slug: string;
}

export default function PageEditor({ slug }: PageEditorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<string>("{}");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        // GET the JSON data
        const response = await api.get(`/api/pagecontent/${slug}`);

        // If the PageContent is empty, the API might return an empty object for `content`
        const pageData = response.data?.content || {};

        // Pretty stringify for the textarea
        setContent(JSON.stringify(pageData, null, 2));
      } catch (err: any) {
        console.error(err);
        setError("Error fetching content.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [slug]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      // Validate JSON before sending
      const parsedContent = JSON.parse(content);

      await api.put(`/api/pagecontent/${slug}`, {
        content: parsedContent,
      });

      setSuccess("Page content saved successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your syntax.");
      } else {
        setError(
          "Error saving content: " +
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
            Edition : {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600 mt-1">
            Modifiez le contenu JSON de cette page
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:bg-blue-300"
        >
          {isSaving ? (
            <i className="pi pi-spin pi-spinner"></i>
          ) : (
            <i className="pi pi-save"></i>
          )}
          Enregistrer
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          <i className="pi pi-exclamation-triangle mr-2"></i> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 border border-green-200">
          <i className="pi pi-check mr-2"></i> {success}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <textarea
          className="w-full h-[60vh] p-4 text-sm font-mono bg-gray-50 focus:bg-white border-0 focus:ring-0 resize-none outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="false"
        ></textarea>
      </div>
    </div>
  );
}
