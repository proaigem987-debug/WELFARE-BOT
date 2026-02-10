// ========================================
// ANTIGRAVITY WELFARE CHATBOT - PREMIUM FEATURES
// Advanced Interactive Modules & AI Systems
// ========================================

// Extended Translations Database
const translationsPremium = {
    en: {
        ...translations.en,
        povertyReduction: 'Poverty Reduction',
        savings: 'Savings',
        welfareStars: 'Welfare Stars',
        applications: 'Applications',
        viewPlan: 'View My Plan',
        eligibilityChecker: 'Eligibility Checker',
        instantMatch: 'Instant scheme matcher with AI-powered analysis',
        checkNow: 'Check Now',
        applicationTracker: 'Application Tracker',
        hereForYou: "I'm here for you",
        counseling: 'Counseling',
        motivation: 'Motivation',
        offlineMode: 'Offline Mode',
        arPreview: 'AR Preview',
        encrypted: 'End-to-End Encrypted',
        listening: 'Listening...',
        yourPlan: 'Your Poverty Reduction Plan',
        eligibilityQuiz: 'Eligibility Quiz',
        previous: 'Previous',
        next: 'Next'
    },
    hi: {
        ...translations.hi,
        povertyReduction: 'गरीबी में कमी',
        savings: 'बचत',
        welfareStars: 'कल्याण सितारे',
        applications: 'आवेदन',
        viewPlan: 'मेरी योजना देखें',
        eligibilityChecker: 'पात्रता जांचकर्ता',
        instantMatch: 'AI-संचालित विश्लेषण के साथ त्वरित योजना मिलान',
        checkNow: 'अभी जांचें',
        applicationTracker: 'आवेदन ट्रैकर',
        hereForYou: 'मैं आपके लिए यहां हूं',
        counseling: 'परामर्श',
        motivation: 'प्रेरणा',
        offlineMode: 'ऑफ़लाइन मोड',
        arPreview: 'AR पूर्वावलोकन',
        encrypted: 'एंड-टू-एंड एन्क्रिप्टेड',
        listening: 'सुन रहा हूं...',
        yourPlan: 'आपकी गरीबी कम करने की योजना',
        eligibilityQuiz: 'पात्रता प्रश्नोत्तरी',
        previous: 'पिछला',
        next: 'अगला'
    },
    te: {
        ...translations.te,
        povertyReduction: 'పేదరిక తగ్గింపు',
        savings: 'పొదుపులు',
        welfareStars: 'సంక్షేమ నక్షత్రాలు',
        applications: 'దరఖాస్తులు',
        viewPlan: 'నా ప్లాన్ చూడండి',
        eligibilityChecker: 'అర్హత తనిఖీదారు',
        instantMatch: 'AI-శక్తితో తక్షణ పథకం మ్యాచర్',
        checkNow: 'ఇప్పుడు తనిఖీ చేయండి',
        applicationTracker: 'దరఖాస్తు ట్రాకర్',
        hereForYou: 'నేను మీ కోసం ఇక్కడ ఉన్నాను',
        counseling: 'కౌన్సెలింగ్',
        motivation: 'ప్రేరణ',
        offlineMode: 'ఆఫ్‌లైన్ మోడ్',
        arPreview: 'AR ప్రివ్యూ',
        encrypted: 'ఎండ్-టు-ఎండ్ ఎన్క్రిప్టెడ్',
        listening: 'వింటున్నాను...',
        yourPlan: 'మీ పేదరిక తగ్గింపు ప్లాన్',
        eligibilityQuiz: 'అర్హత క్విజ్',
        previous: 'మునుపటి',
        next: 'తదుపరి'
    },
    ta: {
        ...translations.ta,
        povertyReduction: 'வறுமை குறைப்பு',
        savings: 'சேமிப்பு',
        welfareStars: 'நல நட்சத்திரங்கள்',
        applications: 'விண்ணப்பங்கள்',
        viewPlan: 'எனது திட்டத்தைக் காண்க',
        eligibilityChecker: 'தகுதி சரிபார்ப்பாளர்',
        instantMatch: 'AI-இயக்கப்படும் உடனடி திட்ட பொருத்தி',
        checkNow: 'இப்போது சரிபார்க்கவும்',
        applicationTracker: 'விண்ணப்ப கண்காணிப்பாளர்',
        hereForYou: 'நான் உங்களுக்காக இங்கே இருக்கிறேன்',
        counseling: 'ஆலோசனை',
        motivation: 'ஊக்கம்',
        offlineMode: 'ஆஃப்லைன் பயன்முறை',
        arPreview: 'AR முன்னோட்டம்',
        encrypted: 'எண்ட்-டு-எண்ட் என்க்ரிப்டட்',
        listening: 'கேட்கிறேன்...',
        yourPlan: 'உங்கள் வறுமை குறைப்பு திட்டம்',
        eligibilityQuiz: 'தகுதி வினாடி வினா',
        previous: 'முந்தைய',
        next: 'அடுத்து'
    }
};

