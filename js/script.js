'use strict';

let  startBtn = document.getElementById('start');

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

let depositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');



let rtBudgetDay = document.getElementsByClassName('result-total budget_day-value');
let rtExpensesMonth = document.getElementsByClassName('result-total expenses_month-value');
let rtAdditionalTncome = document.getElementsByClassName('result-total additional_income-value');
let rtAdditionalExpenses = document.getElementsByClassName('result-total additional_expenses-value');
let rtIncomePeriod = document.getElementsByClassName('result-total income_period-value');
let rtTargetMonth = document.getElementsByClassName('result-total target_month-value');


let salaryAmount = document.querySelector('.salary-amount');
let IncomeTitle = document.querySelectorAll('.income-title')[1];
let incomeAmount = document.querySelector('.income-amount');
let additionalIncome1 = document.querySelectorAll('.additional_income-item')[0];
let additionalIncome2 = document.querySelectorAll('.additional_income-item')[1];
let expensesTitle = document.querySelectorAll('.expenses-title')[1];
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let taegetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');

let money;
let itemIncome;
let cashIncome;

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = function(){
  do{
    money = prompt('Ваш месячный доход?', '100000');
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
  personDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function (){

    if(confirm('Есть ли у вас дополнительный источник заработка?')){
       do{
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
        }
        while (isNumber(itemIncome));

       do{
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
        }
        while (!isNumber(cashIncome));
      
      appData.income[itemIncome] = cashIncome;
    }
    

    let keyForSum;
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'sEx, dRUGs, kaZantip'); 
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    console.log('appData.addExpenses: ', appData.addExpenses);
    for (let i = 0; i < appData.addExpenses.length; i++){
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1);
    };
    console.log('appData.addExpenses.join(): ', appData.addExpenses.join(', '));

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let sum = 0;
    for (let i=0; i<2; i++){
      do{
          keyForSum = prompt('Введите обязательную статью расходов?', 'Квартплата');
        }
        while (isNumber(keyForSum));
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
    console.log('Что-то пошло не так');
  }
  }, 

  getInfoDeposit: function(){
    if (appData.deposit) {
       do{
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while (!isNumber(appData.percentDeposit));

      do{
          appData.moneyDeposit = prompt('Какая сумма депозита?', '10000');
        }
        while (!isNumber(appData.moneyDeposit));
    };
  }, 

};

appData.asking();
appData.budget = money;



appData.getBudget();

console.log('Расходы за месяц: ', appData.getExpensesMonth());

let periodToAim = appData.getTargetMonth();

if (periodToAim < 0) console.log('Цель не будет достигнута')
  else {
  console.log('Цель будет достигнута за ' + periodToAim + ' месяцев');
  };

console.log('Цель будет достигнута за ' + Math.ceil(appData.mission/appData.budgetMonth) + ' месяцев');

appData.getStatusIncome();


console.log('Наша программа включает в себя данные:' );
for (let key in appData) {
  console.log('Свойство: ' + key + ' Значение: ' + appData[key]);
   
};


