export const DATETIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
