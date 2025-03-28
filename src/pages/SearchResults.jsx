import { useState, useEffect } from 'react';
import SidebarMenu from '../components/sidebarmenu';

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profiles, setProfiles] = useState([]);
  const profilesPerPage = 12;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get('source');
    const profilesData = searchParams.get('profiles');

    if (profilesData) {
      try {
        const parsedProfiles = JSON.parse(decodeURIComponent(profilesData));
        setProfiles(parsedProfiles);
      } catch (error) {
        console.error('Error parsing profiles data:', error);
      }
    }
  }, []);

  // Calculate pagination
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex">
      <div className="flex min-h-screen bg-gray-100 p-5">
        <SidebarMenu />
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Search Results</h2>
        
        {profiles.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No profiles found matching your search criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProfiles.map((profile, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{profile.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Age: {profile.age} years</p>
                      <p>Education: {profile.education}</p>
                      <p>Occupation: {profile.occupation}</p>
                      <p>Location: {profile.location}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        View Profile
                      </button>
                      <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                {renderPagination()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;