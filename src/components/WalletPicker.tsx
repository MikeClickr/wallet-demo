import type { CSSProperties } from 'react'
import { Badge, Grid, Heading, Icon } from '@amsterdam/design-system-react'
import { CheckMarkCircleIcon } from '@amsterdam/design-system-react-icons'
import { WALLETS } from '../data/wallets'

interface Props {
  selectedId: string
  onSelect: (id: string) => void
}

export function WalletPicker({ selectedId, onSelect }: Props) {
  return (
    <Grid paddingVertical="large" gapVertical="large">
      <Grid.Cell span="all">
        <Heading level={2}>1. Kies een wallet</Heading>
      </Grid.Cell>

      <Grid.Cell span="all">
        <div className="wd-card-grid">
          {WALLETS.map((wallet) => {
            const selected = wallet.id === selectedId
            return (
              <button
                key={wallet.id}
                type="button"
                className={`wd-card wd-card--wallet${selected ? ' wd-card--selected' : ''}`}
                style={{ '--wd-accent': wallet.color } as CSSProperties}
                aria-pressed={selected}
                onClick={() => onSelect(wallet.id)}
              >
                <span className="wd-card__top">
                  <span className="wd-card__title">{wallet.name}</span>
                  <Badge color={wallet.badgeColor} label={wallet.tag} />
                </span>
                <span className="wd-card__desc">{wallet.description}</span>
                {wallet.type === 'real' && (
                  <span className="wd-card__real">
                    <Icon svg={CheckMarkCircleIcon} size="small" />
                    Echte Yivi-integratie
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Grid.Cell>
    </Grid>
  )
}
