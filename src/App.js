import HomePage from "./component/HomePage";
import { Provider } from "./component/MyContex";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import AddToCartModal from "./component/AddToCartModal";
import CartModal from "./component/CartModal";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
    return (
        <Provider>
            <HomePage />
            <LoginModal />
            <RegisterModal />
            <AddToCartModal />
            <CartModal />
        </Provider>
    );
}

export default App;