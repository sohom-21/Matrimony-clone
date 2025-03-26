import { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Idsearch = () => {
    const [matrimonyID, setMatrimonyID] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!matrimonyID) {
      setError("Please enter a Matrimony ID");
      return;
    }

    setLoading(true);
    setError("");
    setProfile(null);

    try {
      const response = await fetch('http://localhost:5000/api/search/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrimonyID })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      // Navigate to search results with the profile data
      window.location.href = `/search?source=id&profiles=${encodeURIComponent(JSON.stringify([data]))}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
    <div className="flex min-h-screen bg-gray-100 p-5">
      <SidebarMenu />
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">Search for a Specific Profile</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter the Matrimony ID below to find a specific profile.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            * Matrimony ID
          </label>
          <input
            type="text"
            value={matrimonyID}
            onChange={(e) => setMatrimonyID(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            maxLength="50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Matrimony ID is a unique identifier provided at the time of profile
        creation. Ensure you enter the correct Matrimony ID to get the
        specific result.
      </p>

      {loading && (
        <div className="mt-4 text-center text-gray-600">
          Loading profile...
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600">
          {error}
        </div>
      )}

      {profile && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">Profile Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Age:</span> {profile.age}</p>
            <p><span className="font-medium">Gender:</span> {profile.gender}</p>
            <p><span className="font-medium">Education:</span> {profile.education}</p>
            <p><span className="font-medium">Occupation:</span> {profile.occupation}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Idsearch;
