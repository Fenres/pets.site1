import React, { useState, useEffect } from 'react';
import Card from './propsCard';
import AdDetails from './adDetale';

function CardPats() {
    const [pets, setPets] = useState([]);  // Initialize with an empty array
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [selectedAnimal, setSelectedAnimal] = useState(null); // State for selected animal card

    // Fetch the data from the API
    useEffect(() => {
        const fetchPetsData = async () => {
            try {
                const response = await fetch('https://pets.сделай.site/api/pets');
                const data = await response.json();

                // Debugging - log the data to ensure it's correct
                console.log('Fetched pets data:', data);

                if (data && data.data && data.data.orders) {
                    // Sort the pets data by created_at (assuming it's the timestamp field) in descending order
                    const sortedPets = data.data.orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    
                    // Slice the first 6 pets (latest 6)
                    setPets(sortedPets.slice(0, 6));
                }
            } catch (error) {
                console.error('Error fetching pet data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPetsData();
    }, []);

    // Function to open animal card details
    const openAnimalCard = (animal) => {
        setSelectedAnimal(animal);
    };

    // Function to close the animal card details
    const closeAnimalCard = () => {
        setSelectedAnimal(null);
    };

    if (isLoading) {
        return (
            <div className="loader ">
                <div className=" text-center tst bg-success bg-opacity-25 w-100">Загрузка...</div>
            </div>
        );
    }

    return (
        <div>
            {selectedAnimal ? (
                <AdDetails selectedAd={selectedAnimal} closeAd={closeAnimalCard} />
            ) : (
                <>
                    <div className="d-flex flex-wrap justify-content-center">
                        {pets.length > 0 ? (
                            pets.map(pet => (
                                <Card key={pet.id} pet={pet} onClick={openAnimalCard} />
                            ))
                        ) : (
                            <p>No pets available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CardPats;
