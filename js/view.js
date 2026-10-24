import { getCustomerForOrder, getProductForId, calculateOrderTotal, calculateLineTotal } from './selectors.js';

export const renderIndicators = (orders, customers, products) => {
    const container = document.getElementById('indicators-container');
    
    let totalFees = 0;
    orders.forEach(order => {
        totalFees += calculateOrderTotal(order, products);
    });

    container.innerHTML = `
        <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm rounded border-start border-primary border-4">
                <h5>Étudiants inscrits</h5>
                <p class="fs-4 fw-bold text-primary mb-0">${customers.length}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm rounded border-start border-success border-4">
                <h5>Manuels au catalogue</h5>
                <p class="fs-4 fw-bold text-success mb-0">${products.length}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm rounded border-start border-warning border-4">
                <h5>Demandes d'emprunts</h5>
                <p class="fs-4 fw-bold text-warning mb-0">${orders.length}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm rounded border-start border-danger border-4">
                <h5>Valeur Cautions/Frais</h5>
                <p class="fs-4 fw-bold text-danger mb-0">${totalFees} DH</p>
            </div>
        </div>
    `;
};

export const renderOrders = (orders, customers, products, onDetailsClick) => {
    const container = document.getElementById('orders-container');

    if (orders.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted"><p>Aucun dossier d'emprunt ne correspond à vos critères.</p></div>`;
        return;
    }

    const htmlCards = orders.map(order => {
        const student = getCustomerForOrder(order.customerId, customers);
        const orderTotal = calculateOrderTotal(order, products);
        
        let statusBadgeClass = 'bg-secondary';
        if (order.status === 'Livree') statusBadgeClass = 'bg-success';
        else if (order.status === 'En attente') statusBadgeClass = 'bg-warning text-dark';
        else if (order.status === 'Annulee') statusBadgeClass = 'bg-danger';

        return `
            <div class="col-md-4 mb-3">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">Dossier #${order.id}</h5>
                            <span class="badge ${statusBadgeClass}">${order.status}</span>
                        </div>
                        <p class="card-text mb-1"><strong>Étudiant :</strong> ${student.name}</p>
                        <p class="card-text mb-1 text-muted small"><strong>Filière :</strong> ${student.city}</p>
                        <p class="card-text mb-1 text-muted small">Date : ${order.date}</p>
                        <p class="card-text text-primary fw-bold mt-2">Total Caution/Frais : ${orderTotal} DH</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <button class="btn btn-outline-primary btn-sm w-100 btn-details" data-id="${order.id}">
                            Consulter le dossier
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = htmlCards;

    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = Number(e.target.getAttribute('data-id'));
            onDetailsClick(orderId);
        });
    });
};

export const renderOrderModal = (order, customers, products) => {
    if (!order) return;
    const student = getCustomerForOrder(order.customerId, customers);
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = `Détails de la demande d'emprunt #${order.id}`;

    let itemsHtml = order.items.map(item => {
        const product = getProductForId(item.productId, products);
        const lineTotal = calculateLineTotal(item, products);
        return `
            <tr>
                <td>${product.name}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td>${product.price} DH</td>
                <td>${item.quantity}</td>
                <td class="fw-bold">${lineTotal} DH</td>
            </tr>
        `;
    }).join('');

    const totalOrder = calculateOrderTotal(order, products);

    modalBody.innerHTML = `
        <p><strong>Étudiant :</strong> ${student.name} | <strong>Filière :</strong> ${student.city}</p>
        <p><strong>Date de demande :</strong> ${order.date} | <strong>Statut :</strong> ${order.status}</p>
        <hr>
        <h6>Ouvrages / Manuels demandés :</h6>
        <div class="table-responsive">
            <table class="table table-striped table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Manuel / Ouvrage</th>
                        <th>Matière</th>
                        <th>Frais unitaire</th>
                        <th>Exemplaires</th>
                        <th>Sous-total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
        </div>
        <h5 class="text-end text-primary mt-3">Total Caution : ${totalOrder} DH</h5>
    `;

    const modalElement = document.getElementById('orderModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
};

export const renderError = (message) => {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.classList.remove('d-none');
};