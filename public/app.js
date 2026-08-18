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
// 🎛️ App Central State
// ==========================================
const state = {
  carouselData: null,
  slides: [], // Array of { id, slideIndex, originalUrl, thumbnailUrl, aspectRatio, isVideo, videoUrl, title, selected, rotation, panX, panY, zoom, imgElement }
  imageElementCache: new Map(),

  layout: {
    auto: true,
    preset: '3x2',
    artisticMode: 'grid', // 'grid' | 'polaroid' | 'filmstrip' | 'masonry'
    cols: 3,
    rows: 2
  },

  geometry: {
    aspectRatio: 'auto', // 'auto' (Preserve native slide aspect ratios) | '1:1' | '4:5' | '9:16' | '16:9' | '3:4'
    fitMode: 'contain', // 'contain' (Full uncropped slide) | 'cover' (Fill tile)
    tileGap: 12,
    cornerRadius: 16,
    outerPadding: 24,
    renderResolution: 2160 // Base square buffer size
  },

  styling: {
    bgType: 'solid', // 'solid' | 'gradient' | 'blur'
    bgColor: '#090b10',
    bgGradient: 'sunset',
    dividerColor: '#1e293b',
    shadow: 'subtle', // 'none' | 'subtle' | 'medium' | 'deep' | 'glow'
    filter: 'none' // 'none' | 'vivid' | 'vintage' | 'mono' | 'dramatic' | 'fade' | 'sepia'
  },

  branding: {
    showCreatorBadge: true,
    badgePosition: 'bottom-left', // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
    showDateBadge: true,
    watermarkText: '',
    watermarkOpacity: 0.7,
    showCaptionBanner: false
  },

  export: {
    jpegQuality: 0.92
  },

  viewport: {
    zoom: 1.0
  }
};

// ==========================================
// 🚀 Initialization & Event Wiring
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initDOMReferences();
  initEventListeners();
  initIndexedDB();
  checkUrlParamsOrShareTarget();

  // Load default demo on start if canvas is empty
  setTimeout(() => {
    if (!state.carouselData) {
      loadDemoCarousel('architecture');
    }
  }, 300);
});

// DOM Elements
let dom = {};

function initDOMReferences() {
  dom = {
    // Inputs & Forms
    extractForm: document.getElementById('extractForm'),
    instagramUrlInput: document.getElementById('instagramUrlInput'),
    btnClearInput: document.getElementById('btnClearInput'),
    btnPasteClipboard: document.getElementById('btnPasteClipboard'),
    btnExtractSubmit: document.getElementById('btnExtractSubmit'),
    extractionProgress: document.getElementById('extractionProgress'),
    progressFillBar: document.getElementById('progressFillBar'),
    progressStatusLabel: document.getElementById('progressStatusLabel'),
    demoDropdownWrapper: document.getElementById('demoDropdownWrapper'),
    btnDemoDropdown: document.getElementById('btnDemoDropdown'),

    // Canvas Stage & HUD
    canvas: document.getElementById('collageCanvas'),
    canvasViewport: document.getElementById('canvasViewport'),
    canvasViewportInner: document.getElementById('canvasViewportInner'),
    canvasEmptyState: document.getElementById('canvasEmptyState'),
    hudActiveLayoutBadge: document.getElementById('hudActiveLayoutBadge'),
    activeLayoutLabel: document.getElementById('activeLayoutLabel'),
    hudFitModeToggle: document.getElementById('hudFitModeToggle'),
    hudFitModeLabel: document.getElementById('hudFitModeLabel'),
    canvasDimensionLabel: document.getElementById('canvasDimensionLabel'),
    zoomSlider: document.getElementById('zoomSlider'),
    zoomLevelText: document.getElementById('zoomLevelText'),
    btnZoomIn: document.getElementById('btnZoomIn'),
    btnZoomOut: document.getElementById('btnZoomOut'),
    btnFitScreen: document.getElementById('btnFitScreen'),
    btnResetZoom: document.getElementById('btnResetZoom'),
    btnQuickCopy: document.getElementById('btnQuickCopy'),
    btnQuickDownload: document.getElementById('btnQuickDownload'),

    // Slide Manager Filmstrip
    filmstripTrack: document.getElementById('filmstripTrack'),
    slideSelectedCountBadge: document.getElementById('slideSelectedCountBadge'),
    btnSelectAllSlides: document.getElementById('btnSelectAllSlides'),
    btnRotateAllSlides: document.getElementById('btnRotateAllSlides'),
    btnReverseSlides: document.getElementById('btnReverseSlides'),
    btnShuffleSlides: document.getElementById('btnShuffleSlides'),
    btnClearSlides: document.getElementById('btnClearSlides'),
    postMetadataBanner: document.getElementById('postMetadataBanner'),
    metaAuthorAvatar: document.getElementById('metaAuthorAvatar'),
    metaAuthorHandle: document.getElementById('metaAuthorHandle'),
    metaVerifiedBadge: document.getElementById('metaVerifiedBadge'),
    metaPostDate: document.getElementById('metaPostDate'),
    metaLikesCount: document.getElementById('metaLikesCount'),
    metaCaptionPreview: document.getElementById('metaCaptionPreview'),
    btnDownloadAllZip: document.getElementById('btnDownloadAllZip'),

    // Inspector Tabs & Controls
    inspectorSidebar: document.getElementById('inspectorSidebar'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),

    // Layout Controls
    toggleAutoLayout: document.getElementById('toggleAutoLayout'),
    layoutPresetButtons: document.querySelectorAll('.preset-btn'),
    artisticThemeCards: document.querySelectorAll('.artistic-theme-card'),
    inputGridCols: document.getElementById('inputGridCols'),
    valGridCols: document.getElementById('valGridCols'),
    inputGridRows: document.getElementById('inputGridRows'),
    valGridRows: document.getElementById('valGridRows'),

    // Geometry Controls
    aspectRatioButtons: document.querySelectorAll('#aspectRatioGroup .segment-btn'),
    fitModeButtons: document.querySelectorAll('#fitModeGroup .segment-btn'),
    inputTileGap: document.getElementById('inputTileGap'),
    valTileGap: document.getElementById('valTileGap'),
    inputCornerRadius: document.getElementById('inputCornerRadius'),
    valCornerRadius: document.getElementById('valCornerRadius'),
    inputOuterPadding: document.getElementById('inputOuterPadding'),
    valOuterPadding: document.getElementById('valOuterPadding'),
    selectRenderResolution: document.getElementById('selectRenderResolution'),

    // Styling Controls
    bgTypeButtons: document.querySelectorAll('.bg-pill-btn'),
    solidColorPalette: document.getElementById('solidColorPalette'),
    gradientPalette: document.getElementById('gradientPalette'),
    colorSwatches: document.querySelectorAll('.color-swatch'),
    gradSwatches: document.querySelectorAll('.grad-swatch'),
    customColorPicker: document.getElementById('customColorPicker'),
    customColorHex: document.getElementById('customColorHex'),
    dividerColorPicker: document.getElementById('dividerColorPicker'),
    dividerColorHex: document.getElementById('dividerColorHex'),
    selectTileShadow: document.getElementById('selectTileShadow'),
    filterChips: document.querySelectorAll('.filter-chip'),

    // Branding Controls
    toggleCreatorBadge: document.getElementById('toggleCreatorBadge'),
    selectBadgePosition: document.getElementById('selectBadgePosition'),
    toggleDateBadge: document.getElementById('toggleDateBadge'),
    inputCustomWatermark: document.getElementById('inputCustomWatermark'),
    inputWatermarkOpacity: document.getElementById('inputWatermarkOpacity'),
    valWatermarkOpacity: document.getElementById('valWatermarkOpacity'),
    toggleCaptionBanner: document.getElementById('toggleCaptionBanner'),

    // Export Controls
    btnExportPng: document.getElementById('btnExportPng'),
    btnExportJpeg: document.getElementById('btnExportJpeg'),
    inputJpegQuality: document.getElementById('inputJpegQuality'),
    valJpegQuality: document.getElementById('valJpegQuality'),
    btnExportUltra4k: document.getElementById('btnExportUltra4k'),
    btnClipboardCopy: document.getElementById('btnClipboardCopy'),
    btnNativeWebShare: document.getElementById('btnNativeWebShare'),
    btnZipAllSlides: document.getElementById('btnZipAllSlides'),

    // Modals & Drawers
    previewModal: document.getElementById('previewModal'),
    previewModalImg: document.getElementById('previewModalImg'),
    previewModalTitle: document.getElementById('previewModalTitle'),
    btnDownloadSingleSlide: document.getElementById('btnDownloadSingleSlide'),
    btnClosePreviewModal: document.getElementById('btnClosePreviewModal'),
    localUploadModal: document.getElementById('localUploadModal'),
    btnCloseUploadModal: document.getElementById('btnCloseUploadModal'),
    uploadDropzone: document.getElementById('uploadDropzone'),
    localFileInput: document.getElementById('localFileInput'),
    btnBrowseFiles: document.getElementById('btnBrowseFiles'),
    btnLocalUpload: document.getElementById('btnLocalUpload'),
    vaultDrawerBackdrop: document.getElementById('vaultDrawerBackdrop'),
    btnOpenVault: document.getElementById('btnOpenVault'),
    btnCloseVaultDrawer: document.getElementById('btnCloseVaultDrawer'),
    vaultHistoryList: document.getElementById('vaultHistoryList'),
    btnClearVaultHistory: document.getElementById('btnClearVaultHistory'),
    btnEmptyStateDemo: document.getElementById('btnEmptyStateDemo'),
    vaultCounterBadge: document.getElementById('vaultCounterBadge'),
    btnInstallPwa: document.getElementById('btnInstallPwa'),
    toastContainer: document.getElementById('toastContainer'),

    // About Studio Modal
    btnOpenAbout: document.getElementById('btnOpenAbout'),
    btnFooterAbout: document.getElementById('btnFooterAbout'),
    aboutModalBackdrop: document.getElementById('aboutModalBackdrop'),
    btnCloseAboutModal: document.getElementById('btnCloseAboutModal')
  };
}

