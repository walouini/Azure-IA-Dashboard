import { FaUser } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import type { ChatMessage } from "../ChatApp/ChatApp";

export default function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 size-8 rounded-full bg-muted flex items-center justify-center">
          <TbRobot className="text-sm" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message.content}
        </div>
      </div>
      {isUser && (
        <div className="mt-1 size-8 rounded-full bg-primary/10 flex items-center justify-center">
          <FaUser className="text-sm" />
        </div>
      )}
    </div>
  );
}