// Merge premium translations
Object.keys(translationsPremium).forEach(lang => {
    if (translations[lang]) {
        translations[lang] = { ...translations[lang], ...translationsPremium[lang] };
    }
});

// ========================================
// USER STATE & GAMIFICATION
// ========================================

let userState = {
    welfareStars: 0,
    savings: 0,
    applications: 0,
    povertyReductionProgress: 0,
    achievements: [],
    interactions: 0,
    lastInteraction: Date.now()
};

// Load from localStorage
function loadUserState() {
    const saved = localStorage.getItem('welfareUserState');
    if (saved) {
        userState = { ...userState, ...JSON.parse(saved) };
        updateDashboard();
    }
}

function saveUserState() {
    localStorage.setItem('welfareUserState', JSON.stringify(userState));
}

// ========================================
// DASHBOARD MANAGEMENT
// ========================================

function updateDashboard() {
    // Update progress ring
    const progressRing = document.getElementById('povertyProgress');
    const progressValue = document.getElementById('progressValue');
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (userState.povertyReductionProgress / 100) * circumference;

    if (progressRing) {
        progressRing.style.strokeDashoffset = offset;
    }
    if (progressValue) {
        progressValue.textContent = `${userState.povertyReductionProgress}%`;
    }

    // Update stats
    document.getElementById('savingsValue').textContent = `₹${userState.savings.toLocaleString()}`;
    document.getElementById('starsValue').textContent = userState.welfareStars;
    document.getElementById('applicationsValue').textContent = userState.applications;
    document.getElementById('starCount').textContent = userState.welfareStars;
}

function initializeDashboard() {
    loadUserState();

    document.getElementById('viewPlanBtn').addEventListener('click', () => {
        showPersonalizedPlan();
        awardStars(5, 'Viewed personalized plan!');
    });
}

// ========================================
// PERSONALIZED PLAN MODAL
// ========================================

