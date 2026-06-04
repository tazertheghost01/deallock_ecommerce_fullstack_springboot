 const API_KEY = '418db6d3a2c50f5b8f1b4688ec1d13dd1ae44c3ae7acd457d961291261dfc2be';
        
        // Main function to fetch data from the API
        async function fetchLocationData(url) {
            try {
                const response = await fetch(url, {
                    headers: { 'X-CSCAPI-KEY': API_KEY }
                });
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
            const countries = await fetchLocationData('https://api.countrystatecity.in/v1/countries');
            countries.forEach(country => {
                const opt = document.createElement('option');
                opt.value = country.iso2;
                opt.textContent = country.name;
                countrySel.appendChild(opt);
            });

            // 2. Handle Country Selection Change
            countrySel.addEventListener('change', async function() {
                const countryCode = this.value;
                
                // Clear out dependent boxes
                stateSel.innerHTML = '<option value="">Select State</option>';
                citySel.innerHTML = '<option value="">Select City</option>';
                stateSel.disabled = true;
                citySel.disabled = true;

                if (!countryCode) return;

                const states = await fetchLocationData(`https://countrystatecity.in{countryCode}/states`);
                if (states.length > 0) {
                    states.forEach(state => {
                        const opt = document.createElement('option');
                        opt.value = state.iso2;
                        opt.textContent = state.name;
                        stateSel.appendChild(opt);
                    });
                    stateSel.disabled = false;
                }
            });

            // 3. Handle State Selection Change
            stateSel.addEventListener('change', async function() {
                const countryCode = countrySel.value;
                const stateCode = this.value;

                citySel.innerHTML = '<option value="">Select City</option>';
                citySel.disabled = true;

                if (!stateCode) return;

                const cities = await fetchLocationData(`https://countrystatecity.in{countryCode}/states/${stateCode}/cities`);
                if (cities.length > 0) {
                    cities.forEach(city => {
                        const opt = document.createElement('option');
                        opt.value = city.name;
                        opt.textContent = city.name;
                        citySel.appendChild(opt);
                    });
                    citySel.disabled = false;
                }
            });
        }

        // Initialize script logic on page ready
        document.addEventListener('DOMContentLoaded', () => {
            setupLocationDropdowns('seller');
            setupLocationDropdowns('delivery');
        });
