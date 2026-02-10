// ========================================
// DATABASE INITIALIZATION
// SQLite Database Setup
// ========================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'welfare.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('✅ Connected to SQLite database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// ========================================
// CREATE TABLES
// ========================================

const createTables = () => {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mobile VARCHAR(15) UNIQUE NOT NULL,
            aadhaar VARCHAR(12) UNIQUE,
            full_name VARCHAR(255) NOT NULL,
            dob DATE,
            gender VARCHAR(10),
            address TEXT,
            district VARCHAR(100),
            state VARCHAR(100),
            income_bracket VARCHAR(50),
            family_size INTEGER,
            password_hash VARCHAR(255),
            welfare_score INTEGER DEFAULT 0,
            welfare_stars INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating users table:', err);
        else console.log('✅ Users table created');
    });

    // Schemes table
    db.run(`
        CREATE TABLE IF NOT EXISTS schemes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            scheme_id VARCHAR(50) UNIQUE NOT NULL,
            name_en VARCHAR(255) NOT NULL,
            name_hi VARCHAR(255),
            name_te VARCHAR(255),
            name_ta VARCHAR(255),
            description_en TEXT,
            description_hi TEXT,
            description_te TEXT,
            description_ta TEXT,
            category VARCHAR(100),
            benefit_amount DECIMAL(10, 2),
            eligibility_criteria TEXT,
            required_documents TEXT,
            application_url VARCHAR(500),
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating schemes table:', err);
        else console.log('✅ Schemes table created');
    });

    // Applications table
    db.run(`
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            scheme_id INTEGER NOT NULL,
            application_number VARCHAR(50) UNIQUE NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            match_score INTEGER,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            approved_at DATETIME,
            notes TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (scheme_id) REFERENCES schemes(id)
        )
    `, (err) => {
        if (err) console.error('Error creating applications table:', err);
        else console.log('✅ Applications table created');
    });

    // Chat messages table
    db.run(`
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            response TEXT,
            language VARCHAR(10) DEFAULT 'en',
            sentiment VARCHAR(50),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating chat_messages table:', err);
        else console.log('✅ Chat messages table created');
    });

    // User progress table
    db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            category VARCHAR(100),
            progress_percentage INTEGER DEFAULT 0,
            goal_description TEXT,
            completed BOOLEAN DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating user_progress table:', err);
        else console.log('✅ User progress table created');
    });

    // Achievements table
    db.run(`
        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            achievement_type VARCHAR(100),
            achievement_name VARCHAR(255),
            earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating achievements table:', err);
        else console.log('✅ Achievements table created');
    });

    // OTP verification table
    db.run(`
        CREATE TABLE IF NOT EXISTS otp_verifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mobile VARCHAR(15) NOT NULL,
            otp VARCHAR(6) NOT NULL,
            expires_at DATETIME NOT NULL,
            verified BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating otp_verifications table:', err);
        else console.log('✅ OTP verifications table created');
    });
};

// ========================================
// INSERT SAMPLE DATA
// ========================================

