export const timeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

export const timeAgoDetailed = (date: string | number): string => {
  const now = new Date();
  const past = new Date(
    typeof date === 'string' && !isNaN(Number(date)) ? Number(date) : date
  );

  if (isNaN(past.getTime())) return 'Invalid date';

  const diffMs = now.getTime() - past.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60)
    return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

export function getExpirationStatus(expiresAt: string): {
  message: string;
  isExpired: boolean;
} {
  const expirationDate = new Date(expiresAt);
  const currentDate = new Date();
  const diffTime = expirationDate.getTime() - currentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const isExpired = diffTime < 0;
  const message =
    diffDays > 0
      ? `${diffDays} days left`
      : diffDays < 0
      ? `${Math.abs(diffDays)} days ago`
      : 'Expires today';

  return { message, isExpired };
}
