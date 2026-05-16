"use client";

import { useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import Form from "./Form";
import CategoryManager from "./CategoryManager";
import VideoUploadManager from "./VideoUploadManager";
import BlogForm from "./BlogForm";
import { Package, Tag, Film, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const MainAdmin = () => {
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "videos" | "blog">("products");

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your products, blog posts, and store content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-[320px] sm:max-w-none">
              <button
                onClick={() => setActiveTab("products")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0",
                  activeTab === "products"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Package size={18} />
                Products
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0",
                  activeTab === "categories"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Tag size={18} />
                Categories
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0",
                  activeTab === "videos"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Film size={18} />
                Videos
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0",
                  activeTab === "blog"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Newspaper size={18} />
                Blog
              </button>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8">
          {activeTab === "products" && <Form />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "videos" && <VideoUploadManager />}
          {activeTab === "blog" && <BlogForm />}
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
