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
    // We.care style additions
    feelBetterAbout: string
    findingHealthcare: string
    guessworkOut: string
    rightDoctors: string
    profilesEveryDoctor: string
    millionRatings: string
    youMayBeLookingFor: string
    familyMedicine: string
    pediatrics: string
    topHospital: string
    telehealth: string
    covid19: string
    orthopedicSurgery: string
    more: string
    popularSearches: string
    specialties: string
    conditions: string
    procedures: string
    dermatology: string
    internalMedicine: string
    neurology: string
    generalMedicine: string
    dentistry: string
    otolaryngology: string
    findRightDoctor: string
    rightAtFingerips: string
    toolsAndInformation: string
    searchNearestHospital: string
    findDoctorsHospitals: string
    appointmentBestDoctor: string
    convenientlySchedule: string
    getConsultant: string
    connectQualified: string
    findBestDoctor: string
    searchDoctor: string
    setLocation: string
    searchNow: string
    whyChoose: string
    access24_7: string
    eliminateCommute: string
    flexiblePlans: string
    seamlesslySwitch: string
    saveMoney: string
    getFreeConsultation: string
    meetSpecialists: string
    drLeslieAlexander: string
    dentalSurgery: string
    drKathrynMurphy: string
    pediatricMedicine: string
    drRobertFox: string
    gastroenterologist: string
    drEstherHoward: string
    thoracicSurgeons: string
    drAlbertFlores: string
    internNeurologist: string
    drJeromeBell: string
    obstetricsGynecologists: string
    drArleneMcCoy: string
    cardiologists: string
    drJennyWilson: string
    internDermatologist: string
    patientsFeedback: string
    testimonialDescription: string
    brooklynJacob: string
    newYork: string
    clinicalCareReview: string
    subscribeNews: string
    subscribeDescription: string
    enterEmail: string
    subscribe: string
    forPatients: string
    accountSignup: string
    hospitalAwards: string
    qualityReports: string
    drugsAZ: string
    healthContentAZ: string
    videoCenter: string
    telehealthNav: string
    forProviders: string
    providerLogin: string
    promoteYourPractice: string
    updateFreeProfile: string
    newsFeatures: string
    helpCenter: string
    ourCompany: string
    contactUs: string
    aboutUs: string
    corporate: string
    faq: string
    blog: string
    pressRoom: string
    careers: string
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
    // Detailed content translations
    notIntendedFor: string
    provideDiagnosis: string
    replaceConsultation: string
    emergencyAdvice: string
    guideTreatment: string
    emergencyInstructions: string
    call911: string
    goToER: string
    contactEMS: string
    doNotDelay: string
    consultProfessionals: string
    medicalConcerns: string
    interpretSymptoms: string
    medicalDiagnosis: string
    medicationAdvice: string
    healthMonitoring: string
    privacyNotice: string
    hipaaCompliance: string
    dodSecurity: string
    dataProtection: string
    encryption: string
    auditLogging: string
    sessionTimeout: string
    noStorage: string
    dataAnonymization: string
    securityMonitoring: string
    privacyCheckbox: string
    dodNotice: string
    complianceStandards: string
    fisma: string
    nist: string
    dodIA: string
    fips: string
    dodCheckbox: string
    finalAcknowledgment: string
    finalAcknowledgmentText: string
    limitationsText: string
    aiKnowledge: string
    medicalHistory: string
    accuracyNotGuaranteed: string
    rareConditions: string
    individualCircumstances: string
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
      // We.care style additions
      feelBetterAbout: "Feel better about",
      findingHealthcare: "finding healthcare",
      guessworkOut: "we take the guesswork out of finding the right",
      rightDoctors: "doctors, hospitals, and care for you and your family.",
      profilesEveryDoctor: "Profiles for Every Doctor in America",
      millionRatings: "More Than 10 Million Patient Ratings",
      youMayBeLookingFor: "You may be looking for",
      familyMedicine: "Family Medicine",
      pediatrics: "Pediatrics",
      topHospital: "Top Hospital",
      telehealth: "Telehealth",
      covid19: "COVID-19",
      orthopedicSurgery: "Orthopedic Surgery",
      more: "More",
      popularSearches: "Popular Searches on MedicalAI",
      specialties: "Specialties",
      conditions: "Conditions",
      procedures: "Procedures",
      dermatology: "Dermatology",
      internalMedicine: "Internal Medicine",
      neurology: "Neurology",
      generalMedicine: "General Medicine",
      dentistry: "Dentistry",
      otolaryngology: "Otolaryngology",
      findRightDoctor: "Find the right doctor",
      rightAtFingerips: "right at your fingertips",
      toolsAndInformation: "MedicalAI gives you the tools and information you need to",
      searchNearestHospital: "Search nearest hospital",
      findDoctorsHospitals: "Find doctors and hospitals based on the factors that matter most to you.",
      appointmentBestDoctor: "Appointment with the best doctor",
      convenientlySchedule: "Conveniently schedule your appointment by phone or online when available.",
      getConsultant: "Get consultant",
      connectQualified: "Connect with qualified healthcare professionals for expert medical advice.",
      findBestDoctor: "Find the best doctor you need",
      searchDoctor: "Search Doctor",
      setLocation: "Set Location",
      searchNow: "Search Now",
      whyChoose: "Why you choose MedicalAI",
      access24_7: "24/7 access - reach out whenever you need",
      eliminateCommute: "Eliminate commute time and scheduling hassles",
      flexiblePlans: "Flexible plans to meet your needs and lifestyle",
      seamlesslySwitch: "Seamlessly switch therapists, at no extra cost",
      saveMoney: "Save money while receiving high-quality care",
      getFreeConsultation: "Get Free Consultation",
      meetSpecialists: "Meet our specialist",
      drLeslieAlexander: "Dr. Leslie Alexander",
      dentalSurgery: "Dental Surgery",
      drKathrynMurphy: "Dr. Kathryn Murphy",
      pediatricMedicine: "Pediatric Medicine",
      drRobertFox: "Dr. Robert Fox",
      gastroenterologist: "Gastroenterologist",
      drEstherHoward: "Dr. Esther Howard",
      thoracicSurgeons: "Thoracic Surgeons",
      drAlbertFlores: "Dr. Albert Flores",
      internNeurologist: "Intern Neurologist",
      drJeromeBell: "Dr. Jerome Bell",
      obstetricsGynecologists: "Obstetrics & Gynecologists",
      drArleneMcCoy: "Dr. Arlene McCoy",
      cardiologists: "Cardiologists",
      drJennyWilson: "Dr. Jenny Wilson",
      internDermatologist: "Intern Dermatologist",
      patientsFeedback: "Our patients feedback about us",
      testimonialDescription: "In promotion and advertising, a testimonial or show consists of a person's written or spoken statement extolling the virtue of a our service",
      brooklynJacob: "Brooklyn Jacob",
      newYork: "New York, USA",
      clinicalCareReview: "Clinical care review is the process of retrospectively examining potential errors or gaps in medical care, aiming for future practice improvement.",
      subscribeNews: "Subscribe for any news update from MedicalAI",
      subscribeDescription: "Stay informed about the latest health insights and features",
      enterEmail: "Enter your Email Address",
      subscribe: "Subscribe",
      forPatients: "For Patients",
      accountSignup: "Account Sign Up / Log In",
      hospitalAwards: "Hospital Awards & Ratings",
      qualityReports: "Quality & Reports",
      drugsAZ: "Drugs A-Z",
      healthContentAZ: "Health Content A-Z",
      videoCenter: "Video Center",
      telehealthNav: "Telehealth",
      forProviders: "For Providers",
      providerLogin: "Provider Log in",
      promoteYourPractice: "Promote Your Practice",
      updateFreeProfile: "Update Your Free Profile",
      newsFeatures: "News and Features",
      helpCenter: "Help Center",
      ourCompany: "Our Company",
      contactUs: "Contact Us",
      aboutUs: "About Us",
      corporate: "Corporate",
      faq: "MedicalAI FAQ",
      blog: "Blog",
      pressRoom: "Press Room",
      careers: "Careers",
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
      declinedTitle: "Disclaimer Declined",
      // Detailed content translations
      notIntendedFor: "This AI symptom checker is designed to provide general health information and educational content only. It is NOT intended to:",
      provideDiagnosis: "Provide medical diagnosis or treatment recommendations",
      replaceConsultation: "Replace consultation with qualified healthcare professionals",
      emergencyAdvice: "Serve as emergency medical advice",
      guideTreatment: "Guide medical treatment decisions",
      emergencyInstructions: "If you are experiencing a medical emergency, STOP using this tool immediately and:",
      call911: "Call 911 or your local emergency number",
      goToER: "Go to the nearest emergency room",
      contactEMS: "Contact emergency medical services",
      doNotDelay: "Do not delay seeking emergency medical care to use this symptom checker.",
      consultProfessionals: "Always consult with qualified healthcare professionals for:",
      medicalConcerns: "Any medical concerns or questions",
      interpretSymptoms: "Interpretation of symptoms",
      medicalDiagnosis: "Medical diagnosis and treatment",
      medicationAdvice: "Medication advice and management",
      healthMonitoring: "Health condition monitoring",
      privacyNotice: "DoD/HIPAA COMPLIANCE & PRIVACY",
      hipaaCompliance: "HIPAA Compliance",
      dodSecurity: "DoD Security Standards",
      dataProtection: "Data Protection Measures:",
      encryption: "AES-256 encryption for data at rest and in transit",
      auditLogging: "Comprehensive audit logging of all data access",
      sessionTimeout: "Session timeout after 15 minutes of inactivity",
      noStorage: "No permanent storage of personal health information",
      dataAnonymization: "Automatic data anonymization for system logs",
      securityMonitoring: "Real-time security monitoring and threat detection",
      privacyCheckbox: "I have read and understand the HIPAA/DoD privacy and security policies",
      dodNotice: "NOTICE: This system is for authorized use only. All activities are monitored and logged. Unauthorized access is prohibited and may result in prosecution under federal law.",
      complianceStandards: "Compliance Standards:",
      fisma: "FISMA (Federal Information Security Management Act)",
      nist: "NIST 800-53 Security Controls",
      dodIA: "DoD 8500 Information Assurance",
      fips: "FIPS 140-2 Cryptographic Standards",
      dodCheckbox: "I acknowledge the DoD security requirements and monitoring notice",
      finalAcknowledgment: "Final Acknowledgment",
      finalAcknowledgmentText: "By proceeding, you acknowledge that you understand these limitations, security requirements, and agree that this tool does not replace professional medical care. You consent to the collection and processing of health information in accordance with HIPAA and DoD security standards.",
      limitationsText: "Please understand that:",
      aiKnowledge: "AI recommendations are based on general medical knowledge",
      medicalHistory: "Results may not account for your complete medical history",
      accuracyNotGuaranteed: "Accuracy may vary and is not guaranteed",
      rareConditions: "Rare conditions may not be adequately represented",
      individualCircumstances: "Individual medical circumstances may require different approaches"
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
      // We.care style additions
      feelBetterAbout: "Siéntete mejor acerca de",
      findingHealthcare: "encontrar atención médica",
      guessworkOut: "eliminamos las conjeturas de encontrar los",
      rightDoctors: "doctores, hospitales y atención adecuados para ti y tu familia.",
      profilesEveryDoctor: "Perfiles de Cada Doctor en América",
      millionRatings: "Más de 10 Millones de Calificaciones de Pacientes",
      youMayBeLookingFor: "Podrías estar buscando",
      familyMedicine: "Medicina Familiar",
      pediatrics: "Pediatría",
      topHospital: "Hospital Principal",
      telehealth: "Telemedicina",
      covid19: "COVID-19",
      orthopedicSurgery: "Cirugía Ortopédica",
      more: "Más",
      popularSearches: "Búsquedas Populares en MedicalAI",
      specialties: "Especialidades",
      conditions: "Condiciones",
      procedures: "Procedimientos",
      dermatology: "Dermatología",
      internalMedicine: "Medicina Interna",
      neurology: "Neurología",
      generalMedicine: "Medicina General",
      dentistry: "Odontología",
      otolaryngology: "Otorrinolaringología",
      findRightDoctor: "Encuentra al doctor correcto",
      rightAtFingerips: "al alcance de tus dedos",
      toolsAndInformation: "MedicalAI te da las herramientas e información que necesitas para",
      searchNearestHospital: "Buscar hospital más cercano",
      findDoctorsHospitals: "Encuentra doctores y hospitales basados en los factores que más te importan.",
      appointmentBestDoctor: "Cita con el mejor doctor",
      convenientlySchedule: "Programa convenientemente tu cita por teléfono o en línea cuando esté disponible.",
      getConsultant: "Obtener consultor",
      connectQualified: "Conéctate con profesionales de la salud calificados para consejo médico experto.",
      findBestDoctor: "Encuentra al mejor doctor que necesitas",
      searchDoctor: "Buscar Doctor",
      setLocation: "Establecer Ubicación",
      searchNow: "Buscar Ahora",
      whyChoose: "Por qué elegir MedicalAI",
      access24_7: "Acceso 24/7 - comunícate cuando lo necesites",
      eliminateCommute: "Elimina tiempo de viaje y problemas de programación",
      flexiblePlans: "Planes flexibles para satisfacer tus necesidades y estilo de vida",
      seamlesslySwitch: "Cambia terapeutas sin problemas, sin costo extra",
      saveMoney: "Ahorra dinero mientras recibes atención de alta calidad",
      getFreeConsultation: "Obtener Consulta Gratuita",
      meetSpecialists: "Conoce a nuestro especialista",
      drLeslieAlexander: "Dr. Leslie Alexander",
      dentalSurgery: "Cirugía Dental",
      drKathrynMurphy: "Dr. Kathryn Murphy",
      pediatricMedicine: "Medicina Pediátrica",
      drRobertFox: "Dr. Robert Fox",
      gastroenterologist: "Gastroenterólogo",
      drEstherHoward: "Dr. Esther Howard",
      thoracicSurgeons: "Cirujanos Torácicos",
      drAlbertFlores: "Dr. Albert Flores",
      internNeurologist: "Neurólogo Interno",
      drJeromeBell: "Dr. Jerome Bell",
      obstetricsGynecologists: "Obstetras y Ginecólogos",
      drArleneMcCoy: "Dr. Arlene McCoy",
      cardiologists: "Cardiólogos",
      drJennyWilson: "Dr. Jenny Wilson",
      internDermatologist: "Dermatólogo Interno",
      patientsFeedback: "Comentarios de nuestros pacientes sobre nosotros",
      testimonialDescription: "En promoción y publicidad, un testimonio o espectáculo consiste en una declaración escrita o hablada de una persona elogiando la virtud de nuestro servicio",
      brooklynJacob: "Brooklyn Jacob",
      newYork: "Nueva York, EE.UU.",
      clinicalCareReview: "La revisión de atención clínica es el proceso de examinar retrospectivamente errores potenciales o brechas en la atención médica, con el objetivo de mejorar la práctica futura.",
      subscribeNews: "Suscríbete para recibir actualizaciones de noticias de MedicalAI",
      subscribeDescription: "Mantente informado sobre los últimos conocimientos de salud y características",
      enterEmail: "Ingresa tu Dirección de Correo Electrónico",
      subscribe: "Suscribirse",
      forPatients: "Para Pacientes",
      accountSignup: "Registro de Cuenta / Iniciar Sesión",
      hospitalAwards: "Premios y Calificaciones de Hospitales",
      qualityReports: "Calidad e Informes",
      drugsAZ: "Medicamentos A-Z",
      healthContentAZ: "Contenido de Salud A-Z",
      videoCenter: "Centro de Videos",
      telehealthNav: "Telemedicina",
      forProviders: "Para Proveedores",
      providerLogin: "Iniciar Sesión de Proveedor",
      promoteYourPractice: "Promueve Tu Práctica",
      updateFreeProfile: "Actualiza Tu Perfil Gratuito",
      newsFeatures: "Noticias y Características",
      helpCenter: "Centro de Ayuda",
      ourCompany: "Nuestra Empresa",
      contactUs: "Contáctanos",
      aboutUs: "Acerca de Nosotros",
      corporate: "Corporativo",
      faq: "Preguntas Frecuentes de MedicalAI",
      blog: "Blog",
      pressRoom: "Sala de Prensa",
      careers: "Carreras",
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
      declinedTitle: "Descargo Rechazado",
      // Detailed content translations
      notIntendedFor: "Este verificador de síntomas con IA está diseñado para proporcionar información general de salud y contenido educativo únicamente. NO está destinado a:",
      provideDiagnosis: "Proporcionar diagnóstico médico o recomendaciones de tratamiento",
      replaceConsultation: "Reemplazar la consulta con profesionales de la salud calificados",
      emergencyAdvice: "Servir como consejo médico de emergencia",
      guideTreatment: "Guiar decisiones de tratamiento médico",
      emergencyInstructions: "Si estás experimentando una emergencia médica, DEJA de usar esta herramienta inmediatamente y:",
      call911: "Llama al 911 o tu número de emergencia local",
      goToER: "Ve a la sala de emergencias más cercana",
      contactEMS: "Contacta los servicios médicos de emergencia",
      doNotDelay: "No retrases la búsqueda de atención médica de emergencia para usar este verificador de síntomas.",
      consultProfessionals: "Siempre consulta con profesionales de la salud calificados para:",
      medicalConcerns: "Cualquier preocupación o pregunta médica",
      interpretSymptoms: "Interpretación de síntomas",
      medicalDiagnosis: "Diagnóstico y tratamiento médico",
      medicationAdvice: "Consejo y manejo de medicamentos",
      healthMonitoring: "Monitoreo de condiciones de salud",
      privacyNotice: "CUMPLIMIENTO DoD/HIPAA Y PRIVACIDAD",
      hipaaCompliance: "Cumplimiento HIPAA",
      dodSecurity: "Estándares de Seguridad DoD",
      dataProtection: "Medidas de Protección de Datos:",
      encryption: "Cifrado AES-256 para datos en reposo y en tránsito",
      auditLogging: "Registro de auditoría completo de todo acceso a datos",
      sessionTimeout: "Tiempo de espera de sesión después de 15 minutos de inactividad",
      noStorage: "Sin almacenamiento permanente de información de salud personal",
      dataAnonymization: "Anonimización automática de datos para registros del sistema",
      securityMonitoring: "Monitoreo de seguridad y detección de amenazas en tiempo real",
      privacyCheckbox: "He leído y entiendo las políticas de privacidad y seguridad HIPAA/DoD",
      dodNotice: "AVISO: Este sistema es solo para uso autorizado. Todas las actividades son monitoreadas y registradas. El acceso no autorizado está prohibido y puede resultar en procesamiento bajo la ley federal.",
      complianceStandards: "Estándares de Cumplimiento:",
      fisma: "FISMA (Ley Federal de Gestión de Seguridad de la Información)",
      nist: "Controles de Seguridad NIST 800-53",
      dodIA: "Aseguramiento de Información DoD 8500",
      fips: "Estándares Criptográficos FIPS 140-2",
      dodCheckbox: "Reconozco los requisitos de seguridad DoD y el aviso de monitoreo",
      finalAcknowledgment: "Reconocimiento Final",
      finalAcknowledgmentText: "Al proceder, reconoces que entiendes estas limitaciones, requisitos de seguridad, y aceptas que esta herramienta no reemplaza la atención médica profesional. Consientes a la recolección y procesamiento de información de salud de acuerdo con los estándares de seguridad HIPAA y DoD.",
      limitationsText: "Por favor entiende que:",
      aiKnowledge: "Las recomendaciones de IA se basan en conocimiento médico general",
      medicalHistory: "Los resultados pueden no considerar tu historial médico completo",
      accuracyNotGuaranteed: "La precisión puede variar y no está garantizada",
      rareConditions: "Las condiciones raras pueden no estar adecuadamente representadas",
      individualCircumstances: "Las circunstancias médicas individuales pueden requerir enfoques diferentes"
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