# ❓ InstaCollage — Deep Questions & Knowledge Base (FAQ)

> **InstaCollage**: Instagram Posts & Carousels to Ready Collages in 1 Click  
> **Lead Architect & Developer**: **Mahmoud Madi** ([GitHub](https://github.com/mahmoud-madi))  
> **Powered by**: **Premier Tech & Voxo AI**  
> **License**: MIT Open Source  
> **Repository**: [https://github.com/mahmoud-madi/instagram-carousel-to-collage](https://github.com/mahmoud-madi/instagram-carousel-to-collage)

---

## 📑 Table of Contents
1. [General Overview & Use Cases](#1-general-overview--use-cases)
2. [Instagram Scraping & Extraction Architecture](#2-instagram-scraping--extraction-architecture)
3. [Canvas Mathematical Geometry & Zero-Crop Formulas](#3-canvas-mathematical-geometry--zero-crop-formulas)
4. [Artistic Layout Modes (Polaroid, Filmstrip, Masonry)](#4-artistic-layout-modes)
5. [Color Grading, Visual Filters & Image Adjustments](#5-color-grading-visual-filters--image-adjustments)
6. [Security, SSRF Hardening & Network Isolation](#6-security-ssrf-hardening--network-isolation)
7. [Offline Vault & IndexedDB Storage](#7-offline-vault--indexeddb-storage)
8. [High-DPI Master Export & Clipboard Integration](#8-high-dpi-master-export--clipboard-integration)
9. [Progressive Web App (PWA) & Mobile Workflows](#9-progressive-web-app-pwa--mobile-workflows)
10. [Docker Deployment & Self-Hosting](#10-docker-deployment--self-hosting)
11. [Performance Benchmarks & Memory Optimization](#11-performance-benchmarks--memory-optimization)
12. [Developer Attribution, Citation & Community Guidelines](#12-developer-attribution-citation--community-guidelines)

---

## 1. General Overview & Use Cases

### Q1: What is InstaCollage?
**A:** InstaCollage is an open-source, production-grade Progressive Web App (PWA) and backend API designed to unpack all individual photos and slides from public Instagram carousel posts and transform them into breathtaking, customizable, high-DPI photo collages, polaroid moodboards, and filmstrips in one click.

### Q2: Is InstaCollage free and open-source?
**A:** Yes, InstaCollage is 100% free and open-source under the permissive MIT License. You can use it locally, deploy it to your own cloud/server, or embed it in other applications.

### Q3: Do I need an Instagram account or login token to use it?
**A:** No. InstaCollage uses a multi-tier public SSR crawler and token resolver that unpacks public carousel posts without requiring any Instagram login credentials, access tokens, or personal sessions.

### Q4: Can I use local photos instead of Instagram links?
**A:** Yes. InstaCollage includes a local drag-and-drop file upload zone. You can upload local JPG, PNG, or WebP images and layout them using the exact same canvas engine.

### Q5: Who created InstaCollage?
**A:** InstaCollage was developed by **Mahmoud Madi** and is powered by **Premier Tech & Voxo AI**.

### Q6: What platforms does InstaCollage run on?
**A:** InstaCollage runs in any modern web browser on Windows, macOS, Linux, iOS (Safari), and Android (Chrome/Firefox/Samsung Internet). It can also be installed as a standalone PWA on desktop and mobile.

---

## 2. Instagram Scraping & Extraction Architecture

### Q7: How does InstaCollage extract all slides from a carousel?
**A:** When you paste an Instagram link (e.g., `https://www.instagram.com/p/Db-QrfGjDFd/`), the Node.js backend server (`server.js`) fetches the server-side rendered HTML response using standard user-agent rotation, resolves nested JSON state trees (`xdt_api__v1__media__shortcode__web_info` and OpenGraph tags), and extracts clean image URLs for every slide.

### Q8: Why do other Instagram downloaders crop images into squares?
**A:** Instagram often generates square preview thumbnails by appending `stp=c` and `s150x150` or `s320x320` query parameters. Traditional downloaders mistakenly grab these thumbnail URLs. InstaCollage strips out these cropping tokens and selects only the original high-resolution uncropped master images.

### Q9: What happens if an Instagram CDN edge node returns a 403 Forbidden error?
**A:** InstaCollage automatically canonicalizes edge URLs to universal `scontent.cdninstagram.com` tokens, bypassing region-locked `fbcdn.net` edge host blocks.

### Q10: Does InstaCollage support Instagram Reels and single-photo posts?
**A:** Yes. Single photos, multi-photo carousels (up to 10+ slides), and Reel cover images are fully supported.

### Q11: How does InstaCollage handle carousel sorting order?
**A:** The backend parses slide hierarchy numbers directly from GraphQL/SSR state, ensuring that the visual narrative of the carousel is preserved identically to the original Instagram post from slide 1 to slide 10.

---

## 3. Canvas Mathematical Geometry & Zero-Crop Formulas

### Q12: How does InstaCollage achieve zero-crop rendering?
**A:** In Auto mode (`aspectRatio: 'auto'`), InstaCollage calculates the dominant natural aspect ratio of the incoming slides (e.g., $0.75$ for $3:4$ portrait or $0.8$ for $4:5$ portrait). The overall canvas width and height scale dynamically according to:
$$\text{Canvas Width} = \text{cols} \times \text{slideRatio} \times \text{baseTileHeight} + (\text{cols} - 1) \times \text{gap} + 2 \times \text{padding}$$
$$\text{Canvas Height} = \text{rows} \times \text{baseTileHeight} + (\text{rows} - 1) \times \text{gap} + 2 \times \text{padding}$$
This ensures every grid cell precisely matches the photo's original proportions without cropping the tops or bottoms.

### Q13: What standard aspect ratios are available?
**A:** You can select from:
- **Auto (Dominant)**: Matches the source photo ratio.
- **1:1 Square**: Perfect for square social grids.
- **4:5 Portrait**: Classic Instagram portrait format.
- **3:4 Portrait**: Modern multi-aspect mobile photo format.
- **9:16 Story / Reel**: Vertical full-screen social format.
- **16:9 Landscape**: Panoramic presentation format.

### Q14: Can I adjust spacing and rounded corners?
**A:** Yes. The left sidebar provides interactive sliders for **Grid Spacing** ($0\text{px}$ to $48\text{px}$), **Outer Padding** ($0\text{px}$ to $80\text{px}$), and **Corner Radius** ($0\text{px}$ to $40\text{px}$).

### Q15: How are rounded corners drawn on the HTML5 Canvas?
**A:** InstaCollage uses sub-pixel path geometry using `ctx.roundRect()` with fallback bezier arcs `ctx.arcTo()` to guarantee anti-aliased, hardware-accelerated rounded borders across all browsers.

---

## 4. Artistic Layout Modes

### Q16: What is the Polaroid Scrapbook mode?
**A:** Polaroid Scrapbook arranges photos as realistic physical Polaroid prints with white border chins, customizable handwritten captions, soft multi-layer drop shadows, and subtle organic tilt angles ($\pm 15^\circ$) that can be randomized or customized.

### Q17: What is the Cinema 35mm Filmstrip mode?
**A:** Cinema Filmstrip arranges your slides into a continuous horizontal 35mm analog film roll featuring realistic sprocket perforation holes, amber edge frame counter numbers (`01A`, `02A`), and vintage film stock labels (`KODAK 400TX`, `PORTRA 400`).

### Q18: What is the Masonry Pin Wall mode?
**A:** Masonry Pin Wall flows images into staggered vertical columns (Pinterest-style), automatically accommodating mixed portrait and landscape photos without empty gaps.

### Q19: Can I reorder slides by dragging and dropping them?
**A:** Yes. The bottom Slide Manager filmstrip provides native drag-and-drop handles allowing you to reorder, rotate ($90^\circ, 180^\circ, 270^\circ$), or delete individual slides on the fly.

---

## 5. Color Grading, Visual Filters & Image Adjustments

### Q20: What color grading filters are available?
**A:** InstaCollage provides 6 studio-grade color presets applied via Canvas 2D matrix filters:
1. **Normal / Original**: Unaltered raw fidelity.
2. **Vivid Warm**: High saturation, warm highlights, deep blacks.
3. **Vintage 90s**: Golden tones, lifted shadows, subtle film warmth.
4. **Kodak Sepia**: Classic amber monochrome with warm midtones.
5. **Cyber Mono**: Ultra-high contrast cinematic black & white.
6. **Dramatic Noir**: Crushed shadows, sharp highlights, high clarity.

### Q21: Can I adjust contrast, brightness, and saturation manually?
**A:** Yes. In the Edit panel, you can adjust Brightness, Contrast, Saturation, Sepia, and Blur in real time with instant canvas updates.

---

## 6. Security, SSRF Hardening & Network Isolation

### Q22: Is my browsing data or IP sent to third-party tracking services?
**A:** No. InstaCollage is completely self-contained. It contains zero third-party telemetry, analytics trackers, or commercial advertising scripts.

### Q23: What is SSRF hardening and why does InstaCollage have it?
**A:** When a server proxies images on behalf of users, malicious users could try to make the server query internal private network resources (such as AWS metadata endpoints or internal database IPs). InstaCollage implements strict upstream URL validation in `isSafeMediaUrl()`, which blocks all private subnets (`127.0.0.1`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).

### Q24: Does InstaCollage save my photos on a remote cloud server?
**A:** No. Images are streamed in real time through the proxy directly into your browser's memory and IndexedDB storage. Nothing is stored on remote servers.

---

## 7. Offline Vault & IndexedDB Storage

### Q25: How does the offline Vault work?
**A:** When a carousel is unpacked, its metadata and thumbnail blobs are saved locally into your browser's **IndexedDB** database under `instacollage_vault`.

### Q26: Can I reopen past carousels when offline?
**A:** Yes. Opening the **Vault History** drawer lists all previously unpacked carousels with their slide count and creation time. Clicking any item instantly re-renders it onto the canvas without needing an internet connection.

### Q27: How much storage does the IndexedDB vault consume?
**A:** Because InstaCollage stores lightweight thumbnail blobs and metadata references, 50+ unpacked carousels typically consume less than $15\text{ MB}$ of local browser storage.

---

## 8. High-DPI Master Export & Clipboard Workflows

### Q28: What export formats are supported?
**A:** 
1. **Lossless 4K PNG**: Crystal-clear uncompressed collage master.
2. **Optimized JPEG**: High-speed shareable image with quality sliders ($80\% - 100\%$).
3. **OS Clipboard Copy**: Direct image bitmap copying to paste instantly into WhatsApp, Slack, Figma, or Twitter/X.
4. **Bulk ZIP Archive**: Downloads every individual uncropped slide in full resolution in a single `.zip` file.

### Q29: How does the Direct Clipboard Copy feature work?
**A:** InstaCollage converts the rendered HTML5 Canvas to a high-resolution PNG Blob and calls `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])`, allowing instant paste with `Ctrl+V` / `Cmd+V`.

---

## 9. Progressive Web App (PWA) & Mobile Workflows

### Q30: How do I install InstaCollage on iPhone / iOS?
**A:** Open the site in Safari, tap the **Share** button, and tap **"Add to Home Screen"**. The app will launch in standalone full-screen mode with zero browser address bar chrome.

### Q31: How do I install InstaCollage on Android?
**A:** In Chrome, tap the **"Install App"** prompt in the address bar or the bottom banner to add the app icon directly to your home screen and app drawer.

### Q32: Can I share directly from the Instagram mobile app to InstaCollage?
**A:** Yes! When installed as a PWA, InstaCollage registers as a **Web Share Target**, allowing you to tap "Share to..." in Instagram and choose InstaCollage to unpack the post immediately.

---

## 10. Docker Deployment & Self-Hosting

### Q33: How do I run InstaCollage using Docker Compose?
**A:** Run:
```bash
git clone https://github.com/mahmoud-madi/instagram-carousel-to-collage.git
cd instagram-carousel-to-collage
docker compose up -d
```
Then visit `http://localhost:3300` in your browser.

### Q34: What environment variables are supported?
**A:** 
- `PORT`: Server port (default: `3300`).
- `HOST`: Server host binding (default: `0.0.0.0`).
- `NODE_ENV`: Runtime environment (`production` or `development`).

---

## 11. Performance Benchmarks & Memory Optimization

### Q35: How fast is the canvas compositing engine?
**A:** InstaCollage renders a 10-photo 4K collage in under **$45\text{ms}$** on standard modern hardware using GPU-accelerated Canvas 2D contexts.

### Q36: How does InstaCollage prevent browser memory leaks?
**A:** All temporary object URLs generated during rendering and extraction are aggressively revoked via `URL.revokeObjectURL()` once decoded into memory bitmaps.

---

## 12. Developer Attribution, Citation & Community Guidelines

### Q37: How do I cite InstaCollage in a publication or project?
**A:** Please refer to the [`CITATION.cff`](CITATION.cff) file or cite:
> *Madi, Mahmoud (2026). InstaCollage: Instagram Posts & Carousels to Ready Collages in 1 Click. Powered by Premier Tech & Voxo AI. https://github.com/mahmoud-madi/instagram-carousel-to-collage*

### Q38: How can I contribute?
**A:** Check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines, pull request templates, and coding standards.

---

© 2026 **Mahmoud Madi** • Powered by **Premier Tech & Voxo AI** • Licensed under the **MIT License**.
