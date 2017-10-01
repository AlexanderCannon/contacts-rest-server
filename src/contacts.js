const _ = require('lodash');
const { ObjectID } = require('mongodb');

const mongoose = require('./models/mongoose-helper');
let { Contact } = require('./models/contact');

function getAll(req, res) {
  Contact.find().then((result) => {
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function findById(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send();
  }
  Contact.findOne({
    _id: req.params.id,
  }).then((contact) => {
    if (!contact) {
      return res.status(404).send();
    }
    res.status(200).send(contact);
  }).catch((e) => {
    return res.status(404).send();
  });
}

function removeById(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Contact.findOneAndRemove({
    _id: req.params.id
  }).then((result) => {
    if (!result) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`)
    }
    res.status(200).send(result);
  }, (e) => res.status(400).send(e));
}

function updateById(req, res) { mongoose.updateById(req, res, Contact) }

function saveNew(req, res) {
  contact = new Contact({
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
  });
  mongoose.saveNew(req, res, contact)
}

function updateById(req, res) {
  req.body = _.pick(req.body, ['phone_number', 'address', 'name']);
  if (req.body.completed) {
    req.body.completedAt = new Date().getTime();
  } else {
    req.body.completed = false;
    req.body.completedAt = null;
  }
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID ${req.params.id} appears to be invalid`);
  }
  Contact.findOneAndUpdate({
    _id: req.params.id,
  },
    { $set: req.body },
    { new: true }
  ).then((response) => {
    if (!response) {
      return res.status(404).send(`Could not find document with id ${req.params.id}`);
    }
    res.send({ response });
  }).catch((e) => res.status(400).send(e));
};

module.exports = {
  getAll,
  findById,
  removeById,
  updateById,
  saveNew,
  updateById
}