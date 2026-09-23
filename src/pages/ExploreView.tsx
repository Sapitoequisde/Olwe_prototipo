import React, { useState, useMemo } from 'react';
import FilterBar, { FilterState } from '../components/FilterBar';
import MapBackground from '../components/MapBackground';
import PlanMarker from '../components/PlanMarker';
import PlanDetailModal from '../components/PlanDetailModal';
import {
  mockPlanes,
  mockNotifications,
  mockEnrolledEvents,
  mockChatList,
  mockChatMessages,
  NotificationItem,
  EnrolledEvent,
  EventIconName,
  ChatItem,
  ChatMessage,
} from '../data/mockData';
import { Plan } from '../types';

interface ExploreViewProps {
  onLogout: () => void;
}

type AppSection =
  | 'explorar'
  | 'planes'
  | 'notificaciones'
  | 'inscritos'
  | 'chats'
  | 'perfil';

type ProfileView =
  | 'perfil'
  | 'configuracion'
  | 'password'
  | 'historial'
  | 'ayuda';

const navigationItems: {
  id: AppSection;
  label: string;
  icon: AppSection;
}[] = [
  { id: 'explorar', label: 'Explorar', icon: 'explorar' },
  { id: 'planes', label: 'Mis planes', icon: 'planes' },
  { id: 'notificaciones', label: 'Notificaciones', icon: 'notificaciones' },
  { id: 'inscritos', label: 'Eventos inscritos', icon: 'inscritos' },
  { id: 'chats', label: 'Chats', icon: 'chats' },
];

/* =========================================================
   ICONOS
========================================================= */
const EventIcon: React.FC<{
  name: 'book' | 'coffee' | 'basketball';
}> = ({ name }) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'book') {
    return (
      <svg {...commonProps}>
        <path d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Z" />
        <path d="M5 17a2.5 2.5 0 0 1 2.5-2.5H19" />
        <path d="M9 8h6M9 11h6" />
      </svg>
    );
  }

  if (name === 'coffee') {
    return (
      <svg {...commonProps}>
        <path d="M6 8h10v5.5A4.5 4.5 0 0 1 11.5 18h-1A4.5 4.5 0 0 1 6 13.5V8Z" />
        <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16" />
        <path d="M8 5.5c0 1 1 1 1 2M11 5.5c0 1 1 1 1 2" />
        <path d="M5 20h13" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 9.5c3.5 1.2 7.2 1.1 10.5-.4 2.1-1 3.8-2.4 5.3-4" />
      <path d="M8.5 4.8c1.3 2.3 1.8 4.7 1.5 7.2-.3 2.9-1.6 5.3-3.7 7.4" />
      <path d="M15.2 4.7c-.4 2.4.1 4.6 1.4 6.5 1.1 1.6 2.5 2.8 4.3 3.7" />
    </svg>
  );
};

const NotificationBellIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
};

const NotificationEditIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
};

const NotificationCancelIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
};

const ChatIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4.5 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
};

const HistoryCheckIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
};

const LockIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle
        cx="12"
        cy="15"
        r="1"
      />
      <path d="M12 16v2" />
    </svg>
  );
};

