import { getInitials, avatarColor } from '../utils/format';

// Circular initials avatar with a deterministic color based on the name.
export default function Avatar({ name, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${avatarColor(name)} ${sizes[size] || sizes.md}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}
