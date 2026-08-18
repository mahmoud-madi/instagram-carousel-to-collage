import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3300';

async function runVerificationSuite() {
  console.log('🧪 Starting InstaCollage Studio Automated Verification Suite...\n');
  let passed = 0;
  let failed = 0;

  async function check(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
      failed++;
    }
  }

  // 1. Health API
  await check('Health Endpoint (/api/health)', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 'ok') throw new Error('Status not ok');
  });

  // 2. Static Assets
  await check('App HTML Shell (/)', async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('InstaCollage') || !text.includes('collageCanvas')) {
      throw new Error('HTML missing core elements');
    }
  });

  await check('Stylesheet (/styles.css)', async () => {
    const res = await fetch(`${BASE_URL}/styles.css`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('--grad-ig') || !text.includes('.glass-panel')) {
      throw new Error('CSS missing expected design system rules');
    }
  });

  await check('App Engine Script (/app.js)', async () => {
    const res = await fetch(`${BASE_URL}/app.js`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('renderCollage') && !text.includes('triggerCanvasRender')) {
      throw new Error('app.js missing canvas engine');
    }
  });

  await check('PWA Manifest (/manifest.json)', async () => {
    const res = await fetch(`${BASE_URL}/manifest.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.display !== 'standalone' || !json.share_target) {
      throw new Error('Invalid manifest configuration');
    }
  });

  await check('Service Worker (/sw.js)', async () => {
    const res = await fetch(`${BASE_URL}/sw.js`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes('CACHE_NAME')) throw new Error('Invalid sw.js');
  });

  await check('PWA Icon 192x192 (/icons/icon-192.png)', async () => {
    const res = await fetch(`${BASE_URL}/icons/icon-192.png`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const len = Number(res.headers.get('content-length') || 0);
    if (len < 500) throw new Error('Icon file size unexpectedly small');
  });

  // 3. Demo Presets
  const categories = ['architecture', 'fashion', 'tech', 'travel', 'food'];
  for (const cat of categories) {
    await check(`Demo Carousel (${cat})`, async () => {
      const res = await fetch(`${BASE_URL}/api/sample/${cat}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.success || !json.data.slides || json.data.slides.length < 4) {
        throw new Error(`Invalid slide count in ${cat} preset`);
      }
    });
  }

  // 4. SSRF Media Proxy
  await check('Media Proxy CORS & Streaming (/api/proxy)', async () => {
    const testImageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400';
    const res = await fetch(`${BASE_URL}/api/proxy?url=${encodeURIComponent(testImageUrl)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (res.headers.get('access-control-allow-origin') !== '*') {
      throw new Error('Missing CORS Access-Control-Allow-Origin: * header');
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) throw new Error('Buffered media image too small');
  });

  // 5. SSRF Blocklist Security
  await check('SSRF Protection (Blocks localhost / intranet)', async () => {
    const forbidden = ['http://localhost:3300/api/health', 'http://127.0.0.1:80', 'http://169.254.169.254/latest/meta-data'];
    for (const url of forbidden) {
      const res = await fetch(`${BASE_URL}/api/proxy?url=${encodeURIComponent(url)}`);
      if (res.status === 200) throw new Error(`SSRF vulnerability: Allowed forbidden URL ${url}`);
    }
  });

  // 6. Extraction API
  await check('Carousel Extraction API (/api/extract)', async () => {
    const res = await fetch(`${BASE_URL}/api/extract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.instagram.com/p/DEMO_FASHION_02/' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.success || !json.data.slides || json.data.author.username !== 'vogue.runway') {
      throw new Error('Extraction response payload mismatch');
    }
  });

  // 7. ZIP Archiver
  await check('Bulk ZIP Archiver (/api/download-zip)', async () => {
    const res = await fetch(`${BASE_URL}/api/download-zip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slides: [
          { originalUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', isVideo: false },
          { originalUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', isVideo: false }
        ]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('zip')) throw new Error(`Expected zip Content-Type, got ${ct}`);
    const zipBuf = Buffer.from(await res.arrayBuffer());
    if (zipBuf.length < 5000) throw new Error('ZIP file size too small');
  });

  console.log(`\n==============================================`);
  console.log(`🎉 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`==============================================\n`);

  if (failed > 0) process.exit(1);
}

runVerificationSuite();
