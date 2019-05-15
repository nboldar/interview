/**
 * 1. Что выведет alert(typeof NaN); ?
 * -number
 */
alert(typeof NaN);

/**
 * 2. Что выведет alert(NaN === NaN); ?
 * -false
 */
alert(NaN === NaN);
/**
 * 3. 0.1 + 0.2 == 0.3 ?
 * -false
 */
alert(0.1 + 0.2 == 0.3);
/**
 * 4. Какой тип будет иметь переменная a, если она создается при помощи следующего кода:
 * var a = "a,b".split(',');
 * -Object
 *
 */
var a = "a,b".split(',');
alert(typeof a);
/**
 * 5. Сделать так, чтобы при нажатии на элемент <а> алертом выводилось «Hello world!».
 * @type {HTMLElement}
 */
let element = document.getElementById('ref');
element.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Hello world!');
});
/**
 * 6. Найти все элементы div с классом one, а также все элементы p с классом two.
 * Затем добавить им всем класс three и визуально плавно спустить вниз.
 */
let divElements = document.getElementsByClassName('one');
let pElements = document.getElementsByClassName('two');

function changeClassToThree(nodeCollection) {
    let nodeArray = Array.from(nodeCollection);
    nodeArray.forEach((element) => {
        if (element.classList.contains('one') || element.classList.contains('two')) {
            element.classList.remove('one');
            element.classList.remove('two');
            element.classList.add('three');
        }
    });
}

/**
 *
 * @param howDeep {Number}
 */
function animateMoveDown(howDeep) {
    let containerHtmlCollection = document.getElementsByClassName('container');
    let container = Array.from(containerHtmlCollection)[0];
    let marginValue = 0;
    let intervalId = setInterval(() => {
        marginValue++;
        container.style.marginTop = `${marginValue}px`;
        if (marginValue === howDeep) {
            clearInterval(intervalId);
        }
    }, 20);

}

let activateBtn = document.getElementById('activate');
activateBtn.addEventListener('click', (event) => {
    event.preventDefault();
    changeClassToThree(divElements);
    changeClassToThree(pElements);
    animateMoveDown(100);
});

/**
 * 8. Привести пример замыкания.
 */
function closure() {
    let i = 0;

    function add() {
        while (i < 10) {
            console.log(i);
            i++;
        }
    }

    add();
}

closure();

/**
 * 9. Написать функцию, которая уменьшает или увеличивает указанное время на заданное количество минут, например:
 changeTime('10:00', 1) //return '10:01'
 changeTime('10:00', -1) //return '09:59'
 changeTime('23:59', 1) //return '00:00'
 changeTime('00:00', -1) //return '23:59'
 */
function changeTime(time, change) {
    let dataArray = time.split(':');
    let totalMinutes = dataArray[0] * 60 + (+dataArray[1]);
    let resultTotalMinutes = totalMinutes + (change);
    let leftMinutes = resultTotalMinutes - (Math.trunc(resultTotalMinutes / 1440) * 1440);
    let resultMin = resultTotalMinutes;
    if (resultTotalMinutes < 0) {
        resultMin = resultTotalMinutes < -1440 ? 1440 + leftMinutes : 1440 + resultTotalMinutes;
    }
    if (resultTotalMinutes > 1440) {
        resultMin = leftMinutes;
    }

    let totalHours = Math.trunc(resultMin / 60);
    let hours = totalHours < 10 ? '0' + totalHours : totalHours.toString();
    let totalMin = resultMin - (Math.trunc(resultMin / 60) * 60);
    let minutes = totalMin < 10 ? '0' + totalMin : totalMin.toString();
    console.log(hours + ':' + minutes);
}

changeTime('00:00', 1000);

/**
 * 10. Написать функцию, возвращающую градус, на который указывают часовая и минутная стрелки в зависимости от времени, например:
 clock_degree("00:00") returns : "360:360"
 clock_degree("01:01") returns : "30:6"
 clock_degree("00:01") returns : "360:6"
 clock_degree("01:00") returns : "30:360"
 clock_degree("01:30") returns : "30:180"
 clock_degree("24:00") returns : "Check your time !"
 clock_degree("13:60") returns : "Check your time !"
 clock_degree("20:34") returns : "240:204"
 */
function degree(time) {
    let dataArray = time.split(':');
    console.log(dataArray);
    const hourDegree = 360 / 12;

    const minDegree = 360 / 60;


    let currentHoursValue = (+dataArray[0]);
    console.log(currentHoursValue);
    let currentMinValue = (+dataArray[1]);
    console.log(currentMinValue);
    if (currentHoursValue < 0 || currentHoursValue > 23) {
        return 'Проверьте часы!';
    } else if (currentHoursValue > 12) {
        currentHoursValue -= 12;
    }
    if (currentMinValue < 0 || currentMinValue > 59) {
        return 'Проверьте часы!';
    }
    let currentMinDegree = currentMinValue * minDegree;

    let currentHoursDegree = currentHoursValue * hourDegree;
    return (currentHoursDegree + ':' + currentMinDegree);
}

console.log(degree('13:02'));

/**
 * 11. Написать простую игру «Угадай число». Программа загадывает случайное число от 0 до 100.
 * Игрок должен вводить предположения и получать ответы «Больше», «Меньше» или «Число угадано».
 */
let gameBtn=document.querySelector('#guessNumber');
let game=new Game();
gameBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    game.init();
});
