export type Language = 'en' | 'es'

export interface Translations {
  // Header and Navigation
  title: string
  subtitle: string
  switchLanguage: string
  
  // Navigation
  navigation: {
    home: string
    questionnaires: string
    symptoms: string
    medicalAI: string
    help: string
    search: string
    popularSymptoms: string
  }
  
  // Homepage
  homepage: {
    mainTitle: string
    mainSubtitle: string
    searchPlaceholder: string
    assessButton: string
    startQuestionnaire: string
    advancedTechnology: string
    intelligentQuestionnaires: string
    dynamicDescription: string
    footerDisclaimer: string
    consultProfessionals: string
    emergencyAssessment: string
    emergencyDescription: string
    medicalAccuracy: string
    aiPowered: string
    hipaaCompliant: string
    medicalGrade: string
    accuracyRate: string
    assessments: string
    available: string
    users: string
    accuracy: string
    startAssessment: string
    describeYourSymptoms: string
    startMedicalAssessment: string
    startMedicalAssessmentDescription: string
    emergencyTags: {
      emergency: string
      critical: string
      immediate: string
    }
  }
  
  // Health Topics
  healthTopics: {
    physicalSymptoms: string
    physicalDescription: string
    mentalWellness: string
    mentalDescription: string
    cardiacSymptoms: string
    cardiacDescription: string
    guidedAssessment: string
    guidedDescription: string
    generalCheckup: string
    generalDescription: string
    aiAssessments: string
    aiDescription: string
    tags: {
      pain: string
      fever: string
      fatigue: string
      anxiety: string
      mood: string
      stress: string
      chest: string
      palpitations: string
      pressure: string
      ai: string
      personalized: string
      adaptive: string
      prevention: string
      complete: string
      wellness: string
    }
  }
  
  // Medical Disclaimer
  medicalDisclaimer: {
    title: string
    subtitle: string
    readFullDisclaimer: string
    notMedicalDiagnosis: string
    emergencySituations: string
    professionalAdvice: string
    privacyData: string
    limitations: string
    acknowledgment: string
    quickDisclaimer: string
    modalTitle: string
    modalSubtitle: string
    accept: string
    decline: string
    scrollToContinue: string
    declinedMessage: string
    declinedTitle: string
  }
  
  // Emergency
  emergency: {
    alert: string
    immediateAction: string
    call911: string
    findER: string
    message: string
    doNotDelay: string
    emergencyActions: string
    callEmergencyServices: string
    goToNearestER: string
    defaultMessage: string
    alertGenerated: string
  }
  
  // Questionnaire
  questionnaire: {
    preparing: string
    analyzing: string
    generating: string
    completed: string
    step: string
    of: string
    complete: string
    continue: string
    processing: string
    checkingDatabases: string
    generatingAssessment: string
    questionsAnswered: string
    poweredBy: string
    useArrows: string
  }
  
  // Question Types
  questions: {
    mainConcern: string
    mainConcernDescription: string
    mainConcernPlaceholder: string
    severity: string
    duration: string
    age: string
    gender: string
    selectSeverity: string
    selectDuration: string
    selectGender: string
    provideDetails: string
    tryAgain: string
    startOver: string
  }
  
  // Severity Levels
  severity: {
    mild: string
    moderate: string
    severe: string
    emergency: string
    unbearable: string
  }
  
  // Duration Options
  duration: {
    minutes: string
    hours: string
    days: string
    weeks: string
    months: string
    lessHour: string
    fewHours: string
    oneDay: string
    twoDays: string
    oneWeek: string
    twoWeeks: string
    oneMonth: string
    longer: string
  }
  
  // Gender Options
  gender: {
    male: string
    female: string
    other: string
    preferNotSay: string
  }
  
  // Results
  results: {
    assessmentResults: string
    severityLevel: string
    possibleConditions: string
    recommendations: string
    followUpAdvice: string
    newAssessment: string
    findProvider: string
    match: string
  }
  
  // AI Features
  ai: {
    generatingOptions: string
    smartOptions: string
    refresh: string
    suggestions: string
    selected: string
    intelligentlyGenerated: string
  }
  
