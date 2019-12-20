const router = require('express').Router()
const service = require('./service')

router.get('/get', (req, res, next) => {
    service
        .get()
        .then((data) => res.send(data))
        .catch(next)
})

router.get('/get-one/:id', (req, res, next) => {
    service
        .getOne(req.params.id)
        .then((data) => res.send(data))
        .catch(next)
})

router.post('/create', (req, res, next) => {
    service
        .create(req.body)
        .then((data) => res.send(data))
        .catch(next)
})

router.put('/update/:id', (req, res, next) => {
    service
        .update(req.params.id, req.body)
        .then(() => res.send('Success!'))
        .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    service
        .remove(req.params.id)
        .then(() => res.send('Success!'))
        .catch(next)
})

module.exports = router