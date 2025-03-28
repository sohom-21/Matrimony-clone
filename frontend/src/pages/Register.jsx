import React, { useState } from "react";
import Captcha from '../components/Captcha';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    maritalStatus: "",
    password: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    occupationFather: "",
    occupationMother: "",
    nativePlace: "",
    houseName: "",
    temple: "",
    presentResidence: "",
    brothers: 0,
    marriedBrothers: 0,
    sisters: 0,
    marriedSisters: 0,
    referral1Name: "",
    referral1Phone: "",
    referral1Address: "",
    education: "",
    educationDetails: "",
    occupation: "",
    workDetails: "",
    workingPlace: "",
    income: "",
    height: "",
    weight: "",
    complexion: "",
    diet: "",
    specialCases: "",
    specialCasesDetails: "",
    rasi: "",
    lagnam: "",
    star: "",
    dosham: "",
    birthPlace: "",
    birthTime: "",
    dasaType: "",
    dasaYear: "",
    dasaMonth: "",
    dasaDay: "",
    address: "",
    mobile: "",
    city: "",
    phone: "",
    state: "",
    whatsapp: "",
    district: "",
    email: "",
    country: "India",
    photo: null,
    postalCode: "",
    partnerPreference: {
      education: "",
      ageFrom: "",
      ageTo: "",
      educationDetails: "",
      workAfterMarriage: "",
      complexion: "",
      heightFrom: "",
      heightTo: "",
      personalPreference: "",
    },
    verificationCode: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("Selected file:", file);
      // You can handle file validation (size, type) here
    }
  };
  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validations
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    
    // Additional required fields
    if (!formData.fatherName?.trim()) newErrors.fatherName = 'Father\'s name is required';
    if (!formData.motherName?.trim()) newErrors.motherName = 'Mother\'s name is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.address?.trim()) newErrors.address = 'Full street address is required';
    
    // Numeric validations
    if (formData.brothers < 0) newErrors.brothers = 'Brothers cannot be negative';
    if (formData.marriedBrothers < 0) newErrors.marriedBrothers = 'Married brothers cannot be negative';
    if (formData.sisters < 0) newErrors.sisters = 'Sisters cannot be negative';
    if (formData.marriedSisters < 0) newErrors.marriedSisters = 'Married sisters cannot be negative';
    
    // WhatsApp validation (if provided)
    if (formData.whatsapp && !/^\d{10}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp number must be 10 digits';
    }
    
    // Photo validation
    if (formData.photo) {
      const file = formData.photo;
      if (file.size > 1024 * 1024) { // 1MB
        newErrors.photo = 'Photo size must be less than 1MB';
      }
      if (!file.type.startsWith('image/jpeg')) {
        newErrors.photo = 'Photo must be in JPG format';
      }
    }
    
    // Partner preference validations
    if (!formData.partnerPreference.ageFrom || !formData.partnerPreference.ageTo) {
      newErrors.partnerAge = 'Partner age range is required';
    }
    if (parseInt(formData.partnerPreference.ageFrom) >= parseInt(formData.partnerPreference.ageTo)) {
      newErrors.partnerAge = 'Invalid age range';
    }
    
    // Terms and CAPTCHA validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    if (!captchaVerified) {
      newErrors.captcha = 'Please verify the CAPTCHA';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://matrimony-clone.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
          alert('Registration successful!');
          // Reset form to initial state
          setFormData({
            name: "", maritalStatus: "", password: "", dob: "", gender: "",
            fatherName: "", motherName: "", occupationFather: "", occupationMother: "",
            nativePlace: "", houseName: "", temple: "", presentResidence: "",
            brothers: 0, marriedBrothers: 0, sisters: 0, marriedSisters: 0,
            referral1Name: "", referral1Phone: "", referral1Address: "",
            education: "", educationDetails: "", occupation: "",
            workDetails: "", workingPlace: "", income: "",
            height: "", weight: "", complexion: "", diet: "",
            specialCases: "", specialCasesDetails: "",
            rasi: "", lagnam: "", star: "", dosham: "",
            birthPlace: "", birthTime: "",
            dasaType: "", dasaYear: "", dasaMonth: "", dasaDay: "",
            address: "", mobile: "", city: "", phone: "",
            state: "", whatsapp: "", district: "", email: "",
            country: "India", photo: null, postalCode: "",
            partnerPreference: {
              education: "", ageFrom: "", ageTo: "",
              educationDetails: "", workAfterMarriage: "",
              complexion: "", heightFrom: "", heightTo: "",
              personalPreference: ""
            },
            verificationCode: "",
            termsAccepted: false
          });
          setCaptchaVerified(false);
        } else {
          setErrors({ 
            submit: data.message || 'Registration failed',
            ...(data.errors ? { serverValidation: data.errors } : {})
          });
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrors({ 
          submit: 'Network error. Please try again.',
          technical: error.message
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <p className="text-gray-600 text-xs align-center">
        Correct & Complete information enhances the credibility & visibility of your profile to potential suitors. Here are some tips to make the Registration process easy
        <ul>
          <li>This form will take you 15-20 mins to complete; Clear Photo, Horoscope & Contact Details of References are Mandatory to process your registration - have them handy while you register.</li>
          <li>Duplicate/Re-Registrations are not allowed. If you have an existing registration, to request for Renewal of Lapsed Registration, Additional Contacts or Password Reset, contact us from your Registered Email / WhatsApp (by Text only)</li>
          <li>Ensure correct mobile number/email are captured. Ensure that emails from '*@nagratharmatrimony.in' are not marked as spam in your mails, to facilitate communications</li>
        </ul>
      </p>

      <form onSubmit={handleSubmit} className="space-y-2 text-xs">
        <div className="flex justify-between items-center  w-2/5">
          <label className="font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-2/3 p-1 border rounded"
            required
          />
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="font-medium">Marital Status:</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            >
              <option value="">- Select -</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Create Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            >
              <option value="">- Select -</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Father Name:</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Occupation/Buisness:</label>
            <input
              type="text"
              name="occupationFather"
              value={formData.occupationFather}
              onChange={handleChange}
              className="w-3/5 p-1 border rounded"
            />
          </div>

        </div>
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Mother Name:</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Occupation/Buisness:</label>
            <input
              type="text"
              name="occupationMother"
              value={formData.occupationMother}
              onChange={handleChange}
              className="w-3/5 p-1 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Native Place:</label>
            <input
              type="text"
              name="nativePlace"
              value={formData.nativePlace}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">House Name:</label>
            <input
              type="text"
              name="houseName"
              value={formData.houseName}
              onChange={handleChange}
              className="w-3/5 p-1 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Temple:</label>
            <input
              type="text"
              name="temple"
              value={formData.temple}
              onChange={handleChange}
              className="w-2/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Present Residence:</label>
            <input
              type="text"
              name="presentResidence"
              value={formData.presentResidence}
              onChange={handleChange}
              className="w-3/5 p-1 border rounded"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Brothers:</label>
            <input
              type="number"
              name="brothers"
              value={formData.brothers}
              onChange={handleChange}
              className="w-1/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Married Brothers:</label>
            <input
              type="number"
              name="marriedBrothers"
              value={formData.marriedBrothers}
              onChange={handleChange}
              className="w-1/3 p-1 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Sisters:</label>
            <input
              type="number"
              name="sisters"
              value={formData.sisters}
              onChange={handleChange}
              className="w-1/3 p-1 border rounded"
            />
          </div>
          <div className="flex justify-between items-center w-2/5">
            <label className="block font-medium">Married Sisters:</label>
            <input
              type="number"
              name="marriedSisters"
              value={formData.marriedSisters}
              onChange={handleChange}
              className="w-1/3 p-1 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col w-2/5">
            <label className="block font-medium">Referral 1 Name:</label>
            <input
              type="text"
              name="referral1Name"
              value={formData.referral1Name}
              onChange={handleChange}
              className="w-full p-1 border rounded"
            />
          </div>
          <div className="flex flex-col w-2/5">
            <label className="block font-medium">Referral 1 Phone:</label>
            <input
              type="text"
              name="referral1Phone"
              value={formData.referral1Phone}
              onChange={handleChange}
              className="w-full p-1 border rounded"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="block font-medium">Referral 1 Address:</label>
          <textarea
            name="referral1Address"
            value={formData.referral1Address}
            onChange={handleChange}
            className="w-full p-1 border rounded"
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Education Qualification:</label>
    <select
      name="education"
      value={formData.education}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="bachelor">Bachelor's</option>
      <option value="master">Master's</option>
      <option value="phd">PhD</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Education Details:</label>
    <input
      type="text"
      name="educationDetails"
      value={formData.educationDetails}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Occupation/Business:</label>
    <select
      name="occupation"
      value={formData.occupation}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="private">Private Job</option>
      <option value="govt">Government Job</option>
      <option value="business">Business</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Work Details:</label>
    <input
      type="text"
      name="workDetails"
      value={formData.workDetails}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Working Place:</label>
    <input
      type="text"
      name="workingPlace"
      value={formData.workingPlace}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Monthly / Annual Income:</label>
    <input
      type="text"
      name="income"
      value={formData.income}
      onChange={handleChange}
      placeholder="e.g., 5 LPA"
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Height:</label>
    <select
      name="height"
      value={formData.height}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="5ft">5 ft</option>
      <option value="5ft3">5 ft 3 in</option>
      <option value="5ft6">5 ft 6 in</option>
      <option value="6ft">6 ft</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Weight:</label>
    <select
      name="weight"
      value={formData.weight}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="50kg">50 kg</option>
      <option value="60kg">60 kg</option>
      <option value="70kg">70 kg</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Complexion:</label>
    <select
      name="complexion"
      value={formData.complexion}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="fair">Fair</option>
      <option value="wheatish">Wheatish</option>
      <option value="dark">Dark</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Diet:</label>
    <select
      name="diet"
      value={formData.diet}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="non-vegetarian">Non-Vegetarian</option>
      <option value="vegan">Vegan</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Special Cases:</label>
    <select
      name="specialCases"
      value={formData.specialCases}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">- Select -</option>
      <option value="none">None</option>
      <option value="physically-challenged">Physically Challenged</option>
      <option value="others">Others</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Special Cases Details:</label>
    <input
      type="text"
      name="specialCasesDetails"
      value={formData.specialCasesDetails}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>
  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Rasi:</label>
    <select
      name="rasi"
      value={formData.rasi}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">Select</option>
      <option value="mesham">Mesham</option>
      <option value="rishabam">Rishabam</option>
      <option value="mithunam">Mithunam</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Lagnam:</label>
    <select
      name="lagnam"
      value={formData.lagnam}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">Select</option>
      <option value="mesha">Mesha</option>
      <option value="vrishabha">Vrishabha</option>
      <option value="mithuna">Mithuna</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Star:</label>
    <select
      name="star"
      value={formData.star}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">Select</option>
      <option value="aswini">Aswini</option>
      <option value="bharani">Bharani</option>
      <option value="krittika">Krittika</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Dosham:</label>
    <input
      type="text"
      name="dosham"
      value={formData.dosham}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Place of Birth:</label>
    <input
      type="text"
      name="placeOfBirth"
      value={formData.placeOfBirth}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Time of Birth:</label>
    <input
      type="time"
      name="timeOfBirth"
      value={formData.timeOfBirth}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Dasa Type:</label>
    <select
      name="dasaType"
      value={formData.dasaType}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    >
      <option value="">Select</option>
      <option value="sukra">Sukra</option>
      <option value="chandra">Chandra</option>
      <option value="guru">Guru</option>
    </select>
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Dasa Duration:</label>
    <div className="flex space-x-2 w-2/3">
      <input
        type="number"
        name="dasaYear"
        placeholder="Year"
        value={formData.dasaYear}
        onChange={handleChange}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        name="dasaMonth"
        placeholder="Month"
        value={formData.dasaMonth}
        onChange={handleChange}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        name="dasaDay"
        placeholder="Day"
        value={formData.dasaDay}
        onChange={handleChange}
        className="w-1/3 p-2 border rounded"
      />
    </div>
  </div>
  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Full Street Address:</label>
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
      required
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Mobile Phone (OTP Required):</label>
    <input
      type="tel"
      name="mobile1"
      value={formData.mobile1}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
      pattern="[0-9]{10}"
      placeholder="Enter 10-digit number"
      required
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">City:</label>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Phone:</label>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">State:</label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">WhatsApp No.:</label>
    <input
      type="tel"
      name="whatsapp"
      value={formData.whatsapp}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
      pattern="[0-9]{10}"
      placeholder="Enter 10-digit number"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">District:</label>
    <input
      type="text"
      name="district"
      value={formData.district}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">E-mail:</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
      required
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Country:</label>
    <input
      type="text"
      name="country"
      value="India"
      disabled
      className="w-2/3 p-2 border rounded bg-gray-100"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Postal Code:</label>
    <input
      type="text"
      name="postalCode"
      value={formData.postalCode}
      onChange={handleChange}
      className="w-2/3 p-2 border rounded"
    />
  </div>

  <div className="flex justify-between items-center">
    <label className="font-medium w-1/3">Photo (Max: 1MB, JPG only):</label>
    <input
      type="file"
      name="photo"
      accept="image/jpeg"
      onChange={handleFileUpload}
      className="w-2/3 p-2 border rounded"
    />
  </div>
  <div className="flex justify-between">
        <div className="flex flex-col w-2/5">
          <label className="font-medium">Education:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div className="flex flex-col w-2/5">
          <label className="font-medium">Age:</label>
          <div className="flex space-x-2">
            <select
              name="ageFrom"
              value={formData.ageFrom}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
            >
              <option value="">From</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <select
              name="ageTo"
              value={formData.ageTo}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
            >
              <option value="">To</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
            </select>
          </div>
        </div>
      </div>

      {/* Education Details & Work Preference */}
      <div className="flex justify-between mt-4">
        <div className="flex flex-col w-2/5">
          <label className="font-medium">Education Details:</label>
          <input
            type="text"
            name="educationDetails"
            value={formData.educationDetails}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col w-2/5">
          <label className="font-medium">Work After Marriage:</label>
          <select
            name="workAfterMarriage"
            value={formData.workAfterMarriage}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Complexion & Height */}
      <div className="flex justify-between mt-4">
        <div className="flex flex-col w-2/5">
          <label className="font-medium">Complexion:</label>
          <select
            name="complexion"
            value={formData.complexion}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="flex flex-col w-2/5">
          <label className="font-medium">Height:</label>
          <div className="flex space-x-2">
            <select
              name="heightFrom"
              value={formData.heightFrom}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
            >
              <option value="">From</option>
              <option value="150cm">150 cm</option>
              <option value="160cm">160 cm</option>
              <option value="170cm">170 cm</option>
            </select>
            <select
              name="heightTo"
              value={formData.heightTo}
              onChange={handleChange}
              className="border p-2 rounded w-1/2"
            >
              <option value="">To</option>
              <option value="170cm">170 cm</option>
              <option value="180cm">180 cm</option>
              <option value="190cm">190 cm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Personal Preference */}
      <div className="mt-4">
        <label className="font-medium">Personal Preference:</label>
        <textarea
          name="personalPreference"
          value={formData.personalPreference}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
        />
      </div>

      {/* Verification Code */}
      <div className="mt-4">
        <label className="font-medium block mb-2">Verification Code:</label>
        <Captcha
          onVerificationChange={(value) => {
            setFormData(prev => ({
              ...prev,
              verificationCode: value
            }));
          }}
        />
      </div>

      {/* Terms & Conditions */}
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="font-medium">
          I Accept the Terms and Conditions
        </label>
      </div>
      {/* Note Section Before Submit */}
      <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
        <h3 className="font-semibold text-lg mb-2">Note:</h3>
        <p className="text-sm text-gray-700">
          I have verified and confirm that the information given above is true
          and correct.
        </p>
        <p className="text-sm text-gray-700">
          The information as available with this service is passed on without
          any obligation on the part of the Admin / Coordinator of this free
          service. Individual parties are requested and advised to verify the
          correctness of the information furnished in their own interest and the
          service is not responsible for any wrong information.
        </p>
        <p className="text-sm text-gray-700">
          The information given to you may be published in media & magazines,
          internet and other advertisements for the purpose of alliance search.
        </p>
        <p className="text-sm text-gray-700">
          I know that the details of the profile will be available to the brides
          and grooms on their registration with the service.
        </p>
        <p className="text-sm text-gray-700">
          As soon as the marriages are settled, I undertake to inform service by
          mail to{" "}
          <span className="text-blue-600 font-semibold">
            admin@nagaratharmatrimony.in
          </span>{" "}
          without any delay by quoting the profile ID to the Admin /
          Coordinator of this free service so that the record can be updated on
          time.
        </p>
      </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
