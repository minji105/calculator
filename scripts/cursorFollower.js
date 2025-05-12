document.addEventListener("DOMContentLoaded", function () {
  const cursor_follower = document.querySelector(".curser-follower");
  let cursorX = 0;
  let cursorY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const speed = 0.5;

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * speed;
    cursorY += dy * speed;

    cursor_follower.style.left = cursorX + 32 + "px";
    cursor_follower.style.top = cursorY + 32 + "px";

    requestAnimationFrame(animateCursor);
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateCursor();
});