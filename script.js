const scenarios = [
    {
        id: 1,
        title: "🎁 O Prêmio Irresistível",
        content: "PARABÉNS! Você é o visitante número 1.000.000! Clique AQUI para resgatar seu iPhone 15 GRÁTIS agora mesmo!",
        type: "suspect",
        explanation: "🚨 GOLPE! Ninguém dá prêmios caros de graça assim. Ao clicar, você pode instalar vírus ou ter seus dados roubados."
    },
    {
        id: 2,
        title: "🍫 Notícia Milagrosa",
        content: "Cientistas confirmam: Comer chocolate antes de dormir faz você tirar 10 na prova! Compartilhe com 5 amigos para dar sorte.",
        type: "suspect",
        explanation: "🤥 FAKE NEWS! Cuidado com notícias que prometem milagres e pedem para compartilhar. Sempre verifique a fonte!"
    },
    {
        id: 3,
        title: "🏫 Comunicado da Escola",
        content: "Atenção alunos: A gincana escolar será na próxima sexta-feira. Tragam garrafas de água e protetor solar. (Fonte: Site Oficial da Escola)",
        type: "trust",
        explanation: "✅ SEGURO! A mensagem é informativa, clara e vem de uma fonte oficial (a escola)."
    },
    {
        id: 4,
        title: "🎮 Pedido de Amigo?",
        content: "Oi! Aqui é o Pedro da sua sala. Esqueci minha senha do Roblox. Me passa a sua rapidinho? Devolvo amanhã.",
        type: "suspect",
        explanation: "🛑 PERIGO! Jamais compartilhe senhas, nem com amigos. A conta do 'Pedro' pode ter sido invadida por um estranho."
    },
    {
        id: 5,
        title: "📸 Foto Engraçada",
        content: "Postagem de um colega: 'Olha a cara dele dormindo na aula! Kkkkkk' (Foto tirada escondida)",
        type: "suspect",
        explanation: "🚫 CYBERBULLYING! Postar fotos de alguém sem permissão para zombar é errado e machuca. Não curta e não compartilhe."
    },
    {
        id: 6,
        title: "🔒 Atualização de Segurança",
        content: "Sistema: Sua senha foi alterada com sucesso. Se não foi você, entre em contato com o suporte oficial imediatamente.",
        type: "trust",
        explanation: "✅ SEGURO! Alertas de segurança oficiais são importantes. Mas sempre verifique se o remetente é verdadeiro antes de clicar."
    }
];

let currentScenarioIndex = 0;
let score = 0;
let isAnswered = false;

// Elementos do DOM
const cardTitle = document.getElementById('card-title');
const cardContent = document.getElementById('card-content');
const feedbackArea = document.getElementById('feedback');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score');
const btnTrust = document.getElementById('btn-trust');
const btnSuspect = document.getElementById('btn-suspect');
const btnNext = document.getElementById('btn-next');
const gameArea = document.getElementById('game-area');

// Sons (opcional, simulado visualmente por enquanto)

function loadScenario() {
    const scenario = scenarios[currentScenarioIndex];
    cardTitle.textContent = scenario.title;
    cardContent.textContent = scenario.content;
    
    // Resetar estado visual
    feedbackArea.classList.add('hidden');
    btnTrust.disabled = false;
    btnSuspect.disabled = false;
    btnTrust.style.opacity = "1";
    btnSuspect.style.opacity = "1";
    isAnswered = false;
}

function checkAnswer(userChoice) {
    if (isAnswered) return;
    isAnswered = true;

    const scenario = scenarios[currentScenarioIndex];
    const isCorrect = userChoice === scenario.type;

    feedbackArea.classList.remove('hidden');
    
    if (isCorrect) {
        score += 10;
        feedbackTitle.textContent = "🎉 Muito bem! Você acertou!";
        feedbackTitle.style.color = "var(--success-color)";
        playSound('correct');
    } else {
        feedbackTitle.textContent = "❌ Ops! Cuidado...";
        feedbackTitle.style.color = "var(--danger-color)";
        playSound('wrong');
    }

    scoreDisplay.textContent = score;
    feedbackMessage.textContent = scenario.explanation;

    // Desabilitar botões temporariamente
    btnTrust.disabled = true;
    btnSuspect.disabled = true;
    if (userChoice === 'trust') btnSuspect.style.opacity = "0.5";
    else btnTrust.style.opacity = "0.5";
}

function nextScenario() {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        loadScenario();
    } else {
        finishGame();
    }
}

function finishGame() {
    gameArea.innerHTML = `
        <div class="card" style="text-align: center;">
            <h2>🏆 Missão Cumprida!</h2>
            <p>Você completou o treinamento de Detetive Digital.</p>
            <h1 style="font-size: 4rem; color: var(--primary-color); margin: 20px 0;">${score} pts</h1>
            <p>Continue atento na internet!</p>
            <button onclick="location.reload()" class="btn btn-next">Jogar Novamente</button>
        </div>
    `;
}

function playSound(type) {
    // Espaço reservado para efeitos sonoros futuros
    console.log(`Som reproduzido: ${type}`);
}

// Event Listeners
btnTrust.addEventListener('click', () => checkAnswer('trust'));
btnSuspect.addEventListener('click', () => checkAnswer('suspect'));
btnNext.addEventListener('click', nextScenario);

// Iniciar o jogo
loadScenario();
