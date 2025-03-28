import React, { useState } from "react";
import SidebarMenu from "../components/sidebarmenu"; // Adjust the path as needed

const Smartsearch = () => {
    const [formData, setFormData] = useState({
        txtGender: "மணமகன்",
        txtSAge: "18",
        txtEAge: "35",
        cid: "",
        sid: "",
        dateposting: "0",
        txtphoto: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://matrimony-clone.onrender.com/api/search/smart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            window.location.href = `/search?source=smart&profiles=${encodeURIComponent(JSON.stringify(data))}`;
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };
    return (
        <div className="flex">
            <div className="flex min-h-screen bg-gray-100 p-5">
                <SidebarMenu />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full ">
                <h2 className="text-lg font-bold mb-3 flex items-center">
                    <img src="pics/searchlense.gif" width="28" height="28" className="mr-2" alt="Search Icon" />
                    Smart Search
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Gender Selection */}
                    <div>
                        <label className="font-medium">Looking for:</label>
                        <div className="flex space-x-4 mt-1">
                            <label>
                                <input
                                    type="radio"
                                    name="txtGender"
                                    value="மணமகன்"
                                    checked={formData.txtGender === "மணமகன்"}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                மணமகன்
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="txtGender"
                                    value="மணமகள்"
                                    checked={formData.txtGender === "மணமகள்"}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                மணமகள்
                            </label>
                        </div>
                    </div>

                    {/* Age Selection */}
                    <div>
                        <label className="font-medium">Age:</label>
                        <div className="flex space-x-2">
                            <select
                                name="txtSAge"
                                value={formData.txtSAge}
                                onChange={handleChange}
                                className="border rounded px-2 py-1"
                            >
                                {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                    <option key={age} value={age}>
                                        {age}
                                    </option>
                                ))}
                            </select>
                            <span>to</span>
                            <select
                                name="txtEAge"
                                value={formData.txtEAge}
                                onChange={handleChange}
                                className="border rounded px-2 py-1"
                            >
                                {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                                    <option key={age} value={age}>
                                        {age}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Kovil Selection */}
                    <div>
                        <label className="font-medium">Kovil:</label>
                        <select
                            name="cid"
                            value={formData.cid}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="">Select Kovil</option>
                            <option value="1">Ilayatrangudi</option>
                            <option value="2">Iluppakudi</option>
                            <option value="3">Iraniyur</option>
                            <option value="4">Mathur</option>
                            <option value="12">Nemam Kovil</option>
                            <option value="13">Pillaiyarpatti</option>
                            <option value="14">Soorakudi</option>
                            <option value="15">Vairavan Koil</option>
                            <option value="16">Velangudi</option>
                        </select>
                    </div>

                    {/* Pirivu Selection */}
                    <div>
                        <label className="font-medium">Pirivu:</label>
                        <select
                            name="sid"
                            value={formData.sid}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="">Select Pirivu</option>
                        </select>
                    </div>

                    {/* Profile Posted Selection */}
                    <div>
                        <label className="font-medium">Profile posted:</label>
                        <select
                            name="dateposting"
                            value={formData.dateposting}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="7">Last 1 Week</option>
                            <option value="14">Last 2 Weeks</option>
                            <option value="21">Last 3 Weeks</option>
                            <option value="30">Last 1 Month</option>
                            <option value="60">Last 2 Months</option>
                            <option value="90">Last 3 Months</option>
                            <option value="180">Last 6 Months</option>
                            <option value="270">Last 9 Months</option>
                            <option value="365">Last 1 Year</option>
                            <option value="0">All</option>
                        </select>
                    </div>

                    {/* Show Profiles with Photo */}
                    <div>
                        <label className="font-medium flex items-center">
                            <input
                                type="checkbox"
                                name="txtphoto"
                                checked={formData.txtphoto}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Show profiles with Photo
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Smartsearch;
