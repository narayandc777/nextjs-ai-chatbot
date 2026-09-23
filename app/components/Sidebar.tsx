"use client";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddCommentIcon from "@mui/icons-material/AddComment";

export const EXPANDED_WIDTH = 240;
export const COLLAPSED_WIDTH = 64;

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

export default function Sidebar({ expanded, onToggle, onNewChat }: SidebarProps) {
  const width = expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: "width 0.25s ease",
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          transition: "width 0.25s ease",
          overflowX: "hidden",
          borderRight: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: expanded ? "flex-end" : "center", padding: "8px" }}>
        <IconButton onClick={onToggle} size="small">
          {expanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ padding: "12px" }}>
        {expanded ? (
          <Box
            onClick={onNewChat}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              "&:hover": { backgroundColor: "#f1f5f9" },
            }}
          >
            <AddCommentIcon fontSize="small" sx={{ color: "#2563eb" }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>New Chat</Typography>
          </Box>
        ) : (
          <Tooltip title="New Chat" placement="right">
            <IconButton
              onClick={onNewChat}
              sx={{ width: "100%", borderRadius: "10px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
            >
              <AddCommentIcon fontSize="small" sx={{ color: "#2563eb" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Drawer>
  );
}