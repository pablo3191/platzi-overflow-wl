import Debug from 'debug'
import { Question } from '../model'
const debug = new Debug('platzi-overflow:db-api:questions')

export default {
    findAll: async () => {
        debug('Finding all questions')
        console.log(`findAll`)
        return await Question.find().populate('answers')
    },

    findById: async (_id) => {
        debug(`Find question with id ${_id}`)
        console.log(`findById ${_id}`)
        return await Question
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
    }
}