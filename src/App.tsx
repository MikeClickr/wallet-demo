import { useCallback, useState } from 'react'
import {
  Alert,
  Grid,
  Heading,
  Page,
  PageFooter,
  PageHeader,
  Paragraph,
  Dialog,
} from '@amsterdam/design-system-react'
import { WALLETS } from './data/wallets'
import { SCENARIOS } from './data/scenarios'
import { WalletPicker } from './components/WalletPicker'
import { ScenarioGrid } from './components/ScenarioGrid'
import { WalletFlow, FLOW_DIALOG_ID } from './components/WalletFlow'

export function App() {
  const [selectedWalletId, setSelectedWalletId] = useState(WALLETS[0].id)
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null)

  const selectedWallet = WALLETS.find((wallet) => wallet.id === selectedWalletId) ?? WALLETS[0]
  const activeScenario = SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ?? null

  const startScenario = useCallback((scenarioId: string) => {
    setActiveScenarioId(scenarioId)
    Dialog.open(`#${FLOW_DIALOG_ID}`)
  }, [])

  const closeFlow = useCallback(() => setActiveScenarioId(null), [])

  return (
    <Page>
      <PageHeader
        brandName="Probeer ID Wallets"
        logoLink="/"
        logoLinkTitle="Naar de homepage"
        menuItems={
          <>
            <PageHeader.MenuLink href="#wallets">Wallets</PageHeader.MenuLink>
            <PageHeader.MenuLink href="#scenarios">Scenario&rsquo;s</PageHeader.MenuLink>
            <PageHeader.MenuLink href="#over">Over</PageHeader.MenuLink>
          </>
        }
      />

      <main>
        <Grid paddingVertical="large" gapVertical="large">
          <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }}>
            <Heading level={1}>Jouw data, jouw keuze</Heading>
            <Paragraph size="large">
              Probeer 5 digitale identiteits-wallets uit met 5 echte scenario&rsquo;s. Kies een
              wallet, start een scenario en ervaar hoe je precies deelt wat nodig is — niet meer.
            </Paragraph>
          </Grid.Cell>
          <Grid.Cell span="all">
            <Alert severity="warning" heading="Dit is een demo" headingLevel={2}>
              <Paragraph>
                Deze website is een demonstratie. Er worden geen echte persoonsgegevens
                uitgewisseld. De Yivi-flow draait in dummy-modus; de andere wallets zijn nagebootst.
              </Paragraph>
            </Alert>
          </Grid.Cell>
        </Grid>

        <section id="wallets">
          <WalletPicker selectedId={selectedWalletId} onSelect={setSelectedWalletId} />
        </section>

        <section id="scenarios">
          <ScenarioGrid wallet={selectedWallet} onStart={startScenario} />
        </section>

        <section id="over">
          <Grid paddingVertical="large">
            <Grid.Cell span={{ narrow: 4, medium: 8, wide: 8 }}>
              <Heading level={2}>Over deze demo</Heading>
              <Paragraph>
                Een digitale identiteitswallet laat je zelf bepalen welke gegevens je deelt, met wie
                en waarvoor. In plaats van een kopie van je paspoort op te sturen, deel je alleen het
                specifieke kenmerk dat nodig is — bijvoorbeeld &ldquo;ouder dan 18&rdquo; in plaats
                van je volledige geboortedatum. Deze demo gebruikt het Amsterdam Design System voor
                de vormgeving en de officiële Yivi-frontend voor de Yivi-flow.
              </Paragraph>
            </Grid.Cell>
          </Grid>
        </section>
      </main>

      <PageFooter>
        <Grid paddingVertical="large">
          <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
            <PageFooter.Menu heading="Over deze demo">
              <PageFooter.MenuLink href="https://designsystem.amsterdam/">
                Amsterdam Design System
              </PageFooter.MenuLink>
              <PageFooter.MenuLink href="https://yivi.app">Yivi</PageFooter.MenuLink>
            </PageFooter.Menu>
          </Grid.Cell>
          <Grid.Cell span={{ narrow: 4, medium: 4, wide: 6 }}>
            <Paragraph size="small" color="inverse">
              Demo — geen echte gegevensuitwisseling.
            </Paragraph>
          </Grid.Cell>
        </Grid>
      </PageFooter>

      <WalletFlow wallet={selectedWallet} scenario={activeScenario} onClose={closeFlow} />
    </Page>
  )
}
