import express from 'express'
import cors from 'cors'

const app = express.Router()

app.use(cors())

const question = {
    _id: 1,
    title: '¿Cómo reutilizo un componente en Android?',
    description: 'Miren esta es mi pregunta...',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        email: 'aaaa@aaa.com',
        password: '1234',
        firstName: 'Sacha',
        lastName: 'Lifszyc'
    }
}

const questions = new Array(10).fill(question)
// /api/questions
app.get('/', (req,res)=>{
    res.status(200).json(questions)
})

// /api/questions/:id
app.get('/:id', (req, res) => {
    res.status(200).json(questions)
})

export default app