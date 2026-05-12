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

type ColorMode = 'day' | 'night'

const codeTextarea: React.CSSProperties = {
  width: '100%',
  resize: 'vertical',
  fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
  fontSize: '13px',
  lineHeight: '1.6',
  padding: '12px',
  boxSizing: 'border-box',
  border: '1px solid',
  borderRadius: '6px',
  outline: 'none',
  background: 'transparent',
}

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
                <Box sx={{ ml: 'auto' }}>
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
                  {(['Original', 'Modified'] as const).map((label) => {
                    const isOriginal = label === 'Original'
                    return (
                      <Box key={label} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Text as="label" sx={{ fontSize: 1, fontWeight: 'semibold', color: 'fg.default' }}>
                          {label}
                        </Text>
                        <Box
                          sx={{
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'border.default',
                            borderRadius: 2,
                            bg: 'canvas.subtle',
                            overflow: 'hidden',
                            '&:focus-within': {
                              borderColor: 'accent.fg',
                              boxShadow: 'inset 0 0 0 1px var(--color-accent-fg)',
                            },
                          }}
                        >
                          <Box
                            as="textarea"
                            value={isOriginal ? original : modified}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                              isOriginal ? setOriginal(e.target.value) : setModified(e.target.value)
                            }
                            placeholder={isOriginal ? '元のテキストをここに貼り付けてください...' : '変更後のテキストをここに貼り付けてください...'}
                            rows={14}
                            aria-label={`${label} text`}
                            sx={{
                              ...codeTextarea,
                              color: 'fg.default',
                              borderColor: 'transparent',
                              '::placeholder': { color: 'fg.subtle' },
                            }}
                          />
                        </Box>
                      </Box>
                    )
                  })}
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
