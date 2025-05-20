const cardData = [
  // Questions
  {
    id: 1,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: [
        "If you could relive one day of your life, which would it be and why?",
        "What made that day so special?",
        "Would you change anything if you relived it?"
      ],
      it: [
        "Se potessi rivivere un giorno della tua vita, quale sarebbe e perché?",
        "Cosa ha reso quel giorno così speciale?",
        "Cambieresti qualcosa se lo rivivessi?"
      ],
      fr: [
        "Si tu pouvais revivre un jour de ta vie, lequel choisirais-tu et pourquoi ?",
        "Qu'est-ce qui a rendu cette journée si spéciale ?",
        "Changeriez-vous quelque chose si vous la reviviez ?"
      ]
    }
  },
  {
    id: 2,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: [
        "What quality do you value most in a friend?",
        "How does this quality manifest in their actions?"
      ],
      it: [
        "Quale qualità apprezzi di più in un amico?",
        "Come si manifesta questa qualità nelle loro azioni?"
      ],
      fr: [
        "Quelle qualité apprécies-tu le plus chez un ami ?",
        "Comment cette qualité se manifeste-t-elle dans leurs actions ?"
      ]
    }
  },
  {
    id: 3,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: ["What does 'love' mean to you in its truest form?"],
      it: ["Cosa significa 'amore' per te nella sua forma più vera?"],
      fr: ["Que signifie 'amour' pour toi dans sa forme la plus pure ?"]
    }
  },
  // Dares
  {
    id: 4,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: ["Sing the chorus of your favorite song out loud right now."],
      it: ["Canta il ritornello della tua canzone preferita ad alta voce, adesso."],
      fr: ["Chante le refrain de ta chanson préférée à voix haute, maintenant."]
    }
  },
  {
    id: 5,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: ["Do your best impression of a celebrity for 1 minute."],
      it: ["Fai la tua migliore imitazione di una celebrità per 1 minuto."],
      fr: ["Fais ta meilleure imitation d'une célébrité pendant 1 minute."]
    }
  },
  {
    id: 6,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: ["Send a text to your crush (or a friend) saying 'I know your secret!'"],
      it: ["Invia un messaggio alla persona che ti piace (o a un amico) scrivendo 'Conosco il tuo segreto!'"],
      fr: ["Envoie un SMS à ton coup de cœur (ou à un ami) en disant 'Je connais ton secret !'"]
    }
  },
  // Punishments
  {
    id: 7,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: ["Eat some sauce on a chip."],
      it: ["Mangia un po' di salsa su una patatina."],
      fr: ["Mange un peu de sauce sur une chips."]
    }
  },
  {
    id: 8,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: ["Eat a double dose of sauce on a chip."],
      it: ["Mangia una doppia dose di salsa su una patatina."],
      fr: ["Mange une double dose de sauce sur une chips."]
    }
  },
  {
    id: 9,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: ["Eat a spoonful of sauce."],
      it: ["Mangia un cucchiaio di salsa."],
      fr: ["Mange une cuillerée de sauce."]
    }
  }
];

// To make it accessible if script.js uses `import` or similar (though not strictly necessary for simple global scope)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = cardData;
}
