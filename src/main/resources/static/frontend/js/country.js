document.addEventListener('DOMContentLoaded', async () => {
    const sellerStateSel = document.getElementById('seller-state');
    const sellerCitySel = document.getElementById('seller-city');
    const deliveryStateSel = document.getElementById('delivery-state');
    const deliveryCitySel = document.getElementById('delivery-city');

    // Reliable API base URL
    const API_BASE = 'https://nigeria-states-towns-lgas.onrender.com/api';

    // 1. Fetch Nigerian States
    try {
        const response = await fetch(`${API_BASE}/states`);
        if (!response.ok) throw new Error('Failed to fetch states');

        const states = await response.json();

        // Populate both state dropdowns
        states.forEach(state => {
            // Seller State
            const optSeller = document.createElement('option');
            optSeller.value = state.code || state.state_code || state.id; // Adjust based on API response
            optSeller.textContent = state.name || state.state;
            sellerStateSel.appendChild(optSeller);

            // Delivery State
            const optDelivery = document.createElement('option');
            optDelivery.value = state.code || state.state_code || state.id;
            optDelivery.textContent = state.name || state.state;
            deliveryStateSel.appendChild(optDelivery);
        });

        sellerStateSel.disabled = false;
        deliveryStateSel.disabled = false;
    } catch (error) {
        console.error("Failed to load Nigerian states:", error);
        alert("Could not load states. Please check your internet connection.");
    }

    // 2. Load Cities (LGAs) for a selected state
    async function loadCities(stateCode, citySelectElement) {
        citySelectElement.innerHTML = '<option value="">Select City / LGA</option>';
        citySelectElement.disabled = true;

        if (!stateCode) return;

        try {
            const response = await fetch(`${API_BASE}/state/${stateCode}/lgas`);
            if (!response.ok) throw new Error('Failed to fetch LGAs');

            const cities = await response.json();

            cities.forEach(city => {
                const opt = document.createElement('option');
                opt.value = typeof city === 'string' ? city : city.name || city.lga;
                opt.textContent = typeof city === 'string' ? city : city.name || city.lga;
                citySelectElement.appendChild(opt);
            });

            citySelectElement.disabled = false;
        } catch (error) {
            console.error(`Failed to load cities for state ${stateCode}:`, error);
            citySelectElement.innerHTML = '<option value="">Error loading cities</option>';
        }
    }

    // 3. Event Listeners
    sellerStateSel.addEventListener('change', function() {
        loadCities(this.value, sellerCitySel);
    });

    deliveryStateSel.addEventListener('change', function() {
        loadCities(this.value, deliveryCitySel);
    });
});
