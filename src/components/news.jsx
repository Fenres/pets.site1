import React, { useState } from 'react';

function News() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to handle the subscription here
    alert(`Thank you for subscribing with ${email}`);
  };

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-2">
        Подписка на новости
      </h2>
      <form 
        className="w-50 m-auto p-3" 
        style={{ minWidth: 300 }} 
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Введите адрес электронной почты
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            Мы никогда не делимся Вашими e-mail ни с кем.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Подписаться
        </button>
      </form>
    </div>
  );
}

export default News;