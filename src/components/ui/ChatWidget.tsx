"use client";

import { useEffect, useRef, useState } from "react";
import { agent } from "@/content/agent";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: `Hi, I'm Kirk's virtual assistant. Ask me about any of his current listings, pricing, the area, or how to get in touch — I know this whole site.`,
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with Kirk's assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-gold text-ground shadow-lg shadow-black/40 flex items-center justify-center hover:bg-gold-bright transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
      >
        {open ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Kirk's assistant"
          className="fixed bottom-24 right-6 z-[60] w-[min(92vw,380px)] h-[min(70vh,560px)] bg-ground-soft border border-gold-deep/50 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gold-deep/30 bg-panel">
            <p className="font-display text-lg text-gold-bright">Ask about {agent.name.split(" ")[0]}&rsquo;s listings</p>
            <p className="text-xs text-warm-gray">Usually replies instantly</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-gold text-ground rounded-br-sm"
                    : "mr-auto bg-panel text-paper/90 rounded-bl-sm border border-gold-deep/20"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-panel text-warm-gray text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm border border-gold-deep/20">
                Thinking&hellip;
              </div>
            )}
            {error && (
              <div className="mr-auto bg-red-950/60 text-red-200 text-sm px-4 py-2.5 rounded-2xl border border-red-800/40">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-gold-deep/30 flex gap-2 bg-ground-soft">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a listing, price, or area..."
              className="flex-1 bg-ground border border-gold-deep/40 rounded-full px-4 py-2 text-sm text-paper placeholder:text-warm-gray focus:outline-none focus:border-gold"
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gold text-ground rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40 hover:bg-gold-bright transition-colors shrink-0"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
