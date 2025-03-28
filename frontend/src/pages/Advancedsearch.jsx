import React, { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Advancedsearch = () => {
    const [nativePlaces, setNativePlaces] = useState([]);
  const [education, setEducation] = useState([]);
  const [stars, setStars] = useState([]);

  const allNativePlaces = ["Karaikudi", "Devakottai", "Pallathur", "Kanadukathan", "Puduvayal", "Others"];
  const allEducation = ["Engineering", "Medicine (Doctor)", "M.C.A.", "M.B.A.", "Law Graduate", "Graduate", "Post Graduate", "Diploma", "Others"];
  const allStars = ["அசுவினி", "பரணி", "கார்த்திகை", "ரோகிணி", "மிருகசீரிடம்", "திருவாதிரை", "Others"];

  const handleAdd = (item, setState, state) => {
    if (!state.includes(item)) {
      setState([...state, item]);
    }
  };

  const handleRemove = (item, setState, state) => {
    setState(state.filter((i) => i !== item));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://matrimony-clone.onrender.com/api/search/advanced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nativePlaces,
          education,
          stars
        })
      });
      const data = await response.json();
      window.location.href = `/search?source=advanced&profiles=${encodeURIComponent(JSON.stringify(data))}`;
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

    return (
        <div className="flex">
            <div className="flex min-h-screen bg-gray-100 p-5">
                <SidebarMenu />
            </div>
            <div className="p-5 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-3">Advanced Search</h2>
      
      {/* Native Place */}
      <div>
        <label className="font-semibold">Native Place</label>
        <div className="flex flex-wrap gap-2 my-2">
          {allNativePlaces.map((place) => (
            <button
              key={place}
              onClick={() => handleAdd(place, setNativePlaces, nativePlaces)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
              {place}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {nativePlaces.map((place) => (
            <span key={place} className="bg-gray-300 px-3 py-1 rounded-lg">
              {place} <button onClick={() => handleRemove(place, setNativePlaces, nativePlaces)}>❌</button>
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <label className="font-semibold">Education</label>
        <div className="flex flex-wrap gap-2 my-2">
          {allEducation.map((edu) => (
            <button
              key={edu}
              onClick={() => handleAdd(edu, setEducation, education)}
              className="bg-green-500 text-white px-3 py-1 rounded-lg"
            >
              {edu}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {education.map((edu) => (
            <span key={edu} className="bg-gray-300 px-3 py-1 rounded-lg">
              {edu} <button onClick={() => handleRemove(edu, setEducation, education)}>❌</button>
            </span>
          ))}
        </div>
      </div>

      {/* Star */}
      <div>
        <label className="font-semibold">Star</label>
        <div className="flex flex-wrap gap-2 my-2">
          {allStars.map((star) => (
            <button
              key={star}
              onClick={() => handleAdd(star, setStars, stars)}
              className="bg-purple-500 text-white px-3 py-1 rounded-lg"
            >
              {star}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {stars.map((star) => (
            <span key={star} className="bg-gray-300 px-3 py-1 rounded-lg">
              {star} <button onClick={() => handleRemove(star, setStars, stars)}>❌</button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Submit</button>
    </div>
        </div>
    );
};

export default Advancedsearch;
