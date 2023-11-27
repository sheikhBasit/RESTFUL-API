let express = require('express')
let app = express()

app.use(express.json())

const user = [{
    "userId": 11,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
    },
    {
    "userId": 12,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
    },
    {
    "userId": 13,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
    }]

app.get('/api/users', (req, res) => {
    res.send(user)
})
app.get('/api/search', (req, res) => {
    res.send("Api Search")    
    })     
app.get('/api/users/:index', (req, res) => {    
    res.send(user[req.params.index])
})
app.get('/api/users/:index', (req, res) => {
    if (!user[req.params.index]) {
        return res.send("Not found")
    } else {
        res.send(user[req.params.index])
    }
})

app.put('/api/users/:index', (req, res) => {
    user[req.params.index] = req.body.name
    res.send(user[req.params.index])
})

app.delete('/api/users/:index', (req, res) => {
    user.splice(req.params.index, 1)
    res.send(user)
})
app.post('/api/users', (req, res) => {
    const newuser = req.body.name
    user.push(newuser)
    res.send(user)
})

app.listen(3000)