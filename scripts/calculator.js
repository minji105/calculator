const buttons = document.getElementsByClassName('button');
const display = document.getElementById('display');

let firstOperand = null;
let operator = null;

let isNewInput = false; // 두번째 피연산자 입력 시작

Array.from(buttons).forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    const current = display.textContent;

    console.log(value);

    if (value === 'C') {  // 모든 변수 초기화
      display.textContent = '0';
      firstOperand = null;
      operator = null;
      isNewInput = false;
      return;
    }

    if (value === '%') {
      display.textContent = current / 100;
      return;
    }

    if (value === '±') {
      display.textContent = current * (-1);
      return;
    }

    if (button.classList.contains('number')) {
      if (isNewInput) {
        display.textContent = value;
        isNewInput = false;
      } else {
        display.textContent = current === '0' ? value : current + value;
      }
    }
    else if (value === '.' && !current.includes('.'))
      display.textContent += value;
    else if (button.classList.contains('operator')) {
      if (firstOperand !== null)  // 연속 계산
        display.textContent = calculate(firstOperand, operator, current);

      firstOperand = display.textContent;
      operator = value;
      isNewInput = true;  // 다음 숫자부터 두번째 피연산자로 간주

      console.log(`First Operand: ${firstOperand}, operator: ${operator}`);
    }
    else if (value === '=') {
      display.textContent = calculate(firstOperand, operator, current);
      firstOperand = display.textContent;
      operator = null;
    }
  })
});

// = 눌러서 결과 나온뒤
// 숫자 누르면 firstOperand, isNewInput 초기화
// 연산자 누르면 결과가 firstOperand

const calculate = (a, operator, b) => {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? 'Cannot divide by zero.' : a / b;
    default:
      return b;
  }
}

// TODO: 디스플레이에 연산식 나타나게
// TODO: 히스토리