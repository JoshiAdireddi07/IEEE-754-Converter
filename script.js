// Global state
let currentPrecision = 32;
let currentTheme = 'purple';

// Theme configurations
const themes = {
    purple: {
        bgPrimary: '#1a1625',
        bgSecondary: '#221832',
        bgCard: '#2d1b3d',
        bgCardHover: '#3d2550',
        borderColor: '#9b7ab8',
        borderAccent: '#c9a3d8',
        textPrimary: '#e8d4f0',
        textSecondary: '#d4b5e0',
        textMuted: '#b8a4c4',
        accentPrimary: '#c9a3d8',
        accentGradientStart: '#9b7ab8',
        accentGradientEnd: '#b899cc',
        componentSign: '#e8b4d4',
        componentExponent: '#c9a3d8',
        componentMantissa: '#b899cc'
    },
    pink: {
        bgPrimary: '#ffffff',
        bgSecondary: '#fff5f7',
        bgCard: '#ffffff',
        bgCardHover: '#ffe4e9',
        borderColor: '#ffc0cb',
        borderAccent: '#ffb3c1',
        textPrimary: '#333333',
        textSecondary: '#ffb3c1',
        textMuted: '#666666',
        accentPrimary: '#ffb3c1',
        accentGradientStart: '#ffc0cb',
        accentGradientEnd: '#ffb3c1',
        componentSign: '#ffb3c1',
        componentExponent: '#ffc0cb',
        componentMantissa: '#ffadc2'
    },
    blue: {
        bgPrimary: '#0f172a',
        bgSecondary: '#1e293b',
        bgCard: '#1e3a5f',
        bgCardHover: '#2d4a6f',
        borderColor: '#60a5fa',
        borderAccent: '#93c5fd',
        textPrimary: '#e0f2fe',
        textSecondary: '#bae6fd',
        textMuted: '#94a3b8',
        accentPrimary: '#93c5fd',
        accentGradientStart: '#60a5fa',
        accentGradientEnd: '#93c5fd',
        componentSign: '#bae6fd',
        componentExponent: '#93c5fd',
        componentMantissa: '#60a5fa'
    },
    dark: {
        bgPrimary: '#0a0a0a',
        bgSecondary: '#1a1a1a',
        bgCard: '#2a2a2a',
        bgCardHover: '#3a3a3a',
        borderColor: '#6b7280',
        borderAccent: '#9ca3af',
        textPrimary: '#f9fafb',
        textSecondary: '#d1d5db',
        textMuted: '#9ca3af',
        accentPrimary: '#9ca3af',
        accentGradientStart: '#6b7280',
        accentGradientEnd: '#9ca3af',
        componentSign: '#d1d5db',
        componentExponent: '#9ca3af',
        componentMantissa: '#6b7280'
    }
};

