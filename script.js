'use strict';
let money = Number(prompt('Ваш месячный доход?'));
let income = 'freelance'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите первую обязательную статью расходов?');
let amount1 = Number(prompt('Во сколько это обойдется?'));
let expenses2 = prompt('Введите вторую обязательную статью расходов?');
let amount2 = Number(prompt('Во сколько это обойдется?'));
// let budgetMonth = money-(amount1+amount2);
let mission = 1000000 ;
let period = 12;
let budgetDay;
let periodToAim;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
// console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ', getAccumulatedMonth(money));
periodToAim = Math.ceil(mission/getAccumulatedMonth(money));
console.log('Цель будет достигнута за ' + periodToAim + ' месяцев');
budgetDay = Math.floor(getAccumulatedMonth(money)/30);
console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = function(){
if (budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
} else if (600 <= budgetDay) {
    console.log('У вас средний уровень дохода');
} else if (0 <= budgetDay) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0){
  console.log('Что-то пошло не так');
}
}

getStatusIncome();
function getExpensesMonth(am1, am2){
  return am1+am2;
}

function getAccumulatedMonth(mon){
  return mon-getExpensesMonth(amount1, amount2);
}

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(mis){

  return mis/getAccumulatedMonth(money);
}

