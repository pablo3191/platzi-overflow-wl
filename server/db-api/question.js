import Debug from 'debug'
import { Question, Answer } from '../model'
const debug = new Debug('platzi-overflow:db-api:questions')

export default {
    findAll: async () => {
        debug('Finding all questions')
        return Question.find().populate('answers')
    },

    findById: async (_id) => {
        debug(`Find question with id ${_id}`)
        console.log(`findById ${_id}`)
        return Question
            .findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
    },

    create: async (q) => {
        debug(`Creating a new question ${q}`)
        console.log(`La pregunta es: ${q}`)
        const question = new Question(q)
        return question.save()
    },

    createAnswer: async (q, a) => {
        debug(`Creating a new answer: ${a} in a question: ${q}`)
        const answer = new Answer(a)
        const savedAnswer = await answer.save()
        q.answers.push(savedAnswer)
        await q.save()
        return savedAnswer
    }
}