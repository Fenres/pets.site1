import React, { useState, useEffect } from 'react';
import Card from './propsCard';
import AdDetails from './adDetale';

function CardPats() {
    const [pets, setPets] = useState([]);  // Initialize with an empty array
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [selectedAnimal, setSelectedAnimal] = useState(null); // State for selected animal card
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const cardsPerPage = 6;  // Number of cards per page

    // Fetch the data from the API
    useEffect(() => {
        const fetchPetsData = async () => {
            try {
                const response = await fetch('https://pets.сделай.site/api/pets');
                const data = await response.json();
                
                // Debugging - log the data to ensure it's correct
                console.log('Fetched pets data:', data);

                if (data && data.data && data.data.orders) {
                    setPets(data.data.orders);  // Assuming the API returns an array of pets under data.data.orders
                }
            } catch (error) {
                console.error('Error fetching pet data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPetsData();
    }, []);

    // Pagination logic
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = pets.length ? pets.slice(indexOfFirstCard, indexOfLastCard) : [];  // Ensure pets is always an array
    const totalPages = Math.ceil(pets.length / cardsPerPage);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to open animal card details
    const openAnimalCard = (animal) => {
        setSelectedAnimal(animal);
    };

    // Function to close the animal card details
    const closeAnimalCard = () => {
        setSelectedAnimal(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {selectedAnimal ? (
                <AdDetails selectedAd={selectedAnimal} closeAd={closeAnimalCard} />
            ) : (
                <>
                    <div className="d-flex flex-wrap justify-content-center">
                        {currentCards.length > 0 ? (
                            currentCards.map(pet => (
                                <Card key={pet.id} pet={pet} onClick={openAnimalCard} />
                            ))
                        ) : (
                            <p>No pets available.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
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
    );
}

export default CardPats;
