const gameContainer = document.getElementById('gameContainer');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('resetButton');

const emojis = ['🎮', '🎮', '🎲', '🎲', '🎪', '🎪', '🎭', '🎭', 
                '🎨', '🎨', '🎯', '🎯', '🎱', '🎱', '🎳', '🎳'];
let cards = [];
let flippedCards = [];
let moves = 0;
let matchedPairs = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || 
        this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves!`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

function initializeGame() {
    gameContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    moves = 0;
    matchedPairs = 0;
    movesDisplay.textContent = moves;

    const shuffledEmojis = shuffleArray([...emojis]);
    shuffledEmojis.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cards.push(card);
        gameContainer.appendChild(card);
    });
}

resetButton.addEventListener('click', initializeGame);
initializeGame();
