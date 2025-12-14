"use client";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Box, Button, Paper, Popover } from "@mui/material";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const AlignMenu = ({ editor }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "align-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatAlignLeftIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper>
          <Button
            onClick={() => {
              editor.chain().focus().setTextAlign("left").run();
              handleClose();
            }}
            variant={
              editor.isActive({ textAlign: "left" }) ? "contained" : "text"
            }
            sx={{ px: 1, minWidth: "fit-content" }}
          >
            <FormatAlignLeftIcon />
          </Button>
          <Button
            onClick={() => {
              editor.chain().focus().setTextAlign("center").run();
              handleClose();
            }}
            variant={
              editor.isActive({ textAlign: "center" }) ? "contained" : "text"
            }
            sx={{ px: 1, minWidth: "fit-content" }}
          >
            <FormatAlignCenterIcon />
          </Button>
          <Button
            onClick={() => {
              editor.chain().focus().setTextAlign("right").run();
              handleClose();
            }}
            variant={
              editor.isActive({ textAlign: "right" }) ? "contained" : "text"
            }
            sx={{ px: 1, minWidth: "fit-content" }}
          >
            <FormatAlignRightIcon />
          </Button>
        </Paper>
      </Popover>
    </>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        p: 1,
        mb: 1,
        boxShadow: 1,
        gap: 1,
      }}
    >
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "contained" : "text"}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatBoldIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "contained" : "text"}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatItalicIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        variant={editor.isActive("underline") ? "contained" : "text"}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatUnderlinedIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive("paragraph") ? "contained" : "text"}
        sx={{ fontWeight: 700, px: 1.5, minWidth: "fit-content" }}
      >
        P
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "contained" : "text"
        }
        sx={{ fontWeight: 700, px: 1.5, minWidth: "fit-content" }}
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "contained" : "text"
        }
        sx={{ fontWeight: 700, px: 1.5, minWidth: "fit-content" }}
      >
        H3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        variant={
          editor.isActive("heading", { level: 4 }) ? "contained" : "text"
        }
        sx={{ fontWeight: 700, px: 1.5, minWidth: "fit-content" }}
      >
        H4
      </Button>
      <AlignMenu editor={editor} />
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "contained" : "text"}
        sx={{ px: 1.5, minWidth: "fit-content" }}
      >
        <FormatListBulletedIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "contained" : "text"}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatListNumberedIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "contained" : "text"}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <FormatQuoteIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        sx={{ px: 1, minWidth: "fit-content" }}
      >
        <HorizontalRuleIcon />
      </Button>
    </Paper>
  );
};

const TiptapEditor = ({ content = "", minHeight = 600, onchange, error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Enter your text here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onchange) {
        onchange(editor.getHTML());
      }
    },
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: error ? "error.main" : "divider",
        borderRadius: 2,
        overflow: "hidden",
        color: "text.primary",
        minHeight: minHeight,
        "& .ProseMirror": {
          outline: "none",
          paddingX: 2,
          minHeight: `${minHeight - 100}px`,
          "& p": {
            margin: "0 0 1em 0",
          },
          "& p:last-child": {
            marginBottom: 0,
          },
        },
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default TiptapEditor;
