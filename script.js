// ========================================
// CONFIGURAÇÃO INICIAL E ELEMENTO SDK
// ========================================

// Configuração padrão do elemento
const defaultConfig = {
  // Cores principais (em ordem de proeminência visual)
  background_color: '#1a1a2e',      // Fundo escuro egípcio
  surface_color: '#16213e',          // Superfície secundária (cards, painéis)
  text_color: '#f5e6d3',             // Cor do texto (areia clara)
  primary_action_color: '#d4a419',   // Dourado principal (botões, destaques)
  secondary_action_color: '#c9a227', // Dourado secundário (links, ícones)

  // Fonte
  font_family: 'Cinzel',
  font_size: 16,

  // Textos editáveis
  site_title: 'Volta ao Mundo',
  hero_subtitle: 'Descubra os mistérios de uma das civilizações mais fascinantes da história da humanidade',
  contact_title: 'Entre em Contato'
};

// Configuração atual
let config = { ...defaultConfig };

// Função onConfigChange - atualiza a UI baseado na configuração
async function onConfigChange(newConfig) {
  config = { ...config, ...newConfig };

  // Atualizar cores
  document.body.style.backgroundColor = config.background_color;

  // Atualizar textos editáveis
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) siteTitle.textContent = config.site_title;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle;

  const contactTitle = document.getElementById('contact-title');
  if (contactTitle) contactTitle.textContent = config.contact_title;

  // Atualizar fonte
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = 'serif';
  document.querySelectorAll('.font-title, h1, h2, h3, h4').forEach(el => {
    el.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // Atualizar tamanho da fonte base
  const baseSize = config.font_size || defaultConfig.font_size;
  document.documentElement.style.fontSize = `${baseSize}px`;
}

// Mapear para capacidades (cores, fontes)
function mapToCapabilities(cfg) {
  return {
    recolorables: [
      // Cor de fundo
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
          cfg.background_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ background_color: value });
        }
      },
      // Cor de superfície
      {
        get: () => cfg.surface_color || defaultConfig.surface_color,
        set: (value) => {
          cfg.surface_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ surface_color: value });
        }
      },
      // Cor do texto
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
          cfg.text_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
        }
      },
      // Cor de ação primária (dourado)
      {
        get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          cfg.primary_action_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ primary_action_color: value });
        }
      },
      // Cor de ação secundária
      {
        get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          cfg.secondary_action_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ secondary_action_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => cfg.font_family || defaultConfig.font_family,
      set: (value) => {
        cfg.font_family = value;
        if (window.elementSdk) window.elementSdk.setConfig({ font_family: value });
      }
    },
    fontSizeable: {
      get: () => cfg.font_size || defaultConfig.font_size,
      set: (value) => {
        cfg.font_size = value;
        if (window.elementSdk) window.elementSdk.setConfig({ font_size: value });
      }
    }
  };
}

// Mapear para valores do painel de edição
function mapToEditPanelValues(cfg) {
  return new Map([
    ['site_title', cfg.site_title || defaultConfig.site_title],
    ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
    ['contact_title', cfg.contact_title || defaultConfig.contact_title]
  ]);
}

// Inicializar Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// ========================================
// MENU MOBILE (HAMBÚRGUER)
// ========================================

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Função para abrir o menu
function openMenu() {
  mobileMenu.classList.add('active');
  menuOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Função para fechar o menu
function closeMenu() {
  mobileMenu.classList.remove('active');
  menuOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

// Event listeners do menu
menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Fechar menu ao clicar em um link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ========================================
// HEADER COM SCROLL
// ========================================

const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-egypt-dark/95', 'backdrop-blur-md', 'shadow-lg');
  } else {
    header.classList.remove('bg-egypt-dark/95', 'backdrop-blur-md', 'shadow-lg');
  }
});

// ========================================
// ANIMAÇÕES DE FADE-IN AO SCROLL
// ========================================

// Intersection Observer para animações
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observar todos os elementos com classe fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

// ========================================
// TABS DE CULTURA
// ========================================

const cultureTabs = document.querySelectorAll('.culture-tab');
const tabPanels = document.querySelectorAll('.tab-panel');

cultureTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;

    // Remover classe active de todas as tabs
    cultureTabs.forEach(t => {
      t.classList.remove('active', 'bg-gold-600', 'text-egypt-dark');
      t.classList.add('bg-egypt-navy', 'text-sand-200');
    });

    // Adicionar classe active na tab clicada
    tab.classList.add('active', 'bg-gold-600', 'text-egypt-dark');
    tab.classList.remove('bg-egypt-navy', 'text-sand-200');

    // Esconder todos os painéis
    tabPanels.forEach(panel => {
      panel.classList.add('hidden');
    });

    // Mostrar o painel correspondente
    const targetPanel = document.getElementById(`tab-${targetTab}`);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
    }
  });
});

// ========================================
// BOTÕES "SAIBA MAIS"
// ========================================

const saibaMaisBtns = document.querySelectorAll('.saiba-mais');

saibaMaisBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('article');
    const title = card.querySelector('h3').textContent;

    // Criar e mostrar toast de notificação
    showToast(`Mais informações sobre ${title} em breve!`);
  });
});

// ========================================
// SISTEMA DE TOAST / NOTIFICAÇÕES
// ========================================

function showToast(message, duration = 3000) {
  // Remover toast existente se houver
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  // Criar toast
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gold-600 text-egypt-dark px-6 py-3 rounded-full font-medium shadow-lg z-50 animate-bounce';
  toast.innerHTML = `
    <span class="flex items-center gap-2">
      <span>✨</span>
      <span>${message}</span>
    </span>
  `;

  document.body.appendChild(toast);

  // Remover após duração
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Simular envio
  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="flex items-center gap-2"><i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Enviando...</span>';

  // Recriar ícones do Lucide
  lucide.createIcons();

  // Simular delay de envio
  setTimeout(() => {
    // Esconder formulário e mostrar mensagem de sucesso
    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');

    // Mostrar toast
    showToast('Mensagem enviada com sucesso! 🎉');

    // Resetar formulário após alguns segundos
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('hidden');
      successMessage.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Enviar Mensagem</span><i data-lucide="send" class="w-5 h-5"></i>';
      lucide.createIcons();
    }, 5000);
  }, 1500);
});

// ========================================
// INICIALIZAÇÃO DO LUCIDE ICONS
// ========================================

lucide.createIcons();

// ========================================
// NAVEGAÇÃO SUAVE (SCROLL SMOOTH)
// ========================================

// Já configurado no CSS com scroll-behavior: smooth
// Adicionar offset para o header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
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