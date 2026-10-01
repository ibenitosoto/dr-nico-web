/**
 * Dr. Nicolás de Vicente Muñoz - Clínica Capilar & Tricología
 * Core Frontend Interactions & Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initBeforeAfterSliders();
  initTreatmentModals();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. Sticky Header & Scroll Spy
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header-main');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    navMenu.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Close when clicking nav links
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Interactive Before / After Split Slider
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-slider-container');

  containers.forEach(container => {
    const afterWrapper = container.querySelector('.slider-img-after-wrapper');
    const handle = container.querySelector('.slider-handle');
    const afterImg = container.querySelector('.slider-img-after');
    if (!afterWrapper || !handle || !afterImg) return;

    let isDown = false;

    function updateSlider(xPos) {
      const rect = container.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      let percentage = (offsetX / rect.width) * 100;

      // Restrict within bounds
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      afterWrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;

      // Keep image full container width so it doesn't squish
      afterImg.style.width = `${rect.width}px`;
    }

    // Set initial size
    function syncImgWidth() {
      const rect = container.getBoundingClientRect();
      afterImg.style.width = `${rect.width}px`;
    }
    syncImgWidth();
    window.addEventListener('resize', syncImgWidth);

    // Mouse Events
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      updateSlider(e.clientX);
    });

    // Touch Events
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* ==========================================================================
   4. Treatment Deep-Dive Modals & Content
   ========================================================================== */
