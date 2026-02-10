// ========================================
// SINGLE-PAGE DASHBOARD - JAVASCRIPT
// All Features Interactive
// ========================================

let currentLanguage = 'en';

// Translations
const dashboardTranslations = {
    en: {
        myDashboard: 'My Dashboard',
        welfareScore: 'Welfare Score',
        eligibleSchemes: 'Eligible Schemes',
        savingsPotential: 'Savings Potential',
        welfareStars: 'Welfare Stars',
        quickChat: 'Quick Chat',
        schemeMatcher: 'Top Scheme Matches',
        appTracker: 'My Applications',
        progress: 'Your Progress',
        aiAdvisor: 'AI Advisor',
        financePlanner: 'Financial Planner',
        chatWelcome: 'Hello! How can I help you today?',
        typeMessage: 'Type a message...',
        counseling: 'Talk to Counselor',
        arPreview: 'AR Preview'
    },
    hi: {
        myDashboard: 'मेरा डैशबोर्ड',
        welfareScore: 'कल्याण स्कोर',
        eligibleSchemes: 'पात्र योजनाएं',
        savingsPotential: 'बचत क्षमता',
        welfareStars: 'कल्याण सितारे',
        quickChat: 'त्वरित चैट',
        schemeMatcher: 'शीर्ष योजना मिलान',
        appTracker: 'मेरे आवेदन',
        progress: 'आपकी प्रगति',
        aiAdvisor: 'AI सलाहकार',
        financePlanner: 'वित्तीय योजनाकार',
        chatWelcome: 'नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूं?',
        typeMessage: 'संदेश टाइप करें...',
        counseling: 'परामर्शदाता से बात करें',
        arPreview: 'AR पूर्वावलोकन'
    },
    te: {
        myDashboard: 'నా డాష్‌బోర్డ్',
        welfareScore: 'సంక్షేమ స్కోర్',
        eligibleSchemes: 'అర్హత పథకాలు',
        savingsPotential: 'పొదుపు సామర్థ్యం',
        welfareStars: 'సంక్షేమ నక్షత్రాలు',
        quickChat: 'త్వరిత చాట్',
        schemeMatcher: 'టాప్ స్కీమ్ మ్యాచ్‌లు',
        appTracker: 'నా దరఖాస్తులు',
        progress: 'మీ పురోగతి',
        aiAdvisor: 'AI సలహాదారు',
        financePlanner: 'ఆర్థిక ప్లానర్',
        chatWelcome: 'హలో! నేను ఈరోజు మీకు ఎలా సహాయం చేయగలను?',
        typeMessage: 'సందేశం టైప్ చేయండి...',
        counseling: 'కౌన్సెలర్‌తో మాట్లాడండి',
        arPreview: 'AR ప్రివ్యూ'
    },
    ta: {
        myDashboard: 'எனது டாஷ்போர்டு',
        welfareScore: 'நல மதிப்பெண்',
        eligibleSchemes: 'தகுதியான திட்டங்கள்',
        savingsPotential: 'சேமிப்பு திறன்',
        welfareStars: 'நல நட்சத்திரங்கள்',
        quickChat: 'விரைவு அரட்டை',
        schemeMatcher: 'சிறந்த திட்ட பொருத்தங்கள்',
        appTracker: 'எனது விண்ணப்பங்கள்',
        progress: 'உங்கள் முன்னேற்றம்',
        aiAdvisor: 'AI ஆலோசகர்',
        financePlanner: 'நிதி திட்டமிடுபவர்',
        chatWelcome: 'வணக்கம்! இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
        typeMessage: 'செய்தியை தட்டச்சு செய்யவும்...',
        counseling: 'ஆலோசகருடன் பேசவும்',
        arPreview: 'AR முன்னோட்டம்'
    }
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeLanguageSelector();
    loadUserData();
    initializeInteractions();
    checkOnlineStatus();
});

// ========================================
// PARTICLE FIELD
// ========================================

function initializeParticles() {
    const particleField = document.getElementById('particleField');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        particleField.appendChild(particle);
    }

    // Add twinkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// LANGUAGE SELECTOR
