"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import BackButton from "../../components/BackButton";

import type { User } from "@supabase/supabase-js";
import { useEffect } from "react";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

const ADMIN_EMAILS = [
  "zainabshujatali@gmail.com",
  "zainabshujat826@gmail.com",
];

  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Tell your story...",
      }),

      Image,
    ],

    content: "<p></p>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none min-h-[400px]",
      },
    },
  });
  useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    setUser(data.user);

    setAuthLoading(false);
  };

  getUser();
}, []);
useEffect(() => {
  const savedDraft = localStorage.getItem("article-draft");

  if (!savedDraft) return;

  try {
    const draft = JSON.parse(savedDraft);

    setTitle(draft.title || "");
    setSlug(draft.slug || "");
    setExcerpt(draft.excerpt || "");
    setCategory(draft.category || "");
    setBannerUrl(draft.bannerUrl || "");
    setFeatured(draft.featured || false);
    setTags(draft.tags || []);

    if (editor && draft.content) {
      editor.commands.setContent(draft.content);
    }
  } catch (err) {
    console.error("Failed to restore draft", err);
  }
}, [editor]);

useEffect(() => {
  if (!editor) return;

  const draft = {
    title,
    slug,
    excerpt,
    category,
    bannerUrl,
    featured,
    tags,
    content: editor.getHTML(),
  };

  localStorage.setItem(
    "article-draft",
    JSON.stringify(draft)
  );
}, [
  title,
  slug,
  tags,
  excerpt,
  category,
  bannerUrl,
  featured,
  editor,
]);


 const handleSave = async (publish: boolean) => {
  const articleData = {
    title,
    slug,
    excerpt,
    category,
    banner: bannerUrl,
    content: editor?.getHTML(),
    featured,
    published: publish,
    tags,
  };
  if (
  !user?.email ||
  !ADMIN_EMAILS.includes(user.email)
) {
  alert("Please login with an authorized account to save or publish articles.");
  return;
}

  if (!title.trim()) {
  alert("Article title is required.");
  return;
}

if (!excerpt.trim()) {
  alert("Excerpt is required.");
  return;
}

if (!category.trim()) {
  alert("Please select a category.");
  return;
}

if (!editor?.getHTML().trim() || editor.getText().trim().length < 10) {
  alert("Article content is too short.");
  return;
}
const { data: existingPost } = await supabase
  .from("posts")
  .select("id")
  .eq("slug", slug)
  .maybeSingle();

if (existingPost) {
  alert("An article with this slug already exists.");
  return;
}

  const { data, error } = await supabase
    .from("posts")
    .insert([articleData]);
if (error) {
  console.error(error);

  alert(
    `Failed to save article: ${error.message}`
  );

  return;
}

console.log(data);

// clear saved local draft
localStorage.removeItem("article-draft");

alert(
  publish
    ? "Article published!"
    : "Draft saved!"
);
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: "#a855f7" }}
        >
          New Article
        </h1>

        {/* Title */}
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
          className="w-full mb-4 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-2xl outline-none"
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="article-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 outline-none"
        />

        {/* Excerpt */}
        <textarea
          placeholder="Short article description..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none min-h-[120px]"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white outline-none"
        >
          <option value="">Select Category</option>

          <option value="science-vs-sci-fi">
            Science V/S Sci-fi
          </option>

          <option value="behind-the-scenes">
            Behind The Scenes
          </option>

          <option value="curiosity-series">
            Curiosity Series
          </option>

          <option value="financial-month">
            Financial Month
          </option>

          <option value="friday-insights">
            Friday Insights
          </option>

          <option value="girlhood-and-stem-experiences">
            Girlhood And Stem Experiences
          </option>

          <option value="i-wonder-why">
            I Wonder Why
          </option>

          <option value="july-crisis">
            July Crisis
          </option>

          <option value="milestone-stories-and-miscellaneous">
            Milestone Stories And Miscellaneous
          </option>

          <option value="tech-demystified">
            Tech Demystified
          </option>

          <option value="tech-pulse">
            Tech Pulse
          </option>

          <option value="world-watch">
            World Watch
          </option>
        </select>
        {/* Tags */}
<div className="mb-6">
  <p className="mb-2 text-zinc-300 font-semibold">
    Tags
  </p>

  <div className="flex flex-wrap gap-2">
    {ALL_TAGS.map((tag) => (
      <button
        key={tag}
        type="button"
        onClick={() => {
          if (tags.includes(tag)) {
            setTags(tags.filter((t) => t !== tag));
          } else {
            setTags([...tags, tag]);
          }
        }}
        className={`px-3 py-2 rounded-full text-sm transition ${
          tags.includes(tag)
            ? "bg-purple-700 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        {tag}
      </button>
    ))}
  </div>
</div>

        {/* Featured Toggle */}
        <button
          onClick={() => setFeatured(!featured)}
          className={`mb-6 px-4 py-3 rounded-xl transition font-medium ${
            featured
              ? "bg-purple-700 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {featured
            ? "★ Featured Article"
            : "☆ Mark As Featured"}
        </button>

        {/* Banner Upload */}
        <div className="mb-6">

          <p className="mb-2 text-zinc-300 font-semibold">
            Article Banner
          </p>

          <label className="inline-block px-4 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 cursor-pointer transition font-medium">
            Upload Banner

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload-banner", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();

                setBannerUrl(data.url);
              }}
            />
          </label>

          {bannerUrl && (
            <div className="mt-4">
              <img
                src={bannerUrl}
                alt="Banner Preview"
                className="rounded-2xl w-full max-h-[300px] object-cover border border-zinc-700"
              />

              <p className="mt-2 text-sm text-green-400">
                Banner uploaded successfully
              </p>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 min-h-[500px]">

          {/* Toolbar */}
          <div className="sticky top-16 z-50 flex flex-wrap gap-3 mb-5 items-center bg-zinc-900/95 backdrop-blur-md py-3 border-b border-zinc-700">

            <button
              onClick={() =>
                editor?.chain().focus().toggleBold().run()
              }
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                editor?.isActive("bold")
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              }`}
            >
              Bold
            </button>

            <button
              onClick={() =>
                editor?.chain().focus().toggleItalic().run()
              }
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200"
            >
              Italic
            </button>

            <button
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: 1 })
                  .run();
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200"
            >
              H1
            </button>

            <button
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: 2 })
                  .run();
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200"
            >
              H2
            </button>

            <button
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: 3 })
                  .run();
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200"
            >
              H3
            </button>

            <button
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .toggleBulletList()
                  .run();
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200"
            >
              Bullet List
            </button>

            {/* Upload Image */}
            <label className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-200 cursor-pointer">

              Upload Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={async (e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();

                  editor
                    ?.chain()
                    .focus()
                    .setImage({ src: data.url })
                    .run();
                }}
              />
            </label>
          </div>

          {/* Editor Content */}
          <EditorContent
            editor={editor}
            className="prose prose-invert max-w-none min-h-[400px]"
          />

          {/* Save Buttons */}
          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={() => handleSave(false)}
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition font-medium text-zinc-200"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSave(true)}
              className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 transition font-medium text-white shadow-lg shadow-purple-900/30"
            >
              Publish Article
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}