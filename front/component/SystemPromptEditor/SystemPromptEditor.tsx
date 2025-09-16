import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Button } from "../ui/Button/Button";
import { Textarea } from "../ui/Textarea/Textarea";

export default function SystemPromptEditor({
  value,
  onChange,
}: { value: string | null; onChange: (v: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value ?? "");
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => { setText(value ?? ""); }, [value]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <FiPlus className="mr-2 size-4" /> System prompt
      </Button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        className="
          m-0 p-0
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[min(92vw,640px)] max-h-[85dvh]
          rounded-2xl border shadow-2xl bg-white text-gray-900
          overflow-hidden"
        >
        {/* header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium">Configurer le system prompt</h3>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <MdClose className="size-4" />
          </Button>
        </div>

        {/* body scrollable */}
        <div className="p-4 max-h-[70dvh] overflow-auto">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full min-h-40 max-h-[55dvh] resize-y bg-white text-gray-900 border border-gray-300"
          />
        </div>

        {/* footer toujours visible */}
        <div className="p-3 border-t bg-white flex items-center justify-end gap-2 sticky bottom-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => { onChange(text.trim() || null); setOpen(false); }}>
            Enregistrer
          </Button>
        </div>
      </dialog>
    </>
  );
}
