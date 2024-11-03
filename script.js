document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements from DOM
    const billTotal = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipPercentage = document.getElementById('tipPercentage');
    const tipAmount = document.getElementById('tipAmount');
    const totalBill = document.getElementById('totalBill');
    const currencySelect = document.getElementById('currency');

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

    function calculateTip() {
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
    billTotal.addEventListener('input', calculateTip);
    tipSlider.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);

    // Initial calculation
    calculateTip();
});