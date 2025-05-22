const cardData = [
  // Questions
  {
    id: 1,
    category: "question",
    text: {
      en: "If you could relive one day of your life, which would it be and why?",
      it: "Se potessi rivivere un giorno della tua vita, quale sarebbe e perché?",
      fr: "Si tu pouvais revivre un jour de ta vie, lequel choisirais-tu et pourquoi ?"
    }
  },
  {
    id: 2,
    category: "question",
    text: {
      en: "What quality do you value most in a friend?",
      it: "Quale qualità apprezzi di più in un amico?",
      fr: "Quelle qualité apprécies-tu le plus chez un ami ?"
    }
  },
  {
    id: 3,
    category: "question",
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
    text: {
      en: "Sing the chorus of your favorite song out loud right now.",
      it: "Canta il ritornello della tua canzone preferita ad alta voce, adesso.",
      fr: "Chante le refrain de ta chanson préférée à voix haute, maintenant."
    }
  },
  {
    id: 5,
    category: "dare",
    text: {
      en: "Do your best impression of a celebrity for 1 minute.",
      it: "Fai la tua migliore imitazione di una celebrità per 1 minuto.",
      fr: "Fais ta meilleure imitation d'une célébrité pendant 1 minute."
    }
  },
  {
    id: 6,
    category: "dare",
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
    text: {
      en: "Eat some sauce on a chip.",
      it: "Mangia un po' di salsa su una patatina.",
      fr: "Mange un peu de sauce sur une chips."
    }
  },
  {
    id: 8,
    category: "punishment",
    text: {
      en: "Eat a double dose of sauce on a chip.",
      it: "Mangia una doppia dose di salsa su una patatina.",
      fr: "Mange une double dose de sauce sur une chips."
    }
  },
  {
    id: 9,
    category: "punishment",
    text: {
      en: "Eat a spoonful of sauce.",
      it: "Mangia un cucchiaio di salsa.",
      fr: "Mange une cuillerée de sauce."
    }
  },
  {
    id: 10,
    category: "question",
    text: {
      en: "When did you and your future wife first kiss?",
      it: "Quando tu e la tua futura sposa vi siete baciati per la prima volta?",
      fr: "Quand as-tu embrassé ta future épouse pour la première fois ?"
    }
  },
  {
    id: 11,
    category: "question",
    text: {
      en: "Have you ever kissed someone in this group?",
      it: "Hai mai baciato qualcuno in questo gruppo?",
      fr: "As-tu déjà embrassé quelqu’un dans ce groupe ?"
    }
  },
  {
    id: 12,
    category: "dare",
    text: {
      en: "Describe your first sexual experience using only your elbows.",
      it: "Descrivi la tua prima esperienza sessuale usando solo i tuoi gomiti",
      fr: "Décris ta première expérience sexuelle en utilisant uniquement tes coudes."
    }
  },
  {
    id: 13,
    category: "question",
    text: {
      en: "What does your future wife think is your worst flaw?",
      it: "Quale secondo la tua futura moglie il tuo peggior diffetto?",
      fr: "Quel est, selon ta future épouse, ton pire défaut ?"
    }
  },
  {
    id: 14,
    category: "dare",
    text: {
      en: "Sing a love song with your mouth on fire.",
      it: "Canta una canzone d’amore con la bocca in fiamme",
      fr: "Chante une chanson d’amour avec la bouche en feu."
    }
  },
  {
    id: 15,
    category: "dare",
    text: {
      en: "Record a video message for the bride right after eating a double dose of the hottest sauce.",
      it: "Messaggio per la sposa registrato in video subito dopo aver mangiato una doppia dose della morte",
      fr: "Enregistre un message vidéo pour la mariée juste après avoir mangé une double dose de la sauce de la mort."
    }
  },
  {
    id: 16,
    category: "question",
    text: {
      en: "Who would you NOT invite to the wedding if you had the choice?",
      it: "Chi NON inviteresti al matrimonio, se potessi?",
      fr: "Qui n’inviterais-tu PAS au mariage si tu avais le choix ?"
    }
  },
  {
    id: 17,
    category: "question",
    text: {
      en: "Tell us the most embarrassing moment you’ve had with one of us.",
      it: "Racconta il momento più imbarazzante vissuto con uno di noi",
      fr: "Raconte le moment le plus embarrassant vécu avec l’un d’entre nous."
    }
  }
];

// To make it accessible if script.js uses `import` or similar (though not strictly necessary for simple global scope)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = cardData;
}
