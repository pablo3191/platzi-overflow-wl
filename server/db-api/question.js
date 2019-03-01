import Debug from 'debug'
import { Question } from '../model'
const debug = new Debug('platzi-overflow:db-api:questions')

export default {
    findAll: async () => {
        debug('Finding all questions')
        console.log(`findAll`)
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
    }
}