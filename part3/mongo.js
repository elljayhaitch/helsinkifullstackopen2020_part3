const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <optional: name-to-add> <optional: phone-number-to-add>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv.length > 3 ? process.argv[3] : null
const number = process.argv.length > 4 ? process.argv[4] : null

const url =
  `mongodb+srv://fullstack:${password}@cluster0-lo9a5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (name === null) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}