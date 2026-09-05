document.addEventListener("DOMContentLoaded", () => {
  // Typewriter Animation
  const statusEl = document.querySelector(".status-text");
  if (statusEl) {
    const phrases = [
      "Currently joining testflight waitlists",
      "Currently building interfaces at OpenAI",
      "Currently studying cognitive science at UC Berkeley",
      "Currently designing tactile micro-interactions",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        if (charIndex < current.length) {
          charIndex++;
          statusEl.textContent = current.substring(0, charIndex);
          setTimeout(typeLoop, Math.floor(Math.random() * 35) + 65);
        } else {
          setTimeout(() => {
            isDeleting = true;
            typeLoop();
          }, 2600);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          statusEl.textContent = current.substring(0, charIndex);
          setTimeout(typeLoop, 32);
        } else {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeLoop, 500);
        }
      }
    }

    typeLoop();
  }
});
