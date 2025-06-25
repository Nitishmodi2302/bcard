// Play background music
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    music.volume = 0.3;
    
    // Chrome requires user interaction to play audio
    document.body.addEventListener('click', function() {
        music.play().catch(e => console.log("Audio play failed:", e));
    }, { once: true });
});

let candlesBlown = false;

function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    
    const flames = document.querySelectorAll('.flame');
    const message = document.querySelector('.message');
    const instruction = document.querySelector('.blow-instruction');
    const hint = document.querySelector('.click-hint');
    const blowButton = document.querySelector('.blow-button');

    // Remove instruction and hint
    instruction.style.display = 'none';
    hint.style.display = 'none';
    blowButton.style.display = 'none';
    
    // Add blowing sound effect
    const blowSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wind-whistling-1490.mp3');
    blowSound.volume = 0.5;
    blowSound.play();

    // Blow out each candle one by one
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.animation = 'none';
            flame.style.transform = 'scale(0)';
            flame.style.opacity = '0';
            createConfetti(flame);
        }, index * 300);
    });

    // After all candles are blown out
    setTimeout(() => {
        message.textContent = "Happy Birthday My Duniya! ❤";
        releaseBalloons();
        createConfettiBurst();
        
        // Play celebration sound
        const celebrationSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-pop-2059.mp3');
        celebrationSound.volume = 0.7;
        celebrationSound.play();
    }, flames.length * 300);
}

function releaseBalloons() {
    const colors = ['#ff7676', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDelay = Math.random() * 5 + 's';
            
            document.body.appendChild(balloon);
            
            // Make balloon visible
            setTimeout(() => {
                balloon.style.opacity = '0.7';
            }, 100);
        }, i * 200);
    }
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.setProperty('--color', `hsl(${Math.random() * 360}, 100%, 50%)`);
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        setTimeout(() => {
            confetti.style.opacity = '1';
            confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
            setTimeout(() => {
                confetti.style.opacity = '0';
                setTimeout(() => confetti.remove(), 1000);
            }, 1000);
        }, 10);
    }
}

function createConfettiBurst() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.setProperty('--color', `hsl(${Math.random() * 360}, 100%, 50%)`);
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * 100 + 'vh';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
                setTimeout(() => {
                    confetti.style.opacity = '0';
                    setTimeout(() => confetti.remove(), 1000);
                }, 2000);
            }, 10);
        }, i * 30);
    }
}