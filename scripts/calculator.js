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

    if (button.classList.contains('function')) {
      handleFunction(value, current);
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

      // 0으로 나누었거나, 값이 NaN이거나, =을 연속해서 누른 경우 기록하지 않음
      if (display.textContent.charAt(0) !== 'C' && display.textContent !== 'NaN' && operator !== null) {
        const operation = document.createElement('p');
        operation.textContent = `${firstOperand} ${operator} ${current} =`;
        operation.classList.add('operation');
        history.append(operation);

        const result = document.createElement('p');
        result.textContent = display.textContent;
        result.classList.add('result');
        history.append(result);

        history.scrollTop = history.scrollHeight;

        firstOperand = display.textContent;
        operator = null;
      }
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
    case 'x':
      return a * b;
    case '/':
      return b === 0 ? 'Cannot divide by zero.' : a / b;
    default:
      return b;
  }
}

const handleFunction = (value, current) => {
  switch (value) {
    case 'C':
      display.textContent = '0';
      firstOperand = null;
      operator = null;
      isNewInput = false;
      break;
    case '%':
      display.textContent = current / 100;
      break;
    case '±':
      display.textContent = current * (-1);
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', (e) => {
  const button = document.querySelector(`button[data-key="${e.key}"]`);
  if (button) button.click();
})

// TODO: 디스플레이에 연산식 나타나게
// TODO: 닫았다 다시 열면 초기화되어있게
// TODO: 결과 나온 후 숫자 입력하면 이어서 입력됨 -> 새로 입력되게 수정