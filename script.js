// ========================================
// ANTIGRAVITY WELFARE CHATBOT - JAVASCRIPT
// Interactive Features & Animations
// ========================================

// Translations Database
const translations = {
    en: {
        textChat: 'Text Chat',
        voiceChat: 'Voice Chat',
        multilingual: 'Multilingual Keyboard',
        realtime: 'Real-time Speech',
        welfareSchemes: 'Welfare Schemes 2026',
        welcome: 'Welcome! I\'m here to help you access welfare schemes and support.',
        askMe: 'Ask me anything about eligibility, applications, or benefits!',
        typeMessage: 'Type your message...',
        checkEligibility: 'Check Eligibility',
        applyNow: 'Apply Now',
        learnMore: 'Learn More'
    },
    hi: {
        textChat: 'टेक्स्ट चैट',
        voiceChat: 'वॉयस चैट',
        multilingual: 'बहुभाषी कीबोर्ड',
        realtime: 'रीयल-टाइम स्पीच',
        welfareSchemes: 'कल्याण योजनाएं 2026',
        welcome: 'स्वागत है! मैं आपको कल्याण योजनाओं तक पहुंचने में मदद करने के लिए यहां हूं।',
        askMe: 'पात्रता, आवेदन या लाभों के बारे में मुझसे कुछ भी पूछें!',
        typeMessage: 'अपना संदेश टाइप करें...',
        checkEligibility: 'पात्रता जांचें',
        applyNow: 'अभी आवेदन करें',
        learnMore: 'और जानें'
    },
    te: {
        textChat: 'టెక్స్ట్ చాట్',
        voiceChat: 'వాయిస్ చాట్',
        multilingual: 'బహుభాషా కీబోర్డ్',
        realtime: 'రియల్-టైమ్ స్పీచ్',
        welfareSchemes: 'సంక్షేమ పథకాలు 2026',
        welcome: 'స్వాగతం! సంక్షేమ పథకాలను యాక్సెస్ చేయడంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను.',
        askMe: 'అర్హత, దరఖాస్తులు లేదా ప్రయోజనాల గురించి నన్ను ఏదైనా అడగండి!',
        typeMessage: 'మీ సందేశాన్ని టైప్ చేయండి...',
        checkEligibility: 'అర్హత తనిఖీ చేయండి',
        applyNow: 'ఇప్పుడు దరఖాస్తు చేయండి',
        learnMore: 'మరింత తెలుసుకోండి'
    },
    ta: {
        textChat: 'உரை அரட்டை',
        voiceChat: 'குரல் அரட்டை',
        multilingual: 'பன்மொழி விசைப்பலகை',
        realtime: 'நேரடி பேச்சு',
        welfareSchemes: 'நல திட்டங்கள் 2026',
        welcome: 'வரவேற்கிறோம்! நல திட்டங்களை அணுக உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன்.',
        askMe: 'தகுதி, விண்ணப்பங்கள் அல்லது நன்மைகள் பற்றி என்னிடம் எதையும் கேளுங்கள்!',
        typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
        checkEligibility: 'தகுதியை சரிபார்க்கவும்',
        applyNow: 'இப்போது விண்ணப்பிக்கவும்',
        learnMore: 'மேலும் அறிக'
    }
};

// Welfare Schemes Database (2026 Updated)
// Welfare Schemes Database (Dynamic)
let schemesDatabase = [];

async function fetchSchemes() {
    try {
        const response = await fetch(`${API_BASE_URL}/schemes`);
        if (response.ok) {
            const data = await response.json();
            schemesDatabase = data.schemes.map(s => ({
                id: s.schemeId || s.id,
                icon: getSchemeIcon(s.category),
                name: {
                    en: s.name,
                    // Fallback for other languages if not present in API response yet
                    hi: s.name, te: s.name, ta: s.name
                },
                update: '2026 Update',
                description: {
                    en: s.description,
                    hi: s.description, te: s.description, ta: s.description
                },
                eligibility: {
                    en: s.eligibilityCriteria,
                    hi: s.eligibilityCriteria, te: s.eligibilityCriteria, ta: s.eligibilityCriteria
                }
            }));
            updateSchemeCards();
        }
    } catch (error) {
        console.error('Failed to load schemes:', error);
    }
}

