//base declaration
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display')
//function calculate
const calculate = (n1,operator,n2) => {
    let result =  '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        if (n2 === 0) {
          result= 'error';
        } else {
        result =parseFloat(n1) / parseFloat(n2);
        }
    }
    return result;
}
keys.addEventListener('click',e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
      if (!action) {
         if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
         } else {
            display.textContent = displayedNum + keyContent;
            calculator.dataset.previousKeyType = 'number';
         }
      }//operator button
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        if (firstValue && operator) {
            display.textContent = calculate(firstValue,operator,secondValue);
        }

       key.classList.add('is-depressed');
       //add custom attribute
       calculator.dataset.previousKeyType = 'operator';
       calculator.dataset.firstValue = displayedNum;
       calculator.dataset.operator = action;
    }//decimal button
     if (action == 'decimal') {
        if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
        } else if (previousKeyType = 'operator' ) {
            display.textContent = '0.'
        }
        calculator.dataset.previousKeyType = 'decimal';
    }//clear button
     if (action == 'clear') {
        calculator.dataset.previousKeyType = 'clear';
    }//calculate button
     if (action == 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
        calculator.dataset.previousKeyType = 'calculate';
    }
    //do nothing if string has a dot
    if (!displayedNum.includes('.')) {
        display.textContent = displayedNum;
    }
    //remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'));
    }
});