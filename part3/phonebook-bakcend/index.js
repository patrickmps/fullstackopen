const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (req, res) => {
  res.json(persons);
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  return person ? res.json(person) : res.status(404).end();
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const length = persons.length
  persons = persons.filter(p => p.id != id)

  return persons.length < length ? res.status(204).end() : res.status(404).end();
})

app.get("/info", (req, res) =>
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date(Date.now()).toString()}</p>
`))

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000000),
  }

  persons = persons.concat(person)
  res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})