const treatmentData = {
  tricologia: {
    title: "Tricología Médica Personalizada",
    subtitle: "Diagnóstico riguroso y tratamientos no quirúrgicos de máxima eficacia clínica",
    image: "assets/images/treatment-tricologia.png",
    intro: "La tricología es la rama médica especializada en el estudio y tratamiento de las patologías del cuero cabelludo y el ciclo folicular. Antes de considerar cualquier intervención, es fundamental realizar un diagnóstico diferencial minucioso para identificar el tipo específico de alopecia y su fase de actividad.",
    bullets: [
      "<strong>Tricoscopia digital en consulta:</strong> Estudio microscópico de las unidades foliculares, diámetro del tallo y grado de miniaturización.",
      "<strong>Mesoterapia capilar médica:</strong> Microinyecciones intradérmicas directas en la raíz folicular con péptidos biomiméticos, vitaminas y fármacos antiandrógenos.",
      "<strong>PRP (Plasma Rico en Plaquetas):</strong> Terapia biológica autóloga que estimula la vascularización y prolonga la fase anágena (crecimiento).",
      "<strong>Terapia farmacológica oral y tópica personalizada:</strong> Formulación magistral adaptada a la tolerancia y perfil de cada paciente."
    ],
    idealFor: "Pacientes en fases iniciales o moderadas de caída capilar, afinamiento difuso, alopecia androgenética, efluvio telógeno o como paso previo y de mantenimiento a una cirugía capilar.",
    formReason: "Tratamiento médico capilar (PRP, Mesoterapia…)"
  },
  cirugia: {
    title: "Cirugía Capilar FUE de Alta Densidad",
    subtitle: "Microtrasplante folicular pelo a pelo con diseño anatómico y resultado 100% natural",
    image: "assets/images/treatment-cirugia-capilar.png",
    intro: "La cirugía de trasplante capilar mediante técnica FUE (Follicular Unit Extraction) permite restaurar zonas despobladas extrayendo individualmente unidades foliculares de la zona donante (occipital y temporal) para reimplantarlas respetando la dirección, angulación y densidad natural del cabello.",
    bullets: [
      "<strong>Planificación médica individualizada:</strong> Diseño milimétrico de la primera línea frontal acorde a las proporciones faciales y edad del paciente.",
      "<strong>Extracción micrométrica sin cicatriz lineal:</strong> Uso de micropunches de 0.75 - 0.85 mm para preservar al máximo la densidad de la zona donante.",
      "<strong>Incisiones de zafiro de alta precisión:</strong> Favorecen una cicatrización acelerada, mínimo traumatismo tisular y densidad superior.",
      "<strong>Presencia directa del Dr. Nicolás en todo el proceso:</strong> Intervención realizada bajo supervisión médica continua con anestesia local indolora."
    ],
    idealFor: "Hombres y mujeres con alopecia androgenética estabilizada, retroceso de entradas, pérdida de densidad en coronilla o que deseen rediseñar su línea frontal.",
    formReason: "Trasplante capilar (FUE)"
  },
  barba: {
    title: "Cirugía de Barba y Cejas",
    subtitle: "Diseño estético y densificación facial con unidades foliculares seleccionadas",
    image: "assets/images/treatment-barba-cejas.png",
    intro: "La restauración de barba y cejas exige una destreza microscópica excepcional. Cada folículo debe seleccionarse minuciosamente (folículos de un solo pelo para cejas y folículos de calibre adecuado para barba) y colocarse en un ángulo extremadamente agudo respecto a la piel para lograr una apariencia absolutamente armónica.",
    bullets: [
      "<strong>Diseño facial a medida:</strong> Definición de contornos de barba, mandíbula, bigote o corrección de cejas poco pobladas y asimétricas.",
      "<strong>Selección individualizada de folículos:</strong> Implante folicular de un solo cabello para evitar efectos artificiales.",
      "<strong>Angulación plana milimétrica:</strong> Reproducción fiel de la inclinación natural del vello facial.",
      "<strong>Recuperación rápida:</strong> Procedimiento ambulatorio con reincorporación habitual a los pocos días."
    ],
    idealFor: "Personas con falta congénita de barba o cejas, zonas despobladas irregulares, o pérdidas secundarias a depilación excesiva o traumatismos.",
    formReason: "Tratamiento de cejas o barba"
  },
  cicatricial: {
    title: "Restauración Capilar Cicatricial",
    subtitle: "Técnicas avanzadas de implantación en tejido fibroso y corrección de secuelas",
    image: "assets/images/treatment-restauracion-cicatricial.png",
    intro: "El tejido cicatricial (derivado de quemaduras, traumatismos, accidentes o cirugías previas como la técnica FUSS de tira antigua) presenta un riego vascular alterado. Gracias a la técnica FUE avanzada y protocolos de bioestimulación previa, es posible reactivar la cobertura capilar sobre zonas cicatrizadas.",
    bullets: [
      "<strong>Evaluación de vascularización tisular:</strong> Análisis previo de la receptividad del tejido cicatricial mediante pruebas de viabilidad folicular.",
      "<strong>Técnica de implantación cuidadosa:</strong> Espaciado estratégico de folículos para optimizar la supervivencia del injerto.",
      "<strong>Camuflaje estético de cicatrices previas:</strong> Reconstrucción de áreas sin pelo o disimulo de cicatrices visibles en cuero cabelludo.",
      "<strong>Apoyo bioestimulador coadyuvante:</strong> Combinación con factores de crecimiento autólogos para potenciar la neovascularización."
    ],
    idealFor: "Pacientes con cicatrices quirúrgicas en cuero cabelludo, marcas postraumáticas o secuelas de intervenciones previas que busquen disimularlas con cabello natural.",
    formReason: "Trasplante capilar (FUE)"
  }
};