function showPersonalizedPlan() {
    const modal = document.getElementById('planModal');

    // Generate job recommendations
    const jobRecs = document.getElementById('jobRecommendations');
    jobRecs.innerHTML = `
        <div class="recommendation-item">
            <strong>🏗️ Construction Worker</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">MGNREGA projects nearby • ₹350/day</p>
        </div>
        <div class="recommendation-item">
            <strong>🚗 Delivery Partner</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">Flexible hours • ₹15,000-25,000/month</p>
        </div>
        <div class="recommendation-item">
            <strong>🏪 Retail Assistant</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">Local stores hiring • ₹12,000/month</p>
        </div>
    `;

    // Generate skill recommendations
    const skillRecs = document.getElementById('skillRecommendations');
    skillRecs.innerHTML = `
        <div class="recommendation-item">
            <strong>💻 Basic Computer Skills</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">PMKVY certified • 3 months • Free</p>
        </div>
        <div class="recommendation-item">
            <strong>🔧 Electrical Wiring</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">High demand skill • 2 months • Free</p>
        </div>
        <div class="recommendation-item">
            <strong>🍳 Food Preparation</strong>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 4px;">Hospitality sector • 1 month • Free</p>
        </div>
    `;

    // Savings simulator
    const savingsSim = document.getElementById('savingsSimulator');
    savingsSim.innerHTML = `
        <div style="margin-bottom: 12px;">
            <label style="font-size: 13px; display: block; margin-bottom: 4px;">Monthly Income: ₹<span id="incomeDisplay">15000</span></label>
            <input type="range" min="5000" max="50000" step="1000" value="15000" id="incomeSlider" style="width: 100%;">
        </div>
        <div style="margin-bottom: 12px;">
            <label style="font-size: 13px; display: block; margin-bottom: 4px;">Save: <span id="savePercent">20</span>%</label>
            <input type="range" min="5" max="50" step="5" value="20" id="saveSlider" style="width: 100%;">
        </div>
        <div style="background: rgba(0, 217, 255, 0.1); padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; opacity: 0.7; margin-bottom: 4px;">Monthly Savings</div>
            <div style="font-size: 24px; font-weight: 700; color: var(--electric-cyan);" id="savingsResult">₹3,000</div>
            <div style="font-size: 11px; opacity: 0.7; margin-top: 8px;">In 1 year: <strong id="yearlyResult">₹36,000</strong></div>
        </div>
    `;

    // Add event listeners for simulator
    setTimeout(() => {
        const incomeSlider = document.getElementById('incomeSlider');
        const saveSlider = document.getElementById('saveSlider');

        function updateSavings() {
            const income = parseInt(incomeSlider.value);
            const savePercent = parseInt(saveSlider.value);
            const monthly = (income * savePercent) / 100;
            const yearly = monthly * 12;

            document.getElementById('incomeDisplay').textContent = income.toLocaleString();
            document.getElementById('savePercent').textContent = savePercent;
            document.getElementById('savingsResult').textContent = `₹${monthly.toLocaleString()}`;
            document.getElementById('yearlyResult').textContent = `₹${yearly.toLocaleString()}`;
        }

        incomeSlider.addEventListener('input', updateSavings);
        saveSlider.addEventListener('input', updateSavings);
    }, 100);

    modal.classList.add('active');
}

document.getElementById('planModalClose').addEventListener('click', () => {
    document.getElementById('planModal').classList.remove('active');
});

// ========================================
// ELIGIBILITY CHECKER
// ========================================

const eligibilityQuestions = {
    pmay: [
        {
            question: { en: 'Do you own a pucca (permanent) house?', hi: 'क्या आपके पास पक्का घर है?', te: 'మీకు పక్కా ఇల్లు ఉందా?', ta: 'உங்களுக்கு பக்கா வீடு உள்ளதா?' },
            options: [
                { en: 'Yes', hi: 'हां', te: 'అవును', ta: 'ஆம்', value: false },
                { en: 'No', hi: 'नहीं', te: 'కాదు', ta: 'இல்லை', value: true }
            ]
        },
        {
            question: { en: 'What is your annual household income?', hi: 'आपकी वार्षिक घरेलू आय क्या है?', te: 'మీ వార్షిక కుటుంబ ఆదాయం ఎంత?', ta: 'உங்கள் ஆண்டு குடும்ப வருமானம் என்ன?' },
            options: [
                { en: 'Below ₹3 lakh', hi: '₹3 लाख से कम', te: '₹3 లక్షల కంటే తక్కువ', ta: '₹3 லட்சத்திற்கு கீழ்', value: true },
                { en: '₹3-6 lakh', hi: '₹3-6 लाख', te: '₹3-6 లక్షలు', ta: '₹3-6 லட்சம்', value: true },
                { en: 'Above ₹6 lakh', hi: '₹6 लाख से अधिक', te: '₹6 లక్షల కంటే ఎక్కువ', ta: '₹6 லட்சத்திற்கு மேல்', value: false }
            ]
        }
    ]
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let quizAnswers = [];

function startEligibilityChecker() {
    currentQuiz = 'pmay';
    currentQuestionIndex = 0;
    quizAnswers = [];

    showQuizQuestion();
    document.getElementById('quizModal').classList.add('active');
    document.getElementById('voiceCommandIndicator').classList.add('active');

    // Simulate voice guidance
    setTimeout(() => {
        document.getElementById('voiceCommandIndicator').classList.remove('active');
    }, 2000);

    awardStars(3, 'Started eligibility check!');
}

function showQuizQuestion() {
    const questions = eligibilityQuestions[currentQuiz];
    if (currentQuestionIndex >= questions.length) {
        showQuizResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    const quizContent = document.getElementById('quizContent');

    quizContent.innerHTML = `
        <div class="quiz-question">${question.question[currentLanguage]}</div>
        <div class="quiz-options">
            ${question.options.map((opt, idx) => `
                <div class="quiz-option" data-value="${opt.value}" data-index="${idx}">
                    ${opt[currentLanguage]}
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', function () {
            document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            quizAnswers[currentQuestionIndex] = this.dataset.value === 'true';
        });
    });

    // Update navigation
    document.getElementById('prevQuizBtn').disabled = currentQuestionIndex === 0;
}

