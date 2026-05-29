"use client";
import React, { useEffect, useRef } from "react";

const Editor = ({ data, onChange }) => {
  const ejInstance = useRef(null);
  const isInitialized = useRef(false); // متغیر کنترلی برای جلوگیری از اجرای همزمان

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true; // بلافاصله علامت‌گذاری کن که در حال ساخت است
      initEditor();
    }

    return () => {
      if (
        ejInstance.current &&
        typeof ejInstance.current.destroy === "function"
      ) {
        ejInstance.current.destroy();
        ejInstance.current = null;
        isInitialized.current = false;
      }
    };
  }, []);

  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Code = (await import("@editorjs/code")).default;

    // اگر قبلاً ساخته شده بود (احتیاط اضافی)
    if (ejInstance.current) return;

    const editor = new EditorJS({
      holder: "editorjs",
      data: data || { blocks: [] },
      placeholder: "نوشتن مقاله را شروع کنید...",
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(content);
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: { levels: [2, 3, 4], defaultLevel: 2 },
        },
        list: { class: List, inlineToolbar: true },
        quote: Quote,
        code: Code,
        image: {
          class: ImageTool,
          config: {
            endpoints: { byFile: "/api/article/upload" }, // آدرس آپلود تصویر
            field: "image",
          },
        },
      },
    });
  };

  return (
    <div className="bg-white p-5 min-h-[400px]">
      <div id="editorjs"></div>
    </div>
  );
};

export default Editor;
