const express = require("express");
const Register = require("../models/Register");

const router = express.Router();

// Route to add a new user to the "register" collection
router.post("/register", async (req, res) => {
  try {
    const newUser = new Register({
      name: req.body.name,
      maritalStatus: req.body.maritalStatus,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      occupationFather: req.body.occupationFather,
      occupationMother: req.body.occupationMother,
      knownLanguages: req.body.knownLanguages,
      nativePlace: req.body.nativePlace,
      address: req.body.address,
      temple: req.body.temple,
      presentResidence: req.body.presentResidence,
      brothers: req.body.brothers,
      marriedBrothers: req.body.marriedBrothers,
      sisters: req.body.sisters,
      marriedSisters: req.body.marriedSisters,
      profileCreatedBy: req.body.profileCreatedBy,
      referral: req.body.referral,
      referralDetails1: req.body.referralDetails1,
      referralDetails2: req.body.referralDetails2,
      education: req.body.education,
      educationDetails: req.body.educationDetails,
      occupation: req.body.occupation,
      workDetails: req.body.workDetails,
      workingPlace: req.body.workingPlace,
      income: req.body.income,
      height: req.body.height,
      weight: req.body.weight,
      complexion: req.body.complexion,
      diet: req.body.diet,
      specialCases: req.body.specialCases,
      rasi: req.body.rasi,
      lagnam: req.body.lagnam,
      star: req.body.star,
      dosham: req.body.dosham,
      birthPlace: req.body.birthPlace,
      birthTime: req.body.birthTime,
      dasaType: req.body.dasaType,
      horoscope: req.body.horoscope,
      contactAddress: req.body.contactAddress,
      mobile: req.body.mobile,
      city: req.body.city,
      phone: req.body.phone,
      state: req.body.state,
      whatsapp: req.body.whatsapp,
      district: req.body.district,
      email: req.body.email,
      country: req.body.country || "India", // Default value
      photo: req.body.photo,
      postalCode: req.body.postalCode,
      partnerPreference: req.body.partnerPreference,
      verificationCode: req.body.verificationCode,
      termsAccepted: req.body.termsAccepted,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all users from the "register" collection
router.get("/users", async (req, res) => {
  try {
    const users = await Register.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await Register.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a user's data
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await Register.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await Register.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
