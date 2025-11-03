import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

/**
 * Formats a date string to YYYY/MM/DD format
 * @param dateString - ISO date string or any valid date format
 * @returns Formatted date string in YYYY/MM/DD format
 */
export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('YYYY/MM/DD');
};

/**
 * Formats a date string to YYYY/MM/DD HH:mm:ss format
 * @param dateString - ISO date string or any valid date format
 * @returns Formatted date string in YYYY/MM/DD HH:mm:ss format
 */
export const formatDateTime = (dateString: string): string => {
  return dayjs(dateString).format('YYYY/MM/DD HH:mm:ss');
};

/**
 * Formats a date string to a custom format
 * @param dateString - ISO date string or any valid date format
 * @param format - Day.js format string (e.g., 'DD/MM/YYYY', 'MMM DD, YYYY')
 * @returns Formatted date string in specified format
 */
export const formatCustomDate = (
  dateString: string,
  format: string
): string => {
  return dayjs(dateString).format(format);
};

/**
 * Returns relative time (e.g., "2 hours ago", "3 days ago")
 * @param dateString - ISO date string or any valid date format
 * @returns Relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
  return dayjs(dateString).fromNow();
};

// Export dayjs instance for direct usage if needed
export { dayjs };
