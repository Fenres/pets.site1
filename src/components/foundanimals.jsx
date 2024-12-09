import React, { useState } from 'react';
import cat from '../png/кошка.jpg';
import goat from '../png/коза.jpeg';
import Card from './propsCard';
import AdDetails from './adDetale'; 

function FoundPets() {
  // Данные о найденных животных (могут быть загружены с API)
  const [pets, setPets] = useState([
    {
      id: 14,
      type: 'Кошка',
      description: 'Потерялась кошка, пушистая, серая. Любит играть, ласковая.',
      chipNumber: 'ca-001-spb',
      district: 'Василиостровский',
      date: '24-03-2020',
      src: cat
    },
    {
      id: 18,
      type: 'Коза',
      description: 'Потерялась коза, последний раз видели в здании Московского вокзала г. Санкт-Петербург. Коза белая, пуховая.',
      chipNumber: 'go-011-spb',
      district: 'Центральный',
      date: '14-03-2022',
      src: goat
    }
    // Добавьте другие объекты животных при необходимости
  ]);

  const [selectedAnimal, setSelectedAnimal] = useState(null); // Для выбранного животного
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3; // Количество карточек на странице

  // Индексы для пагинации
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const totalPages = Math.ceil(pets.length / petsPerPage);

  // Функция для переключения страниц
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Функция для открытия карточки животного
  const openAnimalCard = (pet) => {
    setSelectedAnimal(pet);
  };

  // Функция для закрытия карточки
  const closeAnimalCard = () => {
    setSelectedAnimal(null);
  };

  return (
    <div><h2 className="text-white bg-primary me-2 text-center">Найденные животные</h2>
      {selectedAnimal ? (
        <AdDetails selectedAd={selectedAnimal} closeAd={closeAnimalCard} />
      ) : (
        <>
          
          <div className="d-flex flex-wrap justify-content-center">
            {currentPets.map(pet => (
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
        </>
      )}
    </div>
  );
}

export default FoundPets;
