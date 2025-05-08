const buttons = document.getElementsByClassName('button');
const display = document.getElementById('display');

Array.from(buttons).forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    const current = display.textContent;

    console.log(value);

    if (value === 'C') {
      display.textContent = '0';
    } else if (button.classList.contains('number')) {
      display.textContent = current === '0' ? value : current + value;
    } else if (value === '.' && !current.includes('.'))
      display.textContent += value;
  })
});