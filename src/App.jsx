import { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

// Custom inline styles
const customStyleMap = {
  RED: { color: "red" },
  UNDERLINE: { textDecoration: "underline", color: "black" },
};

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Load content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(savedContent));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (err) {
        console.error("Error loading content:", err);
      }
    }
  }, []);

  // Save content to localStorage
  const handleSave = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(content))
    );
    alert("Content saved!");
  };

  // Clear all inline styles from selected text
  const clearInlineStyles = (editorState) => {
    const selection = editorState.getSelection();
    let newContentState = editorState.getCurrentContent();

    const currentStyles = editorState.getCurrentInlineStyle();
    currentStyles.forEach((style) => {
      newContentState = Modifier.removeInlineStyle(
        newContentState,
        selection,
        style
      );
    });

    return EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
  };

  // Reset block type to 'unstyled'
  const resetBlockType = (editorState) => {
    const selection = editorState.getSelection();
    return RichUtils.toggleBlockType(editorState, "unstyled", selection);
  };

  // Apply formatting based on trigger
  const applyFormatting = (triggerLength, blockType = null, style = null) => {
    let newEditorState = clearInlineStyles(editorState);

    // Reset block type before applying a new one
    newEditorState = resetBlockType(newEditorState);

    const selection = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();

    // Adjust selection to remove trigger characters
    const updatedSelection = selection.merge({
      anchorOffset: 0,
      focusOffset: triggerLength,
    });

    const newContentState = Modifier.replaceText(
      contentState,
      updatedSelection,
      ""
    );

    newEditorState = EditorState.push(
      newEditorState,
      newContentState,
      "remove-range"
    );

    // Apply block type if specified
    if (blockType) {
      newEditorState = RichUtils.toggleBlockType(newEditorState, blockType);
    }

    // Apply inline style if specified
    if (style) {
      newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
    }

    setEditorState(newEditorState);
  };

  // Handle space trigger
  const handleBeforeInput = (chars) => {
    if (chars === " ") {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(selection.getStartKey());
      const text = block.getText().trim();

      // Apply block or inline formatting based on triggers
      if (text === "#") {
        applyFormatting(1, "header-one");
        return "handled";
      }
      if (text === "*") {
        applyFormatting(1, null, "BOLD");
        return "handled";
      }
      if (text === "**") {
        applyFormatting(2, null, "RED");
        return "handled";
      }
      if (text === "***") {
        applyFormatting(3, null, "UNDERLINE");
        return "handled";
      }
    }
    return "not-handled";
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
      <h2 style={{ textAlign: "center" }}>Draft.js Editor</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          minHeight: "200px",
          backgroundColor: "#fff",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={customStyleMap}
          placeholder="Type #, *, **, *** and press space..."
          blockStyleFn={(contentBlock) => {
            const type = contentBlock.getType();
            if (type === "header-one") {
              return "header-one-custom";
            }
          }}
        />
      </div>
      <button
        onClick={handleSave}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save
      </button>

      {/* Inline CSS for Header-One */}
      <style>
        {`
          .header-one-custom {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
        `}
      </style>
    </div>
  );
};

export default App;
