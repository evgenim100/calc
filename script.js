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

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpences: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function (){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
    appData.addExpenses = addExpenses.toLowerCase().split(' ,');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i=0; i<2; i++){
      let keyForSum = prompt('Введите обязательную статью расходов?');    
      appData.expenses[keyForSum] = +prompt('Во сколько это обойдется?');
      sum += appData.expenses[keyForSum];
  }
  // console.log(sum);
  return(sum);
  
  },
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0

};

appData.asking();
appData.budget = money;


appData.getExpensesMonth = function(){
  let sum = 0;
  for (var prop in appData.expenses) {
   sum += appData.expenses[prop];
}
  appData.expensesMonth = sum;
  return(sum);
};

appData.getBudget = function(){
  appData.budgetMonth = appData.budget - appData.getExpensesMonth();
  appData.budgetDay = Math.floor(appData.budgetMonth/30);
 
  
  return appData.budget - appData.budgetMonth;
};


appData.getTargetMonth = function(){
  return appData.mission/appData.budgetMonth;
};

appData.getStatusIncome = function(){
if ((appData.budgetDay > 1200) || (appData.budgetDay === 1200)){
  console.log('У вас высокий уровень дохода');
} else if ((600 < appData.budgetDay) && (appData.budgetDay < 1200) || (appData.budgetDay === 600)){
    console.log('У вас средний уровень дохода');
} else if ((0 < appData.budgetDay) && (appData.budgetDay < 600) || (appData.budgetDay === 0)){
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (appData.budgetDay < 0){
  console.log('Что то пошло не так');
}
};

appData.getBudget();

console.log('Расходы за месяц: ', appData.getExpensesMonth());

console.log('Цель будет достигнута за ' + Math.ceil(appData.mission/appData.budgetMonth) + ' месяцев');

appData.getStatusIncome();


console.log('Наша программа включает в себя данные:' );
for (var key in appData) {
  console.log('Свойство: ' + key + ' Значение: ' + appData[key]);
   
}





