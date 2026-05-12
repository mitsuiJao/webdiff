import { useState } from 'react'
import {
  ThemeProvider,
  BaseStyles,
  Box,
  Button,
  Label,
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
                  flexWrap: 'wrap',
                  py: 3,
                  px: 4,
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'border.default',
                }}
              >
                <Box
                  as="svg"
                  viewBox="0 0 16 16"
                  sx={{ width: 34, height: 34, fill: 'fg.default', flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M8.75 1.75a.75.75 0 0 0-1.5 0V5H4a.75.75 0 0 0 0 1.5h3.25V9.5a.75.75 0 0 0 1.5 0V6.5H12A.75.75 0 0 0 12 5H8.75V1.75ZM4 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                </Box>
                <Heading as="h1" sx={{ fontSize: 5, fontWeight: 'semibold', color: 'fg.default' }}>
                  WebDiff
                </Heading>
                <Label variant="accent" sx={{ mr: 1 }} aria-label="このアプリは無料です">
                  無料
                </Label>
                <Text sx={{ color: 'fg.muted', fontSize: 2 }}>
                  日本語対応テキスト差分比較ツール
                </Text>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton
                    aria-label="View source on GitHub"
                    unsafeDisableTooltip
                    icon={() => (
                      <svg viewBox="0 0 16 16" width="28" height="28" aria-hidden="true" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    )}
                    variant="invisible"
                    as="a"
                    href="https://github.com/mitsuiJao/webdiff"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'fg.muted', '&:hover': { color: 'fg.default' }, p: 1 }}
                  />
                  <IconButton
                    aria-label="Toggle color mode"
                    unsafeDisableTooltip
                    icon={() => colorMode === 'day' ? <MoonIcon size={28} /> : <SunIcon size={28} />}
                    variant="invisible"
                    onClick={() => setColorMode(colorMode === 'day' ? 'night' : 'day')}
                    sx={{ p: 1 }}
                  />
                </Box>
              </Box>
            </PageLayout.Header>

            <PageLayout.Content>
              <Box as="main" sx={{ p: 4, maxWidth: 1280, mx: 'auto' }}>
                <Box
                  as="section"
                  sx={{
                    mb: 4,
                    p: [3, 4],
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'border.default',
                    borderRadius: 3,
                    bg: 'accent.emphasis',
                  }}
                >
                  <Heading as="h2" sx={{ fontSize: [3, 4], color: 'fg.onEmphasis', mb: 2 }}>
                    文章・コードの変更点を、すばやく比較
                  </Heading>
                  <Text sx={{ color: 'fg.onEmphasis', fontSize: 2, lineHeight: 1.6 }}>
                    WebDiffは、2つのテキストを貼り付けるだけで追加・削除・変更箇所をわかりやすく確認できる、
                    日本語向けの無料差分比較アプリです。
                  </Text>
                </Box>

                <Box
                  as="section"
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
                    gap: 4,
                    mb: 4,
                  }}
                >
                  <CodeTextarea
                    label="比較元テキスト"
                    value={original}
                    placeholder="比較元の文章やコードを貼り付けてください"
                    onChange={setOriginal}
                  />
                  <CodeTextarea
                    label="比較後テキスト"
                    value={modified}
                    placeholder="比較後の文章やコードを貼り付けてください"
                    onChange={setModified}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button variant="primary" onClick={handleCompare} size="large">
                    比較する
                  </Button>
                  <Button variant="default" onClick={handleClear} size="large">
                    クリア
                  </Button>
                </Box>

                <Box as="section" sx={{ mb: 4 }}>
                  <Heading as="h2" sx={{ fontSize: 3, mb: 2 }}>
                    使い方
                  </Heading>
                  <Text as="p" sx={{ color: 'fg.muted', lineHeight: 1.7 }}>
                    左に比較元、右に比較後のテキストを入力して「比較する」を押すと、差分結果が表示されます。
                    左右表示と統合表示を切り替えて、レビュー目的に合わせて確認できます。
                  </Text>
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
