'use strict';

let  startBtn = document.getElementById('start');

let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];

let depositCheck = document.querySelector('#deposit-check');

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');



let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalTncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];


let salaryAmount = document.querySelector('.salary-amount'); //
let incomeTitle = document.querySelectorAll('.income-title')[1]; //
let incomeAmount = document.querySelector('.income-amount'); //
let additionalIncome1 = document.querySelectorAll('.additional_income-item')[0]; //
let additionalIncome2 = document.querySelectorAll('.additional_income-item')[1]; // 
let expensesTitle = document.querySelectorAll('.expenses-title')[1]; //
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesAmount = document.querySelector('.expenses-amount'); //
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); //
let targetAmount = document.querySelector('.target-amount'); //
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');

let periodAmount = document.querySelector('.period-amount');

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpences: [],
  deposit: false,
  personDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  salaryAmountCheck: function(){  
  if (salaryAmount.value === ''){
    startBtn.disabled = true; 
    return;
  }
  else {
    startBtn.disabled = false;
    return; 
  };
  },

  start: function(){
  // do{
  //   money = prompt('Ваш месячный доход?', '100000');
  // }
  // while (!isNumber(money));

  // if (salaryAmount.value === ''){
  //   startBtn.disabled = true; 
  //   return;
  // }
  // else {
  //   startBtn.disabled = false; 
  // };

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.inputBlock();
    this.btnReset(); 
  //// appData.asking();
  //// appData.budget = money;
  //// appData.getStatusIncome();
  },

  incomePeriodValueChange:function(){
    incomePeriodValue.value = appData.calcPeriod();
  },

  showResult: function (){
    budgetDayValue.value = this.budgetDay;
    budgetMonthValue.value = this.budgetMonth;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpences.join(', ');
    additionalTncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', this.incomePeriodValueChange);
  },

  

  addExpensesBlock: function (){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    };
  },
  
  addIncomeBlock: function (){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    };
  },

  getExpenses: function (){
    expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      appData.expenses[itemExpenses] = cashExpenses;
    };
    });
  },

  getIncome: function (){
    incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      appData.income[itemIncome] = cashIncome;
    };
    });

    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    };
  },

  getAddExpenses: function (){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !==''){
        appData.addExpences.push(item);
      }
    });
  },

  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function(){
    let sum = 0;
    for (let prop in this.expenses) {
    sum += +this.expenses[prop];
  }
    this.expensesMonth = sum;
    return(sum);
  },

  getBudget: function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
    this.budgetDay = Math.floor(this.budgetMonth/30);
  
    
    return this.budget - this.budgetMonth;
  }, 

  getTargetMonth: function(){
    return Math.ceil(targetAmount.value/this.budgetMonth);
  },
  
  getStatusIncome: function(){
  if (this.budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
  } else if (600 <= this.budgetDay) {
      console.log('У вас средний уровень дохода');
  } else if (0 <= this.budgetDay) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что-то пошло не так');
  }
  }, 

  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
  },

  getInfoDeposit: function(){
    if (this.deposit) {
       do{
          this.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while (!isNumber(this.percentDeposit));

      do{
          this.moneyDeposit = prompt('Какая сумма депозита?', '10000');
        }
        while (!isNumber(this.moneyDeposit));
    };
  }, 

  periodChange: function(){
    periodAmount.textContent = periodSelect.value;
  },

  inputBlock: function(){
  let allInput = document.querySelectorAll('input');
  allInput.forEach(function(item, index){
  item.disabled = false;
  if (item.className !='period-select'){
    item.disabled = true;
  } else {
    return;
  }
  })
  incomePlus.disabled = true;
  expensesPlus.disabled = true;
},

reset: function(){
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpences = [];
  this.deposit = false;
  this.personDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  
  let allInput = document.querySelectorAll('input');
  allInput.forEach(function(item, index){
  item.disabled = false;
  if (item.className !== 'period-select'){
    item.value = '';
  } else {
    item.value = 1;
    periodAmount.textContent = '1';
  }
  })
  incomePlus.disabled = false;
  expensesPlus.disabled = false;

  let additionalIncomes = document.querySelectorAll('.income-items');
    additionalIncomes.forEach(function(item, index){
      if (index !==0){
        item.remove();
      }
    })

  let additionalexpenses = document.querySelectorAll('.expenses-items');
    additionalexpenses.forEach(function(item, index){
      if (index !==0){
        item.remove();
      }
    })

let resetBtn = document.getElementById('cancel');
resetBtn.style.display = 'none';
startBtn.style.display = 'block';

startBtn.disabled = true;
},

btnReset: function(){
startBtn.style.display = 'none';
let resetBtn = document.getElementById('cancel');
resetBtn.style.display = 'block';
resetBtn.addEventListener('click', appData.reset.bind(appData));
}
};

startBtn.addEventListener('click', appData.start.bind(appData));

startBtn.disabled = true;

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.periodChange);
salaryAmount.addEventListener('input', appData.salaryAmountCheck);



