/**
 * ============================================================================
 * InstaCollage — Instagram Posts & Carousels to Ready Collages in 1 Click
 * ----------------------------------------------------------------------------
 * Developed by: Mahmoud Madi (https://github.com/mahmoud-madi)
 * Powered by: Premier Tech & Voxo AI
 * License: MIT
 * ----------------------------------------------------------------------------
 * HTML5 Canvas Mathematical Graphics Engine, Layout Matrix & State Controller
 * ============================================================================
 */

// ==========================================
// 🎨 Built-in Demo Carousels Dataset
// ==========================================
export const DEMO_CAROUSELS = {
  architecture: {
    shortcode: 'DEMO_ARCH_01',
    author: {
      username: 'architectural.spaces',
      fullName: 'Modern Architectural Spaces',
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Modernist sanctuaries: 6 breathtaking brutalist & minimalist architectural structures from Tokyo, Copenhagen, and Zürich. ✨📐 #architecture #design #modernism',
    likesCount: '48.2K',
    postedAt: 'October 24, 2024',
    slides: [
      {
        slideIndex: 0,
        originalUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Glass Pavilion Villa'
      },
      {
        slideIndex: 1,
        originalUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Nordic Minimalist Residence'
      },
      {
        slideIndex: 2,
        originalUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Sunlit Cantilever Terrace'
      },
      {
        slideIndex: 3,
        originalUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Geometric Concrete Atrium'
      },
      {
        slideIndex: 4,
        originalUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Reflective Infinity Courtyard'
      },
      {
        slideIndex: 5,
        originalUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.75,
        title: 'Brutalist Loft Interior'
      }
    ]
  },
  travel: {
    shortcode: 'DEMO_TRAVEL_02',
    author: {
      username: 'wandering.nomads',
      fullName: 'Wandering Nomads',
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Kyoto autumn lights: misty temple gardens, bamboo groves, and traditional tea ceremonies. 🍁⛩️ #japan #travel #kyoto',
    likesCount: '74.1K',
    postedAt: 'November 18, 2024',
    slides: [
      {
        slideIndex: 0,
        originalUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Kyoto Pagoda Dusk'
      },
      {
        slideIndex: 1,
        originalUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Tokyo Neon Alley'
      },
      {
        slideIndex: 2,
        originalUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Torii Gate Trail'
      },
      {
        slideIndex: 3,
        originalUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Mount Fuji Horizon'
      },
      {
        slideIndex: 4,
        originalUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Tropical Azure Coast'
      },
      {
        slideIndex: 5,
        originalUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Yosemite Alpine Valley'
      }
    ]
  },
  fashion: {
    shortcode: 'DEMO_FASHION_03',
    author: {
      username: 'vogue.editorial',
      fullName: 'Vogue Editorial',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Autumn/Winter Haute Couture Lookbook. Silk textures, tailored velvet coats, and Parisian golden hour. 🖤✨ #fashion #lookbook',
    likesCount: '89.4K',
    postedAt: 'November 12, 2024',
    slides: [
      {
        slideIndex: 0,
        originalUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Crimson Velvet Silhouette'
      },
      {
        slideIndex: 1,
        originalUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Canary Yellow Trench'
      },
      {
        slideIndex: 2,
        originalUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Urban Streetwear Layering'
      },
      {
        slideIndex: 3,
        originalUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 0.8,
        title: 'Monochrome Knitwear Portrait'
      }
    ]
  },
  tech: {
    shortcode: 'DEMO_TECH_04',
    author: {
      username: 'cyberpunk.labs',
      fullName: 'Cyberpunk Labs',
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Neon mechanical keyboards, OLED workspaces, and high-end engineering labs. ⚡🕹️ #setups #workspace #cyberpunk',
    likesCount: '62.1K',
    postedAt: 'December 05, 2024',
    slides: [
      {
        slideIndex: 0,
        originalUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Retro Synth & Neon Matrix'
      },
      {
        slideIndex: 1,
        originalUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Custom PCB Circuitry'
      },
      {
        slideIndex: 2,
        originalUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'RGB Mechanical Keycaps'
      },
      {
        slideIndex: 3,
        originalUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Silicon Microchip Die'
      }
    ]
  },
  food: {
    shortcode: 'DEMO_FOOD_05',
    author: {
      username: 'artisan.culinary',
      fullName: 'Artisan Culinary & Coffee',
      profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Warm morning aesthetics: sourdough brioche, specialty pour-overs, and artisan pastry tasting in Copenhagen. ☕🥐 #foodie #cafe',
    likesCount: '39.8K',
    postedAt: 'January 14, 2025',
    slides: [
      {
        slideIndex: 0,
        originalUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Artisan Sourdough Loaf'
      },
      {
        slideIndex: 1,
        originalUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Specialty Latte Art'
      },
      {
        slideIndex: 2,
        originalUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Woodfired Pizza Feast'
      },
      {
        slideIndex: 3,
        originalUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&auto=format&fit=crop&q=85',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80',
        aspectRatio: 1.0,
        title: 'Fresh Mediterranean Bowl'
      }
    ]
  }
};

// ==========================================
// 🎛️ Central Reactive State
// ==========================================
export const state = {
  carouselData: null,
  slides: [], // Array of slide items
  imageElementCache: new Map(),

  layout: {
    artisticMode: 'grid', // 'grid' | 'polaroid' | 'filmstrip' | 'masonry'
    cols: 3,
    rows: 0, // 0 = Auto
    aspectRatio: 'auto', // 'auto' | '1:1' | '4:5' | '3:4' | '9:16' | '16:9'
    fitMode: 'cover', // 'cover' | 'contain'
    spacing: 16,
    padding: 24,
    radius: 16
  },

  styling: {
    bgType: 'blurred', // 'blurred' | 'gradient' | 'solid'
    palette: 'obsidian',
    polaroidAngle: 6,
    polaroidShadow: 20,
    showPolaroidCaptions: true,
    filmStyle: 'kodak',
    filmGrain: true
  },

  editing: {
    filter: 'none', // 'none' | 'vivid' | 'vintage' | 'sepia' | 'cyber-mono' | 'dramatic' | 'pastel'
    brightness: 100,
    contrast: 100,
    saturation: 100
  }
};

// Seed for random Polaroid tilts
let polaroidSeed = 42;

// ==========================================
// 🚀 App Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  initIndexedDB();
  
  // Load default architecture demo immediately
  loadDemoCarousel('architecture');
});

// ==========================================
// 🔌 Event Listeners Registration
// ==========================================
function initEventListeners() {
  // 1. Instagram Link Extraction
  const extractForm = document.getElementById('extractForm');
  const instagramUrlInput = document.getElementById('instagramUrlInput');
  const btnClearInput = document.getElementById('btnClearInput');
  const btnPasteClipboard = document.getElementById('btnPasteClipboard');

  if (extractForm) {
    extractForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = instagramUrlInput?.value.trim();
      if (url) unpackInstagramCarousel(url);
    });
  }

  if (instagramUrlInput) {
    instagramUrlInput.addEventListener('input', () => {
      btnClearInput?.classList.toggle('hidden', !instagramUrlInput.value);
    });
  }

  if (btnClearInput) {
    btnClearInput.addEventListener('click', () => {
      if (instagramUrlInput) {
        instagramUrlInput.value = '';
        btnClearInput.classList.add('hidden');
        instagramUrlInput.focus();
      }
    });
  }

  if (btnPasteClipboard) {
    btnPasteClipboard.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text && instagramUrlInput) {
          instagramUrlInput.value = text.trim();
          btnClearInput?.classList.remove('hidden');
          showToast('Pasted from clipboard!', 'info');
          unpackInstagramCarousel(text.trim());
        }
      } catch (err) {
        showToast('Please allow clipboard permissions', 'error');
      }
    });
  }

  // 2. Demo Presets Dropdown
  const btnDemoDropdown = document.getElementById('btnDemoDropdown');
  const demoMenu = document.getElementById('demoMenu');

  if (btnDemoDropdown && demoMenu) {
    btnDemoDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      demoMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      demoMenu.classList.remove('show');
    });

    document.querySelectorAll('[data-demo]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const demoKey = btn.getAttribute('data-demo');
        loadDemoCarousel(demoKey);
        demoMenu.classList.remove('show');
      });
    });
  }

  // 3. Tab Switching
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
      });

      tab.classList.add('active');
      const targetId = `tab${tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
      }
    });
  });

  // 4. Artistic Layout Modes
  document.querySelectorAll('[data-art-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-art-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.layout.artisticMode = btn.dataset.artMode;

      // Toggle mode-specific control panels
      const groupGrid = document.getElementById('groupGridDimensions');
      const groupPolaroid = document.getElementById('groupPolaroidControls');
      const groupFilmstrip = document.getElementById('groupFilmstripControls');

      if (groupGrid) groupGrid.classList.toggle('hidden', state.layout.artisticMode !== 'grid' && state.layout.artisticMode !== 'masonry');
      if (groupPolaroid) groupPolaroid.classList.toggle('hidden', state.layout.artisticMode !== 'polaroid');
      if (groupFilmstrip) groupFilmstrip.classList.toggle('hidden', state.layout.artisticMode !== 'filmstrip');

      renderCanvas();
    });
  });

  // 5. Layout Sliders
  bindSlider('sliderCols', 'valCols', '', (val) => {
    state.layout.cols = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderRows', 'valRows', '', (val) => {
    state.layout.rows = parseInt(val, 10);
    const label = document.getElementById('valRows');
    if (label) label.textContent = val === '0' ? 'Auto' : val;
    renderCanvas();
  });

  bindSlider('sliderSpacing', 'valSpacing', 'px', (val) => {
    state.layout.spacing = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderPadding', 'valPadding', 'px', (val) => {
    state.layout.padding = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderRadius', 'valRadius', 'px', (val) => {
    state.layout.radius = parseInt(val, 10);
    renderCanvas();
  });

  // 6. Aspect Ratio Buttons
  document.querySelectorAll('[data-ratio]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ratio]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.layout.aspectRatio = btn.dataset.ratio;
      const label = document.getElementById('activeRatioLabel');
      if (label) label.textContent = btn.dataset.ratio.toUpperCase();
      renderCanvas();
    });
  });

  // 7. Fitting Mode (Cover vs Contain)
  document.querySelectorAll('[data-fit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-fit]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.layout.fitMode = btn.dataset.fit;
      renderCanvas();
    });
  });

  // 8. Background Mode & Palettes
  document.querySelectorAll('[data-bg-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-bg-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.styling.bgType = btn.dataset.bgType;
      renderCanvas();
    });
  });

  document.querySelectorAll('[data-palette]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-palette]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.styling.palette = btn.dataset.palette;
      renderCanvas();
    });
  });

  // 9. Polaroid Controls
  bindSlider('sliderPolaroidAngle', 'valPolaroidAngle', '°', (val) => {
    state.styling.polaroidAngle = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderPolaroidShadow', 'valPolaroidShadow', 'px', (val) => {
    state.styling.polaroidShadow = parseInt(val, 10);
    renderCanvas();
  });

  const checkPolaroidCaptions = document.getElementById('checkPolaroidCaptions');
  if (checkPolaroidCaptions) {
    checkPolaroidCaptions.addEventListener('change', (e) => {
      state.styling.showPolaroidCaptions = e.target.checked;
      renderCanvas();
    });
  }

  // 10. Filmstrip Controls
  document.querySelectorAll('[data-film-style]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-film-style]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.styling.filmStyle = btn.dataset.filmStyle;
      renderCanvas();
    });
  });

  const checkFilmGrain = document.getElementById('checkFilmGrain');
  if (checkFilmGrain) {
    checkFilmGrain.addEventListener('change', (e) => {
      state.styling.filmGrain = e.target.checked;
      renderCanvas();
    });
  }

  // 11. Color Filters & Sliders
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.editing.filter = btn.dataset.filter;
      renderCanvas();
    });
  });

  bindSlider('sliderBrightness', 'valBrightness', '%', (val) => {
    state.editing.brightness = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderContrast', 'valContrast', '%', (val) => {
    state.editing.contrast = parseInt(val, 10);
    renderCanvas();
  });

  bindSlider('sliderSaturation', 'valSaturation', '%', (val) => {
    state.editing.saturation = parseInt(val, 10);
    renderCanvas();
  });

  // 12. Export Buttons
  document.getElementById('btnExportPng')?.addEventListener('click', () => exportCollage('png'));
  document.getElementById('btnExportJpeg')?.addEventListener('click', () => exportCollage('jpeg'));
  document.getElementById('btnCopyClipboard')?.addEventListener('click', copyCanvasToClipboard);
  document.getElementById('btnExportZip')?.addEventListener('click', exportZipArchive);

  // 13. Top Actions (Shuffle, Reset, Fit)
  document.getElementById('btnRandomizeScrapbook')?.addEventListener('click', () => {
    polaroidSeed = Math.floor(Math.random() * 100000);
    renderCanvas();
    showToast('Polaroid tilt angles randomized!', 'info');
  });

  document.getElementById('btnResetCanvas')?.addEventListener('click', () => {
    state.layout.cols = 3;
    state.layout.rows = 0;
    state.layout.spacing = 16;
    state.layout.padding = 24;
    state.layout.radius = 16;
    state.layout.aspectRatio = 'auto';
    state.layout.fitMode = 'cover';
    state.editing.filter = 'none';
    state.editing.brightness = 100;
    state.editing.contrast = 100;
    state.editing.saturation = 100;
    renderCanvas();
    showToast('Canvas parameters reset', 'info');
  });

  // 14. Modals (About, Upload, Vault)
  setupModal('btnOpenAbout', 'btnCloseAboutModal', 'aboutModalBackdrop');
  setupModal('btnUploadLocal', 'btnCloseUploadModal', 'uploadModalBackdrop');

  const btnOpenVault = document.getElementById('btnOpenVault');
  const btnCloseVault = document.getElementById('btnCloseVault');
  const vaultBackdrop = document.getElementById('vaultBackdrop');
  const btnClearVault = document.getElementById('btnClearVault');

  if (btnOpenVault && vaultBackdrop) {
    btnOpenVault.addEventListener('click', () => {
      vaultBackdrop.classList.remove('hidden');
      loadVaultList();
    });
  }

  if (btnCloseVault && vaultBackdrop) {
    btnCloseVault.addEventListener('click', () => {
      vaultBackdrop.classList.add('hidden');
    });
  }

  if (btnClearVault) {
    btnClearVault.addEventListener('click', clearVault);
  }

  // 15. Local File Upload Handling
  const localFileInput = document.getElementById('localFileInput');
  const btnBrowseFiles = document.getElementById('btnBrowseFiles');
  const uploadDropzone = document.getElementById('uploadDropzone');

  if (btnBrowseFiles && localFileInput) {
    btnBrowseFiles.addEventListener('click', () => localFileInput.click());
  }

  if (localFileInput) {
    localFileInput.addEventListener('change', (e) => {
      handleLocalFiles(e.target.files);
    });
  }

  if (uploadDropzone) {
    uploadDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadDropzone.classList.add('drag-over');
    });

    uploadDropzone.addEventListener('dragleave', () => {
      uploadDropzone.classList.remove('drag-over');
    });

    uploadDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadDropzone.classList.remove('drag-over');
      if (e.dataTransfer.files?.length) {
        handleLocalFiles(e.dataTransfer.files);
      }
    });
  }

  // 16. Searchable FAQ Accordion
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item?.classList.toggle('active');
    });
  });

  const faqSearchInput = document.getElementById('faqSearchInput');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = (!term || text.includes(term)) ? 'block' : 'none';
      });
    });
  }
}

function bindSlider(sliderId, labelId, unit, callback) {
  const slider = document.getElementById(sliderId);
  const label = document.getElementById(labelId);
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    if (label) label.textContent = `${e.target.value}${unit}`;
    callback(e.target.value);
  });
}

function setupModal(openBtnId, closeBtnId, backdropId) {
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);
  const backdrop = document.getElementById(backdropId);

  if (openBtn && backdrop) {
    openBtn.addEventListener('click', () => backdrop.classList.remove('hidden'));
  }
  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => backdrop.classList.add('hidden'));
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.add('hidden');
    });
  }
}

// ==========================================
// 📦 Demo Carousel Loader
// ==========================================
export async function loadDemoCarousel(demoKey = 'architecture') {
  const data = DEMO_CAROUSELS[demoKey] || DEMO_CAROUSELS.architecture;
  state.carouselData = data;
  state.slides = data.slides.map(s => ({
    ...s,
    selected: true,
    rotation: 0
  }));

  const titleEl = document.getElementById('canvasSourceTitle');
  if (titleEl) {
    titleEl.textContent = `${data.author.fullName} (${data.slides.length} Slides)`;
  }

  showToast(`Loaded ${data.author.fullName} demo!`, 'success');
  await preloadSlideImages();
  renderSlideManagerThumbnails();
  renderCanvas();
  saveToIndexedDB(data);
}

// ==========================================
// 🔄 Unpack Instagram URL (Live Server / Fallback)
// ==========================================
async function unpackInstagramCarousel(url) {
  const progressContainer = document.getElementById('extractionProgress');
  const progressFill = document.getElementById('progressFillBar');
  const progressLabel = document.getElementById('progressStatusLabel');
  const btnSubmit = document.getElementById('btnExtractSubmit');

  if (progressContainer) progressContainer.classList.remove('hidden');
  if (btnSubmit) btnSubmit.disabled = true;

  try {
    if (progressFill) progressFill.style.width = '30%';
    if (progressLabel) progressLabel.textContent = 'Connecting to Instagram crawler...';

    // Attempt live backend extract
    const res = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (progressFill) progressFill.style.width = '75%';
    if (progressLabel) progressLabel.textContent = 'Parsing carousel media streams...';

    if (res.ok) {
      const data = await res.json();
      if (data && data.slides && data.slides.length > 0) {
        state.carouselData = data;
        state.slides = data.slides.map(s => ({
          ...s,
          selected: true,
          rotation: 0
        }));

        const titleEl = document.getElementById('canvasSourceTitle');
        if (titleEl) titleEl.textContent = `@${data.author || 'instagram'} (${data.slides.length} Slides)`;

        await preloadSlideImages();
        renderSlideManagerThumbnails();
        renderCanvas();
        saveToIndexedDB(data);
        showToast(`Successfully unpacked ${data.slides.length} slides!`, 'success');
        return;
      }
    }

    throw new Error('Static host fallback');
  } catch (err) {
    // If backend is not available (e.g. running on static GitHub Pages), load rich demo fallback
    showToast('Static host mode: Loaded high-res demo showcase. Run locally with Node/Docker for live link extraction!', 'info');
    loadDemoCarousel('architecture');
  } finally {
    if (progressFill) progressFill.style.width = '100%';
    setTimeout(() => {
      if (progressContainer) progressContainer.classList.add('hidden');
      if (btnSubmit) btnSubmit.disabled = false;
    }, 400);
  }
}

// ==========================================
// 📂 Local Image Ingestion
// ==========================================
async function handleLocalFiles(files) {
  if (!files || files.length === 0) return;

  const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
  if (validFiles.length === 0) {
    showToast('Please select valid image files (JPG, PNG, WebP)', 'error');
    return;
  }

  const slides = [];
  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    const objectUrl = URL.createObjectURL(file);
    slides.push({
      slideIndex: i,
      originalUrl: objectUrl,
      thumbnailUrl: objectUrl,
      aspectRatio: 1.0,
      title: file.name,
      selected: true,
      rotation: 0
    });
  }

  const localData = {
    shortcode: `LOCAL_${Date.now()}`,
    author: {
      username: 'local.user',
      fullName: 'Local Upload',
      isVerified: false
    },
    caption: `Custom batch of ${slides.length} uploaded photos.`,
    slides: slides
  };

  state.carouselData = localData;
  state.slides = slides;

  const titleEl = document.getElementById('canvasSourceTitle');
  if (titleEl) titleEl.textContent = `Local Photos (${slides.length} Slides)`;

  document.getElementById('uploadModalBackdrop')?.classList.add('hidden');
  showToast(`Loaded ${slides.length} local images!`, 'success');

  await preloadSlideImages();
  renderSlideManagerThumbnails();
  renderCanvas();
}

// ==========================================
// 🖼️ Image Preloader
// ==========================================
async function preloadSlideImages() {
  const promises = state.slides.map(slide => {
    return new Promise((resolve) => {
      const url = slide.originalUrl || slide.thumbnailUrl;
      if (state.imageElementCache.has(url)) {
        slide.imgElement = state.imageElementCache.get(url);
        slide.aspectRatio = slide.imgElement.naturalWidth / slide.imgElement.naturalHeight;
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        state.imageElementCache.set(url, img);
        slide.imgElement = img;
        slide.aspectRatio = img.naturalWidth / img.naturalHeight;
        resolve();
      };
      img.onerror = () => {
        // Fallback placeholder
        const fallback = new Image();
        fallback.src = './public/icons/icon-192.png';
        slide.imgElement = fallback;
        slide.aspectRatio = 1.0;
        resolve();
      };
      img.src = url;
    });
  });

  await Promise.all(promises);
}

// ==========================================
// 🎨 Master Canvas Compositing Engine
// ==========================================
export function renderCanvas() {
  const canvas = document.getElementById('collageCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const activeSlides = state.slides.filter(s => s.selected && s.imgElement);
  if (activeSlides.length === 0) return;

  // 1. Calculate Dominant Aspect Ratio
  const dominantRatio = getDominantAspectRatio(activeSlides);

  // 2. Dispatch Layout Mode
  switch (state.layout.artisticMode) {
    case 'polaroid':
      renderPolaroidLayout(canvas, ctx, activeSlides, dominantRatio);
      break;
    case 'filmstrip':
      renderFilmstripLayout(canvas, ctx, activeSlides, dominantRatio);
      break;
    case 'masonry':
      renderMasonryLayout(canvas, ctx, activeSlides, dominantRatio);
      break;
    case 'grid':
    default:
      renderGridLayout(canvas, ctx, activeSlides, dominantRatio);
      break;
  }

  // Update dimension badge
  const dimBadge = document.getElementById('canvasDimensionsTag');
  if (dimBadge) {
    dimBadge.textContent = `${canvas.width} × ${canvas.height} px`;
  }
}

// Aliases for tests & external modules
export const renderCollage = renderCanvas;
export const triggerCanvasRender = renderCanvas;

function getDominantAspectRatio(slides) {
  if (state.layout.aspectRatio !== 'auto') {
    const parts = state.layout.aspectRatio.split(':').map(Number);
    return parts[0] / parts[1];
  }
  const ratios = slides.map(s => s.aspectRatio || 1.0).sort((a, b) => a - b);
  return ratios[Math.floor(ratios.length / 2)] || 0.8;
}

// ==========================================
// 1. Grid Matrix Layout
// ==========================================
function renderGridLayout(canvas, ctx, slides, slideRatio) {
  const cols = state.layout.cols;
  const rows = state.layout.rows > 0 ? state.layout.rows : Math.ceil(slides.length / cols);
  const gap = state.layout.spacing;
  const pad = state.layout.padding;
  const rad = state.layout.radius;

  const baseTileHeight = 640;
  const tileWidth = Math.round(baseTileHeight * slideRatio);
  const tileHeight = baseTileHeight;

  canvas.width = cols * tileWidth + (cols - 1) * gap + 2 * pad;
  canvas.height = rows * tileHeight + (rows - 1) * gap + 2 * pad;

  drawBackground(canvas, ctx, slides);

  slides.forEach((slide, i) => {
    if (i >= cols * rows) return;
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = pad + c * (tileWidth + gap);
    const y = pad + r * (tileHeight + gap);

    drawTileImage(ctx, slide, x, y, tileWidth, tileHeight, rad);
  });
}

// ==========================================
// 2. Polaroid Scrapbook Layout
// ==========================================
function renderPolaroidLayout(canvas, ctx, slides, slideRatio) {
  const cols = Math.min(slides.length, Math.max(2, Math.ceil(Math.sqrt(slides.length * 1.3))));
  const rows = Math.ceil(slides.length / cols);
  const pad = state.layout.padding + 40;
  const gap = state.layout.spacing + 30;

  const photoW = 440;
  const photoH = Math.round(photoW / (slideRatio || 0.8));
  const frameBorder = 18;
  const chinH = 70;

  const frameW = photoW + frameBorder * 2;
  const frameH = photoH + frameBorder + chinH;

  canvas.width = cols * frameW + (cols - 1) * gap + 2 * pad;
  canvas.height = rows * frameH + (rows - 1) * gap + 2 * pad;

  drawBackground(canvas, ctx, slides);

  // Deterministic PRNG
  let seed = polaroidSeed;
  const prng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  slides.forEach((slide, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const cx = pad + c * (frameW + gap) + frameW / 2;
    const cy = pad + r * (frameH + gap) + frameH / 2;

    const maxAngle = (state.styling.polaroidAngle * Math.PI) / 180;
    const angle = (prng() - 0.5) * 2 * maxAngle;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    // Drop Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = state.styling.polaroidShadow;
    ctx.shadowOffsetY = state.styling.polaroidShadow / 2;

    // White Frame
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, -frameW / 2, -frameH / 2, frameW, frameH, 8);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // Photo inside frame
    const imgX = -frameW / 2 + frameBorder;
    const imgY = -frameH / 2 + frameBorder;
    drawTileImage(ctx, slide, imgX, imgY, photoW, photoH, 4);

    // Polaroid Chin Caption
    if (state.styling.showPolaroidCaptions) {
      ctx.fillStyle = '#334155';
      ctx.font = '600 20px "Caveat", cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(slide.title || `Slide #${i + 1}`, 0, frameH / 2 - chinH / 2);
    }

    ctx.restore();
  });
}

