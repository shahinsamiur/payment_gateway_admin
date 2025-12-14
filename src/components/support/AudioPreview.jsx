import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const AudioPreview = ({ audioBlob, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioURL);

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      };

      drawWaveform();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioBlob]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0288d1"; // MUI primary blue

    const barCount = 50;
    const barWidth = width / barCount;
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height;
      ctx.fillRect(i * barWidth, height - barHeight, barWidth * 0.6, barHeight);
    }
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        backgroundColor: "secondary.dark",
        borderRadius: 1,
        position: "relative",
      }}
    >
      <IconButton
        onClick={togglePlay}
        color="primary"
        sx={{
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
          width: 36,
          height: 36,
        }}
      >
        {isPlaying ? (
          <PauseIcon fontSize="small" />
        ) : (
          <PlayArrowIcon fontSize="small" />
        )}
      </IconButton>

      <canvas
        ref={canvasRef}
        width={200}
        height={40}
        style={{ borderRadius: 4, flexShrink: 0 }}
      />

      <Typography variant="body2" color="common.white">
        {formatTime(currentTime)}
      </Typography>
      {isLoading && (
        <LinearProgress
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        />
      )}
    </Paper>
  );
};

export default AudioPreview;
