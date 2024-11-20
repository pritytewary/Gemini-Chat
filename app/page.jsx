"use client";

import { useState } from "react";
import { FiSend, FiMessageSquare } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const currentPrompt = prompt;
    setPrompt("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.generated_text || "No response from the API");
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Failed to get response from Gemini. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Gemini Chat
        </h1>

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
                <span>Processing...</span>
              </>
            ) : (
              <>
                <FiSend className="text-base md:text-lg" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 text-red-600 text-sm md:text-base rounded-lg md:rounded-xl border border-red-100 flex items-center gap-2">
            <div className="w-1 h-full bg-red-500 rounded-full" />
            {error}
          </div>
        )}

        {response && !error && (
          <div className="mt-4 md:mt-6 space-y-2">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm md:text-base">
              <RiRobot2Line className="text-lg md:text-xl text-blue-600" />
              Response:
            </h3>
            <div className="p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl border border-blue-100 whitespace-pre-wrap shadow-sm text-sm md:text-base">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
