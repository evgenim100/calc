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
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function (){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
    appData.addExpenses = addExpenses.toLowerCase().split(' ,');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i=0; i<2; i++){
      let keyForSum = prompt('Введите обязательную статью расходов?');
      do {
      appData.expenses[keyForSum] = prompt('Во сколько это обойдется?');    
      if (isNumber(appData.expenses[keyForSum])) {
        sum += +appData.expenses[keyForSum];
      }
      else {
        alert("Это не число");
      };
      }
      while (!isNumber(appData.expenses[keyForSum]));
  }
  // console.log(sum);
  return(sum);
  
  },

  getExpensesMonth: function(){
    let sum = 0;
    for (let prop in appData.expenses) {
    sum += +appData.expenses[prop];
  }
    appData.expensesMonth = sum;
    return(sum);
  },

  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = Math.floor(appData.budgetMonth/30);
  
    
    return appData.budget - appData.budgetMonth;
  }, 

  getTargetMonth: function(){
    return Math.ceil(appData.mission/appData.budgetMonth);
  },
  
  getStatusIncome: function(){
  if (appData.budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
  } else if (600 <= appData.budgetDay) {
      console.log('У вас средний уровень дохода');
  } else if (0 <= appData.budgetDay) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }
  }

};

appData.asking();
appData.budget = money;



appData.getBudget();

console.log('Расходы за месяц: ', appData.getExpensesMonth());

console.log('Цель будет достигнута за ' + Math.ceil(appData.mission/appData.budgetMonth) + ' месяцев');

appData.getStatusIncome();


console.log('Наша программа включает в себя данные:' );
for (let key in appData) {
  console.log('Свойство: ' + key + ' Значение: ' + appData[key]);
   
};