// ==========================================
// 3. Cinema 35mm Filmstrip Layout
// ==========================================
function renderFilmstripLayout(canvas, ctx, slides, slideRatio) {
  const frameH = 500;
  const frameW = Math.round(frameH * (slideRatio || 0.8));
  const borderW = 40;
  const sprocketH = 50;
  const pad = 40;

  canvas.width = slides.length * (frameW + borderW) + borderW + 2 * pad;
  canvas.height = frameH + 2 * sprocketH + 2 * pad;

  drawBackground(canvas, ctx, slides);

  const stripX = pad;
  const stripY = pad;
  const stripW = canvas.width - 2 * pad;
  const stripH = canvas.height - 2 * pad;

  // Film Base
  ctx.fillStyle = state.styling.filmStyle === 'tri-x' ? '#0a0a0c' : '#140c06';
  roundRect(ctx, stripX, stripY, stripW, stripH, 12);
  ctx.fill();

  // Sprocket Holes
  ctx.fillStyle = '#05070a';
  const sprocketCount = Math.floor(stripW / 45);
  for (let s = 0; s < sprocketCount; s++) {
    const sx = stripX + 20 + s * 45;
    // Top
    roundRect(ctx, sx, stripY + 12, 22, 26, 4);
    ctx.fill();
    // Bottom
    roundRect(ctx, sx, stripY + stripH - 38, 22, 26, 4);
    ctx.fill();
  }

  // Draw Film Frames
  slides.forEach((slide, i) => {
    const fx = stripX + borderW + i * (frameW + borderW);
    const fy = stripY + sprocketH;

    drawTileImage(ctx, slide, fx, fy, frameW, frameH, 4);

    // Film Markings
    ctx.fillStyle = '#d97706';
    ctx.font = '700 13px "Courier Prime", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`KODAK 400TX • 0${i + 1}A`, fx + 4, stripY + sprocketH - 12);
  });
}

