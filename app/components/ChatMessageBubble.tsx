"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Message } from "../type";

const MessageRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser?: boolean }>(({ isUser }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexDirection: isUser ? "row-reverse" : "row",
  alignSelf: isUser ? "flex-end" : "flex-start",
  maxWidth: "80%",
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? theme.palette.primary.main : "#f1f5f9",
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: "12px 16px",
  borderRadius: theme.shape.borderRadius,
  maxWidth: "100%",
  wordBreak: "break-word",
}));

interface ChatMessageBubbleProps {
  message: Message;
  isPending?: boolean; // true = show spinner instead of content
}

export default function ChatMessageBubble({ message, isPending }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <MessageRow isUser={isUser}>
      <Avatar
        sx={{
          bgcolor: isUser ? "primary.main" : "secondary.main",
          width: 32,
          height: 32,
        }}
      >
        {isUser ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
      </Avatar>

      <MessageBubble isUser={isUser}>
        {isPending ? (
          <CircularProgress size={16} thickness={5} sx={{ color: "#64748b" }} />
        ) : (
          message.content
        )}
      </MessageBubble>
    </MessageRow>
  );
}