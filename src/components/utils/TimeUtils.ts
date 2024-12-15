export function getDeltaTime(dateString: string): string {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const diffInMs = Math.abs(currentDate.getTime() - inputDate.getTime());

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}y`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths}mo`;
  } else if (diffInWeeks > 0) {
    return `${diffInWeeks}w`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  } else {
    return `${diffInSeconds}s`;
  }
}