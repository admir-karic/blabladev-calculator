var upper = document.getElementById('top'),
    mid = document.getElementById('middle'),
    bot = document.getElementById('bottom'),
    numbers = document.getElementsByClassName('number'),
    operators = document.getElementsByClassName('operation'),
    operator = '',
    value = '',
    result = 0,
    numberFocus = true;

var checkIfDivByZero=function(){
    return (bot.innerHTML === '\u00f7 0');
}

var err = function () {
    upper.innerHTML = '';
    mid.innerHTML = '';
    bot.innerHTML = 'Error';
}

var clear = function () {
    upper.innerHTML = '';
    mid.innerHTML = '';
    bot.innerHTML = '';
    result = 0;
    operator = '';
    numberFocus = true;
    document.getElementById('line').style.display = 'none';
}
var checkLenght=function(){
    if (value.length >= 11)
        err();
    else {
        bot.innerHTML = value;
    }
}

var calculate = function (val) {
    var o = val.split(' ')[0].replace(/\u00f7/g, '/').replace(/\u00d7/g, '*'),
        num = parseFloat(val.split(' ')[1]);
    if (isNaN(num)) {
        clear();
        return;
    }
    switch (o) {
        case '+': result += num; break;
        case '-': result -= num; break;
        case '/': result /= num; break;
        case '*': result *= num; break;
    }
        result=parseFloat(result.toFixed(2));
}

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        value = '';
        if (upper.innerHTML !== '') {
            clear();
        }
        if (bot.innerHTML !== ''&& bot.innerHTML!=='Error' && bot.innerHTML!=='0') {
            value = bot.innerHTML;
        }
        if (this.innerHTML === '.') {
            if (value.indexOf('.') > -1)
                return;
            if (value.length === 0)
                value = 0;
        }
        value += this.innerHTML;
        checkLenght();
    });
}

for (var i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function () {
        if (this.innerHTML === '=') {
            if (checkIfDivByZero()) {
                err();
                return;
            }
            if (bot.innerHTML.split(' ')[1]){
                upper.innerHTML = mid.innerHTML;
                mid.innerHTML = operator + bot.innerHTML.split(' ')[1];
                calculate(bot.innerHTML);
                bot.innerHTML = result;
                document.getElementById('line').style.display = 'block';
            }
            numberFocus = false;
        }
        else if (this.innerHTML === 'C') {
            clear();
        }
        else {
            if (bot.innerHTML === '')
                bot.innerHTML = '0';
            else {
                operator = this.innerHTML + ' ';
                if (bot.innerHTML.length === 2 && bot.innerHTML.indexOf(' ') > -1) {
                    bot.innerHTML = operator;
                }
                else if (upper.innerHTML !== '') {
                    upper.innerHTML = '';
                    mid.innerHTML = result;
                    bot.innerHTML = operator;
                }
                else if (bot.innerHTML.indexOf(' ') > -1 && bot.innerHTML.length > 2) {
                    if (checkIfDivByZero()) {
                        err();
                        return;
                    }
                    calculate(bot.innerHTML);
                    mid.innerHTML = result;
                    bot.innerHTML = operator;
                }
                else {
                    result = parseFloat(bot.innerHTML);
                    if (isNaN(result)) {
                        clear();
                        return;
                    }
                    mid.innerHTML = result;
                    bot.innerHTML = operator;
                }
            }
            numberFocus = true;
            document.getElementById('line').style.display = 'none';
        }  
    });
}

document.getElementById('backspace').addEventListener('click', function () {
    if (numberFocus && bot.innerHTML!=='Error') {
        if (bot.innerHTML === operator) {
            return;
        }
        else {
            bot.innerHTML = bot.innerHTML.slice(0, bot.innerHTML.length - 1);
        }
    }
    else {
        clear();
    }
});