function getSchemeIcon(category) {
    const icons = {
        'Housing': '🏠',
        'Health': '🏥',
        'Employment': '👷',
        'Agriculture': '🌾',
        'Financial Inclusion': '🏦',
        'Education': '🎓'
    };
    return icons[category] || '📜';
}

// Global State
let currentLanguage = 'en';
let currentSchemeIndex = 0;
let isVoiceMode = false;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTime();
    initializeParticles();
    initializeLanguageSelector();
    initializeChatHub();
    initializeSchemesCarousel();
    initializeChatInterface();
    initializeAccessibility();
    initializeThemeToggle();
    fetchSchemes(); // Load schemes from API

    // Update time every minute
    setInterval(initializeTime, 60000);
});

// ========================================
// TIME DISPLAY
// ========================================

function initializeTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

// ========================================
// FLOATING PARTICLES
// ========================================

function initializeParticles() {
    const container = document.getElementById('particleContainer');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation values
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        // Random delay
        particle.style.animationDelay = `${Math.random() * 20}s`;

        // Random color variation
        const colors = ['#00d9ff', '#7fffd4', '#b19cd9', '#ffd700'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

// ========================================
// LANGUAGE SELECTOR
// ========================================

function initializeLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update language
            currentLanguage = btn.dataset.lang;
            updateTranslations();
            updateSchemeCards();

            // Haptic feedback (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
    });
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.dataset.translate;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.dataset.translatePlaceholder;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.placeholder = translations[currentLanguage][key];
        }
    });
}

// ========================================
// CHAT HUB
// ========================================

function initializeChatHub() {
    const textModeBtn = document.getElementById('textModeBtn');
    const voiceModeBtn = document.getElementById('voiceModeBtn');

    textModeBtn.addEventListener('click', () => {
        textModeBtn.classList.add('active');
        voiceModeBtn.classList.remove('active');
        isVoiceMode = false;

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });

    voiceModeBtn.addEventListener('click', () => {
        voiceModeBtn.classList.add('active');
        textModeBtn.classList.remove('active');
        isVoiceMode = true;

        if (navigator.vibrate) {
            navigator.vibrate([10, 5, 10]);
        }

        // Start voice recognition if available
        startVoiceRecognition();
    });
}

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        // Set language based on current selection
        const langCodes = {
            en: 'en-US',
            hi: 'hi-IN',
            te: 'te-IN',
            ta: 'ta-IN'
        };
        recognition.lang = langCodes[currentLanguage] || 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;
            sendMessage(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            addBotMessage('Sorry, I couldn\'t understand. Please try again or use text chat.');
        };

        recognition.start();
    } else {
        addBotMessage('Voice recognition is not supported in your browser. Please use text chat.');
    }
}

// ========================================
// SCHEMES CAROUSEL
// ========================================

function initializeSchemesCarousel() {
    updateSchemeCards();

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const track = document.getElementById('carouselTrack');

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
}

