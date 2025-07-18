// main.js

// Elements
const container = document.querySelector('.container');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const prankStage = document.getElementById('prankStage');
const nameReveal = document.getElementById('nameReveal');
const errorScreen = document.getElementById('errorScreen');
const cameraCreep = document.getElementById('cameraCreep');
const capturedImage = document.getElementById('capturedImage');
const hackingText = document.getElementById('hackingText');
const credits = document.getElementById('credits');
const confettiCanvas = document.getElementById('confettiCanvas');

const fartSound = document.getElementById('fartSound');
const screamSound = document.getElementById('screamSound');
const burpSound = document.getElementById('burpSound');

// Confetti setup
const ctx = confettiCanvas.getContext('2d');
let confetti = [];
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * -confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    this.tilt = Math.random() * 10;
    this.tiltSpeed = Math.random() * 0.1 + 0.05;
  }
  update() {
    this.y += this.speed;
    this.tilt += this.tiltSpeed;
    if (this.y > confettiCanvas.height) {
      this.y = -this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.size / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt, this.y);
    ctx.lineTo(this.x - this.tilt, this.y + this.size);
    ctx.stroke();
  }
}

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) confetti.push(new Confetti());
  (function anim() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(c => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(anim);
  })();
}

// Typewriter effect
function typeWriter(text, element, speed = 70, callback) {
  let i = 0;
  (function type() {
    if (i < text.length) {
      element.textContent += text[i++];
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  })();
}

// Main prank sequence
startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) return alert('Please enter your name!');
  
  // Hide intro, show prank area
  container.classList.add('hidden');
  prankStage.classList.remove('hidden');
  
  // 0s: fart + shake
  fartSound.play();
  document.body.classList.add('shake');
  
  // 2s: reveal name
  setTimeout(() => {
    nameReveal.textContent = `You are ${name}!`;
    nameReveal.classList.add('overlay-message');
    burpSound.play();
  }, 2000);
  
  // 4s: camera prompt
  setTimeout(() => {
    document.body.classList.remove('shake');
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // capture first frame
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        return imageCapture.grabFrame()
          .then(bitmap => {
            // draw to canvas and show
            const cv = document.createElement('canvas');
            cv.width = bitmap.width;
            cv.height = bitmap.height;
            cv.getContext('2d').drawImage(bitmap, 0, 0);
            capturedImage.src = cv.toDataURL();
            track.stop();
          });
      })
      .catch(() => {
        // user denied or error
      })
      .finally(() => {
        cameraCreep.classList.remove('hidden');
        screamSound.play();
      });
  }, 4000);
  
  // 11s: error screen
  setTimeout(() => {
    cameraCreep.classList.add('hidden');
    errorScreen.classList.remove('hidden');
  }, 11000);
  
  // 14s: more sounds
  setTimeout(() => {
    errorScreen.classList.add('hidden');
    burpSound.play();
    screamSound.play();
  }, 14000);
  
  // 17s: hacking text
  setTimeout(() => {
    hackingText.classList.remove('hidden');
    typeWriter(
      'Hacking your phone...\nDownloading secrets...\nUploading embarrassing data...\n',
      hackingText,
      60
    );
  }, 17000);
  
  // 22s: invert colors
  setTimeout(() => {
    document.body.classList.add('invert');
  }, 22000);
  
  // 26s: explosion, blackout
  setTimeout(() => {
    burpSound.play();
    document.body.classList.remove('invert');
    document.body.style.background = '#000';
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 26000);
  
  // 28s: credits roll
  setTimeout(() => {
    credits.classList.remove('hidden');
  }, 28000);
  
  // 32s: confetti finale
  setTimeout(() => {
    startConfetti();
  }, 32000);
});
