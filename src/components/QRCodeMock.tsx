interface Props {
  /** Seed so the pattern is stable per wallet/scenario but varies between them. */
  seed: string
  color?: string
}

const SIZE = 25

function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function isFinderModule(x: number, y: number): boolean {
  const inBox = (bx: number, by: number) =>
    x >= bx && x < bx + 7 && y >= by && y < by + 7
  const corners = [
    [0, 0],
    [SIZE - 7, 0],
    [0, SIZE - 7],
  ]
  for (const [bx, by] of corners) {
    if (!inBox(bx, by)) continue
    const lx = x - bx
    const ly = y - by
    const onRing = lx === 0 || lx === 6 || ly === 0 || ly === 6
    const inCenter = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
    return onRing || inCenter
  }
  return false
}

function inFinderZone(x: number, y: number): boolean {
  return (
    (x < 8 && y < 8) ||
    (x >= SIZE - 8 && y < 8) ||
    (x < 8 && y >= SIZE - 8)
  )
}

/** A decorative QR-like code. Not scannable — for demo purposes only. */
export function QRCodeMock({ seed, color = '#000000' }: Props) {
  const base = hash(seed)
  const modules: { x: number; y: number }[] = []

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (inFinderZone(x, y)) {
        if (isFinderModule(x, y)) modules.push({ x, y })
        continue
      }
      const bit = hash(`${base}:${x}:${y}`) & 1
      if (bit) modules.push({ x, y })
    }
  }

  return (
    <svg
      className="wd-qr"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="QR-code (demo, niet scanbaar)"
      shapeRendering="crispEdges"
    >
      <rect x={0} y={0} width={SIZE} height={SIZE} fill="#ffffff" />
      {modules.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
      ))}
    </svg>
  )
}
