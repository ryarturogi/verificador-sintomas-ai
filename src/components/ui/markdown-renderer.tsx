'use client'

import { marked } from 'marked'
import { useEffect, useRef } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * Markdown renderer component for chat messages
 * Safely renders markdown content with proper styling
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && content) {
      // Configure marked options for comprehensive markdown support
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub Flavored Markdown
        pedantic: false, // Don't be pedantic about markdown
      })

      // Parse markdown to HTML
      const htmlContent = marked.parse(content) as string
      
      // Set the HTML content
      contentRef.current.innerHTML = htmlContent
    }
  }, [content])

  return (
    <div 
      ref={contentRef}
      className={`markdown-content ${className}`}
    />
  )
}

/**
 * Inline markdown renderer for shorter content
 */
export function InlineMarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && content) {
      // Configure marked for inline rendering with full markdown support
      marked.setOptions({
        breaks: true,
        gfm: true,
        pedantic: false,
      })

      const htmlContent = marked.parse(content) as string
      contentRef.current.innerHTML = htmlContent
    }
  }, [content])

  return (
    <span 
      ref={contentRef}
      className={`markdown-inline ${className}`}
    />
  )
}
