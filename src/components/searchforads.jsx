import React, { useState, useEffect } from "react";
import Card from './propsCard';
import AdDetails from './adDetale';

const Searchforads = () => {
  const [pets, setPets] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [regionInput, setRegionInput] = useState("");
  const [animalTypeInput, setAnimalTypeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 9;

  // Function to fetch pet data
  const fetchPetsData = async (district, kind) => {
    setIsLoading(true);
    setError(null); // Clear error before each new request

    try {
      // Construct request URL
      const requestUrl = `/api/search/?district=${encodeURIComponent(district)}&kind=${encodeURIComponent(kind)}`;
      console.log('Request sent to:', requestUrl);

      // Send the request to the server
      const response = await fetch(`https://pets.xn--80ahdri7a.site${requestUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // If server needs cookies
      });

      // Read the response as text
      const responseText = await response.text();

      if (!response.ok) {
        console.error(`Request failed: ${response.statusText}`);
        throw new Error(`Request failed: ${response.statusText}`);
      }

      console.log('Response from server:', responseText); // Log raw response

      // Try parsing the response as JSON
      try {
        const data = JSON.parse(responseText);
        if (data.data && data.data.orders) {
          setPets(data.data.orders);
          setFilteredAds(data.data.orders);
        } else {
          setFilteredAds([]);
        }
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        setError('Received data is not in JSON format. Please check the server response.');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('An error occurred while fetching data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search for ads
  const searchAds = () => {
    if (!regionInput && !animalTypeInput) {
      alert('Please enter at least one search parameter.');
      return;
    }
    fetchPetsData(regionInput, animalTypeInput); // Send data to the server
    setCurrentPage(1); // Reset page to first
  };

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  // Function to close the selected ad
  const closeAd = () => {
    setSelectedAd(null);
  };

  // Function to select an ad
  const selectAd = (ad) => {
    setSelectedAd(ad);
  };

  return (
    <div>
      {/* Search panel */}
      <div className="search-box text-center text-white bg-primary me-2 p-2">
        <h3>Search</h3>
        <div className="d-flex flex-wrap justify-content-center">
          <input
            type="text"
            className="form-control w-25 d-flex flex-wrap justify-content-center me-2"
            placeholder="District"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-25 d-flex flex-wrap justify-content-center me-2"
            placeholder="Animal Type"
            value={animalTypeInput}
            onChange={(e) => setAnimalTypeInput(e.target.value)}
          />
          <button onClick={searchAds} className="btn btn-light me-2">Search</button>
        </div>
      </div>

      {/* Main content */}
      <div>
        {selectedAd ? (
          <AdDetails key={selectedAd.id} selectedAd={selectedAd} closeAd={closeAd} />
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading ? (
                <p className="text-center" style={{ height: '570px' }}>Loading ads...</p>
              ) : error ? (
                <p className="text-center" style={{ height: '570px', color: 'red' }}>{error}</p>
              ) : filteredAds.length === 0 ? (
                <p className="text-center" style={{ height: '570px' }}>No ads found.</p>
              ) : (
                currentAds.map((pet) => (
                  <Card
                    key={pet.id}
                    pet={pet}
                    onClick={() => selectAd(pet)}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredAds.length > 0 && (
              <nav aria-label="pagination" className="m-auto">
                <ul className="pagination pagination-lg justify-content-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Searchforads;
