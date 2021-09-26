import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { signup, getToken } from '../api';

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [goToLogin, setGoToLogin] = useState(false);

  function validateForm() {
    return username.length > 0 && email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const loginResp = await signup({ username, email, password });
    if (loginResp && loginResp.token){
      localStorage.setItem('authToken', JSON.stringify(loginResp));
      setLoggedIn(true)
    } else {
      alert("signup failed");
    }
  }

  React.useEffect(() => {
  }, [loggedIn]);

  if (getToken()) {
    return <Redirect to="/" />
  }

  if (goToLogin) {
    return <Redirect to="/login" />
  }

  return (
    <Container fluid style={{ padding: 40 }}>
      <h2>SignUp</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" style={{ marginTop: 40 }} disabled={!validateForm()}>
          Sign Up
        </Button>

        <Button block size="lg" type="submit" style={{ marginTop: 40, marginLeft: 40 }} onClick = {()=>setGoToLogin(true)}>
          Back to Login
        </Button>
      </Form>
    </Container>
  );
}