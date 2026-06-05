// 1. Guard for SSR: Ensure this code only runs in a browser environment
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      const icon = mobileMenuBtn.querySelector('i');
      
      const toggleMenu = (forceClose = false) => {
        const isHidden = forceClose || !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', isHidden);
        if (icon) {
          icon.classList.toggle('fa-bars', isHidden);
          icon.classList.toggle('fa-xmark', !isHidden);
        }
      };

      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
      });

      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          toggleMenu(true);
        }
      });
    }

    // --- User Dropdown ---
    const userButtons = document.getElementById('user-buttons');
    if (userButtons) {
      const dropdown = document.getElementById('user-dropdown');
      if (dropdown) {
        userButtons.querySelector('button').addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
          if (!userButtons.contains(e.target)) {
            dropdown.classList.add('hidden');
          }
        });
      }
    }

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
          scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
          scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
          scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
      });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // --- Header Shadow on Scroll ---
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      });
    }

    // --- Newsletter Form Handling ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', handleSubscribe);
    }
  });
}

// --- Helper Functions ---
function newsletterToast(message, ok) {
  const t = document.createElement('div');
  t.className = `fixed bottom-6 right-6 z-[9999] text-white px-4 py-3 rounded-xl shadow-lg text-sm max-w-[320px] ${
    ok ? 'bg-emerald-600' : 'bg-red-600'
  }`;
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4500);
}

async function handleSubscribe(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput?.value?.trim() || '';

  if (!email) {
    newsletterToast('Enter your email address first.', false);
    return;
  }

  const btn = form?.querySelector('button[type="submit"]');
  const prevText = btn ? btn.textContent : null;

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
  }

  try {
    const payload = { email, source: window.location.pathname || 'website' };
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);

    newsletterToast(body?.message || 'Subscribed successfully.', true);
    if (emailInput) emailInput.value = '';
  } catch (err) {
    newsletterToast(err?.message || 'Subscription failed. Please try again.', false);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = prevText || 'SUBSCRIBE';
    }
  }
}