// ==========================================
// 🔌 Event Listeners Registration
// ==========================================
function initEventListeners() {
  // 1. URL Extraction Form
  dom.extractForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = dom.instagramUrlInput.value.trim();
    if (url) unpackInstagramCarousel(url);
  });

  dom.instagramUrlInput.addEventListener('input', () => {
    dom.btnClearInput.classList.toggle('hidden', !dom.instagramUrlInput.value);
  });

  dom.btnClearInput.addEventListener('click', () => {
    dom.instagramUrlInput.value = '';
    dom.btnClearInput.classList.add('hidden');
    dom.instagramUrlInput.focus();
  });

  dom.btnPasteClipboard.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        dom.instagramUrlInput.value = text.trim();
        dom.btnClearInput.classList.remove('hidden');
        showToast('Pasted from clipboard!', 'info');
        unpackInstagramCarousel(text.trim());
      }
    } catch (err) {
      showToast('Clipboard access denied. Please paste manually.', 'error');
    }
  });

  if (dom.btnEmptyStateDemo) {
    dom.btnEmptyStateDemo.addEventListener('click', () => {
      loadDemoCarousel('architecture');
    });
  }

  // Demo Dropdown & Pills
  dom.btnDemoDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.demoDropdownWrapper.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dom.demoDropdownWrapper.classList.remove('open');
  });

  document.querySelectorAll('[data-demo]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const demoKey = btn.getAttribute('data-demo');
      loadDemoCarousel(demoKey);
      dom.demoDropdownWrapper.classList.remove('open');
    });
  });

  // 2. Zoom & Viewport Controls
  dom.zoomSlider.addEventListener('input', (e) => {
    setCanvasZoom(Number(e.target.value) / 100);
  });

  dom.btnZoomIn.addEventListener('click', () => {
    setCanvasZoom(Math.min(2.0, state.viewport.zoom + 0.15));
  });

  dom.btnZoomOut.addEventListener('click', () => {
    setCanvasZoom(Math.max(0.25, state.viewport.zoom - 0.15));
  });

  dom.btnFitScreen.addEventListener('click', fitCanvasToViewport);
  dom.btnResetZoom.addEventListener('click', () => setCanvasZoom(1.0));

  // Quick Action Buttons
  dom.btnQuickCopy.addEventListener('click', copyCanvasToClipboard);
  dom.btnQuickDownload.addEventListener('click', () => exportImage('png'));

  // 3. Slide Manager Filmstrip Controls
  dom.btnSelectAllSlides.addEventListener('click', () => {
    const allSelected = state.slides.every(s => s.selected);
    state.slides.forEach(s => s.selected = !allSelected);
    updateFilmstrip();
    triggerCanvasRender();
  });

  dom.btnRotateAllSlides.addEventListener('click', () => {
    state.slides.forEach(s => s.rotation = ((s.rotation || 0) + 90) % 360);
    triggerCanvasRender();
    showToast('Rotated all slides 90°', 'info');
  });

  dom.btnReverseSlides.addEventListener('click', () => {
    state.slides.reverse();
    updateFilmstrip();
    triggerCanvasRender();
  });

  dom.btnShuffleSlides.addEventListener('click', () => {
    state.slides.sort(() => Math.random() - 0.5);
    updateFilmstrip();
    triggerCanvasRender();
    showToast('Shuffled slide sequence', 'info');
  });

  dom.btnClearSlides.addEventListener('click', () => {
    state.slides = [];
    state.carouselData = null;
    updateFilmstrip();
    triggerCanvasRender();
    dom.canvasEmptyState.classList.remove('hidden');
    dom.canvas.classList.add('hidden');
    dom.postMetadataBanner.classList.add('hidden');
  });

  dom.btnDownloadAllZip.addEventListener('click', downloadSlidesAsZip);

  // 4. Inspector Sidebar Tabs
  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      dom.tabButtons.forEach(b => b.classList.remove('active'));
      dom.tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`pane-${targetTab}`).classList.add('active');
    });
  });

  // 5. Layout Tab Controls
  dom.toggleAutoLayout.addEventListener('change', (e) => {
    state.layout.auto = e.target.checked;
    if (state.layout.auto) {
      applyAutoLayoutMatrix();
    }
    triggerCanvasRender();
  });

  dom.layoutPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-layout');
      state.layout.auto = false;
      state.layout.artisticMode = 'grid';
      dom.toggleAutoLayout.checked = false;
      
      dom.layoutPresetButtons.forEach(b => b.classList.remove('active'));
      dom.artisticThemeCards.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');

      const [cols, rows] = preset.split('x').map(Number);
      state.layout.cols = cols;
      state.layout.rows = rows;
      dom.inputGridCols.value = cols;
      dom.valGridCols.textContent = cols;
      dom.inputGridRows.value = rows;
      dom.valGridRows.textContent = rows;

      triggerCanvasRender();
    });
  });

  dom.artisticThemeCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.getAttribute('data-mode');
      state.layout.auto = false;
      state.layout.artisticMode = mode;
      dom.toggleAutoLayout.checked = false;

      dom.layoutPresetButtons.forEach(b => b.classList.remove('active'));
      dom.artisticThemeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      triggerCanvasRender();
    });
  });

  dom.inputGridCols.addEventListener('input', (e) => {
    state.layout.cols = Number(e.target.value);
    dom.valGridCols.textContent = state.layout.cols;
    state.layout.auto = false;
    state.layout.artisticMode = 'grid';
    dom.toggleAutoLayout.checked = false;
    triggerCanvasRender();
  });

  dom.inputGridRows.addEventListener('input', (e) => {
    state.layout.rows = Number(e.target.value);
    dom.valGridRows.textContent = state.layout.rows;
    state.layout.auto = false;
    state.layout.artisticMode = 'grid';
    dom.toggleAutoLayout.checked = false;
    triggerCanvasRender();
  });

  // 6. Geometry Tab Controls
  if (dom.hudFitModeToggle) {
    dom.hudFitModeToggle.addEventListener('click', () => {
      state.geometry.fitMode = state.geometry.fitMode === 'contain' ? 'cover' : 'contain';
      updateFitModeUI();
      triggerCanvasRender();
      showToast(`Fit Mode: ${state.geometry.fitMode === 'contain' ? 'Full (No Crop)' : 'Fill Tile (Crop)'}`, 'info');
    });
  }

  dom.aspectRatioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.aspectRatioButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.geometry.aspectRatio = btn.getAttribute('data-ratio');
      triggerCanvasRender();
    });
  });

  dom.fitModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.fitModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.geometry.fitMode = btn.getAttribute('data-fit');
      updateFitModeUI();
      triggerCanvasRender();
    });
  });

  dom.inputTileGap.addEventListener('input', (e) => {
    state.geometry.tileGap = Number(e.target.value);
    dom.valTileGap.textContent = `${state.geometry.tileGap} px`;
    triggerCanvasRender();
  });

  dom.inputCornerRadius.addEventListener('input', (e) => {
    state.geometry.cornerRadius = Number(e.target.value);
    dom.valCornerRadius.textContent = `${state.geometry.cornerRadius} px`;
    triggerCanvasRender();
  });

  dom.inputOuterPadding.addEventListener('input', (e) => {
    state.geometry.outerPadding = Number(e.target.value);
    dom.valOuterPadding.textContent = `${state.geometry.outerPadding} px`;
    triggerCanvasRender();
  });

  dom.selectRenderResolution.addEventListener('change', (e) => {
    state.geometry.renderResolution = Number(e.target.value);
    triggerCanvasRender();
  });

  // 7. Styling Tab Controls
  dom.bgTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.bgTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bgType = btn.getAttribute('data-bg-type');
      state.styling.bgType = bgType;

      dom.solidColorPalette.classList.toggle('hidden', bgType !== 'solid');
      dom.gradientPalette.classList.toggle('hidden', bgType !== 'gradient');
      triggerCanvasRender();
    });
  });

  dom.colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      dom.colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color');
      state.styling.bgColor = color;
      dom.customColorPicker.value = color;
      dom.customColorHex.textContent = color;
      triggerCanvasRender();
    });
  });

  dom.gradSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      dom.gradSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.styling.bgGradient = swatch.getAttribute('data-grad');
      triggerCanvasRender();
    });
  });

  dom.customColorPicker.addEventListener('input', (e) => {
    state.styling.bgColor = e.target.value;
    dom.customColorHex.textContent = e.target.value;
    dom.colorSwatches.forEach(s => s.classList.remove('active'));
    triggerCanvasRender();
  });

  dom.dividerColorPicker.addEventListener('input', (e) => {
    state.styling.dividerColor = e.target.value;
    dom.dividerColorHex.textContent = e.target.value;
    triggerCanvasRender();
  });

  dom.selectTileShadow.addEventListener('change', (e) => {
    state.styling.shadow = e.target.value;
    triggerCanvasRender();
  });

  dom.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.styling.filter = chip.getAttribute('data-filter');
      triggerCanvasRender();
    });
  });

  // 8. Branding Tab Controls
  dom.toggleCreatorBadge.addEventListener('change', (e) => {
    state.branding.showCreatorBadge = e.target.checked;
    triggerCanvasRender();
  });

  dom.selectBadgePosition.addEventListener('change', (e) => {
    state.branding.badgePosition = e.target.value;
    triggerCanvasRender();
  });

  dom.toggleDateBadge.addEventListener('change', (e) => {
    state.branding.showDateBadge = e.target.checked;
    triggerCanvasRender();
  });

  dom.inputCustomWatermark.addEventListener('input', (e) => {
    state.branding.watermarkText = e.target.value;
    triggerCanvasRender();
  });

  dom.inputWatermarkOpacity.addEventListener('input', (e) => {
    state.branding.watermarkOpacity = Number(e.target.value) / 100;
    dom.valWatermarkOpacity.textContent = `${e.target.value}%`;
    triggerCanvasRender();
  });

  dom.toggleCaptionBanner.addEventListener('change', (e) => {
    state.branding.showCaptionBanner = e.target.checked;
    triggerCanvasRender();
  });

  // 9. Export Tab Controls
  dom.btnExportPng.addEventListener('click', () => exportImage('png'));
  dom.btnExportJpeg.addEventListener('click', () => exportImage('jpeg'));
  dom.inputJpegQuality.addEventListener('input', (e) => {
    state.export.jpegQuality = Number(e.target.value) / 100;
    dom.valJpegQuality.textContent = `${e.target.value}%`;
  });

  dom.btnExportUltra4k.addEventListener('click', () => exportImage('png', 2));
  dom.btnClipboardCopy.addEventListener('click', copyCanvasToClipboard);
  dom.btnNativeWebShare.addEventListener('click', shareViaNativeSheet);
  dom.btnZipAllSlides.addEventListener('click', downloadSlidesAsZip);

  // 10. Modals & Drawers
  dom.btnClosePreviewModal.addEventListener('click', () => dom.previewModal.classList.add('hidden'));
  dom.previewModal.addEventListener('click', (e) => {
    if (e.target === dom.previewModal) dom.previewModal.classList.add('hidden');
  });

  dom.btnLocalUpload.addEventListener('click', () => dom.localUploadModal.classList.remove('hidden'));
  dom.btnCloseUploadModal.addEventListener('click', () => dom.localUploadModal.classList.add('hidden'));
  dom.localUploadModal.addEventListener('click', (e) => {
    if (e.target === dom.localUploadModal) dom.localUploadModal.classList.add('hidden');
  });

  dom.btnBrowseFiles.addEventListener('click', () => dom.localFileInput.click());
  dom.localFileInput.addEventListener('change', handleLocalFileSelect);

  // Drag and drop for local upload modal
  dom.uploadDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dom.uploadDropzone.classList.add('dragover');
  });
  dom.uploadDropzone.addEventListener('dragleave', () => dom.uploadDropzone.classList.remove('dragover'));
  dom.uploadDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dom.uploadDropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleLocalFiles(Array.from(e.dataTransfer.files));
    }
  });

  // Vault History Drawer
  dom.btnOpenVault.addEventListener('click', openVaultHistoryDrawer);
  dom.btnCloseVaultDrawer.addEventListener('click', () => dom.vaultDrawerBackdrop.classList.add('hidden'));
  dom.vaultDrawerBackdrop.addEventListener('click', (e) => {
    if (e.target === dom.vaultDrawerBackdrop) dom.vaultDrawerBackdrop.classList.add('hidden');
  });
  dom.btnClearVaultHistory.addEventListener('click', clearAllVaultHistory);

  // About & Credits Modal
  const openAboutModal = () => dom.aboutModalBackdrop.classList.remove('hidden');
  const closeAboutModal = () => dom.aboutModalBackdrop.classList.add('hidden');
  if (dom.btnOpenAbout) dom.btnOpenAbout.addEventListener('click', openAboutModal);
  if (dom.btnFooterAbout) dom.btnFooterAbout.addEventListener('click', openAboutModal);
  if (dom.btnCloseAboutModal) dom.btnCloseAboutModal.addEventListener('click', closeAboutModal);
  if (dom.aboutModalBackdrop) {
    dom.aboutModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.aboutModalBackdrop) closeAboutModal();
    });
  }

  // PWA Install Prompt Listener
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    dom.btnInstallPwa.classList.remove('hidden');
  });

  dom.btnInstallPwa.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('InstaCollage Studio installed successfully!', 'success');
      }
      deferredInstallPrompt = null;
      dom.btnInstallPwa.classList.add('hidden');
    }
  });
}

