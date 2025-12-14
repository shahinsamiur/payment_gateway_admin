import { config } from "@/config/config";
import { useGetSingleMessageQuery } from "@/redux/features/liveSupport";
import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import ChatModal from "./ChatModal";

const ChatContainer = ({ openChat, setOpenChat, setUnreadMessage }) => {
  const [chatLoading, setChatLoading] = useState(true);
  const { siteData } = useSelector((state) => state.auth);
  const [chatHistory, setChatHistory] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isAdminTyping, setIsAdminTyping] = useState({
    is_typing: false,
    conversation_id: null,
  });

  const [socketInfo, setSocketInfo] = useState({
    userId: null,
    adminId: user?.id || null,
    conversationId: null,
    conversationStatus: "pending",
  });
  const ws = useRef(null);

  const { data, isLoading } = useGetSingleMessageQuery(openChat?.id, {
    skip: !openChat?.id,
  });

  // Fetch chat history and initialize the messages
  useEffect(() => {
    if (data) {
      const conversations = data?.data ?? {};
      setChatHistory(conversations.messages);
      setSocketInfo((prev) => {
        return {
          ...prev,
          conversationId: conversations._id,
          userId: conversations.user_id,
          conversationStatus: conversations.status,
        };
      });
    }
  }, [data]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user?.id || !config.socketUrl) return;

    (() => {
      try {
        ws.current = new WebSocket(config.socketUrl);
        const initServer = {
          type: "init",
          data: { userId: null, adminId: user?.id, isAdmin: true },
        };

        ws.current.onopen = () => {
          console.log("WebSocket connection established");
          setChatLoading(false);
          ws.current.send(JSON.stringify(initServer));
        };

        ws.current.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case "init":
              setSocketInfo(message.data);
              break;
            case "message-update":
              const conversationId = message.data?.conversation_id;
              if (conversationId) {
                setSocketInfo((prev) => {
                  return { ...prev, conversationId };
                });
              }
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (item.message_id === message.data?.message_id) {
                    return { ...item, status: message.data.status };
                  }
                  return item;
                });
              });
              break;
            case "message":
              setIsAdminTyping({
                conversation_id: null,
                is_typing: false,
              });
              setChatHistory((prev) => {
                if (prev) return [...prev, message.data];
                else return [message.data];
              });

              new Notification("Workdear", {
                body: message.data.message,
                icon: config.fileBaseUrl + siteData?.site_favicon,
              });

              break;
            case "read_messages":
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (
                    message.data?.unreadmessagesId?.includes(item.message_id)
                  ) {
                    return { ...item, status: "seen" };
                  }
                  return item;
                });
              });
              break;
            case "typing":
              setIsAdminTyping({
                conversation_id: message.data?.conversation_id,
                is_typing: message.data?.is_typing,
              });
            default:
              break;
          }
        };
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      ws.current.close();
    };
  }, [user]);

  // Calculate the unseen messages with status "send"
  useEffect(() => {
    if (!chatHistory) return;
    const unseenMessages = chatHistory.filter(
      (message) => message.status === "send" && message.sender_type === "user"
    );

    setUnreadMessage({
      conversationId:
        unseenMessages.length > 0 ? unseenMessages[0].conversation_id : null,
      count: unseenMessages.length,
    });
  }, [chatHistory]);

  return (
    <Modal
      open={!!openChat}
      onClose={() => setOpenChat(null)}
      title={
        <Typography variant="h6" textAlign="center" sx={{ flexGrow: 1 }}>
          Live Chat{" "}
          <Typography component="span" sx={{ fontSize: 14 }}>
            🟢
          </Typography>{" "}
          {openChat?.name || "Unknown user"}
        </Typography>
      }
      width={700}
      childPadding={0}
    >
      <ChatModal
        userOnline={openChat?.user_online}
        conversation_id={openChat?.id}
        userName={openChat?.name}
        userProfile={openChat?.user_profile}
        chatLoading={chatLoading}
        chatHistory={chatHistory}
        isLoading={isLoading}
        setChatHistory={setChatHistory}
        ws={ws}
        toUserId={socketInfo.userId}
        conversationStatus={socketInfo.conversationStatus}
        isAdminTyping={isAdminTyping}
      />
    </Modal>
  );
};

export default ChatContainer;
