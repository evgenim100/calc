'use strict';
let money = Number(prompt('Ваш месячный доход?'));
let income = 'freelance'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите первую обязательную статью расходов?');
let amount1 = Number(prompt('Во сколько это обойдется?'));
let expenses2 = prompt('Введите вторую обязательную статью расходов?');
let amount2 = Number(prompt('Во сколько это обойдется?'));
let budgetMonth = money-(amount1+amount2);
let mission = 1000000 ;
let period = 12;
let budgetDay = money/30;
let periodToAim;

console.log('сообщение с любым текстом');
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);

console.log('Бюджет на месяц: ', budgetMonth);
periodToAim = Math.ceil(mission/budgetMonth);
console.log('Цель будет достигнута за ' + periodToAim + ' месяцев');
budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);

if ((budgetDay > 1200) || (budgetDay === 1200)){
  console.log('У вас высокий уровень дохода');
} else if ((600 < budgetDay) && (budgetDay < 1200) || (budgetDay === 600)){
    console.log('У вас средний уровень дохода');
} else if ((0 < budgetDay) && (budgetDay < 600) || (budgetDay === 0)){
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0){
  console.log('Что то пошло не так');
}


