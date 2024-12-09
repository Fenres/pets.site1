import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './MyAkc.css'; // Подключаем CSS

function MyAkc({ userData }) {
    const [showModal, setShowModal] = useState(false);
    const [editType, setEditType] = useState('');
    const [newValue, setNewValue] = useState('');

    // Открыть модальное окно и установить тип редактируемого поля (телефон или email)
    const handleEditClick = (type) => {
        setEditType(type);
        setNewValue(userData[type]); // Установить текущее значение телефона или email
        setShowModal(true);
    };

    // Закрыть модальное окно
    const handleClose = () => {
        setShowModal(false);
    };

    // Обновить значение телефона или email
    const handleSave = () => {
        if (editType === 'phone') {
            userData.phone = newValue; // Обновляем телефон
        } else if (editType === 'email') {
            userData.email = newValue; // Обновляем email
        }
        setShowModal(false);
    };

    return (
        <div>
            <div className="text-center text-white bg-primary m-2">
                <h1 className="text-center text-white bg-primary m-2">Личный кабинет</h1>
                <h2 className="text-center text-white bg-primary m-2">Информация о пользователе</h2>
            </div>
            <div className="container">
                <p><strong>Имя:</strong> {userData.name}</p>
                <p>
                    <strong>Телефон:</strong> {userData.phone}
                    <button className="btn btn-primary me-2 p-1" onClick={() => handleEditClick('phone')}>Изменить</button>
                </p>
                <p>
                    <strong>Email:</strong> {userData.email}
                    <button className="btn btn-primary me-2 p-1" onClick={() => handleEditClick('email')}>Изменить</button>
                </p>
                <p><strong>Дата регистрации:</strong> {userData.registrationDate}</p>
                <p><strong>Дней на сайте:</strong> {userData.daysOnSite}</p>
                <p><strong>Количество объявлений:</strong> {userData.adsCount}</p>
                <p><strong>Найденных животных:</strong> {userData.foundPets}</p>
                <button id="logoutButton" className="btn btn-danger" onClick={() => {}}>Выйти</button>
            </div>

            {/* Модальное окно для изменения телефона или email */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить {editType === 'phone' ? 'телефон' : 'email'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>

            <br />
        </div>
    );
}

export default MyAkc;
