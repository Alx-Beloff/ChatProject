import React, { useState } from 'react';
import { Col, Button, Row, Container, Form, FloatingLabel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import type { UserSignUpType } from '../../types/userTypes';
import { loginThunk, signUpThunk } from '../../redux/slices/auth/authThunks';
import { setError } from '../../redux/slices/auth/authSlice';
import spotchatIcon from '../../../public/SpotChatLogo.png';

export default function LoginPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formattedTel, setFormattedTel] = useState('');

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const tel = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (tel.length >= 1) {
      formatted = `+7 (${tel.substring(1, 4)}`;
    }
    if (tel.length >= 4) {
      formatted += `) ${tel.substring(4, 7)}`;
    }
    if (tel.length >= 7) {
      formatted += ` ${tel.substring(7, 9)}`;
    }
    if (tel.length >= 9) {
      formatted += `-${tel.substring(9, 11)}`;
    }

    setFormattedTel(formatted);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;

    if (formData.email.length < 3) {
      return void dispatch(setError('Введите email'));
    }
    if (formData.password === '') {
      return void dispatch(setError('Введите пароль'));
    }
    if (formData.password && formData.password.length < 6) {
      return void dispatch(setError('Пароль должен быть не менее 6 символов'));
    }

    if (pathname === '/signup') {
      if (!formData.username || formData.username.length < 1) {
        return void dispatch(setError('Введите имя чтобы зарегистрироваться'));
      }
      if (formData.username && formData.username.length > 30) {
        return void dispatch(setError('Имя должно быть не более 30 символов'));
      }
      if (formData.tel && formData.tel === '+7') {
        return void dispatch(setError('Введите номер телефона чтобы зарегистрироваться'));
      }
      if (formData.tel && !/^.{18}$/.test(formData.tel)) {
        return void dispatch(setError('Телефон должен быть в формате +7 (999) 999 99-99'));
      }
      void dispatch(signUpThunk(formData));
    } else {
      void dispatch(loginThunk(formData));
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="mb-3 mt-md-4">
            {pathname === '/signup' ? (
              <>
                <div className="d-flex justify-content-center mb-4">
                  <img src={spotchatIcon} alt="logo" width="160" height="160" />
                </div>
                <h2
                  className="fw-bold mb-4 d-flex justify-content-center"
                  style={{ color: '#313131', textShadow: '0 0 1px rgba(0, 0, 0, 0.11)' }}
                >
                  Регистрация
                </h2>
                <p
                  className=" mb-5 d-flex justify-content-center"
                  style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                >
                  Пожалуйста, введите данные для регистрации!
                </p>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center mb-5">
                  <img src={spotchatIcon} alt="logo" width="200" height="200" />
                </div>
                <h1
                  className="fw-bold mb-4 d-flex justify-content-center"
                  style={{ color: '#313131', textShadow: '0 0 1px rgba(0, 0, 0, 0.11)' }}
                >
                  SpotChat
                </h1>
                <p
                  className=" mb-5 d-flex justify-content-center"
                  style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                >
                  Пожалуйста, введите email и пароль для авторизации!
                </p>
              </>
            )}

            <div className="mb-3">
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <FloatingLabel className="text-center" label="Email">
                    <Form.Control name="email" type="email" placeholder="Введите email" />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <FloatingLabel className="text-center" label="Пароль">
                    <Form.Control name="password" type="password" placeholder="Введите пароль" />
                  </FloatingLabel>
                </Form.Group>

                {pathname === '/signup' && (
                  <>
                    <Form.Group className="mb-4" controlId="formBasicName">
                      <FloatingLabel className="text-center" label="Имя">
                        <Form.Control name="username" type="text" placeholder="Введите свое имя" />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPhone">
                      <FloatingLabel className="text-center" label="Телефон">
                        <Form.Control
                          name="tel"
                          type="tel"
                          value={formattedTel}
                          onChange={handleTelChange}
                          placeholder="Введите номер телефона"
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImg">
                      <Form.Label className="text-center">Аватар</Form.Label>
                      <Form.Control name="file" type="file" />
                    </Form.Group>
                  </>
                )}

                <div className="d-grid mt-5">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#7573f0',
                      color: 'white',
                      borderRadius: '20px',
                    }}
                  >
                    {pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}
                  </Button>
                </div>
              </Form>
              <div className="mt-3">
                {pathname === '/signup' ? (
                  <p className="mb-0  text-center " style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    Уже есть аккаунт?{' '}
                    <Button
                      variant="link"
                      onClick={() => navigate('/login')}
                      className="text-primary fw-normal"
                      style={{
                        textDecoration: 'none',
                        color: '#7573f0',
                        padding: 0,
                        margin: 0,
                        borderRadius: '20px',
                      }}
                    >
                      Вход
                    </Button>
                  </p>
                ) : (
                  <p className="mb-0  text-center" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    Еще нет аккаунта?{' '}
                    <Button
                      variant="link"
                      onClick={() => navigate('/signup')}
                      className="text-primary fw-normal"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      Регистрация
                    </Button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
