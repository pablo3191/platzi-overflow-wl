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
    setTimeout(()=>{
        res.status(200).json(questions)
    }, 1000)
})

// /api/questions/:id
app.get('/:id', (req, res) => {
    
    const { id } = req.params
    // Primera forma de buscar por ID
    // const q = questions.find(question => question._id = +id)
    
    // Segunda forma de buscar por ID
    const q = questions.find(({ _id }) => _id === +id)
    
    // Armo un array para devolver el objeto
    const preguntas = new Array(0)
    preguntas.push(q)
    setTimeout(()=>{
        res.status(200).json(preguntas)
    }, 1000)
    
})

app.post('/', (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = {
        email: 'aaaa@aaaa.com',
        password: '1234',
        firstName: 'Walter',
        lastName: 'Lensinas'
    }
    question.createdAt = new Date()
    question.answers = []

    questions.push(question)
    res.status(201).json(question) 
})

export default app