const passwordInput = document.getElementById('password-input');
const fortressVisual = document.getElementById('fortress-visual');
const fortressName = document.getElementById('fortress-name');
const fortressEmoji = document.querySelector('.fortress-emoji');
const checkLength = document.getElementById('check-length');
const checkNumber = document.getElementById('check-number');
const checkSymbol = document.getElementById('check-symbol');
const checkUpper = document.getElementById('check-upper');
const strengthBar = document.getElementById('strength-bar');
const finalVerdict = document.getElementById('final-verdict');

// Níveis de Fortaleza
const fortressLevels = [
    { name: "Barraco de Palha", emoji: "🏚️", class: "level-0", message: "Muito fraca! Qualquer lobo sopra e derruba." },
    { name: "Casa de Madeira", emoji: "🏠", class: "level-1", message: "Melhor, mas ainda fácil de invadir." },
    { name: "Muro de Tijolos", emoji: "🧱", class: "level-2", message: "Boa proteção! Já dá trabalho para entrar." },
    { name: "Castelo de Pedra", emoji: "🏰", class: "level-3", message: "Forte! Só hackers experientes passariam." },
    { name: "Fortaleza de Diamante", emoji: "💎", class: "level-4", message: "LENDÁRIA! Segurança máxima." }
];

// Lista de senhas muito comuns (bloqueadas no nível 0)
const commonPasswords = [
    "123456", "12345", "12345678", "123456789", 
    "senha", "password", "qwerty", "admin", "segredo", "trocar"
];

passwordInput.addEventListener('input', updateStrength);

function updateStrength() {
    const password = passwordInput.value;
    const lowerPassword = password.toLowerCase();
    
    // Critérios
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password); // Critério oculto importante

    // Atualizar Checklist Visual
    updateCheckItem(checkLength, hasLength);
    updateCheckItem(checkNumber, hasNumber);
    updateCheckItem(checkSymbol, hasSymbol);
    updateCheckItem(checkUpper, hasUpper);

    // Calcular Pontuação Base
    let score = 0;
    if (hasLength) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;
    if (hasUpper) score++;
    if (hasLetters) score++; // Bônus por ter letras

    // === LÓGICA DE PENALIDADES AVANÇADA ===
    let levelIndex = 0;
    let customMessage = "";
    let isWeak = false;

    // 1. Senhas exatas da lista comum
    if (commonPasswords.includes(lowerPassword)) {
        isWeak = true;
        customMessage = "Essa senha é muito famosa! Use algo único.";
    }
    // 2. Padrões óbvios: "senha" + números/símbolos simples (ex: Senha123, senha@123)
    else if (lowerPassword.includes("senha") || lowerPassword.includes("password")) {
        // Se a senha for APENAS a palavra 'senha' com sufixos/prefixos simples
        // Regex procura por 'senha' cercada apenas de números ou símbolos comuns
        if (/^(?:[\d@!#]*senha[\d@!#]*|[\d@!#]*password[\d@!#]*)$/.test(lowerPassword)) {
            isWeak = true;
            customMessage = "Evite usar a palavra 'senha', mesmo com números!";
        }
    }
    // 3. Sequências numéricas óbvias (ex: 1234567890, 987654321)
    else if (/^0123456789|1234567890|0987654321|9876543210$/.test(password)) {
        isWeak = true;
        customMessage = "Sequências numéricas são fáceis de adivinhar!";
    }

    if (isWeak) {
        levelIndex = 0; // Força nível 0
        finalVerdict.textContent = customMessage;
        updateVisuals(0, 0, true);
        return;
    }

    // Se não for fraca, calcula o nível normalmente
    // Se só tem números (mesmo longos) ou só letras, limita o nível
    const onlyNumbers = /^\d+$/.test(password);
    const onlyLetters = /^[a-zA-Z]+$/.test(password);

    if (password.length > 0) {
        if (onlyNumbers) {
            levelIndex = password.length >= 10 ? 1 : 0;
        } else if (onlyLetters) {
            levelIndex = password.length >= 8 ? 1 : 0;
        } else {
            // Misturado
            if (score >= 5) levelIndex = 4;
            else if (score === 4) levelIndex = 3;
            else if (score === 3) levelIndex = 2;
            else if (score === 2) levelIndex = 1;
            else levelIndex = 0;
        }
    }

    // Ajuste final para senhas muito curtas
    if (password.length > 0 && password.length < 4) {
        levelIndex = 0;
    }

    updateVisuals(levelIndex, score);
}

function updateCheckItem(element, isValid) {
    if (isValid) {
        element.textContent = element.textContent.replace('❌', '✅');
        element.classList.add('valid');
    } else {
        if (!element.textContent.includes('❌')) {
             if(element.textContent.includes('✅')) 
                element.textContent = element.textContent.replace('✅', '❌');
        }
        element.classList.remove('valid');
    }
}

function updateVisuals(levelIndex, rawScore, customMessage = false) {
    const level = fortressLevels[levelIndex];
    
    // Atualizar Textos e Emojis
    fortressName.textContent = level.name;
    fortressEmoji.textContent = level.emoji;
    
    if (!customMessage) {
        finalVerdict.textContent = level.message;
    }

    // Atualizar Classe CSS para cor de fundo
    fortressVisual.className = `fortress level-${levelIndex}`;

    // Atualizar Barra de Progresso
    let percentage = 0;
    if (levelIndex === 0) percentage = 10;
    else if (levelIndex === 1) percentage = 30;
    else if (levelIndex === 2) percentage = 55;
    else if (levelIndex === 3) percentage = 80;
    else percentage = 100;

    if (passwordInput.value.length === 0) percentage = 0;

    strengthBar.style.width = `${percentage}%`;
    
    if (levelIndex === 0) strengthBar.style.backgroundColor = "var(--danger-color)";
    else if (levelIndex <= 2) strengthBar.style.backgroundColor = "#FDCB6E"; // Amarelo
    else strengthBar.style.backgroundColor = "var(--success-color)";
}
