/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, X, Film, CheckCircle2 } from "lucide-react";

const VideoUploadManager = () => {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState("");
  const [, setSuccess] = useState(false);

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setVideoUrl(res.url);
    if (res.thumbnailUrl) setThumbnailUrl(res.thumbnailUrl);
    setUploading(false);
    setSuccess(true);
    setError("");
  };

  const onError = (err: any) => {
    console.error("Error", err);
    setError("Upload failed. Please try again.");
    setUploading(false);
    setSuccess(false);
  };

  const onUploadStart = () => {
    setUploading(true);
    setError("");
    setSuccess(false);
  };

  const reset = () => {
    setVideoUrl("");
    setThumbnailUrl("");
    setSuccess(false);
    setError("");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Film size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Upload Video File
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {!videoUrl ? (
            <div className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-4 text-slate-400 overflow-hidden p-12">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin text-primary" size={40} />
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700">
                      Uploading Video...
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      This may take a while depending on file size
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-primary/5 rounded-full text-primary">
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700">
                      Click or drag video to upload
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      MP4, WebM or MOV (Max 50MB)
                    </p>
                  </div>
                  <IKUpload
                    fileName={`vid-${Date.now()}.mp4`}
                    folder="/videos"
                    tags={["admin-upload"]}
                    useUniqueFileName={true}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadStart={onUploadStart}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="video/*"
                  />
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full"
                  poster={thumbnailUrl}
                />
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-lg hover:bg-red-50 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-emerald-900 text-sm">
                    Upload Successful!
                  </p>
                  <p className="text-xs text-emerald-700 mt-1 truncate">
                    {videoUrl}
                  </p>
                  <button
                    onClick={() => navigator.clipboard.writeText(videoUrl)}
                    className="mt-3 px-4 py-2 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all"
                  >
                    Copy Video URL
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <X size={18} />
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed">
        <h3 className="text-sm font-bold text-slate-700 mb-2 italic">
          How to use:
        </h3>
        <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
          <li>Upload your video file (MP4/WebM) here.</li>
          <li>
            Once uploaded, copy the <strong>Video URL</strong>.
          </li>
          <li>
            Go to the <strong>Products</strong> tab and paste the URL into the
            Video Reviews section.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoUploadManager;
