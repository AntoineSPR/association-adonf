import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/api";

function extractErrorMessage(err: any, fallback: string): string {
  if (err.response?.data?.message) return err.response.data.message;
  if (!err.response) {
    return "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
  }
  return fallback;
}

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put("/user/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setSuccess(
        response.data?.message || "Mot de passe modifié avec succès.",
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(
        extractErrorMessage(
          err,
          "Impossible de modifier le mot de passe. Veuillez réessayer.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-6">
        <a href="/admin" className="hover:text-blue-600 transition-colors">
          Tableau de bord
        </a>
        <i className="pi pi-chevron-right text-xs mx-2 text-gray-400"></i>
        <span className="text-gray-800">Changer le mot de passe</span>
      </nav>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Changer le mot de passe
        </h1>

        {error && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm"
            role="status"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500 transition-colors"
                aria-label={showPasswords ? "Masquer les mots de passe" : "Afficher les mots de passe"}
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500 transition-colors"
                aria-label={showPasswords ? "Masquer les mots de passe" : "Afficher les mots de passe"}
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              8 caractères minimum, avec majuscule, minuscule, chiffre et
              caractère spécial.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                id="confirm-new-password"
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500 transition-colors"
                aria-label={showPasswords ? "Masquer les mots de passe" : "Afficher les mots de passe"}
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Modification..." : "Modifier le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
