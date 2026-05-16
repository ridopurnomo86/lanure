/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Category } from "@/db/schema";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<{ url: string; type: string }[]>([]);
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setSlug(generateSlug(newName));
  };

  const onError = (err: any) => {
    console.error("Error", err);
    setError("Upload failed. Please try again.");
    setUploading(false);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setImages((prev) => [...prev, res.url]);
    setUploading(false);
    setError("");
  };

  const onUploadStart = () => {
    if (!slug) {
      setError("Please enter a product name first to generate a folder.");
      return;
    }
    setUploading(true);
    setError("");
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addVideo = (url: string) => {
    if (!url) return;
    let type = "other";
    if (url.includes("tiktok.com")) type = "tiktok";
    else if (url.includes("instagram.com")) type = "instagram";
    else if (url.includes("youtube.com") || url.includes("youtu.be"))
      type = "youtube";

    setVideos((prev) => [...prev, { url, type }]);
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    (data as any).images = images;
    (data as any).videos = videos;
    (data as any).image = images[0]; // Set first image as main image

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/admin?success=true");
        router.refresh();
        setImages([]);
        setSlug("");
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add product.");
      }
    } catch (err) {
      setError(`${err}An error occurred. Please try again.`);
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
              onChange={handleNameChange}
              placeholder="e.g. Ceramide Barrier Cream"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Slug</label>
            <input
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ceramide-barrier-cream"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50 font-mono text-xs"
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
            <select
              name="categoryId"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-white text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
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
            Product Images
          </label>

          <div className="grid grid-cols-2 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group"
              >
                <Image
                  src={url}
                  alt={`Product ${index}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur shadow-md rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <X size={16} />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-1 bg-primary text-white text-[10px] text-center font-bold">
                    MAIN IMAGE
                  </div>
                )}
              </div>
            ))}

            <div className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2 text-slate-400">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin text-primary" size={24} />
                  <p className="text-[10px] font-medium animate-pulse text-center px-2">
                    Uploading...
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    size={20}
                    className={cn("text-primary", !slug && "opacity-20")}
                  />
                  <p className="text-[10px] font-semibold text-slate-600">
                    {!slug ? "Enter Name First" : "Add Image"}
                  </p>
                  <IKUpload
                    fileName={`product-${Date.now()}.jpg`}
                    folder={`/products/${slug || "temp"}`}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadStart={onUploadStart}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-700 block">
          Product Video Reviews (TikTok, Instagram, YouTube)
        </label>
        <div className="flex gap-2">
          <input
            id="videoInput"
            type="text"
            placeholder="Paste TikTok/IG/YouTube link here..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "videoInput",
              ) as HTMLInputElement;
              addVideo(input.value);
              input.value = "";
            }}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            Add Video
          </button>
        </div>
        {videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group"
              >
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-bold uppercase text-primary">
                    {v.type}
                  </span>
                  <span className="text-xs text-slate-600 truncate max-w-[200px]">
                    {v.url}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(i)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
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
};

export default Form;
