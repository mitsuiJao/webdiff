import { useState } from 'react'
import {
  ThemeProvider,
  BaseStyles,
  Box,
  Button,
  IconButton,
  Heading,
  Text,
  PageLayout,
} from '@primer/react'
import { SunIcon, MoonIcon } from '@primer/octicons-react'
import { diffLines, type Change } from 'diff'
import DiffViewer from './components/DiffViewer'
import CodeTextarea from './components/CodeTextarea'

type ColorMode = 'day' | 'night'

export default function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('day')
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diffResult, setDiffResult] = useState<Change[] | null>(null)

  const handleCompare = () => {
    setDiffResult(diffLines(original, modified, { newlineIsToken: false }))
  }

  const handleClear = () => {
    setOriginal('')
    setModified('')
    setDiffResult(null)
  }

  return (
    <ThemeProvider colorMode={colorMode}>
      <BaseStyles>
        <Box sx={{ bg: 'canvas.default', minHeight: '100vh' }}>
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
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    aria-label="View source on GitHub"
                    icon={() => (
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    )}
                    variant="invisible"
                    as="a"
                    href="https://github.com/mitsuiJao/webdiff"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'fg.muted', '&:hover': { color: 'fg.default' } }}
                  />
                  <IconButton
                    aria-label={colorMode === 'day' ? 'Switch to dark mode' : 'Switch to light mode'}
                    icon={colorMode === 'day' ? MoonIcon : SunIcon}
                    variant="invisible"
                    onClick={() => setColorMode(colorMode === 'day' ? 'night' : 'day')}
                  />
                </Box>
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
                  <CodeTextarea
                    label="Original"
                    value={original}
                    placeholder="元のテキストをここに貼り付けてください..."
                    onChange={setOriginal}
                  />
                  <CodeTextarea
                    label="Modified"
                    value={modified}
                    placeholder="変更後のテキストをここに貼り付けてください..."
                    onChange={setModified}
                  />
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
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}
