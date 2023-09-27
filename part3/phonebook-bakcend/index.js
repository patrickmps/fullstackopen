require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('data', (req) => (req.method === 'POST' ? JSON.stringify({ name: req.body.name }) : ' '));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/api/persons', (req, res) => Person.find({}).then((result) => res.json(result)));

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  return Person.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  return Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res) => Person.find({}).then((result) => res.send(`
  <p>Phonebook has info for ${result.length} people</p>
  <p>${new Date(Date.now()).toString()}</p>
`)));

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  } if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  return person.save().then((result) => {
    res.json(result);
  })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const { id } = req.params;

  return Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.code === 11000) {
    return res.status(400).send({ error: `${req.body.name} is already added to phonebook` });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