function initTreatmentModals() {
  const modalBackdrop = document.getElementById('treatmentModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalDynamicContent');
  if (!modalBackdrop || !closeBtn || !modalBody) return;

  document.querySelectorAll('[data-treatment]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-treatment');
      const data = treatmentData[key];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold-dark); text-transform: uppercase; letter-spacing: 0.08em; display: inline-block; margin-bottom: 0.5rem;">Tratamiento Médico Especializado</span>
          <h3 style="font-size: 1.85rem; font-weight: 800; color: var(--text-dark); line-height: 1.2; margin-bottom: 0.5rem;">${data.title}</h3>
          <p style="font-size: 1rem; color: var(--primary); font-weight: 600;">${data.subtitle}</p>
        </div>

        <div style="border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.5rem; max-height: 240px;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <p style="font-size: 1rem; color: var(--secondary-muted); line-height: 1.7; margin-bottom: 1.5rem;">${data.intro}</p>

        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.75rem;">Metodología y Puntos Clave:</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem;">
          ${data.bullets.map(b => `
            <li style="display: flex; gap: 0.65rem; font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
              <span style="color: var(--accent-gold); font-weight: bold; flex-shrink: 0;">✔</span>
              <div>${b}</div>
            </li>
          `).join('')}
        </ul>

        <div style="background: var(--primary-soft); border-left: 3px solid var(--primary); padding: 1rem 1.25rem; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 2rem;">
          <h5 style="font-size: 0.9rem; font-weight: 700; color: var(--primary-deep); margin-bottom: 0.25rem;">Indicado para:</h5>
          <p style="font-size: 0.9rem; color: var(--secondary-muted); line-height: 1.5;">${data.idealFor}</p>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button type="button" class="btn-select-treatment-appointment" data-select-reason="${data.formReason}" style="flex: 1; padding: 0.85rem 1.5rem; background: var(--primary); color: #ffffff; font-weight: 700; border-radius: var(--radius-pill); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: var(--shadow-md);">
            Solicitar valoración para este tratamiento
          </button>
          <a href="https://www.doctoralia.es/nicolas-de-vicente-munoz/especialista-en-tricologia-medico-estetico-medico-general/madrid" target="_blank" rel="noopener noreferrer" style="padding: 0.85rem 1.5rem; background: var(--accent-gold); color: #071926; font-weight: 700; border-radius: var(--radius-pill); font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            Reservar en Doctoralia ↗
          </a>
        </div>
      `;

      // Connect button inside modal to form
      const selectBtn = modalBody.querySelector('.btn-select-treatment-appointment');
      if (selectBtn) {
        selectBtn.addEventListener('click', () => {
          closeModal();
          const reason = selectBtn.getAttribute('data-select-reason');
          const reasonSelect = document.getElementById('motivoConsulta');
          if (reasonSelect && reason) {
            reasonSelect.value = reason;
          }
          const contactSec = document.getElementById('contacto');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      openModal();
    });
  });

  function openModal() {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
  });
}

/* ==========================================================================
   5. Interactive Contact & Assessment Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const motivo = document.getElementById('motivoConsulta');
    const privacy = document.getElementById('privacyCheck');
    const submitBtn = form.querySelector('.btn-submit-form');

    // Validation
    let isValid = true;
    [nombre, apellidos, email, telefono, motivo].forEach(field => {
      if (!field || !field.value.trim()) {
        highlightError(field);
        isValid = false;
      } else {
        removeError(field);
      }
    });

    if (email && email.value && !isValidEmail(email.value)) {
      highlightError(email);
      isValid = false;
    }

    if (privacy && !privacy.checked) {
      alert("Por favor, acepta la política de privacidad para solicitar tu valoración médica.");
      return;
    }

    if (!isValid) {
      showToast("Por favor, completa los campos requeridos marcados con *");
      return;
    }

    // Submit Animation
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right: 8px;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Enviando solicitud...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `✔ Solicitud Recibida`;
      submitBtn.style.background = '#10b981';

      showToast(`Gracias ${nombre.value}. Hemos recibido tu consulta. Nos pondremos en contacto contigo en breve.`);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 5000);
    }, 1200);
  });

  function highlightError(field) {
    if (!field) return;
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fff1f2';
    field.addEventListener('input', () => removeError(field), { once: true });
  }

  function removeError(field) {
    if (!field) return;
    field.style.borderColor = '';
    field.style.backgroundColor = '';
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }
}

/* ==========================================================================
   6. Toast Feedback Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span style="color: var(--accent-gold); font-size: 1.1rem;">✦</span>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. Smooth Anchor Scrolling
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
