import { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Educationalsearch = () => {
    const [gender, setGender] = useState("மணமகள்");
    const [startAge, setStartAge] = useState(20);
    const [endAge, setEndAge] = useState(30);
    const [education, setEducation] = useState("Any");
    const [photoOnly, setPhotoOnly] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/search/educational', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gender, startAge, endAge, education, photoOnly })
            });
            const data = await response.json();
            window.location.href = `/search?source=educational&profiles=${encodeURIComponent(JSON.stringify(data))}`;
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };
    return (
        <div className="flex">
            <div className="flex min-h-screen bg-gray-100 p-5">
                <SidebarMenu />
            </div>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Search Based on Educational Criteria</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Looking for</label>
                        <div className="flex space-x-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="மணமகன்"
                                    checked={gender === "மணமகன்"}
                                    onChange={() => setGender("மணமகன்")}
                                    className="mr-2"
                                />
                                மணமகன்
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="மணமகள்"
                                    checked={gender === "மணமகள்"}
                                    onChange={() => setGender("மணமகள்")}
                                    className="mr-2"
                                />
                                மணமகள்
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Age</label>
                        <div className="flex items-center space-x-2">
                            <span>From</span>
                            <input
                                type="number"
                                value={startAge}
                                onChange={(e) => setStartAge(e.target.value)}
                                className="border p-2 rounded w-16"
                                min="18"
                                max="100"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                value={endAge}
                                onChange={(e) => setEndAge(e.target.value)}
                                className="border p-2 rounded w-16"
                                min="18"
                                max="100"
                            />
                            <span>years</span>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Education</label>
                        <select
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            {["Any", "Engineering", "Medicine (Doctor)", "M.C.A.", "M.B.A.", "Law Graduate", "Graduate", "Graduate with Computer Applications", "Graduate with Teacher Training", "Post Graduate", "Post Graduate with Computer Applications", "Post Graduate with Teacher Training", "Teacher Training", "B.Pharm", "B.Tech", "B.Sc. Nursing", "D.Pharm", "Diploma", "Higher Secondary/ S.S.L.C.", "Below S.S.L.C", "Others"].map((edu) => (
                                <option key={edu} value={edu}>{edu}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={photoOnly}
                            onChange={() => setPhotoOnly(!photoOnly)}
                            className="mr-2"
                        />
                        <label>Show profiles with Photo</label>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
                </form>
            </div>
        </div>
    );
};

export default Educationalsearch;
