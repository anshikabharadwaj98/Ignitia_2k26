import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, X, Send } from "lucide-react";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi, how can I assist you?", isUser: false }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thanks for your message! For event details, please check our Events page or contact us directly.",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-ai-chat-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] z-50 flex flex-col shadow-xl">
          <div className="p-4 border-b border-card-border bg-primary text-primary-foreground rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">Ignitia Assistant</h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`text-chat-message-${idx}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-card-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                data-testid="input-chat-message"
              />
              <Button size="icon" onClick={handleSend} data-testid="button-send-message">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
