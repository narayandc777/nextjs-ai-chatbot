"use client";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const InputForm = styled("form")({
  width: "100%",
  position: "relative",
  flexShrink: 0,
});

const SendButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  width: "36px",
  height: "36px",
  "&:hover": { backgroundColor: theme.palette.primary.dark },
  "&:disabled": { backgroundColor: theme.palette.action.disabledBackground },
  zIndex: 10,
}));

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: any) => void;
  disabled: boolean;
}

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <InputForm onSubmit={onSubmit}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
        multiline
        minRows={3}
        maxRows={6}
        fullWidth
        placeholder="Type a message..."
        slotProps={{
          input: {
            endAdornment: (
              <SendButton type="submit" size="small" disabled={disabled}>
                <SendIcon fontSize="small" />
              </SendButton>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingRight: "56px",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
          },
        }}
      />
    </InputForm>
  );
}