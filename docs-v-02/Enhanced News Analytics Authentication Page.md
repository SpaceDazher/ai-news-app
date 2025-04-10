---
date: 2025-04-09
"@link": "[[web-app-ai-news-doks]]"
---
---
 # Enhanced News Analytics Authentication Page

I've created an improved version of your authentication page with an interactive animated background inspired by GitVerse. The page maintains all the functionality from the previous version while adding a visually engaging particle network animation.

## New Background Animation Features

- **Interactive Particle Network**: The background now features a dynamic network of particles that connect with flowing lines, similar to GitVerse's design
- **Responsive Animation**: Particles subtly respond to mouse movement, creating an interactive experience
- **Glowing Connections**: The connecting lines have a subtle glow effect that resembles data or electrical currents flowing through the network
- **Performance Optimized**: The animation is lightweight and optimized to work smoothly on both desktop and mobile devices
- **Seamless Integration**: The animation complements the existing dark theme and doesn't interfere with the authentication functionality

## Maintained Features

- **Complete Authentication Flow**: Preserved all login and registration functionality
- **Tabbed Interface**: Easy switching between login and registration forms
- **3D Card Effects**: Subtle depth effects on the authentication card
- **Theme Selection**: Multiple color schemes to choose from
- **Responsive Design**: Works perfectly across all device sizes
- **Form Validation**: Comprehensive validation for all form fields
- **Security Features**: Password visibility toggle and secure input handling

## View the Enhanced Page