// ========================================

function initializeLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentLanguage = option.dataset.lang;
            updateLanguageDisplay();
            updateTranslations();
            langDropdown.classList.remove('active');
        });
    });
}

function updateLanguageDisplay() {
    const langMap = {
        en: 'EN',
        hi: 'हिं',
        te: 'తె',
        ta: 'த'
    };
    document.getElementById('currentLang').textContent = langMap[currentLanguage];
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.dataset.translate;
        if (dashboardTranslations[currentLanguage][key]) {
            el.textContent = dashboardTranslations[currentLanguage][key];
        }
    });

    // Update placeholders
    const placeholders = document.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(el => {
        const key = el.dataset.translatePlaceholder;
        if (dashboardTranslations[currentLanguage][key]) {
            el.placeholder = dashboardTranslations[currentLanguage][key];
        }
    });
}

// ========================================
// USER DATA
// ========================================

// ========================================
// USER DATA
// ========================================

// ========================================
// USER DATA
// ========================================

const API_BASE_URL = '/api';

async function loadUserData() {
    const token = localStorage.getItem('welfareToken');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.user;

            document.getElementById('userName').textContent = user.full_name || user.mobile;
            document.getElementById('welfareStars').textContent = user.welfare_stars || 0;

            localStorage.setItem('welfareUserData', JSON.stringify(user));

            // Load additional data
            loadMatchedSchemes(token);
            loadApplications(token);
            loadUserProgress(token);

        } else {
            console.error('Session expired');
            localStorage.removeItem('welfareToken');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = 'login.html';
    }
}

async function loadMatchedSchemes(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/schemes/matched?language=${currentLanguage}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        const container = document.querySelector('.matcher-module .module-content');
        if (data.schemes && data.schemes.length > 0) {
            container.innerHTML = data.schemes.slice(0, 3).map(scheme => `
                <div class="scheme-match-item">
                    <div class="match-left">
                        <div class="match-icon">${getSchemeIcon(scheme.category)}</div>
                        <div class="match-info">
                            <h4>${scheme.name}</h4>
                            <p class="match-benefit">${scheme.benefitAmount || 'Benefits available'}</p>
                        </div>
                    </div>
                    <div class="match-right">
                        <div class="match-score">${scheme.matchScore}%</div>
                        <button class="apply-btn-mini" onclick="submitApplication('${scheme.schemeId || scheme.id}')">Apply</button>
                    </div>
                </div>
            `).join('');
            document.getElementById('eligibleSchemes').textContent = data.totalMatches || data.schemes.length;
        }
    } catch (e) { console.error(e); }
}

async function loadApplications(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/applications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        const container = document.querySelector('.tracker-module .app-timeline');
        if (data.applications && data.applications.length > 0) {
            container.innerHTML = data.applications.map(app => `
                <div class="timeline-item status-${app.status.toLowerCase()}">
                    <div class="timeline-dot">${getStatusIcon(app.status)}</div>
                    <div class="timeline-content">
                        <h4>${app.scheme_name || 'Scheme Application'}</h4>
                        <p class="timeline-status">${app.status}</p>
                        <p class="timeline-date">${new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p style="text-align:center; opacity:0.7;">No active applications</p>';
        }
    } catch (e) { console.error(e); }
}

async function loadUserProgress(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/progress`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        // Here we would visually update the progress circles based on API data
        // For now, let's keep the animations but potentially update values if we had unique IDs
    } catch (e) { console.error(e); }
}

async function submitApplication(schemeId) {
    const token = localStorage.getItem('welfareToken');
    if (!token) return;

    if (!confirm('Apply for this scheme?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ schemeId })
        });

        const data = await response.json();
        if (data.success) {
            alert('Application Submitted Successfully!');
            loadApplications(token); // Refresh list
        } else {
            alert('Failed to apply: ' + (data.error || 'Unknown error'));
        }
    } catch (e) {
        alert('Error submitting application');
    }
}

function getSchemeIcon(category) {
    const icons = { 'Housing': '🏠', 'Health': '🏥', 'Employment': '👷', 'Agriculture': '🌾', 'Education': '🎓' };
    return icons[category] || '📜';
}

