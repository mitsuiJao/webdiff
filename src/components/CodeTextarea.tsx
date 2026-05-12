import { useState, useRef } from 'react'
import { Box, Text, IconButton } from '@primer/react'
import { PlusIcon, DashIcon, CopyIcon, CheckIcon } from '@primer/octicons-react'

interface Props {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const MIN_SIZE = 10
const MAX_SIZE = 24

export default function CodeTextarea({ label, value, placeholder, onChange }: Props) {
  const [fontSize, setFontSize] = useState(13)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Text as="label" sx={{ fontSize: 1, fontWeight: 'semibold', color: 'fg.default', mr: 'auto' }}>
          {label}
        </Text>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            bg: 'canvas.subtle',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'border.default',
            borderRadius: 2,
            px: '3px',
            py: '2px',
          }}
        >
          <IconButton
            aria-label="Decrease font size"
            icon={DashIcon}
            size="small"
            variant="invisible"
            disabled={fontSize <= MIN_SIZE}
            onClick={() => setFontSize((s) => Math.max(MIN_SIZE, s - 1))}
            sx={{ color: 'fg.muted' }}
          />
          <Text
            sx={{
              fontSize: '11px',
              color: 'fg.muted',
              minWidth: 28,
              textAlign: 'center',
              userSelect: 'none',
              fontFamily: 'mono',
            }}
          >
            {fontSize}
          </Text>
          <IconButton
            aria-label="Increase font size"
            icon={PlusIcon}
            size="small"
            variant="invisible"
            disabled={fontSize >= MAX_SIZE}
            onClick={() => setFontSize((s) => Math.min(MAX_SIZE, s + 1))}
            sx={{ color: 'fg.muted' }}
          />
        </Box>

        <IconButton
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          icon={copied ? CheckIcon : CopyIcon}
          size="small"
          variant="invisible"
          onClick={handleCopy}
          sx={{ color: copied ? 'success.fg' : 'fg.muted' }}
        />
      </Box>

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
          ref={textareaRef}
          as="textarea"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={14}
          aria-label={`${label} text`}
          sx={{
            width: '100%',
            resize: 'vertical',
            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
            fontSize: `${fontSize}px`,
            lineHeight: '1.6',
            p: 2,
            boxSizing: 'border-box',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'fg.default',
            '::placeholder': { color: 'fg.subtle' },
          }}
        />
      </Box>
    </Box>
  )
}
