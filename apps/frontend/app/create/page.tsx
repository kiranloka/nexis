"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Bold,
  Italic,
  List,
  Link,
  Hash,
  Quote,
  Code,
} from "lucide-react";
import Image from "next/image";
interface MarketData {
  name: string;
  description: string;
  image: string | null;
  endDate: string;
  category: string;
}

const CreateMarketPage: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    name: "",
    description: "",
    image: null,
    endDate: "",
    category: "politics",
  });

  const [isPreview, setIsPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { value: "politics", label: "Politics", emoji: "🏛️" },
    { value: "crypto", label: "Crypto", emoji: "₿" },
    { value: "sports", label: "Sports", emoji: "⚽" },
    { value: "tech", label: "Technology", emoji: "💻" },
    { value: "business", label: "Business", emoji: "📈" },
    { value: "entertainment", label: "Entertainment", emoji: "🎬" },
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setMarketData((prev) => ({
        ...prev,
        image: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const insertMarkdown = (syntax: string, placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    let newText = "";
    let newCursorPos = start;

    switch (syntax) {
      case "bold":
        newText = `**${textToInsert}**`;
        newCursorPos = start + 2 + textToInsert.length;
        break;
      case "italic":
        newText = `*${textToInsert}*`;
        newCursorPos = start + 1 + textToInsert.length;
        break;
      case "heading":
        newText = `## ${textToInsert}`;
        newCursorPos = start + 3 + textToInsert.length;
        break;
      case "list":
        newText = `- ${textToInsert}`;
        newCursorPos = start + 2 + textToInsert.length;
        break;
      case "link":
        newText = `[${textToInsert || "link text"}](url)`;
        newCursorPos = start + newText.length - 4;
        break;
      case "quote":
        newText = `> ${textToInsert}`;
        newCursorPos = start + 2 + textToInsert.length;
        break;
      case "code":
        newText = `\`${textToInsert}\``;
        newCursorPos = start + 1 + textToInsert.length;
        break;
      default:
        return;
    }

    const newValue =
      textarea.value.substring(0, start) +
      newText +
      textarea.value.substring(end);

    setMarketData((prev) => ({ ...prev, description: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>'
      )
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-400 hover:text-blue-300 underline">$1</a>'
      )
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-white/80">$1</blockquote>'
      )
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-white/10 px-2 py-1 rounded text-sm">$1</code>'
      )
      .replace(/\n/g, "<br>");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white">
      {/* Floating gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            Create New Market
          </h1>
          <p className="text-white/60 text-lg">
            Set up a prediction market for others to trade on
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Name */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <label className="block text-white/90 text-sm font-medium mb-3">
                Market Question
              </label>
              <input
                type="text"
                value={marketData.name}
                onChange={(e) =>
                  setMarketData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Will Bitcoin reach $100k by end of 2025?"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all duration-200 text-lg"
              />
            </div>

            {/* Image Upload */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <label className="block text-white/90 text-sm font-medium mb-3">
                Market Image
              </label>

              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400/50 bg-blue-500/10"
                    : "border-white/20 hover:border-white/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {marketData.image ? (
                  <div className="relative">
                    <Image
                      src={marketData.image}
                      width={40}
                      height={40}
                      alt="Market"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setMarketData((prev) => ({ ...prev, image: null }))
                      }
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-2 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">
                      Drop an image here or click to upload
                    </p>
                    <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleImageUpload(e.target.files[0])
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Description Editor */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <label className="text-white/90 text-sm font-medium">
                  Description
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPreview(false)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      !isPreview
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsPreview(true)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      isPreview
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Markdown Toolbar */}
              {!isPreview && (
                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <button
                    onClick={() => insertMarkdown("bold", "bold text")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("italic", "italic text")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("heading", "Heading")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Heading"
                  >
                    <Hash className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("list", "List item")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("link")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("quote", "Quote")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("code", "code")}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Editor/Preview */}
              {isPreview ? (
                <div
                  className="min-h-48 p-4 bg-white/5 rounded-xl border border-white/10 text-white/90"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(marketData.description),
                  }}
                />
              ) : (
                <textarea
                  ref={textareaRef}
                  value={marketData.description}
                  onChange={(e) =>
                    setMarketData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe your market... You can use **bold**, *italic*, ## headings, - lists, [links](url), > quotes, and `code`"
                  className="w-full h-48 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all duration-200 resize-none"
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <label className="block text-white/90 text-sm font-medium mb-3">
                Category
              </label>
              <select
                value={marketData.category}
                onChange={(e) =>
                  setMarketData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option
                    key={cat.value}
                    value={cat.value}
                    className="bg-gray-900"
                  >
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* End Date */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <label className="block text-white/90 text-sm font-medium mb-3">
                Resolution Date
              </label>
              <input
                type="datetime-local"
                value={marketData.endDate}
                onChange={(e) =>
                  setMarketData((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all duration-200"
              />
            </div>

            {/* Create Button */}
            <button
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              style={{
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              Create Market
            </button>

            {/* Preview Card */}
            {marketData.name && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
                <h3 className="text-white/90 text-sm font-medium mb-3">
                  Preview
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  {marketData.image && (
                    <img
                      src={marketData.image}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="text-white/95 font-medium mb-2 text-sm leading-tight">
                    {marketData.name}
                  </h4>
                  <div className="flex gap-2">
                    <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-2 text-center flex-1">
                      <div className="text-green-300 font-bold text-sm">
                        50¢
                      </div>
                      <div className="text-green-200/80 text-xs">YES</div>
                    </div>
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2 text-center flex-1">
                      <div className="text-red-300 font-bold text-sm">50¢</div>
                      <div className="text-red-200/80 text-xs">NO</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketPage;
