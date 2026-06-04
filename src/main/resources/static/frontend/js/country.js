
        const API_KEY = '418db6d3a2c50f5b8f1b4688ec1d13dd1ae44c3ae7acd457d961291261dfc2be';
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        function setupLocationDropdowns(prefix) {
            const countrySel = document.getElementById(`${prefix}-country`);
            const stateSel = document.getElementById(`${prefix}-state`);
            const citySel = document.getElementById(`${prefix}-city`);

            // Fetch Countries
            fetch("https://countrystatecity.in", requestOptions)
                .then(response => response.json())
                .then(countries => {
                    countries.forEach(country => {
                        const opt = document.createElement('option');
                        opt.value = country.iso2;
                        opt.textContent = country.name;
                        countrySel.appendChild(opt);
                    });
                })
                .catch(error => console.error(`Error loading countries for ${prefix}:`, error));

            // Country change -> Get States
            countrySel.addEventListener('change', function() {
                const countryCode = this.value;
                
                stateSel.innerHTML = '<option value="">Select State</option>';
                citySel.innerHTML = '<option value="">Select City</option>';
                stateSel.disabled = true;
                citySel.disabled = true;

                if (!countryCode) return;

                fetch(`https://countrystatecity.in/${countryCode}/states`, requestOptions)
                    .then(response => response.json())
                    .then(states => {
                        if(states.length > 0) {
                            states.forEach(state => {
                                const opt = document.createElement('option');
                                opt.value = state.iso2;
                                opt.textContent = state.name;
                                stateSel.appendChild(opt);
                            });
                            stateSel.disabled = false;
                        }
                    })
                    .catch(error => console.error(`Error loading states for ${prefix}:`, error));
            });

            // State change -> Get Cities
            stateSel.addEventListener('change', function() {
                const countryCode = countrySel.value;
                const stateCode = this.value;

                citySel.innerHTML = '<option value="">Select City</option>';
                citySel.disabled = true;

                if (!stateCode) return;

                fetch(`https://countrystatecity.in/${countryCode}/states/${stateCode}/cities`, requestOptions)
                    .then(response => response.json())
                    .then(cities => {
                        if(cities.length > 0) {
                            cities.forEach(city => {
                                const opt = document.createElement('option');
                                opt.value = city.name;
                                opt.textContent = city.name;
                                citySel.appendChild(opt);
                            });
                            citySel.disabled = false;
                        }
                    })
                    .catch(error => console.error(`Error loading cities for ${prefix}:`, error));
            });
        }

        // Initialize script logic on page ready
        document.addEventListener('DOMContentLoaded', () => {
            setupLocationDropdowns('seller');
            setupLocationDropdowns('delivery');
        });

