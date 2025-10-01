// Medical Design Tokens for AI Symptom Checker
// Professional medical webapp design system based on healthcare industry standards

export const medicalDesignTokens = {
  // Medical Color Palette
  colors: {
    // Primary medical blues - trustworthy and professional
    medical: {
      primary: '#0066CC',    // Medical blue
      secondary: '#2E86AB',  // Calming blue
      tertiary: '#1E40AF',   // Deep professional blue
    },
    
    // Clinical background colors
    clinical: {
      white: '#FFFFFF',      // Pure clinical white
      background: '#F8F9FA', // Soft clinical background
      surface: '#FFFFFF',    // Clean surface white
      border: '#E9ECEF',     // Subtle clinical borders
    },
    
    // Healthcare accent colors
    healthcare: {
      success: '#28A745',    // Medical green
      warning: '#FFC107',    // Clinical warning
      error: '#DC3545',      // Medical emergency red
      info: '#17A2B8',       // Healthcare teal
    },
    
    // Text and content
    text: {
      primary: '#212529',    // Professional dark text
      secondary: '#6C757D',  // Muted professional text
      muted: '#ADB5BD',      // Light muted text
      inverse: '#FFFFFF',    // White text for dark backgrounds
    },
  },

  // Clean Medical Card Styles (no gradients)
  cards: {
    primary: 'bg-white border border-gray-200 shadow-sm rounded-lg',
    elevated: 'bg-white border border-gray-200 shadow-md rounded-lg',
    clinical: 'bg-white border border-blue-100 shadow-sm rounded-lg',
    emergency: 'bg-red-50 border border-red-200 shadow-sm rounded-lg',
    success: 'bg-green-50 border border-green-200 shadow-sm rounded-lg',
    info: 'bg-blue-50 border border-blue-200 shadow-sm rounded-lg',
  },

  // Medical Professional Buttons
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 border border-blue-600',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg shadow-sm transition-colors duration-200 border border-gray-300',
    success: 'bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 border border-green-600',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 border border-amber-600',
    emergency: 'bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 border border-red-600',
    ghost: 'bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors duration-200',
    outline: 'bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-medium rounded-lg border border-blue-600 transition-colors duration-200',
  },

  // Medical Icon Containers
  iconContainers: {
    primary: 'p-3 rounded-lg bg-blue-100 text-blue-600',
    secondary: 'p-3 rounded-lg bg-gray-100 text-gray-600',
    success: 'p-3 rounded-lg bg-green-100 text-green-600',
    warning: 'p-3 rounded-lg bg-amber-100 text-amber-600',
    emergency: 'p-3 rounded-lg bg-red-100 text-red-600',
    info: 'p-3 rounded-lg bg-blue-100 text-blue-600',
    clinical: 'p-3 rounded-lg bg-white border border-gray-200 text-gray-600 shadow-sm',
  },

  // Medical Typography - clean and professional
  typography: {
    h1: 'text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight',
    h2: 'text-2xl md:text-3xl font-semibold text-gray-900 leading-tight tracking-tight',
    h3: 'text-xl md:text-2xl font-semibold text-gray-900 leading-tight',
    h4: 'text-lg md:text-xl font-medium text-gray-900 leading-tight',
    body: 'text-base text-gray-700 leading-relaxed',
    bodySecondary: 'text-sm text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500 leading-normal',
    label: 'text-sm font-medium text-gray-700',
    button: 'text-sm font-medium leading-none',
    medical: 'font-mono text-sm text-gray-800', // For medical data/codes
  },

  // Subtle Medical Animations - professional and calming
  animations: {
    fadeIn: 'animate-in fade-in duration-300',
    slideIn: 'animate-in slide-in-from-bottom-2 duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200',
    transition: 'transition-all duration-200 ease-in-out',
    hover: 'hover:shadow-md transition-all duration-200',
    clinical: 'transition-colors duration-200 ease-in-out',
  },

  // Medical Spacing System
  spacing: {
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
    container: 'max-w-5xl mx-auto px-6',
    containerSmall: 'max-w-3xl mx-auto px-6',
    section: 'space-y-6',
    clinical: 'space-y-4', // Tighter spacing for clinical forms
  },

  // Medical Form Elements
  forms: {
    input: 'w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base transition-colors duration-200 bg-white',
    textarea: 'w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base resize-none transition-colors duration-200 bg-white',
    select: 'w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-base transition-colors duration-200 bg-white',
    radio: 'w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2',
    checkbox: 'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    helperText: 'text-sm text-gray-500 mt-1',
    error: 'text-sm text-red-600 mt-1',
    fieldset: 'border border-gray-200 rounded-lg p-4 bg-gray-50',
    legend: 'text-sm font-medium text-gray-900 px-2',
  },

  // Medical Progress Elements
  progress: {
    bar: 'w-full bg-gray-200 rounded-full h-2 overflow-hidden',
    fill: 'h-full bg-blue-500 rounded-full transition-all duration-500 ease-out',
    ring: 'w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin',
    step: 'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium',
    stepActive: 'bg-blue-600 border-blue-600 text-white',
    stepCompleted: 'bg-green-600 border-green-600 text-white',
    stepPending: 'bg-white border-gray-300 text-gray-500',
  },

  // Medical Alert Styles - clinical and clear
  alerts: {
    info: 'bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800',
    success: 'bg-green-50 border border-green-200 rounded-lg p-4 text-green-800',
    warning: 'bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800',
    error: 'bg-red-50 border border-red-200 rounded-lg p-4 text-red-800',
    emergency: 'bg-red-100 border-2 border-red-300 rounded-lg p-6 text-red-900 shadow-md',
    clinical: 'bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800',
  },

  // Medical Badge Styles
  badges: {
    severity: {
      low: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
      moderate: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800',
      high: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
      emergency: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-200 text-red-900',
    },
    status: {
      completed: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
      inProgress: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
      pending: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
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