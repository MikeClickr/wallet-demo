# ID Wallet Demo

Een demo-website waar bezoekers kunnen ervaren hoe **5 digitale identiteits-wallets** werken in **5 alledaagse scenario's**. De UI gebruikt het officiële [Amsterdam Design System](https://designsystem.amsterdam/).

## 🔗 Live demo

**https://mikeclickr.github.io/wallet-demo/**

> Frontend-demo: Yivi draait in dummy-modus, er is geen echte backend/issuer. De identiteits-flows zijn gesimuleerd.

## Wallets en scenario's

**5 wallets:** NL Wallet (overheid), Yivi (privacy-by-design), Digidentity (commercieel), Datakeeper (nieuw), Schluss (coöperatief)

**5 scenario's:**
1. Leeftijdscheck (18+)
2. Inloggen bij de gemeente (Mijn Amsterdam)
3. Adres delen (pakketbezorging)
4. Diploma delen (DUO / sollicitatie)
5. Jaarinkomen tonen (Belastingdienst / huurwoning)

## Stack

- **React + TypeScript + Vite**
- **[Amsterdam Design System](https://designsystem.amsterdam/)** — `@amsterdam/design-system-react`, `-css`, `-tokens`, `-assets`
- **[Yivi](https://yivi.app/)** — `@privacybydesign/yivi-*` (frontend, dummy-modus)

## Lokaal draaien

```bash
npm install
npm run dev        # dev-server met HMR
npm run build      # productie-build naar dist/
npm run preview    # bekijk de productie-build lokaal
```

## Deployment

Elke push naar `main` bouwt en publiceert automatisch naar GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). De Vite `base`
staat op `/wallet-demo/` zodat assets onder het GitHub Pages-subpad laden.
