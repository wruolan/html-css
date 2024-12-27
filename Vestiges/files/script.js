const urls = [
  "https://vestiges-interactive-fiction.glitch.me/99 test01.html",
  "https://vestiges-interactive-fiction.glitch.me/99 test02.html",
  "https://vestiges-interactive-fiction.glitch.me/99 test03.html",
];

const link = document.getElementById("random-link");

link.addEventListener("click", function (event) {
  event.preventDefault();

  const randomUrl = urls[Math.floor(Math.random() * urls.length)];

  window.location.href = randomUrl;
});