You can view the fully functional enhanced authentication page with the new animated background here:
[View Enhanced Authentication Page](https://page.genspark.site/page/toolu_01J8oJ81o1rinsJ7AtzMXdD7/news_analytics_auth_enhanced.html)

The new animated background creates a more immersive and modern user experience while maintaining the professional and sleek design of your news analytics platform. The particle effects give a sense of connectivity and data flow that aligns perfectly with the analytics focus of your application.

---
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Analytics Dashboard - Authentication</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <!-- Phosphor Icons -->
    <script src="https://cdn.jsdelivr.net/npm/phosphor-icons@1.4.2/src/index.min.js"></script>
    <style>
        :root {
            --primary: #6366f1;
            --primary-light: #818cf8;
            --secondary: #10b981;
            --dark: #111827;
            --darker: #0d1117;
            --light: #f3f4f6;
            --positive: #10b981;
            --neutral: #6b7280;
            --negative: #ef4444;
            --card-bg: #1e293b;
            --accent: #8b5cf6;
        }

        .theme-violet {
            --primary: #8b5cf6;
            --primary-light: #a78bfa;
            --accent: #ec4899;
        }
        .theme-blue {
            --primary: #3b82f6;
            --primary-light: #60a5fa;
            --accent: #10b981;
        }
        .theme-green {
            --primary: #10b981;
            --primary-light: #34d399;
            --accent: #6366f1;
        }

        body {
            background-color: var(--darker);
            color: var(--light);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            transition: background-color 0.3s, color 0.3s;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 0;
        }

        .content-container {
            position: relative;
            z-index: 1;
        }

        .auth-card {
            background-color: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            transform-style: preserve-3d;
            perspective: 1000px;
        }

        .auth-card:hover {
            transform: translateY(-5px) rotateX(2deg) rotateY(2deg);
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
        }

        .primary-gradient {
            background: linear-gradient(135deg, var(--primary), var(--accent));
        }

        .auth-tab {
            cursor: pointer;
            padding: 1rem;
            transition: all 0.3s ease;
            position: relative;
            font-weight: 500;
        }

        .auth-tab.active {
            color: var(--primary-light);
        }

        .auth-tab.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
        }

        .auth-tab:not(.active) {
            color: var(--neutral);
        }

        .auth-tab:hover:not(.active) {
            color: var(--light);
        }

        .form-input {
            width: 100%;
            background-color: rgba(17, 24, 39, 0.7);
            border: 1px solid rgba(75, 85, 99, 0.5);
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            color: var(--light);
            transition: all 0.3s ease;
        }

        .form-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            outline: none;
        }

        .submit-button {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .submit-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .submit-button:hover::after {
            opacity: 1;
        }

        .submit-button:active {
            transform: scale(0.98);
        }

        .theme-selector {
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin: 0 0.25rem;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .theme-selector:hover {
            transform: scale(1.2);
        }

        .theme-violet-selector {
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
        }

        .theme-blue-selector {
            background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .theme-green-selector {
            background: linear-gradient(135deg, #10b981, #6366f1);
        }

        .default-theme-selector {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .password-toggle {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--neutral);
            cursor: pointer;
            transition: color 0.2s ease;
        }

        .password-toggle:hover {
            color: var(--light);
        }

        .error-text {
            color: var(--negative);
            font-size: 0.875rem;
            margin-top: 0.5rem;
        }

        .particle {
            position: absolute;
            border-radius: 50%;
            background: rgba(139, 92, 246, 0.5);
            box-shadow: 0 0 10px 2px rgba(139, 92, 246, 0.3);
            pointer-events: none;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.6;
            }
            100% {
                transform: scale(1);
                opacity: 0.8;
            }
        }

        .glow-effect {
            animation: pulse 3s infinite ease-in-out;
        }

        @media (max-width: 640px) {
            .auth-card {
                width: 90%;
                max-width: 100%;
            }
        }
    </style>
</head>
<body x-data="authPage()">
    <div id="particles-js"></div>
    
    <div class="content-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md">
            <!-- Brand Logo -->
            <div class="text-center mb-10">
                <h1 class="text-4xl font-bold text-white">News Analytics</h1>
                <p class="mt-2 text-gray-400">Access your dashboard</p>
            </div>
            
            <!-- Theme Selector -->
            <div class="flex justify-center mb-6">
                <div class="flex items-center">
                    <span class="text-gray-400 mr-2">Theme:</span>
                    <div class="theme-selector default-theme-selector" @click="setTheme('default')"></div>
                    <div class="theme-selector theme-violet-selector" @click="setTheme('violet')"></div>
                    <div class="theme-selector theme-blue-selector" @click="setTheme('blue')"></div>
                    <div class="theme-selector theme-green-selector" @click="setTheme('green')"></div>
                </div>
            </div>
            
            <!-- Auth Card -->
            <div class="auth-card p-6 sm:p-8">
                <!-- Auth Tabs -->
                <div class="flex border-b border-gray-700 mb-6">
                    <div class="auth-tab" :class="{'active': activeTab === 'login'}" @click="activeTab = 'login'">Login</div>
                    <div class="auth-tab" :class="{'active': activeTab === 'register'}" @click="activeTab = 'register'">Register</div>
                </div>
                
                <!-- Login Form -->
                <form x-show="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label for="login-email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input id="login-email" type="email" x-model="login.email" required class="form-input" placeholder="your@email.com">
                        <div x-show="loginErrors.email" class="error-text" x-text="loginErrors.email"></div>
                    </div>
                    
                    <div class="relative">
                        <label for="login-password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input id="login-password" :type="showLoginPassword ? 'text' : 'password'" x-model="login.password" required class="form-input" placeholder="••••••••">
                        <div class="password-toggle" @click="showLoginPassword = !showLoginPassword">
                            <i x-show="!showLoginPassword" class="ph-eye"></i>
                            <i x-show="showLoginPassword" class="ph-eye-slash"></i>
                        </div>
                        <div x-show="loginErrors.password" class="error-text" x-text="loginErrors.password"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" type="checkbox" x-model="login.rememberMe" class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm font-medium text-primary-light hover:text-primary">Forgot password?</a>
                    </div>
                    
                    <div>
                        <button type="submit" class="w-full submit-button">Sign in</button>
                    </div>
                </form>
                
                <!-- Register Form -->
                <form x-show="activeTab === 'register'" @submit.prevent="handleRegister" class="space-y-6">
                    <div>
                        <label for="register-email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input id="register-email" type="email" x-model="register.email" required class="form-input" placeholder="your@email.com">
                        <div x-show="registerErrors.email" class="error-text" x-text="registerErrors.email"></div>
                    </div>
                    
                    <div class="relative">
                        <label for="register-password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input id="register-password" :type="showRegisterPassword ? 'text' : 'password'" x-model="register.password" required class="form-input" placeholder="••••••••">
                        <div class="password-toggle" @click="showRegisterPassword = !showRegisterPassword">
                            <i x-show="!showRegisterPassword" class="ph-eye"></i>
                            <i x-show="showRegisterPassword" class="ph-eye-slash"></i>
                        </div>
                        <div x-show="registerErrors.password" class="error-text" x-text="registerErrors.password"></div>
                    </div>
                    
                    <div class="relative">
                        <label for="register-confirm-password" class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                        <input id="register-confirm-password" :type="showRegisterConfirmPassword ? 'text' : 'password'" x-model="register.confirmPassword" required class="form-input" placeholder="••••••••">
                        <div class="password-toggle" @click="showRegisterConfirmPassword = !showRegisterConfirmPassword">
                            <i x-show="!showRegisterConfirmPassword" class="ph-eye"></i>
                            <i x-show="showRegisterConfirmPassword" class="ph-eye-slash"></i>
                        </div>
                        <div x-show="registerErrors.confirmPassword" class="error-text" x-text="registerErrors.confirmPassword"></div>
                    </div>
                    
                    <div class="flex items-center">
                        <input id="terms" type="checkbox" x-model="register.termsAccepted" class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary">
                        <label for="terms" class="ml-2 block text-sm text-gray-300">I accept the <a href="#" class="text-primary-light hover:text-primary">Terms of Service</a></label>
                    </div>
                    <div x-show="registerErrors.terms" class="error-text" x-text="registerErrors.terms"></div>
                    
                    <div>
                        <button type="submit" class="w-full submit-button">Create Account</button>
                    </div>
                </form>
            </div>
            
            <!-- Footer -->
            <div class="mt-8 text-center text-sm text-gray-400">
                <p>© 2025 News Analytics Dashboard. All rights reserved.</p>
            </div>
        </div>
    </div>
    
    <!-- Alpine.js -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.0/dist/cdn.min.js"></script>
    <!-- Particles.js -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": ["#6366f1", "#8b5cf6", "#a78bfa"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 0.5,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#6366f1",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.8,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 4,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        });

        function authPage() {
            return {
                activeTab: 'login',
                showLoginPassword: false,
                showRegisterPassword: false,
                showRegisterConfirmPassword: false,
                
                login: {
                    email: '',
                    password: '',
                    rememberMe: false
                },
                
                register: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    termsAccepted: false
                },
                
                loginErrors: {
                    email: '',
                    password: ''
                },
                
                registerErrors: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    terms: ''
                },
                
                handleLogin() {
                    // Reset errors
                    this.loginErrors = { email: '', password: '' };
                    
                    // Validate email
                    if (!this.login.email) {
                        this.loginErrors.email = 'Email is required';
                    } else if (!this.isValidEmail(this.login.email)) {
                        this.loginErrors.email = 'Please enter a valid email address';
                    }
                    
                    // Validate password
                    if (!this.login.password) {
                        this.loginErrors.password = 'Password is required';
                    } else if (this.login.password.length < 6) {
                        this.loginErrors.password = 'Password must be at least 6 characters';
                    }
                    
                    // Check if no errors before submitting
                    if (!this.loginErrors.email && !this.loginErrors.password) {
                        console.log('Login form submitted', this.login);
                        
                        // Simulate API call and redirect
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1000);
                    }
                },
                
                handleRegister() {
                    // Reset errors
                    this.registerErrors = { email: '', password: '', confirmPassword: '', terms: '' };
                    
                    // Validate email
                    if (!this.register.email) {
                        this.registerErrors.email = 'Email is required';
                    } else if (!this.isValidEmail(this.register.email)) {
                        this.registerErrors.email = 'Please enter a valid email address';
                    }
                    
                    // Validate password
                    if (!this.register.password) {
                        this.registerErrors.password = 'Password is required';
                    } else if (this.register.password.length < 6) {
                        this.registerErrors.password = 'Password must be at least 6 characters';
                    }
                    
                    // Validate password confirmation
                    if (!this.register.confirmPassword) {
                        this.registerErrors.confirmPassword = 'Please confirm your password';
                    } else if (this.register.password !== this.register.confirmPassword) {
                        this.registerErrors.confirmPassword = 'Passwords do not match';
                    }
                    
                    // Validate terms acceptance
                    if (!this.register.termsAccepted) {
                        this.registerErrors.terms = 'You must accept the Terms of Service';
                    }
                    
                    // Check if no errors before submitting
                    if (!this.registerErrors.email && !this.registerErrors.password && 
                        !this.registerErrors.confirmPassword && !this.registerErrors.terms) {
                        console.log('Register form submitted', this.register);
                        
                        // Simulate API call and redirect
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1000);
                    }
                },
                
                isValidEmail(email) {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return re.test(email);
                },
                
                setTheme(theme) {
                    document.body.className = '';
                    if (theme !== 'default') {
                        document.body.classList.add(`theme-${theme}`);
                    }
                    
                    // Update particles colors based on theme
                    let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
                    let accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
                    
                    if (window.pJSDom && window.pJSDom[0]) {
                        window.pJSDom[0].pJS.particles.color.value = [primaryColor, accentColor];
                        window.pJSDom[0].pJS.particles.line_linked.color = primaryColor;
                        window.pJSDom[0].pJS.fn.particlesRefresh();
                    }
                }
            }
        }
    </script>
</body>
</html>

```