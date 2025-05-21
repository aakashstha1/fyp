import React, { useRef } from "react";
import JoditEditor from "jodit-react";

function TextEditor({ content, setContent }) {
  const editor = useRef(null);

  const config = {
    height: 650,
    readonly: false,
    placeholder: "Start writing your document...",
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={() => {}} // Prevent flickering
    />
  );
}

export default TextEditor;
