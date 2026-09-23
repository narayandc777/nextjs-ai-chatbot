"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { Message } from "./type";
import Sidebar, { COLLAPSED_WIDTH, EXPANDED_WIDTH } from "./components/Sidebar";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(3) },
}));

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);


  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(({ role, content }) => ({ role, content })) }),
      });

      if (!response.ok || !response.body) throw new Error(`Request failed: ${response.status}`);

      const decoder = new TextDecoder();
      let accumulated = "";

      for await (const chunk of response.body as any) {
        accumulated += decoder.decode(chunk, { stream: true });
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m)));
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: "Something went wrong." } : m))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
        onNewChat={handleNewChat}
      />

      <PageContainer
        sx={{
          width: `calc(100vw - ${sidebarExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH}px)`,
          transition: "width 0.25s ease",
        }}
      >
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput value={input} onChange={setInput} onSubmit={handleFormSubmit} disabled={!input ||isLoading} />
      </PageContainer>
    </Box>
  );
}

