const Player = require("../model/Player");

const getAllEmployees = async (req, res) => {
  const players = await Player.find();
  if (!players) return res.status(204).json({ message: "No players found" });
  res.json(players);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ message: "First and last name required" });
  }

  try {
    const result = await Player.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const player = await Player.findOne({ _id: req.body.id }).exec();

  if (!player) {
    return res
      .status(204)
      .json({ message: `Player ID ${req.body.id} not found` });
  }
  if (req.body?.firstname) player.firstname = req.body.firstname;
  if (req.body?.lastname) player.lastname = req.body.lastname;
  const result = await player.save();
  res.json(result);
};

const delteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Player ID required" });
  const player = await Player.findOne({ _id: req.body.id }).exec();
  if (!player) {
    return res
      .status(204)
      .json({ message: `Player ID ${req.body.id} not found` });
  }
  const result = await player.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Player ID required" });
  const player = await Player.findOne({ _id: req.params.id }).exec();
  if (!player) {
    return res
      .status(204)
      .json({ message: `Player ID ${req.params.id} not found` });
  }
  res.json(player);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  delteEmployee,
  getEmployee,
};
