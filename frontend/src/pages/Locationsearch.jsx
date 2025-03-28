import { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Locationsearch = () => {
  const [gender, setGender] = useState("மணமகள்");
  const [age, setAge] = useState({ from: 20, to: 30 });
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [photo, setPhoto] = useState(false);

  const stateDistricts = {
    "Andaman & Nicobar": ["Nicobar", "North and Middle Andaman", "South Andaman"],
    "Andhra Pradesh": ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna"],
    "Arunachal Pradesh": ["Tawang", "Itanagar", "Ziro", "Pasighat", "Roing"],
    "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Tezpur", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    "Dadra & Nagar Haveli": ["Dadra", "Silvassa", "Nagar Haveli"],
    "Daman & Diu": ["Daman", "Diu"],
    "Delhi": ["Central Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Mandi"],
    "Jammu & Kashmir": ["Srinagar", "Jammu", "Baramulla", "Udhampur", "Pulwama"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Minicoy"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati"],
    "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Sikkim": ["Gangtok", "Geyzing", "Mangan", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Almora", "Pithoragarh"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Medinipur", "Siliguri"],
  };
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setDistricts(stateDistricts[state] || []);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/search/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender, age, state: selectedState, district, photo })
      });
      const data = await response.json();
      window.location.href = `/search?source=location&profiles=${encodeURIComponent(JSON.stringify(data))}`;
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };
  return (
    <div className="flex">
    <div className="flex min-h-screen bg-gray-100 p-5">
      <SidebarMenu />
      </div>
      <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Search by Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Looking for</label>
          <div className="mt-2 flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="மணமகன்"
                checked={gender === "மணமகன்"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              மணமகன்
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="மணமகள்"
                checked={gender === "மணமகள்"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              மணமகள்
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block font-medium">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="18"
              max="60"
              value={age.from}
              onChange={(e) => setAge({ ...age, from: e.target.value })}
              className="w-20 p-2 border rounded-md"
            />
            <span>to</span>
            <input
              type="number"
              min="18"
              max="60"
              value={age.to}
              onChange={(e) => setAge({ ...age, to: e.target.value })}
              className="w-20 p-2 border rounded-md"
            />
          </div>
        </div>
        
        {/* State Selection */}
      <label className="block mb-2 font-medium">State</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={selectedState}
        onChange={handleStateChange}
      >
        <option value="">Select State</option>
        {Object.keys(stateDistricts).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* District Selection */}
      {selectedState && (
        <>
          <label className="block mt-4 mb-2 font-medium">District</label>
          <select className="w-full p-2 border rounded-lg">
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </>
      )}
        
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={photo}
            onChange={(e) => setPhoto(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Profiles with Photo</label>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Search
        </button>
      </form>
    </div>
    </div>
  );
};

export default Locationsearch;
