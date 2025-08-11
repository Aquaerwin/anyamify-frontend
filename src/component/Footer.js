import React from 'react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-12 mb-2 mb-md-0">
                        <p className="mb-0">
                            &copy; 2025 Anyamify. All Rights Reserved.
                        </p>
                    </div>
                    <div className="col-md-6 col-12 text-md-end">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://wa.me/087816105528" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="bi bi-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;