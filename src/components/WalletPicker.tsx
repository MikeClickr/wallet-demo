import type { CSSProperties } from 'react'
import { Badge, Grid, Heading } from '@amsterdam/design-system-react'
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

      {WALLETS.map((wallet) => {
        const selected = wallet.id === selectedId
        return (
          <Grid.Cell key={wallet.id} span={{ narrow: 4, medium: 4, wide: 4 }}>
            <button
              type="button"
              className={`wd-wallet${selected ? ' wd-wallet--selected' : ''}`}
              style={{ '--wd-accent': wallet.color } as CSSProperties}
              aria-pressed={selected}
              onClick={() => onSelect(wallet.id)}
            >
              <span className="wd-wallet__top">
                <span className="wd-wallet__name">{wallet.name}</span>
                <Badge color={wallet.badgeColor} label={wallet.tag} />
              </span>
              <span className="wd-wallet__desc">{wallet.description}</span>
              {wallet.type === 'real' && (
                <span className="wd-wallet__real">● Echte Yivi-integratie</span>
              )}
            </button>
          </Grid.Cell>
        )
      })}
    </Grid>
  )
}
