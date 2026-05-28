import { YiviCore } from '@privacybydesign/yivi-core'
import { YiviWeb } from '@privacybydesign/yivi-web'
import { YiviDummy } from '@privacybydesign/yivi-dummy'
import type { Scenario } from '../data/scenarios'

export interface YiviController {
  promise: Promise<unknown>
  abort: () => void
}

/**
 * Runs the real Yivi web frontend in dummy mode (no backend) inside `element`.
 * The yivi-dummy plugin drives the state machine through the happy path:
 * loading → QR code → "app connected" → success.
 */
export function startYiviDummy(element: string, scenario: Scenario | null): YiviController {
  const yivi = new YiviCore({
    debugging: false,
    element,
    language: 'nl',
    dummy: 'happy path',
    qrPayload: {
      u: `demo-${scenario?.id ?? 'session'}`,
      irmaqr: 'disclosing',
    },
    successPayload: { disclosed: scenario?.attributes ?? [] },
    timing: { start: 700, prepare: 700, scan: 2200, app: 1400, pairing: 500 },
  })

  yivi.use(YiviWeb)
  yivi.use(YiviDummy)

  const promise = yivi.start()

  return {
    promise,
    abort: () => {
      try {
        yivi.abort()
      } catch {
        /* already finished or aborted */
      }
    },
  }
}
