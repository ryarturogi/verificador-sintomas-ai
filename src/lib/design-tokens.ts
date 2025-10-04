// Modern Medical Design System for AI Symptom Checker
// Professional medical webapp design system inspired by modern web design trends (2024)
// Combines medical professionalism with contemporary UX/UI patterns

export const medicalDesignTokens = {
  // Modern Medical Color Palette - 2024 Design Trends
  colors: {
    // Primary medical turquoise cyans - Contemporary professional palette
    medical: {
      primary: '#0891B2',     // Primary turquoise cyan (accessible)
      secondary: '#0E7490',   // Deep turquoise cyan  
      tertiary: '#155E75',    // Dark turquoise cyan
      light: '#22D3EE',       // Light turquoise cyan
      surface: '#F0FDFA',     // Light turquoise surface
      50: '#F0FDFA',          // Ultra light turquoise
      100: '#CCFBF1',         // Very light turquoise
      500: '#14B8A6',         // Standard turquoise
      600: '#0891B2',         // Primary turquoise
      700: '#0E7490',         // Dark turquoise
      900: '#134E4A',         // Very dark turquoise
    },
    
    // Clinical whites and neutrals - Hospital-grade clean aesthetics
    clinical: {
      white: '#FFFFFF',       // Pure clinical white
      background: '#FAFBFC',  // Soft clinical background
      surface: '#F8FAFC',     // Clean surface
      border: '#E2E8F0',      // Professional border gray
      subtle: '#F1F5F9',      // Subtle background
    },
    
    // Healthcare system colors - Medical standard colors
    healthcare: {
      success: '#059669',     // Medical green (darker, professional)
      successLight: '#047857', // Dark medical green
      warning: '#D97706',     // Clinical amber/orange
      warningLight: '#F59E0B', // Bright warning
      error: '#DC2626',       // Emergency red
      errorLight: '#B91C1C',  // Dark emergency red
      info: '#0EA5E9',        // Healthcare information cyan
      infoLight: '#0284C7',   // Dark info cyan
    },
    
    // Professional text hierarchy
    text: {
      primary: '#1F2937',     // Professional dark text (high contrast)
      secondary: '#4B5563',   // Secondary professional text
      tertiary: '#6B7280',    // Tertiary muted text
      muted: '#9CA3AF',       // Light muted text
      inverse: '#FFFFFF',     // White text for dark backgrounds
      accent: '#2563EB',      // Accent text color
    },
    
    // Medical severity indicators
    severity: {
      low: '#10B981',         // Low severity green
      moderate: '#F59E0B',    // Moderate severity amber
      high: '#EF4444',        // High severity red
      critical: '#DC2626',    // Critical severity dark red
    },

    // Modern gradients - 2024 Design Trends
    gradients: {
      primary: 'bg-gradient-to-br from-cyan-50 via-white to-cyan-50',
      clinical: 'bg-gradient-to-r from-slate-50 to-cyan-50',
      emergency: 'bg-gradient-to-br from-red-50 via-orange-50 to-red-100',
      success: 'bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50',
      hero: 'bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800',
      heroLight: 'bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
      glassCyan: 'bg-cyan-50/80 backdrop-blur-sm border border-cyan-100/50',
    },

    // Modern shadows and effects
    effects: {
      shadow: {
        soft: 'shadow-sm',
        medium: 'shadow-md',
        large: 'shadow-lg shadow-slate-200/50',
        xl: 'shadow-xl shadow-slate-200/60',
        colored: 'shadow-lg shadow-cyan-500/10',
        emergency: 'shadow-lg shadow-red-500/20',
      },
      glow: {
        cyan: 'shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-500/25',
        green: 'shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-500/25',
        red: 'shadow-lg shadow-red-500/25 ring-1 ring-red-500/25',
      },
      glassmorphism: 'backdrop-blur-md bg-white/30 border border-white/20 shadow-xl',
    },
  },

  // Modern Medical Card Styles - Contemporary design with subtle depth
  cards: {
    // Standard cards with modern styling
    primary: 'bg-white border border-slate-200/60 shadow-sm rounded-xl hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300',
    elevated: 'bg-white border border-slate-200/60 shadow-lg shadow-slate-200/40 rounded-xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300',
    clinical: 'bg-white border border-cyan-100/80 shadow-sm rounded-xl hover:shadow-lg hover:shadow-cyan-200/20 transition-all duration-300',
    
    // Status-based cards with modern gradients
    emergency: 'bg-gradient-to-br from-red-50 to-red-100/80 border border-red-200/80 shadow-lg shadow-red-200/30 rounded-xl',
    success: 'bg-gradient-to-br from-emerald-50 to-green-50/80 border border-emerald-200/80 shadow-lg shadow-emerald-200/20 rounded-xl',
    info: 'bg-gradient-to-br from-cyan-50 to-cyan-100/80 border border-cyan-200/80 shadow-lg shadow-cyan-200/20 rounded-xl',
    warning: 'bg-gradient-to-br from-amber-50 to-orange-50/80 border border-amber-200/80 shadow-lg shadow-amber-200/20 rounded-xl',
    neutral: 'bg-gradient-to-br from-slate-50 to-gray-50/80 border border-slate-200/80 shadow-sm rounded-xl',
    
    // Interactive states with modern hover effects
    interactive: 'bg-white border border-slate-200/60 shadow-sm rounded-xl hover:border-cyan-300/80 hover:shadow-lg hover:shadow-cyan-200/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer',
    
    // Glass morphism variants
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl',
    glassCyan: 'bg-cyan-50/80 backdrop-blur-sm border border-cyan-100/50 shadow-xl rounded-xl',
    
    // Featured cards with enhanced styling
    featured: 'bg-gradient-to-br from-white via-cyan-50/30 to-cyan-100/50 border border-cyan-200/50 shadow-xl shadow-cyan-200/30 rounded-2xl hover:shadow-2xl hover:shadow-cyan-200/40 transition-all duration-500',
    hero: 'bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 text-white border-0 shadow-2xl shadow-cyan-500/30 rounded-2xl hover:shadow-3xl hover:shadow-cyan-500/40 transition-all duration-500',
  },

  // Modern Medical Buttons - Contemporary styling with micro-interactions
  buttons: {
    // Primary buttons with modern gradients and hover states
    primary: 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 focus:from-cyan-700 focus:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 border-0 focus:ring-2 focus:ring-cyan-300 focus:outline-none',
    
    // Secondary buttons with glass morphism
    secondary: 'bg-white/80 backdrop-blur-sm hover:bg-white focus:bg-white text-slate-900 font-semibold rounded-xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300 border border-slate-200/60 focus:ring-2 focus:ring-slate-300 focus:outline-none',
    
    // Status buttons with enhanced styling
    success: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:from-emerald-700 focus:to-green-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 border-0 focus:ring-2 focus:ring-emerald-300 focus:outline-none',
    
    warning: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:from-amber-700 focus:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 border-0 focus:ring-2 focus:ring-amber-300 focus:outline-none',
    
    emergency: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:from-red-700 focus:to-red-800 text-white font-bold rounded-xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 border-0 focus:ring-2 focus:ring-red-300 focus:outline-none animate-pulse',
    
    // Modern variants
    ghost: 'bg-transparent hover:bg-slate-100/80 focus:bg-slate-100/80 text-slate-700 hover:text-slate-900 font-semibold rounded-xl hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-slate-200 focus:outline-none',
    
    outline: 'bg-white/50 backdrop-blur-sm hover:bg-cyan-50/80 focus:bg-cyan-50/80 text-cyan-600 hover:text-cyan-700 font-semibold rounded-xl border border-cyan-300/60 hover:border-cyan-400/80 shadow-sm hover:shadow-lg hover:shadow-cyan-200/20 hover:-translate-y-0.5 transition-all duration-300 focus:ring-2 focus:ring-cyan-200 focus:outline-none',
    
    // Glass morphism button
    glass: 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-slate-900 font-semibold rounded-xl border border-white/30 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:outline-none',
    
    disabled: 'bg-slate-100 text-slate-400 font-medium rounded-xl shadow-sm border border-slate-200 cursor-not-allowed opacity-60',
  },

    // Medical Icon Containers - Professional medical styling
  iconContainers: {
    primary: 'p-3 rounded-lg bg-cyan-100 text-cyan-700 shadow-sm',
    secondary: 'p-3 rounded-lg bg-slate-100 text-slate-700 shadow-sm',
    success: 'p-3 rounded-lg bg-emerald-100 text-emerald-700 shadow-sm',
    warning: 'p-3 rounded-lg bg-amber-100 text-amber-700 shadow-sm',
    emergency: 'p-4 rounded-lg bg-red-100 text-red-700 shadow-md border border-red-200',
    info: 'p-3 rounded-lg bg-cyan-100 text-cyan-700 shadow-sm',
    clinical: 'p-3 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm',
    large: 'p-4 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-md',
  },

  // Medical Typography - Professional, accessible, highly readable
  typography: {
    // Headers - Clean, professional hierarchy
    h1: 'text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight font-sans',
    h2: 'text-2xl md:text-3xl font-semibold text-slate-900 leading-tight tracking-tight font-sans',
    h3: 'text-xl md:text-2xl font-semibold text-slate-900 leading-tight font-sans',
    h4: 'text-lg md:text-xl font-medium text-slate-900 leading-tight font-sans',
    h5: 'text-base md:text-lg font-medium text-slate-900 leading-tight font-sans',
    
    // Body text - High readability for medical content
    body: 'text-base text-slate-700 leading-relaxed font-sans',
    bodyLarge: 'text-lg text-slate-700 leading-relaxed font-sans',
    bodySecondary: 'text-sm text-slate-600 leading-relaxed font-sans',
    bodySmall: 'text-sm text-slate-700 leading-normal font-sans',
    
    // Specialized text
    caption: 'text-sm text-slate-500 leading-normal font-sans',
    label: 'text-sm font-medium text-slate-700 font-sans',
    button: 'text-sm font-medium leading-none font-sans',
    medical: 'font-mono text-sm text-slate-800 bg-slate-50 px-2 py-1 rounded border', // For medical codes/data
    emphasis: 'text-base font-semibold text-slate-900 font-sans',
    
    // Interactive elements
    link: 'text-cyan-600 hover:text-cyan-700 underline font-medium transition-colors duration-200',
    linkSecondary: 'text-slate-600 hover:text-slate-900 underline transition-colors duration-200',
  },

  // Professional Medical Animations - Subtle, calming, accessibility-friendly
  animations: {
    // Gentle fade animations
    fadeIn: 'animate-in fade-in duration-300 ease-out',
    fadeOut: 'animate-out fade-out duration-200 ease-in',
    slideIn: 'animate-in slide-in-from-bottom-2 duration-300 ease-out',
    slideOut: 'animate-out slide-out-to-bottom-2 duration-200 ease-in',
    scaleIn: 'animate-in zoom-in-95 duration-200 ease-out',
    
    // Smooth transitions for medical interfaces
    transition: 'transition-all duration-200 ease-in-out',
    transitionFast: 'transition-all duration-150 ease-in-out',
    transitionSlow: 'transition-all duration-300 ease-in-out',
    hover: 'hover:shadow-md transition-all duration-200 ease-in-out',
    focus: 'focus-within:ring-2 focus-within:ring-cyan-200 transition-all duration-200',
    clinical: 'transition-colors duration-200 ease-in-out',
    
    // Loading states
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },

  // Medical Spacing System - Consistent, professional spacing
  spacing: {
    // Padding variants
    xs: 'p-3',
    sm: 'p-4', 
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
    
    // Container variants for different contexts
    container: 'max-w-5xl mx-auto px-4 sm:px-6',
    containerSmall: 'max-w-3xl mx-auto px-4 sm:px-6',
    containerLarge: 'max-w-7xl mx-auto px-4 sm:px-6',
    containerNarrow: 'max-w-2xl mx-auto px-4 sm:px-6',
    
    // Vertical spacing for content sections
    section: 'space-y-6',
    sectionLarge: 'space-y-8',
    clinical: 'space-y-4', // Tighter spacing for clinical forms
    compact: 'space-y-2',
    
    // Margins
    marginSection: 'my-8',
    marginBlock: 'my-6',
    marginSmall: 'my-4',
  },

  // Medical Form Elements - Hospital-grade accessibility and usability
  forms: {
    // Input styling
    input: 'w-full px-4 py-3 border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-lg text-base transition-all duration-200 bg-white placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500',
    inputError: 'w-full px-4 py-3 border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg text-base transition-all duration-200 bg-white placeholder:text-slate-400',
    inputSuccess: 'w-full px-4 py-3 border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-lg text-base transition-all duration-200 bg-white',
    
    // Textarea styling
    textarea: 'w-full px-4 py-3 border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-lg text-base resize-none transition-all duration-200 bg-white placeholder:text-slate-400 disabled:bg-slate-50',
    
    // Select styling
    select: 'w-full px-4 py-3 border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-lg text-base transition-all duration-200 bg-white disabled:bg-slate-50',
    
    // Radio and checkbox styling
    radio: 'w-4 h-4 text-cyan-600 border-slate-300 focus:ring-cyan-500 focus:ring-2 transition-colors duration-200',
    checkbox: 'w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2 transition-colors duration-200',
    
    // Labels and text
    label: 'block text-sm font-medium text-slate-700 mb-2',
    labelRequired: 'block text-sm font-medium text-slate-700 mb-2 after:content-["*"] after:text-red-500 after:ml-1',
    helperText: 'text-sm text-slate-500 mt-1',
    error: 'text-sm text-red-600 mt-1 font-medium',
    success: 'text-sm text-emerald-600 mt-1 font-medium',
    
    // Fieldsets and groupings
    fieldset: 'border border-slate-200 rounded-lg p-4 bg-slate-50',
    legend: 'text-sm font-medium text-slate-900 px-2 bg-white',
    formGroup: 'space-y-4',
    formRow: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  },

  // Medical Progress Elements - Professional progress indicators
  progress: {
    // Progress bars
    bar: 'w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner',
    barLarge: 'w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner',
    fill: 'h-full bg-cyan-500 rounded-full transition-all duration-500 ease-out',
    fillSuccess: 'h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out',
    fillWarning: 'h-full bg-amber-500 rounded-full transition-all duration-500 ease-out',
    
    // Loading spinners - Medical grade
    ring: 'w-6 h-6 border-2 border-slate-200 border-t-cyan-600 rounded-full animate-spin',
    ringLarge: 'w-8 h-8 border-2 border-slate-200 border-t-cyan-600 rounded-full animate-spin',
    ringSmall: 'w-4 h-4 border-2 border-slate-200 border-t-cyan-600 rounded-full animate-spin',
    
    // Medical loading states
    loading: 'flex items-center justify-center space-x-2 text-sm text-gray-600',
    loadingDot: 'w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse',
    loadingText: 'text-sm font-medium text-gray-700',
    
    // Step indicators
    step: 'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200',
    stepActive: 'bg-cyan-600 border-cyan-600 text-white shadow-sm',
    stepCompleted: 'bg-emerald-600 border-emerald-600 text-white shadow-sm',
    stepPending: 'bg-white border-slate-300 text-slate-500',
    stepError: 'bg-red-600 border-red-600 text-white shadow-sm',
  },

  // Medical Alert Styles - Clear, accessible, professional
  alerts: {
    // Standard alerts
    info: 'bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-cyan-800 shadow-sm',
    success: 'bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 shadow-sm',
    warning: 'bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 shadow-sm',
    error: 'bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 shadow-sm',
    
    // Critical medical alerts
    emergency: 'bg-red-100 border-2 border-red-300 rounded-lg p-6 text-red-900 shadow-md',
    critical: 'bg-red-200 border-2 border-red-400 rounded-lg p-6 text-red-900 shadow-lg animate-pulse',
    
    // Clinical contexts
    clinical: 'bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800 shadow-sm',
    neutral: 'bg-white border border-slate-200 rounded-lg p-4 text-slate-700 shadow-sm',
    
    // Dismissible variants
    dismissible: 'relative bg-cyan-50 border border-cyan-200 rounded-lg p-4 pr-12 text-cyan-800 shadow-sm',
  },

  // Medical Badge Styles - Professional status indicators
  badges: {
    // Severity indicators
    severity: {
      low: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200',
      moderate: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200',
      high: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200',
      critical: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-900 border border-red-300 shadow-sm',
      emergency: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white border border-red-700 shadow-md',
    },
    
    // Status indicators
    status: {
      completed: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200',
      inProgress: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 border border-cyan-200',
      pending: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200',
      cancelled: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200',
      draft: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200',
    },
    
    // Medical specific badges
    medical: {
      urgent: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200',
      routine: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200',
      followUp: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700 border border-cyan-200',
    },
  },
}

