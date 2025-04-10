export function cleanText(rawText: string): string {
  let text = rawText.trim();
  text = text.replace(/\s+/g, ' '); // Удаляем лишние пробелы
  text = text.replace(/[\r\n]+/g, ' '); // Удаляем переносы строк
  // Можно добавить удаление HTML-тегов, спецсимволов и т.д.
  return text;
}
