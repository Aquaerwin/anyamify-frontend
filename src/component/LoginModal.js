// File: src/component/LoginModal.js
import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Contex } from './MyContex';

function LoginModal() {
  const { showLoginModal, handleCloseLogin, loginAction, handleShowRegister } = useContext(Contex);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginAction({ email, password });
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <Modal show={showLoginModal} onHide={handleCloseLogin} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control type="email" placeholder="masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="primaryBtn w-100">Login</Button>
        </Form>
        <p className="text-center mt-3">
          Belum punya akun? <Button variant="link" onClick={handleShowRegister}>Daftar di sini</Button>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;