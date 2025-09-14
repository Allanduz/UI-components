type Props = { text?: string };

export default function AvailabilityBadge({ text = "Available for work" }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 subtle w-fit">
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400" />
      {text}
    </span>
  );
}
