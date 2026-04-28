// src/components/admin/ProfilePhotoAdmin.jsx
import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePhotoAdmin({ currentUrl, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      // Create a local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Use a fixed filename so each upload replaces the previous one
      const fileName = `profile-photo.${file.name.split(".").pop()}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Save URL to portfolio_settings
      const { error: dbError } = await supabase
        .from("portfolio_settings")
        .upsert({ key: "profile_photo_url", value: publicUrl });

      if (dbError) throw dbError;

      setPreview(publicUrl);
      setSuccess(true);

      // Notify parent to refresh
      if (onUpdate) onUpdate(publicUrl);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!window.confirm("Remove profile photo?")) return;
    setUploading(true);
    setError(null);

    try {
      // Clear in DB
      await supabase
        .from("portfolio_settings")
        .upsert({ key: "profile_photo_url", value: "" });

      setPreview(null);
      if (onUpdate) onUpdate("");
    } catch (err) {
      setError(err.message || "Failed to remove photo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Profile Photo
      </h3>

      {/* Preview */}
      <div className="flex items-center gap-6">
        <div className="relative">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-500">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
              <svg
                className="animate-spin w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {uploading ? "Uploading…" : preview ? "Change Photo" : "Upload Photo"}
          </button>

          {preview && !uploading && (
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-sm bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Hint */}
      <p className="text-xs text-gray-500">
        Recommended: square image, at least 200×200px. Max 5MB.
      </p>

      {/* Error / success messages */}
      {error && (
        <p className="text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-400 bg-green-900/20 px-3 py-2 rounded-lg">
          ✓ Profile photo updated!
        </p>
      )}
    </div>
  );
}
