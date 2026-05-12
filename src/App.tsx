import { useState } from 'react'
import { Box, Button, FormControl, Textarea, Heading, Text, PageLayout } from '@primer/react'
import { diffLines, type Change } from 'diff'
import DiffViewer from './components/DiffViewer'

export default function App() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diffResult, setDiffResult] = useState<Change[] | null>(null)

  const handleCompare = () => {
    const result = diffLines(original, modified, { newlineIsToken: false })
    setDiffResult(result)
  }

  const handleClear = () => {
    setOriginal('')
    setModified('')
    setDiffResult(null)
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 3,
            px: 3,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: 'border.default',
          }}
        >
          <Box
            as="svg"
            viewBox="0 0 16 16"
            sx={{ width: 24, height: 24, fill: 'fg.default' }}
            aria-hidden="true"
          >
            <path d="M8.75 1.75a.75.75 0 0 0-1.5 0V5H4a.75.75 0 0 0 0 1.5h3.25V9.5a.75.75 0 0 0 1.5 0V6.5H12A.75.75 0 0 0 12 5H8.75V1.75ZM4 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </Box>
          <Heading as="h1" sx={{ fontSize: 3, fontWeight: 'semibold', color: 'fg.default' }}>
            WebDiff
          </Heading>
          <Text sx={{ color: 'fg.muted', fontSize: 1, ml: 1 }}>Text Comparison Tool</Text>
        </Box>
      </PageLayout.Header>

      <PageLayout.Content>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
              gap: 3,
              mb: 3,
            }}
          >
            <FormControl>
              <FormControl.Label>
                <Text sx={{ fontWeight: 'semibold' }}>Original</Text>
              </FormControl.Label>
              <Textarea
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="元のテキストをここに貼り付けてください..."
                rows={14}
                sx={{
                  fontFamily: 'mono',
                  fontSize: 0,
                  width: '100%',
                  resize: 'vertical',
                }}
                aria-label="Original text"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>
                <Text sx={{ fontWeight: 'semibold' }}>Modified</Text>
              </FormControl.Label>
              <Textarea
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                placeholder="変更後のテキストをここに貼り付けてください..."
                rows={14}
                sx={{
                  fontFamily: 'mono',
                  fontSize: 0,
                  width: '100%',
                  resize: 'vertical',
                }}
                aria-label="Modified text"
              />
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="primary" onClick={handleCompare} size="large">
              Compare
            </Button>
            <Button variant="default" onClick={handleClear} size="large">
              Clear
            </Button>
          </Box>

          {diffResult !== null && <DiffViewer changes={diffResult} />}
        </Box>
      </PageLayout.Content>
    </PageLayout>
  )
}
