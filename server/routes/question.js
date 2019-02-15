import express from 'express'

const app = express.Router()

const currentUser = {
    email: 'aaaa@aaa.com',
    password: '1234',
    firstName: 'Sacha',
    lastName: 'Lifszyc'
}

function questionMiddleware(req, res, next) {
    const { id } = req.params
    req.question = questions.find(({ _id }) => _id === +id)
    next()
}

function userMiddleware(req, res, next) {
    req.user = currentUser
    next()
}


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
// app.get('/:id', (req, res) => {
    
//     const { id } = req.params
//     // Primera forma de buscar por ID
//     // const q = questions.find(question => question._id = +id)
    
//     // Segunda forma de buscar por ID
//     const q = questions.find(({ _id }) => _id === +id)
    
//     // Armo un array para devolver el objeto
//     const preguntas = new Array(0)
//     preguntas.push(q)
//     setTimeout(()=>{
//         res.status(200).json(preguntas)
//     }, 1000)
    
// })

app.get('/:id',questionMiddleware, (req, res) => {
    
    const preguntas = new Array(0)
    preguntas.push(req.question)
    setTimeout(()=>{
        res.status(200).json(preguntas)
    }, 1000)
    
})

app.post('/', userMiddleware, (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = req.user
    question.createdAt = new Date()
    question.answers = []

    questions.push(question)
    res.status(201).json(question) 
})

app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default app