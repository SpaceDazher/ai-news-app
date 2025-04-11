import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectAuthData } from '@/entities/user/model/authSlice';
import { AuthFeature } from '@/features/auth'; 
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectAuthData);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/manage-sources', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (window.particlesJS && !window.pJSDom?.length) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ['#6366f1', '#8b5cf6', '#a78bfa'] },
          shape: { type: 'circle' },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            bubble: { distance: 400, size: 4, duration: 2, opacity: 0.8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    document.body.className = '';
    if (theme !== 'default') {
      document.body.classList.add(`theme-${theme}`);
    }
    // Обновить цвета частиц
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.color.value = [primary, accent];
      window.pJSDom[0].pJS.particles.line_linked.color = primary;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  };

  return (
    <div className="auth-page-root">
      <div id="particles-js"></div>

      {/* Измененный контейнер для центрирования */}
      <div className="content-container min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Блок с заголовком и темой, теперь над формой */}
        <div className="text-center mb-10 z-10">
          <h1 className="text-4xl font-bold text-white mb-2">News AI App</h1>
          <p className="text-gray-400 mb-4">Access your dashboard</p>
          <div className="flex justify-center items-center">
            <span className="text-gray-400 mr-2">Theme:</span>
            <div className="theme-selector default-theme-selector" onClick={() => handleThemeChange('default')}></div>
            <div className="theme-selector theme-violet-selector" onClick={() => handleThemeChange('violet')}></div>
            <div className="theme-selector theme-blue-selector" onClick={() => handleThemeChange('blue')}></div>
            <div className="theme-selector theme-green-selector" onClick={() => handleThemeChange('green')}></div>
          </div>
        </div>

        {/* Карточка аутентификации */}
        <div className="w-full z-10" style={{ maxWidth: '460px', minHeight: '550px' }}>
          <AuthFeature />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
