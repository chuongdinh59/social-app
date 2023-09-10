import { createContext, useState } from "react";
import { getRecipient } from "../utils/auth";

export const ChatContext = createContext();
export function ChatProvider({ children }) {
  const [recipient, setRecipient] = useState(getRecipient() || {});
  const value = {
    recipient,
    setRecipient
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatContext;
