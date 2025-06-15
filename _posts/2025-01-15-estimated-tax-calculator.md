---
layout: post
title: "2025 Estimated Tax Calculator: Don't Guess Your Quarterly Payments"
date: 2025-01-15 12:00:00 -0700
categories: [Tools, Taxes]
tags:
- estimated taxes
- quarterly payments
- tax calculator
- self-employment
- IRS
- 1040-ES
- tax planning
featured_image: /assets/images/laptop-cottonbro-4065876.jpg
seo_title: "2025 Estimated Tax Calculator - Free IRS Form 1040-ES Alternative"
seo_description: Calculate your 2025 quarterly estimated tax payments with our free calculator. Based on IRS Form 1040-ES with simple questionnaire format.
---

I really want to help you take the guess work out of Estimated Quarterly Tax Payments. This calculator walks you through the IRS Form 1040-ES worksheet in plain English, helping you figure out exactly how much to pay each quarter to avoid penalties. Bonus: it will also help you avoid overpaying the IRS. Be sure to read my more [indepth breakdown of estimated quarterly taxes for 2025](https://nectarflowfinance.com/taxes/2025/06/02/estimated-quarterly-taxes-in-2025.html)

**Based on the official 2025 IRS guidelines** - no more digging through confusing government forms.

<div class="calculator-container">
  <div class="calculator-header">
    <h3>🧮 2025 Estimated Tax Calculator</h3>
    <p class="subtitle">Follow the steps below to calculate your quarterly payments</p>
  </div>

  <form id="estimatedTaxForm">
    <!-- Step 1: Filing Status -->
    <div class="step-section">
      <h4>Step 1: Filing Status & Basic Info</h4>
      
      <div class="input-group">
        <label for="filingStatus">What's your filing status for 2025?</label>
        <select id="filingStatus" required>
          <option value="">Choose your filing status</option>
          <option value="single">Single</option>
          <option value="marriedJoint">Married Filing Jointly</option>
          <option value="marriedSeparate">Married Filing Separately</option>
          <option value="headOfHousehold">Head of Household</option>
          <option value="qualifyingSurviving">Qualifying Surviving Spouse</option>
        </select>
      </div>

      <div class="input-group">
        <label for="age">Are you 65 or older by the end of 2025?</label>
        <select id="age">
          <option value="under65">Under 65</option>
          <option value="65orOlder">65 or older</option>
        </select>
      </div>

      <div class="input-group" id="spouseAgeGroup" style="display: none;">
        <label for="spouseAge">Is your spouse 65 or older by the end of 2025?</label>
        <select id="spouseAge">
          <option value="under65">Under 65</option>
          <option value="65orOlder">65 or older</option>
        </select>
      </div>
    </div>

    <!-- Step 2: Income -->
    <div class="step-section">
      <h4>Step 2: Expected 2025 Income</h4>
      
      <div class="input-group">
        <label for="wages">Wages from W-2 jobs (if any)</label>
        <input type="number" id="wages" min="0" step="0.01" placeholder="0.00">
        <small>Include salary, hourly wages, tips, etc.</small>
      </div>

      <div class="input-group">
        <label for="selfEmploymentIncome">Self-employment income (before expenses)</label>
        <input type="number" id="selfEmploymentIncome" min="0" step="0.01" placeholder="0.00">
        <small>Freelance, consulting, business income, etc.</small>
      </div>

      <div class="input-group">
        <label for="otherIncome">Other taxable income</label>
        <input type="number" id="otherIncome" min="0" step="0.01" placeholder="0.00">
        <small>Interest, dividends, rental income, etc.</small>
      </div>

      <div class="input-group">
        <label for="businessExpenses">Business expenses (if self-employed)</label>
        <input type="number" id="businessExpenses" min="0" step="0.01" placeholder="0.00">
        <small>Equipment, software, office supplies, etc.</small>
      </div>
    </div>

    <!-- Step 3: Deductions -->
    <div class="step-section">
      <h4>Step 3: Deductions</h4>
      
      <div class="input-group">
        <label for="deductionType">Will you itemize deductions or take the standard deduction?</label>
        <select id="deductionType">
          <option value="standard">Standard deduction (recommended for most people)</option>
          <option value="itemized">Itemized deductions</option>
        </select>
      </div>

      <div class="input-group" id="itemizedDeductionsGroup" style="display: none;">
        <label for="itemizedDeductions">Total estimated itemized deductions</label>
        <input type="number" id="itemizedDeductions" min="0" step="0.01" placeholder="0.00">
        <small>Mortgage interest, state/local taxes, charitable donations, etc.</small>
      </div>

      <div class="input-group">
        <label for="iraContributions">Traditional IRA contributions</label>
        <input type="number" id="iraContributions" min="0" max="7000" step="50" placeholder="0.00">
        <small>Max $7,000 ($8,000 if 50+). Only deductible if you meet income limits.</small>
      </div>
    </div>

    <!-- Step 4: Credits -->
    <div class="step-section">
      <h4>Step 4: Tax Credits</h4>
      
      <div class="input-group">
        <label for="childTaxCredit">Child Tax Credit</label>
        <input type="number" id="childTaxCredit" min="0" step="50" placeholder="0.00">
        <small>$2,000 per qualifying child under 17</small>
      </div>

      <div class="input-group">
        <label for="otherCredits">Other tax credits</label>
        <input type="number" id="otherCredits" min="0" step="50" placeholder="0.00">
        <small>Education credits, dependent care credit, etc.</small>
      </div>
    </div>

    <!-- Step 5: Withholding -->
    <div class="step-section">
      <h4>Step 5: Withholding & Prior Year</h4>
      
      <div class="input-group">
        <label for="withheld">Expected federal income tax withheld from paychecks in 2025</label>
        <input type="number" id="withheld" min="0" step="0.01" placeholder="0.00">
        <small>Check your paystubs or multiply monthly withholding × 12</small>
      </div>

      <div class="input-group">
        <label for="priorYearTax">Your total tax from 2024 (line 24 of Form 1040)</label>
        <input type="number" id="priorYearTax" min="0" step="0.01" placeholder="0.00">
        <small>This helps determine your safe harbor amount</small>
      </div>

      <div class="input-group">
        <label for="priorYearAGI">Your 2024 Adjusted Gross Income</label>
        <input type="number" id="priorYearAGI" min="0" step="0.01" placeholder="0.00">
        <small>Affects safe harbor rules if over $150,000</small>
      </div>
    </div>

    <div class="calculate-section">
      <button type="submit" id="calculateBtn">Calculate My Quarterly Payments</button>
    </div>
  </form>

  <div id="results" class="hidden">
    <div class="results-header">
      <h3>📊 Your 2025 Estimated Tax Results</h3>
    </div>
    
    <div class="results-grid">
      <div class="result-card">
        <h4>Quarterly Payment Amount</h4>
        <div class="big-number" id="quarterlyAmount">$0</div>
        <p class="result-note" id="quarterlyNote"></p>
      </div>

      <div class="result-card">
        <h4>Annual Estimated Tax</h4>
        <div class="big-number" id="annualTax">$0</div>
        <p class="result-note">Total tax for 2025</p>
      </div>

      <div class="result-card">
        <h4>Safe Harbor Amount</h4>
        <div class="big-number" id="safeHarborAmount">$0</div>
        <p class="result-note" id="safeHarborNote"></p>
      </div>
    </div>

    <div class="payment-schedule">
      <h4>📅 2025 Payment Schedule</h4>
      <div class="payment-dates">
        <div class="payment-date">
          <strong>Q1:</strong> April 15, 2025<br>
          <span class="amount" id="q1Amount">$0</span>
        </div>
        <div class="payment-date">
          <strong>Q2:</strong> June 16, 2025<br>
          <span class="amount" id="q2Amount">$0</span>
        </div>
        <div class="payment-date">
          <strong>Q3:</strong> September 15, 2025<br>
          <span class="amount" id="q3Amount">$0</span>
        </div>
        <div class="payment-date">
          <strong>Q4:</strong> January 15, 2026<br>
          <span class="amount" id="q4Amount">$0</span><br>
          <small>Skip if you file by Jan 31, 2026</small>
        </div>
      </div>
    </div>

    <div class="breakdown-section">
      <h4>💡 Tax Breakdown</h4>
      <div id="taxBreakdown"></div>
    </div>

    <div class="recommendations">
      <h4>📝 Recommendations</h4>
      <div id="recommendationsText"></div>
    </div>

    <div class="next-steps">
      <h4>🎯 Next Steps</h4>
      <ul>
        <li><strong>Set up automatic payments:</strong> Use <a href="https://www.irs.gov/payments" target="_blank">IRS Direct Pay</a> to schedule quarterly payments</li>
        <li><strong>Open a tax savings account:</strong> Put 25-30% of self-employment income into a high-yield savings account</li>
        <li><strong>Track your income monthly:</strong> Adjust estimates if your income changes significantly</li>
        <li><strong>Consider increasing W-4 withholding:</strong> If you have a day job, you might increase withholding instead of making quarterly payments</li>
      </ul>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('estimatedTaxForm');
  const resultsDiv = document.getElementById('results');
  
  // Standard deduction amounts for 2025
  const standardDeductions = {
    single: 15000,
    marriedJoint: 30000,
    marriedSeparate: 15000,
    headOfHousehold: 22500,
    qualifyingSurviving: 30000
  };

  // Additional standard deduction for age 65+
  const additionalDeductions = {
    single: 2000,
    marriedJoint: 1600,  // per spouse
    marriedSeparate: 1600,
    headOfHousehold: 2000,
    qualifyingSurviving: 1600
  };

  // 2025 tax brackets
  const taxBrackets = {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 }
    ],
    marriedJoint: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 }
    ],
    marriedSeparate: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: Infinity, rate: 0.37 }
    ],
    headOfHousehold: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 }
    ],
    qualifyingSurviving: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 }
    ]
  };

  // Show/hide spouse age field
  document.getElementById('filingStatus').addEventListener('change', function() {
    const spouseAgeGroup = document.getElementById('spouseAgeGroup');
    if (this.value === 'marriedJoint' || this.value === 'marriedSeparate') {
      spouseAgeGroup.style.display = 'block';
    } else {
      spouseAgeGroup.style.display = 'none';
    }
  });

  // Show/hide itemized deductions
  document.getElementById('deductionType').addEventListener('change', function() {
    const itemizedGroup = document.getElementById('itemizedDeductionsGroup');
    if (this.value === 'itemized') {
      itemizedGroup.style.display = 'block';
    } else {
      itemizedGroup.style.display = 'none';
    }
  });

  function calculateIncomeTax(taxableIncome, filingStatus) {
    const brackets = taxBrackets[filingStatus];
    let tax = 0;
    let previousMax = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        tax += taxableInThisBracket * bracket.rate;
        previousMax = bracket.max;
      } else {
        break;
      }
    }

    return tax;
  }

  function calculateSelfEmploymentTax(selfEmploymentIncome, wages) {
    if (selfEmploymentIncome <= 0) return { seTax: 0, deduction: 0 };

    const netSelfEmployment = selfEmploymentIncome * 0.9235;
    const socialSecurityMax = 176100; // 2025 limit
    const socialSecurityWages = Math.min(wages || 0, socialSecurityMax);
    const socialSecuritySubject = Math.max(0, Math.min(netSelfEmployment, socialSecurityMax - socialSecurityWages));
    
    const socialSecurityTax = socialSecuritySubject * 0.124;
    const medicareTax = netSelfEmployment * 0.029;
    const seTax = socialSecurityTax + medicareTax;
    const deduction = seTax * 0.5;

    return { seTax, deduction };
  }

  function getStandardDeduction(filingStatus, age, spouseAge) {
    let deduction = standardDeductions[filingStatus];
    
    if (age === '65orOlder') {
      if (filingStatus === 'marriedJoint') {
        deduction += additionalDeductions[filingStatus];
      } else {
        deduction += additionalDeductions[filingStatus];
      }
    }

    if ((filingStatus === 'marriedJoint') && spouseAge === '65orOlder') {
      deduction += additionalDeductions[filingStatus];
    }

    return deduction;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const filingStatus = document.getElementById('filingStatus').value;
    const age = document.getElementById('age').value;
    const spouseAge = document.getElementById('spouseAge').value;
    const wages = parseFloat(document.getElementById('wages').value) || 0;
    const selfEmploymentIncome = parseFloat(document.getElementById('selfEmploymentIncome').value) || 0;
    const otherIncome = parseFloat(document.getElementById('otherIncome').value) || 0;
    const businessExpenses = parseFloat(document.getElementById('businessExpenses').value) || 0;
    const deductionType = document.getElementById('deductionType').value;
    const itemizedDeductions = parseFloat(document.getElementById('itemizedDeductions').value) || 0;
    const iraContributions = parseFloat(document.getElementById('iraContributions').value) || 0;
    const childTaxCredit = parseFloat(document.getElementById('childTaxCredit').value) || 0;
    const otherCredits = parseFloat(document.getElementById('otherCredits').value) || 0;
    const withheld = parseFloat(document.getElementById('withheld').value) || 0;
    const priorYearTax = parseFloat(document.getElementById('priorYearTax').value) || 0;
    const priorYearAGI = parseFloat(document.getElementById('priorYearAGI').value) || 0;

    // Calculate net self-employment income
    const netSelfEmployment = Math.max(0, selfEmploymentIncome - businessExpenses);

    // Calculate self-employment tax and deduction
    const seCalc = calculateSelfEmploymentTax(netSelfEmployment, wages);

    // Calculate AGI
    const agi = wages + netSelfEmployment + otherIncome - seCalc.deduction - iraContributions;

    // Calculate deductions
    const standardDeduction = getStandardDeduction(filingStatus, age, spouseAge);
    const deductionAmount = deductionType === 'itemized' ? 
      Math.max(itemizedDeductions, standardDeduction) : standardDeduction;

    // Calculate taxable income
    const taxableIncome = Math.max(0, agi - deductionAmount);

    // Calculate income tax
    const incomeTax = calculateIncomeTax(taxableIncome, filingStatus);

    // Calculate total tax
    const totalTax = incomeTax + seCalc.seTax;

    // Apply credits
    const totalCredits = childTaxCredit + otherCredits;
    const taxAfterCredits = Math.max(0, totalTax - totalCredits);

    // Calculate required annual payment (safe harbor)
    const isHighIncome = priorYearAGI > 150000 || (filingStatus === 'marriedSeparate' && priorYearAGI > 75000);
    const safeHarborMultiplier = isHighIncome ? 1.10 : 1.00;
    const safeHarborFromPriorYear = priorYearTax * safeHarborMultiplier;
    const safeHarborFromCurrentYear = taxAfterCredits * 0.90;
    const requiredAnnual = Math.min(safeHarborFromPriorYear, safeHarborFromCurrentYear);

    // Calculate estimated payments needed
    const taxOwed = Math.max(0, taxAfterCredits - withheld);
    const estimatedPaymentsNeeded = Math.max(0, requiredAnnual - withheld);
    const quarterlyPayment = estimatedPaymentsNeeded / 4;

    // Determine if payments are required
    const mustPayEstimated = taxOwed >= 1000 && estimatedPaymentsNeeded > 0;

    // Display results
    displayResults({
      quarterlyPayment,
      taxAfterCredits,
      requiredAnnual,
      safeHarborFromPriorYear,
      safeHarborFromCurrentYear,
      mustPayEstimated,
      taxOwed,
      incomeTax,
      seTax: seCalc.seTax,
      agi,
      taxableIncome,
      totalCredits,
      withheld,
      isHighIncome
    });

    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  });

  function displayResults(calc) {
    // Update main results
    document.getElementById('quarterlyAmount').textContent = `$${calc.quarterlyPayment.toFixed(0)}`;
    document.getElementById('annualTax').textContent = `$${calc.taxAfterCredits.toFixed(0)}`;
    document.getElementById('safeHarborAmount').textContent = `$${calc.requiredAnnual.toFixed(0)}`;

    // Update payment schedule
    const quarterlyAmount = calc.quarterlyPayment;
    document.getElementById('q1Amount').textContent = `$${quarterlyAmount.toFixed(0)}`;
    document.getElementById('q2Amount').textContent = `$${quarterlyAmount.toFixed(0)}`;
    document.getElementById('q3Amount').textContent = `$${quarterlyAmount.toFixed(0)}`;
    document.getElementById('q4Amount').textContent = `$${quarterlyAmount.toFixed(0)}`;

    // Update notes
    if (calc.mustPayEstimated) {
      document.getElementById('quarterlyNote').textContent = "Pay this amount each quarter to avoid penalties";
    } else {
      document.getElementById('quarterlyNote').textContent = "No estimated payments required!";
    }

    const safeHarborNote = calc.safeHarborFromPriorYear < calc.safeHarborFromCurrentYear ? 
      "Based on 2024 tax (safe harbor)" : "Based on 90% of 2025 tax";
    document.getElementById('safeHarborNote').textContent = safeHarborNote;

    // Tax breakdown
    const breakdown = document.getElementById('taxBreakdown');
    breakdown.innerHTML = `
      <div class="breakdown-item">
        <span>Adjusted Gross Income:</span>
        <span>$${calc.agi.toFixed(0)}</span>
      </div>
      <div class="breakdown-item">
        <span>Taxable Income:</span>
        <span>$${calc.taxableIncome.toFixed(0)}</span>
      </div>
      <div class="breakdown-item">
        <span>Federal Income Tax:</span>
        <span>$${calc.incomeTax.toFixed(0)}</span>
      </div>
      <div class="breakdown-item">
        <span>Self-Employment Tax:</span>
        <span>$${calc.seTax.toFixed(0)}</span>
      </div>
      <div class="breakdown-item">
        <span>Tax Credits:</span>
        <span>-$${calc.totalCredits.toFixed(0)}</span>
      </div>
      <div class="breakdown-item total">
        <span><strong>Total Tax:</strong></span>
        <span><strong>$${calc.taxAfterCredits.toFixed(0)}</strong></span>
      </div>
      <div class="breakdown-item">
        <span>Less: Withholding:</span>
        <span>-$${calc.withheld.toFixed(0)}</span>
      </div>
      <div class="breakdown-item remaining">
        <span><strong>Remaining Tax Owed:</strong></span>
        <span><strong>$${calc.taxOwed.toFixed(0)}</strong></span>
      </div>
    `;

    // Recommendations
    const recommendations = document.getElementById('recommendationsText');
    let recText = "";

    if (!calc.mustPayEstimated) {
      recText = `<p class="success">✅ <strong>Good news!</strong> You don't need to make estimated tax payments. Your withholding should cover your tax liability.</p>`;
    } else {
      recText = `<p>Based on your income and withholding, you should make quarterly estimated tax payments to avoid penalties.</p>`;
      
      if (calc.isHighIncome) {
        recText += `<p class="warning">⚠️ <strong>High Income Alert:</strong> Since your 2024 AGI exceeded $150,000, you need to pay 110% of last year's tax to use the safe harbor rule.</p>`;
      }

      if (calc.seTax > 0) {
        recText += `<p>💡 <strong>Self-Employment Tip:</strong> Set aside 25-30% of your self-employment income in a separate savings account for taxes.</p>`;
      }

      if (calc.quarterlyPayment > 2000) {
        recText += `<p>💰 <strong>Large Payments:</strong> Consider setting up automatic payments through EFTPS to ensure you don't miss due dates.</p>`;
      }
    }

    recommendations.innerHTML = recText;
  }
});
</script>

<style>
.calculator-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 0;
  margin: 30px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
}

.calculator-header {
  background: rgba(255,255,255,0.15);
  padding: 25px 30px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.calculator-header h3 {
  color: white;
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  color: rgba(255,255,255,0.9);
  margin: 0;
  font-size: 16px;
}

#estimatedTaxForm {
  background: white;
  padding: 30px;
}

.step-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  border-left: 4px solid #667eea;
}

.step-section h4 {
  color: #2c3e50;
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group small {
  display: block;
  margin-top: 5px;
  color: #6c757d;
  font-size: 14px;
}

.calculate-section {
  text-align: center;
  padding: 20px 0;
}

#calculateBtn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#calculateBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.results-header {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 25px 30px;
  text-align: center;
}

.results-header h3 {
  margin: 0;
  font-size: 24px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 30px;
  background: white;
}

.result-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  border: 2px solid #e9ecef;
}

.result-card h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
}

.big-number {
  font-size: 32px;
  font-weight: 700;
  color: #28a745;
  margin-bottom: 10px;
}

.result-note {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
}

.payment-schedule {
  background: white;
  padding: 30px;
  border-top: 1px solid #e9ecef;
}

.payment-schedule h4 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 20px;
}

.payment-dates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.payment-date {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  border: 1px solid #e9ecef;
}

