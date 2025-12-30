"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll automatique
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Une erreur est survenue.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        backgroundColor: "#FFFAEB",
        fontFamily: "Arial, sans-serif",
        color: "#1E1E1E",
      }}
    >
      {/* HEADER */}
      <header className="w-full border-b bg-[#FFFAEB]">
        <div className="max-w-3xl mx-auto flex items-center gap-3 px-6 py-4">
          <img src="/mistral.svg" className="h-6 w-6" />
          <span className="font-semibold text-sm">Mistral Chat</span>
        </div>
      </header>

      {/* CHAT */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                style={{
                  backgroundColor:
                    msg.role === "user" ? "#E9E2CB" : "#FFF0C3",
                  color: "#1E1E1E",
                }}
                className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm"
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-2xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "#FFF0C3",
                  color: "#1E1E1E",
                }}
              >
                Mistral écrit…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* INPUT */}
      <footer className="w-full border-t bg-[#FFFAEB]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Écrire un message…"
              className="flex-1 rounded-full px-5 py-3 text-sm outline-none border"
              style={{
                borderColor: "#1E1E1E",
                backgroundColor: "#FFFAEB",
                color: "#1E1E1E",
              }}
            />
            <button
              onClick={sendMessage}
              className="rounded-full px-5 py-3 text-sm font-medium"
              style={{
                backgroundColor: "#1E1E1E",
                color: "#FFFAEB",
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}