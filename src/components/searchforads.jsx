import React, { useState, useEffect } from "react";
import Card from './propsCard';
import AdDetails from './adDetale';

const Searchforads = () => {
  const [pets, setPets] = useState([]); // Для хранения всех объявлений
  const [filteredAds, setFilteredAds] = useState([]); // Для хранения отфильтрованных объявлений
  const [regionInput, setRegionInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [animalTypeInput, setAnimalTypeInput] = useState("");
  const [selectedAd, setSelectedAd] = useState(null); // Для выбранного объявления
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 9;

  // Загружаем данные с API
  useEffect(() => {
    const fetchPetsData = async () => {
        try {
            const response = await fetch('https://pets.сделай.site/api/pets');
            const data = await response.json();
            
            // Debugging - log the data to ensure it's correct
            console.log('Fetched pets data:', data);

            if (data && data.data && data.data.orders) {
                setPets(data.data.orders);  // Assuming the API returns an array of pets under data.data.orders
                setFilteredAds(data.data.orders);  // Initially, set filtered ads to all pets
            }
        } catch (error) {
            console.error('Error fetching pet data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPetsData();
  }, []);

  // Функция для фильтрации объявлений по району и типу животного
  const searchAds = () => {
    const filtered = pets.filter((pet) => {
      const matchesRegion = pet.district.toLowerCase().includes(regionInput.toLowerCase());
      const matchesAnimalType = pet.kind.toLowerCase().includes(animalTypeInput.toLowerCase());
      return matchesRegion && matchesAnimalType;
    });
    console.log('Отфильтрованные объявления:', filtered); // Проверим результат фильтрации
    setFilteredAds(filtered);
    setCurrentPage(1);  // Сбросить на первую страницу после поиска
  };

  // Пагинация
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  // Функция для закрытия выбранного объявления
  const closeAd = () => {
    setSelectedAd(null);
  };

  // Функция для выбора объявления
  const selectAd = (ad) => {
    setSelectedAd(ad);
  };

  return (
    <div>
      {/* Панель поиска */}
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

      {/* Основное содержимое */}
      <div>
        {selectedAd ? (
          <AdDetails selectedAd={selectedAd} closeAd={closeAd} /> // Передаем выбранное объявление в AdDetails
        ) : (
          <>
            {/* Список объявлений */}
            <div className="d-flex flex-wrap justify-content-center">
              {filteredAds.length === 0 ? (
                <p className="text-center" style={{ height: '570px' }}>Объявлений не найдено.</p>
              ) : (
                currentAds.map((pet) => (
                  <Card
                    key={pet.id}
                    pet={pet}
                    onClick={() => selectAd(pet)}  // Передаем функцию выбора объявления
                  />
                ))
              )}
            </div>

            {/* Пагинация */}
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
