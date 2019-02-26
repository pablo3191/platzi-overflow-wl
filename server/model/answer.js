import mongoose, { Schema } from 'mongoose'

const AnswerSchema = Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
})

const Answer = mongoose.model('Answer', AnswerSchema)

export default Answer