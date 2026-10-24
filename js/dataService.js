export const fetchAllData = async () => {
    try {
        // Chargement simultané des trois fichiers JSON obligatoires
        const [custRes, prodRes, ordRes] = await Promise.all([
            fetch('data/customers.json'),
            fetch('data/products.json'),
            fetch('data/orders.json')
        ]);

        // Vérification que chaque réponse est correcte
        if (!custRes.ok || !prodRes.ok || !ordRes.ok) {
            throw new Error("Erreur HTTP lors du chargement des fichiers de données.");
        }

        // Conversion des réponses au format JSON
        const customers = await custRes.json();
        const products = await prodRes.json();
        const orders = await ordRes.json();

        return { customers, products, orders };
    } catch (error) {
        console.error("Erreur critique dans dataService :", error);
        throw error; // Propagée vers app.js pour afficher l'alerte visuelle
    }
};