// ==========================================
// 🔍 Carousel Unpacker & API Client
// ==========================================
async function unpackInstagramCarousel(url) {
  setLoadingState(true, 'Connecting to Instagram API...', 25);
  dom.extractionProgress.classList.remove('hidden');

  try {
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    setLoadingState(true, 'Unpacking carousel slides...', 60);

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to extract carousel');
    }

    setLoadingState(true, 'Rendering high-resolution Canvas...', 90);

    const data = result.data;
    state.carouselData = data;
    state.imageElementCache.clear();
    state.geometry.aspectRatio = 'auto';
    state.geometry.fitMode = 'contain';
    updateFitModeUI();
    if (dom.aspectRatioButtons) {
      dom.aspectRatioButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-ratio') === 'auto'));
    }

    state.slides = (data.slides || []).map((slide, index) => ({
      id: `slide_${index}_${Date.now()}`,
      slideIndex: slide.slideIndex ?? index,
      originalUrl: slide.originalUrl,
      thumbnailUrl: slide.thumbnailUrl || slide.originalUrl,
      aspectRatio: slide.aspectRatio || 0.75,
      isVideo: Boolean(slide.isVideo),
      videoUrl: slide.videoUrl,
      title: slide.title || `Slide ${index + 1}`,
      selected: true,
      rotation: 0,
      panX: 0,
      panY: 0,
      zoom: 1.0,
      imgElement: null
    }));

    // Preload image elements via CORS proxy
    await preloadSlideImages(state.slides);

    // Save to IndexedDB
    saveCarouselToVault(data);

    // Update UI & Auto Layout
    applyAutoLayoutMatrix();
    updateFilmstrip();
    updatePostMetadataBanner(data);

    dom.canvasEmptyState.classList.add('hidden');
    dom.canvas.classList.remove('hidden');
    dom.postMetadataBanner.classList.remove('hidden');

    setLoadingState(false);
    dom.extractionProgress.classList.add('hidden');

    triggerCanvasRender();
    fitCanvasToViewport();

    showToast(`Unpacked ${state.slides.length} slides from @${data.author.username}!`, 'success');

  } catch (error) {
    console.error('Extraction error:', error);
    setLoadingState(false);
    dom.extractionProgress.classList.add('hidden');
    showToast(error.message || 'Error connecting to Instagram', 'error');
  }
}

