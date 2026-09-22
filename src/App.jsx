import { useState } from 'react';
import './App.css';
import ExploreView from './pages/ExploreView';
import campusPhoto from './assets/campus-photo.png';
import unisonLogo from './assets/unison-logo.png';

/* ── Constants ─────────────────────────────────────────────── */
const INSTITUTIONAL_DOMAIN = '@unison.mx';

/* ── SVG Icons ─────────────────────────────────────────────── */
const IconLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3zM2 15.5l10 5.5 10-5.5M2 12l10 5.5 10-5.5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── Helpers ───────────────────────────────────────────────── */
function getEmailStatus(email) {
  if (!email) return null;
  const lower = email.toLowerCase();
  const atIndex = lower.indexOf('@');
  if (atIndex === -1) return null; // still typing local part

  const domain = lower.slice(atIndex);
  if (domain === INSTITUTIONAL_DOMAIN && atIndex > 0) return 'valid';
  if (INSTITUTIONAL_DOMAIN.startsWith(domain)) return null; // still typing domain
  return 'invalid';
}

/* ── Login Component ───────────────────────────────────────── */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData]     = useState({ email: '', password: '' });
  const [showPassword, setShowPass] = useState(false);
  const [rememberMe, setRemember]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [touched, setTouched]       = useState({ email: false, password: false });

  const emailStatus = getEmailStatus(formData.email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const getEmailInputClass = () => {
    if (!touched.email || !formData.email) return 'form-input';
    if (emailStatus === 'valid') return 'form-input input-valid';
    if (emailStatus === 'invalid') return 'form-input input-error';
    return 'form-input';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError('');

    // Validations
    if (!formData.email.trim()) {
      setError('Ingresa tu correo institucional para continuar.');
      return;
    }
    if (emailStatus !== 'valid') {
      setError(`Solo se permiten correos institucionales con el dominio ${INSTITUTIONAL_DOMAIN}.`);
      return;
    }
    if (!formData.password) {
      setError('Ingresa tu contraseña.');
      return;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);

    // Demo: simulate wrong credentials
    if (formData.email !== 'usuario@unison.mx' || formData.password !== '123456') {
      setError('Credenciales incorrectas. Para probar usa: usuario@unison.mx / 123456');
      return;
    }

    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <ExploreView onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="bg-decoration" aria-hidden="true">
        <div className="bg-dots" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Card */}
      <main className="login-card" aria-label="Inicio de sesión estudiantil">
        <div className="login-card-inner">
          <aside className="login-visual" aria-hidden="true">
            <img src={campusPhoto} alt="" />
          </aside>

          <section className="login-panel">
            <div className="brand">
              <div className="brand-icon">
                <IconLogo />
              </div>
              <span className="brand-name">Portal Estudiantil</span>
              <span className="brand-badge">UNISON</span>
            </div>

            <img className="institutional-logo" src={unisonLogo} alt="Universidad de Sonora" />

            <div className="login-header">
              <h1 className="login-title">Acceso estudiantil</h1>
              <p className="login-subtitle">
                Inicia sesión con tu cuenta institucional para acceder al sistema.
              </p>
            </div>

            <div className="notice-banner" role="note">
              <IconShield />
              <p className="notice-text">
                <strong>Acceso restringido.</strong> Solo estudiantes con correo{' '}
                <strong>{INSTITUTIONAL_DOMAIN}</strong> pueden ingresar.
              </p>
            </div>

            <form
              id="login-form"
              className="login-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de inicio de sesión"
            >
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Correo institucional
                </label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <IconMail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={getEmailInputClass()}
                    placeholder={`matricula${INSTITUTIONAL_DOMAIN}`}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    spellCheck="false"
                    aria-required="true"
                    aria-describedby="email-hint"
                    inputMode="email"
                  />
                </div>
                <div
                  id="email-hint"
                  className={
                    touched.email && emailStatus === 'invalid'
                      ? 'field-hint is-error'
                      : touched.email && emailStatus === 'valid'
                      ? 'field-hint is-success'
                      : 'field-hint'
                  }
                >
                  {touched.email && emailStatus === 'invalid' ? (
                    <><IconX /> Dominio no válido — usa {INSTITUTIONAL_DOMAIN}</>
                  ) : touched.email && emailStatus === 'valid' ? (
                    <><IconCheck /> Correo institucional válido</>
                  ) : (
                    <>Usa tu correo {INSTITUTIONAL_DOMAIN}</>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <IconLock />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input has-toggle"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    tabIndex={0}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              <div className="form-actions-row">
                <label className="remember-me" htmlFor="remember-me">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRemember(e.target.checked)}
                  />
                  <span className="remember-me-label">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="forgot-password"
                  id="btn-forgot-password"
                  onClick={() => alert('Contacta a soporte institucional para recuperar tu contraseña.')}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {error && (
                <div id="form-error" className="error-message" role="alert" aria-live="assertive">
                  <IconAlert />
                  {error}
                </div>
              )}

              <button
                id="btn-submit-login"
                type="submit"
                className="btn-submit"
                disabled={loading}
                aria-busy={loading}
              >
                <span className="btn-submit-inner">
                  {loading ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Verificando acceso...
                    </>
                  ) : (
                    <>
                      Iniciar sesión
                      <IconArrow />
                    </>
                  )}
                </span>
              </button>

              <div className="divider" role="separator">
                <div className="divider-line" />
                <span className="divider-text">¿Problemas para acceder?</span>
                <div className="divider-line" />
              </div>
            </form>

            <div className="card-footer">
              <p className="signup-prompt">
                ¿Primera vez en el sistema?{' '}
                <button
                  type="button"
                  className="signup-link"
                  id="btn-signup"
                  onClick={() => alert('Contacta a tu institución para activar tu cuenta.')}
                >
                  Activar cuenta
                </button>
              </p>
              <p className="terms-note">
                Al ingresar, aceptas los{' '}
                <a href="#terms" id="link-terms">Términos de uso</a>
                {' '}y la{' '}
                <a href="#privacy" id="link-privacy">Política de privacidad</a>{' '}
                de la institución.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
