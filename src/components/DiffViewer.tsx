import { useState } from 'react'
import { Box, SegmentedControl, Text, Heading } from '@primer/react'
import { CheckCircleFillIcon } from '@primer/octicons-react'
import { type Change } from 'diff'
import SplitView from './SplitView'
import UnifiedView from './UnifiedView'

interface Props {
  changes: Change[]
}

export default function DiffViewer({ changes }: Props) {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split')

  const hasChanges = changes.some((c) => c.added || c.removed)

  return (
    <Box
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          bg: 'canvas.subtle',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'border.default',
        }}
      >
        <Text sx={{ fontSize: 1, fontWeight: 'semibold', color: 'fg.default' }}>
          Diff Results
        </Text>
        <SegmentedControl
          aria-label="View mode"
          onChange={(i) => setViewMode(i === 0 ? 'split' : 'unified')}
        >
          <SegmentedControl.Button selected={viewMode === 'split'}>Split</SegmentedControl.Button>
          <SegmentedControl.Button selected={viewMode === 'unified'}>Unified</SegmentedControl.Button>
        </SegmentedControl>
      </Box>

      {!hasChanges ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 6,
            gap: 2,
            color: 'fg.muted',
          }}
        >
          <Box sx={{ color: 'success.fg' }}>
            <CheckCircleFillIcon size={32} />
          </Box>
          <Heading as="h3" sx={{ fontSize: 2 }}>No differences found</Heading>
          <Text sx={{ fontSize: 1 }}>The two texts are identical.</Text>
        </Box>
      ) : viewMode === 'split' ? (
        <SplitView changes={changes} />
      ) : (
        <UnifiedView changes={changes} />
      )}
    </Box>
  )
}
