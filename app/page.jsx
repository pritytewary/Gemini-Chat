"use client";

import { useState, useEffect, useRef } from "react";
import { FiSend, FiMessageSquare, FiTrash2, FiClipboard } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Load conversation history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));

    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPrompt("");
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          context: messages.slice(-5).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.generated_text || "No response from the API",
        timestamp: Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Failed to get response from Gemini. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Gemini Chat
          </h1>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
              title="Clear Conversation"
            >
              <FiTrash2 className="text-lg" />
            </button>
          )}
        </div>

        <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-[85%] relative group ${
                message.role === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-100 mr-auto text-left"
              }`}
            >
              {message.content}
              {message.role === "assistant" && (
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-800"
                >
                  <FiClipboard className="text-sm" />
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something..."
              className="w-full min-h-24 md:min-h-32 p-3 md:p-4 pr-10 md:pr-12 text-sm md:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
              disabled={isLoading}
            />
            <FiMessageSquare className="absolute right-3 md:right-4 top-3 md:top-4 text-gray-400 text-lg md:text-xl" />
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full py-2.5 md:py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm md:text-base rounded-lg md:rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-lg md:text-xl" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FiSend className="text-base md:text-lg" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
}
