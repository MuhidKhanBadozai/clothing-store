import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Link as LinkIcon, 
  Loader2, 
  Check, 
  Star, 
  ExternalLink,
  HardDrive,
  Settings,
  Plus
} from 'lucide-react';
import { googleDriveService } from '../services/googleDriveService';

interface ImageUploadDropzoneProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  onOpenConfig?: () => void;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  images,
  onChange,
  onOpenConfig,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const driveConfig = googleDriveService.getConfig();
  const isDriveConfigured = Boolean(driveConfig.scriptUrl && driveConfig.scriptUrl.trim());

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      if (!file.type.startsWith('image/')) continue;

      setUploadProgress(`Uploading ${i + 1}/${fileArray.length}: ${file.name}...`);
      try {
        const uploadResult = await googleDriveService.uploadImage(file);
        newUrls.push(uploadResult.url);
      } catch (err: any) {
        alert(`Failed to upload ${file.name}: ${err.message}`);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }

    setIsUploading(false);
    setUploadProgress(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleManualAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const directUrl = googleDriveService.convertToDirectGoogleDriveUrl(urlInput.trim());
    onChange([...images, directUrl]);
    setUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([selected, ...rest]);
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Header and Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>Product Photography &amp; Angles</span>
          <span className="text-[10px] text-neutral-400 font-normal">
            ({images.length} {images.length === 1 ? 'image' : 'images'})
          </span>
        </label>

        <div className="flex items-center gap-2">
          {/* Google Drive Status Pill */}
          <button
            type="button"
            onClick={onOpenConfig}
            className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 border transition-colors cursor-pointer ${
              isDriveConfigured
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
            }`}
            title="Configure Google Drive Storage Folder"
          >
            <HardDrive className="w-3 h-3" />
            <span>{isDriveConfigured ? 'Google Drive Active' : 'Setup Google Drive'}</span>
            <Settings className="w-2.5 h-2.5 ml-0.5 opacity-60" />
          </button>

          {/* Mode Switcher */}
          <div className="inline-flex rounded-xs bg-neutral-100 dark:bg-neutral-800 p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                mode === 'upload'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Upload / Drop
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                mode === 'url'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Paste Link
            </button>
          </div>
        </div>
      </div>

      {/* Upload Drop Area */}
      {mode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xs p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-amber-500 bg-amber-500/10 scale-[0.99]'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 bg-neutral-50/50 dark:bg-neutral-950/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />

          {isUploading ? (
            <div className="py-2 flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
              <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {uploadProgress || 'Uploading to Google Drive...'}
              </p>
              <p className="text-[10px] text-neutral-400">
                Generating public high-speed CDN preview links
              </p>
            </div>
          ) : (
            <div className="py-1 flex flex-col items-center justify-center space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center mb-1">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                Drag &amp; drop photos here, or <span className="text-amber-600 dark:text-amber-400 underline">browse PC</span>
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 max-w-sm">
                Supports JPG, PNG, WEBP. Uploads directly into your Google Drive &amp; attaches to product catalog.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Manual URL Paste Form */
        <form onSubmit={handleManualAddUrl} className="flex gap-2">
          <input
            type="url"
            placeholder="Paste Google Drive or web image URL (e.g. https://drive.google.com/file/d/...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-xs flex items-center gap-1.5 hover:opacity-90 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </form>
      )}

      {/* Uploaded Images List / Grid */}
      {images.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-medium text-neutral-500 flex items-center justify-between">
            <span>Uploaded Product Gallery:</span>
            <span>First photo is the default card cover</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {images.map((imgUrl, idx) => (
              <div
                key={`${imgUrl}-${idx}`}
                className={`relative group rounded-xs border overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[3/4] flex flex-col justify-between p-1.5 transition-all ${
                  idx === 0
                    ? 'border-amber-500 shadow-xs ring-1 ring-amber-500/30'
                    : 'border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {/* Background Image */}
                <img
                  referrerPolicy="no-referrer"
                  src={imgUrl}
                  alt={`Product photo ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top z-0"
                  onError={(e) => {
                    // Fallback in case of broken link
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  {idx === 0 ? (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5 shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-neutral-950" /> Cover
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      className="px-1.5 py-0.5 rounded bg-neutral-900/80 backdrop-blur-xs text-white text-[9px] hover:bg-amber-500 hover:text-black transition-colors"
                      title="Set as Main Cover Photo"
                    >
                      Make Cover
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1 rounded bg-neutral-900/80 hover:bg-red-600 text-white backdrop-blur-xs transition-colors"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Bottom Bar on Hover */}
                <div className="relative z-10 mt-auto bg-neutral-950/80 backdrop-blur-xs p-1 rounded text-[10px] text-white flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="truncate max-w-[70px] text-[9px] font-mono text-neutral-300">
                    #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(imgUrl, idx)}
                      className="p-1 hover:text-amber-400"
                      title="Copy Direct Link"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <LinkIcon className="w-3 h-3" />
                      )}
                    </button>
                    <a
                      href={imgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 hover:text-amber-400"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
