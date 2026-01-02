import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getExpirationDate = (postedDate: Date) => {
  const expiration = new Date(postedDate);
  expiration.setDate(expiration.getDate() + 30);
  return expiration;
};

export const getDaysUntilExpiration = (postedDate: Date) => {
  const expiration = getExpirationDate(postedDate);
  const today = new Date();
  // @ts-expect-error tst issue
  const diffTime = expiration - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getDaysSincePosted = (date: Date | string) => {
  const posted = new Date(date);
  const today = new Date();

  posted.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - posted.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
