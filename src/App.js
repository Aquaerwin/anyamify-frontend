// File: src/App.js

import HomePage from "./component/HomePage";
import { Provider } from "./component/MyContex"; // Impor Provider
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal"; // Impor modal baru

// Impor CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    // Bungkus semua dengan Provider agar data bisa diakses
    <Provider>
      <HomePage />
      <LoginModal />
      <RegisterModal />
    </Provider>
  );
}

export default App;