function getStatusIcon(status) {
    if (status === 'Approved') return '✅';
    if (status === 'Rejected') return '❌';
    return '⏳';
}

// Global scope for onclick handlers
window.submitApplication = submitApplication;

// ========================================
// INTERACTIONS
// ========================================

function initializeInteractions() {
    // Quick chat send button
    const sendBtn = document.querySelector('.send-btn-mini');
    const chatInput = document.querySelector('.chat-quick-input input');

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                addQuickChatMessage(message);
                chatInput.value = '';
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }

    // Voice button
    const voiceBtn = document.querySelector('.voice-btn-mini');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', startVoiceInput);
    }

    // Apply buttons
    document.querySelectorAll('.apply-btn-mini').forEach(btn => {
        btn.addEventListener('click', function () {
            this.textContent = 'Applied ✓';
            this.style.background = '#7fffd4';

            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 50]);
            }

            setTimeout(() => {
                this.textContent = 'Apply';
                this.style.background = '';
            }, 3000);
        });
    });

    // Upload button
    const uploadBtn = document.querySelector('.upload-btn-mini');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            uploadBtn.textContent = 'Uploading...';
            setTimeout(() => {
                uploadBtn.textContent = 'Uploaded ✓';
                uploadBtn.style.background = '#7fffd4';
            }, 2000);
        });
    }

    // Counseling button
    const counselingBtn = document.querySelector('.counseling-btn-mini');

    // Profile Button -> Logout
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('welfareToken');
                localStorage.removeItem('welfareUserData');
                window.location.href = 'login.html';
            }
        });
    }
    if (counselingBtn) {
        counselingBtn.addEventListener('click', () => {
            alert('Connecting you to a counselor...\n\nHelpline: 1800-XXX-XXXX\nAvailable 24/7');
        });
    }

    // AR Preview button
    const arBtn = document.querySelector('.ar-preview-btn');
    if (arBtn) {
        arBtn.addEventListener('click', openARPreview);
    }

    // Emergency FAB
    const emergencyBtn = document.querySelector('.fab.emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            alert('🚨 Emergency Helpline\n\nNational: 1800-XXX-XXXX\nLocal: 1800-YYY-YYYY\n\nAvailable 24/7 in all languages');
        });
    }

    // Offline FAB
    const offlineBtn = document.getElementById('offlineBtn');
    if (offlineBtn) {
        offlineBtn.addEventListener('click', toggleOfflineMode);
    }
}

// ========================================
// QUICK CHAT
// ========================================

