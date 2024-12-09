import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; 
import logo from '../png/logo.jpg';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoginTabActive, setIsLoginTabActive] = useState(true);
  
  const location = useLocation();

  // Login Form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form state
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");

  const isActive = (path) => location.pathname === path;

  // Handle opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Handle tab switch between login and registration
  const handleTabSwitch = (isLogin) => setIsLoginTabActive(isLogin);

  // Form submission handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login email:", loginEmail, "Password:", loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register info:", registerName, registerPhone, registerEmail);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} className="w-25 rounded-3" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'disabled' : ''}`} aria-current="page">
                  Главная
                </Link>
              </li>
              <li className="nav-item">
              <Link
                  to="/myAccount"
                  className={`nav-link ${isActive('/myAccount') ? 'disabled' : ''}`} >
                  Личный кабинет
                </Link>
              </li>
              <li className="nav-item">
              <Link
                  to="/petsAdd"
                  className={`nav-link ${isActive('/petsAdd') ? 'disabled' : ''}`} >
                  Добавить объявление
                </Link>
              </li>
              <li className="nav-item">
              <Link
                  to="/petsSearch"
                  className={`nav-link ${isActive('/petsSearch') ? 'disabled' : ''}`} >
                  Поиск по объявлениям
                </Link>
              </li>
            </ul>
            <Button className="btn btn-primary me-2  mb-2 mb-lg-0" onClick={handleShowModal}>
              Вход / Регистрация
            </Button>

            {/* Search Bar */}
            <form className="d-flex  mb-2 mb-lg-0 " onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                list="pets"
                placeholder="Поиск"
                aria-label="Search"
              />
              <button className="btn btn-primary me-2">Поиск</button>
            </form>
          </div>
        </div>
      </nav>

 
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="nav nav-tabs" id="authTabs" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${isLoginTabActive ? 'active' : ''}`}
                onClick={() => handleTabSwitch(true)}
              >
                Вход
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${!isLoginTabActive ? 'active' : ''}`}
                onClick={() => handleTabSwitch(false)}
              >
                Регистрация
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3">
            {isLoginTabActive ? (
              <form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="w-100">Войти</Button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Подтверждение пароля</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerPasswordConfirm}
                    onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Согласие на обработку данных"
                  required
                />
                <Button type="submit" className="w-100">Зарегистрироваться</Button>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
