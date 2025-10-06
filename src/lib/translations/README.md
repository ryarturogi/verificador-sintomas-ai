# Translation System

This directory contains all the translation files for the VitalCheck application. The system supports multiple languages and is designed to be easily extensible.

## Current Languages

- **English** (`en.ts`) - Default language
- **Spanish** (`es.ts`) - Spanish translations

## Adding New Languages

To add a new language (e.g., French):

1. **Create the translation file:**
   ```bash
   cp src/lib/translations/en.ts src/lib/translations/fr.ts
   ```

2. **Update the language index:**
   ```typescript
   // src/lib/translations/index.ts
   export { en } from './en'
   export { es } from './es'
   export { fr } from './fr' // Add new language
   ```

3. **Update the language context:**
   ```typescript
   // src/contexts/language-context.tsx
   const languages = {
     en: { name: 'English', flag: '🇺🇸' },
     es: { name: 'Español', flag: '🇪🇸' },
     fr: { name: 'Français', flag: '🇫🇷' } // Add new language
   }
   ```

4. **Translate all strings:**
   - Replace all English strings with French translations
   - Maintain the same structure and keys
   - Keep technical terms consistent

## Translation Guidelines

### Key Principles
- **Consistency**: Use consistent terminology across all translations
- **Context**: Consider medical context when translating medical terms
- **Cultural Adaptation**: Adapt content to local cultural norms
- **Technical Terms**: Keep medical and technical terms in their original language when appropriate

### Medical Terms
- Keep some medical terms in English (e.g., "HIPAA", "AI")
- Translate user-facing terms to local language
- Maintain consistency with local medical terminology

### UI Elements
- Keep button text concise and clear
- Maintain consistent tone across all translations
- Consider text length for UI layout

## File Structure

```
src/lib/translations/
├── index.ts          # Export all languages
├── types.ts          # TypeScript types
├── en.ts             # English translations
├── es.ts             # Spanish translations
└── README.md         # This file
```

## Usage in Components

```typescript
import { useTranslations } from '@/contexts/language-context'

function MyComponent() {
  const { t } = useTranslations()
  
  return (
    <div>
      <h1>{t.homepage.title}</h1>
      <p>{t.homepage.subtitle}</p>
    </div>
  )
}
```

## Testing Translations

1. **Switch languages** in the application
2. **Check all UI elements** are translated
3. **Verify text length** doesn't break layouts
4. **Test medical terminology** accuracy
5. **Validate cultural appropriateness**

## Future Languages

Planned languages for future implementation:
- French (Français)
- German (Deutsch)
- Portuguese (Português)
- Italian (Italiano)
- Chinese (中文)
- Japanese (日本語)
- Arabic (العربية)

## Contributing

When adding new translations:
1. Follow the existing structure
2. Maintain type safety
3. Test thoroughly
4. Consider cultural context
5. Update this README with new language information
