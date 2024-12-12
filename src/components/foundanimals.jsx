import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext'; // Assuming you have an AuthContext for managing token

import Card from './propsCard';
import AdDetails from './adDetale'; 
import { Button, Alert } from 'react-bootstrap';




function FoundPets() {
  const { authToken } = useAuth(); // Auth token for API requests
  const [pets, setPets] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null); // For selected animal details
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3; // Number of pets per page
  const [errorMessages, setErrorMessages] = useState([]); // For error handling

  // Pagination logic
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(pets.length / petsPerPage);

  useEffect(() => {
    fetchPets();
  }, [authToken]);

  const fetchPets = async () => {
    if (!authToken) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(`https://pets.сделай.site/api/users/orders`, requestOptions);
      const data = await response.json();
      
      if (response.status === 200) {
        setPets(data.data.orders);
      } else if (response.status === 204) {
        setPets([]);
      } else {
        setErrorMessages([data.error?.message || 'Error fetching data']);
      }
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  // Handle pagination change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open pet details
  const openAnimalCard = (pet) => {
    setSelectedAnimal(pet);
  };

  // Close selected pet details
  const closeAnimalCard = () => {
    setSelectedAnimal(null);
  };

  return (
    <div>
      <h2 className="text-white bg-primary me-2 text-center">Найденные животные</h2>

      {errorMessages.length > 0 && (
        <Alert variant="danger" className="mt-3">
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </Alert>
      )}

      {selectedAnimal ? (
        <AdDetails selectedAd={selectedAnimal} closeAd={closeAnimalCard} />
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center">
            {currentPets.map(pet => (
              <Card key={pet.id} pet={pet} onClick={openAnimalCard} />
            ))}
          </div>

          {/* Pagination */}
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
        </>
      )}
    </div>
  );
}

export default FoundPets;