function showQuizResult() {
    const eligible = quizAnswers.every(a => a === true);
    const quizContent = document.getElementById('quizContent');

    quizContent.innerHTML = `
        <div style="text-align: center; padding: 24px;">
            <div style="font-size: 64px; margin-bottom: 16px;">${eligible ? '✅' : '❌'}</div>
            <h3 style="font-size: 20px; margin-bottom: 12px;">
                ${eligible ? 'You are eligible!' : 'Not eligible at this time'}
            </h3>
            <p style="font-size: 14px; opacity: 0.8; line-height: 1.5;">
                ${eligible
            ? 'Based on your responses, you qualify for PM Awas Yojana. Click below to start your application.'
            : 'You may not qualify for this scheme currently, but we can help you explore other options.'}
            </p>
            ${eligible ? `
                <button class="module-btn primary" style="margin-top: 24px;" onclick="startApplication('pmay')">
                    Start Application
                </button>
            ` : `
                <button class="module-btn" style="margin-top: 24px;" onclick="exploreAlternatives()">
                    Explore Other Schemes
                </button>
            `}
        </div>
    `;

    document.getElementById('nextQuizBtn').textContent = 'Close';
    document.getElementById('nextQuizBtn').onclick = () => {
        document.getElementById('quizModal').classList.remove('active');
    };

    if (eligible) {
        awardStars(10, 'Eligible for PMAY!');
        createCometNotification('🎉', 'Congratulations! You qualify for PM Awas Yojana');
    }
}

document.getElementById('startCheckerBtn').addEventListener('click', startEligibilityChecker);

document.getElementById('prevQuizBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuizQuestion();
    }
});

document.getElementById('nextQuizBtn').addEventListener('click', () => {
    if (quizAnswers[currentQuestionIndex] !== undefined) {
        currentQuestionIndex++;
        showQuizQuestion();
    }
});

document.getElementById('quizModalClose').addEventListener('click', () => {
    document.getElementById('quizModal').classList.remove('active');
});

// ========================================
// APPLICATION TRACKER
// ========================================

let applications = [
    { id: 1, scheme: 'PMAY', status: 'Under Review', date: '2026-02-05', icon: '📝' },
    { id: 2, scheme: 'Ayushman Bharat', status: 'Approved', date: '2026-01-28', icon: '✅' },
    { id: 3, scheme: 'MGNREGA', status: 'Pending Documents', date: '2026-02-01', icon: '⏳' }
];

