'use strict';

const results = document.querySelector('#results');
const loader = document.querySelector('#loading');

//  Disable results and loader

(function () {
  loader.style.display = 'none';
  results.style.display = 'none';
})();

const calculateBtn = document.querySelector('#loan-form');

calculateBtn.addEventListener('submit', function (event) {
  if (!validateInput()) {
    return;
  };
  loader.style.display = 'block';
  results.style.display = 'none';
  setTimeout(calculateResults, 3000);

  event.preventDefault();
});

//  [loanAmount x R(monthly) x (1+R)^N(years)]/[(1+R)^N-1]
function calculateResults () {
  //    Input vars
  const loanAmount = parseFloat(document.querySelector('#amount').value);
  const inetrestYearly = parseFloat(document.querySelector('#interest').value);
  const inetrestMonthly = inetrestYearly / (12 * 100);
  const years = parseFloat(document.querySelector('#years').value);
  const months = years > 0 ? years * 12 : 1;

  //    Output vars
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalpayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  if (isFinite(inetrestMonthly)) {
    const x = (loanAmount * inetrestMonthly) * Math.pow(1 + inetrestMonthly, months);
    const y = Math.pow(1 + inetrestMonthly, months) - 1;
    monthlyPayment.value = ((x) / (y)).toFixed(2);
    totalpayment.value = (monthlyPayment.value * months).toFixed(2);
    totalInterest.value = (totalpayment.value - loanAmount).toFixed(2);
    loader.style.display = 'none';
    results.style.display = 'block';
  } else {
    showError('Please Enter Correct numbers');
  }
}

function validateInput () {
  const loanAmount = parseFloat(document.querySelector('#amount').value);
  const inetrestYearly = parseFloat(document.querySelector('#interest').value);
  const years = parseFloat(document.querySelector('#years').value);

  if (loanAmount <= 0 || inetrestYearly <= 0 || years <= 0) {
    showError('Please Enter Correct Numbers');
    return false;
  }
  return true;
}

function showError (msg) {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'alert alert-danger';
  const error = document.createTextNode(msg);
  errorDiv.appendChild(error);

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError () {
  document.querySelector('.alert').remove();
}
