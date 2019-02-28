import Debug from 'debug'
import { Question } from '../model'
const debug = new Debug('platzi-overflow:db-api:questions')

export default {
    findAll: async () => {
        debug('Finding all questions')
        return await Question.find().populate('answers')
    }
}