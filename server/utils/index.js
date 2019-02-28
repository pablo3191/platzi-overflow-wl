export const handleError = (error, res) => {
    res.status(500).json({
        message: 'se rompio todo',
        error
    })
}