// ==========================================
// 4. Masonry Pin Wall Layout
// ==========================================
function renderMasonryLayout(canvas, ctx, slides) {
  const cols = state.layout.cols;
  const gap = state.layout.spacing;
  const pad = state.layout.padding;
  const rad = state.layout.radius;
  const colWidth = 460;

  const colHeights = new Array(cols).fill(pad);
  const itemPositions = [];

  slides.forEach((slide) => {
    let minCol = 0;
    for (let c = 1; c < cols; c++) {
      if (colHeights[c] < colHeights[minCol]) minCol = c;
    }

    const x = pad + minCol * (colWidth + gap);
    const y = colHeights[minCol];
    const itemH = Math.round(colWidth / (slide.aspectRatio || 0.8));

    itemPositions.push({ slide, x, y, w: colWidth, h: itemH });
    colHeights[minCol] += itemH + gap;
  });

  canvas.width = cols * colWidth + (cols - 1) * gap + 2 * pad;
  canvas.height = Math.max(...colHeights) - gap + pad;

  drawBackground(canvas, ctx, slides);

  itemPositions.forEach(({ slide, x, y, w, h }) => {
    drawTileImage(ctx, slide, x, y, w, h, rad);
  });
}

// ==========================================
// 🎨 Tile Drawing Helper with Fitting & Filters
// ==========================================
function drawTileImage(ctx, slide, x, y, w, h, radius) {
  if (!slide.imgElement) return;

  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();

  // Apply Editing Filters
  ctx.filter = `brightness(${state.editing.brightness}%) contrast(${state.editing.contrast}%) saturate(${state.editing.saturation}%) ${getPresetFilterString()}`;

  const img = slide.imgElement;
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;

  if (state.layout.fitMode === 'contain') {
    ctx.fillStyle = '#090b10';
    ctx.fillRect(x, y, w, h);

    const scale = Math.min(w / imgW, h / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const dx = x + (w - dw) / 2;
    const dy = y + (h - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  } else {
    // Center Crop (Cover)
    const scale = Math.max(w / imgW, h / imgH);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (imgW - sw) / 2;
    const sy = (imgH - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  ctx.restore();
}

function getPresetFilterString() {
  switch (state.editing.filter) {
    case 'vivid': return 'saturate(140%) contrast(115%)';
    case 'vintage': return 'sepia(35%) contrast(90%) brightness(105%)';
    case 'sepia': return 'sepia(80%) hue-rotate(-20deg)';
    case 'cyber-mono': return 'grayscale(100%) contrast(150%) brightness(110%)';
    case 'dramatic': return 'contrast(160%) brightness(90%)';
    case 'pastel': return 'saturate(80%) brightness(115%) contrast(85%)';
    default: return 'none';
  }
}

function drawBackground(canvas, ctx, slides) {
  if (state.styling.bgType === 'blurred' && slides[0]?.imgElement) {
    ctx.save();
    ctx.filter = 'blur(60px) brightness(40%)';
    ctx.drawImage(slides[0].imgElement, -100, -100, canvas.width + 200, canvas.height + 200);
    ctx.restore();
  } else if (state.styling.bgType === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#833ab4');
    grad.addColorStop(0.5, '#fd1d1d');
    grad.addColorStop(1, '#fcb045');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#090b10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// ==========================================
// 🎞️ Slide Manager Thumbnails & Reordering
// ==========================================
function renderSlideManagerThumbnails() {
  const track = document.getElementById('slideThumbnailsTrack');
  const badge = document.getElementById('slideCountBadge');
  if (!track) return;

  track.innerHTML = '';
  if (badge) badge.textContent = `${state.slides.length} Slides`;

  state.slides.forEach((slide, index) => {
    const item = document.createElement('div');
    item.className = `slide-thumb-card ${slide.selected ? '' : 'excluded'}`;
    item.innerHTML = `
      <img src="${slide.thumbnailUrl || slide.originalUrl}" alt="Slide ${index + 1}">
      <div class="thumb-index">#${index + 1}</div>
      <input type="checkbox" class="thumb-check" ${slide.selected ? 'checked' : ''}>
    `;

    item.querySelector('.thumb-check')?.addEventListener('change', (e) => {
      slide.selected = e.target.checked;
      item.classList.toggle('excluded', !slide.selected);
      renderCanvas();
    });

    track.appendChild(item);
  });
}

// ==========================================
// 💾 Export Pipelines (PNG, JPEG, Clipboard, ZIP)
// ==========================================
function exportCollage(format = 'png') {
  const canvas = document.getElementById('collageCanvas');
  if (!canvas) return;

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const filename = `instacollage_${Date.now()}.${ext}`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`Exported ${filename} successfully!`, 'success');
  }, mime, 0.95);
}

async function copyCanvasToClipboard() {
  const canvas = document.getElementById('collageCanvas');
  if (!canvas) return;

  try {
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showToast('Copied high-res collage to clipboard! (Ctrl+V)', 'success');
    }, 'image/png');
  } catch (err) {
    showToast('Clipboard copy failed. Try downloading PNG directly.', 'error');
  }
}

async function exportZipArchive() {
  if (!window.JSZip) {
    showToast('JSZip library loading...', 'info');
    return;
  }

  showToast('Preparing ZIP archive of all slides...', 'info');
  const zip = new window.JSZip();
  const folder = zip.folder('slides');

  for (let i = 0; i < state.slides.length; i++) {
    const slide = state.slides[i];
    try {
      const res = await fetch(slide.originalUrl);
      const blob = await res.blob();
      folder.file(`slide_${String(i + 1).padStart(2, '0')}.jpg`, blob);
    } catch (e) {
      console.warn('ZIP slide fetch error:', e);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(content);
  a.download = `instacollage_slides_${Date.now()}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('ZIP archive downloaded!', 'success');
}

// ==========================================
// 💾 IndexedDB Offline Vault
// ==========================================
let dbInstance = null;

function initIndexedDB() {
  const req = indexedDB.open('instacollage_vault_db', 1);
  req.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains('carousels')) {
      db.createObjectStore('carousels', { keyPath: 'id', autoIncrement: true });
    }
  };
  req.onsuccess = (e) => {
    dbInstance = e.target.result;
    updateVaultBadge();
  };
}

function saveToIndexedDB(carousel) {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readwrite');
  const store = tx.objectStore('carousels');
  store.add({
    shortcode: carousel.shortcode || `CAROUSEL_${Date.now()}`,
    title: carousel.caption?.substring(0, 60) || 'Instagram Carousel',
    slideCount: carousel.slides?.length || 0,
    timestamp: new Date().toLocaleString(),
    data: carousel
  });
  tx.oncomplete = () => updateVaultBadge();
}

function updateVaultBadge() {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readonly');
  const store = tx.objectStore('carousels');
  const req = store.count();
  req.onsuccess = () => {
    const count = req.result;
    const badge = document.getElementById('vaultBadgeCount');
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    }
  };
}

function loadVaultList() {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readonly');
  const store = tx.objectStore('carousels');
  const req = store.getAll();

  req.onsuccess = () => {
    const items = req.result;
    const grid = document.getElementById('vaultGrid');
    const empty = document.getElementById('vaultEmptyState');

    if (empty) empty.classList.toggle('hidden', items.length > 0);
    if (!grid) return;

    grid.innerHTML = '';
    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'vault-item-card glass-panel';
      card.innerHTML = `
        <div class="vault-item-title">${item.title}</div>
        <div class="vault-item-meta">${item.slideCount} Slides • ${item.timestamp}</div>
        <button class="btn btn-glass btn-sm btn-block mt-2">Reopen in Studio</button>
      `;
      card.querySelector('button')?.addEventListener('click', () => {
        state.carouselData = item.data;
        state.slides = item.data.slides.map(s => ({ ...s, selected: true, rotation: 0 }));
        preloadSlideImages().then(() => {
          renderSlideManagerThumbnails();
          renderCanvas();
          document.getElementById('vaultBackdrop')?.classList.add('hidden');
          showToast('Loaded saved carousel from vault!', 'success');
        });
      });
      grid.appendChild(card);
    });
  };
}

function clearVault() {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readwrite');
  const store = tx.objectStore('carousels');
  store.clear();
  tx.oncomplete = () => {
    updateVaultBadge();
    loadVaultList();
    showToast('Local vault history cleared', 'info');
  };
}

// ==========================================
// 🍞 Toast Notifications
// ==========================================
export function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}