function updateApplicationTracker() {
    const timeline = document.getElementById('trackerTimeline');

    timeline.innerHTML = applications.map(app => `
        <div class="tracker-item">
            <div class="tracker-icon">${app.icon}</div>
            <div class="tracker-content">
                <div class="tracker-title">${app.scheme}</div>
                <div class="tracker-status">${app.status} • ${app.date}</div>
            </div>
        </div>
    `).join('');
}

function startApplication(schemeId) {
    const scheme = schemesDatabase.find(s => s.id === schemeId);
    if (scheme) {
        applications.unshift({
            id: applications.length + 1,
            scheme: scheme.name.en,
            status: 'Submitted',
            date: new Date().toISOString().split('T')[0],
            icon: '📤'
        });

        userState.applications++;
        updateApplicationTracker();
        updateDashboard();
        saveUserState();

        createCometNotification('📤', `Application submitted for ${scheme.name[currentLanguage]}`);
        awardStars(15, 'Submitted an application!');

        document.getElementById('quizModal').classList.remove('active');
    }
}

// ========================================
// EMOTIONAL AI SUPPORT
// ========================================

let emotionalState = 'neutral';
const emotions = {
    happy: { icon: '😊', color: '#7fffd4' },
    neutral: { icon: '😐', color: '#00d9ff' },
    stressed: { icon: '😟', color: '#ff6b9d' },
    motivated: { icon: '💪', color: '#ffd700' }
};

function analyzeEmotion(message) {
    const stressWords = ['difficult', 'hard', 'struggle', 'problem', 'worried', 'मुश्किल', 'कठिन', 'समस्या'];
    const happyWords = ['thank', 'great', 'good', 'happy', 'धन्यवाद', 'अच्छा', 'खुश'];

    const lowerMessage = message.toLowerCase();

    if (stressWords.some(word => lowerMessage.includes(word))) {
        emotionalState = 'stressed';
        showEmotionalSupport();
    } else if (happyWords.some(word => lowerMessage.includes(word))) {
        emotionalState = 'happy';
    }

    updateEmotionIndicator();
}

function updateEmotionIndicator() {
    const indicator = document.getElementById('emotionIndicator');
    const icon = indicator.querySelector('.emotion-icon');
    icon.textContent = emotions[emotionalState].icon;
}

function showEmotionalSupport() {
    document.getElementById('supportActions').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('supportActions').style.display = 'none';
    }, 10000);
}

document.getElementById('emotionIndicator').addEventListener('click', () => {
    const actions = document.getElementById('supportActions');
    actions.style.display = actions.style.display === 'none' ? 'flex' : 'none';
});

document.getElementById('counselingBtn').addEventListener('click', () => {
    addBotMessage('I understand this can be challenging. Here are some free counseling resources:\n\n📞 National Helpline: 1800-XXX-XXXX\n🏥 Local Mental Health Center\n💬 Online Support Groups');
    awardStars(5, 'Accessed counseling resources');
});

document.getElementById('motivationBtn').addEventListener('click', () => {
    const quotes = [
        'Every step forward, no matter how small, is progress. You\'re doing great! 💪',
        'Your determination to improve your situation is inspiring. Keep going! 🌟',
        'Remember: This is temporary. Better days are ahead! 🌅',
        'You\'re not alone in this journey. We\'re here to support you! 🤝'
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    addBotMessage(quote);
    awardStars(3, 'Received motivation');
});

// ========================================
// GAMIFICATION SYSTEM
// ========================================

function awardStars(amount, reason) {
    userState.welfareStars += amount;
    userState.interactions++;
    updateDashboard();
    saveUserState();

    // Show achievement popup
    const popup = document.getElementById('achievementPopup');
    const text = popup.querySelector('.achievement-text');
    text.textContent = `+${amount} ⭐ ${reason}`;

    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);

    // Check for milestones
    checkAchievements();
}

function checkAchievements() {
    if (userState.welfareStars >= 50 && !userState.achievements.includes('star50')) {
        userState.achievements.push('star50');
        createCometNotification('🏆', 'Achievement Unlocked: 50 Welfare Stars!');
    }

    if (userState.interactions >= 10 && !userState.achievements.includes('active10')) {
        userState.achievements.push('active10');
        createCometNotification('🎯', 'Achievement: Active User!');
    }
}

