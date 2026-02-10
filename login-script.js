// ========================================
// ANTIGRAVITY LOGIN - JAVASCRIPT
// Interactive Login Flow
// ========================================

let currentLanguage = 'en';
let currentStep = 1;
let userMobile = '';

// Translations
const loginTranslations = {
    en: {
        tagline: 'Empowering Communities, Reducing Poverty',
        welcomeTitle: 'Welcome to Your Welfare Journey',
        welcomeSubtitle: 'Choose your preferred login method',
        mobileLogin: 'Mobile Number',
        mobileDesc: 'OTP Verification',
        aadhaarLogin: 'Aadhaar',
        aadhaarDesc: 'Secure & Fast',
        voiceLogin: 'Voice Login',
        voiceDesc: 'Speak to Login',
        biometricLogin: 'Biometric',
        biometricDesc: 'Fingerprint/Face',
        orContinue: 'Or continue with',
        enterMobile: 'Enter Your Mobile Number',
        sendOtp: 'Send OTP',
        speakNumber: 'Speak your number',
        verifyOtp: 'Verify OTP',
        resendIn: 'Resend OTP in',
        verify: 'Verify',
        completeProfile: 'Complete Your Profile',
        helpUsServe: 'Help us serve you better',
        fullName: 'Full Name',
        aadhaarNumber: 'Aadhaar Number (Optional)',
        dob: 'Date of Birth',
        gender: 'Gender',
        address: 'Address',
        district: 'District',
        state: 'State',
        income: 'Monthly Income',
        familySize: 'Family Size',
        continue: 'Continue to Dashboard',
        biometricVerify: 'Biometric Verification',
        placeFingerprint: 'Place your finger on the sensor',
        useOtherMethod: 'Use another method',
        privacyText: 'Your data is encrypted and used only for welfare matching',
        loginSuccess: 'Login Successful!',
        redirecting: 'Redirecting to your dashboard...'
    },
    hi: {
        tagline: 'समुदायों को सशक्त बनाना, गरीबी कम करना',
        welcomeTitle: 'आपकी कल्याण यात्रा में आपका स्वागत है',
        welcomeSubtitle: 'अपनी पसंदीदा लॉगिन विधि चुनें',
        mobileLogin: 'मोबाइल नंबर',
        mobileDesc: 'OTP सत्यापन',
        aadhaarLogin: 'आधार',
        aadhaarDesc: 'सुरक्षित और तेज़',
        voiceLogin: 'वॉयस लॉगिन',
        voiceDesc: 'बोलकर लॉगिन करें',
        biometricLogin: 'बायोमेट्रिक',
        biometricDesc: 'फिंगरप्रिंट/चेहरा',
        orContinue: 'या जारी रखें',
        enterMobile: 'अपना मोबाइल नंबर दर्ज करें',
        sendOtp: 'OTP भेजें',
        speakNumber: 'अपना नंबर बोलें',
        verifyOtp: 'OTP सत्यापित करें',
        resendIn: 'OTP पुनः भेजें',
        verify: 'सत्यापित करें',
        completeProfile: 'अपनी प्रोफ़ाइल पूरी करें',
        helpUsServe: 'हमें आपकी बेहतर सेवा करने में मदद करें',
        fullName: 'पूरा नाम',
        aadhaarNumber: 'आधार नंबर (वैकल्पिक)',
        dob: 'जन्म तिथि',
        gender: 'लिंग',
        address: 'पता',
        district: 'जिला',
        state: 'राज्य',
        income: 'मासिक आय',
        familySize: 'परिवार का आकार',
        continue: 'डैशबोर्ड पर जाएं',
        biometricVerify: 'बायोमेट्रिक सत्यापन',
        placeFingerprint: 'सेंसर पर अपनी उंगली रखें',
        useOtherMethod: 'दूसरी विधि का उपयोग करें',
        privacyText: 'आपका डेटा एन्क्रिप्टेड है और केवल कल्याण मिलान के लिए उपयोग किया जाता है',
        loginSuccess: 'लॉगिन सफल!',
        redirecting: 'आपके डैशबोर्ड पर रीडायरेक्ट किया जा रहा है...'
    },
    te: {
        tagline: 'కమ్యూనిటీలను శక్తివంతం చేయడం, పేదరికాన్ని తగ్గించడం',
        welcomeTitle: 'మీ సంక్షేమ ప్రయాణానికి స్వాగతం',
        welcomeSubtitle: 'మీ ఇష్టమైన లాగిన్ పద్ధతిని ఎంచుకోండి',
        mobileLogin: 'మొబైల్ నంబర్',
        mobileDesc: 'OTP ధృవీకరణ',
        aadhaarLogin: 'ఆధార్',
        aadhaarDesc: 'సురక్షితం & వేగం',
        voiceLogin: 'వాయిస్ లాగిన్',
        voiceDesc: 'మాట్లాడి లాగిన్ చేయండి',
        biometricLogin: 'బయోమెట్రిక్',
        biometricDesc: 'వేలిముద్ర/ముఖం',
        orContinue: 'లేదా కొనసాగించండి',
        enterMobile: 'మీ మొబైల్ నంబర్ నమోదు చేయండి',
        sendOtp: 'OTP పంపండి',
        speakNumber: 'మీ నంబర్ చెప్పండి',
        verifyOtp: 'OTP ధృవీకరించండి',
        resendIn: 'OTP మళ్లీ పంపండి',
        verify: 'ధృవీకరించండి',
        completeProfile: 'మీ ప్రొఫైల్ పూర్తి చేయండి',
        helpUsServe: 'మీకు మెరుగైన సేవ అందించడంలో మాకు సహాయపడండి',
        fullName: 'పూర్తి పేరు',
        aadhaarNumber: 'ఆధార్ నంబర్ (ఐచ్ఛికం)',
        dob: 'పుట్టిన తేదీ',
        gender: 'లింగం',
        address: 'చిరునామా',
        district: 'జిల్లా',
        state: 'రాష్ట్రం',
        income: 'నెలవారీ ఆదాయం',
        familySize: 'కుటుంబ పరిమాణం',
        continue: 'డాష్‌బోర్డ్‌కు కొనసాగించండి',
        biometricVerify: 'బయోమెట్రిక్ ధృవీకరణ',
        placeFingerprint: 'సెన్సార్‌పై మీ వేలు ఉంచండి',
        useOtherMethod: 'మరొక పద్ధతిని ఉపయోగించండి',
        privacyText: 'మీ డేటా ఎన్‌క్రిప్ట్ చేయబడింది మరియు సంక్షేమ మ్యాచింగ్ కోసం మాత్రమే ఉపయోగించబడుతుంది',
        loginSuccess: 'లాగిన్ విజయవంతమైంది!',
        redirecting: 'మీ డాష్‌బోర్డ్‌కు దారి మళ్లిస్తోంది...'
    },
    ta: {
        tagline: 'சமூகங்களை மேம்படுத்துதல், வறுமையைக் குறைத்தல்',
        welcomeTitle: 'உங்கள் நல பயணத்திற்கு வரவேற்கிறோம்',
        welcomeSubtitle: 'உங்கள் விருப்பமான உள்நுழைவு முறையைத் தேர்ந்தெடுக்கவும்',
        mobileLogin: 'மொபைல் எண்',
        mobileDesc: 'OTP சரிபார்ப்பு',
        aadhaarLogin: 'ஆதார்',
        aadhaarDesc: 'பாதுகாப்பான & வேகமான',
        voiceLogin: 'குரல் உள்நுழைவு',
        voiceDesc: 'பேசி உள்நுழையவும்',
        biometricLogin: 'பயோமெட்ரிக்',
        biometricDesc: 'கைரேகை/முகம்',
        orContinue: 'அல்லது தொடரவும்',
        enterMobile: 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
        sendOtp: 'OTP அனுப்பவும்',
        speakNumber: 'உங்கள் எண்ணைச் சொல்லுங்கள்',
        verifyOtp: 'OTP சரிபார்க்கவும்',
        resendIn: 'OTP மீண்டும் அனுப்பவும்',
        verify: 'சரிபார்க்கவும்',
        completeProfile: 'உங்கள் சுயவிவரத்தை நிறைவு செய்யவும்',
        helpUsServe: 'உங்களுக்கு சிறப்பாக சேவை செய்ய எங்களுக்கு உதவவும்',
        fullName: 'முழு பெயர்',
        aadhaarNumber: 'ஆதார் எண் (விருப்பம்)',
        dob: 'பிறந்த தேதி',
        gender: 'பாலினம்',
        address: 'முகவரி',
        district: 'மாவட்டம்',
        state: 'மாநிலம்',
        income: 'மாதாந்திர வருமானம்',
        familySize: 'குடும்ப அளவு',
        continue: 'டாஷ்போர்டுக்குத் தொடரவும்',
        biometricVerify: 'பயோமெட்ரிக் சரிபார்ப்பு',
        placeFingerprint: 'சென்சாரில் உங்கள் விரலை வைக்கவும்',
        useOtherMethod: 'வேறு முறையைப் பயன்படுத்தவும்',
        privacyText: 'உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு நல பொருத்தத்திற்கு மட்டுமே பயன்படுத்தப்படுகிறது',
        loginSuccess: 'உள்நுழைவு வெற்றிகரமாக!',
        redirecting: 'உங்கள் டாஷ்போர்டுக்கு திருப்பிவிடப்படுகிறது...'
    }
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeLanguageSelector();
    initializeLoginMethods();
    initializeOTPInputs();
    initializeFormValidation();
    initializeMouseEffects();
});

