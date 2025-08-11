import { Contex } from "./MyContex";
import { useContext, useState, useEffect } from "react";

const Product = () => {
    const { filteredProducts, loading, handleShowAddToCart } = useContext(Contex);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const SkeletonCard = () => (
        <div className="col-3 mb-4">
            <div className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="row mt-5">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((p) => (
                        <div className="col-3 mb-4" key={p.id}>
                            <div className="product-card">
                                <div className="product-image-container">
                                    <img src={p.image} alt={p.brand} className="product-image" />
                                </div>
                                <div>
                                    <span className="title-brand">{p.brand}</span>
                                </div>
                                <div className="price-wraper d-flex justify-content-between align-items-center">
                                    <span className="title-price fw-bold">Rp. {p.price.toLocaleString('id-ID')}</span>
                                    <button className="buyBtn" onClick={() => handleShowAddToCart(p)}>Beli</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center my-5">
                        <h4>Produk tidak ditemukan.</h4>
                    </div>
                )}
            </div>
            {!loading && filteredProducts.length > productsPerPage && (
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a onClick={() => paginate(number)} href="#all-product" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Product;