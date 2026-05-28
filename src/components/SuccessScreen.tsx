import { Button, Heading, Paragraph } from '@amsterdam/design-system-react'
import type { Wallet } from '../data/wallets'
import type { Scenario } from '../data/scenarios'

interface Props {
  wallet: Wallet
  scenario: Scenario
  onClose: () => void
}

export function SuccessScreen({ wallet, scenario, onClose }: Props) {
  return (
    <div className="wd-flow wd-flow--centered">
      <span className="wd-check" aria-hidden="true">
        ✓
      </span>
      <Heading level={3}>Gelukt!</Heading>
      <Paragraph>
        Je hebt met <strong>{wallet.name}</strong> gedeeld met {scenario.requester}.
      </Paragraph>

      <ul className="wd-shared">
        {scenario.attributes.map((attr) => (
          <li key={attr.label}>
            <strong>{attr.label}:</strong> {attr.value}
          </li>
        ))}
      </ul>

      <Paragraph size="small" className="wd-muted">
        Alleen deze gegevens zijn gedeeld — niets meer.
      </Paragraph>

      <div className="wd-actions">
        <Button variant="primary" onClick={onClose}>
          Sluiten
        </Button>
      </div>
    </div>
  )
}