async function loadDemoCarousel(category) {
  setLoadingState(true, `Loading demo carousel: ${category}...`, 40);
  dom.extractionProgress.classList.remove('hidden');

  try {
    const response = await fetch(`/api/sample/${category}`);
    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error('Failed to load demo');
    }

    const data = result.data;
    state.carouselData = data;
    state.slides = data.slides.map((slide, index) => ({
      id: `demo_${category}_${index}`,
      slideIndex: index,
      originalUrl: slide.originalUrl,
      thumbnailUrl: slide.thumbnailUrl,
      aspectRatio: slide.aspectRatio || 1.0,
      isVideo: false,
      title: slide.title || `Slide ${index + 1}`,
      selected: true,
      rotation: 0,
      panX: 0,
      panY: 0,
      zoom: 1.0,
      imgElement: null
    }));

    setLoadingState(true, 'Loading image buffers...', 80);
    await preloadSlideImages(state.slides);

    applyAutoLayoutMatrix();
    updateFilmstrip();
    updatePostMetadataBanner(data);

    dom.canvasEmptyState.classList.add('hidden');
    dom.canvas.classList.remove('hidden');
    dom.postMetadataBanner.classList.remove('hidden');

    setLoadingState(false);
    dom.extractionProgress.classList.add('hidden');

    triggerCanvasRender();
    fitCanvasToViewport();

    showToast(`Loaded ${data.slides.length}-slide ${category} demo carousel!`, 'success');

  } catch (err) {
    setLoadingState(false);
    dom.extractionProgress.classList.add('hidden');
    showToast('Error loading demo preset: ' + err.message, 'error');
  }
}

function checkUrlParamsOrShareTarget() {
  const params = new URLSearchParams(window.location.search);
  const sharedUrl = params.get('url') || params.get('sharedUrl') || params.get('text');
  if (sharedUrl) {
    dom.instagramUrlInput.value = sharedUrl;
    dom.btnClearInput.classList.remove('hidden');
    unpackInstagramCarousel(sharedUrl);
  }
}

function setLoadingState(isLoading, statusText = '', progressPercent = 0) {
  dom.btnExtractSubmit.querySelector('.btn-text').classList.toggle('hidden', isLoading);
  dom.btnExtractSubmit.querySelector('.btn-loader').classList.toggle('hidden', !isLoading);
  dom.btnExtractSubmit.disabled = isLoading;
  
  if (statusText) dom.progressStatusLabel.textContent = statusText;
  if (progressPercent) dom.progressFillBar.style.width = `${progressPercent}%`;
}

function updateFitModeUI() {
  if (dom.hudFitModeLabel) {
    dom.hudFitModeLabel.textContent = `Fit Mode: ${state.geometry.fitMode === 'contain' ? 'Full (No Crop)' : 'Fill (Crop)'}`;
  }
  if (dom.fitModeButtons) {
    dom.fitModeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-fit') === state.geometry.fitMode);
    });
  }
}

