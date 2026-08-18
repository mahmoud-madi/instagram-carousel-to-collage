# Frequently Asked Questions (FAQ)

### 1. What is InstaCollage Studio?
InstaCollage Studio is a web application and Progressive Web App (PWA) that unpacks all individual photos from any public Instagram Carousel post URL and arranges them into high-DPI collages, Polaroid scrapbooks, or cinematic filmstrips in real time.

---

### 2. Does InstaCollage Studio require an Instagram API token or login?
**No.** InstaCollage Studio uses a multi-tier crawler parser to extract publicly available media metadata without requiring personal Instagram credentials, tokens, or login sessions.

---

### 3. Why were my slides previously cropped into squares, and how is it fixed now?
Instagram generates both pre-cropped square thumbnails (`stp=c...`) and full-resolution uncropped originals (`dst-jpg_e35...`) in its SSR response. InstaCollage Studio v2.0.0 parses and filters for raw uncropped versions and calculates dynamic canvas aspect ratios (3:4, 4:5, 1:1, 9:16) with zero cropping.

---

### 4. Can I use InstaCollage Studio completely offline?
**Yes.** Once the PWA is installed or cached by your browser's Service Worker (`sw.js`), you can:
- Use the **"Upload Custom Photos"** tool to build collages from your local device images.
- Access previously unpacked carousels saved in your local **IndexedDB Vault**.

---

### 5. What export formats and resolutions are supported?
- **Lossless PNG**: Crystal-clear transparency and sharp edges.
- **High-DPI JPEG**: Optimized file sizes with custom compression quality.
- **Ultra 4K Upscaled**: Up to 4320px ultra-high resolution.
- **One-Click Clipboard Copy**: Paste directly into Figma, Photoshop, Canva, Twitter/X, Discord, or Slack.
- **Bulk ZIP Archive**: Download all original individual slides packaged in a `.zip` file.

---

### 6. How do I self-host with Docker?
```bash
docker compose up -d
```
The studio will immediately be available at `http://localhost:3300`.

---

### 7. Who developed this project?
InstaCollage Studio was developed by **Mahmoud Madi** ([GitHub](https://github.com/mahmoud-madi)) and is powered by **Premiere Tech** & **Voxo AI**.
