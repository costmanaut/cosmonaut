const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      alphaChangeSpeed: Math.random() * 0.05 + 0.02, // Скорость изменения прозрачности
      dx: (Math.random() - 0.5) * 0.05,  // Скорость движения звезды по горизонтали (медленная)
      dy: (Math.random() - 0.5) * 0.05,  // Скорость движения звезды по вертикали (медленная)
      phase: Math.random() * Math.PI * 2 // Для плавного синусоидального мерцания
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    const alpha = (Math.sin(star.phase) + 1) / 2; // Используем синус для плавного мерцания
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();

    // Мерцание звезды
    star.phase += star.alphaChangeSpeed;  // Плавное изменение прозрачности

    // Движение звёзд (медленное)
    star.x += star.dx;
    star.y += star.dy;

    // Переход звёзд по краям экрана (если выходит за пределы, то появляется с другой стороны)
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;
  });
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

createStars(300);  // Количество звёзд
animate();

// Обработка изменения размера окна
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  createStars(300);
});




// текст

const phrases = [
  "Сайт для Вашего Бизнеса",
  "Сайт это Ваша Бизнес"
];
let currentPhraseIndex = 0;
let letterIndex = 0;
let delay = 100;
let typingDelay = 100;
let erasingDelay = 50;
let newPhraseDelay = 500;

const textElement = document.getElementById("text");

function type() {
  const currentPhrase = phrases[currentPhraseIndex];

  // Если все буквы напечатаны, задержка перед стиранием
  if (letterIndex < currentPhrase.length) {
    textElement.textContent += currentPhrase[letterIndex];
    letterIndex++;

    // Задержка для пробела
    if (currentPhrase[letterIndex - 1] === " ") {
      setTimeout(type, newPhraseDelay);
    } else {
      setTimeout(type, typingDelay);
    }
  } else {
    // Задержка перед стиранием текста
    setTimeout(erase, newPhraseDelay);
  }
}

function erase() {
  const currentPhrase = phrases[currentPhraseIndex];

  // Удаление букв по одной
  if (letterIndex > 0) {
    textElement.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    // Смена фразы и запуск печати новой
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(type, newPhraseDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newPhraseDelay);
});

