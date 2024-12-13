import React, { useState, useEffect } from 'react';
import Card from './mypropsCart';
import AdDetails from './myadDetale';
import { Alert } from 'react-bootstrap';

function FoundPets({ pets, currentPage, setCurrentPage }) {
    const [selectedAd, setSelectedAd] = useState(null); // Состояние для выбранного объявления
    const [petsList, setPetsList] = useState([]); // Состояние для списка питомцев
    const petsPerPage = 3;
    const totalPages = Math.ceil(petsList.length / petsPerPage);

    useEffect(() => {
        // Проверяем, есть ли данные в localStorage
        const storedPets = localStorage.getItem('petsList');
        if (storedPets) {
            setPetsList(JSON.parse(storedPets));
        } else {
            setPetsList(pets); // Если нет, загружаем данные из props
        }
    }, [pets]);

    // Сохраняем список питомцев в localStorage, когда он обновляется
    useEffect(() => {
        if (petsList.length > 0) {
            localStorage.setItem('petsList', JSON.stringify(petsList));
        }
    }, [petsList]);

    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = petsList.slice(indexOfFirstPet, indexOfLastPet);

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

    // Функция для обработки удаления питомца
    const handleDelete = (petId) => {
        const updatedPets = petsList.filter(pet => pet.id !== petId); // Удаляем питомца из списка
        setPetsList(updatedPets); // Обновляем состояние
        setSelectedAd(null); // Закрываем подробности объявления после удаления
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
                <AdDetails
                    selectedAd={selectedAd}
                    closeAd={closeAd}
                    onDelete={handleDelete}  // Передаем функцию удаления
                    onEdit={(pet) => {
                        console.log('Редактировать:', pet);
                    }}
                />
            ) : (
                <div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {currentPets.map(pet => (
                            <Card
                                key={pet.id}
                                pet={pet}
                                onClick={() => handleClickPet(pet)}
                            />
                        ))}
                    </div>
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
            )}
        </div>
    );
}

export default FoundPets;
