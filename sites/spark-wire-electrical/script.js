// Spark & Wire Electrical — shared behaviour

document.addEventListener('DOMContentLoaded', () => {
  /* Mobile menu */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  const closeMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    document.body.classList.add('menu-open');
  };

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileMenuClose?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* Scroll reveal */
  const fades = document.querySelectorAll('.fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  fades.forEach(el => observer.observe(el));

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* Multi-step contact form */
  const form = document.getElementById('enquiry-form');
  if (form) {
    const steps = form.querySelectorAll('.form-step');
    const progressFill = document.querySelector('.form-progress-fill');
    const progressLabel = document.querySelector('.form-progress-label');
    let currentStep = 1;
    const totalSteps = steps.length;

    const showStep = (n) => {
      steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === n));
      if (progressFill) progressFill.style.width = (n / totalSteps * 100) + '%';
      if (progressLabel) progressLabel.textContent = `Step ${n} of ${totalSteps}`;
    };

    form.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });
    form.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });

    /* Service tile selection */
    form.querySelectorAll('.tile[data-field]').forEach(tile => {
      tile.addEventListener('click', () => {
        const group = tile.closest('.tile-grid');
        group.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        const otherInput = form.querySelector(tile.dataset.otherTarget ? `#${tile.dataset.otherTarget}` : null);
        if (tile.dataset.other === 'true') {
          otherInput?.classList.add('show');
        } else if (otherInput) {
          otherInput.classList.remove('show');
        }
        const hiddenField = form.querySelector(`input[name="${tile.dataset.field}"]`);
        if (hiddenField) hiddenField.value = tile.dataset.value;
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
      document.querySelector('.form-progress')?.style.setProperty('display', 'none');
      document.querySelector('.form-success')?.classList.add('show');
    });
  }
});
