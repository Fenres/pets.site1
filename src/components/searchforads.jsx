import React, { useState, useEffect } from "react";
import Card from './propsCard';
import AdDetails from './adDetale';

const Searchforads = () => {
  const [pets, setPets] = useState([]); // To store all the pets
  const [filteredAds, setFilteredAds] = useState([]); // To store filtered pets
  const [regionInput, setRegionInput] = useState(""); // Region input
  const [animalTypeInput, setAnimalTypeInput] = useState(""); // Animal type input
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [selectedAd, setSelectedAd] = useState(null); // For the selected ad
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 9;

  // Fetch pets data from API
  const fetchPetsData = async (district, kind) => {
    setIsLoading(true);
    try {
      // URL encoding the parameters to ensure proper handling of non-Latin characters
      const query = new URLSearchParams();
      if (district) query.append('district', encodeURIComponent(district)); // Ensure encoding
      if (kind) query.append('kind', encodeURIComponent(kind)); // Ensure encoding

      
      // Log the request URL and parameters
      console.log("Fetching data from API with URL:",  `https://pets.сделай.site/api/search/order/?${query.toString()}`);

      const response = await fetch( `https://pets.сделай.site/api/search/order/?${query.toString()}`);
      const data = await response.json();

      // Log the API response
      console.log("API response:", data);

      if (data.data && data.data.orders) {
        setPets(data.data.orders);  // Store all pets
        setFilteredAds(data.data.orders);  // Set filtered ads to all initially
      } else {
        setFilteredAds([]); // If no data is returned, show empty
      }
    } catch (error) {
      console.error('Error fetching pet data:', error); // Log any errors
      setFilteredAds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle search when the button is clicked
  const searchAds = () => {
    console.log('Search initiated with Region:', regionInput, 'Kind:', animalTypeInput);
    fetchPetsData(regionInput, animalTypeInput); // Fetch data based on inputs
    setCurrentPage(1); // Reset page to first page after search
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

  // Function to select a particular ad
  const selectAd = (ad) => {
    setSelectedAd(ad);
  };

  return (
    <div>
      {/* Search panel */}
      <div className="search-box text-center text-white bg-primary me-2 p-2">
        <h3>Поиск</h3>
        <div className="d-flex flex-wrap justify-content-center">
          <input
            type="text"
            className="form-control w-25 d-flex flex-wrap justify-content-center me-2"
            placeholder="Район"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-25 d-flex flex-wrap justify-content-center me-2"
            placeholder="Вид животного"
            value={animalTypeInput}
            onChange={(e) => setAnimalTypeInput(e.target.value)}
          />
          <button onClick={searchAds} className="btn btn-light me-2">Найти</button>
        </div>
      </div>

      {/* Main content */}
      <div>
        {selectedAd ? (
          <AdDetails selectedAd={selectedAd} closeAd={closeAd} /> // Pass the selected ad to AdDetails
        ) : (
          <>
            {/* List of ads */}
            <div className="d-flex flex-wrap justify-content-center">
              {filteredAds.length === 0 ? (
                <p className="text-center" style={{ height: '570px' }}>Объявлений не найдено.</p>
              ) : (
                currentAds.map((pet) => (
                  <Card
                    key={pet.id}
                    pet={pet}
                    onClick={() => selectAd(pet)}  // Pass the selectAd function to Card component
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
