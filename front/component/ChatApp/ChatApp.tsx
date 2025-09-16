import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card/Card";
import { Textarea } from "../ui/Textarea/Textarea";
import SystemPromptEditor from "../SystemPromptEditor/SystemPromptEditor";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/Tooltip/Tooltip";
import { ScrollArea } from "../ui/ScrollArea/ScrollArea";
import { Button } from "../ui/Button/Button";
import { FiTrash2 } from "react-icons/fi";
import { FaCircleStop } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";
import { sendChat } from "../../lib/util";
import Bubble  from "../Bubble/Bubble";
import { LuLoader } from "react-icons/lu";
import { Label } from "../ui/Label/Label";
import { Slider } from "../ui/Slider/Slider";

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export default function ChatApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid("m"),
      role: "assistant",
      content: "Bonjour 👋 Je suis votre assistant connecté à Azure OpenAI. Comment puis-je vous aider ?",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0.2);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(
    "Tu es un assistant interne. Réponds de façon concise et professionnelle en français."
  );
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, isLoading]);

  const canSend = input.trim().length > 0 && !isLoading;

  async function handleSend() {
    if (!canSend) return;
    const userMsg: ChatMessage = { id: uid("m"), role: "user", content: input.trim(), createdAt: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await sendChat([...messages, userMsg], {
        temperature,
        systemPrompt,
        signal: controller.signal,
      });
      const assistantMsg: ChatMessage = {
        id: uid("m"),
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Erreur inconnue");
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  function handleClear() {
    setMessages(() => [
      {
        id: uid("m"),
        role: "assistant",
        content: "Historique effacé. Comment puis-je vous aider ?",
        createdAt: Date.now(),
      },
    ]);
    setError(null);
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <p className="text-sm text-muted-foreground">Connecté à une API de chat (Azure OpenAI / Bot Service).</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleClear} aria-label="Vider l'historique">
                  <FiTrash2 className="size-4" />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="grid grid-rows-[minmax(0,1fr)_auto] h-[72dvh] p-0">
        {/* Messages */}
        <ScrollArea className="min-h-0 px-4 pt-4" ref={listRef as React.RefObject<HTMLDivElement>}>
          <div className="space-y-4 pb-24">
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground pl-1">
                <LuLoader className="size-4 animate-spin" />
                Le bot réfléchit…
              </div>
            )}
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive text-destructive px-3 py-2 text-sm">
                {error}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Composer */}
        <div className="border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 p-3">
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message…"
              className="min-h-[52px] max-h-40 resize-y w-full md:flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <div className="flex gap-2 md:self-end">
              {!isLoading ? (
                <Button onClick={handleSend} disabled={!canSend} className="h-11 w-full md:w-auto">
                  <TbSend className="mr-2 size-4" /> Envoyer
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleStop} className="h-11 w-full md:w-auto">
                  <FaCircleStop className="mr-2 size-4" /> Stop
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Label htmlFor="temp" className="text-xs text-muted-foreground">Température</Label>
              <div className="w-full max-w-[180px]">
                <Slider id="temp" min={0} max={1} step={0.1} value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0] ?? 0.2)} />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">{temperature.toFixed(1)}</span>
            </div>
            <div className="md:ml-auto">
              <SystemPromptEditor value={systemPrompt} onChange={setSystemPrompt} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}