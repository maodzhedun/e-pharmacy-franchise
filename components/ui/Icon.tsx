interface Props {
  id: string;
  size?: number;
  className?: string;
}

export default function Icon({ id, size = 20, className = '' }: Props) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