function addQuickChatMessage(message) {
    const chatPreview = document.querySelector('.chat-preview');

    // Add user message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.innerHTML = `
        <div class="bubble-text" style="background: rgba(0, 217, 255, 0.2); margin-left: auto;">
            ${message}
        </div>
    `;
    chatPreview.appendChild(userBubble);

    // Simulate bot response
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = `
            <span class="bubble-avatar">🤖</span>
            <div class="bubble-text">
                ${getBotResponse(message)}
            </div>
        `;
        chatPreview.appendChild(botBubble);

        // Scroll to bottom
        chatPreview.scrollTop = chatPreview.scrollHeight;
    }, 1000);
}

function getBotResponse(message) {
    const responses = {
        en: [
            "I can help you with that! Would you like to see eligible schemes?",
            "Great question! Let me check your profile...",
            "I'm here to assist. What would you like to know?",
            "Based on your profile, I recommend checking PM Awas Yojana."
        ],
        hi: [
            "मैं इसमें आपकी मदद कर सकता हूं! क्या आप पात्र योजनाएं देखना चाहेंगे?",
            "बढ़िया सवाल! मुझे आपकी प्रोफ़ाइल जांचने दें...",
            "मैं सहायता के लिए यहां हूं। आप क्या जानना चाहेंगे?",
            "आपकी प्रोफ़ाइल के आधार पर, मैं PM आवास योजना की जांच करने की सलाह देता हूं।"
        ],
        te: [
            "నేను దానిలో మీకు సహాయం చేయగలను! మీరు అర్హత పథకాలను చూడాలనుకుంటున్నారా?",
            "గొప్ప ప్రశ్న! నన్ను మీ ప్రొఫైల్ తనిఖీ చేయనివ్వండి...",
            "నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
            "మీ ప్రొఫైల్ ఆధారంగా, నేను PM ఆవాస్ యోజనను తనిఖీ చేయమని సిఫార్సు చేస్తున్నాను."
        ],
        ta: [
            "நான் அதில் உங்களுக்கு உதவ முடியும்! தகுதியான திட்டங்களைப் பார்க்க விரும்புகிறீர்களா?",
            "சிறந்த கேள்வி! உங்கள் சுயவிவரத்தை சரிபார்க்க என்னை அனுமதிக்கவும்...",
            "நான் உதவ இங்கே இருக்கிறேன். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
            "உங்கள் சுயவிவரத்தின் அடிப்படையில், PM ஆவாஸ் யோஜனாவை சரிபார்க்க பரிந்துரைக்கிறேன்."
        ]
    };

    const langResponses = responses[currentLanguage] || responses.en;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
}

// ========================================
// VOICE INPUT
// ========================================

function startVoiceInput() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = currentLanguage === 'en' ? 'en-IN' :
            currentLanguage === 'hi' ? 'hi-IN' :
                currentLanguage === 'te' ? 'te-IN' : 'ta-IN';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.querySelector('.chat-quick-input input').value = transcript;
        };

        recognition.start();

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    } else {
        alert('Voice recognition not supported in this browser');
    }
}

// ========================================
// AR PREVIEW
// ========================================

function openARPreview() {
    // Create AR modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 28px; margin-bottom: 20px; color: #00d9ff;">🔮 AR Benefit Preview</h2>
            <div style="font-size: 80px; margin: 40px 0; animation: ar-float 3s infinite ease-in-out;">
                🏠
            </div>
            <p style="font-size: 18px; margin-bottom: 30px; opacity: 0.9;">
                Your Future Home with PM Awas Yojana
            </p>
            <div style="display: flex; gap: 16px; justify-content: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: #00d9ff; color: #0a1628; border: none; border-radius: 12px; padding: 12px 24px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add AR float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ar-float {
            0%, 100% { transform: translateY(0) rotateY(0deg); }
            50% { transform: translateY(-20px) rotateY(180deg); }
        }
    `;
    document.head.appendChild(style);

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

// ========================================
// OFFLINE MODE
// ========================================

function checkOnlineStatus() {
    updateOnlineStatus();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

function updateOnlineStatus() {
    const syncBadge = document.getElementById('syncBadge');

    if (navigator.onLine) {
        syncBadge.textContent = '✓';
        syncBadge.style.background = '#7fffd4';
    } else {
        syncBadge.textContent = '✗';
        syncBadge.style.background = '#ff6b9d';
    }
}

function toggleOfflineMode() {
    const syncBadge = document.getElementById('syncBadge');

    if (navigator.onLine) {
        alert('📡 Offline Mode\n\nYour data is cached locally.\nYou can access schemes and FAQs without internet.\n\nStatus: Synced ✓');
    } else {
        alert('📡 Offline Mode\n\nYou are currently offline.\nCached data is available.\n\nWill sync when connection is restored.');
    }
}

// ========================================
// ANIMATIONS & EFFECTS
// ========================================

// Add hover effects to feature modules
document.querySelectorAll('.feature-module').forEach(module => {
    module.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px)';
    });

    module.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-8px)';
    });
});

// Animate progress circles on load
window.addEventListener('load', () => {
    animateProgressCircles();
});

function animateProgressCircles() {
    const circles = document.querySelectorAll('.circle-progress');
    circles.forEach(circle => {
        const offset = circle.style.strokeDashoffset;
        circle.style.strokeDashoffset = '100';

        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 500);
    });
}

// Add entrance animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-module').forEach(module => {
    module.style.opacity = '0';
    module.style.transform = 'translateY(30px)';
    module.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(module);
});
