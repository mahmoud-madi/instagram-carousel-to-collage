# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

---

## 🛡️ Security Architecture & SSRF Defenses

InstaCollage Studio processes external URLs to composite carousel slides onto an HTML5 Canvas. To prevent **Server-Side Request Forgery (SSRF)**, the media proxy (`/api/proxy`) enforces strict validation rules:

1. **Protocol Restriction**: Only `http:` and `https:` schemes are accepted.
2. **Private Network Blacklisting**:
   - Loopback addresses (`127.0.0.1`, `localhost`, `::1`).
   - Private IPv4 ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
   - Cloud metadata IP: `169.254.169.254`.
3. **Domain Whitelisting**:
   - Validates hostname suffixes against authorized CDN targets (`.cdninstagram.com`, `.fbcdn.net`, `.instagram.com`, `images.unsplash.com`).
4. **CORS Isolation**:
   - Injects `Access-Control-Allow-Origin: *` while maintaining canvas security without tainting.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability within InstaCollage Studio, please report it responsibly:

- **Primary Contact**: Mahmoud Madi
- **GitHub**: [https://github.com/mahmoud-madi](https://github.com/mahmoud-madi)

Please include:
- A description of the vulnerability.
- Steps or a proof-of-concept to reproduce the issue.
- Potential impact.

We will acknowledge receipt within 48 hours and work on a prompt remediation release.