// ========================================
// NOTIFICATION COMETS
// ========================================

function createCometNotification(icon, text) {
    const container = document.getElementById('cometsContainer');
    const comet = document.createElement('div');
    comet.className = 'comet';
    comet.innerHTML = `
        <span class="comet-icon">${icon}</span>
        <span class="comet-text">${text}</span>
    `;

    container.appendChild(comet);

    setTimeout(() => {
        comet.remove();
    }, 3000);

    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
}

// ========================================
// AR PREVIEW
// ========================================

document.getElementById('arTrigger').addEventListener('click', () => {
    const modal = document.getElementById('arModal');
    const arModel = document.getElementById('arModel');

    arModel.innerHTML = '🏠';
    arModel.style.fontSize = '64px';

    modal.classList.add('active');
    awardStars(5, 'Viewed AR preview');
});

document.getElementById('arModalClose').addEventListener('click', () => {
    document.getElementById('arModal').classList.remove('active');
});

document.getElementById('rotateBtn').addEventListener('click', () => {
    const model = document.getElementById('arModel');
    model.style.transform = `rotateY(${Math.random() * 360}deg)`;
});

document.getElementById('zoomBtn').addEventListener('click', () => {
    const model = document.getElementById('arModel');
    const currentScale = parseFloat(model.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || 1);
    const newScale = currentScale === 1 ? 1.5 : 1;
    model.style.transform = `scale(${newScale})`;
});

// ========================================
// OFFLINE MODE
// ========================================

function initializeOfflineMode() {
    // Cache schemes data
    localStorage.setItem('cachedSchemes', JSON.stringify(schemesDatabase));

    // Monitor online/offline status
    window.addEventListener('online', () => {
        document.getElementById('offlineIndicator').classList.remove('active');
        syncOfflineData();
    });

    window.addEventListener('offline', () => {
        document.getElementById('offlineIndicator').classList.add('active');
    });
}

function syncOfflineData() {
    // Simulate syncing
    createCometNotification('🔄', 'Syncing your data...');
    setTimeout(() => {
        createCometNotification('✅', 'All data synced successfully!');
    }, 2000);
}

// ========================================
// VOICE COMMANDS
// ========================================

function initializeVoiceCommands() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;

        // Voice command keywords
        const commands = {
            'check eligibility': startEligibilityChecker,
            'view plan': showPersonalizedPlan,
            'show schemes': () => {
                document.getElementById('schemesCarousel').scrollIntoView({ behavior: 'smooth' });
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

            for (const [command, action] of Object.entries(commands)) {
                if (transcript.includes(command)) {
                    action();
                    break;
                }
            }
        };
    }
}

// ========================================
// ENHANCED CHAT WITH EMOTION ANALYSIS
// ========================================

const originalSendMessage = sendMessage;
window.sendMessage = function (message) {
    analyzeEmotion(message);
    originalSendMessage(message);
    awardStars(1, 'Sent a message');
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    updateApplicationTracker();
    initializeOfflineMode();
    initializeVoiceCommands();

    // Simulate progress
    setTimeout(() => {
        userState.povertyReductionProgress = 35;
        userState.savings = 12500;
        updateDashboard();
        saveUserState();
    }, 1000);

    // Welcome achievement
    if (userState.interactions === 0) {
        setTimeout(() => {
            awardStars(10, 'Welcome to Welfare Support!');
        }, 2000);
    }
});

// Export functions for global access
window.startApplication = startApplication;
window.exploreAlternatives = function () {
    document.getElementById('quizModal').classList.remove('active');
    document.getElementById('schemesCarousel').scrollIntoView({ behavior: 'smooth' });
    addBotMessage('Let me show you other schemes you might be eligible for. Check out the carousel above!');
};
