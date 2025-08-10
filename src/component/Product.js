import { Contex } from "./MyContex";
import { useContext, useState } from "react"; // Impor useState

const Product = () => {
    // 1. Ambil 'loading' dari context
    const { product, loading } = useContext(Contex);

    // --- Logika Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // --- Akhir Logika Pagination ---

    // Komponen untuk tampilan kerangka (skeleton)
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
        <div className="container" id="all-product">
            <div className="row justify-content-center">
                <div className="col-8">
                    <h2 className="text-center tagline mb-4 mt-2">All Product</h2>
                    <div className="input-group">
                        <form className="d-flex w-100">
                            <input className="searchInput" placeholder="cari sekarang..." />
                            <button className="primaryBtn">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                {/* 2. Logika untuk menampilkan kerangka atau produk */}
                {loading ? (
                    // Jika loading, tampilkan 8 kerangka
                    Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    // Jika tidak loading, tampilkan produk
                    currentProducts.map((p) => (
                        <div className="col-3 mb-4" key={p.id}>
                            <div className="product-card">
                                <div className="product-image-container">
                                    <img src={p.image} alt={p.brand} className="product-image" />
                                </div>
                                <div>
                                    <span className="title-brand">{p.brand}</span>
                                </div>
                                <div className="price-wraper d-flex justify-content-between">
                                    <span className="title-price">Rp. {p.price}</span>
                                    <button className="buyBtn">Beli</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 3. Tampilkan pagination hanya jika tidak loading dan ada produk */}
            {!loading && product.length > 0 && (
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={product.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
};

// Komponen untuk tombol-tombol pagination
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