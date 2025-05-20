const cardData = [
  // Questions
  {
    id: 1,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: "If you could relive one day of your life, which would it be and why?",
      it: "Se potessi rivivere un giorno della tua vita, quale sarebbe e perché?",
      fr: "Si tu pouvais revivre un jour de ta vie, lequel choisirais-tu et pourquoi ?"
    }
  },
  {
    id: 2,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: "What quality do you value most in a friend?",
      it: "Quale qualità apprezzi di più in un amico?",
      fr: "Quelle qualité apprécies-tu le plus chez un ami ?"
    }
  },
  {
    id: 3,
    category: "question",
    icon: "fas fa-question-circle",
    text: {
      en: "What does 'love' mean to you in its truest form?",
      it: "Cosa significa 'amore' per te nella sua forma più vera?",
      fr: "Que signifie 'amour' pour toi dans sa forme la plus pure ?"
    }
  },
  // Dares
  {
    id: 4,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: "Sing the chorus of your favorite song out loud right now.",
      it: "Canta il ritornello della tua canzone preferita ad alta voce, adesso.",
      fr: "Chante le refrain de ta chanson préférée à voix haute, maintenant."
    }
  },
  {
    id: 5,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: "Do your best impression of a celebrity for 1 minute.",
      it: "Fai la tua migliore imitazione di una celebrità per 1 minuto.",
      fr: "Fais ta meilleure imitation d'une célébrité pendant 1 minute."
    }
  },
  {
    id: 6,
    category: "dare",
    icon: "fas fa-fire",
    text: {
      en: "Send a text to your crush (or a friend) saying 'I know your secret!'",
      it: "Invia un messaggio alla persona che ti piace (o a un amico) scrivendo 'Conosco il tuo segreto!'",
      fr: "Envoie un SMS à ton coup de cœur (ou à un ami) en disant 'Je connais ton secret !'"
    }
  },
  // Punishments
  {
    id: 7,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: "Eat a spoonful of a condiment you dislike.",
      it: "Mangia un cucchiaio di un condimento che non ti piace.",
      fr: "Mange une cuillerée d'un condiment que tu n'aimes pas."
    }
  },
  {
    id: 8,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: "Let the group choose an embarrassing ringtone for your phone for the next hour.",
      it: "Lascia che il gruppo scelga una suoneria imbarazzante per il tuo telefono per la prossima ora.",
      fr: "Laisse le groupe choisir une sonnerie embarrassante pour ton téléphone pour la prochaine heure."
    }
  },
  {
    id: 9,
    category: "punishment",
    icon: "fas fa-bomb",
    text: {
      en: "Post an old, embarrassing photo of yourself on social media (with a silly caption).",
      it: "Pubblica una vecchia foto imbarazzante di te sui social media (con una didascalia sciocca).",
      fr: "Poste une vieille photo embarrassante de toi sur les réseaux sociaux (avec une légende ridicule)."
    }
  }
];

// To make it accessible if script.js uses `import` or similar (though not strictly necessary for simple global scope)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = cardData;
}
