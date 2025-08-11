import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Contex } from './MyContex';

function AddToCartModal() {
    const { selectedProduct, handleCloseAddToCart, addToCart } = useContext(Contex);
    const [quantity, setQuantity] = useState(1);

    if (!selectedProduct) return null;

    const handleAddToCart = () => {
        addToCart(selectedProduct, quantity);
        handleCloseAddToCart();
    };
    
    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <Modal show={true} onHide={handleCloseAddToCart} centered dialogClassName="add-to-cart-modal">
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.brand}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <div className="modal-product-image-container">
                    <img src={selectedProduct.image} alt={selectedProduct.brand} className="modal-product-image" />
                </div>
                <h4>Rp. {selectedProduct.price.toLocaleString('id-ID')}</h4>
                <div className="d-flex justify-content-center align-items-center my-3">
                    <Button variant="outline-secondary" onClick={decrement}>-</Button>
                    <span className="mx-3 fs-5 fw-bold">{quantity}</span>
                    <Button variant="outline-secondary" onClick={increment}>+</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="primaryBtn w-100" onClick={handleAddToCart}>
                    Masukkan Keranjang
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddToCartModal;