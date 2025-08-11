import React, { useContext } from 'react';
import { Modal, Button, ListGroup, Image } from 'react-bootstrap';
import { Contex } from './MyContex';

function CartModal() {
    const { showCartModal, handleCloseCart, cartItems, cartTotal, updateCartQuantity, removeFromCart } = useContext(Contex);

    return (
        <Modal show={showCartModal} onHide={handleCloseCart} size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Keranjang Saya</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cartItems.length === 0 ? (
                    <p className="text-center my-4">Keranjang Anda masih kosong.</p>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex align-items-center">
                                <Image src={item.image} alt={item.brand} style={{ width: '80px', height: '80px', objectFit: 'cover' }} rounded />
                                <div className="ms-3 flex-grow-1">
                                    <strong className="d-block">{item.brand}</strong>
                                    <span className="text-muted">Rp. {item.price.toLocaleString('id-ID')}</span>
                                    <div className="d-flex align-items-center mt-2">
                                        <Button size="sm" variant="outline-secondary" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button size="sm" variant="outline-secondary" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</Button>
                                        <Button variant="link" className="text-danger ms-auto p-0" onClick={() => removeFromCart(item.id)}>Hapus</Button>
                                    </div>
                                </div>
                                <div className="text-end fw-bold">
                                    <p className="mb-0">Rp. {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Modal.Body>
            {cartItems.length > 0 && (
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Total Harga:</strong>
                        <h4 style={{ color: 'var(--primaryColor)' }}>Rp. {cartTotal.toLocaleString('id-ID')}</h4>
                    </div>
                    <Button className="primaryBtn">Checkout</Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default CartModal;