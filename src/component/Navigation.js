import { useContext } from 'react';
import { Contex } from './MyContex';

const Navigation = () => {
    const { isAuthenticated, handleShowLogin, handleShowRegister, logoutAction, cartItemCount, handleShowCart } = useContext(Contex);

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">Anyamify</a>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link mx-2 active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-2" href="#all-product">Product</a>
                        </li>
                        <li className="d-lg-flex align-items-center d-none">
                            <button className="btnIcon mx-2 position-relative" onClick={handleShowCart}>
                                <i className="bi bi-cart"></i>
                                {cartItemCount > 0 && (
                                    <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartItemCount}
                                        <span className="visually-hidden">items in cart</span>
                                    </span>
                                )}
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