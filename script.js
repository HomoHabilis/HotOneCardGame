document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const cardCategoryIcon = document.getElementById('card-category-icon');
    const cardCategoryText = document.getElementById('card-category-text');
    const cardDetailTextContainer = document.getElementById('card-detail-text-container');
    const languageButtons = document.querySelectorAll('#language-selector .lang-btn');
    const drawCardButton = document.getElementById('draw-card-btn');
    const addCardForm = document.getElementById('add-card-form');

    // Game Status DOM Elements
    const currentRoundDisplay = document.getElementById('current-round-display');
    const nextRoundButton = document.getElementById('next-round-btn');
    const roundTimerInput = document.getElementById('round-timer-input');
    const timeLeftDisplay = document.getElementById('time-left-display');

    // Audio Elements
    const roundEndSound = document.getElementById('round-end-sound');
    const gameOverSound = document.getElementById('game-over-sound'); // Will be used in a future step

    // Global State
    let currentLanguage = 'en'; // Default language
    let currentCard = null;
    let drawnCardIds = [];
    let currentRound = 1;
    const MAX_ROUNDS = 9; // Max rounds remains 9 as per gameSauces length
    const gameSauces = [ // Kept for potential future use or if sauce-per-round is re-introduced
        "Mild Jalapeño Zing", "Spicy Serrano Kick", "Fiery Cayenne Blast",
        "Habanero Hellfire", "Scotch Bonnet Scorch", "Ghost Pepper Phantom",
        "Reaper's Touch", "Dragon's Breath Inferno", "The Final Combustion"
    ];

    let roundTimerDuration_seconds = parseInt(roundTimerInput.value, 10) * 60;
    let timerInterval = null;
    let timeLeft_seconds = roundTimerDuration_seconds;

    // Helper Function to format time
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Function to update game status display
    function updateGameStatusDisplay() {
        if (currentRoundDisplay) {
            currentRoundDisplay.textContent = currentRound;
        }
        
        if (timeLeftDisplay) { // Ensure this is updated on initial load too
            timeLeftDisplay.textContent = formatTime(timeLeft_seconds);
        }

        if (nextRoundButton) {
            if (currentRound === MAX_ROUNDS && timerInterval === null && timeLeft_seconds === 0) {
                nextRoundButton.textContent = "Game Over!";
                nextRoundButton.disabled = true;
                roundTimerInput.disabled = true;
            } else if (timerInterval !== null) { // Timer is running
                nextRoundButton.textContent = `Round ${currentRound} In Progress...`;
                nextRoundButton.disabled = true;
                roundTimerInput.disabled = true;
            } else { // Timer not running, ready to start a round
                if (currentRound === MAX_ROUNDS) {
                    nextRoundButton.textContent = "Start Final Round";
                } else if (currentRound > 1) {
                    nextRoundButton.textContent = `Start Round ${currentRound}`;
                } else {
                    nextRoundButton.textContent = "Start Round"; // Initial state for round 1
                }
                nextRoundButton.disabled = false;
                roundTimerInput.disabled = false;
            }
        }
    }

    // Function to update the card display
    function updateCardDisplay() {
        if (!currentCard) {
            if (cardCategoryText) cardCategoryText.textContent = 'No card';
            if (cardDetailTextContainer) {
                cardDetailTextContainer.innerHTML = '<p>Draw a card to start!</p>';
            }
            if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-question-circle fa-3x';
            return;
        }
        if (cardCategoryIcon) cardCategoryIcon.className = `${currentCard.icon} fa-3x`;
        if (cardCategoryText) {
            const category = currentCard.category;
            cardCategoryText.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }
        if (cardDetailTextContainer) {
            const content = currentCard.text[currentLanguage];
            cardDetailTextContainer.innerHTML = '';
            const p = document.createElement('p');
            if (content && content.trim() !== '') {
                p.textContent = content;
            } else {
                p.textContent = "No details available for this language.";
            }
            cardDetailTextContainer.appendChild(p);
        }
    }
    
    // GAME FLOW NOTE (from user feedback):
    // While "Punishment" cards can be drawn like any other card using this function,
    // the intended game flow is typically:
    // 1. A player draws a "Question" or "Dare" card.
    // 2. If the player fails to answer/perform satisfactorily or refuses,
    //    then a "Punishment" card is drawn (or a specific punishment is applied).
    // This function doesn't enforce that specific flow but provides the cards.
    function drawNewCard() {
        if (typeof cardData === 'undefined' || cardData.length === 0) {
            if (cardCategoryText) cardCategoryText.textContent = "Error";
            if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = "<p>No card data loaded.</p>";
            if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-exclamation-triangle fa-3x';
            return;
        }
        if (drawnCardIds.length === cardData.length) {
            drawnCardIds = [];
        }
        let selectedCard;
        let attempts = 0;
        do {
            const randomIndex = Math.floor(Math.random() * cardData.length);
            selectedCard = cardData[randomIndex];
            attempts++;
            if (attempts > cardData.length * 2 && cardData.length > 0) {
                console.warn("Could not find an undrawn card. Resetting drawn list.");
                drawnCardIds = [];
                break;
            }
        } while (drawnCardIds.includes(selectedCard.id) && cardData.length > drawnCardIds.length);
        currentCard = selectedCard;
        drawnCardIds.push(currentCard.id);
        if (card && card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            setTimeout(updateCardDisplay, 300);
        } else {
            updateCardDisplay();
        }
        console.log(`Drawn card ID: ${currentCard.id}, Lang: ${currentLanguage}, Round: ${currentRound}`);
    }

    if (card) {
        card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.id.split('-')[1];
            if (currentCard) updateCardDisplay();
        });
    });

    if (drawCardButton) {
        drawCardButton.addEventListener('click', () => {
            if (timerInterval === null && currentRound <= MAX_ROUNDS) { // Only allow drawing if timer not running or game not over
                 alert("Please start the round before drawing a new card.");
                 return;
            }
            if (timerInterval !== null) { // Timer is running
                drawNewCard();
            } else {
                alert("The game/round has not started or is over.");
            }
        });
    }

    if (addCardForm) {
        addCardForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const category = document.getElementById('category').value;
            const text_en_value = document.getElementById('text_en').value.trim();
            const text_it_value = document.getElementById('text_it').value.trim();
            const text_fr_value = document.getElementById('text_fr').value.trim();
            let iconClass = '';
            switch (category) {
                case 'question': iconClass = 'fas fa-question-circle'; break;
                case 'dare': iconClass = 'fas fa-fire'; break;
                case 'punishment': iconClass = 'fas fa-bomb'; break;
                default: iconClass = 'fas fa-question-circle';
            }
            const newId = (cardData.length > 0 ? Math.max(...cardData.map(c => c.id)) : 0) + 1;
            const newCard = {
                id: newId, category: category, icon: iconClass,
                text: { en: text_en_value, it: text_it_value, fr: text_fr_value }
            };
            if (typeof cardData !== 'undefined') cardData.push(newCard);
            else { console.error("cardData undefined."); alert("Error adding card."); return; }
            alert('Card added successfully!');
            addCardForm.reset();
            console.log("New card added:", newCard);
        });
    }

    // "Start Round" Button Event Listener (formerly Next Round)
    if (nextRoundButton) {
        nextRoundButton.addEventListener('click', () => {
            if (timerInterval !== null) return; // Timer already running

            // If previous round ended and we are starting the next one
            if (timeLeft_seconds === 0 && currentRound < MAX_ROUNDS) {
                 currentRound++; // Advance to the next round
            }
            
            const userDurationMinutes = parseInt(roundTimerInput.value, 10);
            roundTimerDuration_seconds = (userDurationMinutes > 0 ? userDurationMinutes : 3) * 60;
            timeLeft_seconds = roundTimerDuration_seconds;

            drawnCardIds = []; // Reset drawn cards for the new round
            updateGameStatusDisplay(); // Update display for the current/new round
            drawNewCard(); // Draw the first card of the round

            if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);
            roundTimerInput.disabled = true;
            nextRoundButton.disabled = true; // Will be re-enabled by updateGameStatusDisplay after timer
            updateGameStatusDisplay(); // Call again to set button text to "Round X In Progress..."

            timerInterval = setInterval(() => {
                timeLeft_seconds--;
                if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);

                if (timeLeft_seconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    
                    if(roundEndSound) roundEndSound.play().catch(e => console.error("Error playing sound:", e));

                    if (currentRound < MAX_ROUNDS) {
                        // Ready for the next round to be started
                        // currentRound is NOT incremented here; it increments when "Start Round X+1" is clicked.
                    } else { // MAX_ROUNDS reached and timer ended
                        console.log("Game Over - Final Round Ended!");
                        if(gameOverSound) gameOverSound.play().catch(e => console.error("Error playing sound:", e));
                        
                        // Enhance "Game Finished" sequence:
                        const cardFrontIcon = document.getElementById('card-category-icon');
                        const cardFrontText = document.getElementById('card-category-text');
                        const cardDetailContainer = document.getElementById('card-detail-text-container');
                        const cardElement = document.querySelector('.card');

                        if (cardFrontIcon) cardFrontIcon.className = 'fas fa-trophy fa-3x'; // Trophy icon for game over
                        if (cardFrontText) cardFrontText.textContent = 'GAME';
                        if (cardDetailContainer) cardDetailContainer.innerHTML = '<p>FINISHED!</p>';
                        
                        if (cardElement) {
                            cardElement.classList.add('game-over-card');
                            if (cardElement.classList.contains('is-flipped')) {
                                cardElement.classList.remove('is-flipped');
                            }
                            // Optional: Remove click listener to prevent flipping
                            // cardElement.removeEventListener('click', cardFlipHandler); // Need to name the handler
                        }
                        // Ensure draw card button is also disabled or handled
                        if(drawCardButton) drawCardButton.disabled = true;
                    }
                    updateGameStatusDisplay(); // Update button text and state
                }
            }, 1000);
        });
    }

    // Initial Setup
    const initialActiveButton = document.getElementById(`btn-${currentLanguage}`);
    if (initialActiveButton) initialActiveButton.classList.add('active');
    
    timeLeft_seconds = roundTimerDuration_seconds; // Initialize timeLeft_seconds
    updateGameStatusDisplay(); // Set up initial round text, button state, and timer display
    // Do not draw a card initially until "Start Round" is clicked for the first time.
    // So, clear placeholder card content if any
    if (cardCategoryText) cardCategoryText.textContent = 'Game Ready';
    if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = '<p>Click "Start Round" to begin!</p>';
    if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-hourglass-start fa-3x';
});
