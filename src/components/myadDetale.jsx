import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';

const AdDetails = ({ selectedAd, closeAd, onEdit, onDelete, token }) => {
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
    const [deletionSuccess, setDeletionSuccess] = useState(false); // Состояние для отображения успеха удаления
    const [errorMessage, setErrorMessage] = useState(null); // Состояние для отображения ошибки
    const { authToken, setAuthToken } = useAuth(); // Get authToken from context

    // Функция для открытия модального окна
    const handleShowModal = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
        setShowModal(true);
    };

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Функция для обработки удаления
    const handleDelete = async () => {
        if (selectedAd.status !== 'active' && selectedAd.status !== 'onModeration') {
            setErrorMessage('Удаление доступно только для объявлений со статусом "active" или "onModeration".');
            return;
        }

        // Запрос на удаление
        const url = `https://pets.сделай.site/api/users/orders/${selectedAd.id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, // Токен авторизации
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Response:', data); // Логируем ответ от сервера

            if (response.status === 200) {
                setDeletionSuccess(true);
                onDelete(selectedAd.id);  // Удаляем питомца из списка на странице
                setTimeout(() => {
                    closeAd();  // Закрываем модальное окно через 1 секунду
                }, 1000);
            } else if (response.status === 401) {
                setErrorMessage('Ошибка авторизации. Пожалуйста, войдите в систему.');
            } else if (response.status === 403) {
                setErrorMessage('Удаление невозможно: доступ запрещен.');
            } else {
                setErrorMessage('Произошла ошибка при удалении.');
            }
        } catch (error) {
            console.error('Error during delete request:', error);
            setErrorMessage('Произошла ошибка при связи с сервером.');
        }
    };

    // Преобразуем `photos` в массив, если это строка или не массив
    const photosArray = Array.isArray(selectedAd.photos) 
        ? selectedAd.photos 
        : selectedAd.photos 
            ? [selectedAd.photos] 
            : []; // Если `photos` пустое, создаём пустой массив

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center mx-auto p-3" style={{ minHeight: '55vh' }}>
                <div className="card-details d-flex flex-wrap align-items-center border p-2" style={{ width: '90%', maxWidth: '1200px', height: 'auto' }}>
                    <div className="image-container" style={{ width: '100%', maxWidth: '600px' }}>
                        {photosArray.length > 0 ? (
                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                {photosArray.slice(0, 3).map((photo, index) => (
                                    <img
                                        key={index}
                                        src={`https://pets.сделай.site${photo}`}
                                        alt={`Изображение ${index + 1} ${selectedAd.kind}`}
                                        style={{
                                            height: 'auto',
                                            width: '100%',
                                            objectFit: 'contain',
                                            maxHeight: '550px',
                                        }}
                                        className="animal-image"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Фото отсутствует</p>
                        )}
                    </div>
                    <div className="text-container ms-4 mt-4 mt-md-0" style={{ flex: '1 1 auto' }}>
                        <h5>{selectedAd.kind || 'Неизвестное животное'}</h5>
                        <p><strong>ID:</strong> {selectedAd.id}</p>
                        <p><strong>Вид:</strong> {selectedAd.kind}</p>
                        <p><strong>Описание:</strong> {selectedAd.description}</p>
                        <p><strong>Номер чипа:</strong> {selectedAd.mark || 'Номер чипа не указан'}</p>
                        <p><strong>Район:</strong> {selectedAd.district}</p>
                        <p><strong>Дата:</strong> {selectedAd.date}</p>
                        <p><strong>Статус:</strong> {selectedAd.status}</p>

                        <div className="d-flex gap-3">
                            <button className="btn btn-primary" onClick={closeAd}>Назад к списку</button>
                            <button className="btn btn-info" onClick={() => onEdit(selectedAd)}>Редактировать</button>
                            <button className="btn btn-danger" onClick={handleShowModal}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно для подтверждения удаления */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение удаления</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deletionSuccess
                        ? 'Удаление прошло успешно.'
                        : errorMessage
                            ? errorMessage
                            : 'Вы уверены, что хотите удалить это объявление? Это действие невозможно отменить.'
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    {!deletionSuccess && !errorMessage && (
                        <Button variant="danger" onClick={handleDelete}>
                            Удалить
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdDetails;