  // Errors
  errors: {
    configRequired: string
    apiKeyInstructions: string
    getApiKey: string
    addToEnv: string
    restartServer: string
    refreshPage: string
    analysisError: string
    questionError: string
    networkError: string
    tryAgainLater: string
    selectAtLeastOne: string
    selectOption: string
    enterValidNumber: string
    valueMinimum: string
    valueMaximum: string
    provideMoreDetail: string
    startQuestionnaireError: string
  }
  
  // Common
  common: {
    yes: string
    no: string
    notSure: string
    loading: string
    error: string
    success: string
    back: string
    next: string
    cancel: string
    save: string
    close: string
    continue: string
    processing: string
  }
  
  
  // Form specific
  forms: {
    primarySymptomPlaceholder: string
    descriptionPlaceholder: string
    durationPlaceholder: string
    severityPlaceholder: string
    genderPlaceholder: string
    chronicConditionsPlaceholder: string
    medicationsPlaceholder: string
    allergiesPlaceholder: string
    describeSymptomsLabel: string
    howLongSymptomsLabel: string
    chronicConditionsLabel: string
    medicationsLabel: string
    allergiesLabel: string
    primarySymptomsLabel: string
    ageLabel: string
    primarySymptomField: string
    durationField: string
    severityField: string
    ageField: string
    personalInformationLabel: string
    reviewSubmitLabel: string
  }
  
