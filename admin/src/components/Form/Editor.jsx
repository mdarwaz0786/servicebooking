/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const Editor = ({
  id = "editor",
  name = "editor",
  value = "",
  onChange,
  height = 300,
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.CKEDITOR && !editorRef.current) {
      editorRef.current = window.CKEDITOR.replace(id, {
        height,
      });

      editorRef.current.setData(value || "");

      editorRef.current.on("change", () => {
        onChange?.(editorRef.current.getData());
      });
    };

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy(true);
        editorRef.current = null;
      };
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getData()) {
      editorRef.current.setData(value || "");
    };
  }, [value]);

  return (
    <textarea
      id={id}
      name={name}
      className="form-control"
    />
  );
};

export default Editor;