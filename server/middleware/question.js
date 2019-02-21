
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

export const questionsMiddleware = (req, res, next) => {
    
    req.questions = questions
    next()
}

export const questionMiddleware = (req, res, next) => {
    const { id } = req.params
    req.question = questions.find(({ _id }) => _id === +id)
    next()
}