// ==========================================
// 🖼️ High-Res Image Preloader (SSRF / CORS Safe)
// ==========================================
async function preloadSlideImages(slides) {
  const promises = slides.map(slide => {
    return new Promise((resolve) => {
      const rawUrl = slide.originalUrl || slide.thumbnailUrl;
      if (!rawUrl) return resolve(null);

      // Clean HTML entities if present
      const url = rawUrl
        .replace(/&amp;/g, '&')
        .replace(/\\u0026/g, '&')
        .replace(/\\u00253D/gi, '=');

      // Check cache first
      if (state.imageElementCache.has(url)) {
        slide.imgElement = state.imageElementCache.get(url);
        return resolve(slide.imgElement);
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        state.imageElementCache.set(url, img);
        slide.imgElement = img;
        if (img.naturalWidth && img.naturalHeight) {
          slide.aspectRatio = img.naturalWidth / img.naturalHeight;
        }
        resolve(img);
      };

      img.onerror = () => {
        // Fallback: direct load attempt
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = 'anonymous';
        fallbackImg.onload = () => {
          state.imageElementCache.set(url, fallbackImg);
          slide.imgElement = fallbackImg;
          if (fallbackImg.naturalWidth && fallbackImg.naturalHeight) {
            slide.aspectRatio = fallbackImg.naturalWidth / fallbackImg.naturalHeight;
          }
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => {
          console.warn('Image failed to load:', url);
          resolve(null);
        };
        fallbackImg.src = url;
      };

      // Load through secure CORS proxy for remote CDN assets
      const loadUrl = url.startsWith('blob:') || url.startsWith('data:')
        ? url
        : `/api/proxy?url=${encodeURIComponent(url)}`;

      img.src = loadUrl;
    });
  });

  await Promise.all(promises);
}

// ==========================================
// 📐 Intelligent Auto-Layout Matrix Computation
// ==========================================
function applyAutoLayoutMatrix() {
  const activeCount = state.slides.filter(s => s.selected).length;
  if (activeCount === 0) return;

  state.layout.artisticMode = 'grid';

  // Intelligent matrix topology based on N slides
  let cols = 2;
  let rows = 2;

  switch (activeCount) {
    case 1:
      cols = 1; rows = 1;
      break;
    case 2:
      cols = 2; rows = 1; // Side-by-side
      break;
    case 3:
      cols = 3; rows = 1; // Horizontal banner
      break;
    case 4:
      cols = 2; rows = 2; // Classic square
      break;
    case 5:
    case 6:
      cols = 3; rows = 2; // Editorial widescreen
      break;
    case 7:
    case 8:
    case 9:
      cols = 3; rows = 3; // Matrix grid
      break;
    case 10:
      cols = 5; rows = 2; // Panoramic storyboard
      break;
    default:
      cols = Math.ceil(Math.sqrt(activeCount));
      rows = Math.ceil(activeCount / cols);
      break;
  }

  state.layout.cols = cols;
  state.layout.rows = rows;

  dom.inputGridCols.value = cols;
  dom.valGridCols.textContent = cols;
  dom.inputGridRows.value = rows;
  dom.valGridRows.textContent = rows;

  dom.activeLayoutLabel.textContent = `Auto-Layout (${cols}×${rows} Grid • ${activeCount} Slides)`;
}

// ==========================================
// 🎨 HTML5 Canvas Mathematics & Rendering Engine
// ==========================================
function triggerCanvasRender(exportScaleMultiplier = 1) {
  const canvas = dom.canvas;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const activeSlides = state.slides.filter(s => s.selected && s.imgElement);
  
  if (activeSlides.length === 0) {
    dom.canvasEmptyState.classList.remove('hidden');
    dom.canvas.classList.add('hidden');
    return;
  } else {
    dom.canvasEmptyState.classList.add('hidden');
    dom.canvas.classList.remove('hidden');
  }

  // 1. Calculate Target Aspect Ratio & High-DPI Resolution
  let slideRatio = 1.0;
  if (activeSlides.length > 0) {
    const validRatios = activeSlides.map(s => {
      if (s.imgElement && s.imgElement.naturalWidth && s.imgElement.naturalHeight) {
        return s.imgElement.naturalWidth / s.imgElement.naturalHeight;
      }
      return s.aspectRatio || 1.0;
    });
    slideRatio = validRatios.reduce((a, b) => a + b, 0) / validRatios.length;
  }

  const cols = state.layout.cols || 1;
  const rows = state.layout.rows || 1;
  const baseResolution = state.geometry.renderResolution * exportScaleMultiplier;

  let canvasWidth, canvasHeight;

  if (state.geometry.aspectRatio === 'auto') {
    // In Auto mode: Canvas proportions automatically adapt to the grid topology & native slide aspect ratio
    // so EVERY tile has the EXACT aspect ratio of the original photo with ZERO cropping!
    const gap = state.geometry.tileGap;
    const outerPad = state.geometry.outerPadding;
    const targetTileBase = 600 * exportScaleMultiplier;
    
    const tileW = targetTileBase * slideRatio;
    const tileH = targetTileBase;

    const rawW = (outerPad * 2) + ((cols - 1) * gap) + (cols * tileW);
    const rawH = (outerPad * 2) + ((rows - 1) * gap) + (rows * tileH);

    const scale = baseResolution / Math.max(rawW, rawH);
    canvasWidth = Math.round(rawW * scale);
    canvasHeight = Math.round(rawH * scale);

  } else {
    let ratioW = 1;
    let ratioH = 1;
    switch (state.geometry.aspectRatio) {
      case '4:5': ratioW = 4; ratioH = 5; break;
      case '9:16': ratioW = 9; ratioH = 16; break;
      case '16:9': ratioW = 16; ratioH = 9; break;
      case '3:4': ratioW = 3; ratioH = 4; break;
      case '1:1': default: ratioW = 1; ratioH = 1; break;
    }

    if (ratioW >= ratioH) {
      canvasWidth = baseResolution;
      canvasHeight = Math.round(baseResolution * (ratioH / ratioW));
    } else {
      canvasHeight = baseResolution;
      canvasWidth = Math.round(baseResolution * (ratioW / ratioH));
    }
  }

  canvasWidth = Math.max(720, canvasWidth);
  canvasHeight = Math.max(720, canvasHeight);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  dom.canvasDimensionLabel.textContent = `${canvasWidth} × ${canvasHeight} px (${exportScaleMultiplier > 1 ? exportScaleMultiplier + 'x Upscaled' : 'High-DPI'})`;

  // Scale factor for styling units relative to 2160 base
  const S = Math.max(canvasWidth, canvasHeight) / 2160;

  // 2. Render Background Pass
  renderBackgroundPass(ctx, canvasWidth, canvasHeight, activeSlides[0]);

  // 3. Render Collage Matrix / Artistic Mode Pass
  if (state.layout.artisticMode === 'polaroid') {
    renderPolaroidScrapbook(ctx, canvasWidth, canvasHeight, activeSlides, S);
  } else if (state.layout.artisticMode === 'filmstrip') {
    renderCinemaFilmstrip(ctx, canvasWidth, canvasHeight, activeSlides, S);
  } else if (state.layout.artisticMode === 'masonry') {
    renderMasonryLayout(ctx, canvasWidth, canvasHeight, activeSlides, S);
  } else {
    renderStandardGridMatrix(ctx, canvasWidth, canvasHeight, activeSlides, S);
  }

  // 4. Render Metadata & Branding Watermarks
  renderBrandingOverlays(ctx, canvasWidth, canvasHeight, S);
}

// Background Renderer (Solid / Gradient / Dynamic Blur)
function renderBackgroundPass(ctx, w, h, firstSlide) {
  const { bgType, bgColor, bgGradient } = state.styling;

  if (bgType === 'solid') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
  } else if (bgType === 'gradient') {
    let grad = ctx.createLinearGradient(0, 0, w, h);
    if (bgGradient === 'sunset') {
      grad.addColorStop(0, '#833ab4');
      grad.addColorStop(0.5, '#fd1d1d');
      grad.addColorStop(1, '#fcb045');
    } else if (bgGradient === 'cyber') {
      grad.addColorStop(0, '#00f2fe');
      grad.addColorStop(0.5, '#4facfe');
      grad.addColorStop(1, '#050505');
    } else if (bgGradient === 'aurora') {
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(0.5, '#06b6d4');
      grad.addColorStop(1, '#3b82f6');
    } else if (bgGradient === 'royal') {
      grad.addColorStop(0, '#7928ca');
      grad.addColorStop(1, '#ff0080');
    } else { // darkmesh
      grad.addColorStop(0, '#18181b');
      grad.addColorStop(0.5, '#27272a');
      grad.addColorStop(1, '#09090b');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (bgType === 'blur' && firstSlide && firstSlide.imgElement) {
    // Dynamic real-time blur backdrop of slide 1
    ctx.save();
    ctx.filter = 'blur(60px) brightness(0.55) saturate(1.2)';
    ctx.drawImage(firstSlide.imgElement, -50, -50, w + 100, h + 100);
    ctx.restore();
  } else {
    ctx.fillStyle = '#090b10';
    ctx.fillRect(0, 0, w, h);
  }
}

// Standard Grid Matrix Mathematics
function renderStandardGridMatrix(ctx, w, h, slides, S) {
  const cols = state.layout.cols || 1;
  const rows = state.layout.rows || 1;
  const gap = state.geometry.tileGap * S;
  const outerPad = state.geometry.outerPadding * S;
  const radius = state.geometry.cornerRadius * S;

  const usableWidth = w - (outerPad * 2) - ((cols - 1) * gap);
  const usableHeight = h - (outerPad * 2) - ((rows - 1) * gap);

  const tileW = usableWidth / cols;
  const tileH = usableHeight / rows;

  const totalSlots = cols * rows;

  for (let i = 0; i < Math.min(slides.length, totalSlots); i++) {
    const slide = slides[i];
    const c = i % cols;
    const r = Math.floor(i / cols);

    const x = outerPad + c * (tileW + gap);
    const y = outerPad + r * (tileH + gap);

    renderSingleTile(ctx, slide, x, y, tileW, tileH, radius, S);
  }
}

// Polaroid Scrapbook Mode
function renderPolaroidScrapbook(ctx, w, h, slides, S) {
  const N = slides.length;
  const outerPad = state.geometry.outerPadding * S;
  
  // Arrange polaroid cards in balanced grid
  const cols = N <= 2 ? N : (N <= 4 ? 2 : 3);
  const rows = Math.ceil(N / cols);

  const cardW = (w - outerPad * 2) / cols - (20 * S);
  const cardH = cardW * 1.22; // Classic Polaroid proportions

  for (let i = 0; i < N; i++) {
    const slide = slides[i];
    const c = i % cols;
    const r = Math.floor(i / cols);

    const cx = outerPad + c * (cardW + 20 * S) + cardW / 2;
    const cy = outerPad + r * (cardH + 20 * S) + cardH / 2;

    // Organic natural tilt angle
    const tilt = ((i % 3) - 1) * (2.8 * Math.PI / 180);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);

    // Draw Polaroid White Paper Card with Shadow
    const halfW = cardW / 2;
    const halfH = cardH / 2;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 24 * S;
    ctx.shadowOffsetY = 12 * S;

    ctx.fillStyle = '#ffffff';
    roundRect(ctx, -halfW, -halfH, cardW, cardH, 8 * S);
    ctx.fill();

    // Reset shadow for photo area
    ctx.shadowColor = 'transparent';

    // Photo aperture bounds (white border on sides, thicker bottom)
    const photoPad = 12 * S;
    const bottomPad = 48 * S;
    const photoW = cardW - photoPad * 2;
    const photoH = cardH - photoPad - bottomPad;
    const photoX = -halfW + photoPad;
    const photoY = -halfH + photoPad;

    // Clip and draw image
    ctx.save();
    roundRect(ctx, photoX, photoY, photoW, photoH, 4 * S);
    ctx.clip();

    applyColorFilter(ctx);
    drawImageFit(ctx, slide.imgElement, photoX, photoY, photoW, photoH, state.geometry.fitMode, slide.rotation, slide.zoom);
    ctx.restore();

    // Handwritten Slide Stamp at Polaroid Bottom
    ctx.fillStyle = '#475569';
    ctx.font = `600 ${14 * S}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(slide.title || `Slide #${i + 1}`, 0, halfH - 18 * S);

    ctx.restore();
  }
}

// Cinema 35mm Filmstrip Mode
function renderCinemaFilmstrip(ctx, w, h, slides, S) {
  const N = slides.length;
  const filmH = h * 0.75;
  const filmY = (h - filmH) / 2;
  const frameW = filmH * 0.85;
  const gap = 16 * S;

  // Draw Dark Film Reel Ribbon
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, filmY, w, filmH);

  // Sprocket hole dimensions
  const sprocW = 16 * S;
  const sprocH = 22 * S;
  const sprocRadius = 4 * S;
  const sprocTopY = filmY + 12 * S;
  const sprocBottomY = filmY + filmH - sprocH - 12 * S;

  ctx.fillStyle = '#ffffff';

  // Draw Continuous Sprockets
  for (let sx = 10 * S; sx < w; sx += 32 * S) {
    roundRect(ctx, sx, sprocTopY, sprocW, sprocH, sprocRadius);
    ctx.fill();
    roundRect(ctx, sx, sprocBottomY, sprocW, sprocH, sprocRadius);
    ctx.fill();
  }

  // Draw Slide Frames in Filmstrip Center
  const photoY = filmY + 48 * S;
  const photoH = filmH - 96 * S;

  for (let i = 0; i < N; i++) {
    const slide = slides[i];
    const photoX = 30 * S + i * (frameW + gap);
    if (photoX > w) break;

    ctx.save();
    roundRect(ctx, photoX, photoY, frameW, photoH, 4 * S);
    ctx.clip();

    applyColorFilter(ctx);
    drawImageFit(ctx, slide.imgElement, photoX, photoY, frameW, photoH, state.geometry.fitMode, slide.rotation, slide.zoom);
    ctx.restore();

    // Cinema Frame Stamp (e.g. KODAK 400 • 01A)
    ctx.fillStyle = '#f59e0b';
    ctx.font = `700 ${11 * S}px monospace`;
    ctx.fillText(`KODAK 400 • 0${i + 1}A`, photoX + 8 * S, filmY + filmH - 18 * S);
  }
}

