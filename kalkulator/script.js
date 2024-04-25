//base declaration
const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
//function calculate
const calculate = (n1,operator,n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum  
    if (operator === 'subtract')  return firstNum - secondNum   
    if (operator === 'multiply')  return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}
//function update visual
const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    
    if (keyType === 'operator') key.classList.add('is-depressed')
    
    if (keyType === 'clear' && key.textContent !== 'AC') {
      key.textContent = 'AC'
    }
    
    if (keyType !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }
  }

//update calculator state
const updateCalculatorState = (key) => {
    const keyType = getKeyType(key)
    calculator.dataset.previousKeyType = keyType
    
    if (keyType === 'number') { /* ... */ }
    if (keyType === 'decimal') { /* ... */ }
    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'
        ? calculatedValue
        : displayedNum
    }
    if (keyType === 'clear') { /* ... */ }
    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
          ? modValue
          : displayedNum
      }

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  }

//function to create a resultString
const createResultString =(key,displayedNum,state) => {
    const keyContent = key.textContent
    const action = key.dataset.action
    const firstValue = state.firstValue
    const modValue = state.modValue
    const operator = state.operator
    const previousKeyType = state.previousKeyType

    if (!action) {
        return displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
          ? keyContent
          : displayedNum + keyContent
      }
    

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.'
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
        return displayedNum
      }

      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        
        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculate(firstValue, operator, displayedNum)
          : displayedNum
      }

      if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const modValue = calculator.dataset.modValue
        
        return firstValue
          ? previousKeyType === 'calculate'
            ? calculate(displayedNum, operator, modValue)
            : calculate(firstValue, operator, displayedNum)
          : displayedNum
      }
}

//function getKeyType => return the type of key that was clicked
const getKeyType = (key) => {
    const {action} = key.dataset
    if (!action) return 'number'
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) return 'operator'
      //for everything else,return the action
      return action
}
keys.addEventListener('click',e => {
    if (e.target.matches('button')) return
    const key = e.target
    const displayedNum = display.textContent
  
    // Pure functions
    const resultString = createResultString(key, displayedNum, calculator.dataset)
  
    // Update states
    display.textContent = resultString
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
 })