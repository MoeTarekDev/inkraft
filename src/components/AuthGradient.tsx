export default function AuthGradient() {
  return (
    <div className="relative w-1/2 h-full rounded-2xl overflow-hidden bg-[radial-gradient(circle,#dff8d5,#d7f3fa)] p-10 hidden md:flex  ">
      <div className="curved-line"></div>
      <div className="self-end">
        <p className="text-black">
          "Imagination is more important than knowledge, especially when
          crafting the perfect caption. Just remember, if your words are too
          cryptic, users might find themselves lost in a parallel universe of
          endless confusion."
        </p>
        <span className="mt-3 block text-muted-foreground text-sm">
          -Albert Einstein
        </span>
      </div>
    </div>
  );
}
