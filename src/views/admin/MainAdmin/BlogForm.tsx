/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, X, Newspaper, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSlug(generateSlug(val));
  };

  const onSuccess = (res: any) => {
    setImage(res.url);
    setUploading(false);
  };

  const addTag = (tag: string) => {
    if (!tag) return;
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload a featured image.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    (data as any).image = image;
    (data as any).tags = tags;

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.refresh();
        setImage("");
        setSlug("");
        setTags([]);
        (e.target as HTMLFormElement).reset();
        alert("Blog post published successfully!");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to publish blog post.");
      }
    } catch (err) {
      setError(`${err} An error occurred. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Newspaper size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            Compose New Blog Post
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <X size={18} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Post Title
              </label>
              <input
                name="title"
                required
                onChange={handleTitleChange}
                placeholder="e.g. 5 Serum Terbaik 2026..."
                className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-lg font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Slug (URL Path)
              </label>
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="5-serum-terbaik-2026"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-slate-50 font-mono text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                required
                rows={3}
                placeholder="A brief summary of the post..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Content (HTML Supported)
              </label>
              <textarea
                name="content"
                required
                rows={15}
                placeholder="Write your story here..."
                className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-serif text-lg leading-relaxed"
              />
            </div>
          </div>

          {/* Sidebar / Meta */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 block">
                Featured Image
              </label>
              <div className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 overflow-hidden group">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt="Featured"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : uploading ? (
                  <>
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <p className="text-xs font-bold text-slate-500">
                      Uploading...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-500">
                      Upload Header Image
                    </p>
                    <IKUpload
                      fileName={`blog-${Date.now()}.jpg`}
                      folder="/blog"
                      onSuccess={onSuccess}
                      onUploadStart={() => setUploading(true)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Author
                </label>
                <input
                  name="author"
                  required
                  defaultValue="Lanure Editor"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm bg-white"
                >
                  <option value="Rekomendasi">Rekomendasi</option>
                  <option value="Tips">Tips</option>
                  <option value="Review">Review</option>
                  <option value="News">News</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Date</label>
                <input
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm bg-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Tags</label>
              <div className="flex gap-2">
                <input
                  id="tagInput"
                  type="text"
                  placeholder="Add tag..."
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById(
                      "tagInput",
                    ) as HTMLInputElement;
                    addTag(input.value);
                    input.value = "";
                  }}
                  className="p-2 bg-slate-900 text-white rounded-xl"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
