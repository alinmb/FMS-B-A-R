const express = require("express");
const Fighter = require("../models/fighter");
const router = express.Router();

// Getting all fighters

router.get("/", async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.status(200).json({ fighters: fighters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one specific fighter

router.get("/:id", getFighter, (req, res) => {
  res.send(res.fighter);
});

// Create a fighter

router.post("/", async (req, res) => {
  const fighter = new Fighter({
    ...req.body,
  });
  try {
    const newFighter = await fighter.save();
    res.status(201).json(newFighter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a fighter

router.patch("/:id", getFighter, async (req, res) => {
  if (req.body.prenom != null) {
    res.fighter.prenom = req.body.prenom;
  }
  if (req.body.nom != null) {
    res.fighter.nom = req.body.nom;
  }
  if (req.body.pseudo != null) {
    res.fighter.pseudo = req.body.pseudo;
  }
  if (req.body.age != null) {
    res.fighter.age = req.body.age;
  }
  if (req.body.victoires != null) {
    res.fighter.victoires = req.body.victoires;
  }
  if (req.body.defaites != null) {
    res.fighter.defaites = req.body.defaites;
  }
  if (req.body.nc != null) {
    res.fighter.nc = req.body.nc;
  }
  if (req.body.imgSrc != null) {
    res.fighter.imgSrc = req.body.imgSrc;
  }
  if (req.body.club != null) {
    res.fighter.club = req.body.club;
  }
  if (req.body.class != null) {
    res.fighter.class = req.body.class;
  }
  if (req.body.organisation != null) {
    res.fighter.organisation = req.body.organisation;
  }

  try {
    const updatedFighter = await res.fighter.save();
    res.status(201).json(updatedFighter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a fighter

router.delete("/:id", getFighter, async (req, res) => {
  try {
    await res.fighter.deleteOne();
    res.status(201).json({ message: "Fighter deleted !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFighter(req, res, next) {
  let fighter;
  try {
    fighter = await Fighter.findById(req.params.id);
    if (fighter == null) {
      return res.status(404).json({ message: "Cannot find fighter !" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.fighter = fighter;
  next();
}

module.exports = router;
