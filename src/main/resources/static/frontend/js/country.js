document.addEventListener('DOMContentLoaded', async () => {
    const sellerStateSel = document.getElementById('seller-state');
    const sellerCitySel = document.getElementById('seller-city');
    const deliveryStateSel = document.getElementById('delivery-state');
    const deliveryCitySel = document.getElementById('delivery-city');

    // 1. Fetch Nigerian states from the dedicated open API
    try {
        const response = await fetch('https://onrender.com');
        const states = await response.json();

        // Populate State drop-downs
        states.forEach(stateObj => {
            // Seller State Option
            const optSeller = document.createElement('option');
            optSeller.value = stateObj.state_code; // e.g., "LA"
            optSeller.textContent = stateObj.name; // e.g., "Lagos"
            sellerStateSel.appendChild(optSeller);

            // Delivery State Option
            const optDelivery = document.createElement('option');
            optDelivery.value = stateObj.state_code; 
            optDelivery.textContent = stateObj.name; 
            deliveryStateSel.appendChild(optDelivery);
        });

        // Activate dropdown fields
        sellerStateSel.disabled = false;
        deliveryStateSel.disabled = false;

    } catch (error) {
        console.error("Failed to load Nigerian states:", error);
    }

    // 2. Dynamic City Loading Handler
    async function loadCities(stateCode, citySelectElement) {
        citySelectElement.innerHTML = '<option value="">Select City</option>';
        citySelectElement.disabled = true;

        if (!stateCode) return;

        try {
            const response = await fetch(`https://onrender.com{stateCode}/lgas`);
            const cities = await response.json();

            cities.forEach(city => {
                const opt = document.createElement('option');
                opt.value = city; // text value of LGA
                opt.textContent = city;
                citySelectElement.appendChild(opt);
            });

            citySelectElement.disabled = false;
        } catch (error) {
            console.error(`Failed to load cities for state code ${stateCode}:`, error);
        }
    }

    // 3. Event Listeners for Cascading Changes
    sellerStateSel.addEventListener('change', function() {
        loadCities(this.value, sellerCitySel);
    });

    deliveryStateSel.addEventListener('change', function() {
        loadCities(this.value, deliveryCitySel);
    });
});
