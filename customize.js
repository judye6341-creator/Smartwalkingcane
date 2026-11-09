    // ==========================================
    // CUSTOMIZATION PAGE LOGIC
    // ==========================================
    
    const customizeLayout = document.querySelector('.customize-layout');

    if (customizeLayout) {
        const baseModelRadios = document.querySelectorAll('input[name="base_model"]');
        const sensorCheckboxes = document.querySelectorAll('input[name="sensor"]');
        const summaryItemsContainer = document.getElementById('summary-items');
        const totalPriceElement = document.getElementById('total-price');
        const orderBtn = document.getElementById('order-btn');

        // Function to calculate and update the summary
        function updateSummary() {
            let total = 0;
            let htmlContent = '';

            // 1. Get Selected Base Model
            let selectedBase = null;
            baseModelRadios.forEach(radio => {
                if (radio.checked) {
                    selectedBase = radio;
                }
            });

            if (selectedBase) {
                const price = parseFloat(selectedBase.value);
                const name = selectedBase.dataset.name;
                total += price;
                htmlContent += `
                    <div class="summary-item">
                        <span>${name}</span>
                        <span>$${price.toFixed(2)}</span>
                    </div>
                `;
            }

            // 2. Get Selected Sensors
            let hasSensors = false;
            let sensorsHtml = '';
            
            sensorCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    hasSensors = true;
                    const price = parseFloat(checkbox.value);
                    const name = checkbox.dataset.name;
                    total += price;
                    sensorsHtml += `
                        <div class="summary-item" style="padding-left: 15px; color: #666; font-size: 0.85rem;">
                            <span>+ ${name}</span>
                            <span>$${price.toFixed(2)}</span>
                        </div>
                    `;
                }
            });

            if (hasSensors) {
                // Add a subtle separator for sensors
                htmlContent += `<div style="margin: 10px 0; border-top: 1px solid #D9EAF4;"></div>`;
                htmlContent += sensorsHtml;
            }

            // Update DOM
            summaryItemsContainer.innerHTML = htmlContent;
            totalPriceElement.textContent = `$${total.toFixed(2)}`;
        }

        // Add Event Listeners to all inputs
        baseModelRadios.forEach(radio => {
            radio.addEventListener('change', updateSummary);
        });

        sensorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSummary);
        });

        // Initialize on page load
        updateSummary();

        // Handle Order Button
        orderBtn.addEventListener('click', () => {
            const total = totalPriceElement.textContent;
            
            // Visual feedback
            const originalText = orderBtn.innerHTML;
            orderBtn.innerHTML = `Order Confirmed! <i class="fa-solid fa-check"></i>`;
            orderBtn.style.backgroundColor = 'var(--navy)';
            orderBtn.style.color = 'var(--white)';
            
            // Simulate processing
            setTimeout(() => {
                alert(`Thank you! Your custom Sanad Cane totaling ${total} has been added to your cart.`);
                orderBtn.innerHTML = originalText;
                orderBtn.style.backgroundColor = '';
                orderBtn.style.color = '';
            }, 1000);
        });
    }