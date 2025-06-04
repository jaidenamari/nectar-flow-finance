---
layout: post
title: "Stock Distribution Calculator: Balance Your Portfolio"
date: 2025-05-19
categories: [Tools, Investing]
---
I created this calculator because I was often left scratching my head trying to figure out how much to allocate to each stock and maintain my meticulously balanced portfolio. Maybe It's a bit overboard to be so fractional about it, but when I have the option to invest by dollars rather than whole shares, I like to neatly organize my investments.

The scenario I often use this the most is with my Fidelity brokerage account. When I use my credit card I get 2% cash back, and it gets auto redeemed to my brokerage. I then go in every month and invest whatever kickback I got by percentage. 

Use this calculator to determine how to distribute investment funds across different stocks or asset classes to maintain your target allocations. Simply enter your investment amount and set up your desired allocation percentages.

<div class="calculator-container">
  <form id="stockDistributionForm">
    <div class="input-group">
      <label for="totalAmount">Total Investment Amount ($):</label>
      <input type="number" id="totalAmount" min="0.01" step="0.01" required>
    </div>
    
    <div id="allocations">
      <h3>Allocations</h3>
      <div class="allocation-summary">
        <p class="note">Total allocation must equal 100%</p>
        <p class="running-total">Current total: <span id="runningTotal">0</span>%</p>
      </div>
      
      <div class="allocation-row">
        <div class="input-group">
          <label for="ticker-1">Ticker/Asset:</label>
          <input type="text" id="ticker-1" placeholder="e.g., VTI" required>
        </div>
        <div class="input-group">
          <label for="percentage-1">Allocation (%):</label>
          <input type="number" id="percentage-1" min="0" max="100" step="0.01" required>
        </div>
        <button type="button" class="remove-btn hidden" data-row="1">×</button>
      </div>
    </div>
    
    <div class="actions">
      <button type="button" id="addRowBtn">+ Add Asset</button>
      <button type="submit" id="calculateBtn">Calculate Distribution</button>
    </div>
  </form>
  
  <div id="results" class="hidden">
    <h3>Investment Distribution</h3>
    <div class="total-summary">
      <p>Total Allocation: <span id="totalPercentage">0</span>%</p>
    </div>
    <div id="distributionResults"></div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('stockDistributionForm');
  const allocationsDiv = document.getElementById('allocations');
  const addRowBtn = document.getElementById('addRowBtn');
  const resultsDiv = document.getElementById('results');
  const distributionResults = document.getElementById('distributionResults');
  const totalPercentageSpan = document.getElementById('totalPercentage');
  const runningTotalSpan = document.getElementById('runningTotal');
  
  let rowCount = 1;
  let runningTotal = 0;
  
  // Add new allocation row
  addRowBtn.addEventListener('click', function() {
    rowCount++;
    
    const newRow = document.createElement('div');
    newRow.className = 'allocation-row';
    newRow.innerHTML = `
      <div class="input-group">
        <label for="ticker-${rowCount}">Ticker/Asset:</label>
        <input type="text" id="ticker-${rowCount}" placeholder="e.g., VTI" required>
      </div>
      <div class="input-group">
        <label for="percentage-${rowCount}">Allocation (%):</label>
        <input type="number" id="percentage-${rowCount}" min="0" max="100" step="0.01" required>
      </div>
      <button type="button" class="remove-btn" data-row="${rowCount}">×</button>
    `;
    
    allocationsDiv.appendChild(newRow);
    
    // Show remove button on first row if we now have multiple rows
    if (rowCount === 2) {
      document.querySelector('.remove-btn.hidden').classList.remove('hidden');
    }
    
    // Add event listener to new remove button
    newRow.querySelector('.remove-btn').addEventListener('click', removeRow);
    
    // Add event listener to new percentage input
    newRow.querySelector('input[id^="percentage-"]').addEventListener('input', updateRunningTotal);
  });
  
  // Initialize percentage input event listener for the first row
  document.getElementById('percentage-1').addEventListener('input', updateRunningTotal);
  
  // Update running total
  function updateRunningTotal() {
    const allocationRows = document.querySelectorAll('.allocation-row');
    let total = 0;
    
    allocationRows.forEach(row => {
      const percentageInput = row.querySelector('input[id^="percentage-"]');
      const value = parseFloat(percentageInput.value) || 0;
      total += value;
    });
    
    runningTotal = total;
    runningTotalSpan.textContent = total.toFixed(2);
    
    // Add visual feedback
    if (Math.abs(total - 100) < 0.01) {
      runningTotalSpan.classList.add('total-valid');
      runningTotalSpan.classList.remove('total-invalid');
    } else {
      runningTotalSpan.classList.remove('total-valid');
      if (total > 100) {
        runningTotalSpan.classList.add('total-invalid');
      } else {
        runningTotalSpan.classList.remove('total-invalid');
      }
    }
  }
  
  // Remove allocation row
  function removeRow(e) {
    const rowToRemove = e.target.closest('.allocation-row');
    rowToRemove.remove();
    rowCount--;
    
    // Hide remove button on first row if it's the only one left
    if (rowCount === 1) {
      document.querySelector('.remove-btn').classList.add('hidden');
    }
    
    // Update running total after removing a row
    updateRunningTotal();
  }
  
  // Calculate distribution
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const allocationRows = document.querySelectorAll('.allocation-row');
    const results = [];
    
    // No need to recalculate totalPercentage since we're tracking it in runningTotal
    let totalPercentage = runningTotal;
    
    allocationRows.forEach(row => {
      const tickerId = row.querySelector('input[id^="ticker-"]').id;
      const percentageId = row.querySelector('input[id^="percentage-"]').id;
      
      const ticker = document.getElementById(tickerId).value;
      const percentage = parseFloat(document.getElementById(percentageId).value);
      const amount = (percentage / 100) * totalAmount;
      
      results.push({ ticker, percentage, amount });
    });
    
    // Display results
    totalPercentageSpan.textContent = totalPercentage.toFixed(2);
    
    if (Math.abs(totalPercentage - 100) > 0.01) {
      alert('Total allocation must equal 100%. Please adjust your percentages.');
      return;
    }
    
    distributionResults.innerHTML = '';
    results.forEach(result => {
      const resultRow = document.createElement('div');
      resultRow.className = 'result-row';
      resultRow.innerHTML = `
        <div class="ticker">${result.ticker}</div>
        <div class="percentage">${result.percentage.toFixed(2)}%</div>
        <div class="amount">$${result.amount.toFixed(2)}</div>
      `;
      distributionResults.appendChild(resultRow);
    });
    
    resultsDiv.classList.remove('hidden');
  });
});
</script>

