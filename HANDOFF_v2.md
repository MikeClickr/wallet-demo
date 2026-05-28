# Handoff v2: ID Wallet Demo met Amsterdam Design System → Claude Code

Dit is een handoff van een Claude.ai chat naar Claude Code. Lees dit volledig door.

---

## 🎯 Doel

Bouw een demo-website (in stijl van https://amsterdam-demo.staging.yivi.app/) waar bezoekers kunnen ervaren hoe **5 digitale identiteits-wallets** werken in **5 scenario's**. De UI gebruikt het officiële **Amsterdam Design System**.

---

## 📋 Wallets en scenario's

**5 wallets:** NL Wallet (overheid), Yivi (privacy-by-design), Digidentity (commercieel), Datakeeper (nieuw), Schluss (coöperatief)

**5 scenario's:**
1. Leeftijdscheck (18+)
2. Inloggen bij gemeente (Mijn Amsterdam)
3. Adres delen (pakketbezorging)
4. Diploma delen (DUO/sollicitatie)
5. Jaarinkomen (Belastingdienst/huurwoning)

---

## 🎨 Amsterdam Design System

Repo: https://github.com/Amsterdam/design-system
Storybook (alle componenten zien): https://designsystem.amsterdam/
Figma: https://www.figma.com/community/file/1530535540611888495/amsterdam-design-system-community-edition

**Belangrijk:** dit is een serieus React-component-systeem (TypeScript, EUPL-1.2 licentie). We gebruiken het via npm-pakketten:

- `@amsterdam/design-system-react` — React-componenten
- `@amsterdam/design-system-css` — CSS-stijlen
- `@amsterdam/design-system-tokens` — design tokens
- `@amsterdam/design-system-assets` — logo's, iconen, fonts

Alle componenten en richtlijnen: zie de Storybook portal.

---

## 🛠 Stack-keuze

**React + Vite + TypeScript** — dat past bij ADS (Amsterdam Design System) en bij de Yivi-integratie.

```
wallet-demo/
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles.css                   # Imports ADS CSS
    ├── data/
    │   ├── wallets.ts
    │   └── scenarios.ts
    ├── components/
    │   ├── WalletPicker.tsx
    │   ├── ScenarioGrid.tsx
    │   ├── ScenarioCard.tsx
    │   ├── WalletFlow.tsx           # Modal met QR/consent/success
    │   ├── QRCodeMock.tsx
    │   ├── ConsentScreen.tsx        # NL Wallet-stijl
    │   └── SuccessScreen.tsx
    ├── wallets/
    │   ├── yivi.ts                  # ECHTE Yivi-integratie
    │   ├── nlwallet.ts              # Simulatie (OpenID4VP-stijl)
    │   └── simulated.ts             # Digidentity, Datakeeper, Schluss
    └── scenarios/
        └── definitions.ts            # Alle 5 scenario-definities
```

---

## 🚀 Stap-voor-stap voor Claude Code

### Stap 1: Project opzetten

```bash
# In de map waar je je projecten bewaart
npm create vite@latest wallet-demo -- --template react-ts
cd wallet-demo
npm install
```

### Stap 2: Amsterdam Design System installeren

```bash
npm install @amsterdam/design-system-react @amsterdam/design-system-css @amsterdam/design-system-tokens @amsterdam/design-system-assets
```

### Stap 3: ADS CSS importeren

In `src/main.tsx`, vóór de App-import:

```typescript
import '@amsterdam/design-system-tokens/dist/index.css'
import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import './styles.css'
```

### Stap 4: Yivi-integratie

```bash
npm install @privacybydesign/yivi-frontend
```

Eenvoudigste flow is via de `yivi-frontend` wrapper met `dummy: 'happy path'` voor lokale demo:

```typescript
// src/wallets/yivi.ts
import yivi from '@privacybydesign/yivi-frontend'

export async function startYiviDummy(elementSelector: string) {
  const yiviWeb = yivi.newWeb({
    debugging: false,
    element: elementSelector,
    // Dummy mode — werkt zonder backend
    dummy: 'happy path',
  })
  return yiviWeb.start()
}
```

**Belangrijk:** de dummy plugin moet ook geïmporteerd worden. Check `yivi-frontend-packages/examples/browser/yivi-frontend/` in de Yivi-repo voor het exacte werkende voorbeeld.

### Stap 5: ADS componenten gebruiken

Belangrijkste ADS-componenten voor dit project (zie Storybook voor alle):

- `<Page>`, `<PageHeader>`, `<PageMenu>`, `<PageFooter>` — layout-structuur
- `<Heading>` — alle koppen (level 1-6)
- `<Paragraph>` — tekst
- `<Grid>`, `<Grid.Cell>` — grid-layouts
- `<Card>`, `<Card.HeadingGroup>` — voor scenario-kaarten
- `<Button>` — knoppen (variant: primary, secondary, tertiary)
- `<Dialog>` — voor de wallet-flow modal
- `<Logo>` — Amsterdam logo
- `<Alert>` — voor demo-disclaimers
- `<Tag>`, `<Badge>` — voor labels op wallet-kaarten
- `<Icon>` — iconen
- `<Link>`, `<LinkList>` — voor footer-links

### Stap 6: Voorbeeld component met ADS

```tsx
// src/components/ScenarioCard.tsx
import { Card, Heading, Paragraph, Icon } from '@amsterdam/design-system-react'

interface Props {
  title: string
  description: string
  tag: string
  onClick: () => void
}

export function ScenarioCard({ title, description, tag, onClick }: Props) {
  return (
    <Card onClick={onClick}>
      <Card.HeadingGroup>
        <Heading level={3}>{title}</Heading>
      </Card.HeadingGroup>
      <Paragraph>{description}</Paragraph>
      <Paragraph size="small">{tag}</Paragraph>
    </Card>
  )
}
```

### Stap 7: Page-layout met ADS

```tsx
// src/App.tsx
import { Page, PageHeader, PageMenu, PageFooter, Heading, Paragraph, Grid } from '@amsterdam/design-system-react'
import { WalletPicker } from './components/WalletPicker'
import { ScenarioGrid } from './components/ScenarioGrid'

export function App() {
  return (
    <Page>
      <PageHeader brandName="Probeer ID Wallets" logoLink="/" logoLinkTitle="Naar de homepage">
        <PageMenu>
          <PageMenu.Link href="#wallets">Wallets</PageMenu.Link>
          <PageMenu.Link href="#scenarios">Scenario's</PageMenu.Link>
          <PageMenu.Link href="#about">Over</PageMenu.Link>
        </PageMenu>
      </PageHeader>
      <main>
        <Grid paddingVertical="large">
          <Grid.Cell span="all">
            <Heading level={1}>Jouw data, jouw keuze</Heading>
            <Paragraph size="large">
              Probeer 5 wallets uit met 5 echte scenario's.
            </Paragraph>
          </Grid.Cell>
        </Grid>
        <WalletPicker />
        <ScenarioGrid />
      </main>
      <PageFooter />
    </Page>
  )
}
```

### Stap 8: Wallet-data definiëren

```typescript
// src/data/wallets.ts
export interface Wallet {
  id: string
  name: string
  tag: string
  color: string
  description: string
  type: 'real' | 'simulated'
  url: string
}

export const WALLETS: Wallet[] = [
  {
    id: 'nlwallet',
    name: 'NL Wallet',
    tag: 'Overheid',
    color: '#154273', // Rijksoverheid blauw
    description: 'De officiële NL identiteitswallet (in ontwikkeling, MinBZK).',
    type: 'simulated',
    url: 'https://edi.pleio.nl/',
  },
  {
    id: 'yivi',
    name: 'Yivi',
    tag: 'Privacy-by-design',
    color: '#004699',
    description: 'Open source, hosted in Nederland. Voorheen IRMA.',
    type: 'real',
    url: 'https://yivi.app',
  },
  {
    id: 'digidentity',
    name: 'Digidentity',
    tag: 'Commercieel · NL',
    color: '#00a8a3',
    description: 'Erkende uitgever van digitale identiteiten.',
    type: 'simulated',
    url: 'https://www.digidentity.com',
  },
  {
    id: 'datakeeper',
    name: 'Datakeeper',
    tag: 'Nieuw',
    color: '#7a4cdb',
    description: 'Wallet die data lokaal versleuteld bewaart.',
    type: 'simulated',
    url: '#',
  },
  {
    id: 'schluss',
    name: 'Schluss',
    tag: 'Coöperatief',
    color: '#f4a01c',
    description: 'Coöperatieve wallet — leden bepalen samen het beleid.',
    type: 'simulated',
    url: 'https://schluss.org',
  },
]
```

### Stap 9: Scenario-data

```typescript
// src/data/scenarios.ts
export interface Scenario {
  id: string
  icon: string
  title: string
  description: string
  tag: string
  time: string
  requester: string
  ask: string
  attributes: Array<{ label: string; source: string; value: string }>
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'age',
    icon: '🔞',
    title: 'Leeftijdscheck',
    description: 'Bewijs dat je 18+ bent zonder je geboortedatum te delen.',
    tag: 'Café · Webshop',
    time: '< 10 sec',
    requester: "Brouwerij 't IJ",
    ask: 'Bewijs dat je 18 jaar of ouder bent.',
    attributes: [{ label: 'Ouder dan 18', source: 'BRP', value: 'Ja' }],
  },
  // ... voeg de andere 4 toe zoals in de oude HTML-demo
]
```

### Stap 10: Wallet-flow modal met ADS Dialog

```tsx
// src/components/WalletFlow.tsx
import { Dialog, Heading, Paragraph, Button, ButtonGroup } from '@amsterdam/design-system-react'
import { useState } from 'react'
import type { Wallet } from '../data/wallets'
import type { Scenario } from '../data/scenarios'

interface Props {
  wallet: Wallet
  scenario: Scenario
  open: boolean
  onClose: () => void
}

export function WalletFlow({ wallet, scenario, open, onClose }: Props) {
  const [step, setStep] = useState(1)

  // Voor Yivi met type 'real': roep startYiviDummy aan in useEffect
  // Voor 'simulated': onze eigen QR/consent/success stappen

  return (
    <Dialog heading={scenario.title} open={open} onClose={onClose}>
      {step === 1 && <QRStep wallet={wallet} onNext={() => setStep(2)} />}
      {step === 2 && <ConsentStep wallet={wallet} scenario={scenario} onApprove={() => setStep(3)} />}
      {step === 3 && <SuccessStep wallet={wallet} scenario={scenario} onClose={onClose} />}
    </Dialog>
  )
}
```

### Stap 11: Lokaal draaien

```bash
npm run dev
```

Open de URL die Vite toont (meestal http://localhost:5173).

---

## 🔗 Git en GitHub

Nadat het project lokaal werkt:

```bash
cd wallet-demo
git init
git add .
git commit -m "Initial commit: wallet demo with Amsterdam Design System"
gh repo create wallet-demo --public --source=. --push
```

---

## 📚 Belangrijke documentatie om te raadplegen

| Onderwerp | URL |
|---|---|
| ADS Storybook (alle componenten + voorbeelden) | https://designsystem.amsterdam/ |
| ADS Developer Guide | https://designsystem.amsterdam/?path=/docs/docs-developer-guide-getting-started--docs |
| ADS Figma library | https://www.figma.com/community/file/1530535540611888495/ |
| Yivi frontend packages | https://github.com/privacybydesign/yivi-frontend-packages |
| Yivi documentatie | https://irma.app/docs/irma-frontend/ |
| IRMA demo attribuut-index | https://privacybydesign.foundation/attribute-index/en/irma-demo.html |
| NL Wallet repo | https://github.com/MinBZK/nl-wallet |
| NL Wallet wallet_web | https://github.com/MinBZK/nl-wallet/tree/main/wallet_web |
| Origineel di-demo | https://github.com/Amsterdam/di-demo |

---

## ✅ Acceptance criteria

De demo is af als:

1. De site draait lokaal op `npm run dev` en is gedeployed op GitHub
2. De homepage gebruikt ADS-componenten (PageHeader, Heading, Grid, etc.) — NIET eigen styling
3. Bezoeker kan 1 uit 5 wallets kiezen
4. Bezoeker kan 1 uit 5 scenario's starten
5. Voor Yivi: de officiële Yivi UI verschijnt via `yivi-frontend` (dummy mode is prima)
6. Voor de andere 4 wallets: 3-staps gesimuleerde flow (QR → consent → success)
7. Duidelijke disclaimer dat het een demo is
8. Werkt op desktop én mobiel (ADS is responsive by default)
9. Toegankelijk volgens WCAG (ADS is by default WCAG-compliant)

---

## 💡 Tips voor Claude Code

- **Begin klein:** maak eerst Stap 1-3 werkend (lege React-app met ADS-styling) voordat je verder gaat
- **Gebruik de Storybook portal actief:** voor elke component check je eerst de docs op designsystem.amsterdam
- **`@amsterdam/design-system-react` heeft TypeScript types:** je editor (VSCode/Cursor) toont alle props
- **Yivi-dummy werkt offline:** geen internet, geen backend nodig voor de Yivi-flow
- **Voor NL Wallet:** bekijk de Figma (link hierboven) om de juiste kleuren en componenten te kopiëren

Veel succes! 🚀
