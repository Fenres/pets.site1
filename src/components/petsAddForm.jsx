import React from "react";

function PetsAddForm() {
  return (
    <div>
      <h1 className="text-white bg-primary m-2 text-center">Добавить объявление</h1>
      <div className="container">
        <form id="addPetForm" encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">ФИО:</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Телефон:</label>
            <input type="tel" className="form-control" id="phone" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label">Район:</label>
            <input type="text" className="form-control" id="district" required />
          </div>
          <div className="mb-3">
            <label htmlFor="photo1" className="form-label">Фото 1 (обязательно):</label>
            <input type="file" className="form-control" id="photo1" accept="image/*" required />
          </div>
          <div className="mb-3">
            <label htmlFor="photo2" className="form-label">Фото 2:</label>
            <input type="file" className="form-control" id="photo2" accept="image/*" />
          </div>
          <div className="mb-3">
            <label htmlFor="photo3" className="form-label">Фото 3:</label>
            <input type="file" className="form-control" id="photo3" accept="image/*" />
          </div>
          <div className="mb-3">
            <label htmlFor="chip" className="form-label">Чип:</label>
            <input type="text" className="form-control" id="chip" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Описание:</label>
            <textarea className="form-control" id="description" rows={3} defaultValue={""} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="confirm" required />
            <label className="form-check-label" htmlFor="confirm">Согласие на обработку данных</label>
          </div>
          <button type="submit" className="btn btn-primary ">Добавить</button>
          <div id="addPetMessage" />
        </form>
        <button type="button" className="btn btn-primary mt-2 mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Вход / Регистрация
        </button>
      </div>
      <br />
    </div>
  );
}

export default PetsAddForm;