// ========================================
// MOUSE EFFECTS (PARALLAX & GLARE)
// ========================================

function initializeMouseEffects() {
    const nebulaLayers = document.querySelectorAll('.nebula-layer');
    const formOrbs = document.querySelectorAll('.form-orb, .method-orb');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Nebula Parallax
        nebulaLayers.forEach((layer, index) => {
            const factor = (index + 1) * 20;
            layer.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1.1)`;
        });

        // Form Glare Parallax
        formOrbs.forEach(orb => {
            const rect = orb.getBoundingClientRect();
            const orbX = (e.clientX - rect.left) / rect.width;
            const orbY = (e.clientY - rect.top) / rect.height;

            orb.style.setProperty('--glare-x', `${orbX * 100}%`);
            orb.style.setProperty('--glare-y', `${orbY * 100}%`);
        });
    });
}

// ========================================
// PARTICLE FIELD
// ========================================

function initializeParticles() {
    const particleField = document.getElementById('particleField');
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particleField.appendChild(particle);
    }
}

// ========================================
// LANGUAGE SELECTOR
// ========================================

function initializeLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-option');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
            updateTranslations();
        });
    });
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.dataset.translate;
        if (loginTranslations[currentLanguage][key]) {
            el.textContent = loginTranslations[currentLanguage][key];
        }
    });
}

// ========================================
// LOGIN METHODS
// ========================================

function initializeLoginMethods() {
    document.getElementById('mobileLoginBtn').addEventListener('click', () => {
        goToStep(2);
    });

    document.getElementById('aadhaarLoginBtn').addEventListener('click', () => {
        goToStep(4); // Skip to profile with Aadhaar autofill
    });

    document.getElementById('voiceLoginBtn').addEventListener('click', () => {
        startVoiceLogin();
    });

    document.getElementById('biometricLoginBtn').addEventListener('click', () => {
        goToStep(5);
        simulateBiometricScan();
    });

    // Social login buttons
    document.querySelectorAll('.social-orb').forEach(btn => {
        btn.addEventListener('click', () => {
            showSuccess();
        });
    });
}

// ========================================
// STEP NAVIGATION
// ========================================

function goToStep(stepNumber) {
    document.querySelectorAll('.login-step').forEach(step => {
        step.classList.remove('active');
    });

    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

window.goToStep = goToStep; // Make available globally

// ========================================
// MOBILE NUMBER & OTP
// ========================================

const API_BASE_URL = '/api';

document.getElementById('sendOtpBtn')?.addEventListener('click', async () => {
    const mobileInput = document.getElementById('mobileInput');
    const mobile = mobileInput.value;

    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
        userMobile = mobile;

        try {
            const sendBtn = document.getElementById('sendOtpBtn');
            const originalText = sendBtn.textContent;
            sendBtn.textContent = 'Sending...';
            sendBtn.disabled = true;

            const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile })
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('displayMobile').textContent = `+91 ${mobile}`;
                goToStep(3);
                startOTPTimer();

                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }

                // For demo purposes, log OTP to console
                if (data.otp) {
                    console.log('Demo OTP:', data.otp);
                    alert(`Demo OTP: ${data.otp}`); // Convenient for testing
                }
            } else {
                alert(data.error || 'Failed to send OTP. Please try again.');
            }

            sendBtn.textContent = originalText;
            sendBtn.disabled = false;
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please make sure the backend server is running.');
            document.getElementById('sendOtpBtn').textContent = 'Send OTP';
            document.getElementById('sendOtpBtn').disabled = false;
        }
    } else {
        mobileInput.style.borderColor = '#ff6b9d';
        setTimeout(() => {
            mobileInput.style.borderColor = '';
        }, 1000);
    }
});

// Voice mobile input
document.getElementById('voiceMobileBtn')?.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = currentLanguage === 'en' ? 'en-IN' :
            currentLanguage === 'hi' ? 'hi-IN' :
                currentLanguage === 'te' ? 'te-IN' : 'ta-IN';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const numbers = transcript.replace(/\D/g, '');
            if (numbers.length === 10) {
                document.getElementById('mobileInput').value = numbers;
            }
        };

        recognition.start();
    }
});

// ========================================
// OTP INPUTS
// ========================================

function initializeOTPInputs() {
    const otpBoxes = document.querySelectorAll('.otp-box');

    otpBoxes.forEach((box, index) => {
        box.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < otpBoxes.length - 1) {
                    otpBoxes[index + 1].focus();
                }
            }
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpBoxes[index - 1].focus();
            }
        });
    });
}

function startOTPTimer() {
    let seconds = 30;
    const timerEl = document.getElementById('otpTimer');

    const interval = setInterval(() => {
        seconds--;
        timerEl.textContent = `${seconds}s`;

        if (seconds <= 0) {
            clearInterval(interval);
            timerEl.textContent = 'Resend OTP';
            timerEl.style.cursor = 'pointer';
            timerEl.style.color = '#00d9ff';
        }
    }, 1000);
}

document.getElementById('verifyOtpBtn')?.addEventListener('click', async () => {
    const otpBoxes = document.querySelectorAll('.otp-box');
    const otp = Array.from(otpBoxes).map(box => box.value).join('');

    if (otp.length === 6) {
        try {
            const verifyBtn = document.getElementById('verifyOtpBtn');
            const originalText = verifyBtn.textContent;
            verifyBtn.textContent = 'Verifying...';
            verifyBtn.disabled = true;

            const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: userMobile, otp })
            });

            const data = await response.json();

            if (data.success) {
                if (data.isNewUser) {
                    // New user -> Go to profile completion
                    goToStep(4);
                } else {
                    // Existing user -> Login success
                    localStorage.setItem('welfareToken', data.token);
                    localStorage.setItem('welfareUserData', JSON.stringify(data.user));
                    showSuccess();
                }
            } else {
                alert(data.error || 'Invalid OTP');
                otpBoxes.forEach(box => box.value = '');
                otpBoxes[0].focus();
            }

            verifyBtn.textContent = originalText;
            verifyBtn.disabled = false;
        } catch (error) {
            console.error('Error:', error);
            alert('Verification failed. Check network connection.');
            document.getElementById('verifyOtpBtn').textContent = 'Verify OTP';
            document.getElementById('verifyOtpBtn').disabled = false;
        }
    }
});

// ========================================
// PROFILE COMPLETION
// ========================================

function initializeFormValidation() {
    const completeBtn = document.getElementById('completeProfileBtn');

    completeBtn?.addEventListener('click', async () => {
        const fullName = document.getElementById('fullName').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;

        if (fullName && dob && gender) {
            try {
                completeBtn.textContent = 'Creating Profile...';
                completeBtn.disabled = true;

                const userData = {
                    mobile: userMobile,
                    fullName,
                    aadhaar: document.getElementById('aadhaarNumber').value,
                    dob,
                    gender,
                    address: document.getElementById('address').value,
                    district: document.getElementById('district').value,
                    state: document.getElementById('state').value,
                    incomeBracket: document.getElementById('income').value, // Matches backend expectation
                    familySize: document.getElementById('familySize').value
                };

                const response = await fetch(`${API_BASE_URL}/auth/complete-profile`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem('welfareToken', data.token);
                    localStorage.setItem('welfareUserData', JSON.stringify(data.user));
                    showSuccess();
                } else {
                    alert(data.error || 'Failed to create profile');
                    completeBtn.textContent = 'Complete Profile';
                    completeBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Profile creation failed. Check network connection.');
                completeBtn.textContent = 'Complete Profile';
                completeBtn.disabled = false;
            }
        } else {
            alert('Please fill in all required fields');
        }
    });

    // Voice autofill for profile (simulated)
    document.getElementById('voiceProfileBtn')?.addEventListener('click', () => {
        alert('Listening for profile details...');
        // In a real implementation, this would parse voice input into form fields
        setTimeout(() => {
            document.getElementById('fullName').value = 'Rajesh Kumar';
            document.getElementById('dob').value = '1985-05-15';
            document.getElementById('address').value = '123, Main Street, Village Rampur';
        }, 2000);
    });
}

// QR Scan button
document.getElementById('qrScanBtn')?.addEventListener('click', () => {
    // Simulate QR scan and autofill
    document.getElementById('fullName').value = 'Rajesh Kumar';
    document.getElementById('aadhaarNumber').value = '1234-5678-9012';
    document.getElementById('dob').value = '1985-05-15';
    document.getElementById('address').value = 'Village Rampur, Dist. Guntur';

    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
});

// ========================================
// VOICE LOGIN
// ========================================

function startVoiceLogin() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();

            // Check for name or mobile
            if (transcript.includes('mobile') || /\d{10}/.test(transcript)) {
                goToStep(2);
            } else {
                showSuccess(); // Simulate voice authentication
            }
        };

        recognition.start();
        goToStep(2);
    }
}

// ========================================
// BIOMETRIC SCAN
// ========================================

function simulateBiometricScan() {
    const scanStatus = document.getElementById('scanStatus');

    setTimeout(() => {
        scanStatus.textContent = 'Scanning...';
    }, 500);

    setTimeout(() => {
        scanStatus.textContent = 'Analyzing...';
    }, 1500);

    setTimeout(() => {
        scanStatus.textContent = 'Verified ✓';
        scanStatus.style.color = '#7fffd4';

        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }

        setTimeout(() => {
            showSuccess();
        }, 1000);
    }, 2500);
}

// ========================================
// SUCCESS ANIMATION
// ========================================

function showSuccess() {
    const overlay = document.getElementById('successOverlay');
    overlay.classList.add('active');

    // Create success particles
    createSuccessParticles();

    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
}

function createSuccessParticles() {
    const container = document.querySelector('.success-particles');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = '#00d9ff';
        particle.style.borderRadius = '50%';
        particle.style.top = '50%';
        particle.style.left = '50%';

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.animation = `particle-burst 1s ease-out forwards`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        container.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-burst {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
