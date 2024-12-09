import React, { useState } from 'react';
import cat from '../png/кошка.jpg';
import goat from '../png/коза.jpeg';
import dog1 from '../png/собака1.jpg';
import hamster from '../png/хомяк.jpg';
import parrot from '../png/попугай.jpg';
import rat from '../png/крыса.jpg';
import Card from './propsCard';
import AdDetails from './adDetale'; 

const pet = [
    {
        "id": 26,
                "phone": "+37377765735",
                "name": "Иван",
                "kind": "кот",
                "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
                "description": "хороший",
                "mark": "вц123",
                "district": "Медвежий угол",
                "date": "2023-03-05",
                "registred": true
    },
    {
        "id": 26,
        "phone": "+37377765735",
        "name": "Иван",
        "kind": "кот",
        "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
        "description": "хороший",
        "mark": "вц123",
        "district": "Медвежий угол",
        "date": "2023-03-05",
        "registred": true
    },
    {
        "id": 26,
        "phone": "+37377765735",
        "name": "Иван",
        "kind": "кот",
        "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
        "description": "хороший",
        "mark": "вц123",
        "district": "Медвежий угол",
        "date": "2023-03-05",
        "registred": true
    },
    {
        "id": 26,
        "phone": "+37377765735",
        "name": "Иван",
        "kind": "кот",
        "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
        "description": "хороший",
        "mark": "вц123",
        "district": "Медвежий угол",
        "date": "2023-03-05",
        "registred": true
    },
    {
        "id": 26,
        "phone": "+37377765735",
        "name": "Иван",
        "kind": "кот",
        "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
        "description": "хороший",
        "mark": "вц123",
        "district": "Медвежий угол",
        "date": "2023-03-05",
        "registred": true
    },
    {
        "id": 26,
        "phone": "+37377765735",
        "name": "Иван",
        "kind": "кот",
        "photos": "/storage/images/vvCsfFK3CrF7s1W7SnrXbJfM5MwVj1FliqdwMEfs.png",
        "description": "хороший",
        "mark": "вц123",
        "district": "Медвежий угол",
        "date": "2023-03-05",
        "registred": true
    }
];

// Функция для сортировки по дате в убывающем порядке
const sortedAnimals = pet.sort((a, b) => new Date(b.date) - new Date(a.date));

function CardPats() {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6; // Количество карточек на одной странице
    const [selectedAnimal, setSelectedAnimal] = useState(null); // Состояние для выбранного животного

    // Индексы карточек для текущей страницы
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = sortedAnimals.slice(indexOfFirstCard, indexOfLastCard);

    // Количество страниц
    const totalPages = Math.ceil(sortedAnimals.length / cardsPerPage);

    // Функции для смены страниц
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Функция для открытия карточки питомца
    const openAnimalCard = (animal) => {
        setSelectedAnimal(animal);
    };

    // Функция для возврата к списку
    const closeAnimalCard = () => {
        setSelectedAnimal(null);
    };

    return (
        <div>
            {selectedAnimal ? (
                <AdDetails selectedAd={selectedAnimal} closeAd={closeAnimalCard} />
            ) : (
                <>
                    <div>
                        
                        <div className="d-flex flex-wrap justify-content-center">
                            {currentCards.map(pet => (
                                <Card key={pet.id} pet={pet} onClick={openAnimalCard} />
                            ))}
                        </div>


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
                </>
            )}
        </div>
    );
}

export default CardPats;
