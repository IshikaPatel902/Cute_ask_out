const question = document.querySelector(".question");
const giff = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.getElementById("noBtn");
var audio = document.getElementById("music");
var playPauseButton = document.getElementById("playPauseButton");
var popup = document.getElementById("popup");
var popupText = document.getElementById("popupText");

let yesClickCount = 0;

const popupMessages = [
    "please pooki 🥺",
    "meow~ 🐱",
    "am i not pretty? 😿",
    "just say yes pooki 💕",
    "i'll be soo sad 🥹",
    "pwease? 🐾",
    "don't break my heart 💔",
    "nooo come back!! 😭",
    "i beg you 🙏✨",
    "ek baar toh bolo haaaan 🥺💗"
];

let msgIndex = 0;
let popupTimeout;

function noHover(e) {
    // Show popup with rotating messages
    clearTimeout(popupTimeout);
    popupText.textContent = popupMessages[msgIndex % popupMessages.length];
    msgIndex++;

    popup.style.left = e.clientX + "px";
    popup.style.top = (e.clientY - 60) + "px";
    popup.classList.add("show");

    popupTimeout = setTimeout(() => {
        popup.classList.remove("show");
    }, 1500);
}

function moveNoBtn(e) {
    // Move the button away from cursor randomly
    const btn = noBtn;
    const rect = btn.getBoundingClientRect();

    // Pick a random direction to flee
    const directions = [
        { x: 150, y: 0 },
        { x: -150, y: 0 },
        { x: 0, y: 120 },
        { x: 0, y: -120 },
        { x: 130, y: 100 },
        { x: -130, y: -100 },
        { x: 130, y: -100 },
        { x: -130, y: 100 },
    ];

    const dir = directions[Math.floor(Math.random() * directions.length)];
    let newLeft = rect.left + dir.x;
    let newTop = rect.top + dir.y;

    // Keep inside window
    const maxX = window.innerWidth - btn.offsetWidth - 10;
    const maxY = window.innerHeight - btn.offsetHeight - 10;
    newLeft = Math.max(10, Math.min(newLeft, maxX));
    newTop = Math.max(10, Math.min(newTop, maxY));

    btn.style.position = "fixed";
    btn.style.left = newLeft + "px";
    btn.style.top = newTop + "px";
    btn.style.margin = "0";
}

function yesClicked() {
    yesClickCount++;
    if (yesClickCount === 1) {
        question.innerHTML = "Yay!! See you soooon bb! 🎉💕";
        giff.src = "image/dance.gif";
        noBtn.style.display = "none";
        playPauseButton.style.display = "none";
        popup.classList.remove("show");
        launchHearts();
    } else if (yesClickCount === 2) {
        question.innerHTML = "Thank You!!!! 🥰🌸";
        giff.src = "image/gif2.gif";
        yesBtn.style.display = "none";
        launchHearts();
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseButton.src = "image/pause (1).png";
    } else {
        audio.pause();
        playPauseButton.src = "image/play.png";
    }
}

function launchHearts() {
    const container = document.getElementById("heartsContainer");
    const emojis = ["💖", "💕", "💗", "💓", "🌸", "✨", "💝", "🥰"];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("floating-heart");
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (Math.random() * 20 + 16) + "px";
            heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}
