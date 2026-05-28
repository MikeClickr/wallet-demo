import { Card, Paragraph } from '@amsterdam/design-system-react'
import type { Scenario } from '../data/scenarios'

interface Props {
  scenario: Scenario
  onStart: () => void
}

export function ScenarioCard({ scenario, onStart }: Props) {
  return (
    <Card className="wd-scenario">
      <span className="wd-scenario__icon" aria-hidden="true">
        {scenario.icon}
      </span>
      <Card.HeadingGroup tagline={scenario.tag}>
        <Card.Heading level={3}>
          <Card.Link
            href="#"
            onClick={(event) => {
              event.preventDefault()
              onStart()
            }}
          >
            {scenario.title}
          </Card.Link>
        </Card.Heading>
      </Card.HeadingGroup>
      <Paragraph>{scenario.description}</Paragraph>
      <Paragraph size="small" className="wd-muted">
        ⏱ {scenario.time}
      </Paragraph>
    </Card>
  )
}
