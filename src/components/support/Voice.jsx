import { Mic, RecordVoiceOver } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const Voice = ({
  setAudioBlob,
  recording,
  setRecording,
  mediaRecorderRef,
  stopRecording,
  isLoading,
}) => {
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        // Release the microphone to stop the browser audio icon
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  return (
    <div>
      <IconButton
        disabled={isLoading}
        color={recording ? "secondary" : "primary"}
        onClick={recording ? stopRecording : startRecording}
        title={recording ? "Stop Recording" : "Start Recording"}
      >
        {recording ? <RecordVoiceOver color="secondary" /> : <Mic />}
      </IconButton>
    </div>
  );
};

export default Voice;
