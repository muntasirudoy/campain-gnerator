

export function useDateTime() {
  const formatDate = (dateString: string, locale = "en-US") => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return { formatDate };
}