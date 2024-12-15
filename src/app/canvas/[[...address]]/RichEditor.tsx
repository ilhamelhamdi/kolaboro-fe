import React, { useEffect, useState } from "react";
import { DraftEditorCommand, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js default styles
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

interface RichEditorProps {
  onHtmlChange: (html: string) => void;
  initialHtml?: string;
}

function RichEditor({ onHtmlChange, initialHtml = "" }: RichEditorProps) {
  const initialContentState = stateFromHTML(initialHtml);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(initialContentState)
  );

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    onHtmlChange(html);
  }, [editorState]);

  return (
    <div className="editor-container border rounded-md p-4 bg-white min-h-[100px]">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Write your note here..."
        customStyleMap={{
          editorOutline: { outline: "none" },
        }}
      />
    </div>
  );
}

export default RichEditor;