  // Scale specific
  scale: {
    scaleLabel: string
    lowLabel: string
    highLabel: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    title: "AI Symptom Checker",
    subtitle: "Get AI-powered insights about your symptoms",
    switchLanguage: "Español",
    
    navigation: {
      home: "Home",
      questionnaires: "Questionnaires",
      symptoms: "Symptoms",
      medicalAI: "Medical AI",
      help: "Help",
      search: "Search",
      popularSymptoms: "Popular symptoms"
    },
    
    homepage: {
      mainTitle: "AI-Powered Health Assessment Tool",
      mainSubtitle: "Dynamic questionnaire that adapts to your responses for personalized medical assessment",
      searchPlaceholder: "Describe your symptoms...",
      assessButton: "Assess",
      startQuestionnaire: "Start Questionnaire",
      advancedTechnology: "Advanced Technology",
      intelligentQuestionnaires: "AI-generated intelligent questionnaires • Personalized adaptive questions",
      dynamicDescription: "Intelligent Dynamic Questionnaire",
      footerDisclaimer: "This dynamic symptom questionnaire is powered by advanced language models and medical databases.",
      consultProfessionals: "Always consult healthcare professionals for medical advice and treatment.",
      emergencyAssessment: "Emergency Assessment",
      emergencyDescription: "Immediate medical evaluation for urgent symptoms requiring prompt attention",
      medicalAccuracy: "Medical Accuracy",
      aiPowered: "AI-Powered",
      hipaaCompliant: "HIPAA Compliant",
      medicalGrade: "Medical Grade",
      accuracyRate: "Accuracy Rate",
      assessments: "Assessments",
      available: "Available",
      users: "Users",
      accuracy: "Accuracy",
      startAssessment: "Start Assessment",
      describeYourSymptoms: "Describe Your Symptoms",
      startMedicalAssessment: "Start your medical assessment",
      startMedicalAssessmentDescription: "Start your medical assessment by describing what you're experiencing",
      emergencyTags: {
        emergency: "Emergency",
        critical: "Critical",
        immediate: "Immediate"
      }
    },
    
    healthTopics: {
      physicalSymptoms: "Physical Symptoms",
      physicalDescription: "Dynamic assessment of bodily symptoms",
      mentalWellness: "Mental Wellness",
      mentalDescription: "Adaptive questionnaire for mental health",
      cardiacSymptoms: "Cardiac Symptoms",
      cardiacDescription: "Specialized heart assessment",
      guidedAssessment: "Guided Assessment",
      guidedDescription: "AI that generates personalized questions",
      generalCheckup: "General Checkup",
      generalDescription: "Comprehensive health evaluation",
      aiAssessments: "AI Assessments",
      aiDescription: "Intelligent medical assessment system",
      tags: {
        pain: "Pain",
        fever: "Fever",
        fatigue: "Fatigue",
        anxiety: "Anxiety",
        mood: "Mood",
        stress: "Stress",
        chest: "Chest",
        palpitations: "Palpitations",
        pressure: "Pressure",
        ai: "AI",
        personalized: "Personalized",
        adaptive: "Adaptive",
        prevention: "Prevention",
        complete: "Complete",
        wellness: "Wellness"
      }
    },
    
    medicalDisclaimer: {
      title: "Important Medical Disclaimer",
      subtitle: "This AI symptom checker is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment.",
      readFullDisclaimer: "Read Full Disclaimer",
      notMedicalDiagnosis: "NOT A MEDICAL DIAGNOSIS",
      emergencySituations: "EMERGENCY SITUATIONS",
      professionalAdvice: "PROFESSIONAL MEDICAL ADVICE",
      privacyData: "PRIVACY & DATA",
      limitations: "LIMITATIONS & ACCURACY",
      acknowledgment: "By using this symptom checker, you acknowledge that you understand these limitations and agree that this tool does not replace professional medical care.",
      quickDisclaimer: "This tool provides general health information only. Not a substitute for professional medical advice. In emergencies, call 911 immediately.",
      modalTitle: "Medical Disclaimer & Important Information",
      modalSubtitle: "Please read and accept to continue",
      accept: "I Accept & Continue",
      decline: "I Decline",
      scrollToContinue: "Please scroll to read the full disclaimer",
      declinedMessage: "You have declined the medical disclaimer. This tool cannot be used without accepting the terms. Please refresh the page if you change your mind.",
      declinedTitle: "Disclaimer Declined"
    },
    
    emergency: {
      alert: "MEDICAL EMERGENCY DETECTED",
      immediateAction: "IMMEDIATE ACTION REQUIRED",
      call911: "Call 911",
      findER: "Find ER",
      message: "Your symptoms may indicate a medical emergency. Call 911 or go to the nearest emergency room immediately.",
      doNotDelay: "Do not delay seeking emergency medical attention.",
      emergencyActions: "Emergency Actions:",
      callEmergencyServices: "Call 911 or emergency services immediately",
      goToNearestER: "Go to the nearest emergency room",
      defaultMessage: "Your symptoms may indicate a medical emergency. Please seek immediate medical attention.",
      alertGenerated: "This alert is generated based on your symptom description. Even if you're unsure, it's better to seek immediate medical evaluation."
    },
    
    questionnaire: {
      preparing: "Preparing Your Assessment",
      analyzing: "Analyzing Your Responses",
      generating: "Analyzing Your Response",
      completed: "Assessment Complete",
      step: "Step",
      of: "of",
      complete: "Complete",
      continue: "Continue",
      processing: "Processing",
      checkingDatabases: "Checking medical databases",
      generatingAssessment: "Generating personalized assessment",
      questionsAnswered: "questions answered",
      poweredBy: "AI-powered suggestions",
      useArrows: "Use ↑↓ arrows and Enter to select"
    },
    
    questions: {
      mainConcern: "What is your main health concern or symptom today?",
      mainConcernDescription: "Please describe what brought you here today in detail.",
      mainConcernPlaceholder: "e.g., I have a severe headache that started yesterday...",
      severity: "How severe are your symptoms?",
      duration: "How long have you had these symptoms?",
      age: "What is your age?",
      gender: "What is your gender?",
      selectSeverity: "Select severity",
      selectDuration: "Select duration",
      selectGender: "Select gender",
      provideDetails: "Please provide a more detailed response (at least 3 characters)",
      tryAgain: "Try Again",
      startOver: "Start Over"
    },
    
    severity: {
      mild: "Mild - Barely noticeable",
      moderate: "Moderate - Noticeable discomfort",
      severe: "Severe - Significant pain/discomfort",
      emergency: "Emergency - Unbearable",
      unbearable: "Unbearable - Worst possible"
    },
    
    duration: {
      minutes: "A few minutes",
      hours: "A few hours",
      days: "A few days",
      weeks: "A few weeks",
      months: "A few months",
      lessHour: "Less than 1 hour",
      fewHours: "A few hours",
      oneDay: "1 day",
      twoDays: "2-3 days",
      oneWeek: "About 1 week",
      twoWeeks: "About 2 weeks",
      oneMonth: "About 1 month",
      longer: "Longer than 1 month"
    },
    
    gender: {
      male: "Male",
      female: "Female",
      other: "Other",
      preferNotSay: "Prefer not to say"
    },
    
    results: {
      assessmentResults: "Symptom Assessment Results",
      severityLevel: "Severity Level",
      possibleConditions: "Possible Conditions",
      recommendations: "Recommendations",
      followUpAdvice: "Follow-up Advice",
      newAssessment: "New Assessment",
      findProvider: "Find Healthcare Provider",
      match: "match"
    },
    
    ai: {
      generatingOptions: "Generating Smart Options",
      smartOptions: "AI-Generated Options",
      refresh: "Refresh",
      suggestions: "AI-powered suggestions",
      selected: "Selected",
      intelligentlyGenerated: "These options were intelligently generated based on your previous responses"
    },
    
    errors: {
      configRequired: "Configuration Required",
      apiKeyInstructions: "The OpenAI API key is not configured. To use the AI Symptom Checker, you need to add your OpenAI API key to the environment variables.",
      getApiKey: "Get an API key from OpenAI Platform",
      addToEnv: "Add it to your .env.local file",
      restartServer: "Restart your development server",
      refreshPage: "Refresh Page",
      analysisError: "An unexpected error occurred while analyzing your responses.",
      questionError: "Failed to generate next question. Please try again.",
      networkError: "Network error. Please check your connection.",
      tryAgainLater: "Please try again later.",
      selectAtLeastOne: "Please select at least one option",
      selectOption: "Please select an option",
      enterValidNumber: "Please enter a valid number",
      valueMinimum: "Value must be at least",
      valueMaximum: "Value must be at most",
      provideMoreDetail: "Please provide a more detailed response (at least 3 characters)",
      startQuestionnaireError: "Failed to start questionnaire. Please try again."
    },
    
    common: {
      yes: "Yes",
      no: "No",
      notSure: "Not sure",
      loading: "Loading",
      error: "Error",
      success: "Success",
      back: "Back",
      next: "Next",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      continue: "Continue",
      processing: "Processing..."
    },
    
    forms: {
      primarySymptomPlaceholder: "e.g., headache, fever, cough...",
      descriptionPlaceholder: "Please describe when it started, how it feels, what makes it better or worse...",
      durationPlaceholder: "Select duration",
      severityPlaceholder: "Select severity",
      genderPlaceholder: "Select gender",
      chronicConditionsPlaceholder: "Please list your chronic conditions (e.g., diabetes, hypertension, asthma...)",
      medicationsPlaceholder: "List any medications you're currently taking (optional)",
      allergiesPlaceholder: "List any known allergies (optional)",
      describeSymptomsLabel: "Describe your symptoms in detail *",
      howLongSymptomsLabel: "How long have you had these symptoms? *",
      chronicConditionsLabel: "Chronic Conditions",
      medicationsLabel: "Current Medications",
      allergiesLabel: "Known Allergies",
      primarySymptomsLabel: "Primary Symptoms",
      ageLabel: "Age *",
      primarySymptomField: "Primary Symptom",
      durationField: "Duration",
      severityField: "Severity",
      ageField: "Age",
      personalInformationLabel: "Personal Information",
      reviewSubmitLabel: "Review & Submit"
    },
    
    scale: {
      scaleLabel: "Scale",
      lowLabel: "Low",
      highLabel: "High"
    }
  },
  
