import express from 'express'
import {
    required,
    questionMiddleware,
    questionsMiddleware
} from '../middleware'

const app = express.Router()

// /api/questions
app.get('/', questionsMiddleware, (req,res)=>{
    res.status(200).json(req.questions)
})

app.get('/:id',questionMiddleware, (req, res) => {
    const preguntas = new Array(0)
    preguntas.push(req.question)
    res.status(200).json(preguntas)
})

app.post('/', require, (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = req.user
    question.createdAt = new Date()
    question.answers = []

    questions.push(question)
    res.status(201).json(question) 
})

app.post('/:id/answers', require, questionMiddleware, (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default app