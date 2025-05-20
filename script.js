document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const cardCategoryIcon = document.getElementById('card-category-icon');
    const cardCategoryText = document.getElementById('card-category-text');
    // Updated to point to the new container for card back text
    const cardDetailTextContainer = document.getElementById('card-detail-text-container'); 
    const languageButtons = document.querySelectorAll('#language-selector .lang-btn');
    const drawCardButton = document.getElementById('draw-card-btn');
    const addCardForm = document.getElementById('add-card-form');

    // Game Status DOM Elements
    const currentRoundDisplay = document.getElementById('current-round-display');
    const currentSauceDisplay = document.getElementById('current-sauce-display');
    const nextRoundButton = document.getElementById('next-round-btn');

    // Global State
    let currentLanguage = 'en'; // Default language
    let currentCard = null;
    let drawnCardIds = [];
    let currentRound = 1;
    const MAX_ROUNDS = 9;
    const gameSauces = [
        "Mild Jalapeño Zing",    // Round 1
        "Spicy Serrano Kick",   // Round 2
        "Fiery Cayenne Blast",  // Round 3
        "Habanero Hellfire",    // Round 4
        "Scotch Bonnet Scorch", // Round 5
        "Ghost Pepper Phantom", // Round 6
        "Reaper's Touch",       // Round 7
        "Dragon's Breath Inferno",// Round 8
        "The Final Combustion"  // Round 9
    ];

    // Function to update game status display
    function updateGameStatusDisplay() {
        if (currentRoundDisplay) {
            currentRoundDisplay.textContent = currentRound;
        }
        if (currentSauceDisplay) {
            currentSauceDisplay.textContent = gameSauces[currentRound - 1];
        }
        if (nextRoundButton) {
            nextRoundButton.disabled = (currentRound === MAX_ROUNDS);
            if (currentRound === MAX_ROUNDS) {
                 nextRoundButton.textContent = "Game Over"; // Optional: Change text
            } else {
                 nextRoundButton.textContent = "Next Round";
            }
        }
    }


    // Function to update the card display based on currentCard and currentLanguage
    function updateCardDisplay() {
        if (!currentCard) {
            if (cardCategoryText) cardCategoryText.textContent = 'No card';
            if (cardDetailTextContainer) { // Check if container exists
                cardDetailTextContainer.innerHTML = '<p>Draw a card to start!</p>'; // Default message
            }
            if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-question-circle fa-3x';
            return;
        }

        if (cardCategoryIcon) {
            cardCategoryIcon.className = `${currentCard.icon} fa-3x`;
        }
        if (cardCategoryText) {
            const category = currentCard.category;
            cardCategoryText.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        }

        // Logic for card back text (paragraph or list)
        if (cardDetailTextContainer) {
            const content = currentCard.text[currentLanguage];
            cardDetailTextContainer.innerHTML = ''; // Clear previous content

            if (Array.isArray(content)) {
                if (content.length > 1) { // Only use <ul> if more than one item
                    const ul = document.createElement('ul');
                    content.forEach(itemText => {
                        const li = document.createElement('li');
                        li.textContent = itemText;
                        ul.appendChild(li);
                    });
                    cardDetailTextContainer.appendChild(ul);
                } else if (content.length === 1) { // If array has one item, treat as paragraph
                    const p = document.createElement('p');
                    p.textContent = content[0];
                    cardDetailTextContainer.appendChild(p);
                } else { // If array is empty, show a placeholder
                    const p = document.createElement('p');
                    p.textContent = 'No details available.';
                    cardDetailTextContainer.appendChild(p);
                }
            } else if (typeof content === 'string') { // Fallback for single string content
                const p = document.createElement('p');
                p.textContent = content;
                cardDetailTextContainer.appendChild(p);
            } else { // Fallback if content is undefined or unexpected type
                 const p = document.createElement('p');
                 p.textContent = 'Content format error.';
                 cardDetailTextContainer.appendChild(p);
            }
        }
    }

    // GAME FLOW NOTE (from user feedback):
    // While "Punishment" cards can be drawn like any other card using this function,
    // the intended game flow is typically:
    // 1. A player draws a "Question" or "Dare" card.
    // 2. If the player fails to answer/perform satisfactorily or refuses,
    //    then a "Punishment" card is drawn (or a specific punishment is applied).
    // This function doesn't enforce that specific flow but provides the cards.
    // Function to draw a new card
    function drawNewCard() {
        if (typeof cardData === 'undefined' || cardData.length === 0) {
            if (cardCategoryText) cardCategoryText.textContent = "Error";
            if (cardDetailTextContainer) cardDetailTextContainer.innerHTML = "<p>No card data loaded or available.</p>";
            if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-exclamation-triangle fa-3x';
            return;
        }

        if (drawnCardIds.length === cardData.length) {
            drawnCardIds = []; 
            // alert("All cards have been drawn for this round! The deck has been reshuffled for the round.");
            // Optionally, prevent drawing more cards until next round or show a specific message.
            // For now, just reshuffling for the current round.
        }

        let selectedCard;
        let attempts = 0; 
        do {
            const randomIndex = Math.floor(Math.random() * cardData.length);
            selectedCard = cardData[randomIndex];
            attempts++;
            if (attempts > cardData.length * 2 && cardData.length > 0) { 
                 console.warn("Could not find an undrawn card after multiple attempts. Resetting drawn list or using last selected.");
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
        console.log(`Drawn card ID: ${currentCard.id}, Language: ${currentLanguage}, Round: ${currentRound}`);
    }

    // Card Flipping
    if (card) {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    }

    // Language Selection
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.id.split('-')[1];
            console.log(`Language set to: ${currentLanguage}`);
            if (currentCard) {
                updateCardDisplay();
            }
        });
    });

    // Draw New Card Button
    if (drawCardButton) {
        drawCardButton.addEventListener('click', drawNewCard);
    }

    // Add New Card Form Submission
    if (addCardForm) {
        addCardForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const category = document.getElementById('category').value;
            // For multi-line input, split by newline and filter empty lines
            const text_en = document.getElementById('text_en').value.split('\n').map(s => s.trim()).filter(s => s);
            const text_it = document.getElementById('text_it').value.split('\n').map(s => s.trim()).filter(s => s);
            const text_fr = document.getElementById('text_fr').value.split('\n').map(s => s.trim()).filter(s => s);

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
                text: { en: text_en.length > 0 ? text_en : [""], it: text_it.length > 0 ? text_it : [""], fr: text_fr.length > 0 ? text_fr : [""] }
            };

            if (typeof cardData !== 'undefined') {
                cardData.push(newCard);
            } else {
                console.error("cardData is not defined. Cannot add new card.");
                alert("Error: Card data is not available. Cannot add new card.");
                return;
            }
            alert('Card added successfully!');
            addCardForm.reset();
            console.log("New card added:", newCard);
            console.log("Updated cardData:", cardData);
        });
    }

    // Event Listener for "Next Round" Button
    if (nextRoundButton) {
        nextRoundButton.addEventListener('click', () => {
            if (currentRound < MAX_ROUNDS) {
                currentRound++;
                drawnCardIds = []; // Reset drawn cards for the new round
                updateGameStatusDisplay();
                drawNewCard(); // Automatically draw a new card for the new round
                console.log(`Moved to Round: ${currentRound}`);
            } else {
                console.log("Game Over - Max rounds reached.");
                // Button should already be disabled by updateGameStatusDisplay
            }
        });
    }

    // Initial Setup
    const initialActiveButton = document.getElementById(`btn-${currentLanguage}`);
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
    }
    updateGameStatusDisplay(); // Call to set initial game status
    drawNewCard(); // Draw the first card when the page loads
});
