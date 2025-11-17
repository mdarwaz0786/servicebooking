import { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ value = "", onChange, placeholder = "Start typing...", height = 300, name = '' }) => {
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (state) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: html,
        },
      });
    }
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ["inline", "blockType", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
        }}
        placeholder={placeholder}
        wrapperClassName="border rounded"
        editorClassName="p-2"
        editorStyle={{ height: `${height}px`, padding: "10px", overflowY: "auto" }}
      />
    </div>
  );
};

export default TextEditor;
