interface MemberAvatarProps {
  name: string;
  avatarUrl?: string | null;
  isOnline?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  xs: "w-6 h-6 text-[0.55rem]",
  sm: "w-8 h-8 text-[0.6rem]",
  md: "w-10 h-10 text-xs",
  lg: "w-14 h-14 text-sm",
};

const DOT_SIZES = {
  xs: "w-1.5 h-1.5 -bottom-px -right-px",
  sm: "w-2 h-2 bottom-0 right-0",
  md: "w-2.5 h-2.5 bottom-0 right-0",
  lg: "w-3 h-3 bottom-0.5 right-0.5",
};

export function MemberAvatar({ name, avatarUrl, isOnline = false, size = "md" }: MemberAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative flex-shrink-0 ${SIZE_CLASSES[size]}`}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${SIZE_CLASSES[size]} rounded-full object-cover border border-white/5`}
        />
      ) : (
        <div
          className={`${SIZE_CLASSES[size]} rounded-full flex items-center justify-center font-sans font-medium`}
          style={{
            background: "hsl(39 45% 61% / 0.12)",
            border: "1px solid hsl(39 45% 61% / 0.2)",
            color: "hsl(39 45% 61%)",
          }}
        >
          {initials}
        </div>
      )}
      {isOnline && (
        <span
          className={`absolute ${DOT_SIZES[size]} rounded-full bg-emerald-400 border-2 border-background`}
        />
      )}
    </div>
  );
}
