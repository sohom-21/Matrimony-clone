const express = require("express");
const Register = require("../models/Register");

const router = express.Router();

// Search endpoints
router.post("/search/smart", async (req, res) => {
  try {
    const { txtGender, txtSAge, txtEAge, cid, sid, dateposting, txtphoto } = req.body;
    let query = { gender: txtGender };

    // Add age filter
    query.dob = {
      $gte: new Date().getFullYear() - parseInt(txtEAge),
      $lte: new Date().getFullYear() - parseInt(txtSAge)
    };

    // Add temple filter if provided
    if (cid) query.temple = cid;

    // Add photo filter
    if (txtphoto) query.photo = { $exists: true, $ne: null };

    const users = await Register.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search/educational", async (req, res) => {
  try {
    const { gender, startAge, endAge, education, photoOnly } = req.body;
    let query = { gender };

    // Add age filter
    query.dob = {
      $gte: new Date().getFullYear() - endAge,
      $lte: new Date().getFullYear() - startAge
    };

    // Add education filter
    if (education !== "Any") query.education = education;

    // Add photo filter
    if (photoOnly) query.photo = { $exists: true, $ne: null };

    const users = await Register.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search/occupational", async (req, res) => {
  try {
    const { gender, startAge, endAge, occupation, showPhoto } = req.body;
    let query = { gender };

    // Add age filter
    query.dob = {
      $gte: new Date().getFullYear() - endAge,
      $lte: new Date().getFullYear() - startAge
    };

    // Add occupation filter
    if (occupation !== "Any") query.occupation = occupation;

    // Add photo filter
    if (showPhoto) query.photo = { $exists: true, $ne: null };

    const users = await Register.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search/location", async (req, res) => {
  try {
    const { gender, age, state, district, photo } = req.body;
    let query = { gender };

    // Add age filter
    query.dob = {
      $gte: new Date().getFullYear() - age.to,
      $lte: new Date().getFullYear() - age.from
    };

    // Add location filters
    if (state) query.state = state;
    if (district) query.district = district;

    // Add photo filter
    if (photo) query.photo = { $exists: true, $ne: null };

    const users = await Register.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search/id", async (req, res) => {
  try {
    const { matrimonyID } = req.body;
    const user = await Register.findById(matrimonyID);
    
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/search/advanced", async (req, res) => {
  try {
    const { nativePlaces, education, stars } = req.body;
    let query = {};

    // Add native place filter
    if (nativePlaces.length > 0) {
      query.nativePlace = { $in: nativePlaces };
    }

    // Add education filter
    if (education.length > 0) {
      query.education = { $in: education };
    }

    // Add star filter
    if (stars.length > 0) {
      query.star = { $in: stars };
    }

    const users = await Register.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


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
