// counter.js

function startCounting(target, duration) {
  const increment = target / duration;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }

    updateNumber(current);
  }, 1000 / 60);
}

function updateNumber(current) {
  const numberElements = document.getElementsByClassName('number-count-number');
  for (const numberElement of numberElements) {
    const targetValue = numberElement.getAttribute('data-target');
    const targetNumber = Number(targetValue.replace(/[^0-9.%]+/g, ''));

    const displayValue =
      targetValue.includes('%') && !Number.isNaN(targetNumber)
        ? current <= targetNumber
          ? Math.round(current) + '%'
          : targetValue
        : current <= targetNumber
        ? Math.round(current).toLocaleString()
        : targetValue;

    numberElement.textContent = displayValue;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const numberSections = document.getElementsByClassName(
    'number-count-section'
  );

  for (const section of numberSections) {
    const targetValue = section
      .querySelector('.number-count-number')
      .getAttribute('data-target');
    const targetNumber = Number(targetValue.replace(/[^0-9.%]+/g, ''));
    startCounting(targetNumber, 2000);
  }
});
