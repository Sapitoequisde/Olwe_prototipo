import React, { useState, useMemo } from 'react';
import FilterBar, { FilterState } from '../components/FilterBar';
import MapBackground from '../components/MapBackground';
import PlanMarker from '../components/PlanMarker';
import PlanDetailModal from '../components/PlanDetailModal';
import { mockPlanes } from '../data/mockData';
import { Plan } from '../types';

interface ExploreViewProps {
  onLogout: () => void;
}

type AppSection = 'explorar' | 'planes' | 'notificaciones' | 'inscritos' | 'chats' | 'perfil';

const navigationItems: { id: AppSection; label: string; icon: AppSection }[] = [
  { id: 'explorar', label: 'Explorar', icon: 'explorar' },
  { id: 'planes', label: 'Mis planes', icon: 'planes' },
  { id: 'notificaciones', label: 'Notificaciones', icon: 'notificaciones' },
  { id: 'inscritos', label: 'Eventos inscritos', icon: 'inscritos' },
  { id: 'chats', label: 'Chats', icon: 'chats' },
  { id: 'perfil', label: 'Perfil', icon: 'perfil' },
];

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
    return <svg {...commonProps}><circle cx="12" cy="12" r="8.5" /><path d="m14.8 9.2-2.1 4.4-4.4 2.1 2.1-4.4 4.4-2.1Z" /></svg>;
  }

  if (name === 'planes' || name === 'inscritos') {
    return <svg {...commonProps}><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16" />{name === 'planes' && <path d="m8 15 2 2 5-5" />}</svg>;
  }

  if (name === 'notificaciones') {
    return <svg {...commonProps}><path d="M6.5 17.5h11l-1.3-2.1V11a4.2 4.2 0 0 0-8.4 0v4.4L6.5 17.5Z" /><path d="M10 20h4" /><circle cx="18.5" cy="6" r="1.5" fill="currentColor" stroke="none" /></svg>;
  }

  if (name === 'chats') {
    return <svg {...commonProps}><path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5a3.5 3.5 0 0 1-3.5 3.5H11l-4.2 3v-3.2A3.5 3.5 0 0 1 5 11.5v-5Z" /></svg>;
  }

  return <svg {...commonProps}><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg>;
};

