import {
  useSaveSupportFileMutation,
  useUpdateConversationMutation,
} from "@/redux/features/liveSupport";
import ProfileImage from "@/utils/ProfileImage";
import { Cancel, InsertPhoto, Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  LinearProgress,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ZoomImage from "../common/ZoomImage";
import Voice from "./Voice";
import VoicePreview from "./VoicePreview";

const ChatModal = ({
  chatHistory,
  setChatHistory,
  conversation_id,
  isLoading,
  chatLoading,
  ws,
  toUserId,
  userProfile,
  userOnline,
  userName,
  conversationStatus,
  isAdminTyping,
}) => {
  const [inputValue, setInputValue] = useState("");
  const lastElement = useRef(null);
  const hasMounted = useRef(false);
  const [updateConversation] = useUpdateConversationMutation();
  const { user } = useSelector((state) => state.auth);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uplaodFile, { isLoading: fileUploading }] =
    useSaveSupportFileMutation();
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  async function handleSaveFile(file, fileName = undefined) {
    try {
      const formData = new FormData();
      formData.append("file", file, fileName);
      const response = await uplaodFile(formData).unwrap();
      return response?.fileUrl;
    } catch (error) {
      throw error;
    }
  }

  async function handleSendMessage(e) {
    try {
      e.preventDefault();

      if (inputValue.trim() === "" && !image && !audioBlob) return;

      const payload = {
        message_id: Date.now(),
        conversation_id,
        sender_type: "admin",
        sender_id: user.id,
        admin_id: user.id,
        admin_name: user.name,
        admin_profile: user.profile_image,
        user_id: toUserId,
        message_type: "text",
        message: inputValue,
        status: "sending",
      };

      if (image) {
        const link = await handleSaveFile(image);
        payload.image_url = link;
      }

      if (audioBlob) {
        payload.voice_url = await handleSaveFile(
          audioBlob,
          `recording-${Date.now()}.wav`
        );
      }

      const message = {
        type: "message",
        data: payload,
      };
      ws.current.send(JSON.stringify(message));
      setChatHistory([...chatHistory, payload]);
      setInputValue("");
      setImage(null);
      imageRef.current.value = null;
      setAudioBlob(null);
      isTypingRef.current = false;
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  // scroll to bottom on new messages
  useEffect(() => {
    if (lastElement.current) {
      if (!hasMounted.current) {
        lastElement.current.scrollIntoView({ behavior: "auto" });
        hasMounted.current = true;
      } else {
        lastElement.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatHistory, isAdminTyping.is_typing]);

  // update unread messages
  useEffect(() => {
    if (!chatHistory || chatHistory?.length === 0 || !ws.current) return;

    const unreadmessagesId = chatHistory.reduce((ids, message) => {
      if (
        message.status === "send" &&
        message.message_id != null &&
        message.sender_type === "user"
      ) {
        ids.push(message.message_id);
      }
      return ids;
    }, []);

    (async () => {
      try {
        await updateConversation({
          conversationId: conversation_id,
          data: { unread_count: 0 },
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    })();

    if (unreadmessagesId.length && ws.current.readyState === 1) {
      ws.current.send(
        JSON.stringify({
          type: "unread_messages",
          data: {
            conversation_id,
            unreadmessagesId,
            user_id: toUserId,
            sender_id: user?.id,
          },
        })
      );
    }
  }, [chatHistory]);

  const closeRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setAudioBlob(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  function handleInputChange(value) {
    setInputValue(value);

    if (ws.current.readyState !== 1) return;

    // send typing:true only once
    if (!isTypingRef.current) {
      handleSendTyping(true);
      isTypingRef.current = true;
    }

    // clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // set new timeout to send typing:false after idle time
    typingTimeoutRef.current = setTimeout(() => {
      if (ws.current.readyState === 1) {
        handleSendTyping(false);
        isTypingRef.current = false; // reset typing state
      }
    }, 2000);
  }

  const handleSendTyping = (typing) => {
    const payload = {
      type: "typing",
      data: {
        conversation_id: conversation_id,
        sender_type: "admin",
        sender_id: user?.id,
        receiver_id: toUserId,
        is_typing: typing,
      },
    };
    ws.current.send(JSON.stringify(payload));
  };

  // find last admin message
  const lastAdminMessageIndex =
    chatHistory && chatHistory?.length
      ? [...chatHistory]
          .reverse()
          .findIndex((msg) => msg.sender_type === "admin")
      : -1;
  const absoluteLastAdminIndex =
    lastAdminMessageIndex === -1
      ? -1
      : chatHistory?.length - 1 - lastAdminMessageIndex;

  return (
    <Stack
      sx={{ height: { xs: 500, md: 600, lg: 700 }, flexGrow: 1 }}
      justifyContent="space-between"
    >
      <Stack spacing={1} sx={{ padding: 2 }}>
        {isLoading || chatLoading ? (
          <Typography align="center">Loading...</Typography>
        ) : chatHistory?.length ? (
          chatHistory.map((message, i) => {
            if (!message.message && !message.voice_url && !message.image_url) {
              return null;
            }
            return (
              <Box
                sx={{
                  alignSelf:
                    message.sender_type === "admin" ? "flex-end" : "flex-start",
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "flex-start",
                  maxWidth: "80%",
                  gap: 0.5,
                }}
                key={message.message_id}
              >
                {message.sender_type === "user" && (
                  <ProfileImage
                    online_status={userOnline}
                    profile_image={userProfile}
                    user_name={userName}
                  />
                )}
                <div>
                  {message.image_url && (
                    <ZoomImage img={message.image_url} baseUrl={false} />
                  )}

                  {message.voice_url && (
                    <audio controls>
                      <source src={message.voice_url} type="audio/mpeg" />
                    </audio>
                  )}

                  {message.message && (
                    <Paper
                      variant="outlined"
                      key={message.message_id}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 3,
                        ...(message.sender_type === "user"
                          ? { borderBottomLeftRadius: 0 }
                          : { borderBottomRightRadius: 0 }),
                      }}
                    >
                      <Typography>{message.message}</Typography>
                    </Paper>
                  )}
                  {message.sender_type === "admin" &&
                    i === absoluteLastAdminIndex && (
                      <Typography fontSize={13} align="right">
                        {message.status}
                      </Typography>
                    )}
                </div>
              </Box>
            );
          })
        ) : (
          <Typography align="center">No messages found</Typography>
        )}
        {isAdminTyping.is_typing &&
          isAdminTyping.conversation_id === conversation_id && (
            <Typography variant="caption" color="textSecondary" ml={2}>
              Typing...
            </Typography>
          )}
        <div ref={lastElement}></div>
      </Stack>
      <Stack
        spacing={1}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "background.paper",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        {image && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ position: "relative" }}
          >
            <Image
              src={URL.createObjectURL(image)}
              height={50}
              width={200}
              style={{ objectFit: "contain" }}
              alt="image"
            />

            <IconButton
              disabled={fileUploading}
              onClick={() => {
                setImage(null);
                imageRef.current.value = null;
              }}
              sx={{ position: "absolute", top: 1, right: 1 }}
            >
              <Cancel fontSize="small" />
            </IconButton>

            {fileUploading && (
              <LinearProgress
                sx={{ position: "absolute", bottom: 0, width: "100%" }}
              />
            )}
          </Stack>
        )}
        {/* voice previwer */}
        {(recording || audioBlob) && (
          <VoicePreview
            audioBlob={audioBlob}
            closeRecording={closeRecording}
            stopRecording={stopRecording}
            recording={recording}
            isLoading={fileUploading}
          />
        )}
        <Stack direction="row">
          <Stack
            component="form"
            onSubmit={handleSendMessage}
            sx={{ position: "relative", flexGrow: 1, marginRight: 1 }}
          >
            <OutlinedInput
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type your message"
            />
            <IconButton
              disabled={conversationStatus === "closed" || fileUploading}
              type="submit"
              sx={{ position: "absolute", top: 2, right: 2 }}
            >
              <Send fontSize="small" />
            </IconButton>
          </Stack>
          <IconButton
            disabled={fileUploading}
            onClick={() => imageRef.current.click()}
          >
            <InsertPhoto fontSize="small" />
          </IconButton>
          <Voice
            setAudioBlob={setAudioBlob}
            recording={recording}
            setRecording={setRecording}
            mediaRecorderRef={mediaRecorderRef}
            stopRecording={stopRecording}
            isLoading={fileUploading}
          />

          <input
            type="file"
            name="image-file"
            accept="image/jpeg, image/jpg, image/png"
            style={{ display: "none" }}
            ref={imageRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatModal;
