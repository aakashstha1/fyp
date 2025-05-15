import React, { useState } from "react";


function Editor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ height: "200px" }}
    />
  );
}

export default Editor;
