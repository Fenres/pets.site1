import React from 'react';

const Card = (props) => {
    const handleEdit = () => {
        // Вызовите функцию для редактирования, передав pet в качестве аргумента
        props.onEdit(props.pet);
    };

    const handleDelete = () => {
        // Вызовите функцию для удаления, передав id питомца
        props.onDelete(props.pet.id);
    };

    return (
        <div className="border card m-3" style={{ minWidth: 300, width: '30%' }} onClick={() => props.onClick(props.pet)}>
            <img
                src={'https://pets.сделай.site' + props.pet.photos}  // Используйте правильный URL для изображений
                className="card-img-top"
                alt={`Фото питомца ${props.pet.kind}`}  // Используем dynamic alt текст
                style={{ height: '60%', objectFit: 'contain', width: '100%' }}  // Обновлено для использования 'contain'
            />
            <div className="card-body">
                <h5 className="card-title">{props.pet.kind}</h5>  {/* Показываем тип животного */}
                <p className="card-text"><strong>ID:</strong> {props.pet.id}</p>
                <p className="card-text"><strong>Описание:</strong> {props.pet.description}</p>
                <p className="card-text"><strong>Номер чипа:</strong> {props.pet.mark || "Номер чипа не указан"}</p>
                <p className="card-text"><strong>Район:</strong> {props.pet.district}</p>
                <p className="card-text"><strong>Дата:</strong> {props.pet.date}</p>

                {/* Кнопки для редактирования и удаления */}
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleEdit}>Редактировать</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
