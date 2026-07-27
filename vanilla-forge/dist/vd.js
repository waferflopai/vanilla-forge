/* ============================================================
   VANILLAFORGE v1.1 · JavaScript Engine
   ============================================================ */

(function() {
  'use strict';

  // ---------- 1. DROPDOWN ----------
  document.addEventListener('click', function(e) {
    const toggle = e.target.closest('[data-dropdown]');
    if (toggle) {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-dropdown');
      const menu = document.getElementById(targetId);
      if (menu) {
        document.querySelectorAll('.dropdown-menu.show').forEach(el => {
          if (el !== menu) el.classList.remove('show');
        });
        menu.classList.toggle('show');
      }
      return;
    }
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(el => el.classList.remove('show'));
    }
  });

  // ---------- 2. TOASTS ----------
  const toastContainer = document.getElementById('toast-container') || (function() {
    const c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  function createToast(msg, type, duration) {
    type = type || 'info';
    duration = duration || 3500;
    const icons = {
      cherry: 'fa-heart',
      lime: 'fa-leaf',
      lemon: 'fa-lemon',
      watermelon: 'fa-watermelon',
      grape: 'fa-grapes',
      ocean: 'fa-water',
      sunset: 'fa-sun',
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    const icon = icons[type] || icons.info;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span class="toast-icon"><i class="fas ' + icon + '"></i></span><span class="toast-body">' + msg + '</span><button class="toast-close">&times;</button>';
    toast.querySelector('.toast-close').addEventListener('click', function() {
      removeToast(toast);
    });
    toastContainer.appendChild(toast);
    setTimeout(function() {
      removeToast(toast);
    }, duration);
  }

  function removeToast(t) {
    if (t.classList.contains('removing')) return;
    t.classList.add('removing');
    setTimeout(function() {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 250);
  }

  // ---------- 3. MODALS ----------
  function openModal(id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('show');
  }

  function closeModal(id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('show');
  }

  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      var id = trigger.getAttribute('data-modal');
      openModal(id);
    }
    var close = e.target.closest('[data-modal-close]');
    if (close) {
      var id = close.getAttribute('data-modal-close');
      closeModal(id);
    }
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target.id);
    }
  });

  // ---------- 4. TABS ----------
  document.addEventListener('click', function(e) {
    var tabBtn = e.target.closest('[data-tabs]');
    if (tabBtn) {
      var group = tabBtn.getAttribute('data-tabs');
      var parent = tabBtn.closest('.tabs');
      if (!parent) return;
      var buttons = parent.querySelectorAll('[data-tabs="' + group + '"]');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      tabBtn.classList.add('active');
      var panelId = tabBtn.getAttribute('data-tab-target');
      var panels = parent.querySelectorAll('.tab-panel');
      for (var j = 0; j < panels.length; j++) {
        panels[j].classList.remove('active');
      }
      var panel = parent.querySelector(panelId);
      if (panel) panel.classList.add('active');
    }
  });

  // ---------- 5. PUBLIC API ----------
  window.vd = {
    toast: createToast,
    modal: {
      open: openModal,
      close: closeModal
    },
    dropdown: {
      toggle: function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.toggle('show');
      }
    }
  };

  // ---------- 6. UTILITIES ----------
  window.vdSimulateLoad = function(btn, duration) {
    duration = duration || 1600;
    var orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner-ring spinner-ring-sm" style="border-width:2.5px; width:18px; height:18px;"></div> Loading...';
    setTimeout(function() {
      btn.innerHTML = '<i class="fas fa-check"></i> Done!';
      btn.disabled = false;
      window.vd.toast('Load complete.', 'success');
      setTimeout(function() {
        btn.innerHTML = orig;
      }, 1000);
    }, duration);
  };

  window.vdCopy = function(text, msg) {
    msg = msg || 'Copied!';
    navigator.clipboard.writeText(text).then(function() {
      window.vd.toast(msg, 'success');
    }).catch(function() {
      window.vd.toast('Copy failed', 'error');
    });
  };

  console.log('🍫 VanillaForge v1.1 loaded. ~10KB · 0 deps.');
})();