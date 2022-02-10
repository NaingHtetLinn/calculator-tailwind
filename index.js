window.addEventListener('load', () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const liEls = document.querySelectorAll('li');
const checkboxEl = document.querySelector('#dropdown');

liEls.forEach((li) => {
  li.addEventListener('click', () => {
    if (li.dataset.theme === 'light') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else if (li.dataset.theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    checkboxEl.checked = false;
  });
});

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousEl = document.querySelector('[data-previous-operand]');
const currentEl = document.querySelector('[data-current-operand]');

let current = '';
let prev = '';
let isAllowOperation = false;

function updateDisplay() {
  previousEl.textContent = prev;
  currentEl.textContent = current;
}

numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    current += btn.textContent;
    updateDisplay();
    isAllowOperation = true;
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!isAllowOperation) return;
    if (isAllowOperation && current === '') {
      current = prev;
    }

    current += btn.textContent;

    updateDisplay();
    isAllowOperation = false;
  });
});

equalsBtn.addEventListener('click', () => {
  prev = eval(current);
  current = '';
  updateDisplay();
});

deleteBtn.addEventListener('click', () => {
  current = current.slice(0, -1);
  updateDisplay();
  isAllowOperation = true;
});

allClearBtn.addEventListener('click', () => {
  current = '';
  prev = '';
  isAllowOperation = false;
  updateDisplay();
});
