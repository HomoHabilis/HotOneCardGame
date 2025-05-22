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
  },
  {
    id: 18,
    category: "question",
    text: {
      en: "What was your worst date (before meeting the bride)?",
      it: "Qual è stato il tuo peggior appuntamento (con quelle prima della sposa)?",
      fr: "Quel a été ton pire rendez-vous (avant de rencontrer la mariée) ?"
    }
  },
  {
    id: 19,
    category: "question",
    text: {
      en: "Who would be the worst person to crash your wedding?",
      it: "Quale sarebbe la persona peggiore che potrebbe introdursi al tuo matrimonio?",
      fr: "Quelle serait la pire personne qui pourrait s’incruster à ton mariage ?"
    }
  },
  {
    id: 20,
    category: "question",
    text: {
      en: "Tell us a moment when you realized Jaleh was the one (if there is one).",
      it: "Raccontacci (se c'è), un momento di vita fra quelli quando hai capito che Jaleh era quella giusta.",
      fr: "Raconte-nous un moment où tu as compris que Jaleh était la bonne (s’il y en a un)."
    }
  },
  {
    id: 21,
    category: "dare",
    text: {
      en: "Act out your last argument without speaking. (If you say you never argue, you get triple sauce.)",
      it: "Mima la tua ultima litigata senza parlare. (se ci dici che non litigate mai, ti prende tripla salsa).",
      fr: "Mime ta dernière dispute sans parler. (Si tu dis que vous ne vous disputez jamais, tu prends triple sauce.)"
    }
  },
  {
    id: 22,
    category: "question",
    text: {
      en: "What’s the craziest thing Jaleh made you do for the wedding prep?",
      it: "Quale la cosa piu assurda che Jaleh ti ha obbligato a fare per preparare questo matrimonio?",
      fr: "Quelle est la chose la plus folle que Jaleh t’a obligée à faire pour préparer ce mariage ?"
    }
  },
  {
    id: 23,
    category: "question",
    text: {
      en: "What did you think the first time you saw her?",
      it: "Cosa hai pensato quando l’hai vista la prima volta?",
      fr: "Qu’as-tu pensé la première fois que tu l’as vue ?"
    }
  },
  {
    id: 24,
    category: "question",
    text: {
      en: "What is the one thing you can’t go on vacation without?",
      it: "Cosa non puoi fare a meno di portare in vacanza?",
      fr: "Quel est l’objet que tu ne peux absolument pas oublier en vacances ?"
    }
  },
  {
    id: 25,
    category: "punishment",
    text: {
      en: "Imitate someone in the group until they guess who it is.",
      it: "Imita uno dei presenti finché non indovinano chi è",
      fr: "Imite quelqu’un du groupe jusqu’à ce qu’on devine qui c’est."
    }
  },
  {
    id: 26,
    category: "punishment",
    text: {
      en: "Speak with a French accent for the next 3 questions.",
      it: "Parla con accento francese per le 3 prossime domande",
      fr: "Parle avec un accent français pendant les 3 prochaines questions."
    }
  },
  {
    id: 27,
    category: "dare",
    text: {
      en: "Act out your first date with the bride, without using words.",
      it: "Mima il tuo primo appuntamento con la sposa, senza usare parole",
      fr: "Mime ton premier rendez-vous avec la mariée, sans utiliser de mots."
    }
  },
  {
    id: 28,
    category: "punishment",
    text: {
      en: "Add extra hot sauce on your next chip.",
      it: "Metti una salsa extra sulla prossima chip",
      fr: "Ajoute une dose de sauce piquante supplémentaire sur ta prochaine chips."
    }
  },
  {
    id: 29,
    category: "punishment",
    text: {
      en: "Strut around the table like on a catwalk with background music (tapped on the table).",
      it: "Sfila attorno al tavolo come in una passerella con una musica di sottofondo (battuta sul tavolo).",
      fr: "Défile autour de la table comme sur un podium avec une musique de fond (tapée sur la table)."
    }
  }
];

// To make it accessible if script.js uses `import` or similar (though not strictly necessary for simple global scope)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = cardData;
}
