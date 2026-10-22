/* ==========================================================
   SM PLUS SIGN - AUTO DIAGNOSTIC SOFTWARE & DTC RESEARCH ENGINE
   app.js
   ========================================================== */

// Complete DTC (Diagnostic Trouble Code) Database
const dtcDatabase = [
    {
        code: "P0A80",
        category: "EV",
        brand: "Toyota/Lexus",
        title: "Replace Hybrid Battery Pack",
        description: "កំហុសប្រព័ន្ធថាមពលថ្ម ഹൈប៊្រីដ (Hybrid Battery Pack Deterioration) ដែលតម្រូវឱ្យធ្វើការជួសជុល ឬផ្លាស់ប្តូរកោសិកាថ្ម (Battery Cell Balancing / Replacement)។",
        solution: "ប្រើប្រាស់កម្មវិធី Toyota GTS+ ដើម្បីពិនិត្យកោសិកាថ្មនីមួយៗ (Block voltage) និងធ្វើការផ្លាស់ប្តូរម៉ូឌុលខូច។"
    },
    {
        code: "C1241",
        category: "C",
        brand: "Toyota/Lexus",
        title: "Low Power Supply Voltage (ABS ECU)",
        description: "តង់ស្យុងចរន្តអគ្គិសនីផ្គត់ផ្គង់ទៅឱ្យប្រព័ន្ធ ABS/VSC ECU ទាបជាងកម្រិតស្តង់ដារ (ក្រោម 9.5V)។",
        solution: "ពិនិត្យកម្លាំងថ្ម (Battery State of Health), សាខាសាកភ្លើង (Alternator output) និងក្ដាប់ខ្សភ្លើង Ground របស់ប្រព័ន្ធ ABS។"
    },
    {
        code: "U0100",
        category: "U",
        brand: "Universal",
        title: "Lost Communication with ECM/PCM",
        description: "ដាច់ការទាក់ទងទិន្នន័យ (CAN Bus Communication Lost) រវាងកុំព្យូទ័រម៉ាស៊ីន (ECM) និងម៉ូឌុលដទៃទៀត។",
        solution: "ពិនិត្យខ្សែបណ្តាញ CAN High / CAN Low, ហ្វុយស៊ីប (Fuses) និង Connector របស់កុំព្យូទ័រ ECM។"
    },
    {
        code: "B1000",
        category: "B",
        brand: "Universal",
        title: "ECU Internal Fault / Airbag SRS",
        description: "កំហុសខាងក្នុងកុំព្យូទ័រ SRS Airbag Module ឬបញ្ហាអង្គចងចាំ (EEPROM/Crash Data Stored)។",
        solution: "សម្អាត Crash Data ក្នុងប្រព័ន្ធ Airbag ឬធ្វើការ Program កុំព្យូទ័រ SRS សារជាថ្មីជាមួយឧបករណ៍ជំនាញ។"
    },
    {
        code: "P0300",
        category: "P",
        brand: "Universal",
        title: "Random/Multiple Cylinder Misfire Detected",
        description: "ម៉ាស៊ីនឆេះមិនស្របគ្នា ឬមានការខកខានក្នុងការបញ្ឆេះភ្លើងនៅស៊ីឡាំងច្រើន។",
        solution: "ពិនិត្យຫົວទៀន (Spark Plugs), បូមខ្យល់ Ignition Coils, ក្បាលអ៊ុចសិច (Fuel Injectors) និងកំដៅសង្កត់ក្នុងស៊ីឡាំង (Compression Test)។"
    },
    {
        code: "SYS-001",
        category: "SYS",
        brand: "Toyota/Lexus",
        title: "ECU EEPROM Checksum Error / IMMO Lock",
        description: "បញ្ហាអង្គចងចាំ EEPROM ខាងក្នុងកុំព្យូទ័រម៉ាស៊ីន បណ្តាលឱ្យជាប់សោអុីម៉ូប៊ីឡាយសឺ (Immobilizer Lock) ឬមិនស្គាល់កូនសោ។",
        solution: "ប្រើប្រាស់ ToyoLex ឬ Techstream ដើម្បីធ្វើការ Register កូនសោរថ្មី ឬ Repair EEPROM Dump file។"
    },
    {
        code: "P0420",
        category: "P",
        brand: "Universal",
        title: "Catalyst System Efficiency Below Threshold (Bank 1)",
        description: "ប្រព័ន្ធកាតាលីករ (Catalytic Converter) ថយចុះប្រសិទ្ធភាព ឬខូចខាត។",
        solution: "ពិនិត្យអុីសែនស័រ (O2 Sensors) ទាំងមុខ និងក្រោយ ឬធ្វើការប្តូរកាតាលីករថ្មី ឬប្រើប្រាស់ ToyoLex ដើម្បីបិទកូដ (DTC Off) ប្រសិនបើចាំបាច់។"
    },
    {
        code: "U0401",
        category: "U",
        brand: "Ford",
        title: "Invalid Data Received from ECM/PCM",
        description: "ទទួលបានទិន្នន័យមិនត្រឹមត្រូវពីកុំព្យូទ័រម៉ាស៊ីន (Ford Network Integration Error)។",
        solution: "ប្រើប្រាស់ FORScan ដើម្បីធ្វើ Module Initialization និង Clear DTCs ក្នុង Network ទាំងអស់។"
    }
];

