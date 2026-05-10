"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useState } from "react";


export default function NewPostPage() {
     const [bannerUrl, setBannerUrl] = useState("");
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

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-6" style={{ color: "#a855f7" }}>
          New Article
        </h1>
        
        <input
          type="text"
          placeholder="Article Title"
          className="w-full mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-2xl outline-none"
        />
        <div className="mb-6">

  <p className="mb-2 text-zinc-300 font-semibold">
    Article Banner
  </p>

  <label className="inline-block px-4 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 cursor-pointer transition">
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

      <p className="mt-2 text-sm text-zinc-400">
        {bannerUrl}
      </p>
    </div>
  )}

</div>
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 min-h-[500px]">
            <div className="flex gap-2 mb-4 flex-wrap">

  <button
  onClick={() => editor?.chain().focus().toggleBold().run()}
  className={`px-4 py-2 rounded-lg transition ${
    editor?.isActive("bold")
      ? "bg-purple-600"
      : "bg-zinc-800 hover:bg-zinc-700"
  }`}
>
  Bold
</button>

  <button
    onClick={() => editor?.chain().focus().toggleItalic().run()}
    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
  >
    Italic
  </button>

  <button
  onClick={() => {
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  }}
  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
>
  H1
</button>
<button
  onClick={() => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  }}
  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
>
  H2
</button>

<button
  onClick={() => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  }}
  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
>
  H3
</button>

<button
  onClick={() => {
    editor?.chain().focus().toggleBulletList().run();
  }}
  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
>
  Bullet List
</button>
<label className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
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
          <EditorContent
  editor={editor}
  className="prose prose-invert max-w-none min-h-[400px]"
/>
        </div>

      </div>
    </main>
  );
}