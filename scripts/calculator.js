const buttons = document.getElementsByClassName('button');
const display = document.getElementById('display');

let firstOperand = null;
let operator = null;

let isSecondOperand = false;
let isResult = false;

Array.from(buttons).forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    const current = display.textContent;

    console.log(value);

    if (value === 'C') {
      display.textContent = '0';
      firstOperand = null;
      isSecondOperand = false;
      isResult = false;
    } else if (button.classList.contains('number')) {
      // 두번째 피연산자의 시작: 디스플레이를 value로 초기화
      // 그 외의 경우: 0 검사하고 current에 value 이어붙임

      if (isResult) {   // 결과 상태에서 숫자 클릭: 새 계산 시작
        firstOperand = null;
        operator = null;
        isSecondOperand = false;
        isResult = false;
        display.textContent = value;
      } else {
        if (isSecondOperand) {
          display.textContent = value;
          isSecondOperand = false;
        } else
          display.textContent = current === '0' ? value : current + value;
      }
    } else if (button.classList.contains('operator')) {
      if (isResult) {    // 결과 상태에서 연산자 클릭: 이어서 계산
        isResult = false;
      } else
        firstOperand = current;
      // firstOperand = firstOperand === null ? current : firstOperand;

      operator = value;
      isSecondOperand = true;

      console.log(`First Operand: ${firstOperand}, operator: ${operator}`);
    } else if (value === '=') {
      display.textContent = calculate(firstOperand, operator, current);
      firstOperand = display.textContent;
      isResult = true;
    } else if (value === '.' && !current.includes('.'))
      display.textContent += value;
  })
});

// = 눌러서 결과 나온뒤
// 숫자 누르면 firstOperand, isSecondOperand 초기화
// 연산자 누르면 결과가 firstOperand

const calculate = (firstOperand, operator, secondOperand) => {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  let result = 0;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = firstOperand / secondOperand;
      break;
    default:
      break;
  }

  return result;
}

// TODO: 연산자만 누르고 = 누른 경우 처리
// TODO: 나누기 0 처리 (무한대 뜸)