'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let money;
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

let start = function(){
  do{
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase());

let getExpencesMonth = function(){
  let sum = 0;
  for (let i=0; i<2; i++){
    expences[i] = prompt('Введите обязательную статью расходов?');
    sum += +prompt('Во сколько это обойдется?');
  }
  console.log(sum);
  return(sum);
};

let expencesAmount = getExpencesMonth(); 


console.log(addExpenses.split(', '));
console.log('Бюджет на месяц: ', getAccumulatedMonth());
periodToAim = Math.ceil(mission/getAccumulatedMonth());
console.log('Цель будет достигнута за ' + periodToAim + ' месяцев');
budgetDay = Math.floor(getAccumulatedMonth()/30);
console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = function(){
if ((budgetDay > 1200) || (budgetDay === 1200)){
  console.log('У вас высокий уровень дохода');
} else if ((600 < budgetDay) && (budgetDay < 1200) || (budgetDay === 600)){
    console.log('У вас средний уровень дохода');
} else if ((0 < budgetDay) && (budgetDay < 600) || (budgetDay === 0)){
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0){
  console.log('Что то пошло не так');
}
};

getStatusIncome();


function getAccumulatedMonth(){
  return money - expencesAmount;
};

var accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function(){
  return mission/accumulatedMonth;
};

