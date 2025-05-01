// Typewriter effect with blinking cursor
const words = ["defining", "imagining", "membering", "connecting"];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;
const speed = 120;
const delayBetweenWords = 1500;

function type() {
  const element = document.querySelector('.typewriter-text');

  if (i >= words.length) i = 0;
  currentWord = words[i];

  if (isDeleting) {
    element.innerHTML = currentWord.substring(0, j--) + '<span class="cursor">|</span>';
  } else {
    element.innerHTML = currentWord.substring(0, j++) + '<span class="cursor">|</span>';
  }

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, delayBetweenWords);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i++;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

// Blinking Cursor
function addCursorStyle() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .cursor {
      font-weight: 100;
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(styleElement);
}

// Initialize the typewriter effect when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  addCursorStyle();
  type();
});