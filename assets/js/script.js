const calc = document.querySelector('.calc');
const result = document.querySelector('#result');

function calculateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const numbers = expression.split(new RegExp(`[${operators.join('\\')}]`));
    const operations = expression.split('').filter(char => operators.includes(char));
    let result = parseFloat(numbers[0]);

    for(let i = 0; i < operations.length; i++) {
        const operator = operations[i];
        const number = parseFloat(numbers[i+1]);

        switch(operator) {
            case '+':
                result += number;
                break;
            case '-':
                result -= number;
                break;
            case '*':
                result *= number;
                break;
            case '/':
                result /= number;
                break;
        }
    }

    return result.toFixed(0);
}

calc.addEventListener('click', function(event) {

    //Если отсутствует класс "calc__btn", то элемент будет некликабельным
    if(!event.target.classList.contains('calc__btn')) return; 
    
    //Присваиваем переменной value значение элемента на который мы нажали
    const value = event.target.innerText;

    if (result.innerText.length <= 17) {

        switch(value) {
            case 'C':
                result.innerText = '';
                break;
        
            case '=':
                result.innerText = calculateExpression(result.innerText);
                break;
        
            default:
                if (isNaN(value) && isNaN(result.innerText[result.innerText.length - 1])) {
                    result.innerText = result.innerText.slice(0, -1) + value;
                } else {
                    result.innerText += value;
                }
        }
    } else {
        switch(value) {
            case 'C':
                result.innerText = ''; 
                break;
        
            case '=':
                result.innerText = calculateExpression(result.innerText);
                break;
        } 
    }
});

document.onkeydown = function(event) {
    let key = event.keyCode || event.charCode;

    console.log(key);
    //Проверяем, является ли нажатая клавиша цифрой или символом операции
    if ((key >= 48 && key <= 57) || key === 109 || key === 111 || key === 106 || key === 107 || key === 46 || key === 47 || key === 45 || key === 46) {
      // Добавляем символ к текущему значению result
      result.innerHTML += (event.key);
      event.preventDefault(); // Отменяем стандартное действие клавиши
    }
  };