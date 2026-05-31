import { Icon, Paragraph } from '@amsterdam/design-system-react'
import {
  BuildingIcon,
  ClockIcon,
  DocumentIcon,
  EuroIcon,
  GraduateHatIcon,
  MapMarkerIcon,
  PersonIcon,
} from '@amsterdam/design-system-react-icons'
import type { Scenario } from '../data/scenarios'

interface Props {
  scenario: Scenario
  onStart: () => void
}

const SCENARIO_ICONS: Record<string, typeof PersonIcon> = {
  age: PersonIcon,
  gemeente: BuildingIcon,
  address: MapMarkerIcon,
  diploma: GraduateHatIcon,
  income: EuroIcon,
}

export function ScenarioCard({ scenario, onStart }: Props) {
  const ScenarioIcon = SCENARIO_ICONS[scenario.id] ?? DocumentIcon
  return (
    <button type="button" className="wd-card wd-card--scenario" onClick={onStart}>
      <span className="wd-card__icon" aria-hidden="true">
        <Icon svg={ScenarioIcon} size="heading-1" />
      </span>
      <span className="wd-card__title">{scenario.title}</span>
      <span className="wd-card__tagline">{scenario.tag}</span>
      <Paragraph className="wd-card__desc">{scenario.description}</Paragraph>
      <span className="wd-card__meta">
        <Icon svg={ClockIcon} size="small" />
        {scenario.time}
      </span>
    </button>
  )
}
