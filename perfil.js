const profiles = [
    {
        username: "@Maria_Eduarda_5B",
        avatar: "👧",
        bio: "Aluna do 5º B. Adoro gatos e Minecraft! 🐱⛏️",
        friends: 145,
        joined: "2021",
        post: "Alguém estudou pra prova de matemática amanhã?",
        type: "real",
        explanation: "✅ REAL! Foto compatível, bio pessoal, número normal de amigos e postagem sobre a rotina escolar."
    },
    {
        username: "@FreeFire_Gems_999",
        avatar: "💎",
        bio: "GERADOR DE DIAMANTES GRÁTIS!!! CLIQUE NO LINK!!!",
        friends: 5,
        joined: "Ontem",
        post: "GANHE 10000 DIAMANTES AGORA! ACESSE: www.golpe.com",
        type: "fake",
        explanation: "🤖 FAKE! Nome genérico, bio prometendo coisas grátis, conta muito nova e poucos amigos. É golpe!"
    },
    {
        username: "@Tia_Joana_Salgados",
        avatar: "🥟",
        bio: "As melhores coxinhas da cidade. Encomendas por DM.",
        friends: 3400,
        joined: "2019",
        post: "Fornada de empadinhas saindo agora! Hummm 😋",
        type: "real",
        explanation: "✅ REAL! Parece ser um perfil comercial legítimo de uma pequena empresa local."
    },
    {
        username: "@Suporte_Oficial_Insta",
        avatar: "⚠️",
        bio: "Sua conta será bloqueada. Envie sua senha para verificar.",
        friends: 0,
        joined: "Hoje",
        post: "URGENTE: Confirme seus dados ou perca sua conta.",
        type: "fake",
        explanation: "🤖 FAKE! Redes sociais NUNCA pedem senha por mensagem ou perfil. Contas oficiais têm selo de verificação."
    },
    {
        username: "@PedroH_Gamer",
        avatar: "🎮",
        bio: "Jogando Fortnite 24h. Segue de volta!",
        friends: 89,
        joined: "2022",
        post: "Consegui a vitória real hoje! Foi difícil.",
        type: "real",
        explanation: "✅ REAL! Comportamento normal de um jovem gamer compartilhando suas conquistas."
    }
];

let currentProfileIndex = 0;
let score = 0;
let isAnswered = false;

const avatar = document.getElementById('avatar');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const friendsCount = document.getElementById('friends-count');
const joinDate = document.getElementById('join-date');
const lastPost = document.getElementById('last-post');

const feedbackArea = document.getElementById('feedback');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score');
const btnReal = document.getElementById('btn-real');
const btnFake = document.getElementById('btn-fake');
const btnNext = document.getElementById('btn-next');
const gameArea = document.getElementById('game-area');

function loadProfile() {
    const profile = profiles[currentProfileIndex];
    
    avatar.textContent = profile.avatar;
    username.textContent = profile.username;
    bio.textContent = profile.bio;
    friendsCount.textContent = profile.friends;
    joinDate.textContent = profile.joined;
    lastPost.textContent = profile.post;
    
    // Resetar
    feedbackArea.classList.add('hidden');
    btnReal.disabled = false;
    btnFake.disabled = false;
    btnReal.style.opacity = "1";
    btnFake.style.opacity = "1";
    isAnswered = false;
}

function checkAnswer(userChoice) {
    if (isAnswered) return;
    isAnswered = true;

    const profile = profiles[currentProfileIndex];
    const isCorrect = userChoice === profile.type;

    feedbackArea.classList.remove('hidden');
    
    if (isCorrect) {
        score++;
        feedbackTitle.textContent = "🎉 Acertou!";
        feedbackTitle.style.color = "var(--success-color)";
    } else {
        feedbackTitle.textContent = "❌ Errou...";
        feedbackTitle.style.color = "var(--danger-color)";
    }

    scoreDisplay.textContent = score;
    feedbackMessage.textContent = profile.explanation;

    btnReal.disabled = true;
    btnFake.disabled = true;
    if (userChoice === 'real') btnFake.style.opacity = "0.5";
    else btnReal.style.opacity = "0.5";
}

function nextProfile() {
    currentProfileIndex++;
    if (currentProfileIndex < profiles.length) {
        loadProfile();
    } else {
        finishGame();
    }
}

function finishGame() {
    gameArea.innerHTML = `
        <div class="card" style="text-align: center;">
            <h2>🕵️ Fim da Investigação!</h2>
            <p>Você identificou corretamente:</p>
            <h1 style="font-size: 4rem; color: var(--primary-color); margin: 20px 0;">${score} / ${profiles.length}</h1>
            <p>Perfis</p>
            <button onclick="location.reload()" class="btn btn-next">Jogar Novamente</button>
            <button onclick="window.location.href='index.html'" class="btn btn-secondary" style="margin-top: 10px;">Voltar ao Menu</button>
        </div>
    `;
}

btnReal.addEventListener('click', () => checkAnswer('real'));
btnFake.addEventListener('click', () => checkAnswer('fake'));
btnNext.addEventListener('click', nextProfile);

loadProfile();
