import { state } from './state.js';
import { fetchAllData } from './dataService.js';
import { getFilteredOrders } from './selectors.js';
import { renderOrders, renderIndicators, renderOrderModal, renderError } from './view.js';

// Fonction centrale de rendu[cite: 14, 15]
const render = () => {
    const filteredOrders = getFilteredOrders(state);
    renderOrders(filteredOrders, state.customers, state.products, handleShowDetails);
    renderIndicators(state.orders, state.customers, state.products);
};

// Gestion de l'affichage des détails d'une commande (utilise find)[cite: 13, 15]
const handleShowDetails = (orderId) => {
    const order = state.orders.find(o => o.id === orderId);
    renderOrderModal(order, state.customers, state.products);
};

// Initialisation de l'application[cite: 14, 15]
const initApp = async () => {
    try {
        const data = await fetchAllData();
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        // Premier rendu complet après le chargement des données[cite: 14, 15]
        render();
    } catch (error) {
        console.error("Échec de l'initialisation :", error);
        renderError("Impossible de charger l'application. Veuillez vérifier les fichiers JSON dans le dossier data/.");
    }

    // Gestion des événements (interactions utilisateur)[cite: 15]
    document.getElementById('search-input').addEventListener('input', (e) => {
        state.search = e.target.value;
        render();
    });

    document.getElementById('status-select').addEventListener('change', (e) => {
        state.status = e.target.value;
        render();
    });

    document.getElementById('category-select').addEventListener('change', (e) => {
        state.category = e.target.value;
        render();
    });
};

initApp();