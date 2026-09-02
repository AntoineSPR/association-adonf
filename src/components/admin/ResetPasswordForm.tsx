import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../lib/api";

interface ResetPasswordFormProps {
  token: string;
  email: string;
}

function extractErrorMessage(err: any, fallback: string): string {
  if (err.response?.data?.message) return err.response.data.message;
  if (err.response?.data?.errors) {
    const errors = err.response.data.errors as Record<string, string[]>;
    const firstError = Object.values(errors)?.[0]?.[0];
    if (firstError) return firstError;
  }
  if (!err.response) {
    return "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
  }
  return fallback;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token || !email) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div
          className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
          role="alert"
        >
          Ce lien de réinitialisation est invalide ou incomplet. Veuillez
          refaire une demande depuis la page de connexion.
        </div>
        <a
          href="/admin/login"
          className="block w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium text-center"
        >
          Retour à la connexion
        </a>
      </div>
    );
  }

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
      const response = await api.post("/user/reset-password", {
        token,
        email,
        newPassword,
        confirmPassword,
      });
      setSuccess(
        response.data?.message || "Mot de passe réinitialisé avec succès.",
      );
    } catch (err: any) {
      setError(
        extractErrorMessage(
          err,
          "Impossible de réinitialiser le mot de passe. Le lien a peut-être expiré.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Réinitialiser le mot de passe
      </h2>

      {error && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {success ? (
        <>
          <div
            className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm"
            role="status"
          >
            {success}
          </div>
          <a
            href="/admin/login"
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Se connecter
          </a>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500 transition-colors"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              8 caractères minimum, avec majuscule, minuscule, chiffre et
              caractère spécial.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </button>
        </form>
      )}
    </div>
  );
}