const NavigationIcon: React.FC<{ name: AppSection }> = ({ name }) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'explorar') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m14.8 9.2-2.1 4.4-4.4 2.1 2.1-4.4 4.4-2.1Z" />
      </svg>
    );
  }

  if (name === 'planes' || name === 'inscritos') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="5.5" width="16" height="15" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" />
        {name === 'planes' && <path d="m8 15 2 2 5-5" />}
      </svg>
    );
  }

  if (name === 'notificaciones') {
    return (
      <svg {...commonProps}>
        <path d="M6.5 17.5h11l-1.3-2.1V11a4.2 4.2 0 0 0-8.4 0v4.4L6.5 17.5Z" />
        <path d="M10 20h4" />
        <circle
          cx="18.5"
          cy="6"
          r="1.5"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (name === 'chats') {
    return (
      <svg {...commonProps}>
        <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5a3.5 3.5 0 0 1-3.5 3.5H11l-4.2 3v-3.2A3.5 3.5 0 0 1 5 11.5v-5Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const ExploreView: React.FC<ExploreViewProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] =
    useState<AppSection>('explorar');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showCreatePreview, setShowCreatePreview] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categoria: 'todas',
    visibilidad: 'todas',
    estado: 'todos',
  });

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  /* -----------------------------
     Notificaciones
  ----------------------------- */

  const [notificationSearch, setNotificationSearch] = useState('');
  const [notificationItems, setNotificationItems] =
    useState<NotificationItem[]>(mockNotifications);

  const filteredNotifications = useMemo(() => {
    const search = notificationSearch.toLowerCase();

    return notificationItems.filter(
      item =>
        item.title.toLowerCase().includes(search) ||
        item.text.toLowerCase().includes(search)
    );
  }, [notificationSearch]);

  /* -----------------------------
     Eventos inscritos
  ----------------------------- */

  const [eventSearch, setEventSearch] = useState('');
  const [selectedEnrolledEvent, setSelectedEnrolledEvent] =
    useState<EnrolledEvent | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const filteredEvents = useMemo(() => {
    const search = eventSearch.toLowerCase();

    return mockEnrolledEvents.filter(
      event =>
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search)
    );
  }, [eventSearch]);

  /* -----------------------------
     Perfil
  ----------------------------- */

  const [profileView, setProfileView] = useState<ProfileView>('perfil');

  const [profileName, setProfileName] = useState('Dylan Bourjac');
  const [profileCareer, setProfileCareer] = useState(
    'Ingeniería en Sistemas de la Información'
  );
  const [profileDivision, setProfileDivision] =
    useState('Ingeniería Industrial');

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [reportText, setReportText] = useState('');
  const [reportSent, setReportSent] = useState(false);

  /* -----------------------------
     Chats
  ----------------------------- */

  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(mockChatMessages);
  const [chatInput, setChatInput] = useState('');

  /* -----------------------------
     Logout
  ----------------------------- */

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* -----------------------------
     Filtrado de Mis planes
  ----------------------------- */

  const filteredPlanes = useMemo(() => {
    return mockPlanes.filter(plan => {
      const matchesSearch =
        filters.search === '' ||
        plan.titulo
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        plan.descripcion
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.categoria === 'todas' ||
        plan.categoria === filters.categoria;

      const matchesVisibility =
        filters.visibilidad === 'todas' ||
        plan.visibilidad === filters.visibilidad;

      let matchesStatus = true;

      if (filters.estado === 'vigente') {
        matchesStatus = plan.estado === 'activo';
      } else if (filters.estado === 'expirado') {
        matchesStatus = plan.estado !== 'activo';
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVisibility &&
        matchesStatus
      );
    });
  }, [filters]);

  const activeNavigationItem = navigationItems.find(
    item => item.id === activeSection
  );

  /* =========================================================
     FUNCIONES
  ========================================================= */

  const markNotificationAsRead = (id: number) => {
    setNotificationItems(current =>
      current.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const changeSection = (section: AppSection) => {
    setActiveSection(section);

    if (section === 'perfil') {
      setProfileView('perfil');
    }

    if (section !== 'chats') {
      setSelectedChat(null);
    }
  };

  const sendChatMessage = () => {
    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage) return;

    setChatMessages(current => [
      ...current,
      {
        id: Date.now(),
        sender: 'Tú',
        message: trimmedMessage,
        time: 'Ahora',
        mine: true,
      },
    ]);

    setChatInput('');
  };

  const saveProfile = () => {
    alert('Cambios guardados correctamente.');
  };

  const savePassword = () => {
    if (!password || !newPassword || !passwordConfirmation) {
      return;
    }

    if (newPassword !== passwordConfirmation) {
      return;
    }

    setPasswordSaved(true);
    setPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
  };

  const sendReport = () => {
    if (!reportText.trim()) return;

    setReportSent(true);
    setReportText('');
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="plans-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="app-sidebar">
        <button
          className="sidebar-brand"
          aria-label="Ir a Explorar"
          onClick={() => changeSection('explorar')}
        >
          Olwe
        </button>

        <nav className="sidebar-nav" aria-label="Navegación">
          {navigationItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${
                activeSection === item.id ? 'is-active' : ''
              }`}
              onClick={() => changeSection(item.id)}
              aria-label={item.label}
              title={item.label}
            >
              <span className="sidebar-nav-icon">
                <NavigationIcon name={item.icon} />
              </span>

              <span className="sidebar-nav-label">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <button
          className="sidebar-menu"
          onClick={() => changeSection('perfil')}
          aria-label="Abrir menú"
          title="Menú"
        >
          ☰
        </button>
      </aside>

      {/* =====================================================
          EXPLORAR
      ===================================================== */}

      {activeSection === 'explorar' && (
        <main className="explore-content">
          <header className="explore-header">
            <div>
              <p className="plans-eyebrow">
                Encuentra algo para hacer
              </p>

              <h1>Explorar</h1>
            </div>

            <button
              className="create-plan-button"
              onClick={() => {
                setIsCreateModalOpen(true);
                setShowCreatePreview(false);
              }}
            >
              <span>+</span>
              Crear
            </button>
          </header>

          <div className="explore-map">
            <MapBackground>
              {mockPlanes.map(plan => (
                <PlanMarker
                  key={plan.id}
                  plan={plan}
                  onClick={setSelectedPlan}
                />
              ))}
            </MapBackground>
          </div>
        </main>
      )}

      {/* =====================================================
          MIS PLANES
      ===================================================== */}

      {activeSection === 'planes' && (
        <main className="plans-content">
          <header className="plans-header">
            <h1>Mis planes</h1>
          </header>

          <div className="plans-toolbar">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onCreatePlan={() => {
                setIsCreateModalOpen(true);
                setShowCreatePreview(false);
              }}
            />
          </div>

          <section
            className="plans-list"
            aria-label="Lista de planes"
          >
            {filteredPlanes.length > 0 ? (
              filteredPlanes.map(plan => (
                <button
                  key={plan.id}
                  className="plan-list-card"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <span
                    className="plan-list-icon"
                    style={{ backgroundColor: plan.color }}
                  >
                    ▤
                  </span>

                  <span className="plan-list-info">
                    <strong>{plan.titulo}</strong>

                    <small>
                      Fecha:{' '}
                      <b>{plan.fechaEvento}</b>
                      {'  '}
                      Hora:{' '}
                      <b>{plan.horaEvento}</b>
                    </small>
                  </span>

                  <span className="plan-list-more">
                    •••
                  </span>
                </button>
              ))
            ) : (
              <div className="plans-empty-state">
                <span className="empty-state-icon">
                  ⌕
                </span>

                <strong>
                  {mockPlanes.length === 0
                    ? 'Aún no has creado un plan'
                    : 'No encontramos planes'}
                </strong>

                <p>
                  {mockPlanes.length === 0
                    ? 'Cuando crees un plan, aparecerá aquí.'
                    : 'Prueba con otros términos o filtros de búsqueda.'}
                </p>
              </div>
            )}
          </section>
        </main>
      )}

      {/* =====================================================
          NOTIFICACIONES
      ===================================================== */}

      {activeSection === 'notificaciones' && (
        <main className="olwe-section-content">
          <header className="olwe-page-header">
            <h1>Notificaciones y Avisos</h1>
          </header>

          <div className="olwe-search-wrapper">
            <span>⌕</span>

            <input
              value={notificationSearch}
              onChange={event =>
                setNotificationSearch(event.target.value)
              }
              placeholder="Buscar"
              aria-label="Buscar notificaciones"
            />
          </div>

          <section className="olwe-card-list">
            {filteredNotifications.map(notification => (
              <article
                key={notification.id}
                className={`olwe-event-card notification-card ${
                  notification.type === 'cancelled'
                    ? 'is-cancelled'
                    : ''
                }`}
                onClick={() =>
                  markNotificationAsRead(notification.id)
                }
              >
                <div
                  className={`notification-icon notification-icon-${notification.type}`}
                  aria-hidden="true"
                >
                  {notification.type === 'reminder' && (
                    <NotificationBellIcon />
                  )}

                  {notification.type === 'updated' && (
                    <NotificationEditIcon />
                  )}

                  {notification.type === 'cancelled' && (
                    <NotificationCancelIcon />
                  )}
                </div>

                <div className="olwe-event-main">
                  <div className="olwe-event-title-row">
                    <h3>{notification.title}</h3>
                  </div>

                  <p>{notification.text}</p>

                  {notification.type !== 'cancelled' && (
                    <div className="olwe-event-meta">
                      {notification.changedField === 'ubicacion' ? (
                        <span>
                          Ubicación:{' '}
                          <strong className="notification-highlight">
                            {notification.location}
                          </strong>
                        </span>
                      ) : (
                        <>
                          <span>
                            Fecha:{' '}
                            <strong
                              className={
                                notification.changedField === 'fecha'
                                  ? 'notification-highlight'
                                  : ''
                              }
                            >
                              {notification.date}
                            </strong>
                          </span>

                          <span>
                            Hora:{' '}
                            <strong
                              className={
                                notification.changedField === 'hora'
                                  ? 'notification-highlight'
                                  : ''
                              }
                            >
                              {notification.time}
                            </strong>
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {notification.unread && (
                  <span
                    className="olwe-unread-dot"
                    aria-label="No leído"
                  />
                )}
              </article>
            ))}
          </section>
        </main>
      )}

      {/* =====================================================
          EVENTOS INSCRITOS
      ===================================================== */}

      {activeSection === 'inscritos' && (
        <main className="olwe-section-content">
          <header className="olwe-page-header">
            <h1>Eventos Inscritos</h1>
          </header>

          <div className="olwe-search-wrapper">
            <span>⌕</span>

            <input
              value={eventSearch}
              onChange={event =>
                setEventSearch(event.target.value)
              }
              placeholder="Buscar"
              aria-label="Buscar eventos inscritos"
            />
          </div>

          <section className="olwe-card-list">
            {filteredEvents.map(event => (
              <button
                key={event.id}
                className="olwe-event-card olwe-event-card-button"
                onClick={() =>
                  setSelectedEnrolledEvent(event)
                }
              >
                <div
                  className="olwe-event-icon"
                  style={{
                    backgroundColor: event.iconColor,
                  }}
                >
                  <EventIcon name={event.icon} />
                </div>

                <div className="olwe-event-main">
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <div className="olwe-event-meta">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>

                <span className="olwe-card-arrow">
                  ›
                </span>
              </button>
            ))}
          </section>
        </main>
      )}

      {/* =====================================================
          CHATS
      ===================================================== */}

      {activeSection === 'chats' && !selectedChat && (
        <main className="olwe-section-content">
          <header className="olwe-page-header">
            <h1>Chats de eventos inscritos</h1>
          </header>

          <section className="olwe-card-list">
            {mockChatList.map(chat => (
              <button
                key={chat.id}
                className="olwe-chat-card"
                onClick={() => setSelectedChat(chat)}
              >
                <div
                  className="olwe-chat-avatar"
                  style={{
                    backgroundColor: chat.eventColor,
                  }}
                >
                  <ChatIcon />
                </div>

                <div className="olwe-chat-main">
                  <div className="olwe-chat-title-row">
                    <h3>{chat.title}</h3>

                    <span>{chat.lastTime}</span>
                  </div>

                  <p>{chat.lastMessage}</p>

                  <small>
                    {chat.participants} participantes
                  </small>
                </div>

                <span className="olwe-card-arrow">
                  ›
                </span>
              </button>
            ))}
          </section>
        </main>
      )}

      {/* =====================================================
          CHAT INDIVIDUAL
      ===================================================== */}

      {activeSection === 'chats' && selectedChat && (
        <main className="olwe-chat-page">
          <header className="olwe-chat-header">
            <button
              className="olwe-back-button"
              onClick={() => setSelectedChat(null)}
            >
              ←
            </button>

            <div>
              <h1>{selectedChat.title}</h1>
              <span>
                {selectedChat.participants} participantes
              </span>
            </div>
          </header>

          <section className="olwe-chat-messages">
            {chatMessages.map(message => (
              <div
                key={message.id}
                className={`olwe-message-row ${
                  message.mine ? 'is-mine' : ''
                }`}
              >
                <div className="olwe-message">
                  {!message.mine && (
                    <strong>{message.sender}</strong>
                  )}

                  <p>{message.message}</p>

                  <small>{message.time}</small>
                </div>
              </div>
            ))}
          </section>

          <form
            className="olwe-chat-input"
            onSubmit={event => {
              event.preventDefault();
              sendChatMessage();
            }}
          >
            <input
              value={chatInput}
              onChange={event =>
                setChatInput(event.target.value)
              }
              placeholder="Escribe un mensaje..."
              aria-label="Escribir mensaje"
            />

            <button type="submit">
              ➤
            </button>
          </form>
        </main>
      )}

      {/* =====================================================
          PERFIL
      ===================================================== */}

      {activeSection === 'perfil' && (
        <main className="olwe-section-content">
          <header className="olwe-page-header">
            <h1>Perfil</h1>
          </header>

          <div className="profile-layout">
            <aside className="profile-menu">
              <button
                className={
                  profileView === 'perfil' ? 'is-active' : ''
                }
                onClick={() => setProfileView('perfil')}
              >
                Perfil
              </button>

              <button
                className={
                  profileView === 'configuracion'
                    ? 'is-active'
                    : ''
                }
                onClick={() =>
                  setProfileView('configuracion')
                }
              >
                Configuración de cuenta
              </button>

              <button
                className={
                  profileView === 'historial'
                    ? 'is-active'
                    : ''
                }
                onClick={() => setProfileView('historial')}
              >
                Historial de eventos asistidos
              </button>

              <button
                className={
                  profileView === 'ayuda' ? 'is-active' : ''
                }
                onClick={() => setProfileView('ayuda')}
              >
                Ayuda o reportar un problema
              </button>

              <button
                className="profile-logout-button"
                onClick={() => setShowLogoutModal(true)}
              >
                Cerrar sesión
              </button>
            </aside>

            <section className="profile-panel">

              {/* PERFIL */}
              {profileView === 'perfil' && (
                <>
                  <div className="profile-visual">
                    <div className="profile-avatar">
                      DB
                    </div>

                    <div>
                      <h2>{profileName}</h2>
                      <p>Perfil de estudiante</p>
                    </div>
                  </div>

                  <div className="profile-form">
                    <label>
                      Nombre
                      <input
                        value={profileName}
                        onChange={event =>
                          setProfileName(event.target.value)
                        }
                      />
                    </label>

                    <label>
                      Matrícula
                      <input
                        value="221200797"
                        readOnly
                      />
                    </label>

                    <label>
                      Licenciatura
                      <input
                        value={profileCareer}
                        onChange={event =>
                          setProfileCareer(event.target.value)
                        }
                      />
                    </label>

                    <label>
                      División
                      <input
                        value={profileDivision}
                        onChange={event =>
                          setProfileDivision(event.target.value)
                        }
                      />
                    </label>

                    <button
                      className="olwe-primary-button"
                      onClick={saveProfile}
                    >
                      Guardar cambios
                    </button>
                  </div>
                </>
              )}

              {/* CONFIGURACIÓN */}
              {profileView === 'configuracion' && (
                <>
                  <div className="profile-panel-heading">
                    <h2>Configuración de cuenta</h2>
                    <p>
                      Administra la información y seguridad
                      de tu cuenta.
                    </p>
                  </div>

                  <button
                    className="profile-option-card"
                    onClick={() =>
                      setProfileView('password')
                    }
                  >
                    <span className="profile-option-icon">
                      <LockIcon />
                    </span>

                    <div>
                      <strong>
                        Cambiar contraseña
                      </strong>
                      <p>
                        Actualiza la contraseña de tu cuenta.
                      </p>
                    </div>

                    <span>›</span>
                  </button>
                </>
              )}

              {/* CONTRASEÑA */}
              {profileView === 'password' && (
                <>
                  <div className="profile-panel-heading">
                    <button
                      className="olwe-inline-back"
                      onClick={() =>
                        setProfileView('configuracion')
                      }
                    >
                      ← Regresar
                    </button>

                    <h2>Cambiar contraseña</h2>

                    <p>
                      Introduce los datos solicitados para
                      actualizar tu contraseña.
                    </p>
                  </div>

                  <div className="profile-form">
                    <label>
                      Contraseña actual
                      <input
                        type="password"
                        value={password}
                        onChange={event =>
                          setPassword(event.target.value)
                        }
                      />
                    </label>

                    <label>
                      Nueva contraseña
                      <input
                        type="password"
                        value={newPassword}
                        onChange={event =>
                          setNewPassword(event.target.value)
                        }
                      />
                    </label>

                    <label>
                      Confirmar nueva contraseña
                      <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={event =>
                          setPasswordConfirmation(
                            event.target.value
                          )
                        }
                      />
                    </label>

                    {newPassword &&
                      passwordConfirmation &&
                      newPassword !==
                        passwordConfirmation && (
                        <p className="olwe-form-error">
                          Las contraseñas no coinciden.
                        </p>
                      )}

                    {passwordSaved && (
                      <p className="olwe-form-success">
                        Contraseña actualizada correctamente.
                      </p>
                    )}

                    <button
                      className="olwe-primary-button"
                      onClick={savePassword}
                    >
                      Guardar contraseña
                    </button>
                  </div>
                </>
              )}

              {/* HISTORIAL */}
              {profileView === 'historial' && (
                <>
                  <div className="profile-panel-heading">
                    <h2>
                      Historial de eventos asistidos
                    </h2>

                    <p>
                      Consulta los eventos en los que has
                      participado.
                    </p>
                  </div>

                  <div className="history-list">
                    <article className="history-item">
                      <div className="history-icon">
                        <HistoryCheckIcon />
                      </div>

                      <div>
                        <strong>
                          Estudiar en Starbucks
                        </strong>

                        <p>
                          03 de Septiembre · 4:00 P.M.
                        </p>
                      </div>
                    </article>

                    <article className="history-item">
                      <div className="history-icon">
                        <HistoryCheckIcon />
                      </div>

                      <div>
                        <strong>
                          Cafe centenario
                        </strong>

                        <p>
                          05 de Septiembre · 6:00 P.M.
                        </p>
                      </div>
                    </article>
                  </div>
                </>
              )}

              {/* AYUDA */}
              {profileView === 'ayuda' && (
                <>
                  <div className="profile-panel-heading">
                    <h2>
                      Ayuda o reportar un problema
                    </h2>

                    <p>
                      Cuéntanos qué ocurrió o qué problema
                      encontraste.
                    </p>
                  </div>

                  {!reportSent ? (
                    <div className="profile-form">
                      <label>
                        Describe el problema
                        <textarea
                          value={reportText}
                          onChange={event =>
                            setReportText(
                              event.target.value
                            )
                          }
                          placeholder="Escribe aquí..."
                        />
                      </label>

                      <button
                        className="olwe-primary-button"
                        onClick={sendReport}
                        disabled={!reportText.trim()}
                      >
                        Enviar reporte
                      </button>
                    </div>
                  ) : (
                    <div className="report-success">
                      <div>✓</div>

                      <h3>
                        Reporte enviado
                      </h3>

                      <p>
                        Gracias por ayudarnos a mejorar
                        Olwe.
                      </p>

                      <button
                        className="olwe-primary-button"
                        onClick={() => setReportSent(false)}
                      >
                        Volver
                      </button>
                    </div>
                  )}
                </>
              )}

            </section>
          </div>
        </main>
      )}

      {/* =====================================================
          DETALLE EVENTO INSCRITO
      ===================================================== */}

      {selectedEnrolledEvent && (
        <div
          className="olwe-modal-backdrop"
          onClick={() =>
            setSelectedEnrolledEvent(null)
          }
        >
          <div
            className="olwe-detail-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >
            <header className="olwe-modal-header">
              <button
                onClick={() =>
                  setSelectedEnrolledEvent(null)
                }
              >
                ←
              </button>

              <h2>
                {selectedEnrolledEvent.title}
              </h2>

              <button
                onClick={() =>
                  setSelectedEnrolledEvent(null)
                }
              >
                ×
              </button>
            </header>

            <div className="olwe-detail-content">
              <div
                className="olwe-detail-icon"
                style={{
                  backgroundColor: selectedEnrolledEvent.iconColor,
                }}
              >
                <EventIcon name={selectedEnrolledEvent.icon} />
              </div>

              <h3>
                {selectedEnrolledEvent.title}
              </h3>

              <p className="olwe-detail-description">
                {selectedEnrolledEvent.description}
              </p>

              <div className="olwe-detail-fields">
                <p>
                  <span>Fecha</span>
                  <b>
                    {selectedEnrolledEvent.date}
                  </b>
                </p>

                <p>
                  <span>Hora</span>
                  <b>
                    {selectedEnrolledEvent.time}
                  </b>
                </p>

                <p>
                  <span>Aforo</span>
                  <b>
                    {selectedEnrolledEvent.participants}/
                    {selectedEnrolledEvent.capacity}
                  </b>
                </p>

                <p>
                  <span>Ubicación</span>
                  <b>
                    {selectedEnrolledEvent.location}
                  </b>
                </p>

                <p>
                  <span>Visibilidad</span>
                  <b>
                    {selectedEnrolledEvent.visibility}
                  </b>
                </p>

                <p>
                  <span>Categoría</span>
                  <b>
                    {selectedEnrolledEvent.category}
                  </b>
                </p>
              </div>

              <button
                className="olwe-danger-button"
                onClick={() =>
                  setShowLeaveModal(true)
                }
              >
                Abandonar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CONFIRMACIÓN ABANDONAR
      ===================================================== */}

      {showLeaveModal && (
        <div
          className="olwe-modal-backdrop olwe-modal-front"
          onClick={() =>
            setShowLeaveModal(false)
          }
        >
          <div
            className="olwe-confirm-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >
            <div className="olwe-confirm-icon">
              !
            </div>

            <h2>
              ¿Deseas abandonar este plan?
            </h2>

            <p>
              Si abandonas este plan dejarás de formar
              parte del evento y de su chat.
            </p>

            <div className="olwe-confirm-actions">
              <button
                className="olwe-secondary-button"
                onClick={() =>
                  setShowLeaveModal(false)
                }
              >
                Atrás
              </button>

              <button
                className="olwe-danger-button"
                onClick={() => {
                  setShowLeaveModal(false);
                  setSelectedEnrolledEvent(null);
                }}
              >
                Abandonar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PLAN DETAIL EXISTENTE
      ===================================================== */}

      {selectedPlan && (
        <PlanDetailModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      {/* =====================================================
          CREAR PLAN
      ===================================================== */}

      {isCreateModalOpen && (
        <div
          className="create-modal-backdrop"
          onClick={() =>
            setIsCreateModalOpen(false)
          }
        >
          <div
            className={`create-plan-modal ${
              showCreatePreview ? 'is-preview' : ''
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-plan-title"
            onClick={event =>
              event.stopPropagation()
            }
          >
            <div className="create-modal-titlebar">
              <h2 id="create-plan-title">
                Crea tu propio plan
              </h2>

              <button
                onClick={() =>
                  setIsCreateModalOpen(false)
                }
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {!showCreatePreview ? (
              <div className="create-modal-form">
                <input
                  placeholder="Título"
                  aria-label="Título"
                />

                <textarea
                  placeholder="Descripción y detalles:"
                  aria-label="Descripción y detalles"
                />

                <div className="create-form-row">
                  <input
                    placeholder="Fecha:"
                    aria-label="Fecha"
                  />

                  <input
                    placeholder="Hora:"
                    aria-label="Hora"
                  />
                </div>

                <select
                  aria-label="Visibilidad"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Visibilidad:
                  </option>

                  <option>
                    Mi licenciatura
                  </option>
                </select>

                <div className="create-form-row">
                  <input
                    placeholder="Límite de asistencia:"
                    aria-label="Límite de asistencia"
                  />

                  <input
                    placeholder="Ubicación:"
                    aria-label="Ubicación"
                  />
                </div>

                <div className="create-form-row create-form-options">
                  <label>
                    Color:{' '}
                    <input
                      type="color"
                      defaultValue="#ffb1b1"
                    />
                  </label>

                  <label>
                    Categoría:{' '}
                    <select defaultValue="calidad">
                      <option value="calidad">
                        Tiempo de calidad
                      </option>
                    </select>
                  </label>
                </div>

                <button
                  className="create-modal-primary"
                  onClick={() =>
                    setShowCreatePreview(true)
                  }
                >
                  Continuar
                </button>
              </div>
            ) : (
              <div className="create-modal-preview">
                <div className="preview-form-column">
                  <input
                    value="Cafe centenario"
                    readOnly
                    aria-label="Título del plan"
                  />

                  <textarea
                    value="Hacer amigas de la misma licenciatura que yo para tomar cafecito y hablar de la vida ✨🌷"
                    readOnly
                    aria-label="Descripción del plan"
                  />

                  <div className="create-form-row">
                    <input
                      value="05/09"
                      readOnly
                      aria-label="Fecha del plan"
                    />

                    <input
                      value="6:00 p.m."
                      readOnly
                      aria-label="Hora del plan"
                    />
                  </div>

                  <input
                    value="Mi licenciatura"
                    readOnly
                    aria-label="Visibilidad del plan"
                  />

                  <div className="create-form-row">
                    <input
                      value="5"
                      readOnly
                      aria-label="Límite del plan"
                    />

                    <input
                      value="Av. Centenario 165"
                      readOnly
                      aria-label="Ubicación del plan"
                    />
                  </div>
                </div>

                <div className="preview-summary">
                  <h3>
                    <span>▤</span> Cafe centenario
                  </h3>

                  <p>
                    <b>Descripción:</b>
                    <br />
                    Hacer amigas de la misma
                    licenciatura que yo para tomar
                    cafecito y hablar de la vida
                  </p>

                  <p>
                    <b>Fecha:</b> 05 de Septiembre
                  </p>

                  <p>
                    <b>Hora:</b> 6 P.M.
                  </p>

                  <p>
                    <b>Aforo:</b> 5
                  </p>

                  <p>
                    <b>Ubicación:</b> Cafe centenario
                    No.165, col. Centenario
                  </p>

                  <button
                    className="create-modal-primary"
                    onClick={() =>
                      setIsCreateModalOpen(false)
                    }
                  >
                    Publicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      {showLogoutModal && (
        <div
          className="olwe-modal-backdrop olwe-modal-front"
          onClick={() =>
            setShowLogoutModal(false)
          }
        >
          <div
            className="olwe-confirm-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >
            <div className="olwe-confirm-icon">
              !
            </div>

            <h2>
              ¿Deseas cerrar sesión?
            </h2>

            <p>
              Tendrás que volver a iniciar sesión para
              acceder nuevamente a tu cuenta.
            </p>

            <div className="olwe-confirm-actions">
              <button
                className="olwe-secondary-button"
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Atrás
              </button>

              <button
                className="olwe-danger-button"
                onClick={onLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExploreView;