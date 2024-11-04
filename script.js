document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements from DOM
    const billTotal = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentage = document.getElementById('tipPercentage');
    const tipAmount = document.getElementById('tipAmount');
    const totalBill = document.getElementById('totalBill');
    const currencySelect = document.getElementById('currency');

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    // Find the form-group that contains billTotal and append error div to it
    const billTotalGroup = billTotal.closest('.form-group');
    if (billTotalGroup) {
        billTotalGroup.appendChild(errorDiv);
    }

    // Exchange rates
    const exchangeRates = {
        USD: 1,
        INR: 84.07,
        JPY: 149.34
    };

    // Currency symbols
    const currencySymbols = {
        USD: '$',
        INR: '₹',
        JPY: '¥'
    };

    // Update tip percentage immediately when page loads
    tipPercentage.value = tipSlider.value + '%';

    function validateBillInput(value) {
        // Clear any existing error first
        hideError();
        
        if (value === '') {
            return true; // Empty input is ok
        }

        const number = parseFloat(value);
        if (isNaN(number)) {
            showError('Please enter a valid number');
            return false;
        }
        if (number < 0) {
            showError('Please enter a positive number');
            return false;
        }
        return true;
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        if (billTotal) {
            billTotal.style.borderColor = '#dc3545';
            billTotal.style.backgroundColor = '#fff8f8';
        }
    }

    function hideError() {
        errorDiv.style.display = 'none';
        if (billTotal) {
            billTotal.style.borderColor = '#e2e8f0';
            billTotal.style.backgroundColor = '#ffffff';
        }
    }

    function calculateTip() {
        // Validate input first
        if (!validateBillInput(billTotal.value)) {
            tipAmount.value = '';
            totalBill.value = '';
            return;
        }

        // Get and validate bill amount
        let bill = parseFloat(billTotal.value);
        if (isNaN(bill)) bill = 0;

        // Get current values
        const tip = parseFloat(tipSlider.value);
        const currency = currencySelect.value;
        const rate = exchangeRates[currency];
        const symbol = currencySymbols[currency];

        // Always update tip percentage display when slider moves
        tipPercentage.value = tip + '%';

        // Calculate values in USD
        const tipAmountValue = (bill * tip) / 100;
        const totalAmountValue = bill + tipAmountValue;

        // Convert to selected currency and display
        const convertedTip = tipAmountValue * rate;
        const convertedTotal = totalAmountValue * rate;

        // Update display with proper formatting
        tipAmount.value = `${symbol}${convertedTip.toFixed(2)}`;
        totalBill.value = `${symbol}${convertedTotal.toFixed(2)}`;
    }

    // Event listeners
    billTotal.addEventListener('input', function(e) {
        calculateTip();
    });
    tipSlider.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);

    // Initial calculation
    calculateTip();
});