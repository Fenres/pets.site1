import React, { useState } from 'react';
import Card from './mypropsCart';
import AdDetails from './myadDetale';
import { Alert } from 'react-bootstrap';

function FoundPets({ pets, currentPage, setCurrentPage }) {
    const [selectedAd, setSelectedAd] = useState(null); // Состояние для выбранного объявления
    const petsPerPage = 3;
    const totalPages = Math.ceil(pets.length / petsPerPage);

    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

    // Обработка изменения страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Открытие объявления
    const handleClickPet = (pet) => {
        setSelectedAd(pet);
    };

    // Закрытие объявления
    const closeAd = () => {
        setSelectedAd(null);
    };

    return (
        <div>
            <h2 className="text-white bg-primary me-2 text-center">Найденные животные</h2>

            {currentPets.length === 0 && (
                <Alert variant="info" className="justify-content-center align-items-center fs-1 text-success text-center tst1 bg-success bg-opacity-25 w-100">
                    Нет найденных животных.
                </Alert>
            )}

         
            {selectedAd ? (
                <AdDetails selectedAd={selectedAd} closeAd={closeAd} />
            ) : (
                <div className="d-flex flex-wrap justify-content-center">
                    {currentPets.map(pet => (
                        <Card key={pet.id} pet={pet} onClick={() => handleClickPet(pet)} />
                    ))}
                </div>
            )}

            {/* Пагинация */}
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
        </div>
    );
}

export default FoundPets;
