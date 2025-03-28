import { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Occupationalsearch = () => {
    const [formData, setFormData] = useState({
        gender: "மணமகள்",
        startAge: 20,
        endAge: 30,
        occupation: "Any",
        showPhoto: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://matrimony-clone.onrender.com/api/search/occupational', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              gender: formData.gender,
              startAge: parseInt(formData.startAge),
              endAge: parseInt(formData.endAge),
              occupation: formData.occupation,
              showPhoto: formData.showPhoto
            })
          });
          const data = await response.json();
          window.location.href = `/search?source=occupational&profiles=${encodeURIComponent(JSON.stringify(data))}`;
        } catch (error) {
          console.error('Error performing search:', error);
        }
      };
  return (
    <div className="flex">
    <div className="flex min-h-screen bg-gray-100 p-5">
      <SidebarMenu />
      </div>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Matrimonial Search</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gender Selection */}
        <div>
          <label className="block text-gray-700">Looking for:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="மணமகன்"
                checked={formData.gender === "மணமகன்"}
                onChange={handleChange}
                className="mr-2"
              />
              மணமகன்
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="மணமகள்"
                checked={formData.gender === "மணமகள்"}
                onChange={handleChange}
                className="mr-2"
              />
              மணமகள்
            </label>
          </div>
        </div>

        {/* Age Selection */}
        <div>
          <label className="block text-gray-700">Age:</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="startAge"
              value={formData.startAge}
              onChange={handleChange}
              className="w-20 border rounded p-1"
            />
            <span>to</span>
            <input
              type="number"
              name="endAge"
              value={formData.endAge}
              onChange={handleChange}
              className="w-20 border rounded p-1"
            />
          </div>
        </div>

        {/* Occupation Selection */}
        <div>
          <label className="block text-gray-700">Occupation:</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Any">Any</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Teacher">Teacher</option>
            <option value="Business Person">Business Person</option>
            <option value="IT Professional">IT Professional</option>
            {/* Add more occupations as needed */}
          </select>
        </div>

        {/* Show Profiles with Photos */}
        <div>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="showPhoto"
              checked={formData.showPhoto}
              onChange={handleChange}
              className="mr-2"
            />
            Show profiles with Photo
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
    </div>
  );
};

export default Occupationalsearch;
