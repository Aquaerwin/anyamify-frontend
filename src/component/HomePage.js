import { useContext, useState } from "react";
import Banner from "./Banner";
import Navigation from "./Navigation";
import Product from "./Product";
import Recommendation from "./Recommendation";
import { Contex } from "./MyContex";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { handleSearch } = useContext(Contex);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

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
                            <form className="d-flex w-100" onSubmit={onSearchSubmit}>
                                <input
                                    className="searchInput"
                                    placeholder="cari sekarang..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="primaryBtn">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Product />
        </>
    );
};

export default HomePage;