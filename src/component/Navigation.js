// File: src/component/Navigation.js

import { useContext } from 'react';
import { Contex } from './MyContex';

const Navigation = () => {
    const { isAuthenticated, handleShowLogin, handleShowRegister, logoutAction } = useContext(Contex);

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                {/* --- PERUBAHAN DI SINI --- */}
                <a className="navbar-brand" href="/">
                    Anyamify
                </a>
                {/* --- BATAS PERUBAHAN --- */}

                {/* ... sisa kode tidak berubah ... */}
                <li className="ms-auto me-2 d-flex align-items-center d-lg-none">
                    <button className="btnIcon mx-2">
                        <i className="bi bi-cart position-relative">
                            <div className="circleBadge position-absolute top-0 end-0"></div>
                        </i>
                    </button>
                </li>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link mx-2 active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-2" href="#all-product">Product</a>
                        </li>
                        <li className="d-lg-flex align-items-center d-none">
                            <button className="btnIcon mx-2">
                                <i className="bi bi-cart position-relative">
                                    <div className="circleBadge position-absolute top-0 end-0"></div>
                                </i>
                            </button>
                        </li>
                    </ul>
                    <div className="d-flex btnWrapper mt-lg-0 mt-5">
                        {isAuthenticated ? (
                            <>
                                <button className="w-100 secondBtn">Profile</button>
                                <button onClick={logoutAction} className="w-100 primaryBtn">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleShowRegister} className="w-100 secondBtn">Sign In</button>
                                <button onClick={handleShowLogin} className="w-100 primaryBtn">Login</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;