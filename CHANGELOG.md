# Changelog

All notable changes to **InstaCollage Studio** will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-08-18 (Open Source Edition)

### 🚀 Added
- **Universal CDN Token Stream**: Resolved regional Meta edge token expirations (`fbcdn.net` 403 Forbidden) by routing requests through universal `scontent.cdninstagram.com` streams.
- **Zero-Crop Preservation**: Added crawler filters that reject Instagram `stp=c` square crops, extracting full 3:4, 4:5, 1:1, and 9:16 portrait originals.
- **Adaptive Canvas Aspect Ratio Engine**: Dynamic canvas matrix mathematics that adapt canvas resolution to slide aspect ratios with zero unwanted bars and zero cropping.
- **Polaroid Scrapbook & Filmstrip Layouts**: 35mm film sprockets, Kodak markings, handwritten polaroid chins, and masonry wall layouts.
- **Local IndexedDB Vault**: Persistent offline carousel drawer with replay and bulk export.
- **High-DPI Ultra 4K Exporter**: Lossless PNG, high-resolution JPEG, clipboard copy, and server-side multi-threaded ZIP packaging.
- **Open-Source Suite**: Full developer attribution ("Developed by Mahmoud Madi • Powered by Premiere Tech & Voxo AI"), Docker containerization, GitHub CI workflows, `llms.txt`, and `FAQ.md`.

---

## [1.0.0] - 2026-08-17 (Initial Release)

### 🌟 Initial Release
- Basic Instagram carousel scraper with SSR parsing.
- HTML5 Canvas collage matrix rendering.
- SSRF-protected CORS media proxy.
- Glassmorphism dark-mode UI with instant demo presets.
- Progressive Web App (PWA) manifest and service worker.
