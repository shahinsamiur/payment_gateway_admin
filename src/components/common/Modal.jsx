import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function Modal({
  open,
  onClose,
  title,
  children,
  width = 500,
  childPadding = 2,
}) {
  return (
    <MuiModal open={open} onClose={onClose} sx={{ mx: { xs: 2, md: "auto" } }}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: width },
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <Stack
          flexDirection="row"
          sx={{
            position: "sticky",
            top: 0,
            borderBottom: 1,
            borderBottomColor: "divider",
            backgroundColor: "background.paper",
            zIndex: 2,
            pt: 0.5,
            pb: 0.5,
          }}
        >
          {typeof title === "string" ? (
            <Typography variant="h6" align="center" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          ) : (
            title
          )}

          <IconButton onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
        <Box sx={{ p: childPadding }}>{children}</Box>
      </Paper>
    </MuiModal>
  );
}

export default Modal;