function updateSchemeCards() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('navDots');

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    schemesDatabase.forEach((scheme, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'scheme-card';
        card.innerHTML = `
            <div class="scheme-icon">${scheme.icon}</div>
            <div class="scheme-name">${scheme.name.en}</div>
            <div class="scheme-name-native">${scheme.name[currentLanguage]}</div>
            <div class="scheme-update">✨ ${scheme.update}</div>
            <div class="scheme-description">${scheme.description[currentLanguage]}</div>
            <div class="scheme-actions">
                <button class="scheme-btn primary" onclick="checkEligibility('${scheme.id}')">
                    ${translations[currentLanguage].checkEligibility}
                </button>
                <button class="scheme-btn" onclick="showSchemeDetails('${scheme.id}')">
                    ${translations[currentLanguage].learnMore}
                </button>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('scheme-btn')) {
                showSchemeDetails(scheme.id);
            }
        });

        track.appendChild(card);

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            track.scrollTo({ left: index * 300, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    track.addEventListener('scroll', () => {
        const scrollPosition = track.scrollLeft;
        const cardWidth = 300;
        const activeIndex = Math.round(scrollPosition / cardWidth);

        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });
}

function checkEligibility(schemeId) {
    const scheme = schemesDatabase.find(s => s.id === schemeId);
    if (scheme) {
        const message = `To check eligibility for ${scheme.name[currentLanguage]}, please answer a few questions:\n\n1. ${scheme.eligibility[currentLanguage]}\n\nDo you meet this criteria?`;
        addBotMessage(message);
    }
}

function showSchemeDetails(schemeId) {
    const scheme = schemesDatabase.find(s => s.id === schemeId);
    if (!scheme) return;

    const modal = document.getElementById('schemeModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 64px; margin-bottom: 16px;">${scheme.icon}</div>
            <h2 style="font-size: 24px; margin-bottom: 8px;">${scheme.name.en}</h2>
            <h3 style="font-size: 18px; opacity: 0.8; margin-bottom: 16px;">${scheme.name[currentLanguage]}</h3>
            <div class="scheme-update" style="display: inline-block;">✨ ${scheme.update}</div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: var(--electric-cyan);">Description</h4>
            <p style="line-height: 1.6; opacity: 0.9;">${scheme.description[currentLanguage]}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: var(--electric-cyan);">Eligibility</h4>
            <p style="line-height: 1.6; opacity: 0.9;">${scheme.eligibility[currentLanguage]}</p>
        </div>
        
        <div style="display: flex; gap: 12px; margin-top: 32px;">
            <button class="scheme-btn primary" style="flex: 1;" onclick="checkEligibility('${scheme.id}'); closeModal();">
                ${translations[currentLanguage].checkEligibility}
            </button>
            <button class="scheme-btn" style="flex: 1;" onclick="applyToScheme('${scheme.id}');">
                ${translations[currentLanguage].applyNow}
            </button>
        </div>
    `;

    modal.classList.add('active');

    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function applyToScheme(schemeId) {
    const scheme = schemesDatabase.find(s => s.id === schemeId);
    if (scheme) {
        addBotMessage(`Great! I'll help you apply for ${scheme.name[currentLanguage]}. Let me guide you through the application process...`);
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById('schemeModal');
    modal.classList.remove('active');
}

// Close modal on background click
document.getElementById('schemeModal').addEventListener('click', (e) => {
    if (e.target.id === 'schemeModal') {
        closeModal();
    }
});

document.getElementById('modalClose').addEventListener('click', closeModal);

// ========================================
// CHAT INTERFACE
// ========================================

// ========================================
// CHAT INTERFACE
// ========================================

const API_BASE_URL = '/api';

function initializeChatInterface() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceInputBtn = document.getElementById('voiceInputBtn');

    // Check authentication
    const token = localStorage.getItem('welfareToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    sendBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                chatInput.value = '';
            }
        }
    });

    voiceInputBtn.addEventListener('click', () => {
        startVoiceRecognition();
    });
}

