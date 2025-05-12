const clock = document.querySelector('.time');
const minimizeBtn = document.querySelector('#minimize-button');
const calCloseBtn = document.querySelector('#cal-close-button');
const banCloseBtn = document.querySelector('#banjuk-close-button');
const calculator = document.querySelector('.calculator-wrapper');
const calculatorIcon = document.querySelector('#calculator-icon');
const banjuk = document.querySelector('.banjuk');
const banjukIcon = document.querySelector('#banjuk-icon');
const titlebars = document.querySelectorAll('.titlebar');
const header = document.querySelector('#header');
const minimizeTab = document.querySelector('.minimize');
const resize = document.querySelector('.resize');
const historyContainer = document.querySelector('.content-history');

// 현재 시간
const updateClock = () => {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour %= 12 || 12;

  minute = (minute + '').length === 1 ? '0' + minute : minute;
  hour = (hour + '').length === 1 ? '0' + hour : hour;

  clock.textContent = `${hour}:${minute} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);

// 아이콘 클릭 시 창 오픈
calculatorIcon.addEventListener('dblclick', () => {
  calculator.classList.add('open');
  minimizeTab.classList.remove('minimize-active');
})
banjukIcon.addEventListener('dblclick', () => {
  banjuk.classList.add('open');
})

// 창 닫기 버튼
calCloseBtn.addEventListener('click', () => {
  calculator.classList.remove('open');
})
banCloseBtn.addEventListener('click', () => {
  banjuk.classList.remove('open');
})

// 창 최소화 버튼
minimizeBtn.addEventListener('click', () => {
  calculator.classList.remove('open');
  minimizeTab.classList.add('minimize-active');
})

// 최소화 탭 클릭
minimizeTab.addEventListener('click', () => {
  calculator.classList.add('open');
  minimizeTab.classList.remove('minimize-active');
})

// 창 드래그
// TODO: 드래그 구현 방법 다시 정리
titlebars.forEach((titlebar) => {
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  titlebar.addEventListener('mousedown', (e) => {
    isDragging = true;

    const parent = titlebar.closest('.draggable');
    offsetX = e.clientX - parent.offsetLeft;
    offsetY = e.clientY - parent.offsetTop;

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const calcWidth = parent.offsetWidth;
      const calcHeight = parent.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      // 경계 설정
      newLeft = Math.max(0, Math.min(windowWidth - calcWidth, newLeft));
      newTop = Math.max(header.offsetHeight, Math.min(windowHeight - calcHeight, newTop));

      parent.style.left = `${newLeft}px`;
      parent.style.top = `${newTop}px`;
    }

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})

// 창 너비 리사이즈
let isResizing = false;

resize.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.addEventListener('mousemove', resizing);
  document.addEventListener('mouseup', stopResizing);
})

const resizing = (e) => {
  if (isResizing) {
    const newWidth = e.clientX - calculator.getBoundingClientRect().left;
    calculator.style.width = `${newWidth}px`;

    if (calculator.getBoundingClientRect().width >= 500) 
      historyContainer.style.display = 'block';
    else historyContainer.style.display = 'none';
  }
}

const stopResizing = () => {
  isResizing = false;
  document.removeEventListener('mousemove', resizing);
  document.removeEventListener('mouseup', stopResizing);
}