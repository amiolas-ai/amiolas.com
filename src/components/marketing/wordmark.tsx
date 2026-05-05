import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "text-[15px]",
  md: "text-xl",
  lg: "text-[26px]",
} as const;

type Props = {
  size?: keyof typeof sizeMap;
  className?: string;
};

export function Wordmark({ size = "md", className }: Props) {
  return (
    <span
      className={cn(
        "font-semibold uppercase leading-none tracking-[0.04em] text-foreground",
        sizeMap[size],
        className,
      )}
    >
      <span className="text-spark">A</span>m<span className="text-spark">i</span>
      olas
    </span>
  );
}
