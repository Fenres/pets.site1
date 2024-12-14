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

  // Функция для получения данных с сервера
  const fetchPetsData = async (district, kind) => {
    setIsLoading(true);
    try {
      // Подготовка URL без кодирования
      const requestUrl = `/api/search/order/?district=${district || ""}&kind=${kind || ""}`;
      console.log('Запрос отправлен на:', requestUrl);

      const response = await fetch(`https://pets.xn--80ahdri7a.site${requestUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Проверка ответа
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data && data.data.orders) {
        setPets(data.data.orders);
        setFilteredAds(data.data.orders);
      } else {
        setFilteredAds([]);
      }
    } catch (error) {
      console.error('Ошибка при запросе данных:', error);
      setFilteredAds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для поиска объявлений
  const searchAds = () => {
    if (!regionInput && !animalTypeInput) {
      alert('Пожалуйста, введите хотя бы один параметр для поиска.');
      return;
    }
    fetchPetsData(regionInput, animalTypeInput); // Отправка данных на сервер
    setCurrentPage(1); // Сброс страницы на первую
  };

  // Логика пагинации
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

      {/* Основной контент */}
      <div>
        {selectedAd ? (
          <AdDetails key={selectedAd.id} selectedAd={selectedAd} closeAd={closeAd} />
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading ? (
                <p className="text-center" style={{ height: '570px' }}>Загрузка объявлений...</p>
              ) : filteredAds.length === 0 ? (
                <p className="text-center" style={{ height: '570px' }}>Объявлений не найдено.</p>
              ) : (
                currentAds.map((pet) => (
                  <Card
                    key={pet.id}
                    pet={pet}
                    onClick={() => selectAd(pet)}
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