  es: {
    title: "Verificador de Síntomas con IA",
    subtitle: "Obtén información sobre tus síntomas impulsada por IA",
    switchLanguage: "English",
    
    navigation: {
      home: "Inicio",
      questionnaires: "Cuestionarios",
      symptoms: "Síntomas",
      medicalAI: "IA Médica",
      help: "Ayuda",
      search: "Buscar",
      popularSymptoms: "Síntomas populares"
    },
    
    homepage: {
      mainTitle: "Evaluación de salud inteligente con IA",
      mainSubtitle: "Cuestionario dinámico que se adapta a tus respuestas para una evaluación médica personalizada",
      searchPlaceholder: "Describe tus síntomas...",
      assessButton: "Evaluar",
      startQuestionnaire: "Comenzar Cuestionario",
      advancedTechnology: "Tecnología Avanzada",
      intelligentQuestionnaires: "Cuestionarios inteligentes generados por IA • Preguntas adaptativas personalizadas",
      dynamicDescription: "Cuestionario Dinámico Inteligente",
      footerDisclaimer: "Este cuestionario dinámico de síntomas está potenciado por modelos de lenguaje avanzados y bases de datos médicas.",
      consultProfessionals: "Siempre consulta a profesionales de la salud para consejos médicos y tratamiento.",
      emergencyAssessment: "Evaluación de Emergencia",
      emergencyDescription: "Evaluación médica inmediata para síntomas urgentes que requieren atención rápida",
      medicalAccuracy: "Precisión Médica",
      aiPowered: "Impulsado por IA",
      hipaaCompliant: "Cumple HIPAA",
      medicalGrade: "Grado Médico",
      accuracyRate: "Tasa de Precisión",
      assessments: "Evaluaciones",
      available: "Disponible",
      users: "Usuarios",
      accuracy: "Precisión",
      startAssessment: "Comenzar Evaluación",
      describeYourSymptoms: "Describe Tus Síntomas",
      startMedicalAssessment: "Comienza tu evaluación médica",
      startMedicalAssessmentDescription: "Comienza tu evaluación médica describiendo lo que estás experimentando",
      emergencyTags: {
        emergency: "Emergencia",
        critical: "Crítico",
        immediate: "Inmediato"
      }
    },
    
    healthTopics: {
      physicalSymptoms: "Síntomas Físicos",
      physicalDescription: "Evaluación dinámica de síntomas corporales",
      mentalWellness: "Bienestar Mental",
      mentalDescription: "Cuestionario adaptativo para salud mental",
      cardiacSymptoms: "Síntomas Cardíacos",
      cardiacDescription: "Evaluación especializada del corazón",
      guidedAssessment: "Evaluación Guiada",
      guidedDescription: "IA que genera preguntas personalizadas",
      generalCheckup: "Chequeo General",
      generalDescription: "Evaluación completa de salud",
      aiAssessments: "Evaluaciones IA",
      aiDescription: "Sistema inteligente de evaluación médica",
      tags: {
        pain: "Dolor",
        fever: "Fiebre",
        fatigue: "Fatiga",
        anxiety: "Ansiedad",
        mood: "Estado de ánimo",
        stress: "Estrés",
        chest: "Pecho",
        palpitations: "Palpitaciones",
        pressure: "Presión",
        ai: "IA",
        personalized: "Personalizado",
        adaptive: "Adaptativo",
        prevention: "Prevención",
        complete: "Completa",
        wellness: "Bienestar"
      }
    },
    
    medicalDisclaimer: {
      title: "Descargo de Responsabilidad Médica Importante",
      subtitle: "Este verificador de síntomas con IA es solo para fines informativos y NO es un sustituto del consejo, diagnóstico o tratamiento médico profesional.",
      readFullDisclaimer: "Leer Descargo Completo",
      notMedicalDiagnosis: "NO ES UN DIAGNÓSTICO MÉDICO",
      emergencySituations: "SITUACIONES DE EMERGENCIA",
      professionalAdvice: "CONSEJO MÉDICO PROFESIONAL",
      privacyData: "PRIVACIDAD Y DATOS",
      limitations: "LIMITACIONES Y PRECISIÓN",
      acknowledgment: "Al usar este verificador de síntomas, reconoces que entiendes estas limitaciones y aceptas que esta herramienta no reemplaza la atención médica profesional.",
      quickDisclaimer: "Esta herramienta proporciona información general de salud únicamente. No es un sustituto del consejo médico profesional. En emergencias, llama al 911 inmediatamente.",
      modalTitle: "Descargo de Responsabilidad Médica e Información Importante",
      modalSubtitle: "Por favor lee y acepta para continuar",
      accept: "Acepto y Continúo",
      decline: "Rechazo",
      scrollToContinue: "Por favor desplázate para leer el descargo completo",
      declinedMessage: "Has rechazado el descargo médico. Esta herramienta no puede ser utilizada sin aceptar los términos. Por favor actualiza la página si cambias de opinión.",
      declinedTitle: "Descargo Rechazado"
    },
    
    emergency: {
      alert: "EMERGENCIA MÉDICA DETECTADA",
      immediateAction: "SE REQUIERE ACCIÓN INMEDIATA",
      call911: "Llamar 911",
      findER: "Buscar ER",
      message: "Tus síntomas pueden indicar una emergencia médica. Llama al 911 o ve a la sala de emergencias más cercana inmediatamente.",
      doNotDelay: "No retrases la búsqueda de atención médica de emergencia.",
      emergencyActions: "Acciones de Emergencia:",
      callEmergencyServices: "Llama al 911 o servicios de emergencia inmediatamente",
      goToNearestER: "Ve a la sala de emergencias más cercana",
      defaultMessage: "Tus síntomas pueden indicar una emergencia médica. Por favor busca atención médica inmediata.",
      alertGenerated: "Esta alerta se genera basada en tu descripción de síntomas. Incluso si no estás seguro, es mejor buscar evaluación médica inmediata."
    },
    
    questionnaire: {
      preparing: "Preparando Tu Evaluación",
      analyzing: "Analizando Tus Respuestas",
      generating: "Analizando Tu Respuesta",
      completed: "Evaluación Completa",
      step: "Paso",
      of: "de",
      complete: "Completo",
      continue: "Continuar",
      processing: "Procesando",
      checkingDatabases: "Verificando bases de datos médicas",
      generatingAssessment: "Generando evaluación personalizada",
      questionsAnswered: "preguntas respondidas",
      poweredBy: "Sugerencias impulsadas por IA",
      useArrows: "Usa las flechas ↑↓ y Enter para seleccionar"
    },
    
    questions: {
      mainConcern: "¿Cuál es tu principal preocupación de salud o síntoma hoy?",
      mainConcernDescription: "Por favor describe en detalle lo que te trajo aquí hoy.",
      mainConcernPlaceholder: "ej., Tengo un dolor de cabeza severo que comenzó ayer...",
      severity: "¿Qué tan severos son tus síntomas?",
      duration: "¿Cuánto tiempo has tenido estos síntomas?",
      age: "¿Cuál es tu edad?",
      gender: "¿Cuál es tu género?",
      selectSeverity: "Seleccionar severidad",
      selectDuration: "Seleccionar duración",
      selectGender: "Seleccionar género",
      provideDetails: "Por favor proporciona una respuesta más detallada (al menos 3 caracteres)",
      tryAgain: "Intentar de Nuevo",
      startOver: "Empezar de Nuevo"
    },
    
    severity: {
      mild: "Leve - Apenas perceptible",
      moderate: "Moderado - Molestia notable",
      severe: "Severo - Dolor/molestia significativa",
      emergency: "Emergencia - Insoportable",
      unbearable: "Insoportable - Lo peor posible"
    },
    
    duration: {
      minutes: "Unos minutos",
      hours: "Unas horas",
      days: "Unos días",
      weeks: "Unas semanas",
      months: "Unos meses",
      lessHour: "Menos de 1 hora",
      fewHours: "Unas horas",
      oneDay: "1 día",
      twoDays: "2-3 días",
      oneWeek: "Cerca de 1 semana",
      twoWeeks: "Cerca de 2 semanas",
      oneMonth: "Cerca de 1 mes",
      longer: "Más de 1 mes"
    },
    
    gender: {
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      preferNotSay: "Prefiero no decir"
    },
    
    results: {
      assessmentResults: "Resultados de la Evaluación de Síntomas",
      severityLevel: "Nivel de Severidad",
      possibleConditions: "Condiciones Posibles",
      recommendations: "Recomendaciones",
      followUpAdvice: "Consejo de Seguimiento",
      newAssessment: "Nueva Evaluación",
      findProvider: "Encontrar Proveedor de Salud",
      match: "coincidencia"
    },
    
    ai: {
      generatingOptions: "Generando Opciones Inteligentes",
      smartOptions: "Opciones Generadas por IA",
      refresh: "Actualizar",
      suggestions: "Sugerencias impulsadas por IA",
      selected: "Seleccionado",
      intelligentlyGenerated: "Estas opciones fueron generadas inteligentemente basadas en tus respuestas previas"
    },
    
    errors: {
      configRequired: "Configuración Requerida",
      apiKeyInstructions: "La clave API de OpenAI no está configurada. Para usar el Verificador de Síntomas con IA, necesitas agregar tu clave API de OpenAI a las variables de entorno.",
      getApiKey: "Obtener una clave API de la Plataforma OpenAI",
      addToEnv: "Agregarla a tu archivo .env.local",
      restartServer: "Reiniciar tu servidor de desarrollo",
      refreshPage: "Actualizar Página",
      analysisError: "Ocurrió un error inesperado al analizar tus respuestas.",
      questionError: "Falló al generar la siguiente pregunta. Por favor intenta de nuevo.",
      networkError: "Error de red. Por favor verifica tu conexión.",
      tryAgainLater: "Por favor intenta de nuevo más tarde.",
      selectAtLeastOne: "Por favor selecciona al menos una opción",
      selectOption: "Por favor selecciona una opción",
      enterValidNumber: "Por favor ingresa un número válido",
      valueMinimum: "El valor debe ser al menos",
      valueMaximum: "El valor debe ser máximo",
      provideMoreDetail: "Por favor proporciona una respuesta más detallada (al menos 3 caracteres)",
      startQuestionnaireError: "Error al iniciar el cuestionario. Por favor intenta de nuevo."
    },
    
    common: {
      yes: "Sí",
      no: "No",
      notSure: "No estoy seguro",
      loading: "Cargando",
      error: "Error",
      success: "Éxito",
      back: "Atrás",
      next: "Siguiente",
      cancel: "Cancelar",
      save: "Guardar",
      close: "Cerrar",
      continue: "Continuar",
      processing: "Procesando..."
    },
    
    forms: {
      primarySymptomPlaceholder: "ej., dolor de cabeza, fiebre, tos...",
      descriptionPlaceholder: "Por favor describe cuándo comenzó, cómo se siente, qué lo mejora o empeora...",
      durationPlaceholder: "Seleccionar duración",
      severityPlaceholder: "Seleccionar severidad",
      genderPlaceholder: "Seleccionar género",
      chronicConditionsPlaceholder: "Por favor lista tus condiciones crónicas (ej., diabetes, hipertensión, asma...)",
      medicationsPlaceholder: "Lista cualquier medicamento que estés tomando actualmente (opcional)",
      allergiesPlaceholder: "Lista cualquier alergia conocida (opcional)",
      describeSymptomsLabel: "Describe tus síntomas en detalle *",
      howLongSymptomsLabel: "¿Cuánto tiempo has tenido estos síntomas? *",
      chronicConditionsLabel: "Condiciones Crónicas",
      medicationsLabel: "Medicamentos Actuales",
      allergiesLabel: "Alergias Conocidas",
      primarySymptomsLabel: "Síntomas Primarios",
      ageLabel: "Edad *",
      primarySymptomField: "Síntoma Primario",
      durationField: "Duración",
      severityField: "Severidad",
      ageField: "Edad",
      personalInformationLabel: "Información Personal",
      reviewSubmitLabel: "Revisar y Enviar"
    },
    
    scale: {
      scaleLabel: "Escala",
      lowLabel: "Bajo",
      highLabel: "Alto"
    }
  }
}