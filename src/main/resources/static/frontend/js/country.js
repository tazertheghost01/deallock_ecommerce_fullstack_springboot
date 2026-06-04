 import { getCountries, getStatesOfCountry, getCitiesOfState } from 'https://jsdelivr.net';
        
        // Expose functions globally so our setup script can access them
        window.csc = { getCountries, getStatesOfCountry, getCitiesOfState };
        // Trigger initialization event
        window.dispatchEvent(new Event('csc-ready'));

 async function setupLocationDropdowns(prefix) {
            const countrySel = document.getElementById(`${prefix}-country`);
            const stateSel = document.getElementById(`${prefix}-state`);
            const citySel = document.getElementById(`${prefix}-city`);

            // 1. Instantly pull countries locally via our module helper
            const countries = await window.csc.getCountries();
            countries.forEach(country => {
                const opt = document.createElement('option');
                opt.value = country.iso2;
                opt.textContent = country.name;
                countrySel.appendChild(opt);
            });

            // 2. Watch country changes -> unlock and populate states
            countrySel.addEventListener('change', async function() {
                const countryCode = this.value;
                
                stateSel.innerHTML = '<option value="">Select State</option>';
                citySel.innerHTML = '<option value="">Select City</option>';
                stateSel.disabled = true;
                citySel.disabled = true;

                if (!countryCode) return;

                const states = await window.csc.getStatesOfCountry(countryCode);
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

            // 3. Watch state changes -> unlock and populate cities
            stateSel.addEventListener('change', async function() {
                const countryCode = countrySel.value;
                const stateCode = this.value;

                citySel.innerHTML = '<option value="">Select City</option>';
                citySel.disabled = true;

                if (!stateCode) return;

                const cities = await window.csc.getCitiesOfState(countryCode, stateCode);
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

        // Initialize drop-downs once CDN loads libraries into windows context
        window.addEventListener('csc-ready', () => {
            setupLocationDropdowns('seller');
            setupLocationDropdowns('delivery');
        });
