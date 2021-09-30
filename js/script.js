'use strict';

const  startBtn = document.getElementById('start'),

incomePlus = document.getElementsByTagName('button')[0],
expensesPlus = document.getElementsByTagName('button')[1],

depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
additionalTncomeValue = document.getElementsByClassName('additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
targetMonthValue = document.getElementsByClassName('target_month-value')[0],
salaryAmount = document.querySelector('.salary-amount'), //
incomeTitle = document.querySelectorAll('.income-title')[1], //
incomeAmount = document.querySelector('.income-amount'), //
additionalIncome1 = document.querySelectorAll('.additional_income-item')[0], //
additionalIncome2 = document.querySelectorAll('.additional_income-item')[1], // 
expensesTitle = document.querySelectorAll('.expenses-title')[1], //
expensesItems = document.querySelectorAll('.expenses-items'),
expensesAmount = document.querySelector('.expenses-amount'), //
additionalExpensesItem = document.querySelector('.additional_expenses-item'), //
targetAmount = document.querySelector('.target-amount'), //
periodSelect = document.querySelector('.period-select'),
incomeItems = document.querySelectorAll('.income-items'),
periodAmount = document.querySelector('.period-amount');

startBtn.disabled = true;

const AppData = function(){
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
};
const appData = new AppData();
AppData.prototype.salaryAmountCheck = () => {
  if (salaryAmount.value === ''){
  startBtn.disabled = true; 
  return;
  }
  else {
    startBtn.disabled = false;
    return; 
  }; 
};

AppData.prototype.start = function(){
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
};

AppData.prototype.incomePeriodValueChange = function(){
  incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.showResult = function (){
  const _this = this;
  budgetDayValue.value = this.budgetDay;
  budgetMonthValue.value = this.budgetMonth;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpences.join(', ');
  additionalTncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', _this.incomePeriodValueChange);
};

  

AppData.prototype.addExpensesBlock = function (){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  };
};
  
AppData.prototype.addIncomeBlock = function (){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3){
    incomePlus.style.display = 'none';
  };
};

AppData.prototype.getExpenses = function (){
  const _this = this;
  expensesItems.forEach(function(item){
  let itemExpenses = item.querySelector('.expenses-title').value;
  let cashExpenses = item.querySelector('.expenses-amount').value;
  if (itemExpenses !== '' && cashExpenses !== '') {
    _this.expenses[itemExpenses] = cashExpenses;
  };
  });
};

AppData.prototype.getIncome = function (){
  const _this = this;
  incomeItems.forEach(function(item){
  let itemIncome = item.querySelector('.income-title').value;
  let cashIncome = item.querySelector('.income-amount').value;
  if (itemIncome !== '' && cashIncome !== '') {
    _this.income[itemIncome] = cashIncome;
  };
  });
  for (let key in appData.income){
    _this.incomeMonth += +_this.income[key];
  };
};

AppData.prototype.getAddExpenses = function (){
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !==''){
      _this.addExpences.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function(){
  const _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== ''){
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function(){
  let sum = 0;
  for (let prop in this.expenses) {
  sum += +this.expenses[prop];
}
  this.expensesMonth = sum;
  return(sum);
};

AppData.prototype.getBudget = function(){
  this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
  this.budgetDay = Math.floor(this.budgetMonth/30);

  
  return this.budget - this.budgetMonth;
}; 

AppData.prototype.getTargetMonth = function(){
  return Math.ceil(targetAmount.value/this.budgetMonth);
};
  
AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
  } else if (600 <= this.budgetDay) {
      console.log('У вас средний уровень дохода');
  } else if (0 <= this.budgetDay) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что-то пошло не так');
  }
}; 

AppData.prototype.calcPeriod = function(){
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getInfoDeposit = function(){
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
}; 

AppData.prototype.periodChange = function(){
  periodAmount.textContent = periodSelect.value;
};

AppData.prototype.inputBlock = function(){
  let allInput = document.querySelectorAll('input');
  allInput.forEach(function(item){
  item.disabled = false;
  if (item.className !='period-select'){
    item.disabled = true;
  } else {
    return;
  }
  })
  incomePlus.disabled = true;
  expensesPlus.disabled = true;
};

AppData.prototype.reset = function(){
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
  allInput.forEach(function(item){
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
};

AppData.prototype.btnReset = function(){
  startBtn.style.display = 'none';
  let resetBtn = document.getElementById('cancel');
  resetBtn.style.display = 'block';
  resetBtn.addEventListener('click', this.reset.bind(appData));
};

AppData.prototype.eventListeners = function(){
  const _this = this;
  startBtn.addEventListener('click', _this.start.bind(appData));
  expensesPlus.addEventListener('click', _this.addExpensesBlock);
  incomePlus.addEventListener('click', _this.addIncomeBlock);
  periodSelect.addEventListener('input', _this.periodChange);
  salaryAmount.addEventListener('input', _this.salaryAmountCheck);
};


appData.eventListeners();




