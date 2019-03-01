import { Question } from '../db-api'
import { handleError } from '../utils';

export const questionMiddleware = async (req, res, next) => {
    try {
        req.question = await Question.findById(req.params.id)
        next()
    } catch (error) {
        handleError(error, res)
    }
    
}