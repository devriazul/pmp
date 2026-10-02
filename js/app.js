document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initRoadmapForm();
  initEnrollForm();
  initAccordions();
  initFilters();
  initContactForm();
  initScrollAnimations();
  initAlumniSlider();
});

function initNavigation() {
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link, .route-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Route Handler
  function handleRoute() {
    let hash = window.location.hash.replace('#/', '').replace('#', '') || 'home';
    
    // Normalize hash names
    if (hash === '' || hash === '/') hash = 'home';
    
    let targetView = document.getElementById('view-' + hash);
    if (!targetView) {
      targetView = document.getElementById('view-home');
      hash = 'home';
    }

    // Toggle active view
    views.forEach(view => {
      if (view === targetView) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update nav link active state
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === '#' + hash || href === '#/' + hash)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    if (navMenu) {
      navMenu.classList.remove('show');
    }

    // Trigger scroll animations for active view
    setTimeout(() => {
      triggerScrollObserver();
    }, 100);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Run on initial load

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
}

function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalCloseBtns = document.querySelectorAll('.modal-close, [data-modal-close]');

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Global Trigger Buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });
}

function openModal(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

function initRoadmapForm() {
  const homeForm = document.getElementById('roadmapForm');
  const modalForm = document.getElementById('modalRoadmapForm');

  if (homeForm) {
    homeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      generateRoadmapResult(new FormData(homeForm));
    });
  }

  // Handle submit inside modal form
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'modalRoadmapForm') {
      e.preventDefault();
      generateRoadmapResult(new FormData(e.target));
    }
  });
}

function generateRoadmapResult(formData) {
  const name = formData.get('name') || 'Professional';
  const phone = formData.get('phone') || '';
  const exp = formData.get('exp') || '3-5 years';
  const hours = formData.get('hours') || '2 hours';
  const target = formData.get('target') || 'Within 6 weeks';

  const resultTitle = document.getElementById('roadmapResultTitle');
  const resultBody = document.getElementById('roadmapResultBody');

  if (resultTitle) {
    resultTitle.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i> PMP Strategy Plan for ${name}`;
  }

  // Calculate target readiness percentage based on experience & hours
  let readiness = '92%';
  if (exp === '10+ years') readiness = '98%';
  if (hours === '1 hour') readiness = '88%';

  if (resultBody) {
    resultBody.innerHTML = `
      <div style="background-color: var(--primary-light); padding: 18px; border-radius: var(--radius-md); margin-bottom: 20px; border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: var(--dark-navy);"><i class="fa-solid fa-bolt" style="color: var(--accent-gold);"></i> ${target} Roadmap</strong>
          <span class="pill-badge pill-badge-gold" style="margin: 0;">${readiness} Exam Readiness</span>
        </div>
        <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted);">
          Tailored for <strong>${name}</strong> (${exp} experience • ${hours} study time/day).
        </p>
      </div>

      <div style="display: grid; gap: 12px; margin-bottom: 24px;">
        <div style="background: #fff; padding: 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
          <h5 style="color: var(--primary); font-size: 0.95rem; margin-bottom: 4px;"><i class="fa-regular fa-calendar-days"></i> Phase 1: Core PMBOK & People Domain (Weeks 1-2)</h5>
          <p style="font-size: 0.85rem; color: var(--text-body); margin: 0;">Master Leadership, Team Formation, Stakeholder Engagement, and Conflict Management. Complete 100 domain questions.</p>
        </div>

        <div style="background: #fff; padding: 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); border-left: 3px solid var(--secondary);">
          <h5 style="color: var(--secondary); font-size: 0.95rem; margin-bottom: 4px;"><i class="fa-regular fa-calendar-days"></i> Phase 2: Process & Hybrid Frameworks (Weeks 3-4)</h5>
          <p style="font-size: 0.85rem; color: var(--text-body); margin: 0;">Deep dive into Scope, EVM Formulas, Risk Register, and Scrum/Kanban practices. Complete 200 situational questions.</p>
        </div>

        <div style="background: #fff; padding: 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); border-left: 3px solid var(--accent-gold);">
          <h5 style="color: #92400E; font-size: 0.95rem; margin-bottom: 4px;"><i class="fa-solid fa-trophy"></i> Phase 3: Full Mock Exam & 1-on-1 Error Gate (Weeks 5-6)</h5>
          <p style="font-size: 0.85rem; color: var(--text-body); margin: 0;">Sit timed 180-question full exam rehearsal. 1-on-1 mistake log review with Emdad Hossain until exam ready.</p>
        </div>
      </div>

      <div style="display: grid; gap: 10px;">
        <a href="https://wa.me/8801700000000?text=Hi%20Emdad,%20I%20just%20generated%20my%20PMP%20Roadmap%20for%20${encodeURIComponent(name)}%20(${encodeURIComponent(phone)})" 
           target="_blank" 
           class="btn btn-gold btn-full">
          <i class="fa-brands fa-whatsapp"></i> Send Detailed PDF Plan to My WhatsApp (${phone || 'WhatsApp'})
        </a>
        <button class="btn btn-primary btn-full" data-open-modal="enrollModal">
          Reserve Seat for Batch 10 (16 Oct 2026) <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button class="btn btn-ghost btn-sm btn-full" onclick="resetRoadmapModalForm()">
          <i class="fa-solid fa-rotate-left"></i> Recalculate Roadmap
        </button>
      </div>
    `;
  }

  openModal('roadmapModal');
}

window.resetRoadmapModalForm = function() {
  const resultTitle = document.getElementById('roadmapResultTitle');
  const resultBody = document.getElementById('roadmapResultBody');

  if (resultTitle) {
    resultTitle.innerHTML = `<i class="fa-solid fa-compass" style="color: var(--primary);"></i> PMP Strategy Roadmap Generator`;
  }

  if (resultBody) {
    resultBody.innerHTML = `
      <form id="modalRoadmapForm">
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 18px;">
          Get a customized week-by-week PMP preparation plan tailored to your experience, daily study hours, and target exam date.
        </p>

        <div class="form-group">
          <label>Your Name <span style="color:#EF4444">*</span></label>
          <input type="text" name="name" class="form-control" placeholder="Enter your full name" required>
        </div>

        <div class="form-group">
          <label>WhatsApp Number <span style="color:#EF4444">*</span></label>
          <div class="phone-input-group">
            <select class="form-control country-code-select" name="countryCode">
              <option value="+880">🇧🇩 +880</option>
              <option value="+966">🇸🇦 +966</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
            </select>
            <input type="tel" name="phone" class="form-control" placeholder="01XXXXXXXXX" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Total Experience <span style="color:#EF4444">*</span></label>
            <select name="exp" class="form-control" required>
              <option value="3-5 years">3 to 5 years</option>
              <option value="6-10 years">6 to 10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          <div class="form-group">
            <label>Daily Study Time <span style="color:#EF4444">*</span></label>
            <select name="hours" class="form-control" required>
              <option value="1 hour">1 hour/day</option>
              <option value="2 hours" selected>2 hours/day</option>
              <option value="3+ hours">3+ hours/day</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Target Exam Date <span style="color:#EF4444">*</span></label>
          <select name="target" class="form-control" required>
            <option value="Within 4 weeks">Within 4 weeks</option>
            <option value="Within 6 weeks" selected>Within 6 weeks</option>
            <option value="In 2-3 months">In 2–3 months</option>
          </select>
        </div>

        <button type="submit" class="btn btn-gold btn-full btn-lg">
          Generate My PMP Roadmap <i class="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    `;
  }
};