// Masonry Layout Mode
function renderMasonryLayout(ctx, w, h, slides, S) {
  const cols = 3;
  const gap = state.geometry.tileGap * S;
  const outerPad = state.geometry.outerPadding * S;
  const radius = state.geometry.cornerRadius * S;

  const colWidth = (w - (outerPad * 2) - ((cols - 1) * gap)) / cols;
  const colHeights = new Array(cols).fill(outerPad);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    // Find column with minimum current height
    let minCol = 0;
    for (let c = 1; c < cols; c++) {
      if (colHeights[c] < colHeights[minCol]) minCol = c;
    }

    const tileX = outerPad + minCol * (colWidth + gap);
    const tileY = colHeights[minCol];
    
    // Compute tile height preserving aspect ratio
    const imgRatio = slide.aspectRatio || 1.0;
    const tileHeight = colWidth / imgRatio;

    renderSingleTile(ctx, slide, tileX, tileY, colWidth, tileHeight, radius, S);

    colHeights[minCol] += tileHeight + gap;
  }
}

// Single Tile Renderer with Border, Radius, Shadow & Image Fit
function renderSingleTile(ctx, slide, x, y, w, h, radius, S) {
  ctx.save();

  // Apply Drop Shadow
  if (state.styling.shadow !== 'none') {
    if (state.styling.shadow === 'subtle') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 10 * S;
      ctx.shadowOffsetY = 4 * S;
    } else if (state.styling.shadow === 'medium') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 24 * S;
      ctx.shadowOffsetY = 10 * S;
    } else if (state.styling.shadow === 'deep') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 40 * S;
      ctx.shadowOffsetY = 18 * S;
    } else if (state.styling.shadow === 'glow') {
      ctx.shadowColor = 'rgba(225, 48, 108, 0.6)';
      ctx.shadowBlur = 30 * S;
    }
  }

  // Draw Tile Background / Border Outline
  ctx.fillStyle = state.styling.dividerColor || '#1e293b';
  roundRect(ctx, x, y, w, h, radius);
  ctx.fill();

  // Reset shadow for image clip
  ctx.shadowColor = 'transparent';

  // Clip Path for Tile
  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();

  // Apply Photo Color Filter
  applyColorFilter(ctx);

  // Draw Image with Center-Crop or Contain
  drawImageFit(ctx, slide.imgElement, x, y, w, h, state.geometry.fitMode, slide.rotation, slide.zoom);

  ctx.restore(); // Undo clip & filter

  // Draw Crisp Tile Border
  if (state.geometry.tileGap > 0) {
    ctx.strokeStyle = state.styling.dividerColor || '#1e293b';
    ctx.lineWidth = Math.max(1, 1.5 * S);
    roundRect(ctx, x, y, w, h, radius);
    ctx.stroke();
  }

  ctx.restore();
}

