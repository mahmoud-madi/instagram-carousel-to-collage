# ❓ InstaCollage — Deep Questions & Knowledge Base (FAQ)

> **InstaCollage**: Instagram Posts & Carousels to Ready Collages in 1 Click  
> **Lead Architect & Developer**: **Mahmoud Madi** ([GitHub](https://github.com/mahmoud-madi))  
> **Powered by**: **Premier Tech & Voxo AI**  
> **License**: MIT Open Source

---

## 📑 Table of Contents
1. [General & Core Capabilities](#1-general--core-capabilities)
2. [Instagram Unpacking & Scraping Architecture](#2-instagram-unpacking--scraping-architecture)
3. [Canvas Geometry, Aspect Ratios & Zero-Crop Math](#3-canvas-geometry-aspect-ratios--zero-crop-math)
4. [Artistic Layout Modes (Polaroid, Filmstrip, Masonry)](#4-artistic-layout-modes)
5. [Privacy, Security & SSRF Hardening](#5-privacy-security--ssrf-hardening)
6. [Offline Vault & IndexedDB Storage](#6-offline-vault--indexeddb-storage)
7. [High-DPI Export, 4K & Clipboard Workflows](#7-high-dpi-export-4k--clipboard-workflows)
8. [Installation, PWA & Docker Deployment](#8-installation-pwa--docker-deployment)
9. [Developer Credits & Open Source Contributions](#9-developer-credits--open-source-contributions)

---

## 1. General & Core Capabilities

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

---

## 2. Instagram Unpacking & Scraping Architecture

### Q6: How does InstaCollage extract all slides from a carousel?
**A:** When you paste an Instagram link (e.g., `https://www.instagram.com/p/Db-QrfGjDFd/`), the Node.js backend server (`server.js`) fetches the server-side rendered HTML response using standard user-agent rotation, resolves nested JSON state trees (`xdt_api__v1__media__shortcode__web_info` and OpenGraph tags), and extracts clean image URLs for every slide.

### Q7: Why do other Instagram downloaders crop images into squares?
**A:** Instagram often generates square preview thumbnails by appending `stp=c` and `s150x150` or `s320x320` query parameters. Traditional downloaders mistakenly grab these thumbnail URLs. InstaCollage strips out these cropping tokens and selects only the original high-resolution uncropped master images.

### Q8: What happens if an Instagram CDN edge node returns a 403 Forbidden error?
**A:** InstaCollage automatically canonicalizes edge URLs to universal `scontent.cdninstagram.com` tokens, bypassing region-locked `fbcdn.net` edge host blocks.

### Q9: Does InstaCollage support Instagram Reels and single-photo posts?
**A:** Yes. Single photos, multi-photo carousels (up to 10+ slides), and Reel cover images are fully supported.

---

## 3. Canvas Geometry, Aspect Ratios & Zero-Crop Math

### Q10: How does InstaCollage achieve zero-crop rendering?
**A:** In Auto mode (`aspectRatio: 'auto'`), InstaCollage calculates the dominant natural aspect ratio of the incoming slides (e.g., $0.75$ for $3:4$ portrait or $0.8$ for $4:5$ portrait). The overall canvas width and height scale dynamically according to:
$$\text{Canvas Width} = \text{cols} \times \text{slideRatio} \times \text{baseTileHeight}$$
$$\text{Canvas Height} = \text{rows} \times \text{baseTileHeight}$$
This ensures every grid cell precisely matches the photo's original proportions without cropping the tops or bottoms.

### Q11: What standard aspect ratios are available?
**A:** You can select from:
- **Auto (Dominant)**: Matches the source photo ratio.
- **1:1 Square**: Perfect for square social grids.
- **4:5 Portrait**: Classic Instagram portrait format.
- **3:4 Portrait**: Modern multi-aspect mobile photo format.
- **9:16 Story / Reel**: Vertical full-screen social format.
- **16:9 Landscape**: Panoramic presentation format.

### Q12: Can I adjust spacing and rounded corners?
**A:** Yes. The left sidebar provides interactive sliders for **Grid Spacing** ($0\text{px}$ to $48\text{px}$), **Outer Padding** ($0\text{px}$ to $80\text{px}$), and **Corner Radius** ($0\text{px}$ to $40\text{px}$).

---

## 4. Artistic Layout Modes

### Q13: What is the Polaroid Scrapbook mode?
**A:** Polaroid Scrapbook arranges photos as realistic physical Polaroid prints with white border chins, customizable handwritten captions, soft multi-layer drop shadows, and subtle organic tilt angles ($\pm 15^\circ$) that can be randomized or customized.

### Q14: What is the Cinema 35mm Filmstrip mode?
**A:** Cinema Filmstrip arranges your slides into a continuous horizontal 35mm analog film roll featuring realistic sprocket perforation holes, amber edge frame counter numbers (`01A`, `02A`), and vintage film stock labels (`KODAK 400TX`, `PORTRA 400`).

### Q15: What is the Masonry Pin Wall mode?
**A:** Masonry Pin Wall flows images into staggered vertical columns (Pinterest-style), automatically accommodating mixed portrait and landscape photos without empty gaps.

---

## 5. Privacy, Security & SSRF Hardening

### Q16: Is my browsing data or IP sent to third-party tracking services?
**A:** No. InstaCollage is completely self-contained. It contains zero third-party telemetry, analytics trackers, or commercial advertising scripts.

### Q17: What is SSRF hardening and why does InstaCollage have it?
**A:** When a server proxies images on behalf of users, malicious users could try to make the server query internal private network resources (such as AWS metadata endpoints or internal database IPs). InstaCollage implements strict upstream URL validation in `isSafeMediaUrl()`, which blocks all private subnets (`127.0.0.1`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).

### Q18: Does InstaCollage save my photos on a remote cloud server?
**A:** No. Images are streamed in real time through the proxy directly into your browser's memory and IndexedDB storage. Nothing is stored on remote servers.

---

## 6. Offline Vault & IndexedDB Storage

### Q19: How does the offline Vault work?
**A:** When a carousel is unpacked, its metadata and thumbnail blobs are saved locally into your browser's **IndexedDB** database under `instacollage_vault`.

### Q20: Can I reopen past carousels when offline?
**A:** Yes. Opening the **Vault History** drawer lists all previously unpacked carousels with their slide count and creation time. Clicking any item instantly re-renders it onto the canvas without needing an internet connection.

---

## 7. High-DPI Export, 4K & Clipboard Workflows

### Q21: What export formats are supported?
**A:** 
1. **Lossless 4K PNG**: Crystal-clear uncompressed collage master.
2. **Optimized JPEG**: High-speed shareable image with quality sliders ($80\% - 100\%$).
3. **OS Clipboard Copy**: Direct image bitmap copying to paste instantly into WhatsApp, Slack, Figma, or Twitter/X.
4. **Bulk ZIP Archive**: Downloads every individual uncropped slide in full resolution in a single `.zip` file.

---

## 8. Installation, PWA & Docker Deployment

### Q22: Can I install InstaCollage as a desktop or mobile app?
**A:** Yes! InstaCollage is a complete Progressive Web App (PWA). Click the "Install App" button in your browser's address bar on Windows, macOS, Android (Chrome), or iOS (Safari "Add to Home Screen").

### Q23: How do I run InstaCollage using Docker?
**A:** Run:
```bash
docker compose up -d
```
Then open `http://localhost:3300` in your browser.

---

## 9. Developer Credits & Open Source Contributions

### Q24: How can I contribute to InstaCollage?
**A:** We welcome community contributions! Check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for code style guidelines, feature requests, and pull request workflows.

### Q25: How should I attribute InstaCollage?
**A:** Please maintain attribution to **Mahmoud Madi** (Lead Architect & Developer) and **Premier Tech & Voxo AI** in forks and derivative projects under the terms of the MIT License.

---

© 2026 **Mahmoud Madi** • Powered by **Premier Tech & Voxo AI** • Licensed under the **MIT License**.
