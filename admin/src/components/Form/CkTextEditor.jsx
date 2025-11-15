import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkTextEditor = ({
  label,
  name,
  value = "",
  onChange = () => { },
  readonly = false,
  placeholder = "Start typing here...",
  config = {},
  height = 400,
  required = false,
  error = "",
}) => {
  // Merge default CKEditor config with props
  const editorConfig = {
    placeholder,
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "removeFormat",
      "|",
      "link",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "imageUpload",
      "imageInsert",
      "imageStyle:full",
      "imageStyle:side",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "alignment",
      "fontColor",
      "fontBackgroundColor",
      "fontSize",
      "fontFamily",
      "|",
      "horizontalLine",
      "pageBreak",
      "|",
      "outdent",
      "indent",
      "|",
      "specialCharacters",
      "highlight",
      "codeBlock",
      "code",
      "removeFormat",
    ],
    removePlugins: ["Title"],
    readOnly: readonly,
    ...config,
  };

  return (
    <div className="form-wrap mb-3">
      {label && (
        <label className="col-form-label" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div
        className={`border rounded ${error ? "border-danger" : "border-secondary"}`}
        style={{ minHeight: height }}
      >
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={editorConfig}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default CkTextEditor;