let currentCategory = 'ALL';

/**
 * Render DTC Cards into the Grid container
 * @param {Array} dataToRender 
 */
function renderDTCs(dataToRender) {
    const grid = document.getElementById('dtcGrid');
    const noResult = document.getElementById('noDtcResult');
    
    if (!grid) return;
    grid.innerHTML = '';

    if (dataToRender.length === 0) {
        if (noResult) noResult.classList.remove('hidden');
        return;
    } else {
        if (noResult) noResult.classList.add('hidden');
    }

    dataToRender.forEach(item => {
        let badgeColor = 'bg-gold-500/20 text-gold-400 border-gold-500/30';
        if (item.category === 'P') badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        if (item.category === 'B') badgeColor = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        if (item.category === 'C') badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        if (item.category === 'U') badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        if (item.category === 'EV') badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';

        const card = document.createElement('div');
        card.className = 'glass-panel p-6 rounded-2xl border border-slate-800 hover:border-gold-500/50 transition flex flex-col justify-between group';
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start gap-2 mb-3">
                    <span class="text-xl font-black font-mono text-white group-hover:text-gold-400 transition">${item.code}</span>
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeColor}">${item.category} | ${item.brand}</span>
                </div>
                <h3 class="font-bold text-sm text-white mb-2">${item.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed mb-3">${item.description}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-800">
                <div class="text-xs text-gold-400 font-semibold mb-1"><i class="fa-solid fa-wrench me-1"></i> ដំណោះស្រាយ (Solution):</div>
                <p class="text-xs text-slate-400">${item.solution}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Filter DTCs based on search input, brand selection, and active category tab
 */
function filterDTCs() {
    const searchInput = document.getElementById('dtcSearchInput');
    const brandSelect = document.getElementById('dtcBrandSelect');
    
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const brand = brandSelect ? brandSelect.value : 'ALL';

    const filtered = dtcDatabase.filter(item => {
        const matchesQuery = item.code.toLowerCase().includes(query) || 
                             item.title.toLowerCase().includes(query) || 
                             item.description.toLowerCase().includes(query) ||
                             item.solution.toLowerCase().includes(query);
        
        const matchesBrand = (brand === 'ALL') || item.brand.includes(brand) || (brand === 'Universal' && item.brand === 'Universal');
        const matchesCat = (currentCategory === 'ALL') || (item.category === currentCategory);

        return matchesQuery && matchesBrand && matchesCat;
    });

    renderDTCs(filtered);
}

/**
 * Handle category chip filter changes
 * @param {String} cat 
 */
function setCategoryFilter(cat) {
    currentCategory = cat;
    document.querySelectorAll('.dtc-chip-btn').forEach(btn => {
        btn.classList.remove('bg-gold-500', 'text-black', 'shadow');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.remove('bg-slate-800', 'text-slate-300');
        event.currentTarget.classList.add('bg-gold-500', 'text-black', 'shadow');
    }
    
    filterDTCs();
}

// Initialized on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    renderDTCs(dtcDatabase);
});