function initEnrollForm() {
  const form = document.getElementById('enrollModalForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const payment = formData.get('payment');

    alert(`Thank you ${name}! Your seat reservation request for ${payment} has been received. Emdad's team will contact you shortly via WhatsApp.`);
    closeAllModals();
    form.reset();
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
}

function initFilters() {
  // Course Filters
  const courseTabs = document.querySelectorAll('#courseFilters .tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  courseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      courseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('zoom-in', 'is-visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Blog Filters
  const blogTabs = document.querySelectorAll('#blogFilters .tab-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  blogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      blogTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      blogCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('zoom-in', 'is-visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    alert(`Thank you ${name}! Your message has been sent to Emdad Hossain. You will receive a response within 24 hours.`);
    form.reset();
  });
}

let scrollObserver;

function initScrollAnimations() {
  // Add reveal-on-scroll class to key cards & sections
  const animateElements = document.querySelectorAll(
    '.panel-card, .service-card, .course-card, .blog-card, .journey-step-card, .stat-item, .testimonial-card-featured, .cta-banner'
  );

  animateElements.forEach(el => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  triggerScrollObserver();
}

function triggerScrollObserver() {
  const targets = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
  
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }

  if (scrollObserver) scrollObserver.disconnect();

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(target => scrollObserver.observe(target));
}

/* Global Blog Modal Helper */
window.openBlogModal = function(title, category, date, contentHTML) {
  document.getElementById('blogModalTitle').textContent = title;
  document.getElementById('blogModalMeta').textContent = `${category} • ${date} • 5 min read`;
  document.getElementById('blogModalBody').innerHTML = contentHTML;
  openModal('blogModal');
};

function initAlumniSlider() {
  const slider = document.getElementById('alumniSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  const dots = slider.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  let currentSlide = 0;
  let autoSlideTimer = null;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 4500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-slide'), 10);
      goToSlide(index);
      startAutoSlide();
    });
  });

  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}
