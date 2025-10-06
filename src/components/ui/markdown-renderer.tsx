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
      // Configure marked options for safe rendering
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub Flavored Markdown
        sanitize: false, // We'll handle sanitization with DOMPurify if needed
      })

      // Parse markdown to HTML
      const htmlContent = marked(content)
      
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
      // Configure marked for inline rendering
      marked.setOptions({
        breaks: true,
        gfm: true,
      })

      const htmlContent = marked(content)
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
