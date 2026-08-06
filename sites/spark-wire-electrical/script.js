// Spark & Wire Electrical — shared behaviour

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Scroll reveal
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

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
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

  // Multi-step contact form
  const form = document.querySelector('.enquiry-form');
  if (form) {
    const steps = form.querySelectorAll('.form-step');
    const progressSteps = form.querySelectorAll('.form-progress-step');
    const stepLabel = form.querySelector('.form-step-label');
    const stepLabels = ['Step 1 of 3 — Select a service', 'Step 2 of 3 — Project details', 'Step 3 of 3 — Your details'];
    let currentStep = 0;

    function showStep(index) {
      steps.forEach((step, i) => step.classList.toggle('active', i === index));
      progressSteps.forEach((p, i) => {
        p.classList.toggle('active', i === index);
        p.classList.toggle('done', i < index);
      });
      if (stepLabel) stepLabel.textContent = stepLabels[index] || '';
      currentStep = index;
    }

    // Tile selection (service, urgency, property type)
    form.querySelectorAll('.tile-grid').forEach(group => {
      group.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
          group.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
          tile.classList.add('selected');
          const input = group.closest('.field').querySelector('input[type="hidden"]');
          if (input) input.value = tile.dataset.value || tile.textContent.trim();
          const otherInput = group.parentElement.querySelector('.other-input');
          if (otherInput) {
            otherInput.style.display = tile.dataset.value === 'Other' ? 'block' : 'none';
          }
        });
      });
    });

    form.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
      });
    });

    form.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 0) showStep(currentStep - 1);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const errorEl = form.querySelector('.form-error');
      if (errorEl) errorEl.classList.remove('active');
      if (submitBtn) submitBtn.disabled = true;

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch('https://formspree.io/f/xpwzgkqd', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          form.style.display = 'none';
          const success = document.querySelector('.form-success');
          if (success) success.classList.add('active');
        } else {
          if (errorEl) errorEl.classList.add('active');
        }
      } catch (err) {
        if (errorEl) errorEl.classList.add('active');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    showStep(0);
  }
});