// Change theme function
function changeTheme(theme) {
    currentTheme = theme;
    const colors = themes[theme];
    const root = document.documentElement;
    
    // Apply theme colors
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--bg-card', colors.bgCard);
    root.style.setProperty('--bg-card-hover', colors.bgCardHover);
    root.style.setProperty('--border-color', colors.borderColor);
    root.style.setProperty('--border-accent', colors.borderAccent);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--accent-primary', colors.accentPrimary);
    root.style.setProperty('--accent-gradient-start', colors.accentGradientStart);
    root.style.setProperty('--accent-gradient-end', colors.accentGradientEnd);
    root.style.setProperty('--component-sign', colors.componentSign);
    root.style.setProperty('--component-exponent', colors.componentExponent);
    root.style.setProperty('--component-mantissa', colors.componentMantissa);
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Save theme preference
    localStorage.setItem('ieee754-theme', theme);
    
    // Re-convert to update colors
    convertDecimalToBinary();
    convertBinaryToDecimal();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('ieee754-theme') || 'purple';
    changeTheme(savedTheme);
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach((btn, index) => {
        const themeNames = ['purple', 'pink', 'blue', 'dark'];
        if (themeNames[index] === savedTheme) {
            btn.classList.add('active');
        }
    });
    
    // Set initial values
    convertDecimalToBinary();
    convertBinaryToDecimal();
    
    // Add event listeners with proper binding
    const decimalInput = document.getElementById('decimalInput');
    const binaryInput = document.getElementById('binaryInput');
    const precisionSelect = document.getElementById('precisionSelect');
    const precisionSelectBin = document.getElementById('precisionSelectBin');
    
    if (decimalInput) {
        decimalInput.addEventListener('input', function() {
            convertDecimalToBinary();
        });
        decimalInput.addEventListener('keyup', function() {
            convertDecimalToBinary();
        });
        decimalInput.addEventListener('change', function() {
            convertDecimalToBinary();
        });
    }
    
    if (binaryInput) {
        binaryInput.addEventListener('input', function() {
            convertBinaryToDecimal();
        });
        binaryInput.addEventListener('keyup', function() {
            convertBinaryToDecimal();
        });
        binaryInput.addEventListener('change', function() {
            convertBinaryToDecimal();
        });
    }
    
    if (precisionSelect) {
        precisionSelect.addEventListener('change', function() {
            currentPrecision = parseInt(this.value);
            if (precisionSelectBin) {
                precisionSelectBin.value = this.value;
            }
            convertDecimalToBinary();
        });
    }
    
    if (precisionSelectBin) {
        precisionSelectBin.addEventListener('change', function() {
            currentPrecision = parseInt(this.value);
            if (precisionSelect) {
                precisionSelect.value = this.value;
            }
            convertBinaryToDecimal();
        });
    }
});

// Scroll to converter section
function scrollToConverter() {
    document.getElementById('converter').scrollIntoView({ behavior: 'smooth' });
}

// Set example value
function setExample(value) {
    const decimalInput = document.getElementById('decimalInput');
    if (decimalInput) {
        decimalInput.value = value;
        convertDecimalToBinary();
    }
    
    // Scroll to converter
    scrollToConverter();
}

// Toggle step-by-step display
function toggleSteps(id) {
    const steps = document.getElementById(id);
    if (steps) {
        if (steps.style.display === 'none') {
            steps.style.display = 'block';
        } else {
            steps.style.display = 'none';
        }
    }
}

// Convert Decimal to Binary (IEEE 754)
function convertDecimalToBinary() {
    const input = document.getElementById('decimalInput').value.trim();
    
    if (!input) {
        // Don't update if empty
        return;
    }
    
    let value;
    if (input.toLowerCase() === 'nan') {
        value = NaN;
    } else if (input.toLowerCase() === 'infinity' || input === 'Infinity') {
        value = Infinity;
    } else if (input.toLowerCase() === '-infinity' || input === '-Infinity') {
        value = -Infinity;
    } else {
        value = parseFloat(input);
    }
    
    if (isNaN(value) && input.toLowerCase() !== 'nan') {
        // Invalid input, don't update
        return;
    }
    
    // Create buffer and view
    const buffer = currentPrecision === 32 ? new ArrayBuffer(4) : new ArrayBuffer(8);
    const view = new DataView(buffer);
    
    if (currentPrecision === 32) {
        view.setFloat32(0, value, false);
    } else {
        view.setFloat64(0, value, false);
    }
    
    // Get binary representation
    let binary = '';
    const numBytes = currentPrecision / 8;
    for (let i = 0; i < numBytes; i++) {
        const byte = view.getUint8(i);
        binary += byte.toString(2).padStart(8, '0');
    }
    
    // Parse components
    const signBit = binary[0];
    const expBits = currentPrecision === 32 ? binary.slice(1, 9) : binary.slice(1, 12);
    const mantissaBits = currentPrecision === 32 ? binary.slice(9) : binary.slice(12);
    
    // Display binary with color coding based on current theme
    const colors = themes[currentTheme];
    const coloredBinary = `<span style="color: ${colors.componentSign};">${signBit}</span><span style="color: ${colors.componentExponent};">${expBits}</span><span style="color: ${colors.componentMantissa};">${mantissaBits}</span>`;
    
    const binaryOutput = document.getElementById('binaryOutput');
    if (binaryOutput) {
        binaryOutput.innerHTML = coloredBinary;
    }
    
    // Display components
    const signBitEl = document.getElementById('signBit');
    const exponentBitsEl = document.getElementById('exponentBits');
    const mantissaBitsEl = document.getElementById('mantissaBits');
    
    if (signBitEl) signBitEl.textContent = signBit;
    if (exponentBitsEl) exponentBitsEl.textContent = expBits;
    if (mantissaBitsEl) mantissaBitsEl.textContent = mantissaBits;
    
    // Animate components
    animateComponent('signBit', 'sign');
    animateComponent('exponentBits', 'exponent');
    animateComponent('mantissaBits', 'mantissa');
    
    // Update step-by-step
    updateDecimalSteps(value, signBit, expBits, mantissaBits);
}