.payment-date .amount {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #28a745;
  margin-top: 5px;
}

.breakdown-section {
  background: white;
  padding: 30px;
  border-top: 1px solid #e9ecef;
}

.breakdown-section h4 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 20px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f3f4;
}

.breakdown-item.total {
  border-top: 2px solid #2c3e50;
  margin-top: 10px;
  padding-top: 15px;
  font-size: 16px;
}

.breakdown-item.remaining {
  background: #fff3cd;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  border: 1px solid #ffeaa7;
}

.recommendations {
  background: white;
  padding: 30px;
  border-top: 1px solid #e9ecef;
}

.recommendations h4 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 20px;
}

.success {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
}

.warning {
  background: #fff3cd;
  color: #856404;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ffeaa7;
}

.next-steps {
  background: #e9ecef;
  padding: 30px;
  border-top: 1px solid #dee2e6;
}

.next-steps h4 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 20px;
}

.next-steps ul {
  margin: 0;
  padding-left: 20px;
}

.next-steps li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.hidden {
  display: none;
}

@media (max-width: 768px) {
  .calculator-container {
    margin: 20px -15px;
    border-radius: 0;
  }
  
  .calculator-header,
  #estimatedTaxForm,
  .results-grid,
  .payment-schedule,
  .breakdown-section,
  .recommendations,
  .next-steps {
    padding: 20px;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .payment-dates {
    grid-template-columns: 1fr;
  }
  
  .big-number {
    font-size: 24px;
  }
}
</style>

---

## About This Calculator

This calculator is based on the official IRS Form 1040-ES and uses the 2025 tax brackets and standard deduction amounts. It covers the most common tax situations for individuals and self-employed taxpayers.

**What it calculates:**
- Federal income tax using 2025 tax brackets
- Self-employment tax (Social Security + Medicare)
- Safe harbor amounts to avoid penalties
- Quarterly payment schedule

**What it doesn't include:**
- State estimated taxes (varies by state)
- Alternative Minimum Tax (AMT)
- Complex situations like farming/fishing income
- Net Investment Income Tax

For complex tax situations, consider consulting a tax professional or using the official IRS worksheets.

**Disclaimer:** This calculator is for educational purposes. Tax laws can be complex, and individual situations vary. Always consult the official IRS publications or a qualified tax professional for specific tax advice.

---

## Related Articles

Looking for more tax guidance? Check out our [complete guide to estimated quarterly taxes in 2025]({% post_url 2025-06-02-estimated-quarterly-taxes-in-2025 %}) for detailed explanations, case studies, and pro tips for managing your quarterly payments. 