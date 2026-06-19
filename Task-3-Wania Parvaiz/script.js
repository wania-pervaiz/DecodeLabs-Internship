const cards = document.querySelectorAll('.color-card');
const generateBtn = document.getElementById('generate-btn');

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

function refreshPalette() {
    cards.forEach(card => {
        if (!card.classList.contains('locked')) {
            const newColor = getRandomColor();
            const preview = card.querySelector('.color-preview');
            
            preview.style.backgroundColor = newColor;
            card.querySelector('.color-name').innerText = "Shade " + newColor.slice(1, 4);
            
            const hexSpan = card.querySelector('.hex-text');
            hexSpan.innerText = newColor;
            hexSpan.setAttribute('data-hex', newColor);
        }
    });
}

cards.forEach(card => {
    const lockBtn = card.querySelector('.lock-btn');
    const hexBox = card.querySelector('.hex-box');
    const hexSpan = card.querySelector('.hex-text');

    lockBtn.addEventListener('click', () => {
        card.classList.toggle('locked');
        lockBtn.innerText = card.classList.contains('locked') ? '🔒 LOCKED' : '🔓 UNLOCK';
    });

    hexBox.addEventListener('click', () => {
        const hex = hexSpan.getAttribute('data-hex');
        navigator.clipboard.writeText(hex);
        const originalText = hexSpan.innerText;
        hexSpan.innerText = 'COPIED!';
        setTimeout(() => { hexSpan.innerText = originalText; }, 1000);
    });
});

generateBtn.addEventListener('click', refreshPalette);
document.body.addEventListener('keyup', (e) => { if(e.code === 'Space') refreshPalette(); });

// Initialize palette on load
refreshPalette();