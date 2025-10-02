// Medical Design Tokens for AI Symptom Checker
// Professional medical webapp design system based on healthcare industry standards

export const medicalDesignTokens = {
  // Medical Color Palette - Clinical & Professional
  colors: {
    // Primary medical blues - Research-backed trustworthy colors used in healthcare
    medical: {
      primary: '#2563EB',     // Primary medical blue (accessible)
      secondary: '#1D4ED8',   // Deep professional blue  
      tertiary: '#1E40AF',    // Dark professional blue
      light: '#3B82F6',       // Light medical blue
      surface: '#EFF6FF',     // Light blue surface
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
      info: '#0EA5E9',        // Healthcare information blue
      infoLight: '#0284C7',   // Dark info blue
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
  },

  // Medical Professional Card Styles - Clean, clinical, no gradients
  cards: {
    primary: 'bg-white border border-slate-200 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200',
    elevated: 'bg-white border border-slate-200 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200',
    clinical: 'bg-white border border-blue-100 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200',
    emergency: 'bg-red-50 border-2 border-red-200 shadow-sm rounded-lg',
    success: 'bg-emerald-50 border border-emerald-200 shadow-sm rounded-lg',
    info: 'bg-blue-50 border border-blue-200 shadow-sm rounded-lg',
    warning: 'bg-amber-50 border border-amber-200 shadow-sm rounded-lg',
    neutral: 'bg-slate-50 border border-slate-200 shadow-sm rounded-lg',
    interactive: 'bg-white border border-slate-200 shadow-sm rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer',
  },

  // Medical Professional Buttons - Hospital-grade styling
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none',
    secondary: 'bg-white hover:bg-slate-50 focus:bg-slate-50 text-slate-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-slate-300 focus:ring-2 focus:ring-slate-200 focus:outline-none',
    success: 'bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-emerald-600 focus:ring-2 focus:ring-emerald-200 focus:outline-none',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-amber-600 focus:ring-2 focus:ring-amber-200 focus:outline-none',
    emergency: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-red-600 focus:ring-2 focus:ring-red-200 focus:outline-none',
    ghost: 'bg-transparent hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-slate-200 focus:outline-none',
    outline: 'bg-white hover:bg-blue-50 focus:bg-blue-50 text-blue-600 hover:text-blue-700 font-medium rounded-lg border border-blue-600 hover:border-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:outline-none',
    disabled: 'bg-slate-100 text-slate-400 font-medium rounded-lg shadow-sm border border-slate-200 cursor-not-allowed',
  },

  // Medical Icon Containers - Professional medical styling
  iconContainers: {
    primary: 'p-3 rounded-lg bg-blue-100 text-blue-700 shadow-sm',
    secondary: 'p-3 rounded-lg bg-slate-100 text-slate-700 shadow-sm',
    success: 'p-3 rounded-lg bg-emerald-100 text-emerald-700 shadow-sm',
    warning: 'p-3 rounded-lg bg-amber-100 text-amber-700 shadow-sm',
    emergency: 'p-4 rounded-lg bg-red-100 text-red-700 shadow-md border border-red-200',
    info: 'p-3 rounded-lg bg-blue-100 text-blue-700 shadow-sm',
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
    link: 'text-blue-600 hover:text-blue-700 underline font-medium transition-colors duration-200',
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
    focus: 'focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200',
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
    input: 'w-full px-4 py-3 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base transition-all duration-200 bg-white placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500',
    inputError: 'w-full px-4 py-3 border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg text-base transition-all duration-200 bg-white placeholder:text-slate-400',
    inputSuccess: 'w-full px-4 py-3 border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-lg text-base transition-all duration-200 bg-white',
    
    // Textarea styling
    textarea: 'w-full px-4 py-3 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base resize-none transition-all duration-200 bg-white placeholder:text-slate-400 disabled:bg-slate-50',
    
    // Select styling
    select: 'w-full px-4 py-3 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base transition-all duration-200 bg-white disabled:bg-slate-50',
    
    // Radio and checkbox styling
    radio: 'w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-2 transition-colors duration-200',
    checkbox: 'w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200',
    
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
    fill: 'h-full bg-blue-500 rounded-full transition-all duration-500 ease-out',
    fillSuccess: 'h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out',
    fillWarning: 'h-full bg-amber-500 rounded-full transition-all duration-500 ease-out',
    
    // Loading spinners - Medical grade
    ring: 'w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin',
    ringLarge: 'w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin',
    ringSmall: 'w-4 h-4 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin',
    
    // Medical loading states
    loading: 'flex items-center justify-center space-x-2 text-sm text-gray-600',
    loadingDot: 'w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse',
    loadingText: 'text-sm font-medium text-gray-700',
    
    // Step indicators
    step: 'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200',
    stepActive: 'bg-blue-600 border-blue-600 text-white shadow-sm',
    stepCompleted: 'bg-emerald-600 border-emerald-600 text-white shadow-sm',
    stepPending: 'bg-white border-slate-300 text-slate-500',
    stepError: 'bg-red-600 border-red-600 text-white shadow-sm',
  },

  // Medical Alert Styles - Clear, accessible, professional
  alerts: {
    // Standard alerts
    info: 'bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 shadow-sm',
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
    dismissible: 'relative bg-blue-50 border border-blue-200 rounded-lg p-4 pr-12 text-blue-800 shadow-sm',
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
      inProgress: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200',
      pending: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200',
      cancelled: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200',
      draft: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200',
    },
    
    // Medical specific badges
    medical: {
      urgent: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200',
      routine: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200',
      followUp: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200',
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