// Convert Binary to Decimal
function convertBinaryToDecimal() {
    const input = document.getElementById('binaryInput').value.trim();
    
    if (!input) {
        // Don't update if empty
        return;
    }
    
    if (!/^[01]+$/.test(input)) {
        // Invalid binary input
        return;
    }
    
    if (input.length !== currentPrecision) {
        // Wrong length
        return;
    }
    
    // Create buffer and view
    const buffer = currentPrecision === 32 ? new ArrayBuffer(4) : new ArrayBuffer(8);
    const view = new DataView(buffer);
    const numBytes = currentPrecision / 8;
    
    for (let i = 0; i < numBytes; i++) {
        const byte = parseInt(input.substr(i * 8, 8), 2);
        view.setUint8(i, byte);
    }
    
    const value = currentPrecision === 32 ? view.getFloat32(0, false) : view.getFloat64(0, false);
    
    // Display decimal
    const decimalOutput = document.getElementById('decimalOutput');
    if (decimalOutput) {
        decimalOutput.textContent = value;
    }
    
    // Parse components
    const signBit = input[0];
    const expBits = currentPrecision === 32 ? input.slice(1, 9) : input.slice(1, 12);
    const mantissaBits = currentPrecision === 32 ? input.slice(9) : input.slice(12);
    
    const expDecimal = parseInt(expBits, 2);
    const bias = currentPrecision === 32 ? 127 : 1023;
    const actualExp = expDecimal - bias;
    
    // Display components
    const signBitDecEl = document.getElementById('signBitDec');
    const exponentBitsDecEl = document.getElementById('exponentBitsDec');
    const mantissaBitsDecEl = document.getElementById('mantissaBitsDec');
    
    if (signBitDecEl) {
        signBitDecEl.textContent = `${signBit} (${signBit === '0' ? 'Positive' : 'Negative'})`;
    }
    
    if (exponentBitsDecEl) {
        exponentBitsDecEl.textContent = `${expBits} = ${expDecimal} (Biased) → ${actualExp} (actual)`;
    }
    
    // Calculate mantissa value
    let mantissaValue = 1.0;
    for (let i = 0; i < mantissaBits.length; i++) {
        if (mantissaBits[i] === '1') {
            mantissaValue += Math.pow(2, -(i + 1));
        }
    }
    
    if (mantissaBitsDecEl) {
        mantissaBitsDecEl.textContent = `${mantissaBits} → ${mantissaValue.toFixed(11)}`;
    }
    
    // Animate components
    animateComponent('signBitDec', 'sign');
    animateComponent('exponentBitsDec', 'exponent');
    animateComponent('mantissaBitsDec', 'mantissa');
    
    // Update step-by-step
    updateBinarySteps(signBit, expBits, mantissaBits, expDecimal, bias, actualExp, mantissaValue, value);
}

// Animate component
function animateComponent(elementId, type) {
    const element = document.getElementById(elementId);
    if (element) {
        const className = `highlight-${type}`;
        element.classList.add(className);
        setTimeout(() => element.classList.remove(className), 1000);
    }
}

