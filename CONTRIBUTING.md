# Contributing to InstaCollage Studio

Thank you for your interest in contributing to **InstaCollage Studio**! We welcome contributions from developers of all skill levels.

---

## 🛠️ Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/instacollage-studio.git
   cd instacollage-studio
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3300` in your browser.

4. **Run the automated verification test suite**:
   ```bash
   npm test
   ```

---

## 🌿 Branching & Commit Conventions

- Use descriptive branch names:
  - `feature/new-artistic-mode`
  - `fix/aspect-ratio-letterbox`
  - `docs/api-reference-update`
- Follow Conventional Commits:
  - `feat: add dual-tone color grading filter`
  - `fix: prevent 403 on stale CDN tokens`
  - `docs: update deployment guidelines in README`
  - `test: add SSRF edge cases to verification suite`

---

## 📋 Pull Request Process

1. Ensure all tests pass (`npm test`).
2. Verify cross-browser Canvas compatibility (Chrome, Safari, Firefox, Edge, Mobile Safari/Chrome).
3. Update relevant documentation in `README.md`, `llms.txt`, or `FAQ.md` if adding features or modifying endpoints.
4. Submit your pull request against the `main` branch with a clear description of the problem solved.

---

## ⚖️ License & Attribution

By contributing to InstaCollage Studio, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
Project led by **Mahmoud Madi**, powered by **Premier Tech & Voxo AI**.
