const scenes = [
    {
        id: 1,
        icon: "📸",
        title: "A Foto Vergonhosa",
        description: "Seu melhor amigo tirou uma foto de um colega dormindo com a boca aberta na aula e te mandou. Ele quer postar no grupo da turma. O que você faz?",
        options: [
            {
                text: "😂 Rir e compartilhar no grupo",
                consequence: "bad",
                feedback: "⚠️ CUIDADO! Você ajudou a espalhar o bullying. O colega ficou muito triste e seus professores descobriram. Sua reputação caiu.",
                scoreChange: -30
            },
            {
                text: "🤐 Ignorar e não fazer nada",
                consequence: "neutral",
                feedback: "😐 Neutro. Você não espalhou, mas também não ajudou a impedir. O colega ainda pode ser zoado por outros.",
                scoreChange: -5
            },
            {
                text: "🛑 Avisar que não é legal postar",
                consequence: "good",
                feedback: "🏆 EXCELENTE! Você foi um verdadeiro amigo. Evitou uma confusão e protegeu a privacidade do colega.",
                scoreChange: 10
            }
        ]
    },
    {
        id: 2,
        icon: "🤬",
        title: "Comentário Maldoso",
        description: "Alguém comentou no seu vídeo do TikTok dizendo que você dança mal e é feio(a). Você ficou com muita raiva!",
        options: [
            {
                text: "😡 Xingar de volta com palavrões",
                consequence: "bad",
                feedback: "⚠️ NÃO REAJA ASSIM! Responder com ódio só gera mais ódio. Agora vocês dois estão errados e brigando em público.",
                scoreChange: -20
            },
            {
                text: "🚫 Bloquear e denunciar o comentário",
                consequence: "good",
                feedback: "✅ PERFEITO! Não dê palco para 'haters'. Bloquear e denunciar é a forma mais madura de lidar com isso.",
                scoreChange: 10
            },
            {
                text: "😢 Apagar o vídeo e chorar",
                consequence: "neutral",
                feedback: "😕 Não desista! Apagar o vídeo resolve o problema imediato, mas não deixe ninguém tirar sua alegria de dançar.",
                scoreChange: 0
            }
        ]
    },
    {
        id: 3,
        icon: "🎮",
        title: "O Estranho no Jogo",
        description: "Você está jogando Roblox e um jogador chamado 'ReiDoRobux99' diz: 'Me passa seu endereço que eu te mando um cartão de presente grátis!'",
        options: [
            {
                text: "🏠 Passar o endereço (quero o prêmio!)",
                consequence: "bad",
                feedback: "🚨 PERIGO MÁXIMO! Nunca dê seu endereço para estranhos. Pode ser um adulto mal-intencionado querendo te encontrar.",
                scoreChange: -50
            },
            {
                text: "🙅‍♂️ Dizer 'Não' e sair do jogo",
                consequence: "good",
                feedback: "✅ MUITO BEM! Segurança em primeiro lugar. Saiu do jogo e evitou o risco.",
                scoreChange: 5
            },
            {
                text: "📢 Avisar os pais e denunciar o perfil",
                consequence: "good",
                feedback: "🏆 A MELHOR ESCOLHA! Além de se proteger, você ajuda a proteger outras crianças denunciando o perfil.",
                scoreChange: 15
            }
        ]
    }
];

let currentSceneIndex = 0;
let reputation = 100;

const sceneIcon = document.getElementById('scene-icon');
const sceneTitle = document.getElementById('scene-title');
const sceneDescription = document.getElementById('scene-description');
const optionsContainer = document.getElementById('options-container');
const reputationDisplay = document.getElementById('reputation');
const modal = document.getElementById('consequence-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const btnNextScene = document.getElementById('btn-next-scene');
const gameArea = document.getElementById('game-area');

function loadScene() {
    const scene = scenes[currentSceneIndex];
    
    // Atualizar visual
    sceneIcon.textContent = scene.icon;
    sceneTitle.textContent = scene.title;
    sceneDescription.textContent = scene.description;
    
    // Limpar opções anteriores
    optionsContainer.innerHTML = '';

    // Criar botões de opção
    scene.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-option';
        button.textContent = option.text;
        button.onclick = () => showConsequence(option);
        optionsContainer.appendChild(button);
    });

    modal.classList.add('hidden');
}

function showConsequence(option) {
    reputation += option.scoreChange;
    if (reputation > 100) reputation = 100;
    if (reputation < 0) reputation = 0;
    
    reputationDisplay.textContent = reputation;
    
    // Configurar Modal
    modalTitle.textContent = option.consequence === 'good' ? '✨ Mandou Bem!' : (option.consequence === 'bad' ? '⚠️ Opa, cuidado!' : '😐 Escolha Neutra');
    modalMessage.textContent = option.feedback;
    
    // Cores do título
    if(option.consequence === 'good') modalTitle.style.color = 'var(--success-color)';
    else if(option.consequence === 'bad') modalTitle.style.color = 'var(--danger-color)';
    else modalTitle.style.color = '#FDCB6E';

    modal.classList.remove('hidden');
}

btnNextScene.addEventListener('click', () => {
    currentSceneIndex++;
    if (currentSceneIndex < scenes.length) {
        loadScene();
    } else {
        finishGame();
    }
});

function finishGame() {
    let finalMessage = "";
    if (reputation >= 90) finalMessage = "🌟 Você é um Cidadão Digital Exemplar!";
    else if (reputation >= 60) finalMessage = "👍 Você está no caminho certo, mas atenção!";
    else finalMessage = "🛑 Precisa melhorar suas escolhas online.";

    gameArea.innerHTML = `
        <div class="scene-card" style="text-align: center;">
            <div class="scene-icon">🏁</div>
            <h2>Fim da Jornada!</h2>
            <p>Sua Reputação Final: <strong>${reputation}%</strong></p>
            <p style="font-size: 1.2rem; margin: 20px 0;">${finalMessage}</p>
            <button onclick="location.reload()" class="btn btn-next">Jogar Novamente</button>
            <button onclick="window.location.href='index.html'" class="btn btn-secondary" style="margin-top: 10px;">Voltar ao Menu</button>
        </div>
    `;
}

// Iniciar
loadScene();
