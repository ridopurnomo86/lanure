/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authenticator, getImageKitInstance } from "@/lib/imagekit";

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onError = (err: any) => {
    console.error("Error", err);
    setError("Upload failed. Please try again.");
    setUploading(false);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setImageUrl(res.url);
    setUploading(false);
    setError("");
  };

  const onUploadStart = () => {
    setUploading(true);
    setError("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadStart();

    try {
      // 1. Compress Image
      const options = {
        maxSizeMB: 1, // Max file size 1MB
        maxWidthOrHeight: 1200, // Max dimension 1200px
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // 2. Initialize ImageKit
      const imagekit = getImageKitInstance();

      // 3. Get Auth Params
      const authParams = await authenticator();

      // 4. Upload to ImageKit
      imagekit.upload(
        {
          file: compressedFile,
          fileName: file.name,
          folder: "/product",
          ...authParams,
        },
        (err: any, result: any) => {
          if (err) {
            onError(err);
          } else {
            onSuccess(result);
          }
        },
      );
    } catch (err) {
      console.error("Compression/Upload error:", err);
      onError(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl);

    try {
      // We'll use a server action or a simple API call.
      // Since the original page had a server action 'addProduct',
      // we can call a similar API route or use the same logic via fetch.
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/admin?success=true");
        router.refresh();
        setImageUrl("");
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add product.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
    >
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
          <X size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Product Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Ceramide Barrier Cream"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Brand
            </label>
            <input
              name="brand"
              required
              placeholder="e.g. Lanure"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <input
              name="category"
              required
              placeholder="e.g. Moisturizer"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Price (in Cents)
            </label>
            <input
              name="price"
              type="number"
              required
              placeholder="150000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 block">
            Product Image
          </label>
          <div className="relative group">
            {imageUrl ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-primary/30 group">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur shadow-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-green-400" />
                    Uploaded Successfully
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 text-slate-400">
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-sm font-medium animate-pulse">
                      Uploading to ImageKit...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                      <Upload size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-600">
                        Click to upload image
                      </p>
                      <p className="text-xs mt-1 text-slate-400">
                        PNG, JPG or WEBP (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Short Description
          </label>
          <input
            name="shortDesc"
            required
            placeholder="Brief tagline for the product"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Full Description
          </label>
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Detailed information about the product..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Affiliate URL
          </label>
          <input
            name="affiliateUrl"
            required
            placeholder="https://shopee.co.id/..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          "Publish Product"
        )}
      </button>
    </form>
  );
}
