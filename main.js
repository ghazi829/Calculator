
        document.addEventListener('DOMContentLoaded', function() {
            const displayCurrent = document.querySelector('.current-value');
            const displayPrevious = document.querySelector('.previous-operation');
            const buttons = document.querySelectorAll('button');
            const acButton = document.getElementById('ac');
            const cButton = document.getElementById('c');
            
            let currentValue = '0';
            let previousValue = '';
            let operation = null;
            let resetScreen = false;
            
            // Update display
            function updateDisplay() {
                displayCurrent.textContent = currentValue;
                displayPrevious.textContent = previousValue;
            }
            
            // Reset calculator (AC)
            function allClear() {
                currentValue = '0';
                previousValue = '';
                operation = null;
                resetScreen = false;
            }
            
            // Clear current entry (C)
            function clearEntry() {
                currentValue = '0';
                resetScreen = false;
            }
            
            // Append number
            function appendNumber(number) {
                if (currentValue === '0' || resetScreen) {
                    currentValue = number;
                    resetScreen = false;
                } else {
                    currentValue += number;
                }
            }
            
            // Add decimal point
            function addDecimal() {
                if (resetScreen) {
                    currentValue = '0.';
                    resetScreen = false;
                    return;
                }
                
                if (!currentValue.includes('.')) {
                    currentValue += '.';
                }
            }
            
            // Handle operations
            function chooseOperation(op) {
                if (currentValue === '0') return;
                
                if (operation !== null) {
                    calculate();
                }
                
                previousValue = `${currentValue} ${op}`;
                operation = op;
                resetScreen = true;
            }
            
            // Calculate percentage
            function calculatePercentage() {
                currentValue = (parseFloat(currentValue) / 100).toString();
            }
            
            // Perform calculation
            function calculate() {
                let computation;
                const prev = parseFloat(previousValue);
                const current = parseFloat(currentValue);
                
                if (isNaN(prev) || isNaN(current)) return;
                
                switch (operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '*':
                        computation = prev * current;
                        break;
                    case '/':
                        computation = prev / current;
                        break;
                    default:
                        return;
                }
                
                currentValue = computation.toString();
                operation = null;
                previousValue = '';
            }
            
            // Handle button clicks
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // AC button
                    if (button === acButton) {
                        allClear();
                    }
                    // C button
                    else if (button === cButton) {
                        clearEntry();
                    }
                    // Number buttons
                    else if (button.classList.contains('dark-btn') && 
                            button.textContent >= '0' && button.textContent <= '9') {
                        appendNumber(button.textContent);
                    }
                    // Decimal point
                    else if (button.textContent === '.') {
                        addDecimal();
                    }
                    // Operator buttons
                    else if (button.classList.contains('orange-btn') && 
                            button.textContent !== '=') {
                        chooseOperation(button.textContent);
                    }
                    // Equals button
                    else if (button.textContent === '=') {
                        calculate();
                    }
                    // Percentage button
                    else if (button.textContent === '%') {
                        calculatePercentage();
                    }
                    
                    updateDisplay();
                });
            });
            
            // Initialize display
            updateDisplay();
        });