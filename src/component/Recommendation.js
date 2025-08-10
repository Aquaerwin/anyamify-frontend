// File: src/component/Recommendation.js

import { useContext } from "react";
import { Contex } from "./MyContex";

const Recommendation = () => {
    // Ambil data rekomendasi DAN fungsi untuk merefresh
    const { recommendation, refreshRecommendation } = useContext(Contex);

    return (
        <div className="Recommendation my-5">
            {/* --- PERUBAHAN DI SINI --- */}
            <div className="mb-4">
                {/* Div "title-wrapper" diubah menjadi sebuah button.
                  Fungsi onClick ditambahkan di sini.
                  Ikon refresh dipindah ke sebelahnya.
                */}
                <button className="title-wrapper d-flex align-items-center" onClick={refreshRecommendation}>
                    Rekomendasi
                </button>
            </div>
            {/* --- BATAS PERUBAHAN --- */}

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