function validateInput() {
    const input = document.getElementById('numberInput');
    const errorDiv = document.getElementById('errorMessage');
    const value = input.value.trim();

    errorDiv.textContent = '';
    input.style.borderColor = '#e0e0e0';

    if (value === '') {
        showError('Please enter a number');
        return null;
    }

    const num = parseInt(value);
    if (isNaN(num)) {
        showError('Please enter a valid number');
        return null;
    }

    if (num <= 0) {
        showError('Please enter a positive number');
        return null;
    }

    if (num > 10000000) {
        showError('Number too large! Please enter a smaller number (max: 10,000,000)');
        return null;
    }

    return num;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const input = document.getElementById('numberInput');
    errorDiv.textContent = message;
    input.style.borderColor = '#e74c3c';
}

function sumWithLoop(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sumWithFormula(n) {
    return (n * (n + 1)) / 2;
}

function measurePerformance(func, n) {
    const startTime = performance.now();
    const result = func(n);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    return {
        result: result,
        time: executionTime
    };
}

function calculateWithLoop() {
    const n = validateInput();
    if (n === null) return;

    const performance = measurePerformance(sumWithLoop, n);
    displaySingleResult('For Loop Method', performance, 'result-loop');
}

function calculateWithFormula() {
    const n = validateInput();
    if (n === null) return;

    const performance = measurePerformance(sumWithFormula, n);
    displaySingleResult('Formula Method', performance, 'result-formula');
}

function comparePerformance() {
    const n = validateInput();
    if (n === null) return;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div style="text-align: center; padding: 20px;"><span class="loading"></span> Calculating...</div>';

    setTimeout(() => {
        const loopPerformance = measurePerformance(sumWithLoop, n);
        const formulaPerformance = measurePerformance(sumWithFormula, n);
        displayComparison(loopPerformance, formulaPerformance, n);
    }, 100);
}

function displaySingleResult(title, performance, className) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="result-card ${className}">
            <div class="method-title">${title}</div>
            <div class="result-value">Sum: ${performance.result.toLocaleString()}</div>
            <div class="time-value">Execution Time: ${performance.time.toFixed(4)} ms</div>
        </div>
    `;
}

function displayComparison(loopPerf, formulaPerf, n) {
    const resultsDiv = document.getElementById('results');
    const fasterMethod = loopPerf.time < formulaPerf.time ? 'loop' : 'formula';
    const maxTime = Math.max(loopPerf.time, formulaPerf.time);
    const loopBarWidth = (loopPerf.time / maxTime) * 100;
    const formulaBarWidth = (formulaPerf.time / maxTime) * 100;

    // Avoid division by zero
    let speedDifference = '∞';
    if (formulaPerf.time > 0) {
        speedDifference = (loopPerf.time / formulaPerf.time).toFixed(2);
    }

    resultsDiv.innerHTML = `
        <div class="result-card result-loop ${fasterMethod === 'loop' ? 'winner' : ''}">
            <div class="method-title">For Loop Method</div>
            <div class="result-value">Sum: ${loopPerf.result.toLocaleString()}</div>
            <div class="time-value">Time: ${loopPerf.time.toFixed(4)} ms</div>
            <div class="performance-bar">
                <div class="performance-fill" style="width: ${loopBarWidth}%; background: linear-gradient(90deg, #ff6b6b, #ee5a24);"></div>
            </div>
        </div>

        <div class="result-card result-formula ${fasterMethod === 'formula' ? 'winner' : ''}">
            <div class="method-title">Formula Method</div>
            <div class="result-value">Sum: ${formulaPerf.result.toLocaleString()}</div>
            <div class="time-value">Time: ${formulaPerf.time.toFixed(4)} ms</div>
            <div class="performance-bar">
                <div class="performance-fill" style="width: ${formulaBarWidth}%;"></div>
            </div>
        </div>

        <div class="result-card result-comparison">
            <div class="method-title">Performance Analysis</div>
            <div style="margin-top: 15px;">
                <strong>Input (n):</strong> ${n.toLocaleString()}<br>
                <strong>Formula is ${speedDifference}x faster</strong><br>
                <strong>Time Difference:</strong> ${Math.abs(loopPerf.time - formulaPerf.time).toFixed(4)} ms<br>
                <strong>Both methods produce the same result:</strong> ${loopPerf.result === formulaPerf.result ? 'Yes ✓' : 'No ✗'}
            </div>
        </div>
    `;
}

// Allow Enter key
document.getElementById('numberInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') comparePerformance();
});

// Clear error on input
document.getElementById('numberInput').addEventListener('input', function () {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv.textContent) {
        errorDiv.textContent = '';
        this.style.borderColor = '#e0e0e0';
    }
});
