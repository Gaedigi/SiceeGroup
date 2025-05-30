document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const monthlyBillInput = document.getElementById('monthlyBill');
    const roofAreaInput = document.getElementById('roofArea');
    const sunExposureSelect = document.getElementById('sunExposure');
    const calculateBtn = document.getElementById('calculateBtn');

    const configuratorSection = document.getElementById('configurator');
    const resultsSection = document.getElementById('results');
    const finalSummarySection = document.getElementById('finalSummary');

    const estimatedKwhSpan = document.getElementById('estimatedKwh');
    const recommendedPowerSpan = document.getElementById('recommendedPower');
    const estimatedPanelsSpan = document.getElementById('estimatedPanels');
    const requiredSpaceSpan = document.getElementById('requiredSpace');

    const panelTypeSelect = document.getElementById('panelType');
    const batteryStorageSelect = document.getElementById('batteryStorage');
    const installationTypeSelect = document.getElementById('installationType');
    const updateConfigBtn = document.getElementById('updateConfigBtn');

    const finalPowerSpan = document.getElementById('finalPower');
    const finalPanelsSpan = document.getElementById('finalPanels');
    const finalPanelTypeSpan = document.getElementById('finalPanelType');
    const finalBatterySpan = document.getElementById('finalBattery');
    const finalInstallationSpan = document.getElementById('finalInstallation');
    const estimatedCostSpan = document.getElementById('estimatedCost');
    const resetConfigBtn = document.getElementById('resetConfigBtn');
    const contactUsBtn = document.getElementById('contactUsBtn');

    // Constants for calculations (simplified for demonstration)
    const KWH_PER_KWP_YEAR = { // kWh produced per kWp per year, adjusted by sun exposure
        'ottima': 1300, // Good for Southern Italy
        'buona': 1100,
        'media': 900,
        'scarsa': 600
    };
    const PANEL_WATT_PEAK = { // Avg Watt Peak per panel
        'monocristallino': 450, // 400Wp
        'policristallino': 400   // 350Wp
    };
    const PANEL_SQ_M = 1.7; // Avg square meters per panel
    const COST_PER_KWP = 1500; // Average € per kWp for standard installation
    const BATTERY_COST = {
        'no': 0,
        'small': 2500,
        'medium': 5000,
        'large': 7500
    };
    const INSTALLATION_COST_ADJUSTMENT = {
        'standard': 1,
        'integrata': 1.15 // 15% higher for integrated
    };

    let calculatedPowerKwp = 0;
    let calculatedPanels = 0;

    calculateBtn.addEventListener('click', () => {
        const monthlyBill = parseFloat(monthlyBillInput.value);
        const roofArea = parseFloat(roofAreaInput.value);
        const sunExposure = sunExposureSelect.value;

        if (isNaN(monthlyBill) || monthlyBill <= 0) {
            alert('Per favore inserisci un consumo mensile valido.');
            return;
        }
        if (isNaN(roofArea) || roofArea <= 0) {
            alert('Per favore inserisci un\'area del tetto valida.');
            return;
        }

        const annualConsumption = monthlyBill * 12;
        const kwpPerYear = KWH_PER_KWP_YEAR[sunExposure];
        calculatedPowerKwp = annualConsumption / kwpPerYear; // kWp needed
        
        // Round to one decimal for display, but keep full number for further calculations
        const recommendedPowerKwp = Math.ceil(calculatedPowerKwp * 10) / 10; 

        // Initial panel calculation based on monocrystalline for recommendation
        calculatedPanels = Math.ceil((recommendedPowerKwp * 1000) / PANEL_WATT_PEAK['monocristallino']);
        const requiredSpace = (calculatedPanels * PANEL_SQ_M).toFixed(1);

        if (requiredSpace > roofArea) {
            alert(`Attenzione: L'area richiesta (${requiredSpace} mq) supera l'area disponibile sul tetto (${roofArea} mq). Potrebbe essere necessario un impianto più piccolo o pannelli più efficienti.`);
            // Adjust calculated panels to fit roof area
            calculatedPanels = Math.floor(roofArea / PANEL_SQ_M);
            calculatedPowerKwp = (calculatedPanels * PANEL_WATT_PEAK['monocristallino']) / 1000;
            alert(`L'impianto verrà ridimensionato a circa ${calculatedPanels} pannelli per adattarsi al tuo tetto.`);
        }

        estimatedKwhSpan.textContent = annualConsumption.toFixed(0);
        recommendedPowerSpan.textContent = calculatedPowerKwp.toFixed(2);
        estimatedPanelsSpan.textContent = calculatedPanels;
        requiredSpaceSpan.textContent = requiredSpace;

        configuratorSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        finalSummarySection.classList.add('hidden'); // Ensure this is hidden
    });

    updateConfigBtn.addEventListener('click', () => {
        const selectedPanelType = panelTypeSelect.value;
        const selectedBatteryStorage = batteryStorageSelect.value;
        const selectedInstallationType = installationTypeSelect.value;

        // Recalculate panels based on selected panel type
        calculatedPanels = Math.ceil((calculatedPowerKwp * 1000) / PANEL_WATT_PEAK[selectedPanelType]);
        const actualPowerKwp = (calculatedPanels * PANEL_WATT_PEAK[selectedPanelType]) / 1000;

        let estimatedCost = actualPowerKwp * COST_PER_KWP;
        estimatedCost += BATTERY_COST[selectedBatteryStorage];
        estimatedCost *= INSTALLATION_COST_ADJUSTMENT[selectedInstallationType];

        finalPowerSpan.textContent = actualPowerKwp.toFixed(2);
        finalPanelsSpan.textContent = calculatedPanels;
        finalPanelTypeSpan.textContent = panelTypeSelect.options[panelTypeSelect.selectedIndex].text;
        finalBatterySpan.textContent = batteryStorageSelect.options[batteryStorageSelect.selectedIndex].text;
        finalInstallationSpan.textContent = installationTypeSelect.options[installationTypeSelect.selectedIndex].text;
        estimatedCostSpan.textContent = estimatedCost.toFixed(2);

        resultsSection.classList.add('hidden');
        finalSummarySection.classList.remove('hidden');
    });

    resetConfigBtn.addEventListener('click', () => {
        // Reset all inputs
        monthlyBillInput.value = '';
        roofAreaInput.value = '';
        sunExposureSelect.value = 'ottima';
        panelTypeSelect.value = 'monocristallino';
        batteryStorageSelect.value = 'no';
        installationTypeSelect.value = 'standard';

        // Hide results and show configurator
        configuratorSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        finalSummarySection.classList.add('hidden');
    });

     contactUsBtn.addEventListener('click', () => {
          contactUsBtn.addEventListener('click', () => {
        // Rimuovi la riga dell'alert e aggiungi il reindirizzamento
        window.location.href = 'https://form.jotform.com/251487413706358';    });
});
