import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AudioPreview from "./AudioPreview";

const VoicePreview = ({
  closeRecording,
  stopRecording,
  recording,
  duration = 60,
  audioBlob,
  isLoading,
}) => {
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    if (!recording) return;

    const interval = setInterval(() => {
      setAudioDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    if (audioDuration >= duration && recording) {
      stopRecording();
    }
  }, [audioDuration, recording, stopRecording]);

  const progress = (audioDuration / duration) * 100;

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        width: "100%",
        p: 2,
        pt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "secondary.dark",
        borderRadius: 2,
      }}
    >
      {recording && (
        <>
          {/* Progress bar */}
          <Box sx={{ width: "100%", mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 1,
                backgroundColor: "secondary.main",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "secondary.light",
                },
              }}
            />
          </Box>

          {/* Timer */}
          <Typography variant="body2" color="common.white" fontWeight="medium">
            {audioDuration}s / {duration}s
          </Typography>
        </>
      )}

      {/* Audio preview */}
      {!recording && audioBlob && (
        <AudioPreview audioBlob={audioBlob} isLoading={isLoading} />
      )}

      {/* Close button */}
      <IconButton
        disabled={isLoading}
        onClick={closeRecording}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          color: "common.white",
          "&:hover": { color: "error.main" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};

export default VoicePreview;
