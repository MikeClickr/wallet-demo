export type BadgeColor =
  | 'azure'
  | 'lime'
  | 'magenta'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'

export interface Wallet {
  id: string
  name: string
  tag: string
  /** ADS Badge colour for the tag. */
  badgeColor: BadgeColor
  /** Brand accent colour, used for the wallet card and mock QR. */
  color: string
  description: string
  /** 'real' uses the official Yivi frontend (dummy mode); 'simulated' uses the mock flow. */
  type: 'real' | 'simulated'
  url: string
}

export const WALLETS: Wallet[] = [
  {
    id: 'nlwallet',
    name: 'NL Wallet',
    tag: 'Overheid',
    badgeColor: 'azure',
    color: '#154273',
    description: 'De officiële NL identiteitswallet (in ontwikkeling, MinBZK).',
    type: 'simulated',
    url: 'https://edi.pleio.nl/',
  },
  {
    id: 'yivi',
    name: 'Yivi',
    tag: 'Privacy-by-design',
    badgeColor: 'azure',
    color: '#004699',
    description: 'Open source, gehost in Nederland. Voorheen IRMA.',
    type: 'real',
    url: 'https://yivi.app',
  },
  {
    id: 'digidentity',
    name: 'Digidentity',
    tag: 'Commercieel · NL',
    badgeColor: 'lime',
    color: '#00a8a3',
    description: 'Erkende uitgever van digitale identiteiten.',
    type: 'simulated',
    url: 'https://www.digidentity.com',
  },
  {
    id: 'datakeeper',
    name: 'Datakeeper',
    tag: 'Nieuw',
    badgeColor: 'purple',
    color: '#7a4cdb',
    description: 'Wallet die data lokaal versleuteld bewaart.',
    type: 'simulated',
    url: '#',
  },
  {
    id: 'schluss',
    name: 'Schluss',
    tag: 'Coöperatief',
    badgeColor: 'orange',
    color: '#f4a01c',
    description: 'Coöperatieve wallet — leden bepalen samen het beleid.',
    type: 'simulated',
    url: 'https://schluss.org',
  },
]
