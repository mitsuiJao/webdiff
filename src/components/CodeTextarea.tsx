import { useState } from 'react'
import { Box, Text, IconButton } from '@primer/react'
import { CopyIcon, CheckIcon } from '@primer/octicons-react'

interface Props {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function CodeTextarea({ label, value, placeholder, onChange }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Text as="label" sx={{ fontSize: 2, fontWeight: 'semibold', color: 'fg.default', mr: 'auto' }}>
          {label}
        </Text>
        <IconButton
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          icon={copied ? CheckIcon : CopyIcon}
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
            fontSize: '14px',
            lineHeight: '1.6',
            p: 3,
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
