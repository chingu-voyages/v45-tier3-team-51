import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const q = await prisma.questions.createMany({ data : [
        { question_id: 0, question: "Waiting for the game to start..." },
        { question: "What is your favorite color?" },
        { question: "What superpower would you choose?"},
        { question: "Favorite type of food?"},
        { question: "Favorite flavor of ice cream?" },
        { question: "Would you consider yourself extroverted or introverted?" },
        { question: "What's the most adventurous thing you've ever done?"},
        { question: "What's your favorite book/movie of all time, and why does it resonate with you?"},
        { question: "Most embarrassing memory?" },
        { question: "What were you known in school for?" },
        { question: "What's your go-to karaoke song?"},
        { question: "Do you believe in ghosts?"},
        { question: "What's a weird fact that not many people may know?" },
        { question: "What's the weirdest thing you've eaten?" },
        { question: "Best (most memorable) food you've ever had?"},
        { question: "If you could have dinner with any person, who would it be and why?"},
        { question: "What's the most memorable dream you've ever had?" },
        { question: "What's the best piece of advice you've ever received?" },
        { question: "What is your biggest fear?"},
        { question: "If you could have a conversation with your future self, what advice or questions would you have?"},
        { question: "Favorite childhood memory?" },
    ], skipDuplicates: true,}

    )
    console.log('added questions')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })