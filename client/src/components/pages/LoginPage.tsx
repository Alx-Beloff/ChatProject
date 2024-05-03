import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';
import { loginThunk, signUpThunk } from '../../redux/slices/auth/authThunks';

export default function LoginPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget)) as
      | UserLoginType
      | UserSignUpType;

    if (pathname === '/signup') {
      void dispatch(signUpThunk(formData as UserSignUpType));
    } else {
      void dispatch(loginThunk(formData as UserLoginType));
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                {pathname === '/signup' ? (
                  <>
                    <h2 className="fw-bold mb-2 ">Регистрация в SpotChat!</h2>
                    <p className=" mb-5">Пожалуйста, введите данные для регистрации!</p>
                  </>
                ) : (
                  <>
                    <h2 className="fw-bold mb-2 ">Добро пожаловать в SpotChat!</h2>
                    <p className=" mb-5">Пожалуйста, введите логин и пароль для авторизации!</p>
                  </>
                )}

                <div className="mb-3">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">Email</Form.Label>
                      <Form.Control name="email" type="email" placeholder="Введите email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control name="password" type="password" placeholder="Ввеедите пароль" />
                    </Form.Group>

                    {pathname === '/signup' && (
                      <>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label className="text-center">Имя</Form.Label>
                          <Form.Control
                            name="username"
                            type="text"
                            placeholder="Введите свое имя"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicImg">
                          <Form.Label className="text-center">Аватар</Form.Label>
                          <Form.Control name="img" type="text" placeholder="Укажите адрес" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                          <Form.Label className="text-center">Телефон</Form.Label>
                          <Form.Control
                            name="tel"
                            type="text"
                            placeholder="Введите номер телефона"
                          />
                        </Form.Group>
                      </>
                    )}

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        {pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    {pathname === '/signup' ? (
                      <p className="mb-0  text-center">
                        Уже есть аккаунт?{' '}
                        <Button
                          variant="link"
                          onClick={() => navigate('/login')}
                          className="text-primary fw-normal"
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          Вход
                        </Button>
                      </p>
                    ) : (
                      <p className="mb-0  text-center">
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
