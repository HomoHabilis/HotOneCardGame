document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const cardCategoryIcon = document.getElementById('card-category-icon');
    const cardCategoryText = document.getElementById('card-category-text');
    const cardDetailText = document.getElementById('card-detail-text');
    const languageButtons = document.querySelectorAll('#language-selector .lang-btn');
    const drawCardButton = document.getElementById('draw-card-btn');
    const addCardForm = document.getElementById('add-card-form'); // Get form reference

    // Global State
    let currentLanguage = 'en'; // Default language
    let currentCard = null;
    let drawnCardIds = [];

    // Function to update the card display based on currentCard and currentLanguage
    function updateCardDisplay() {
        if (!currentCard) {
            if (cardCategoryText) cardCategoryText.textContent = 'No card';
            if (cardDetailText) cardDetailText.textContent = 'Draw a card to start!';
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
        if (cardDetailText) {
            cardDetailText.textContent = currentCard.text[currentLanguage];
        }
    }

    // Function to draw a new card
    function drawNewCard() {
        if (typeof cardData === 'undefined' || cardData.length === 0) {
            if (cardCategoryText) cardCategoryText.textContent = "Error";
            if (cardDetailText) cardDetailText.textContent = "No card data loaded or available.";
            if (cardCategoryIcon) cardCategoryIcon.className = 'fas fa-exclamation-triangle fa-3x';
            return;
        }

        if (drawnCardIds.length === cardData.length) {
            drawnCardIds = []; // Reset if all cards drawn
            // Optionally inform user:
            // alert("All cards have been drawn! The deck has been reshuffled.");
        }

        let selectedCard;
        let attempts = 0; // Safety break for the loop
        do {
            const randomIndex = Math.floor(Math.random() * cardData.length);
            selectedCard = cardData[randomIndex];
            attempts++;
            if (attempts > cardData.length * 2 && cardData.length > 0) { // If we've tried too many times
                 // This might happen if all available cards are somehow filtered out or if there's a logic flaw.
                 // For now, just break and use the last selected to avoid infinite loop.
                 console.warn("Could not find an undrawn card after multiple attempts. Resetting drawn list or using last selected.");
                 drawnCardIds = []; // Reset to ensure a card can be picked
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
        console.log(`Drawn card ID: ${currentCard.id}, Language: ${currentLanguage}`);
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
            event.preventDefault(); // Prevent default form submission

            // Get Input Values
            const category = document.getElementById('category').value;
            const text_en = document.getElementById('text_en').value;
            const text_it = document.getElementById('text_it').value;
            const text_fr = document.getElementById('text_fr').value;

            // Determine Icon based on Category
            let iconClass = '';
            switch (category) {
                case 'question':
                    iconClass = 'fas fa-question-circle';
                    break;
                case 'dare':
                    iconClass = 'fas fa-fire';
                    break;
                case 'punishment':
                    iconClass = 'fas fa-bomb';
                    break;
                default:
                    iconClass = 'fas fa-question-circle'; // Default icon
            }

            // Create New Card Object
            const newId = (cardData.length > 0 ? Math.max(...cardData.map(c => c.id)) : 0) + 1;
            const newCard = {
                id: newId,
                category: category,
                icon: iconClass,
                text: {
                    en: text_en,
                    it: text_it,
                    fr: text_fr
                }
            };

            // Add to cardData Array
            if (typeof cardData !== 'undefined') {
                cardData.push(newCard);
            } else {
                console.error("cardData is not defined. Cannot add new card.");
                alert("Error: Card data is not available. Cannot add new card.");
                return;
            }


            // Provide User Feedback
            alert('Card added successfully!');

            // Reset Form Fields
            addCardForm.reset();

            // Log for Debugging
            console.log("New card added:", newCard);
            console.log("Updated cardData:", cardData);
        });
    }

    // Initial Setup
    const initialActiveButton = document.getElementById(`btn-${currentLanguage}`);
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
    }
    drawNewCard(); // Draw the first card when the page loads
});
