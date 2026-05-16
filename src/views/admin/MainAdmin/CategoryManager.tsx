/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { Category } from "@/db/schema";

const CategoryManager = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [label, setLabel] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLabel(val);
    setSlug(generateSlug(val));
  };

  const onSuccess = (res: any) => {
    setImage(res.url);
    setUploading(false);
  };

  const onError = (err: any) => {
    console.error(err);
    setUploading(false);
    setError("Image upload failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !slug || !image) {
      setError("Please fill all fields and upload an image");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify({ label, slug, image }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setLabel("");
        setSlug("");
        setImage("");
        fetchCategories();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add category");
      }
    } catch (err) {
      setError(`${err}Something went wrong`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Create Category Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Plus size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Add New Category</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Category Label
              </label>
              <input
                value={label}
                onChange={handleLabelChange}
                placeholder="e.g. Moisturizer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="moisturizer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50 font-mono text-xs"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Save Category"
              )}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 block">
              Category Image
            </label>
            <div className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2 text-slate-400 overflow-hidden">
              {image ? (
                <>
                  <Image
                    src={image}
                    alt="Category"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur shadow-md rounded-full text-red-500 z-20"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : uploading ? (
                <>
                  <Loader2 className="animate-spin text-primary" size={24} />
                  <p className="text-xs font-medium">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload size={24} className="text-primary" />
                  <p className="text-xs font-semibold text-slate-600 text-center px-4">
                    Click to upload category icon/image
                  </p>
                  <IKUpload
                    fileName={`cat-${Date.now()}.jpg`}
                    folder="/categories"
                    onSuccess={onSuccess}
                    onError={onError}
                    onUploadStart={() => setUploading(true)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          Existing Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 truncate">
                  {cat.label}
                </h3>
                <p className="text-[10px] font-mono text-slate-400 truncate">
                  /{cat.slug}
                </p>
              </div>
              {/* Optional: Add delete button here if API exists */}
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-slate-400 text-sm italic col-span-full py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No categories found. Add your first category above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
