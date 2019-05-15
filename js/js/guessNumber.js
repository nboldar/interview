class Game {
    constructor() {
        this.secretNumber = this.setRandomNumber();
        this.pattern = '^[0-9]+$';
        this.userNumber = null;
    }

    setRandomNumber() {
        return Math.floor(Math.random() * 6);
    }

    init() {
        let userNumber = this.userNumber;
        userNumber = prompt('Угадай число?:)))');
        if (userNumber === null) {
            this.stop('До свидания! Возвращайтесь!');
        } else {
            if (!userNumber.match(this.pattern)) {
                alert('Ай-ай-ай, стыдно не знать что такое число! Исправляйтесь))');
                this.init();
            }
            userNumber=(+userNumber);
            if (userNumber < this.secretNumber) {
                alert('Упс, число меньше чем то, что загадали!!');
                this.init();
            }
            if (userNumber > this.secretNumber) {
                alert('Да что ж такое, а это больше чем надо!!');
                this.init();
            }
            if (userNumber === this.secretNumber) {
                this.stop('Урааааа!!!!!!!!!!! Угаааадааалллл!!!!');
            }
        }

    }

    stop(message) {
        this.secretNumber = this.setRandomNumber();
        this.userNumber=null;
        alert(message);
        return false;
    }
}