// High-Precision Center Crop / Contain Image Math
function drawImageFit(ctx, img, dx, dy, dw, dh, fitMode, rotation = 0, zoom = 1.0) {
  if (!img) return;

  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  ctx.save();

  // Center coordinate of the tile
  const centerX = dx + dw / 2;
  const centerY = dy + dh / 2;

  ctx.translate(centerX, centerY);

  if (rotation !== 0) {
    ctx.rotate((rotation * Math.PI) / 180);
  }

  if (zoom !== 1.0) {
    ctx.scale(zoom, zoom);
  }

  let sw, sh, sx, sy;

  if (fitMode === 'contain') {
    // Fit full image inside bounds with letterboxing
    const imgRatio = iw / ih;
    const destRatio = dw / dh;

    let targetW, targetH;
    if (imgRatio > destRatio) {
      targetW = dw;
      targetH = dw / imgRatio;
    } else {
      targetH = dh;
      targetW = dh * imgRatio;
    }

    ctx.drawImage(img, 0, 0, iw, ih, -targetW / 2, -targetH / 2, targetW, targetH);

  } else {
    // Center Crop (Cover)
    const imgRatio = iw / ih;
    const destRatio = dw / dh;

    if (imgRatio > destRatio) {
      sh = ih;
      sw = ih * destRatio;
      sy = 0;
      sx = (iw - sw) / 2;
    } else {
      sw = iw;
      sh = iw / destRatio;
      sx = 0;
      sy = (ih - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
  }

  ctx.restore();
}

// Real-Time Canvas Color Filter Pass
function applyColorFilter(ctx) {
  const filter = state.styling.filter;
  if (filter === 'vivid') {
    ctx.filter = 'saturate(1.4) contrast(1.1)';
  } else if (filter === 'vintage') {
    ctx.filter = 'sepia(0.25) saturate(1.2) contrast(0.95)';
  } else if (filter === 'mono') {
    ctx.filter = 'grayscale(1.0) contrast(1.2)';
  } else if (filter === 'dramatic') {
    ctx.filter = 'contrast(1.35) brightness(0.95) saturate(1.1)';
  } else if (filter === 'fade') {
    ctx.filter = 'contrast(0.9) brightness(1.08) saturate(0.85)';
  } else if (filter === 'sepia') {
    ctx.filter = 'sepia(0.8) contrast(1.1)';
  } else {
    ctx.filter = 'none';
  }
}

// Watermark & Metadata Branding Overlays
function renderBrandingOverlays(ctx, w, h, S) {
  const { showCreatorBadge, badgePosition, showDateBadge, watermarkText, watermarkOpacity, showCaptionBanner } = state.branding;
  const author = state.carouselData?.author || { username: 'instacollage' };

  // 1. Creator Handle Badge
  if (showCreatorBadge && author.username) {
    const badgePad = 28 * S;
    const badgeH = 46 * S;
    const fontSize = 16 * S;
    const iconSize = 22 * S;

    ctx.font = `700 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    const textMetrics = ctx.measureText(`@${author.username}`);
    const badgeW = textMetrics.width + iconSize + (42 * S);

    let bx = badgePad;
    let by = h - badgeH - badgePad;

    if (badgePosition === 'bottom-right') {
      bx = w - badgeW - badgePad;
      by = h - badgeH - badgePad;
    } else if (badgePosition === 'top-left') {
      bx = badgePad;
      by = badgePad;
    } else if (badgePosition === 'top-right') {
      bx = w - badgeW - badgePad;
      by = badgePad;
    }

    // Glass pill background
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 16 * S;
    ctx.shadowOffsetY = 6 * S;

    ctx.fillStyle = 'rgba(10, 14, 26, 0.85)';
    roundRect(ctx, bx, by, badgeW, badgeH, badgeH / 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1 * S;
    roundRect(ctx, bx, by, badgeW, badgeH, badgeH / 2);
    ctx.stroke();

    ctx.shadowColor = 'transparent';

    // Draw Instagram Icon circle
    const iconX = bx + 8 * S;
    const iconY = by + (badgeH - iconSize) / 2;
    
    // Gradient fill for Instagram icon badge
    const igGrad = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    igGrad.addColorStop(0, '#833ab4');
    igGrad.addColorStop(0.5, '#fd1d1d');
    igGrad.addColorStop(1, '#fcb045');
    ctx.fillStyle = igGrad;
    roundRect(ctx, iconX, iconY, iconSize, iconSize, 6 * S);
    ctx.fill();

    // Text @username
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`@${author.username}`, iconX + iconSize + (8 * S), by + badgeH / 2);

    ctx.restore();
  }

  // 2. Date & Slide Counter Chip
  if (showDateBadge && state.carouselData) {
    const dateStr = `${state.slides.length} Slides • ${state.carouselData.postedAt || '2024'}`;
    const fontSize = 13 * S;
    ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    const metrics = ctx.measureText(dateStr);
    const chipW = metrics.width + (24 * S);
    const chipH = 32 * S;

    const cx = w - chipW - (28 * S);
    const cy = 28 * S;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    roundRect(ctx, cx, cy, chipW, chipH, 16 * S);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1 * S;
    roundRect(ctx, cx, cy, chipW, chipH, 16 * S);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateStr, cx + chipW / 2, cy + chipH / 2);
    ctx.restore();
  }

  // 3. Custom Watermark Text
  if (watermarkText && watermarkText.trim() !== '') {
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${watermarkOpacity})`;
    ctx.font = `700 ${14 * S}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(watermarkText.trim(), w - 28 * S, h - 28 * S);
    ctx.restore();
  }

  // 4. Post Caption Banner (Bottom Typography)
  if (showCaptionBanner && state.carouselData?.caption) {
    const bannerH = 70 * S;
    const by = h - bannerH;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 12, 0.92)';
    ctx.fillRect(0, by, w, bannerH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1 * S;
    ctx.beginPath();
    ctx.moveTo(0, by);
    ctx.lineTo(w, by);
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = `500 ${13 * S}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Truncate caption if long
    let cleanCaption = state.carouselData.caption.replace(/(\r\n|\n|\r)/gm, ' ');
    if (cleanCaption.length > 120) cleanCaption = cleanCaption.substring(0, 117) + '...';
    ctx.fillText(cleanCaption, 24 * S, by + bannerH / 2);

    ctx.restore();
  }
}

// Polyfill / Helper for canvas roundRect
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
// 🎞️ Filmstrip Slide Manager & Drag-Drop
// ==========================================
function updateFilmstrip() {
  const track = dom.filmstripTrack;
  track.innerHTML = '';

  const total = state.slides.length;
  const activeCount = state.slides.filter(s => s.selected).length;
  dom.slideSelectedCountBadge.textContent = `${activeCount} of ${total} Active`;

  state.slides.forEach((slide, index) => {
    const card = document.createElement('div');
    card.className = `slide-card ${slide.selected ? '' : 'excluded'}`;
    card.draggable = true;
    card.dataset.index = index;

    card.innerHTML = `
      <img class="slide-thumb-img" src="${slide.thumbnailUrl || slide.originalUrl}" alt="Slide ${index + 1}" onerror="this.src='/icons/icon-192.png'">
      <div class="slide-index-badge">#${index + 1}</div>
      <input type="checkbox" class="slide-checkbox-toggle" ${slide.selected ? 'checked' : ''} title="Include in collage">
      <div class="slide-hover-actions">
        <button class="btn-slide-tool btn-preview-slide" title="100% Full Preview"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button class="btn-slide-tool btn-rotate-slide" title="Rotate 90°"><i class="fa-solid fa-rotate-right"></i></button>
      </div>
    `;

    // Drag and Drop Events
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', index);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromIndex = Number(e.dataTransfer.getData('text/plain'));
      const toIndex = index;
      if (fromIndex !== toIndex) {
        const movedItem = state.slides.splice(fromIndex, 1)[0];
        state.slides.splice(toIndex, 0, movedItem);
        updateFilmstrip();
        triggerCanvasRender();
      }
    });

    // Checkbox Toggle
    const chk = card.querySelector('.slide-checkbox-toggle');
    chk.addEventListener('change', (e) => {
      e.stopPropagation();
      slide.selected = chk.checked;
      card.classList.toggle('excluded', !slide.selected);
      if (state.layout.auto) applyAutoLayoutMatrix();
      dom.slideSelectedCountBadge.textContent = `${state.slides.filter(s => s.selected).length} of ${total} Active`;
      triggerCanvasRender();
    });

    // 100% Preview Modal
    const btnPreview = card.querySelector('.btn-preview-slide');
    btnPreview.addEventListener('click', (e) => {
      e.stopPropagation();
      openSlidePreviewModal(slide, index);
    });

    // Rotate button
    const btnRotate = card.querySelector('.btn-rotate-slide');
    btnRotate.addEventListener('click', (e) => {
      e.stopPropagation();
      slide.rotation = ((slide.rotation || 0) + 90) % 360;
      triggerCanvasRender();
    });

    track.appendChild(card);
  });
}

function openSlidePreviewModal(slide, index) {
  dom.previewModalImg.src = slide.originalUrl || slide.thumbnailUrl;
  dom.previewModalTitle.textContent = `Slide #${index + 1} (${slide.isVideo ? 'Video Slide' : 'High-Res Photo'})`;
  dom.btnDownloadSingleSlide.href = slide.originalUrl;
  dom.btnDownloadSingleSlide.download = `slide-${index + 1}.jpg`;
  dom.previewModal.classList.remove('hidden');
}

function updatePostMetadataBanner(data) {
  if (!data) return;
  const author = data.author || {};
  dom.metaAuthorAvatar.src = author.profilePic || '/icons/icon-192.png';
  dom.metaAuthorHandle.textContent = `@${author.username || 'creator'}`;
  dom.metaVerifiedBadge.classList.toggle('hidden', !author.isVerified);
  dom.metaPostDate.textContent = data.postedAt || 'Recently';
  dom.metaLikesCount.innerHTML = `<i class="fa-solid fa-heart"></i> ${data.likesCount || '10K+'}`;
  dom.metaCaptionPreview.textContent = data.caption || 'No caption text.';
}

// ==========================================
// 📥 Local Photo Upload Handler
// ==========================================
function handleLocalFileSelect(e) {
  if (e.target.files && e.target.files.length > 0) {
    handleLocalFiles(Array.from(e.target.files));
  }
}

function handleLocalFiles(files) {
  const imageFiles = files.filter(f => f.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    showToast('Please select valid image files', 'error');
    return;
  }

  const newSlides = imageFiles.map((file, idx) => {
    const objectUrl = URL.createObjectURL(file);
    return {
      id: `local_${Date.now()}_${idx}`,
      slideIndex: idx,
      originalUrl: objectUrl,
      thumbnailUrl: objectUrl,
      aspectRatio: 1.0,
      isVideo: false,
      title: file.name,
      selected: true,
      rotation: 0,
      panX: 0,
      panY: 0,
      zoom: 1.0,
      imgElement: null
    };
  });

  state.carouselData = {
    shortcode: 'LOCAL_UPLOAD',
    author: {
      username: 'my_collection',
      fullName: 'Local Photo Collection',
      profilePic: '',
      isVerified: false
    },
    caption: 'Custom local photo collage assembled with InstaCollage Studio.',
    likesCount: `${newSlides.length} Photos`,
    postedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    slides: newSlides
  };

  state.slides = newSlides;

  preloadSlideImages(newSlides).then(() => {
    applyAutoLayoutMatrix();
    updateFilmstrip();
    updatePostMetadataBanner(state.carouselData);
    dom.localUploadModal.classList.add('hidden');
    dom.canvasEmptyState.classList.add('hidden');
    dom.canvas.classList.remove('hidden');
    dom.postMetadataBanner.classList.remove('hidden');
    triggerCanvasRender();
    fitCanvasToViewport();
    showToast(`Loaded ${newSlides.length} local images!`, 'success');
  });
}

