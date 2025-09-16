export interface SliderProps {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number[]; // ex: [0.2]
  onValueChange?: (v: number[]) => void;
  className?: string;
}

export function Slider({ id, min = 0, max = 1, step = 0.1, value, onValueChange, className }: SliderProps) {
  const val = value?.[0] ?? 0;
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={val}
      onChange={(e) => onValueChange?.([Number(e.target.value)])}
      className={["w-full", className].filter(Boolean).join(" ")}
    />
  );
}