function sendMessage(message) {
    // Add user message
    addUserMessage(message);

    // Call API for bot response
    const token = localStorage.getItem('welfareToken');

    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // Show typing indicator or just wait
    // For now we just wait for the response

    fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: message,
            language: currentLanguage
        })
    })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                window.location.href = 'login.html';
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                addBotMessage(data.response);
            } else {
                addBotMessage("I'm sorry, I'm having trouble connecting right now. Please try again.");
            }
        })
        .catch(error => {
            console.error('Chat error:', error);
            // Fallback to local logic if offline
            const response = generateBotResponse(message);
            addBotMessage(response + " (Offline Mode)");
        });
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-bubble">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'welcome-message floating';
    messageDiv.innerHTML = `
        <div class="avatar-orb">🤖</div>
        <div class="message-bubble">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    // Fallback logic for offline mode
    const lowerMessage = userMessage.toLowerCase();

    // Simple keyword-based responses
    if (lowerMessage.includes('pmay') || lowerMessage.includes('housing') || lowerMessage.includes('house')) {
        return `I can help you with PM Awas Yojana! This scheme provides affordable housing with subsidies. Would you like to check your eligibility?`;
    } else if (lowerMessage.includes('ayushman') || lowerMessage.includes('health') || lowerMessage.includes('medical')) {
        return `Ayushman Bharat provides ₹5 lakh health coverage. It covers hospitalization, medicines, and treatments. Shall I check if you're eligible?`;
    } else if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('employment')) {
        return `I can help with MGNREGA (100 days work guarantee) or Skill India training programs. Which interests you?`;
    } else if (lowerMessage.includes('food') || lowerMessage.includes('ration')) {
        return `The NFSA/PDS scheme provides subsidized food grains. Do you have a ration card? I can help you apply or check your entitlements.`;
    } else if (lowerMessage.includes('eligible') || lowerMessage.includes('qualify')) {
        return `I can check eligibility for any welfare scheme. Which scheme are you interested in? You can also browse the schemes above.`;
    } else {
        return `I'm here to help you with welfare schemes! You can ask about:\n• Housing (PMAY)\n• Healthcare (Ayushman Bharat)\n• Employment (MGNREGA, Skill India)\n• Food Security (NFSA/PDS)\n\nWhat would you like to know?`;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// ACCESSIBILITY
// ========================================

function initializeAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');

    accessibilityToggle.addEventListener('click', () => {
        document.body.classList.toggle('large-text');

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
}

// ========================================
// THEME TOGGLE
// ========================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('.icon');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            icon.textContent = '☀️';
        } else {
            icon.textContent = '🌙';
        }

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
}
// ========================================
// NAVIGATION & INTERACTIVITY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // initialize existing functions...

    // View Plan Button -> Go to Dashboard
    const viewPlanBtn = document.getElementById('viewPlanBtn');
    if (viewPlanBtn) {
        viewPlanBtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }

    // Eligibility Checker -> Open Quiz Modal
    const startCheckerBtn = document.getElementById('startCheckerBtn');
    const quizModal = document.getElementById('quizModal');
    const quizModalClose = document.getElementById('quizModalClose');

    if (startCheckerBtn && quizModal) {
        startCheckerBtn.addEventListener('click', () => {
            quizModal.style.display = 'flex';
            loadQuizQuestion(0);
        });

        quizModalClose.addEventListener('click', () => {
            quizModal.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                quizModal.style.display = 'none';
            }
        });
    }

    // AR Preview -> Show Modal
    const arTrigger = document.getElementById('arTrigger');
    const arModal = document.getElementById('arModal');
    const arModalClose = document.getElementById('arModalClose');

    if (arTrigger && arModal) {
        arTrigger.addEventListener('click', () => {
            arModal.style.display = 'flex';
        });

        arModalClose.addEventListener('click', () => {
            arModal.style.display = 'none';
        });
    }
});

let currentQuizIndex = 0;
const quizQuestions = [
    { question: "Do you own a 'pucca' house?", options: ["Yes", "No"] },
    { question: "What is your annual family income?", options: ["Below ₹1 Lakh", "₹1-3 Lakhs", "Above ₹3 Lakhs"] },
    { question: "Does anyone in your family pay income tax?", options: ["Yes", "No"] }
];

function loadQuizQuestion(index) {
    const content = document.getElementById('quizContent');
    if (!content) return;

    if (index >= quizQuestions.length) {
        content.innerHTML = `
            <h3>Quiz Completed!</h3>
            <p>Based on your answers, we found 5 relevant schemes.</p>
            <button class="quiz-btn primary" onclick="window.location.href='dashboard.html'">View Schemes</button>
        `;
        document.getElementById('prevQuizBtn').style.display = 'none';
        document.getElementById('nextQuizBtn').style.display = 'none';
        return;
    }

    const q = quizQuestions[index];
    content.innerHTML = `
        <h3>${q.question}</h3>
        <div class="quiz-options">
            ${q.options.map(opt => `<button class="quiz-option-btn" onclick="selectQuizOption('${opt}')">${opt}</button>`).join('')}
        </div>
    `;

    currentQuizIndex = index;
}

function selectQuizOption(option) {
    // visual feedback
    const btns = document.querySelectorAll('.quiz-option-btn');
    btns.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');

    // Auto advance after delay
    setTimeout(() => {
        loadQuizQuestion(currentQuizIndex + 1);
    }, 500);
}

// Global scope
window.selectQuizOption = selectQuizOption;
