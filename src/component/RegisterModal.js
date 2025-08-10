// File: src/component/RegisterModal.js
import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Contex } from './MyContex';

function RegisterModal() {
  const { showRegisterModal, handleCloseRegister, registerAction, handleShowLogin } = useContext(Contex);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await registerAction({ name, email, password });
    if (result.success) {
        setSuccess('Pendaftaran berhasil! Silakan login.');
        setTimeout(() => {
            handleCloseRegister();
            handleShowLogin();
        }, 2000);
    } else {
        setError(result.message);
    }
  };

  return (
    <Modal show={showRegisterModal} onHide={handleCloseRegister} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In (Daftar)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control type="text" placeholder="Masukkan nama" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control type="email" placeholder="masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="secondBtn w-100">Daftar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;