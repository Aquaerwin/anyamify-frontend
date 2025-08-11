import Navigation from "./Navigation";
import Banner from "./Banner";
import Recommendation from "./Recommendation";
import Product from "./Product";
import Footer from "./Footer";

const HomePage = () => {
    return (
        <>
            <Navigation />
            <div className="container">
                <Banner />
                <Recommendation />
            </div>

            <div className="container" id="all-product">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <h2 className="text-center tagline mb-4 mt-5">All Product</h2>
                        <div className="input-group">
                            <form className="d-flex w-100">
                                <input className="searchInput" placeholder="cari sekarang..." />
                                <button className="primaryBtn">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Product />
            
            <Footer />
        </>
    );
};

export default HomePage;