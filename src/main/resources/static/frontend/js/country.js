<script>
document.addEventListener('DOMContentLoaded', async () => {

    // Select elements
    const sellerStateSel = document.getElementById('seller-state');
    const sellerCitySel = document.getElementById('seller-city');
    const deliveryStateSel = document.getElementById('delivery-state');
    const deliveryCitySel = document.getElementById('delivery-city');

    // GitHub Raw Data URLs (Reliable & Free)
    const STATES_URL = 'https://raw.githubusercontent.com/temikeezy/nigeria-geojson-data/main/states.json';
    const LGAS_URL = 'https://raw.githubusercontent.com/temikeezy/nigeria-geojson-data/main/lgas.json';

    let lgasData = {};   // To store LGAs by state

    // ==================== LOAD STATES ====================
    try {
        const statesRes = await fetch(STATES_URL);
        const states = await statesRes.json();

        const lgasRes = await fetch(LGAS_URL);
        lgasData = await lgasRes.json();

        // Populate both State dropdowns
        states.forEach(stateName => {
            // Seller State
            const optSeller = document.createElement('option');
            optSeller.value = stateName;
            optSeller.textContent = stateName;
            sellerStateSel.appendChild(optSeller);

            // Delivery State
            const optDelivery = document.createElement('option');
            optDelivery.value = stateName;
            optDelivery.textContent = stateName;
            deliveryStateSel.appendChild(optDelivery);
        });

        // Enable dropdowns
        sellerStateSel.disabled = false;
        deliveryStateSel.disabled = false;

    } catch (error) {
        console.error("Failed to load Nigerian states and LGAs:", error);
        alert("Unable to load states. Please check your internet connection.");
    }

    // ==================== LOAD CITIES (LGAs) ====================
    function loadCities(stateName, citySelectElement) {
        citySelectElement.innerHTML = '<option value="">Select City / LGA</option>';
        citySelectElement.disabled = true;

        if (!stateName || !lgasData[stateName]) {
            return;
        }

        lgasData[stateName].forEach(lga => {
            const option = document.createElement('option');
            option.value = lga;
            option.textContent = lga;
            citySelectElement.appendChild(option);
        });

        citySelectElement.disabled = false;
    }

    // ==================== EVENT LISTENERS ====================
    sellerStateSel.addEventListener('change', () => {
        loadCities(sellerStateSel.value, sellerCitySel);
    });

    deliveryStateSel.addEventListener('change', () => {
        loadCities(deliveryStateSel.value, deliveryCitySel);
    });

});
</script>
