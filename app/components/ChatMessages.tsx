"use client";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ChatMessageBubble from "./ChatMessageBubble";
import { Message } from "../type";

const MessagesContainer = styled(Paper)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const welcomeMessage: Message = {
    id: "welcome",
    role: "assistant",
    content: "Hello! How can I help you today?",
  };

  return (
    <MessagesContainer elevation={0}>
      {messages.length === 0 && <ChatMessageBubble message={welcomeMessage} />}

      {messages.map((m) => {
        const isPending = m.role === "assistant" && m.content === "" && isLoading;
        return <ChatMessageBubble key={m.id} message={m} isPending={isPending} />;
      })}
    </MessagesContainer>
  );
}