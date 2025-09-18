// Pega os elementos do HTML
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('game-over-message');

let score = 0;
let isGameOver = false;

// Adiciona a classe para o obstáculo começar a se mover
obstacle.classList.add('move-obstacle');

// Função para fazer o dinossauro pular
function jump() {
    if (!dino.classList.contains('jump-animation') && !isGameOver) {
        dino.classList.add('jump-animation');
        setTimeout(() => {
            dino.classList.remove('jump-animation');
        }, 500);
    }
}

// Escuta o evento de pressionar uma tecla
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp')) {
        jump();
    }
});

// Game loop para verificar colisões e atualizar o jogo
const gameLoop = setInterval(() => {
    if (isGameOver) {
        clearInterval(gameLoop);
        return;
    }

    const obstacleLeft = obstacle.offsetLeft;
    const dinoBottom = +window.getComputedStyle(dino).getPropertyValue('bottom').replace('px', '');

    // Verifica a colisão
    if (obstacleLeft > 20 && obstacleLeft < 60 && dinoBottom < 40) {
        isGameOver = true;

        // Para a animação do obstáculo
        obstacle.classList.remove('move-obstacle');
        obstacle.style.left = `${obstacleLeft}px`;

        // Mostra a mensagem de Game Over
        gameOverMessage.style.display = 'block';
    } else {
        // Atualiza a pontuação
        score++;
        scoreDisplay.textContent = score;
    }
}, 10);