const Return = (req, res, next) => {
    try {
        res.redirect('localhost:3001:/lcs/return')
        console.log(req.body)
    } catch (error) {
        next(error)
    }
}

export default Return