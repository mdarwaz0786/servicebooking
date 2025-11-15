import { useRef } from "react";
import JoditEditor from "jodit-pro-react";

const RichTextEditor = ({
  label,
  name,
  value = "",
  onChange = () => { },
  readonly = false,
  placeholder = "Start typing here...",
  config = {},
  height = 500,
  required = false,
  error = "",
}) => {
  const editor = useRef(null);

  const defaultConfig = {
    readonly,
    placeholder,
    height,
    uploader: {
      url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
    },
    filebrowser: {
      ajax: {
        url: "https://xdsoft.net/jodit/finder/",
      },
      height: 580,
    },
    toolbarAdaptive: true,
    toolbarSticky: false,
    removeButtons: ["about"],
    ...config,
  };

  return (
    <div className="form-wrap mb-3">
      {label && (
        <label className="col-form-label" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className={`border rounded ${error ? "border-danger" : "border-secondary"}`}>
        <JoditEditor
          ref={editor}
          value={value}
          config={defaultConfig}
          tabIndex={1}
          onBlur={(newContent) => onChange(newContent)}
        />
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default RichTextEditor;