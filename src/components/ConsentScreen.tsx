import { Button, Heading, Paragraph } from '@amsterdam/design-system-react'
import type { Wallet } from '../data/wallets'
import type { Scenario } from '../data/scenarios'

interface Props {
  wallet: Wallet
  scenario: Scenario
  onApprove: () => void
  onDecline: () => void
}

export function ConsentScreen({ wallet, scenario, onApprove, onDecline }: Props) {
  return (
    <div className="wd-flow">
      <Heading level={3}>{scenario.requester} vraagt om gegevens</Heading>
      <Paragraph>{scenario.ask}</Paragraph>

      <Paragraph size="small" className="wd-muted">
        Je deelt vanuit <strong>{wallet.name}</strong>:
      </Paragraph>

      <dl className="wd-attrs">
        {scenario.attributes.map((attr) => (
          <div className="wd-attr" key={attr.label}>
            <dt className="wd-attr__label">{attr.label}</dt>
            <dd className="wd-attr__value">
              {attr.value}
              <span className="wd-attr__source">bron: {attr.source}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="wd-actions">
        <Button variant="primary" onClick={onApprove}>
          Goedkeuren en delen
        </Button>
        <Button variant="tertiary" onClick={onDecline}>
          Weigeren
        </Button>
      </div>
    </div>
  )
}
