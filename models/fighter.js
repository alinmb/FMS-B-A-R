const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  pseudo: { type: String, required: true },
  age: { type: Number, required: false },
  victoires: { type: Number, required: true },
  defaites: { type: Number, required: true },
  nc: { type: Number, required: true },
  imgSrc: { type: String, required: true },
  class: { type: String, required: true },
  club: { type: String, required: true },
  instagram: { type: String, required: true },
  organisation: { type: String, required: true },
});

module.exports = mongoose.model("Fighter", fighterSchema);
