export default function GlowSeparator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-px my-10 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      <div className="absolute inset-x-1/4 -top-px h-[2px] bg-gradient-to-r from-transparent via-neon-purple/80 to-transparent blur-sm" />
    </div>
  );
}