// ==========================================
// 🚀 Export & Sharing Hub Operations
// ==========================================
function exportImage(format = 'png', upscaleMultiplier = 1) {
  // If upscaled, perform high-resolution render pass
  if (upscaleMultiplier > 1) {
    triggerCanvasRender(upscaleMultiplier);
  }

  const canvas = dom.canvas;
  const username = state.carouselData?.author?.username || 'instagram';
  const shortcode = state.carouselData?.shortcode || 'collage';
  const filename = `${username}_${shortcode}_collage_${Date.now()}.${format}`;

  if (format === 'jpeg') {
    const dataUrl = canvas.toDataURL('image/jpeg', state.export.jpegQuality || 0.92);
    downloadDataUrl(dataUrl, filename);
  } else {
    const dataUrl = canvas.toDataURL('image/png');
    downloadDataUrl(dataUrl, filename);
  }

  // Restore standard render buffer if upscaled
  if (upscaleMultiplier > 1) {
    triggerCanvasRender(1);
  }

  showToast(`Downloaded high-res ${format.toUpperCase()} collage!`, 'success');
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function copyCanvasToClipboard() {
  try {
    const canvas = dom.canvas;
    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error('Canvas conversion failed');
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      showToast('Collage copied to clipboard! Ready to paste.', 'success');
    }, 'image/png');
  } catch (err) {
    console.error('Clipboard copy error:', err);
    showToast('Failed to copy to clipboard. Try standard download.', 'error');
  }
}

async function shareViaNativeSheet() {
  if (!navigator.share) {
    showToast('Web Share API not supported on this browser. Try copying image.', 'info');
    return;
  }

  try {
    dom.canvas.toBlob(async (blob) => {
      const file = new File([blob], 'instacollage.png', { type: 'image/png' });
      await navigator.share({
        title: 'InstaCollage Studio',
        text: `Check out this carousel collage from @${state.carouselData?.author?.username || 'instagram'}!`,
        files: [file]
      });
      showToast('Shared successfully!', 'success');
    }, 'image/png');
  } catch (err) {
    if (err.name !== 'AbortError') {
      showToast('Share canceled or failed: ' + err.message, 'info');
    }
  }
}

async function downloadSlidesAsZip() {
  if (!state.slides || state.slides.length === 0) {
    showToast('No slides to download', 'error');
    return;
  }

  showToast('Packaging slides into ZIP archive...', 'info');

  try {
    // If JSZip available on client
    if (window.JSZip) {
      const zip = new JSZip();
      const folder = zip.folder('slides');

      for (let i = 0; i < state.slides.length; i++) {
        const slide = state.slides[i];
        const url = slide.originalUrl || slide.thumbnailUrl;
        if (!url) continue;

        try {
          const fetchUrl = url.startsWith('blob:') ? url : `/api/proxy?url=${encodeURIComponent(url)}`;
          const res = await fetch(fetchUrl);
          const blob = await res.blob();
          const ext = slide.isVideo ? 'mp4' : 'jpg';
          folder.file(`slide-${String(i + 1).padStart(2, '0')}.${ext}`, blob);
        } catch (e) {
          console.warn(`Failed to package slide ${i + 1}:`, e);
        }
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipContent);
      downloadDataUrl(downloadUrl, `carousel_${state.carouselData?.shortcode || 'slides'}.zip`);
      showToast('Downloaded ZIP archive with all raw slides!', 'success');
      return;
    }

    // Server ZIP fallback
    const res = await fetch('/api/download-zip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slides: state.slides,
        filename: `carousel_${state.carouselData?.shortcode || 'slides'}.zip`
      })
    });

    if (res.ok) {
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      downloadDataUrl(downloadUrl, `carousel_${state.carouselData?.shortcode || 'slides'}.zip`);
      showToast('Downloaded ZIP archive with all raw slides!', 'success');
    } else {
      throw new Error('Server zip failed');
    }

  } catch (err) {
    console.error('ZIP error:', err);
    showToast('Failed to generate ZIP: ' + err.message, 'error');
  }
}

// ==========================================
// 🔍 Viewport Zoom & Fit Controls
// ==========================================
function setCanvasZoom(zoomLevel) {
  state.viewport.zoom = zoomLevel;
  dom.zoomSlider.value = Math.round(zoomLevel * 100);
  dom.zoomLevelText.textContent = `${Math.round(zoomLevel * 100)}%`;
  dom.canvasViewportInner.style.transform = `scale(${zoomLevel})`;
}

function fitCanvasToViewport() {
  const containerW = dom.canvasViewport.clientWidth - 60;
  const containerH = dom.canvasViewport.clientHeight - 60;
  const canvasW = dom.canvas.width;
  const canvasH = dom.canvas.height;

  const scaleW = containerW / canvasW;
  const scaleH = containerH / canvasH;
  const bestFit = Math.min(1.0, scaleW, scaleH);

  setCanvasZoom(Math.max(0.25, Number(bestFit.toFixed(2))));
}

// ==========================================
// 🗄️ IndexedDB Local Vault History
// ==========================================
let dbInstance = null;

function initIndexedDB() {
  const req = indexedDB.open('InstaCollageVault', 1);

  req.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (!db.objectStoreNames.contains('carousels')) {
      const store = db.createObjectStore('carousels', { keyPath: 'id', autoIncrement: true });
      store.createIndex('shortcode', 'shortcode', { unique: false });
      store.createIndex('savedAt', 'savedAt', { unique: false });
    }
  };

  req.onsuccess = (e) => {
    dbInstance = e.target.result;
    updateVaultCountBadge();
  };

  req.onerror = () => console.warn('IndexedDB unavailable');
}

function saveCarouselToVault(data) {
  if (!dbInstance || !data) return;
  try {
    const tx = dbInstance.transaction('carousels', 'readwrite');
    const store = tx.objectStore('carousels');
    const entry = {
      shortcode: data.shortcode,
      author: data.author,
      caption: data.caption,
      likesCount: data.likesCount,
      postedAt: data.postedAt,
      slides: data.slides,
      savedAt: Date.now()
    };
    store.add(entry);
    tx.oncomplete = () => updateVaultCountBadge();
  } catch (e) {}
}

function updateVaultCountBadge() {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readonly');
  const store = tx.objectStore('carousels');
  const countReq = store.count();
  countReq.onsuccess = () => {
    dom.vaultCounterBadge.textContent = countReq.result || 0;
  };
}

function openVaultHistoryDrawer() {
  if (!dbInstance) {
    showToast('Vault storage unavailable', 'info');
    return;
  }

  dom.vaultHistoryList.innerHTML = '';
  const tx = dbInstance.transaction('carousels', 'readonly');
  const store = tx.objectStore('carousels');
  const req = store.getAll();

  req.onsuccess = () => {
    const items = (req.result || []).reverse();
    if (items.length === 0) {
      dom.vaultHistoryList.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 8px;"></i>
          <p>No saved carousels in vault yet.</p>
        </div>
      `;
    } else {
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'vault-history-item';
        const thumb = item.slides?.[0]?.thumbnailUrl || item.slides?.[0]?.originalUrl || '/icons/icon-192.png';
        row.innerHTML = `
          <img class="vault-item-thumb" src="${thumb}" alt="Thumb" onerror="this.src='/icons/icon-192.png'">
          <div class="vault-item-info">
            <div class="vault-item-author">@${item.author?.username || 'creator'}</div>
            <div class="vault-item-meta">${item.slides?.length || 0} Slides • ${new Date(item.savedAt).toLocaleDateString()}</div>
          </div>
        `;
        row.addEventListener('click', () => {
          state.carouselData = item;
          state.slides = item.slides.map((s, idx) => ({
            ...s,
            id: `vault_${Date.now()}_${idx}`,
            selected: true,
            rotation: 0,
            zoom: 1.0,
            imgElement: null
          }));
          preloadSlideImages(state.slides).then(() => {
            applyAutoLayoutMatrix();
            updateFilmstrip();
            updatePostMetadataBanner(item);
            dom.vaultDrawerBackdrop.classList.add('hidden');
            triggerCanvasRender();
            fitCanvasToViewport();
            showToast(`Loaded @${item.author?.username || 'vault'} from vault!`, 'success');
          });
        });
        dom.vaultHistoryList.appendChild(row);
      });
    }

    dom.vaultDrawerBackdrop.classList.remove('hidden');
  };
}

function clearAllVaultHistory() {
  if (!dbInstance) return;
  const tx = dbInstance.transaction('carousels', 'readwrite');
  const store = tx.objectStore('carousels');
  store.clear();
  tx.oncomplete = () => {
    updateVaultCountBadge();
    dom.vaultHistoryList.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <p>Vault cleared.</p>
      </div>
    `;
    showToast('Vault history cleared', 'info');
  };
}

// ==========================================
// 🍞 Toast Notifications
// ==========================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// ==========================================
// ❓ Interactive FAQ Hub Accordion & Search
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Accordion toggle
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('active');
    });
  });

  // FAQ Live Search Filter
  const faqSearchInput = document.getElementById('faqSearchInput');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (!term || text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});