const ExploreView: React.FC<ExploreViewProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<AppSection>('explorar');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showCreatePreview, setShowCreatePreview] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categoria: 'todas',
    visibilidad: 'todas',
    estado: 'todos'
  });

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Lógica de filtrado
  const filteredPlanes = useMemo(() => {
    return mockPlanes.filter((plan) => {
      // 1. Filtro por texto (título o descripción)
      const matchesSearch = filters.search === '' || 
        plan.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
        plan.descripcion.toLowerCase().includes(filters.search.toLowerCase());
      
      // 2. Filtro por categoría
      const matchesCategory = filters.categoria === 'todas' || plan.categoria === filters.categoria;
      
      // 3. Filtro por visibilidad
      const matchesVisibility = filters.visibilidad === 'todas' || plan.visibilidad === filters.visibilidad;
      
      // 4. Filtro por estado
      let matchesStatus = true;
      if (filters.estado === 'vigente') {
        matchesStatus = plan.estado === 'activo';
      } else if (filters.estado === 'expirado') {
        matchesStatus = plan.estado !== 'activo';
      }

      return matchesSearch && matchesCategory && matchesVisibility && matchesStatus;
    });
  }, [filters]);

  const activeNavigationItem = navigationItems.find(item => item.id === activeSection);

  return (
    <div className="plans-page">
      <aside className="app-sidebar">
        <button
          className="sidebar-brand"
          aria-label="Ir a Explorar"
          onClick={() => setActiveSection('explorar')}
        >
          Olwe
        </button>
        <nav className="sidebar-nav" aria-label="Navegación">
          {navigationItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              aria-label={item.label}
              title={item.label}
            >
              <span className="sidebar-nav-icon"><NavigationIcon name={item.icon} /></span>
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="sidebar-menu" onClick={onLogout} aria-label="Cerrar sesión" title="Cerrar sesión">☰</button>
      </aside>

      {activeSection === 'explorar' ? (
        <main className="explore-content">
          <header className="explore-header">
            <div>
              <p className="plans-eyebrow">Encuentra algo para hacer</p>
              <h1>Explorar</h1>
            </div>
            <button className="create-plan-button" onClick={() => setIsCreateModalOpen(true)}>
              <span>+</span> Crear
            </button>
          </header>
          <div className="explore-map">
            <MapBackground>
              {mockPlanes.map(plan => (
                <PlanMarker key={plan.id} plan={plan} onClick={setSelectedPlan} />
              ))}
            </MapBackground>
          </div>
        </main>
      ) : activeSection === 'planes' ? (
        <main className="plans-content">
          <header className="plans-header">
            <h1>Mis planes</h1>
          </header>
          <div className="plans-toolbar">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onCreatePlan={() => setIsCreateModalOpen(true)}
            />
          </div>
          <section className="plans-list" aria-label="Lista de planes">
            {filteredPlanes.length > 0 ? filteredPlanes.map(plan => (
              <button
                key={plan.id}
                className="plan-list-card"
                onClick={() => setSelectedPlan(plan)}
              >
                <span className="plan-list-icon" style={{ backgroundColor: plan.color }}>▤</span>
                <span className="plan-list-info">
                  <strong>{plan.titulo}</strong>
                  <small>Fecha: <b>{plan.fechaEvento}</b> &nbsp; Hora: <b>{plan.horaEvento}</b></small>
                </span>
                <span className="plan-list-more">•••</span>
              </button>
            )) : (
              <div className="plans-empty-state">
                <span className="empty-state-icon">⌕</span>
                <strong>{mockPlanes.length === 0 ? 'Aún no has creado un plan' : 'No encontramos planes'}</strong>
                <p>
                  {mockPlanes.length === 0
                    ? 'Cuando crees un plan, aparecerá aquí.'
                    : 'Prueba con otros términos o filtros de búsqueda.'}
                </p>
              </div>
            )}
          </section>
        </main>
      ) : (
        <main className="section-placeholder">
          <p className="placeholder-kicker">Sección</p>
          <h1>{activeNavigationItem?.label}</h1>
          <div className="placeholder-card">
            <span><NavigationIcon name={activeNavigationItem?.icon || 'perfil'} /></span>
            <strong>Próximamente</strong>
            <p>Esta sección ya forma parte de la navegación de la aplicación.</p>
          </div>
        </main>
      )}

      {/* Modal Overlay */}
      {selectedPlan && (
        <PlanDetailModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}

      {isCreateModalOpen && (
        <div className="create-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
          <div
            className={`create-plan-modal ${showCreatePreview ? 'is-preview' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-plan-title"
            onClick={event => event.stopPropagation()}
          >
            <div className="create-modal-titlebar">
              <h2 id="create-plan-title">Crea tu propio plan</h2>
              <button onClick={() => setIsCreateModalOpen(false)} aria-label="Cerrar">×</button>
            </div>
            {!showCreatePreview ? (
              <div className="create-modal-form">
                <input placeholder="Título" aria-label="Título" />
                <textarea placeholder="Descripción y detalles:" aria-label="Descripción y detalles" />
                <div className="create-form-row">
                  <input placeholder="Fecha:" aria-label="Fecha" />
                  <input placeholder="Hora:" aria-label="Hora" />
                </div>
                <select aria-label="Visibilidad" defaultValue="">
                  <option value="" disabled>Visibilidad:</option>
                  <option>Mi licenciatura</option>
                </select>
                <div className="create-form-row">
                  <input placeholder="Límite de asistencia:" aria-label="Límite de asistencia" />
                  <input placeholder="Ubicación:" aria-label="Ubicación" />
                </div>
                <div className="create-form-row create-form-options">
                  <label>Color: <input type="color" defaultValue="#ffb1b1" /></label>
                  <label>Categoría: <select defaultValue="calidad"><option value="calidad">Tiempo de calidad</option></select></label>
                </div>
                <button className="create-modal-primary" onClick={() => setShowCreatePreview(true)}>Continuar</button>
              </div>
            ) : (
              <div className="create-modal-preview">
                <div className="preview-form-column">
                  <input value="Cafe centenario" readOnly aria-label="Título del plan" />
                  <textarea value="Hacer amigas de la misma licenciatura que yo para tomar cafecito y hablar de la vida ✨🌷" readOnly aria-label="Descripción del plan" />
                  <div className="create-form-row">
                    <input value="05/09" readOnly aria-label="Fecha del plan" />
                    <input value="6:00 p.m." readOnly aria-label="Hora del plan" />
                  </div>
                  <input value="Mi licenciatura" readOnly aria-label="Visibilidad del plan" />
                  <div className="create-form-row">
                    <input value="5" readOnly aria-label="Límite del plan" />
                    <input value="Av. Centenario 165" readOnly aria-label="Ubicación del plan" />
                  </div>
                </div>
                <div className="preview-summary">
                  <h3><span>▤</span> Cafe centenario</h3>
                  <p><b>Descripción:</b><br />Hacer amigas de la misma licenciatura que yo para tomar cafecito y hablar de la vida</p>
                  <p><b>Fecha:</b> 05 de Septiembre</p>
                  <p><b>Hora:</b> 6 P.M.</p>
                  <p><b>Aforo:</b> 5</p>
                  <p><b>Ubicación:</b> Cafe centenario No.165, col. Centenario</p>
                  <button className="create-modal-primary" onClick={() => setIsCreateModalOpen(false)}>Publicar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreView;
