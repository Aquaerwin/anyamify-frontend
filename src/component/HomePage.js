// File: src/component/HomePage.js

import Navigation from "./Navigation";
import Banner from "./Banner"; // Ganti nama jika berbeda
import Recommendation from "./Recommendation";
import Product from "./Product";

const HomePage = () => {
    return (
        <>
            <Navigation />
            <div className="container">
                {/* Provider sudah dipindah ke App.js */}
                <Banner />
                <Recommendation />
                <Product />
            </div>
        </>
    );
};

export default HomePage;