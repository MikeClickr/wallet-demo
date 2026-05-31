import { Grid, Heading, Paragraph } from '@amsterdam/design-system-react'
import { SCENARIOS } from '../data/scenarios'
import type { Wallet } from '../data/wallets'
import { ScenarioCard } from './ScenarioCard'

interface Props {
  wallet: Wallet
  onStart: (scenarioId: string) => void
}

export function ScenarioGrid({ wallet, onStart }: Props) {
  return (
    <Grid paddingVertical="large" gapVertical="large">
      <Grid.Cell span="all">
        <Heading level={2}>2. Start een scenario</Heading>
        <Paragraph>
          Je doorloopt het scenario met <strong>{wallet.name}</strong>. Kies hierboven een andere
          wallet om te wisselen.
        </Paragraph>
      </Grid.Cell>

      <Grid.Cell span="all">
        <div className="wd-card-grid">
          {SCENARIOS.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onStart={() => onStart(scenario.id)}
            />
          ))}
        </div>
      </Grid.Cell>
    </Grid>
  )
}