// Update decimal to binary steps
function updateDecimalSteps(value, signBit, expBits, mantissaBits) {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    
    let intPart, fracPart;
    if (isFinite(value) && value !== 0) {
        intPart = Math.floor(absValue);
        fracPart = absValue - intPart;
    } else {
        intPart = 0;
        fracPart = 0;
    }
    
    const bias = currentPrecision === 32 ? 127 : 1023;
    const expDecimal = parseInt(expBits, 2);
    const actualExp = expDecimal - bias;
    
    // Convert fractional part to binary string
    let fracBinary = '';
    let tempFrac = fracPart;
    for (let i = 0; i < 10 && tempFrac > 0; i++) {
        tempFrac *= 2;
        if (tempFrac >= 1) {
            fracBinary += '1';
            tempFrac -= 1;
        } else {
            fracBinary += '0';
        }
    }
    
    const stepsHtml = `
        <div class="step-item">
            <strong>1. Sign Bit</strong>
            <code>${isNegative ? 'Negative' : 'Positive'} number → Sign bit = ${signBit}</code>
        </div>
        <div class="step-item">
            <strong>2. Integer Part to Binary</strong>
            <code>${intPart} (decimal) = ${intPart.toString(2)} (binary)</code>
        </div>
        <div class="step-item">
            <strong>3. Fractional Part to Binary</strong>
            <code>${fracPart.toFixed(6)} (decimal) ≈ 0.${fracBinary || '0'} (binary)</code>
        </div>
        <div class="step-item">
            <strong>4. Normalize</strong>
            <code>1.${mantissaBits.substring(0, 10)}... × 2^${actualExp}</code>
        </div>
        <div class="step-item">
            <strong>5. Biased Exponent</strong>
            <code>${actualExp} + ${bias} (bias) = ${expDecimal} = ${expBits} (binary)</code>
        </div>
        <div class="step-item">
            <strong>6. Mantissa (fraction)</strong>
            <code>${mantissaBits} (${mantissaBits.length} bits)</code>
        </div>
        <div class="step-item">
            <strong>7. Final IEEE 754 Representation</strong>
            <code>${signBit} | ${expBits} | ${mantissaBits}</code>
        </div>
    `;
    
    const decSteps = document.getElementById('decSteps');
    if (decSteps) {
        decSteps.innerHTML = stepsHtml;
    }
}

// Update binary to decimal steps
function updateBinarySteps(signBit, expBits, mantissaBits, expDecimal, bias, actualExp, mantissaValue, finalValue) {
    const stepsHtml = `
        <div class="step-item">
            <strong>1. Extract Sign Bit</strong>
            <code>${signBit} → ${signBit === '0' ? 'Positive' : 'Negative'}</code>
        </div>
        <div class="step-item">
            <strong>2. Extract Exponent</strong>
            <code>${expBits} (binary) = ${expDecimal} (decimal)</code>
        </div>
        <div class="step-item">
            <strong>3. Calculate Actual Exponent</strong>
            <code>${expDecimal} - ${bias} (bias) = ${actualExp}</code>
        </div>
        <div class="step-item">
            <strong>4. Calculate Mantissa Value</strong>
            <code>1.${mantissaBits} (binary) = ${mantissaValue.toFixed(11)} (decimal)</code>
        </div>
        <div class="step-item">
            <strong>5. Calculate Final Value</strong>
            <code>${signBit === '0' ? '1' : '-1'} × ${mantissaValue.toFixed(11)} × 2^${actualExp} = ${finalValue}</code>
        </div>
    `;
    
    const binSteps = document.getElementById('binSteps');
    if (binSteps) {
        binSteps.innerHTML = stepsHtml;
    }
}

// Copy binary to clipboard
function copyBinary() {
    const element = document.getElementById('binaryOutput');
    if (element) {
        const text = element.textContent || element.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback('binaryOutput');
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
}

// Copy decimal to clipboard
function copyDecimal() {
    const element = document.getElementById('decimalOutput');
    if (element) {
        const text = element.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback('decimalOutput');
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
}

// Show copy feedback
function showCopyFeedback(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const originalBorder = element.style.border;
        element.style.border = '2px solid #c9a3d8';
        
        setTimeout(() => {
            element.style.border = originalBorder;
        }, 1000);
    }
}
