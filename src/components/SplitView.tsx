import { Box, Text } from '@primer/react'
import { type Change } from 'diff'

interface Props {
  changes: Change[]
}

interface LineEntry {
  lineNo: number | null
  text: string
  type: 'added' | 'removed' | 'unchanged'
}

function buildSplitLines(changes: Change[]): { left: LineEntry[]; right: LineEntry[] } {
  const left: LineEntry[] = []
  const right: LineEntry[] = []
  let leftNo = 1
  let rightNo = 1

  for (const change of changes) {
    const lines = change.value.split('\n')
    if (lines[lines.length - 1] === '') lines.pop()

    if (change.removed) {
      for (const line of lines) {
        left.push({ lineNo: leftNo++, text: line, type: 'removed' })
        right.push({ lineNo: null, text: '', type: 'removed' })
      }
    } else if (change.added) {
      for (const line of lines) {
        left.push({ lineNo: null, text: '', type: 'added' })
        right.push({ lineNo: rightNo++, text: line, type: 'added' })
      }
    } else {
      for (const line of lines) {
        left.push({ lineNo: leftNo++, text: line, type: 'unchanged' })
        right.push({ lineNo: rightNo++, text: line, type: 'unchanged' })
      }
    }
  }

  return { left, right }
}

const bgColor = {
  added: 'diffBlob.addition.bg',
  removed: 'diffBlob.deletion.bg',
  unchanged: 'canvas.default',
}

const lineNoBg = {
  added: 'diffBlob.addition.numBg',
  removed: 'diffBlob.deletion.numBg',
  unchanged: 'canvas.subtle',
}

function LineCell({ entry }: { entry: LineEntry }) {
  return (
    <Box
      sx={{
        display: 'flex',
        fontFamily: 'mono',
        fontSize: 0,
        lineHeight: '20px',
        bg: bgColor[entry.type],
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
        {entry.lineNo ?? ''}
      </Box>
      <Box sx={{ px: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>
        <Text>{entry.text || ' '}</Text>
      </Box>
    </Box>
  )
}

export default function SplitView({ changes }: Props) {
  const { left, right } = buildSplitLines(changes)

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'auto' }}>
      <Box
        sx={{
          borderRightWidth: 1,
          borderRightStyle: 'solid',
          borderRightColor: 'border.muted',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 1,
            bg: 'canvas.subtle',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'border.muted',
          }}
        >
          <Text sx={{ fontSize: 0, fontWeight: 'semibold', color: 'fg.muted' }}>Original</Text>
        </Box>
        {left.map((entry, i) => (
          <LineCell key={i} entry={entry} />
        ))}
      </Box>
      <Box sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            px: 3,
            py: 1,
            bg: 'canvas.subtle',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'border.muted',
          }}
        >
          <Text sx={{ fontSize: 0, fontWeight: 'semibold', color: 'fg.muted' }}>Modified</Text>
        </Box>
        {right.map((entry, i) => (
          <LineCell key={i} entry={entry} />
        ))}
      </Box>
    </Box>
  )
}
