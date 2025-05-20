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

    // Draw Buttons
    const drawQuestionBtn = document.getElementById('draw-question-btn');
    const drawDareBtn = document.getElementById('draw-dare-btn');
    const drawPunishmentBtn = document.getElementById('draw-punishment-btn');

    // Audio Elements
    const roundEndSound = document.getElementById('round-end-sound');
    const gameOverSound = document.getElementById('game-over-sound'); // Will be used in a future step

    // Global State
    let currentLanguage = 'en'; // Default language
    let currentCard = null; // Structure: { text: {en:'...', it:'...', fr:'...'}, category: '...' }
    let cardManifest = null;
    let manifestLoaded = false; // New flag
    let drawnCardPaths = { questions: [], dares: [], punishments: [] }; // For manifest cards
    let sessionAddedCards = { questions: [], dares: [], punishments: [] }; // For user-added cards
    const categoryIcons = {
        questions: "fas fa-question-circle",
        dares: "fas fa-fire",
        punishments: "fas fa-bomb"
    };
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
        // Icon update using categoryIcons
        if (cardCategoryIcon && currentCard && currentCard.category) {
            cardCategoryIcon.className = categoryIcons[currentCard.category] + ' fa-3x'; 
        }
        // Category text on card front:
        if (cardCategoryText && currentCard && currentCard.category) {
            cardCategoryText.textContent = currentCard.category.charAt(0).toUpperCase() + currentCard.category.slice(1);
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
    
    // Function to reset drawn card paths and session card drawn status for the current round
    function resetRoundState() {
        drawnCardPaths.questions = [];
        drawnCardPaths.dares = [];
        drawnCardPaths.punishments = [];

        for (const cat of ['questions', 'dares', 'punishments']) {
            sessionAddedCards[cat].forEach(card => card.drawn = false);
        }
        console.log("Drawn card paths and session card 'drawn' status reset for the new round.");
    }

    async function drawCategorizedCard(category) {
        // Check for undrawn session-added cards first
        const undrawnSessionCards = sessionAddedCards[category].filter(card => !card.drawn);
        if (undrawnSessionCards.length > 0) {
            const sessionCardToDraw = undrawnSessionCards[0]; // Draw the first available
            sessionCardToDraw.drawn = true; // Mark as drawn
            currentCard = { // Update global currentCard
                text: sessionCardToDraw.text,
                category: category,
                isSessionCard: true 
            };
            
            // Standard card display logic
            if (card && card.classList.contains('is-flipped')) { // Check if card element exists
                 card.classList.remove('is-flipped');
                 setTimeout(updateCardDisplay, 300);
            } else {
                updateCardDisplay();
            }
            console.log("Drew a session-added card:", currentCard);
            return; // Exit function after drawing a session card
        }

        // If no undrawn session cards, proceed to draw from manifest...
        if (!cardManifest) {
            console.error("Draw attempt failed: Manifest not loaded"); // Added log
            if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = '<p>Card data is not loaded. Try again later.</p>';
            return;
        }
        if (!cardManifest[category] || cardManifest[category].length === 0) {
            console.error(`No cards found for category: ${category}`);
            if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = `<p>No manifest cards available for ${category}.</p>`;
            return;
        }

        let availablePaths = cardManifest[category].filter(path => !drawnCardPaths[category].includes(path));

        if (availablePaths.length === 0) {
            console.log(`All manifest ${category} cards drawn in this round. Resetting for this category.`);
            drawnCardPaths[category] = []; 
            availablePaths = cardManifest[category];
            if (availablePaths.length === 0) { 
                 if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = `<p>No cards defined for ${category} in manifest.</p>`;
                 return;
            }
             alert(`All manifest ${category} cards for this round have been drawn and will now be reshuffled for this round.`);
        }

        const randomIndex = Math.floor(Math.random() * availablePaths.length);
        const cardPath = availablePaths[randomIndex];

        try {
            const response = await fetch(cardPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${cardPath}`);
            }
            const cardFileData = await response.json();
            
            currentCard = { 
                text: cardFileData.text,
                category: category,
                isSessionCard: false // Mark as not a session card
            };
            drawnCardPaths[category].push(cardPath); 

            if (card && card.classList.contains('is-flipped')) { // Check if card element exists
                 card.classList.remove('is-flipped');
                 setTimeout(updateCardDisplay, 300); 
            } else {
                updateCardDisplay();
            }
            console.log(`Drawn card from manifest: ${cardPath}, Lang: ${currentLanguage}, Round: ${currentRound}`);

        } catch (error) {
            console.error("Error fetching or parsing card file:", cardPath, error);
            if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = `<p>Error loading card: ${cardPath}.</p>`;
        }
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

    // Old drawCardButton listener is removed as per instructions.
    
    // Event listeners for new draw buttons
    if (drawQuestionBtn) {
        drawQuestionBtn.addEventListener('click', () => drawCategorizedCard('questions'));
    }
    if (drawDareBtn) {
        drawDareBtn.addEventListener('click', () => drawCategorizedCard('dares'));
    }
    if (drawPunishmentBtn) {
        drawPunishmentBtn.addEventListener('click', () => drawCategorizedCard('punishments'));
    }


    if (addCardForm) {
        addCardForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const category = document.getElementById('category').value;
            const text_en_value = document.getElementById('text_en').value.trim();
            const text_it_value = document.getElementById('text_it').value.trim();
            const text_fr_value = document.getElementById('text_fr').value.trim();
            let iconClass = ''; // Not strictly needed for session card data, but kept for potential future use
            switch (category) {
                case 'questions': iconClass = categoryIcons.questions; break;
                case 'dares': iconClass = categoryIcons.dares; break;
                case 'punishments': iconClass = categoryIcons.punishments; break;
                default: iconClass = 'fas fa-question-circle';
            }

            const newSessionCard = {
                text: {
                    en: text_en_value,
                    it: text_it_value,
                    fr: text_fr_value
                },
                isSessionCard: true,
                drawn: false // Initialize as not drawn
            };

            sessionAddedCards[category].push(newSessionCard);
            
            alert('Session card added successfully! It will be prioritized when drawing from its category.');
            addCardForm.reset();
            console.log("Session card added:", newSessionCard);
            console.log("Current sessionAddedCards:", sessionAddedCards);
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

            resetRoundState(); // Call the renamed and updated function
            updateGameStatusDisplay(); // Update display for the current/new round
            // Do NOT draw a card automatically here. User will use new draw buttons.

            if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);
            roundTimerInput.disabled = true;
            nextRoundButton.disabled = true; 
            updateGameStatusDisplay(); // Call again to set button text to "Round X In Progress..."

            // Enable categorized draw buttons when timer starts, only if manifest is loaded
            if (manifestLoaded) {
                if(drawQuestionBtn) drawQuestionBtn.disabled = false;
                if(drawDareBtn) drawDareBtn.disabled = false;
                if(drawPunishmentBtn) drawPunishmentBtn.disabled = false;
            } else {
                console.warn("Timer started, but manifest not yet loaded. Draw buttons remain disabled.");
            }

            timerInterval = setInterval(() => {
                timeLeft_seconds--;
                if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);

                if (timeLeft_seconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    
                    // Disable categorized draw buttons when timer ends
                    if(drawQuestionBtn) drawQuestionBtn.disabled = true;
                    if(drawDareBtn) drawDareBtn.disabled = true;
                    if(drawPunishmentBtn) drawPunishmentBtn.disabled = true;
                    
                    if(roundEndSound) roundEndSound.play().catch(e => console.error("Error playing sound:", e));

                    if (currentRound < MAX_ROUNDS) {
                        // Ready for the next round to be started
                    } else { // MAX_ROUNDS reached and timer ended
                        console.log("Game Over - Final Round Ended!");
                        if(gameOverSound) gameOverSound.play().catch(e => console.error("Error playing sound:", e));
                        
                        const cardFrontIcon = document.getElementById('card-category-icon');
                        const cardFrontText = document.getElementById('card-category-text');
                        const cardDetailContainer = document.getElementById('card-detail-text-container');
                        const cardElement = document.querySelector('.card');

                        if (cardFrontIcon) cardFrontIcon.className = 'fas fa-trophy fa-3x';
                        if (cardFrontText) cardFrontText.textContent = 'GAME';
                        if (cardDetailContainer) cardDetailContainer.innerHTML = '<p>FINISHED!</p>';
                        
                        if (cardElement) {
                            cardElement.classList.add('game-over-card');
                            if (cardElement.classList.contains('is-flipped')) {
                                cardElement.classList.remove('is-flipped');
                            }
                        }
                        // Draw buttons are already disabled above, and nextRoundButton is handled by updateGameStatusDisplay
                    }
                    updateGameStatusDisplay(); 
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

    loadManifest(); // Load the card manifest on script load
});

async function loadManifest() {
    console.log("Attempting to load manifest..."); // Added log
    try {
        const response = await fetch('game_cards/card_manifest.json');
        console.log("Manifest fetched, status:", response.status); // Added log
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const manifestData = await response.json(); // Use temp variable
        console.log("Manifest parsed:", manifestData); // Added log
        cardManifest = manifestData; // Assign to global variable
        manifestLoaded = true; // Set the flag
        
        console.log("Card manifest successfully loaded and assigned. manifestLoaded = true");

    } catch (error) {
        console.error("Error loading manifest:", error); // Updated log message
        manifestLoaded = false; // Ensure flag is false on error
        const cardDetailContainer = document.getElementById('card-detail-text-container');
        if (cardDetailContainer) cardDetailContainer.innerHTML = '<p>Error: Could not load card data. Please check manifest and card files.</p>';
        
        // Ensure draw buttons remain disabled if manifest load fails
        const drawQuestionBtn = document.getElementById('draw-question-btn');
        const drawDareBtn = document.getElementById('draw-dare-btn');
        const drawPunishmentBtn = document.getElementById('draw-punishment-btn');
        if(drawQuestionBtn) drawQuestionBtn.disabled = true;
        if(drawDareBtn) drawDareBtn.disabled = true;
        if(drawPunishmentBtn) drawPunishmentBtn.disabled = true;
        console.log("Draw buttons explicitly disabled due to manifest load error. manifestLoaded = false");
    }
}
