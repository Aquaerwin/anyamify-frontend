// File: src/component/MyContex.js

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const Contex = createContext(null);

const Provider = ({ children }) => {
    // State lama Anda (tidak berubah)
    const [product, setProduct] = useState([]);
    const [banner, setBanner] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const [loading, setLoading] = useState(true);

    // State untuk Modal & Autentikasi (tidak berubah)
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Fungsi untuk kontrol Modal (tidak berubah)
    const handleCloseLogin = () => setShowLoginModal(false);
    const handleShowLogin = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };
    const handleCloseRegister = () => setShowRegisterModal(false);
    const handleShowRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    // Cek token saat aplikasi pertama kali dimuat (tidak berubah)
    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    // Fungsi untuk Aksi Autentikasi (tidak berubah)
    const loginAction = async (credentials) => {
        try {
            const response = await axios.post('https://anyamify-server-production.up.railway.app/api/login', credentials);
            const userToken = response.data.token;
            localStorage.setItem('token', userToken);
            setToken(userToken);
            setIsAuthenticated(true);
            handleCloseLogin();
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Terjadi kesalahan" };
        }
    };
    const registerAction = async (userData) => {
        try {
            await axios.post('https://anyamify-server-production.up.railway.app/api/register', userData);
            handleCloseRegister();
            handleShowLogin();
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Terjadi kesalahan" };
        }
    };
    const logoutAction = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    };

    // --- FUNGSI BARU UNTUK REFRESH REKOMENDASI ---
    const refreshRecommendation = async () => {
        try {
            const recommendationRes = await axios.get('https://anyamify-server-production.up.railway.app/recommendation');
            setRecommendation(recommendationRes.data);
        } catch (error) {
            console.error("Gagal refresh data rekomendasi:", error);
        }
    };
    // --- BATAS FUNGSI BARU ---

    // useEffect untuk fetch data awal (tidak berubah)
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [productRes, bannerRes, recommendationRes] = await Promise.all([
                    axios.get('https://anyamify-server-production.up.railway.app/product'),
                    axios.get('https://anyamify-server-production.up.railway.app/banner'),
                    axios.get('https://anyamify-server-production.up.railway.app/recommendation')
                ]);
                setProduct(productRes.data);
                setBanner(bannerRes.data);
                setRecommendation(recommendationRes.data);
            } catch (error) {
                console.error("Gagal mengambil semua data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    // Kirim fungsi baru ke dalam value
    const contextValue = {
        product, banner, recommendation, loading,
        isAuthenticated,
        showLoginModal, showRegisterModal,
        handleShowLogin, handleCloseLogin,
        handleShowRegister, handleCloseRegister,
        loginAction, registerAction, logoutAction,
        refreshRecommendation // <-- TAMBAHAN
    };

    return (
        <Contex.Provider value={contextValue}>
            {children}
        </Contex.Provider>
    );
};

export { Contex, Provider };