// Helper function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Medical Theme Variants for different clinical contexts
export const medicalThemeVariants = {
  // Patient Portal / Homepage
  portal: {
    background: 'min-h-screen bg-gray-50',
    container: medicalDesignTokens.spacing.container,
    card: medicalDesignTokens.cards.primary,
    accent: medicalDesignTokens.colors.medical.primary,
  },
  
  // Clinical Assessment / Questionnaire
  assessment: {
    background: 'min-h-screen bg-white',
    container: medicalDesignTokens.spacing.containerSmall,
    card: medicalDesignTokens.cards.clinical,
    accent: medicalDesignTokens.colors.medical.secondary,
  },
  
  // Medical Results / Report
  results: {
    background: 'min-h-screen bg-gray-50',
    container: medicalDesignTokens.spacing.container,
    card: medicalDesignTokens.cards.elevated,
    accent: medicalDesignTokens.colors.healthcare.success,
  },
  
  // Emergency / Critical
  emergency: {
    background: 'min-h-screen bg-red-50',
    container: medicalDesignTokens.spacing.containerSmall,
    card: medicalDesignTokens.cards.emergency,
    accent: medicalDesignTokens.colors.healthcare.error,
  },
  
  // Clinical Dashboard
  dashboard: {
    background: 'min-h-screen bg-white',
    container: 'max-w-7xl mx-auto px-6',
    card: medicalDesignTokens.cards.primary,
    accent: medicalDesignTokens.colors.medical.primary,
  },
}

// Medical Icon Categories for consistent medical iconography
export const medicalIcons = {
  // Core medical symbols
  medical: {
    stethoscope: '🩺',
    heartbeat: '💓', 
    thermometer: '🌡️',
    pill: '💊',
    syringe: '💉',
    medicalCross: '⚕️',
  },
  
  // Body systems
  body: {
    heart: '❤️',
    brain: '🧠',
    lungs: '🫁',
    stomach: '🤢',
    eye: '👁️',
    ear: '👂',
  },
  
  // Severity indicators
  severity: {
    low: '🟢',
    moderate: '🟡', 
    high: '🟠',
    emergency: '🔴',
    critical: '⚠️',
  },
  
  // Assessment states
  status: {
    completed: '✅',
    inProgress: '⏳',
    pending: '⏸️',
    alert: '🚨',
    info: 'ℹ️',
  },
}

// Export both new medical tokens and legacy tokens for backward compatibility
export const designTokens = medicalDesignTokens // Alias for backward compatibility
export { medicalDesignTokens as default }