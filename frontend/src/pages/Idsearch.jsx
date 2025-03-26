import { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Idsearch = () => {
    const [matrimonyID, setMatrimonyID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!matrimonyID) {
      alert("Please enter a Matrimony ID");
      return;
    }
    console.log("Searching for Matrimony ID:", matrimonyID);
    // Implement the actual form submission logic here
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
    </div>
    </div>
  );
};

export default Idsearch;
