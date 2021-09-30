'use strict';

let incomeItems = document.querySelectorAll('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items');

const  startBtn = document.getElementById('start'),

incomePlus = document.getElementsByTagName('button')[0],
expensesPlus = document.getElementsByTagName('button')[1],


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
expensesAmount = document.querySelector('.expenses-amount'), //
additionalExpensesItem = document.querySelector('.additional_expenses-item'), //
targetAmount = document.querySelector('.target-amount'), //
depositCheck = document.querySelector('#deposit-check'),
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),

periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount');

startBtn.disabled = true;

class AppData {
  constructor() {
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
}

isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
}

calcPeriod(){
   return this.budgetMonth * periodSelect.value;
}

salaryAmountCheck(){
  if (salaryAmount.value === ''){
  startBtn.disabled = true; 
  return;
  }
  else {
    startBtn.disabled = false;
    return; 
  };
}

start(){
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getInfoDeposit();
  this.getBudget();
  this.showResult();
  this.inputBlock();
  this.btnReset(); 
}

incomePeriodValueChange(){
  incomePeriodValue.value = this.calcPeriod();
}

showResult(){
  budgetDayValue.value = this.budgetDay;
  budgetMonthValue.value = this.budgetMonth;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpences.join(', ');
  additionalTncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', this.incomePeriodValueChange.bind(appData));
}

addExpensesBlock(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  };
}

addIncomeBlock(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3){
    incomePlus.style.display = 'none';
  };
}

getExpenses(){
  expensesItems.forEach(item =>{
  let itemExpenses = item.querySelector('.expenses-title').value;
  let cashExpenses = item.querySelector('.expenses-amount').value;
  if (itemExpenses !== '' && cashExpenses !== '') {
    this.expenses[itemExpenses] = cashExpenses;
  };
  });
}

getIncome(){
  incomeItems.forEach(item =>{
  let itemIncome = item.querySelector('.income-title').value;
  let cashIncome = item.querySelector('.income-amount').value;
  if (itemIncome !== '' && cashIncome !== '') {
    this.income[itemIncome] = cashIncome;
  };
  });
  for (let key in appData.income){
    this.incomeMonth += +this.income[key];
  };
}

getAddExpenses(){
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(item =>{
    item = item.trim();
    if (item !==''){
      this.addExpences.push(item);
    }
  });
}

getAddIncome(){
  additionalIncomeItem.forEach(item =>{
    let itemValue = item.value.trim();
    if (itemValue !== ''){
      this.addIncome.push(itemValue);
    }
  });
}

getExpensesMonth(){
  let sum = 0;
  for (let prop in this.expenses) {
  sum += +this.expenses[prop];
}
  this.expensesMonth = sum;
  return(sum);
}

getBudget(){
  this.percentDeposit = depositPercent.value;
  const monthDeposit = this.moneyDeposit*(this.percentDeposit/100);
  this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + monthDeposit;
  this.budgetDay = Math.floor(this.budgetMonth/30);
  return this.budget - this.budgetMonth;
}

getTargetMonth(){
  return Math.ceil(targetAmount.value/this.budgetMonth);
}

getStatusIncome(){
  if (this.budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
  } else if (600 <= this.budgetDay) {
      console.log('У вас средний уровень дохода');
  } else if (0 <= this.budgetDay) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что-то пошло не так');
  }
} 

periodChange(){
  periodAmount.textContent = periodSelect.value;
}

inputBlock(){
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
}

reset(){
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpences = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  depositCheck.checked = false;
  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositPercent.style.display = 'none';
  depositPercent.value = '';
  
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
}

btnReset(){
  startBtn.style.display = 'none';
  let resetBtn = document.getElementById('cancel');
  resetBtn.style.display = 'block';
  resetBtn.addEventListener('click', this.reset.bind(appData));
}

getInfoDeposit(){
  if (this.deposit) {
    this.percentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  };
}

changePercent(){
  const valueSelect = this.value;
  if (valueSelect === 'other'){
    depositPercent.style.display = 'inline-block';
    depositPercent.value= '';
  } else {
    depositPercent.value = valueSelect;
    depositPercent.style.display = 'none';
  };
}


depositHandler(){
  if (depositCheck.checked){
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', this.changePercent);
  } else {
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    this.deposit = false;
    depositBank.removeEventListener('change', this.changePercent);
  }
}

isPerentValid(){
  if (!depositPercent.value == ''){
    if ((!this.isNumber(depositPercent.value)) || (depositPercent.value < 0) || (depositPercent.value > 100))
    {
    alert('Введите корректное значение в поле проценты');
    depositPercent.value = '';
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  };
} else {
  this.percentDeposit = 0;
};
}

eventListeners(){
  startBtn.addEventListener('click', this.start.bind(appData));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.periodChange);
  salaryAmount.addEventListener('input', this.salaryAmountCheck);
  depositCheck.addEventListener('change', this.depositHandler.bind(appData));
  depositPercent.addEventListener('input', this.isPerentValid.bind(appData));
}
};

const appData = new AppData();
appData.eventListeners();