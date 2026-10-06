'use client'

import type { ElementType } from 'react'
import { useSite } from '@/lib/site-context'
import { ImageField } from './image-field'
import { TextField } from './text-field'

interface BoundTextProps {
  k: string
  as?: ElementType
  className?: string
  label: string
  multiline?: boolean
  max?: number
}

function BoundText({ k, label, ...rest }: BoundTextProps) {
  const { text, setText } = useSite()
  return <TextField {...rest} label={label} value={text(k)} onCommit={(v) => setText(k, v)} />
}

function BoundImage({ k, className, label }: { k: string; className?: string; label: string }) {
  const { image, setImage } = useSite()
  return <ImageField className={className} label={label} value={image(k)} onCommit={(v) => setImage(k, v)} />
}

function Logo({ className }: { className?: string }) {
  const { site, setLogo } = useSite()
  return <ImageField className={className} label="Loqo" fit="contain" value={site.logo} onCommit={setLogo} />
}

export const Editable = { Text: BoundText, Image: BoundImage, Logo }
export { ImageField, TextField }
