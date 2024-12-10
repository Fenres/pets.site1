import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import logo from '../png/logo.jpg';

const Header = () => {
  const [showModal, setShowModal] = useState(false); // Controls the login/registration modal
  const [isLoginTabActive, setIsLoginTabActive] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false); // Controls the forgot password modal
  
  const location = useLocation();

  // Login Form state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form state
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState(false); // Checkbox for consent
  
  const [errorMessages, setErrorMessages] = useState([]); // To store validation errors

  const isActive = (path) => location.pathname === path;

  // Handle opening and closing the modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Handle tab switch between login and registration
  const handleTabSwitch = (isLogin) => setIsLoginTabActive(isLogin);

  // Form Validation for Registration
  const validateRegistration = () => {
    const errors = [];

    const nameRegex = /^[А-Яа-яЁё\s-]+$/;
    if (!nameRegex.test(registerName)) {
      errors.push('Имя должно содержать только кириллицу, пробелы и дефисы.');
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(registerPhone)) {
      errors.push('Телефон должен содержать только цифры и знак +.');
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(registerEmail)) {
      errors.push('Email должен быть в правильном формате.');
    }

    // Updated password regex for validation
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{7,}$/;
    if (!passwordRegex.test(registerPassword)) {
      errors.push('Пароль должен содержать хотя бы 7 символов, одну строчную и одну заглавную букву, цифры .');
    }

    // Password confirmation validation
    if (registerPassword !== registerPasswordConfirm) {
      errors.push('Пароли не совпадают.');
    }

    // Consent validation
    if (!registerConfirm) {
      errors.push('Необходимо согласие на обработку данных.');
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegistration()) {
      return; // If validation fails, prevent form submission
    }

    // Clear any previous errors before making a request
    setErrorMessages([]);

    const registrationData = {
      name: registerName,
      phone: registerPhone,
      email: registerEmail,
      password: registerPassword,
      password_confirmation: registerPasswordConfirm,  // Sending password confirmation as a separate field
      confirm: registerConfirm ? "true" : "false", // Ensure `confirm` is sent as a string ("true" or "false")
    };

    try {
      const response = await fetch('https://pets.сделай.site/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 204) {
        // Successful registration
        alert('Регистрация прошла успешно!');
        handleCloseModal(); // Close the modal
      } else if (response.status === 422) {
        // Validation error
        const errorData = await response.json();
        
        // Safe check if errorData is a valid object
        if (errorData && errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setErrorMessages(errorMessages);
        } else {
          setErrorMessages(['Неизвестная ошибка']);
        }
      } else {
        throw new Error('Что-то пошло не так, попробуйте позже.');
      }
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Simple client-side validation for login
    if (!loginPhone || !loginPassword) {
      setErrorMessages(['Телефон и пароль обязательны для ввода']);
      return;
    }

    const loginData = {
      email: loginPhone,
      password: loginPassword,
    };

    try {
      const response = await fetch('https://pets.сделай.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        alert('Вход успешен!');
        handleCloseModal(); // Close the modal on successful login
      } else {
        const errorData = await response.json();
        
        // Safe check if errorData is a valid object
        if (errorData && errorData.message) {
          setErrorMessages([errorData.message || 'Ошибка входа']);
        } else {
          setErrorMessages(['Неизвестная ошибка']);
        }
      }
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    alert('Поиск по объявлениям...');
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

      {/* Main Modal (Login/Registration) */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLoginTabActive ? 'Авторизация' : 'Регистрация'}</Modal.Title>
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

          {errorMessages.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errorMessages.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Login Form */}
          {isLoginTabActive ? (
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
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
              <Button type="submit" className="w-100">
                Войти
              </Button>
            </Form>
          ) : (
            // Registration Form
            <Form onSubmit={handleRegisterSubmit}>
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
                checked={registerConfirm}
                onChange={() => setRegisterConfirm(!registerConfirm)}
              />
              <Button type="submit" className="w-100" disabled={errorMessages.length > 0}>
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
