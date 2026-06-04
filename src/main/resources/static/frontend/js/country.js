// Your active API credentials configuration
    const API_KEY = '418db6d3a2c50f5b8f1b4688ec1d13dd1ae44c3ae7acd457d961291261dfc2be';
    
    // Centralized request configuration profile containing required auth headers
    const requestOptions = {
        method: 'GET',
        headers: { 
            'X-CSCAPI-KEY': API_KEY 
        }
    };

    // Main function to fetch data from the API safely
    async function fetchLocationData(url) {
        try {
            // Passing the global requestOptions profile ensures the API Key header is always sent
            const response = await fetch(url, requestOptions);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Fetch API error:", error);
            return [];
        }
    }

    async function setupLocationDropdowns(prefix) {
        const countrySel = document.getElementById(`${prefix}-country`);
        const stateSel = document.getElementById(`${prefix}-state`);
        const citySel = document.getElementById(`${prefix}-city`);

        // 1. Load Countries initially
        const countries = await fetchLocationData('https://countrystatecity.in');
        countries.forEach(country => {
            const opt = document.createElement('option');
            opt.value = country.iso2; // This provides codes like 'NG', 'US'
            opt.textContent = country.name;
            countrySel.appendChild(opt);
        });

        // 2. Handle Country Selection Change -> Load States
        countrySel.addEventListener('change', async function() {
            const countryCode = this.value;
            
            // Reset and lock child fields
            stateSel.innerHTML = '<option value="">Select State</option>';
            citySel.innerHTML = '<option value="">Select City</option>';
            stateSel.disabled = true;
            citySel.disabled = true;

            if (!countryCode) return;

            const states = await fetchLocationData(`https://countrystatecity.in/${countryCode}/states`);
            if (states && states.length > 0) {
                states.forEach(state => {
                    const opt = document.createElement('option');
                    opt.value = state.iso2; // This provides state codes like 'LA', 'CA'
                    opt.textContent = state.name;
                    stateSel.appendChild(opt);
                });
                stateSel.disabled = false;
            }
        });

        // 3. Handle State Selection Change -> Load Cities
        stateSel.addEventListener('change', async function() {
            const countryCode = countrySel.value;
            const stateCode = this.value;

            // Reset and lock city box
            citySel.innerHTML = '<option value="">Select City</option>';
            citySel.disabled = true;

            if (!stateCode || !countryCode) return;

            const cities = await fetchLocationData(`https://countrystatecity.in/${countryCode}/states/${stateCode}/cities`);
            if (cities && cities.length > 0) {
                cities.forEach(city => {
                    const opt = document.createElement('option');
                    opt.value = city.name; // Cities are saved via text name strings
                    opt.textContent = city.name;
                    citySel.appendChild(opt);
                });
                citySel.disabled = false;
            }
        });
    }

    // Initialize application logic on page layout ready
    document.addEventListener('DOMContentLoaded', () => {
        setupLocationDropdowns('seller');
        setupLocationDropdowns('delivery');
    });