<style>
.calculator-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.allocation-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  align-items: end;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

#addRowBtn {
  background-color: #f0f0f0;
  color: #333;
}

#calculateBtn {
  background-color: #1E6B3E;
  color: white;
}

.remove-btn {
  background-color:rgb(238, 69, 89);
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 0;
  margin-bottom: 5px;
}

.hidden {
  display: none;
}

#results {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.total-summary {
  margin-bottom: 15px;
  font-weight: 600;
}

.result-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.note {
  font-size: 0.9em;
  color: #666;
  margin-top: -5px;
  margin-bottom: 15px;
}

.allocation-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.running-total {
  font-weight: 600;
  margin: 0;
}

#runningTotal {
  display: inline-block;
  min-width: 40px;
  text-align: right;
}

.total-valid {
  color: #1E6B3E;
}

.total-invalid {
  color: rgb(238, 69, 89);
}
</style>

## How to Use This Calculator

1. Enter the total amount you want to invest
2. Add each stock or asset class with its target allocation percentage
3. Click "Calculate Distribution" to see how much to invest in each asset
4. Add or remove assets as needed to adjust your portfolio

This calculator helps you maintain a balanced portfolio by showing exactly how much to allocate to each investment to reach your target percentages.

## Why Portfolio Balance Matters

Maintaining the right balance in your investment portfolio is crucial for:

- **Risk management**: Prevents overexposure to any single investment
- **Diversification**: Spreads your investments across different assets
- **Rebalancing**: Helps you identify when to adjust your holdings
- **Discipline**: Removes emotion from investment decisions

Use this calculator whenever you're adding new funds to your portfolio to ensure you maintain your target asset allocation. 