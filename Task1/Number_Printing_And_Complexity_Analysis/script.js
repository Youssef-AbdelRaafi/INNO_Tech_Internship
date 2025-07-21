// Implementation of all methods
function printNumbers1(n) {
    let result = "";
    for (let i = 1; i <= n; i++) {
        if (i === n) {
            result += i;
        } else {
            result += i + ", ";
        }
    }
    return result;
}

function printNumbers2(n) {
    const numbers = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    return numbers.join(", ");
}

function printNumbers3(n) {
    const parts = [];
    for (let i = 1; i <= n; i++) {
        parts.push(i);
    }
    return parts.join(", ");
}

function printNumbers4(n) {
    let result = "";
    for (let i = 1; i <= n; i++) {
        result += i + ", ";
    }
    return result.slice(0, -2);
}

function validateInput() {
    const input = document.getElementById('numberInput');
    const errorDiv = document.getElementById('errorMessage');
    const value = input.value.trim();
    
    errorDiv.textContent = '';
    
    if (value === '') {
        errorDiv.textContent = 'Please enter a number';
        return null;
    }
    
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
        errorDiv.textContent = 'Please enter a positive number';
        return null;
    }
    
    if (num > 1000) {
        errorDiv.textContent = 'Please enter a number ≤ 1000';
        return null;
    }
    
    return num;
}

function measurePerformance(func, n) {
    const startTime = performance.now();
    const result = func(n);
    const endTime = performance.now();
    return {
        result: result,
        time: endTime - startTime
    };
}

function testMethod(methodNum) {
    const n = validateInput();
    if (n === null) return;

    const methods = [null, printNumbers1, printNumbers2, printNumbers3, printNumbers4];
    const method = methods[methodNum];
    
    // Show loading
    const outputDiv = document.getElementById(`output${methodNum}`);
    const resultDiv = document.getElementById(`result${methodNum}`);
    const timeDiv = document.getElementById(`time${methodNum}`);
    
    outputDiv.classList.remove('hidden');
    resultDiv.innerHTML = '<span class="loading"></span> Calculating...';
    timeDiv.textContent = '-';
    
    // Use setTimeout to allow UI update
    setTimeout(() => {
        const performance = measurePerformance(method, n);
        
        resultDiv.textContent = performance.result;
        timeDiv.textContent = performance.time.toFixed(4);
        
        // Scroll to result
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Allow Enter key
document.getElementById('numberInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        testMethod(2); // Default to Array Join method
    }
});

// Clear error on input
document.getElementById('numberInput').addEventListener('input', function() {
    document.getElementById('errorMessage').textContent = '';
});