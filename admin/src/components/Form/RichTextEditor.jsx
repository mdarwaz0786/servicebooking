import { useRef, useMemo } from "react";
import JoditEditor from "jodit-pro-react";
import debounce from "lodash.debounce";

const RichTextEditor = ({
  value = "",
  onChange = () => { },
  height = 500,
  placeholder = "",
  readonly = false,
}) => {
  const editor = useRef(null);

  const debouncedChange = useMemo(() =>
    debounce((val) => {
      onChange(val);
    }, 300),
    [onChange]
  );

  const config = useMemo(
    () => ({
      readonly,
      height,
      placeholder,
      uploader: {
        url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
      },
      filebrowser: {
        ajax: {
          url: "https://xdsoft.net/jodit/finder/",
        },
        height: 580,
      },
    }),
    [readonly, height, placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => onChange(newContent)}
      onChange={(newContent) => debouncedChange(newContent)}
    />
  );
};

export default RichTextEditor;
