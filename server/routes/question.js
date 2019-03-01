import express from 'express'
import { required, questionMiddleware } from '../middleware'
import { Question } from '../db-api'
import { handleError } from '../utils'
import { User } from '../model';
const app = express.Router()

// /api/questions
app.get('/', async (req,res)=>{
    try {
        const { sort } = req.query
        const questions = await Question.findAll(sort)
        res.status(200).json(questions)
    } catch (error) {
        console.error(error)
        handleError(error, res)
    }
})

// GET /api/questions/:id
app.get('/:id', questionMiddleware, async (req, res) => {
    try {
        const q = req.question
        const preguntas = new Array(0)
        preguntas.push(q)
        res.status(200).json(preguntas)
    } catch (error) {
        console.error(error)
        handleError(error, res)
    }
})

app.post('/', required, async (req, res) => {
    const { title, description, icon } = req.body
    const q = {
        title,
        description,
        icon,
        user: req.user._id
    }
    try {
        const savedQuestion = await Question.create(q)
        res.status(201).json(savedQuestion)
    } catch (error) {
        handleError(error, res)
    }
})

app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = new User(req.user)

    try {
        const savedAnswer = await Question.createAnswer(q, answer)
        console.log(`la respuesta guardada es: ${savedAnswer}`)
        res.status(201).json(savedAnswer)
    } catch (error) {
        handleError(error, res)
    }
})

export default app