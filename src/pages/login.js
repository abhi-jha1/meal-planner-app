import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { login, getToken } from '../api';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [goToSignUp, setGoToSignUp] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (email && password) {
      const loginResp = await login({ email, password });
      if (loginResp && loginResp.token) {
        localStorage.setItem('authToken', JSON.stringify(loginResp));
        setLoggedIn(true);
      } else {
        alert("login failed");
      }
    }
  }

  React.useEffect(() => {
  }, [loggedIn, goToSignUp]);

  if (getToken()) {
    return <Redirect to="/" />
  }

  if (goToSignUp) {
    return <Redirect to="/signUp"/>;
  }
 

  return (
    <Container fluid style={{ padding: 40 }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button block size="lg" type="submit" style={{ marginTop: 40, marginRight:20}} disabled={!validateForm()}>
          Login
        </Button>
    
        <Button block size="lg" style={{ marginTop: 40,marginLeft:20 }} onClick = {()=>setGoToSignUp(true)}>
          SignUp
        </Button>
      </Form>
    </Container>
  );
}