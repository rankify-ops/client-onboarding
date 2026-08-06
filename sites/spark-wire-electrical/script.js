/* =========================================================================
   Spark & Wire Electrical — Shared Script
   Mobile menu, header scroll effect, scroll-reveal, FAQ accordion,
   multi-step contact form.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll effect ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('nav a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---------- Scroll reveal ---------- */
  const fades = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    fades.forEach(el => observer.observe(el));
  } else {
    fades.forEach(el => el.classList.add('visible'));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Multi-step contact form ---------- */
  const form = document.getElementById('enquiryForm');
  if (form) {
    const steps = Array.from(form.querySelectorAll('.form-step'));
    const dots = Array.from(document.querySelectorAll('.progress-dot'));
    const stepLabel = document.getElementById('formStepLabel');
    let currentStep = 0;

    const serviceInput = document.getElementById('selectedService');
    const otherWrap = document.getElementById('otherServiceWrap');
    const otherInput = document.getElementById('otherServiceInput');
    const urgencyInput = document.getElementById('selectedUrgency');
    const propertyInput = document.getElementById('selectedProperty');
    const contactMethodInput = document.getElementById('selectedContactMethod');

    function updateProgress() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentStep);
        dot.classList.toggle('done', i < currentStep);
      });
      if (stepLabel) stepLabel.textContent = 'Step ' + (currentStep + 1) + ' of ' + steps.length;
    }

    function showStep(index) {
      steps.forEach((step, i) => step.classList.toggle('active', i === index));
      currentStep = index;
      updateProgress();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(index) {
      const step = steps[index];
      let valid = true;

      if (index === 0) {
        if (!serviceInput.value) valid = false;
        if (serviceInput.value === 'Other' && !otherInput.value.trim()) valid = false;
      } else {
        const requiredFields = step.querySelectorAll('[data-required="true"]');
        requiredFields.forEach(f => {
          if (!f.value || !f.value.trim()) valid = false;
        });
      }
      return valid;
    }

    /* Service tiles (step 1) */
    form.querySelectorAll('.tile[data-service]').forEach(tile => {
      tile.addEventListener('click', () => {
        form.querySelectorAll('.tile[data-service]').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        const service = tile.getAttribute('data-service');
        serviceInput.value = service;
        if (service === 'Other') {
          otherWrap.classList.remove('is-hidden');
        } else {
          otherWrap.classList.add('is-hidden');
          otherInput.value = '';
        }
      });
    });

    /* Urgency tiles (step 2) */
    form.querySelectorAll('.toggle-option[data-urgency]').forEach(opt => {
      opt.addEventListener('click', () => {
        form.querySelectorAll('.toggle-option[data-urgency]').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        urgencyInput.value = opt.getAttribute('data-urgency');
      });
    });

    /* Property type tiles (step 2) */
    form.querySelectorAll('.tile[data-property]').forEach(tile => {
      tile.addEventListener('click', () => {
        form.querySelectorAll('.tile[data-property]').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        propertyInput.value = tile.getAttribute('data-property');
      });
    });

    /* Preferred contact method (step 3) */
    form.querySelectorAll('.toggle-option[data-contact-method]').forEach(opt => {
      opt.addEventListener('click', () => {
        form.querySelectorAll('.toggle-option[data-contact-method]').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        contactMethodInput.value = opt.getAttribute('data-contact-method');
      });
    });

    /* Next / Back buttons */
    form.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!validateStep(currentStep)) {
          const errorEl = steps[currentStep].querySelector('.step-error');
          if (errorEl) errorEl.classList.add('show');
          return;
        }
        const errorEl = steps[currentStep].querySelector('.step-error');
        if (errorEl) errorEl.classList.remove('show');
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
      });
    });
    form.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 0) showStep(currentStep - 1);
      });
    });

    /* Submit */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(currentStep)) {
        const errorEl = steps[currentStep].querySelector('.step-error');
        if (errorEl) errorEl.classList.add('show');
        return;
      }

      const submitBtn = form.querySelector('[data-submit]');
      const formError = document.getElementById('formSubmitError');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      if (formError) formError.classList.remove('show');

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.ok) {
          document.getElementById('formStepsWrap').classList.add('is-hidden');
          document.getElementById('formSuccess').classList.remove('is-hidden');
        } else {
          throw new Error('Submission failed');
        }
      }).catch(() => {
        if (formError) formError.classList.add('show');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Enquiry'; }
      });
    });

    showStep(0);
  }

});
