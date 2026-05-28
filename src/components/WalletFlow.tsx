import { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Heading, Paragraph } from '@amsterdam/design-system-react'
import type { Wallet } from '../data/wallets'
import type { Scenario } from '../data/scenarios'
import { startYiviDummy } from '../wallets/yivi'
import { QRCodeMock } from './QRCodeMock'
import { ConsentScreen } from './ConsentScreen'
import { SuccessScreen } from './SuccessScreen'

export const FLOW_DIALOG_ID = 'wallet-flow'
const YIVI_ELEMENT_ID = 'yivi-web-form'

type Step = 'qr' | 'consent' | 'success'

interface Props {
  wallet: Wallet
  scenario: Scenario | null
  onClose: () => void
}

export function WalletFlow({ wallet, scenario, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState<Step>('qr')

  // Reset to the first step whenever a new scenario is opened (or it closes).
  useEffect(() => {
    setStep('qr')
  }, [scenario?.id])

  // Forward the native dialog's close event (X button / Escape) to the parent.
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = () => onClose()
    el.addEventListener('close', handler)
    return () => el.removeEventListener('close', handler)
  }, [onClose])

  // Real Yivi flow: run the official frontend in dummy mode on the QR step.
  const isYivi = wallet.type === 'real'
  useEffect(() => {
    if (!scenario || !isYivi || step !== 'qr') return
    let cancelled = false
    const controller = startYiviDummy(`#${YIVI_ELEMENT_ID}`, scenario)
    controller.promise
      .then(() => {
        if (!cancelled) setStep('success')
      })
      .catch(() => {
        /* aborted or cancelled — leave the dialog as-is */
      })
    return () => {
      cancelled = true
      controller.abort()
      const host = document.getElementById(YIVI_ELEMENT_ID)
      if (host) host.innerHTML = ''
    }
  }, [scenario, isYivi, step])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <Dialog
      ref={dialogRef}
      id={FLOW_DIALOG_ID}
      heading={scenario ? scenario.title : 'Demo'}
      closeButtonLabel="Sluiten"
    >
      {scenario && (
        <>
          {step === 'qr' && isYivi && (
            <div className="wd-flow">
              <Paragraph>
                Scan de QR-code met de <strong>Yivi-app</strong> om in te loggen. Dit is de
                officiële Yivi-flow in demo-modus.
              </Paragraph>
              <div id={YIVI_ELEMENT_ID} className="wd-yivi" />
            </div>
          )}

          {step === 'qr' && !isYivi && (
            <div className="wd-flow wd-flow--centered">
              <Heading level={3}>Scan met {wallet.name}</Heading>
              <Paragraph>Open de {wallet.name}-app op je telefoon en scan de QR-code.</Paragraph>
              <QRCodeMock seed={`${wallet.id}:${scenario.id}`} color={wallet.color} />
              <div className="wd-actions">
                <Button variant="primary" onClick={() => setStep('consent')}>
                  Ik heb gescand
                </Button>
                <Button variant="tertiary" onClick={closeDialog}>
                  Annuleren
                </Button>
              </div>
            </div>
          )}

          {step === 'consent' && (
            <ConsentScreen
              wallet={wallet}
              scenario={scenario}
              onApprove={() => setStep('success')}
              onDecline={closeDialog}
            />
          )}

          {step === 'success' && (
            <SuccessScreen wallet={wallet} scenario={scenario} onClose={closeDialog} />
          )}
        </>
      )}
    </Dialog>
  )
}
