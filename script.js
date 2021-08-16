'use strict';

let money;

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = function(){
  do{
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();





let income = 'freelance'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?');
// let expenses1 = prompt('Введите первую обязательную статью расходов?');
// let amount1 = Number(prompt('Во сколько это обойдется?'));
// let expenses2 = prompt('Введите вторую обязательную статью расходов?');
// let amount2 = Number(prompt('Во сколько это обойдется?'));
// let budgetMonth = money-(amount1+amount2);
let mission = 1000000 ;
let period = 12;
let budgetDay;
let periodToAim;
let expences = [];




console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase());

let getExpensesMonth = function(){
  let sum = 0;
  let num;
  for (let i=0; i<2; i++){
    expences[i] = prompt('Введите обязательную статью расходов?');

    do {
    num = prompt('Во сколько это обойдется?');
    if (isNumber(num)) {
      sum += +num;
    }
    else {
      alert("Это не число");
    };
    }
    while (!isNumber(num));
  };
console.log(sum);
return(sum);
};


let expencesAmount = getExpensesMonth(); 



function getStatusIncome(budgetForDay){
if (budgetForDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (600 <= budgetForDay) {
    console.log('У вас средний уровень дохода');
} else if (0 < budgetForDay){
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetForDay <= 0){
  console.log('Что то пошло не так');
}
};

getStatusIncome(budgetDay);



function getAccumulatedMonth(monthIncome){
  return monthIncome-expencesAmount;
}

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(needToCollect){
  return Math.ceil(needToCollect/accumulatedMonth);
}

console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ', getAccumulatedMonth(money));

periodToAim = getTargetMonth(mission);

if (periodToAim < 0) console.log('Цель не будет достигнута')
  else {
  console.log('Цель будет достигнута за ' + periodToAim + ' месяцев');
  };

budgetDay = Math.floor(getAccumulatedMonth(money)/30);
console.log('Бюджет на день: ', budgetDay);

