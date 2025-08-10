// File: src/component/Recommendation.js

import { useContext } from "react";
import { Contex } from "./MyContex";

const Recommendation = () => {
    // Ambil data rekomendasi DAN fungsi untuk merefresh
    const { recommendation, refreshRecommendation } = useContext(Contex);

    return (
        <div className="Recommendation my-5">
            <div className="mb-4">
                <button className="title-wrapper d-flex align-items-center" onClick={refreshRecommendation}>
                    {/* --- PERUBAHAN DI SINI (Menambahkan Ikon) --- */}
                    Rekomendasi <i className="bi bi-arrow-clockwise ms-2"></i>
                </button>
            </div>

            <div className="row g-4">
                {recommendation && recommendation.map((c) => {
                    return (
                        <div className="col-md-6" key={c.id}>
                            <div className="card-Recommendation">
                                <img src={c.image} className="recommendation-img" alt={c.brand} />
                                <div className="Recommendation-label">
                                    {c.brand}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Recommendation;