"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Loader2 } from "lucide-react";

interface MessageType {
  message: string;
  sentTime: string;
  sender: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: "Xin chào, tôi có thể giúp gì cho bạn?",
      sentTime: "just now",
      sender: "Bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputMessage.trim() !== "") {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: inputMessage,
          sentTime: "just now",
          sender: "User",
        },
      ]);

      try {
        const response = await fetch(process.env.CHATBOT_API + "/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: inputMessage }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.replyContent,
            sentTime: "just now",
            sender: "Bot",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.",
            sentTime: "just now",
            sender: "Bot",
          },
        ]);
      } finally {
        setIsLoading(false);
        setInputMessage("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[600px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="bg-yellow-500 text-white p-3 flex justify-between items-center">
            <h3 className="text-lg font-semibold">ChatBot tư vấn khách hàng</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="text-white hover:bg-yellow-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  m.sender === "User" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block rounded-lg py-2 px-3 ${
                    m.sender === "User" ? "bg-yellow-200" : "bg-gray-200"
                  }`}
                >
                  {m.message}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-100 flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border rounded-l-lg px-3 py-2"
              placeholder="Viết tin nhắn tư vấn ở đây..."
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              className="rounded-l-none"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gửi"}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
