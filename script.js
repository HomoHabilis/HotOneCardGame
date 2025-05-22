document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const cardCategoryIcon = document.getElementById('card-category-icon');
    const cardCategoryText = document.getElementById('card-category-text');
    const cardDetailTextContainer = document.getElementById('card-detail-text-container');
    const languageButtons = document.querySelectorAll('#language-selector .lang-btn');
    const addCardForm = document.getElementById('add-card-form');

    // Category Draw Buttons
    const drawQuestionButton = document.getElementById('draw-question-btn');
    const drawDareButton = document.getElementById('draw-dare-btn');
    const drawPunishmentButton = document.getElementById('draw-punishment-btn');

    // Game Status DOM Elements
    const currentRoundDisplay = document.getElementById('current-round-display');
    const nextRoundButton = document.getElementById('next-round-btn');
    const roundTimerInput = document.getElementById('round-timer-input');
    const timeLeftDisplay = document.getElementById('time-left-display');

    // Audio Elements
    const NextRoundSound = document.getElementById('round-start-sound');
    const roundEndSound = document.getElementById('round-end-sound');
    const gameOverSound = document.getElementById('game-over-sound');

    // Global State
    let currentLanguage = 'en'; // Will be updated by determineInitialLanguage

    // Function to determine and set initial language based on browser settings
    function determineInitialLanguage() {
        const supportedLanguages = ['en', 'it', 'fr'];
        let bestMatch = 'en'; // Default

        // navigator.languages provides an array of preferred languages (e.g., ["en-US", "en"])
        if (navigator.languages && navigator.languages.length) {
            for (const langFull of navigator.languages) {
                const baseLang = langFull.split('-')[0].toLowerCase(); // "en-US" -> "en"
                if (supportedLanguages.includes(baseLang)) {
                    bestMatch = baseLang;
                    break; // Found the highest preferred supported language
                }
            }
        } 
        // Fallback to navigator.language if navigator.languages is not available
        else if (navigator.language) {
            const baseLang = navigator.language.split('-')[0].toLowerCase();
            if (supportedLanguages.includes(baseLang)) {
                bestMatch = baseLang;
            }
        }
        console.log(`Browser languages: ${navigator.languages ? navigator.languages.join(', ') : navigator.language}. Detected game language: ${bestMatch}`);
        return bestMatch;
    }

    currentLanguage = determineInitialLanguage(); // Set currentLanguage based on browser

    let currentCard = null;
    let drawnCardIds = []; // Tracks IDs of cards drawn in the current round
    let currentRound = 1;
    const MAX_ROUNDS = 10;

    let roundTimerDuration_seconds = parseInt(roundTimerInput.value, 10) * 60;
    let timerInterval = null;
    let timeLeft_seconds = roundTimerDuration_seconds;

    // Helper Function to format time
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Helper function to manage category draw button states
    function setCategoryDrawButtonsState(enabled) {
        if (drawQuestionButton) drawQuestionButton.disabled = !enabled;
        if (drawDareButton) drawDareButton.disabled = !enabled;
        if (drawPunishmentButton) drawPunishmentButton.disabled = !enabled;
    }
    
    // Function to update card display with a placeholder message
    function updateCardDisplayWithPlaceholder(message, iconClass = 'fas fa-hand-pointer fa-3x') {
        currentCard = null; // Ensure currentCard is null for placeholder
        if (cardCategoryIcon) cardCategoryIcon.className = iconClass;
        if (cardCategoryText) cardCategoryText.textContent = 'Awaiting Action';
        if (cardDetailTextContainer) {
            cardDetailTextContainer.innerHTML = `<p>${message}</p>`;
        }
        if (card && card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped'); // Show the front with placeholder info
        }
        // Ensure the card isn't styled as game-over unless it actually is
        if (card && !(currentRound === MAX_ROUNDS && timerInterval === null && timeLeft_seconds === 0)) {
            card.classList.remove('game-over-card');
        }
    }


    // Function to update game status display
    function updateGameStatusDisplay() {
        if (currentRoundDisplay) {
            currentRoundDisplay.textContent = currentRound;
        }
        
        if (timeLeftDisplay) {
            timeLeftDisplay.textContent = formatTime(timeLeft_seconds);
        }

        if (nextRoundButton) {
            // Condition 1: Game Over (Final round ended, timer is null, time is 0)
            if (currentRound === MAX_ROUNDS && timerInterval === null && timeLeft_seconds === 0) {
                nextRoundButton.textContent = "Game Over!";
                nextRoundButton.disabled = true;
                roundTimerInput.disabled = true;
                setCategoryDrawButtonsState(false);
            } 
            // Condition 2: Timer is currently running (Round in Progress)
            else if (timerInterval !== null) { 
                nextRoundButton.textContent = `Round ${currentRound} In Progress...`;
                nextRoundButton.disabled = true;
                roundTimerInput.disabled = true;
                setCategoryDrawButtonsState(true);
            } 
            // Condition 3: Timer NOT running (Between rounds, or before game start, or game over but not final round explicit end)
            else { 
                if (currentRound > MAX_ROUNDS) { // Game is truly over (e.g., if logic somehow bypassed above)
                     nextRoundButton.textContent = "Game Over";
                     nextRoundButton.disabled = true;
                     roundTimerInput.disabled = true;
                } else if (currentRound === MAX_ROUNDS && timeLeft_seconds > 0) { // Waiting to start final round (e.g., just finished round 8)
                     nextRoundButton.textContent = "Start Final Round";
                     nextRoundButton.disabled = false;
                     roundTimerInput.disabled = false;
                } else if (currentRound > 1) { // Between rounds (e.g., finished round 1, ready for round 2)
                    nextRoundButton.textContent = `Start Round ${currentRound}`;
                    nextRoundButton.disabled = false;
                    roundTimerInput.disabled = false;
                } else { // Before Round 1 starts
                    nextRoundButton.textContent = "Start Round";
                    nextRoundButton.disabled = false;
                    roundTimerInput.disabled = false;
                }
                setCategoryDrawButtonsState(false); // Disable draw buttons when round is not actively running
            }
        }
    }

    // Function to update the card display (actual card content)
    function updateCardDisplay() {
        if (!currentCard) {
            updateCardDisplayWithPlaceholder("No card selected or an error occurred.", "fas fa-border-all fa-3x");
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
         if (card) card.classList.remove('game-over-card'); // Ensure regular card display
    }
    
    function drawNewCard(categoryToDraw) {
        if (typeof cardData === 'undefined' || cardData.length === 0) {
            updateCardDisplayWithPlaceholder("No card data loaded.", "fas fa-exclamation-triangle fa-3x");
            return;
        }

        const categorySpecificCards = cardData.filter(card => card.category === categoryToDraw);

        if (categorySpecificCards.length === 0) {
            updateCardDisplayWithPlaceholder(`No cards available for the '${categoryToDraw}' category.`, 'fas fa-box-open fa-3x');
            if (card && card.classList.contains('is-flipped')) {
                card.classList.remove('is-flipped');
            }
            return;
        }

        let availableCards = categorySpecificCards.filter(card => !drawnCardIds.includes(card.id));

        if (availableCards.length === 0) {
            console.log(`All cards of category '${categoryToDraw}' drawn in this round. Resetting for this category.`);
            const idsOfThisCategory = categorySpecificCards.map(card => card.id);
            drawnCardIds = drawnCardIds.filter(id => !idsOfThisCategory.includes(id));
            availableCards = categorySpecificCards.filter(card => !drawnCardIds.includes(card.id)); 
        }
        
        if (availableCards.length === 0) {
             updateCardDisplayWithPlaceholder(`Could not draw a new card for '${categoryToDraw}'. All recycled.`, 'fas fa-sync-alt fa-3x');
             if (card && card.classList.contains('is-flipped')) {
                card.classList.remove('is-flipped');
            }
             return;
        }

        const randomIndex = Math.floor(Math.random() * availableCards.length);
        currentCard = availableCards[randomIndex];
        drawnCardIds.push(currentCard.id);

        if (card && card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            setTimeout(updateCardDisplay, 300); 
        } else {
            updateCardDisplay();
        }
        console.log(`Drawn card ID: ${currentCard.id} (Category: ${categoryToDraw}), Lang: ${currentLanguage}, Round: ${currentRound}`);
    }

    if (card) {
        card.addEventListener('click', () => {
            if (currentCard) { 
                card.classList.toggle('is-flipped');
            } else {
                console.log("No card content to flip to. Please draw a card.");
            }
        });
    }


    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.id.split('-')[1];
            if (currentCard) updateCardDisplay(); 
        });
    });

    function handleDrawCategoryClick(category) {
        if (timerInterval === null && currentRound <= MAX_ROUNDS) {
             alert("Please start the round before drawing a card.");
             return;
        }
        if (timerInterval !== null) { 
            drawNewCard(category);
        } else {
            alert("The game/round has not started or is over.");
        }
    }

    if (drawQuestionButton) {
        drawQuestionButton.addEventListener('click', () => handleDrawCategoryClick('question'));
    }
    if (drawDareButton) {
        drawDareButton.addEventListener('click', () => handleDrawCategoryClick('dare'));
    }
    if (drawPunishmentButton) {
        drawPunishmentButton.addEventListener('click', () => handleDrawCategoryClick('punishment'));
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

    if (nextRoundButton) {
        nextRoundButton.addEventListener('click', () => {
            if (timerInterval !== null) { // Prevent starting if already running
                return; 
            }

            if (NextRoundSound) NextRoundSound.play().catch(e => console.error("Error playing sound:", e));
            
            // Advance round if previous round ended naturally (time ran out)
            if (timeLeft_seconds === 0 && currentRound < MAX_ROUNDS) {
                 currentRound++; 
            }
            
            const userDurationMinutes = parseInt(roundTimerInput.value, 10);
            roundTimerDuration_seconds = (userDurationMinutes > 0 ? userDurationMinutes : 3) * 60;
            timeLeft_seconds = roundTimerDuration_seconds; // Reset time for the new/current round

            drawnCardIds = []; // Reset drawn cards for the new round
            updateCardDisplayWithPlaceholder("Select a card category to draw.", "fas fa-dice-d20 fa-3x");
            
            // Update timer display immediately to show full time
            if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);

            // Start the interval and assign its ID to timerInterval
            timerInterval = setInterval(() => {
                timeLeft_seconds--;
                if (timeLeftDisplay) timeLeftDisplay.textContent = formatTime(timeLeft_seconds);

                if (timeLeft_seconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null; // IMPORTANT: Set to null before calling updateGameStatusDisplay
                                        // so it knows the timer has stopped for this round.
                    
                    if(roundEndSound) roundEndSound.play().catch(e => console.error("Error playing sound:", e));

                    if (currentRound < MAX_ROUNDS) {
                        // Round ended, ready for "Start Round X+1" to be clicked.
                        // currentRound is NOT incremented here. It increments when "Start Round X+1" is clicked.
                        updateCardDisplayWithPlaceholder("Round Over! Click to Start Next Round.", "fas fa-hourglass-end fa-3x");

                    } else { // MAX_ROUNDS reached and timer ended
                        console.log("Game Over - Final Round Ended!");
                        if(gameOverSound) gameOverSound.play().catch(e => console.error("Error playing sound:", e));
                        
                        updateCardDisplayWithPlaceholder("GAME FINISHED!", "fas fa-trophy fa-3x");
                        if (card) {
                            card.classList.add('game-over-card');
                            if (card.classList.contains('is-flipped')) {
                                 card.classList.remove('is-flipped');
                            }
                        }
                    }
                    // Update UI to reflect round end (e.g., enable "Start Next Round" button, disable category draw buttons)
                    updateGameStatusDisplay(); 
                }
            }, 1000);

            // NOW that timerInterval is non-null (because setInterval has been called and returned an ID),
            // call updateGameStatusDisplay to set the UI to "Round In Progress" state.
            // This will disable "Start Round", disable timer input, and ENABLE category draw buttons.
            updateGameStatusDisplay(); 
        });
    }

    // Initial Setup
    // Activate the language button corresponding to currentLanguage (which is now browser-detected or default)
    languageButtons.forEach(btn => btn.classList.remove('active')); // Deactivate all first
    const initialActiveButton = document.getElementById(`btn-${currentLanguage}`);
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
    } else {
        // Fallback if the button for the detected language doesn't exist (shouldn't happen with 'en', 'it', 'fr')
        document.getElementById('btn-en').classList.add('active');
        currentLanguage = 'en'; // Ensure currentLanguage reflects this fallback
        console.warn("Fallback to English language button as detected language button was not found.");
    }
    
    timeLeft_seconds = roundTimerDuration_seconds;
    updateCardDisplayWithPlaceholder("Click 'Start Round' to begin!", "fas fa-hourglass-start fa-3x");
    updateGameStatusDisplay(); 
    // setCategoryDrawButtonsState(false); // This is handled by updateGameStatusDisplay now
});