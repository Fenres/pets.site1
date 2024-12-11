import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './MyAkc.css'; // Подключаем CSS

function MyAkc(props) {

    const [editingField, setEditingField] = useState(null); // Поле, которое редактируется
    const [editedValue, setEditedValue] = useState(''); // Новое значение поля
    const [successMessage, setSuccessMessage] = useState(''); // Сообщения об успешных действиях

    if (!props.data) {
        return <div>Нет данных для отображения.</div>; // Проверка, если нет данных
    }

    // Функция для расчета количества дней на сайте
    const calculateDaysOnSite = (registrationDate) => {
        const currentDate = new Date();
        const regDate = new Date(registrationDate);
        const timeDiff = currentDate - regDate;
        return Math.floor(timeDiff / (1000 * 3600 * 24)); // Количество дней
    };

    const handleEditClick = (field) => {
        setEditingField(field);
        setEditedValue(props.data[field]); // Используем props.data
    };

    const handleSaveEdit = () => {
        // Логика для отправки измененного значения на сервер
        // После успешного обновления:
        setSuccessMessage(`Поле ${editingField} успешно обновлено!`);
        setEditingField(null);
    };

    const handleCancelEdit = () => {
        setEditingField(null); // Закрыть режим редактирования
    };

    return (
        <div>
            <h1 className="text-center text-white bg-primary m-2">Личный кабинет</h1>
            <h2 className="text-center text-white bg-primary m-2">Информация о пользователе</h2>

            <div className="container">
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                {editingField ? (
                    <div>
                        <div className="mb-3">
                            <label className="form-label">{editingField.charAt(0).toUpperCase() + editingField.slice(1)}</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                        </div>
                        <Button variant="success" onClick={handleSaveEdit}>Сохранить</Button>
                        <Button variant="secondary" onClick={handleCancelEdit} className="ms-2">Отмена</Button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Имя:</strong> {props.data.name}</p>
                        <p>
                            <strong>Телефон:</strong> {props.data.phone}
                            <Button className="btn btn-primary me-2 p-1" onClick={() => handleEditClick('phone')}>Изменить</Button>
                        </p>
                        <p>
                            <strong>Email:</strong> {props.data.email}
                            <Button className="btn btn-primary me-2 p-1" onClick={() => handleEditClick('email')}>Изменить</Button>
                        </p>
                        <p><strong>Дата регистрации:</strong> {props.data.registrationDate}</p>
                        <p><strong>Дней на сайте:</strong> {calculateDaysOnSite(props.data.registrationDate)}</p>
                        <p><strong>Количество объявлений:</strong> {props.data.ordersCount}</p>
                        <p><strong>Найденных животных:</strong> {props.data.petsCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyAkc;
