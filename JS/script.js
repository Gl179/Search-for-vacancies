document.getElementById("submit").addEventListener("click", function () {
  const resumeText = document.getElementById("resume").value;
  const keywords = extractKeywords(resumeText);
  displayLinks(keywords);
});

function extractKeywords(text) {
  // Используем compromise для извлечения существительных
  const doc = nlp(text);
  const nouns = doc.nouns().out("array"); // Извлекаем существительные
  const uniqueNouns = [...new Set(nouns)]; // Удаляем дубликаты

  // Фильтруем слова, оставляя только те, которые длиннее 2 символов
  return uniqueNouns.filter((word) => word.length > 2);
}

function displayLinks(keywords) {
  const linksContainer = document.getElementById("links");
  linksContainer.innerHTML = ""; // Очищаем предыдущие ссылки

  if (keywords.length === 0) {
    linksContainer.innerHTML = "<p>Ключевые слова не найдены.</p>";
    return;
  }

  keywords.forEach((keyword) => {
    const link = document.createElement("a");
    link.href = `https://hh.ru/search/vacancy?text=${encodeURIComponent(
      keyword
    )}`;
    link.target = "_blank";
    link.textContent = `Вакансии по запросу "${keyword}"`;
    linksContainer.appendChild(link);
    linksContainer.appendChild(document.createElement("br")); // Перенос строки
  });
}
