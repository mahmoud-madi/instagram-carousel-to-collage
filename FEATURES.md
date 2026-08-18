# ⚡ InstaCollage — Complete Features & Capabilities Specification

> **InstaCollage**: Instagram Posts & Carousels to Ready Collages in 1 Click  
> **Lead Architect & Developer**: **Mahmoud Madi** ([GitHub](https://github.com/mahmoud-madi))  
> **Powered by**: **Premier Tech & Voxo AI**  
> **License**: MIT Open Source

---

## 🌟 Executive Feature Summary

| Capability | InstaCollage Studio v2.0 | Traditional Online Tools | Manual Canva / Photoshop |
| :--- | :--- | :--- | :--- |
| **Carousel Slide Unpacking** | ⚡ **1-Click Automated (All 10 Slides)** | ❌ Single photo download only | ❌ Manual download & import |
| **Original Aspect Ratio Math** | 📐 **100% Zero-Crop ($3:4, 4:5, 1:1, 9:16$)** | ⚠️ Forces $1:1$ square crop | ⚠️ Manual alignment & masking |
| **Rendering Engine** | 🚀 **Hardware-Accelerated HTML5 Canvas** | ❌ Server-side slow render | ⚠️ Heavy desktop app |
| **Polaroid & 35mm Filmstrip** | ✨ **Native Instant Algorithmic Modes** | ❌ Not supported | ⚠️ Paid templates / manual drawing |
| **Privacy & Security** | 🔒 **Zero Token Required + SSRF Filter** | ⚠️ Requires account login | 🔒 Local only |
| **Offline Vault** | 💾 **IndexedDB Local History Storage** | ❌ Cloud account required | ❌ Local filesystem files |
| **Export Resolution** | 💎 **Ultra-High DPI (4K PNG, JPEG, ZIP)** | ⚠️ Watermarked / Low-res | 💎 Native High-res |
| **Installation** | 📱 **100% Offline PWA (Windows, Mac, iOS, Android)** | ❌ Web only / App store only | 💻 Desktop install only |

---

## 1. 🔄 Instagram Ingestion & Extraction Engine

- **Universal Public Link Support**: Unpacks any public Instagram Post, Reel, or multi-slide Carousel URL (`/p/`, `/reel/`, `/tv/`).
- **Zero-Crop URL Filter**: Automatically removes Instagram's aggressive square cropping tokens (`stp=c`, `c0.`, `s150x150`, `s320x320`) and resolves the highest available uncompressed dimensions.
- **Universal CDN Token Rewriting**: Resolves multi-tiered Instagram edge hosts (`scontent.cdninstagram.com`, `fbcdn.net`) to prevent transient `403 Forbidden` errors.
- **Dominant Aspect Ratio Detection**: Automatically detects the dominant aspect ratio of the carousel ($0.75$ portrait, $0.8$ standard $4:5$, $1.0$ square, $0.5625$ vertical $9:16$) and scales the canvas geometry without letterboxing.
- **Client & Local Ingestion**: In addition to Instagram links, supports local file drops (JPG, PNG, WebP) with instant drag-and-drop batch reordering.

---

## 2. 🎨 HTML5 Canvas 2D Mathematical Rendering Engine

- **Matrix Grid Compositor**:
  - Dynamically calculates tile coordinate vectors `(x, y, w, h)` with sub-pixel rounding.
  - Independent matrix grid columns ($1$ to $6$) and adaptive row calculations.
  - Fluid padding, spacing, and corner radius controls ($0\text{px}$ to $48\text{px}$).
- **Polaroid Scrapbook Mode**:
  - Algorithmic pseudo-random organic tilt rotations ($\pm 15^\circ$) with deterministic seed pinning.
  - Realistic white photo frames with extended bottom chin captions.
  - Multi-layer drop shadows (`rgba(0, 0, 0, 0.45)` with configurable blur spread).
- **Cinema 35mm Filmstrip Mode**:
  - Realistic continuous 35mm analog film border with authentic top & bottom perforated sprocket holes.
  - Glowing amber frame index numbers (`01A`, `02A`, `03A`) and vintage film stock labels (`KODAK 400TX`, `PORTRA 400`).
  - Integrated analog film grain simulation.
- **Masonry Pin Wall**:
  - Pinterest-style multi-column cascading flow balancing dynamic image heights.

---

## 3. 🛡️ Security, SSRF Hardening & Media Streaming

- **Private & Intranet IP Blacklist**: Rejects requests targeting loopback addresses (`127.0.0.1`, `localhost`), Class A (`10.0.0.0/8`), Class B (`172.16.0.0/12`), Class C (`192.168.0.0/16`), Link-local (`169.254.169.254`), and IPv6 equivalents (`::1`, `fc00::/7`).
- **CORS Streaming Header Injection**: Media proxy injects permissive `Access-Control-Allow-Origin: *` headers, ensuring the browser Canvas context remains clean (`tainted = false`) for high-speed client-side image manipulation and clipboard copying.
- **Content-Type & Size Validation**: Strict stream validation verifying upstream image MIME types (`image/jpeg`, `image/png`, `image/webp`) and preventing oversized response flooding.

---

## 4. 💾 Local IndexedDB Carousel Vault

- **Zero-Cloud Local Storage**: All unpacked carousels are stored in the client browser's IndexedDB storage under `instacollage_vault`.
- **Thumbnail Strip & Replay**: Browse saved carousels, view slide counts and post timestamps, and reload past carousels into the live canvas with a single click.
- **Bulk Export & Clearing**: Export entire history or clear cached slides with full privacy guarantees.

---

## 5. 📦 High-DPI Export & Archiving

- **4K PNG Master Export**: Generates lossless, uncompressed PNG files at native or $2\times / 4\times$ supersampled resolutions.
- **Studio JPEG**: Optimized lossy JPEG output with selectable quality levels ($80\%$, $92\%$, $100\%$).
- **One-Click Clipboard Copy**: Directly writes rendered collage bitmaps to the OS clipboard via `navigator.clipboard.write()` for instant pasting into Slack, Figma, Twitter/X, or Photoshop.
- **Multi-Threaded ZIP Archiver**: Instant server-side or client-side JSZip packaging of all individual unpacked slides with numbered filenames (`slide_01.jpg`, `slide_02.jpg`, ...).

---

## 6. 📱 Progressive Web App (PWA) Architecture

- **Offline Support**: Full Service Worker cache-first shell caching with network-first fallback for live API requests.
- **Web Share Target API**: Share carousels directly from the mobile Instagram app to InstaCollage using the native Android / iOS "Share To..." sheet.
- **Glassmorphic Obsidian Design**: Built with pure CSS3 glassmorphism, responsive CSS grid, Outfit and Plus Jakarta Sans typography, and neon Instagram gradients.

---

© 2026 **Mahmoud Madi** • Powered by **Premier Tech & Voxo AI** • Licensed under the **MIT License**.