const insertSampleData = () => {
    // Sample schemes
    const schemes = [
        {
            scheme_id: 'pmay',
            name_en: 'PM Awas Yojana',
            name_hi: 'प्रधानमंत्री आवास योजना',
            name_te: 'ప్రధానమంత్రి ఆవాస్ యోజన',
            name_ta: 'பிரதமர் ஆவாஸ் யோஜனா',
            description_en: 'Housing subsidy for affordable homes',
            category: 'Housing',
            benefit_amount: 250000,
            eligibility_criteria: 'EWS/LIG/MIG families without pucca house',
            required_documents: 'Aadhaar, Income Certificate, Property Documents',
            application_url: 'https://pmaymis.gov.in'
        },
        {
            scheme_id: 'ayushman',
            name_en: 'Ayushman Bharat (PMJAY)',
            name_hi: 'आयुष्मान भारत',
            name_te: 'ఆయుష్మాన్ భారత్',
            name_ta: 'ஆயுஷ்மான் பாரத்',
            description_en: '₹5 lakh health coverage per family',
            category: 'Health',
            benefit_amount: 500000,
            eligibility_criteria: 'SECC/BPL families, SC/ST communities',
            required_documents: 'Aadhaar, Ration Card, SECC Certificate',
            application_url: 'https://pmjay.gov.in'
        },
        {
            scheme_id: 'mgnrega',
            name_en: 'MGNREGA',
            name_hi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी',
            name_te: 'మహాత్మా గాంధీ గ్రామీణ ఉపాధి',
            name_ta: 'மகாத்மா காந்தி தேசிய கிராமப்புற வேலைவாய்ப்பு',
            description_en: '100 days guaranteed employment',
            category: 'Employment',
            benefit_amount: 35000,
            eligibility_criteria: 'Rural households willing to do unskilled work',
            required_documents: 'Aadhaar, Job Card, Bank Account',
            application_url: 'https://nrega.nic.in'
        },
        {
            scheme_id: 'pmkisan',
            name_en: 'PM-KISAN',
            name_hi: 'प्रधानमंत्री किसान सम्मान निधि',
            name_te: 'ప్రధానమంత్రి కిసాన్',
            name_ta: 'பிரதமர் கிசான்',
            description_en: '₹6,000 per year for farmers',
            category: 'Agriculture',
            benefit_amount: 6000,
            eligibility_criteria: 'Small and marginal farmers',
            required_documents: 'Aadhaar, Land Records, Bank Account',
            application_url: 'https://pmkisan.gov.in'
        },
        {
            scheme_id: 'nfsa',
            name_en: 'NFSA/PDS',
            name_hi: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम',
            name_te: 'జాతీయ ఆహార భద్రతా చట్టం',
            name_ta: 'தேசிய உணவுப் பாதுகாப்பு சட்டம்',
            description_en: 'Subsidized food grains',
            category: 'Food Security',
            benefit_amount: 12000,
            eligibility_criteria: 'Priority households (PHH) and AAY',
            required_documents: 'Aadhaar, Ration Card',
            application_url: 'https://nfsa.gov.in'
        },
        {
            scheme_id: 'pmjdy',
            name_en: 'PM Jan Dhan Yojana',
            name_hi: 'प्रधानमंत्री जन धन योजना',
            name_te: 'ప్రధానమంత్రి జన్ ధన్ యోజన',
            name_ta: 'பிரதமர் ஜன் தன் யோஜனா',
            description_en: 'Zero-balance bank accounts',
            category: 'Financial Inclusion',
            benefit_amount: 0,
            eligibility_criteria: 'All citizens without bank account',
            required_documents: 'Aadhaar, Address Proof',
            application_url: 'https://pmjdy.gov.in'
        }
    ];

    const insertScheme = db.prepare(`
        INSERT OR IGNORE INTO schemes (
            scheme_id, name_en, name_hi, name_te, name_ta,
            description_en, category, benefit_amount,
            eligibility_criteria, required_documents, application_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    schemes.forEach(scheme => {
        insertScheme.run(
            scheme.scheme_id, scheme.name_en, scheme.name_hi,
            scheme.name_te, scheme.name_ta, scheme.description_en,
            scheme.category, scheme.benefit_amount,
            scheme.eligibility_criteria, scheme.required_documents,
            scheme.application_url
        );
    });

    insertScheme.finalize();
    console.log('✅ Sample schemes inserted');
};

// ========================================
// EXECUTE INITIALIZATION
// ========================================

console.log('\n🚀 Initializing Welfare AI Platform Database...\n');

createTables();

setTimeout(() => {
    insertSampleData();

    setTimeout(() => {
        console.log('\n✅ Database initialization complete!\n');
        db.close((err) => {
            if (err) console.error('Error closing database:', err);
            else console.log('✅ Database connection closed');
            process.exit(0);
        });
    }, 1000);
}, 2000);

module.exports = db;
