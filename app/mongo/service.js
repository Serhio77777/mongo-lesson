const { Qwerty } = require('../db/mongoose')
// const client = require('../db/mongodb')
// const ObjectId = require('mongodb').ObjectID;
// let db = null
const get = () => Qwerty.find({})

const getOne = (id) => Qwerty.findOne({_id: id})

const create = (body) => {
    const qwerty = new Qwerty(body)
    return qwerty.save()
}

const update = (id, body) => {
    return new Promise((resolve, reject) => {
        Qwerty
            .findOne({_id: id})
            .then(data => {
                Object.keys(body).forEach(key => {
                    data[key] = body[key]
                })
                return data.save()
            })
            .then(resolve)
            .catch(reject)
    })
}

const remove = (id) => Qwerty.findByIdAndRemove(id)

// Mongo version 
// client.connect('mongodb://localhost:27017', (error, datastore) => {
//     if (error) {
//         console.error(error)
//         return
//     }
//     console.log("Connected successfully to server");
//     db = datastore.db('test')
// })
// const get = () => {
//     return new Promise((resolve, reject) => {
//         db.collection('qwerties')
//             .find()
//             .toArray((error, data) => {
//                 if (error) {
//                     reject(error)
//                 }
//                 console.log(data)
//                 resolve(data)
//             })
//     })
// }

// const getOne = (id) => {
//     return db.collection('qwerties')
//         .findOne({_id: ObjectId(id)})
// }

// const create = (body) => {
//     return db.collection('qwerties')
//         .insert(body)
// }

// const update = (i5df0e69066f1d12c655a69d2d, body) => {
//     return db.collection('qwerties').updateOne({_id: ObjectId(id)}, {$set: body})
// }

// const remove = (id) => {
//     return db.collection('qwerties').deleteOne({_id: ObjectId(id)})
// }

module.exports = {
    get,
    getOne,
    create,
    update,
    remove
}