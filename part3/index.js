require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');
var morgan = require('morgan');

// app
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// middleware after json parsing from express
morgan.token('body', (req, res) => JSON.stringify(req.body));
const loggingFormat = (tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.body(req, res)
].join(' ')
app.use(morgan(loggingFormat))

app.get('/', (request, response) => {
  response.send(build/index.html)
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }

  const person = new Person(body)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// middleware after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})