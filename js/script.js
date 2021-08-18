'use strict';

// console.log('document.getElementById(start):', document.getElementById('start'));

// console.log('document.getElementsByTagName(button):', document.getElementsByTagName('button')[0]);
// console.log('document.getElementsByTagName(button):', document.getElementsByTagName('button')[1]);

// console.log('document.querySelector(#deposit-check): ', document.querySelector('#deposit-check'));

// console.log('document.querySelectorAll(.additional_income-item): ', document.querySelectorAll('.additional_income-item'));



//  let s = [];

//  for (let i=1; i<7; i++){
//    s[i-1] = document.getElementsByClassName('result-total')[i];
//  }

//  console.log(s);


//  console.log(' document.querySelector(.salary-amount): ',  document.querySelector('.salary-amount'));
//  console.log(' document.querySelectorAll(.income-title)[1] ', document.querySelectorAll('.income-title')[1]);
//  console.log(' document.querySelector(.income-amount) ', document.querySelector('.income-amount'));
//  console.log(' document.querySelectorAll(.additional_income-item[0]) ', document.querySelectorAll('.additional_income-item')[0]);
// console.log(' document.querySelectorAll(.additional_income-item[1]) ', document.querySelectorAll('.additional_income-item')[1]);

// console.log(' document.querySelectorAll(.expenses-title[1]) ', document.querySelectorAll('.expenses-title')[1]);

// console.log(' document.querySelector(.expenses-amount) ', document.querySelector('.expenses-amount'));
// console.log(' document.querySelector(.additional_expenses-item) ', document.querySelector('.additional_expenses-item'));
// console.log(' document.querySelector(.target-amount) ', document.querySelector('.target-amount'));
// console.log(' document.querySelector(.period-select) ', document.querySelector('.period-select'));


let lesA = document.getElementById('start');

let lesB1 = document.getElementsByTagName('button')[0];
let lesB2 = document.getElementsByTagName('button')[1];

let lesC = document.querySelector('#deposit-check');

let lesD = document.querySelectorAll('.additional_income-item');

let lesE = [];

 for (let i=1; i<7; i++){
   lesE[i-1] = document.getElementsByClassName('result-total')[i];
 }

let lesF1 = document.querySelector('.salary-amount');
let lesF2 = document.querySelectorAll('.income-title')[1];
let lesF3 = document.querySelector('.income-amount');
let lesF4 = document.querySelectorAll('.additional_income-item')[0];
let lesF5 = document.querySelectorAll('.additional_income-item')[1];
let lesF6 = document.querySelectorAll('.expenses-title')[1];
let lesF7 = document.querySelector('.expenses-amount');
let lesF8 = document.querySelector('.additional_expenses-item');
let lesF9 = document.querySelector('.target-amount');
let lesF10 = document.querySelector('.period-select');




