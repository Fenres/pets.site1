import React, { useState } from "react";
import cat from '../png/кошка.jpg';
import goat from '../png/коза.jpeg';
import dog1 from '../png/собака1.jpg';
import hamster from '../png/хомяк.jpg';
import parrot from '../png/попугай.jpg';
import rat from '../png/крыса.jpg';
import Card from './propsCard';
import AdDetails from './adDetale'; 

const Searchforads = () => {
  const [pet] = useState([
    {
      id: 14,
      type: 'Кошка',
      description: 'Потерялась кошка, пушистая, серая. Любит играть, ласковая.',
      chip: 'ca-001-spb',
      district: 'Василиостровский',
      date: '24-03-2020',
      src: cat
    },
    {
      id: 18,
      type: 'Коза',
      description: 'Потерялась коза, последний раз видели в здании Московского вокзала г. Санкт-Петербург. Коза белая, пуховая.',
      chip: 'go-011-spb',
      district: 'Центральный',
      date: '14-03-2022',
      src: goat
    },
    {
      id: 22,
      type: 'Собака',
      description: 'Потерялась собака, больших размеров, коричневого цвета. Отзывчивая, дружелюбная.',
      chip: 'dog-123-msk',
      district: 'Московский',
      date: '01-04-2023',
      src: dog1
    },
    {
      id: 25,
      type: 'Хомяк',
      description: 'Сбежал хомяк, маленький, серый. Любит семечки.',
      chip: '(нет)',
      district: 'Фрунзенский',
      date: '10-05-2023',
      src: hamster
    },
    {
      id: 28,
      type: 'Попугай',
      description: 'Улетел попугай, зеленый, с красной грудкой. Говорит "Привет!".',
      chip: '(нет)',
      district: 'Адмиралтейский',
      date: '20-06-2023',
      src: parrot
    },
    {
      id: 31,
      type: 'Крыса',
      description: 'Сбежала декоративная крыса, белая, с розовыми ушками. Очень дружелюбная.',
      chip: '(нет)',
      district: 'Выборгский',
      date: '25-07-2023',
      src: rat
    },
  ]);

  const [regionInput, setRegionInput] = useState("");
  const [animalTypeInput, setAnimalTypeInput] = useState("");
  const [filteredAds, setFilteredAds] = useState(pet);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState(null); // Manage selectedAd here

  const adsPerPage = 9;

  const searchAds = () => {
    const filtered = pet.filter((pet) => {
      const matchesRegion = pet.district.toLowerCase().includes(regionInput.toLowerCase());
      const matchesAnimalType = pet.type.toLowerCase().includes(animalTypeInput.toLowerCase());
      return matchesRegion && matchesAnimalType;
    });
    setFilteredAds(filtered);
    setCurrentPage(1);  // Reset to the first page after search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  // Function to close the selected ad
  const closeAd = () => {
    setSelectedAd(null);
  };

  // Function to select an ad (sets the selectedAd)
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
          <AdDetails selectedAd={selectedAd} closeAd={closeAd} /> // Pass selectedAd as a prop to AdDetails
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
                    onClick={() => selectAd(pet)}  // Pass the onClick handler to Card
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
