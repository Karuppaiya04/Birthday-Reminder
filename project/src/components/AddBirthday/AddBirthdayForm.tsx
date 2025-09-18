import React, { useState } from "react";
import { useBirthdays } from "../../hooks/useBirthdays";
import { useAuth } from "../../context/AuthContext";
import { User, Calendar, Heart, FileText, Upload, Check } from "lucide-react";

const relations = ["family", "friend", "colleague", "acquaintance", "other"];

export function AddBirthdayForm() {
  const { addBirthday } = useBirthdays();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    relation: "friend",
    notes: "",
    profile_picture_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      // Add user_id to formData for Supabase
      const birthdayData = {
        ...formData,
        user_id: user?.id || "",
      };
      const result = await addBirthday(birthdayData);
      if (result && result.error) {
        // If error is an object with message, show it
        setError(
          result.error &&
            typeof result.error === "object" &&
            "message" in result.error
            ? (result.error as { message: string }).message
            : String(result.error) || "Failed to add birthday"
        );
      } else if (result && result.data) {
        setFormData({
          name: "",
          date_of_birth: "",
          relation: "friend",
          notes: "",
          profile_picture_url: "",
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to add birthday");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add birthday");
      console.error("Error adding birthday:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
            Birthday Added!
          </h2>
          <p className="text-green-600 dark:text-green-400">
            The birthday has been successfully added to your list.
          </p>
        </div>
      </div>
    );
  }

  // Show error message if present
  // ...existing code...

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Birthday
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Keep track of important birthdays and never miss a celebration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange("date_of_birth")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Heart className="h-4 w-4 inline mr-1" />
                Relationship
              </label>
              <select
                value={formData.relation}
                onChange={handleChange("relation")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white capitalize"
              >
                {relations.map((relation) => (
                  <option
                    key={relation}
                    value={relation}
                    className="capitalize"
                  >
                    {relation}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Upload className="h-4 w-4 inline mr-1" />
                Profile Picture URL (optional)
              </label>
              <input
                type="url"
                value={formData.profile_picture_url}
                onChange={handleChange("profile_picture_url")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={handleChange("notes")}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Gift ideas, special wishes, or other notes..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.name || !formData.date_of_birth}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Adding Birthday..." : "Add Birthday"}
          </button>
        </form>
      </div>
    </div>
  );
}
