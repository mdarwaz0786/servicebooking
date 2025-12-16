/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  height = 300,
  name = "",
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isUserTyping = useRef(false);

  useEffect(() => {
    const currentHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    if (value && !isUserTyping.current && currentHtml === "<p></p>\n") {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [value]);

  const handleEditorChange = (state) => {
    isUserTyping.current = true;
    setEditorState(state);

    const html = draftToHtml(convertToRaw(state.getCurrentContent()));

    onChange?.({
      target: {
        name,
        value: html,
      },
    });
  };

  return (
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
      editorStyle={{
        height: `${height}px`,
        padding: "10px",
        overflowY: "auto",
      }}
    />
  );
};

export default TextEditor;
