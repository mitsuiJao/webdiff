import { Box, Text } from '@primer/react'
import { type Change } from 'diff'

interface Props {
  changes: Change[]
}

interface LineEntry {
  leftNo: number | null
  rightNo: number | null
  prefix: '+' | '-' | ' '
  text: string
  type: 'added' | 'removed' | 'unchanged'
}

function buildUnifiedLines(changes: Change[]): LineEntry[] {
  const entries: LineEntry[] = []
  let leftNo = 1
  let rightNo = 1

  for (const change of changes) {
    const lines = change.value.split('\n')
    if (lines[lines.length - 1] === '') lines.pop()

    if (change.removed) {
      for (const line of lines) {
        entries.push({ leftNo: leftNo++, rightNo: null, prefix: '-', text: line, type: 'removed' })
      }
    } else if (change.added) {
      for (const line of lines) {
        entries.push({ leftNo: null, rightNo: rightNo++, prefix: '+', text: line, type: 'added' })
      }
    } else {
      for (const line of lines) {
        entries.push({ leftNo: leftNo++, rightNo: rightNo++, prefix: ' ', text: line, type: 'unchanged' })
      }
    }
  }

  return entries
}

const rowBg = {
  added: 'diffBlob.addition.bg',
  removed: 'diffBlob.deletion.bg',
  unchanged: 'canvas.default',
}

const lineNoBg = {
  added: 'diffBlob.addition.numBg',
  removed: 'diffBlob.deletion.numBg',
  unchanged: 'canvas.subtle',
}

const prefixColor = {
  added: 'success.fg',
  removed: 'danger.fg',
  unchanged: 'fg.muted',
}

export default function UnifiedView({ changes }: Props) {
  const lines = buildUnifiedLines(changes)

  return (
    <Box sx={{ overflow: 'auto' }}>
      {lines.map((entry, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            fontFamily: 'mono',
            fontSize: 2,
            lineHeight: '20px',
            bg: rowBg[entry.type],
            minHeight: '20px',
          }}
        >
          <Box
            sx={{
              minWidth: 48,
              px: 2,
              textAlign: 'right',
              color: 'fg.muted',
              userSelect: 'none',
              bg: lineNoBg[entry.type],
              borderRightWidth: 1,
              borderRightStyle: 'solid',
              borderRightColor: 'border.muted',
              flexShrink: 0,
            }}
          >
            {entry.leftNo ?? ''}
          </Box>
          <Box
            sx={{
              minWidth: 48,
              px: 2,
              textAlign: 'right',
              color: 'fg.muted',
              userSelect: 'none',
              bg: lineNoBg[entry.type],
              borderRightWidth: 1,
              borderRightStyle: 'solid',
              borderRightColor: 'border.muted',
              flexShrink: 0,
            }}
          >
            {entry.rightNo ?? ''}
          </Box>
          <Box
            sx={{
              width: 24,
              textAlign: 'center',
              color: prefixColor[entry.type],
              fontWeight: 'semibold',
              userSelect: 'none',
              flexShrink: 0,
            }}
          >
            {entry.prefix}
          </Box>
          <Box sx={{ px: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>
            <Text>{entry.text || ' '}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
