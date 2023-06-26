import dynamic from "next/dynamic";
import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { render } from "react-dom";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


function ReactEditor({ register, inputName,setValue,defaultValue }:any) {

    // <ReactEditor register={{ ref: register }} inputName="description" />
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const [code, setCode]:any = useState(defaultValue);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const editor = editorRef.current?.getEditor();

    const handleTextChange = () => {
      setCode(editor?.getContents());
    };

    editor?.on("text-change", handleTextChange);

    return () => {
      editor?.off("text-change", handleTextChange);
    };
  }, []); // <-- Empty dependency array

  useLayoutEffect(() => {
    const editor = editorRef.current?.getEditor();

    const handleKeyDown = (event:any) => {
      if (event.key !== "Enter") {
        // Update editor focus on any key press except Enter key
        editor?.focus();
      }
    };

    editor?.container.addEventListener("keydown", handleKeyDown);

    return () => {
      editor?.container.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // <-- Empty dependency array

  console.log(code)
  return (
    <div className="mb-14">
      {typeof document !== "undefined" && (
        <ReactQuill
          // ref={editorRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={code}
          onChange={(value, delta, source, editor) => {
            setCode(value);
            // register("description",{value:{...code}});
            setValue('description',code)
          }}
          style={{ height: '300px' }}
        />
      )}
    </div>
  );
}

export default ReactEditor;