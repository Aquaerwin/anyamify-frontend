import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const Contex = createContext(null);

const Provider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [banner, setBanner] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

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

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

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

    const refreshRecommendation = async () => {
        try {
            const recommendationRes = await axios.get('https://anyamify-server-production.up.railway.app/recommendation');
            setRecommendation(recommendationRes.data);
        } catch (error) {
            console.error("Gagal refresh data rekomendasi:", error);
        }
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredProducts(allProducts);
            return;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        const searchResult = allProducts.filter(product =>
            product.brand.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredProducts(searchResult);
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [productRes, bannerRes, recommendationRes] = await Promise.all([
                    axios.get('https://anyamify-server-production.up.railway.app/product'),
                    axios.get('https://anyamify-server-production.up.railway.app/banner'),
                    axios.get('https://anyamify-server-production.up.railway.app/recommendation')
                ]);
                setAllProducts(productRes.data);
                setFilteredProducts(productRes.data);
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

    const contextValue = {
        allProducts, filteredProducts, banner, recommendation, loading,
        isAuthenticated,
        showLoginModal, showRegisterModal,
        handleShowLogin, handleCloseLogin,
        handleShowRegister, handleCloseRegister,
        loginAction, registerAction, logoutAction,
        refreshRecommendation,
        handleSearch
    };

    return (
        <Contex.Provider value={contextValue}>
            {children}
        </Contex.Provider>
    );
};

export { Contex, Provider };