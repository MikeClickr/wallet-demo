export interface DisclosedAttribute {
  label: string
  source: string
  value: string
}

export interface Scenario {
  id: string
  icon: string
  title: string
  description: string
  tag: string
  time: string
  /** The party asking for the data. */
  requester: string
  /** The request shown on the consent screen. */
  ask: string
  attributes: DisclosedAttribute[]
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
  {
    id: 'gemeente',
    icon: '🏛️',
    title: 'Inloggen bij de gemeente',
    description: 'Log veilig in op Mijn Amsterdam om je gegevens te bekijken.',
    tag: 'Mijn Amsterdam',
    time: '< 15 sec',
    requester: 'Gemeente Amsterdam',
    ask: 'Log in om je persoonlijke gegevens te bekijken.',
    attributes: [
      { label: 'Burgerservicenummer', source: 'BRP', value: '••••••789' },
      { label: 'Naam', source: 'BRP', value: 'J. de Vries' },
    ],
  },
  {
    id: 'address',
    icon: '📦',
    title: 'Adres delen',
    description: 'Deel je bezorgadres met een webshop voor je pakket.',
    tag: 'Webshop · Bezorging',
    time: '< 15 sec',
    requester: 'PostNL',
    ask: 'Deel je bezorgadres voor de levering van je pakket.',
    attributes: [
      { label: 'Straat en huisnummer', source: 'BRP', value: 'Nieuwezijds Voorburgwal 147' },
      { label: 'Postcode', source: 'BRP', value: '1012 RJ' },
      { label: 'Plaats', source: 'BRP', value: 'Amsterdam' },
    ],
  },
  {
    id: 'diploma',
    icon: '🎓',
    title: 'Diploma delen',
    description: 'Bewijs je opleidingsniveau bij een sollicitatie (bron: DUO).',
    tag: 'Sollicitatie',
    time: '< 20 sec',
    requester: 'TechCorp B.V.',
    ask: 'Bewijs je opleidingsniveau voor je sollicitatie.',
    attributes: [
      { label: 'Diploma', source: 'DUO', value: 'WO Master' },
      { label: 'Opleiding', source: 'DUO', value: 'Informatica' },
      { label: 'Instelling', source: 'DUO', value: 'Universiteit van Amsterdam' },
    ],
  },
  {
    id: 'income',
    icon: '💶',
    title: 'Jaarinkomen tonen',
    description: 'Toon je jaarinkomen voor een sociale huurwoning (bron: Belastingdienst).',
    tag: 'Huurwoning',
    time: '< 20 sec',
    requester: 'Woningcorporatie Ymere',
    ask: 'Toon je jaarinkomen om in aanmerking te komen voor een sociale huurwoning.',
    attributes: [
      { label: 'Jaarinkomen', source: 'Belastingdienst', value: '€ 34.500' },
      { label: 'Peiljaar', source: 'Belastingdienst', value: '2024' },
    ],
  },
]
