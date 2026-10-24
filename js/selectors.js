// Retrouver l'étudiant associé à un emprunt (find)
export const getCustomerForOrder = (customerId, customers) => {
    return customers.find(c => c.id === customerId) || { name: "Étudiant inconnu", city: "Filière inconnue" };
};

// Retrouver les infos d'un manuel (find)
export const getProductForId = (productId, products) => {
    return products.find(p => p.id === productId) || { name: "Ouvrage inconnu", price: 0, category: "" };
};

// Calculer les frais par ligne de manuel
export const calculateLineTotal = (item, products) => {
    const product = getProductForId(item.productId, products);
    return product.price * item.quantity;
};

// Calculer le montant total des caution/frais pour un emprunt (forEach)
export const calculateOrderTotal = (order, products) => {
    let total = 0;
    order.items.forEach(item => {
        total += calculateLineTotal(item, products);
    });
    return total;
};

// Filtrage croisé des demandes d'emprunt (filter)
export const getFilteredOrders = (state) => {
    return state.orders.filter(order => {
        const student = getCustomerForOrder(order.customerId, state.customers);
        
        // 1. Recherche par nom d'étudiant
        const matchesSearch = student.name.toLowerCase().includes(state.search.toLowerCase());
        
        // 2. Filtre par statut d'emprunt
        const matchesStatus = state.status === "all" || order.status === state.status;
        
        // 3. Filtre par matière/catégorie de manuel
        const matchesCategory = state.category === "all" || order.items.some(item => {
            const product = getProductForId(item.productId, state.products);
            return product.category === state.category;
        });

        return matchesSearch && matchesStatus && matchesCategory;
    });
};