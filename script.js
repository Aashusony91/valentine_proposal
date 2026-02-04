const noPhrases = [
    "No? 🥺",
    "Are you sure? 💔",
    "Think again! 🌹",
    "Really? 😭",
    "You're breaking my heart...",
    "I'll be very sad...",
    "Pretty please? ✨",
    "Just say Yes! 🥰"
];

const reasons = [
    "Your smile lights up my entire world ✨",
    "The way you laugh makes my heart skip a beat 💓",
    "You make even the ordinary moments feel magical 🌟",
    "Your kindness inspires me every day 🌸",
    "I can be my true self around you 💝",
    "Every moment with you feels like a dream 💫"
];

const quizQuestions = [
    {
        question: "What's the best thing about us? 💕",
        options: ["Everything!", "Our chemistry", "The way we laugh together", "All of the above 💖"],
        correct: 3
    },
    {
        question: "How would you describe our story? 🌹",
        options: ["A beautiful fairytale", "The best adventure", "A love like no other", "Perfect in every way"],
        correct: 2
    },
    {
        question: "What do you think awaits you next? 🎁",
        options: ["A surprise!", "Something special", "The biggest question ever", "All of the above!"],
        correct: 3
    }
];

let noCount = 0;
let yesScale = 1;
let currentQuiz = 0;
let userName = "";

// Initialize background hearts
function initBackground() {
    const bg = document.getElementById('background-hearts');
    for (let i = 0; i < 20; i++) {
        createBackgroundHeart();
    }
}

function createBackgroundHeart() {
    const bg = document.getElementById('background-hearts');
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    bg.appendChild(heart);

    heart.addEventListener('animationiteration', () => {
        heart.style.left = Math.random() * 100 + 'vw';
    });
}

// Page 1: Start and go to Reasons
function startProposal() {
    const nameInput = document.getElementById("name");
    userName = nameInput.value.trim();
    if (userName) {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("reasonsPage").style.display = "block";
        showReasons();
    } else {
        nameInput.placeholder = "Please enter your name first!";
        nameInput.style.borderColor = "var(--red)";
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        startProposal();
    }
}

// Page 2: Show Reasons with typing effect
function showReasons() {
    const list = document.getElementById("reasonsList");
    list.innerHTML = "";

    reasons.forEach((reason, index) => {
        setTimeout(() => {
            const item = document.createElement("p");
            item.className = "reason-item";
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.innerText = reason;
            list.appendChild(item);

            setTimeout(() => {
                item.style.transition = "all 0.5s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, 100);
        }, index * 800);
    });
}

// Page 3: Quiz
function showQuiz() {
    document.getElementById("reasonsPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const quiz = quizQuestions[currentQuiz];
    document.getElementById("quizQuestion").innerText = quiz.question;

    const optionsDiv = document.getElementById("quizOptions");
    optionsDiv.innerHTML = "";

    quiz.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerText = option;
        btn.onclick = () => handleQuizAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function handleQuizAnswer(selected) {
    const quiz = quizQuestions[currentQuiz];
    const buttons = document.querySelectorAll(".quiz-option");

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === quiz.correct) {
            btn.style.background = "var(--green)";
            btn.style.transform = "scale(1.05)";
        } else if (index === selected && selected !== quiz.correct) {
            btn.style.background = "var(--red)";
        }
    });

    setTimeout(() => {
        currentQuiz++;
        if (currentQuiz < quizQuestions.length) {
            displayQuizQuestion();
        } else {
            showProposal();
        }
    }, 1500);
}

// Page 4: The Proposal
function showProposal() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("question").style.display = "block";

    const questionText = document.getElementById("proposalQuestion");
    questionText.innerHTML = `
        <span style="font-size: 1rem; display: block; margin-bottom: 1rem; color: var(--secondary);">
            ${userName}, you've proven how special you are...
        </span>
        In a world full of people, my eyes always search for you.<br><br>
        <strong style="font-size: 1.8rem;">Will you be my Valentine? 💕</strong>
    `;
}

function moveNoButton() {
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");

    noButton.innerText = noPhrases[Math.min(noCount, noPhrases.length - 1)];
    noCount++;

    yesScale += 0.15;
    yesButton.style.transform = `scale(${yesScale})`;

    // Move button after a few attempts
    if (noCount >= 3) {
        // Calculate safe bounds for mobile
        const padding = 60;
        const maxX = Math.max(padding, window.innerWidth - noButton.offsetWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - noButton.offsetHeight - padding);

        const randomX = padding + Math.random() * (maxX - padding);
        const randomY = padding + Math.random() * (maxY - padding);

        noButton.style.position = 'fixed';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        noButton.style.zIndex = '9999';
    }
}

// Handle touch events for mobile
function handleNoTouch(e) {
    e.preventDefault();
    moveNoButton();
}


function handleNoClick() {
    const questionText = document.getElementById("proposalQuestion");
    const noButton = document.getElementById("noButton");

    questionText.innerHTML = "Wait! You clicked No? 😱<br><span style='font-size: 1.2rem; color: var(--secondary);'>I won't take that for an answer. Let's try again!</span>";

    yesScale += 0.5;
    document.getElementById("yesButton").style.transform = `scale(${yesScale})`;

    noButton.style.opacity = "0";
    noButton.style.pointerEvents = "none";

    setTimeout(() => {
        noButton.style.opacity = "1";
        noButton.style.pointerEvents = "auto";
        questionText.innerHTML = `Please, I'm literally begging you... <br>Will you be mine, ${userName}? 💕`;
    }, 2000);
}

// Page 5: Celebration
function showMessage() {
    document.getElementById("question").style.display = "none";
    document.getElementById("celebrationPage").style.display = "block";

    const content = document.getElementById("celebrationContent");
    content.innerHTML = `
        <h1 style="font-family: 'Pacifico', cursive; font-size: 2.5rem; color: var(--secondary); margin-bottom: 1rem;">
            YES! 🎉💕
        </h1>
        <p style="font-size: 1.5rem; margin-bottom: 1rem;">
            My heart is yours forever, ${userName}!
        </p>
        <p style="font-size: 1.2rem; color: var(--secondary);">
            You've made this the best day of my life ❤️
        </p>
        <p style="margin-top: 2rem; font-style: italic;">
            Thank you for saying yes. I promise to cherish every moment with you. 💖
        </p>
    `;

    // Ultimate celebration explosion
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            generateExplosion();
        }, i * 400);
    }
}

function generateExplosion() {
    const symbols = ['❤️', '✨', '💖', '🌸', '💘', '💕', '🎉', '💗'];
    for (let i = 0; i < 30; i++) {
        const item = document.createElement('span');
        const isHeart = Math.random() > 0.4;
        item.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        item.classList.add(isHeart ? 'heart' : 'sparkle');

        const tx = (Math.random() - 0.5) * 800;
        const ty = (Math.random() - 0.5) * 800;

        item.style.setProperty('--tx', `${tx}px`);
        item.style.setProperty('--ty', `${ty}px`);
        item.style.left = '50%';
        item.style.top = '50%';

        document.body.appendChild(item);
        setTimeout(() => item.remove(), 2500);
    }
}

// Start background effect
window.onload = initBackground;
