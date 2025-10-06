export type Language = 'en' | 'es'

// Common UI Elements
export interface CommonTranslations {
  // Actions
  cancel: string
  save: string
  saving: string
  saveChanges: string
  edit: string
  remove: string
  add: string
  submit: string
  close: string
  next: string
  previous: string
  continue: string
  loading: string
  error: string
  success: string
  warning: string
  back: string
  send: string
  backToHome: string
  goHome: string
  
  // Form elements
  name: string
  email: string
  emailAddress: string
  password: string
  confirmPassword: string
  subject: string
  message: string
  fullName: string
  notSpecified: string
  notProvided: string
  
    // Common responses
    yes: string
    no: string
    notSure: string
    processing: string
    
    // Error pages
    pageNotFound: string
    pageNotFoundDesc: string
}

// Navigation
export interface NavigationTranslations {
  home: string
  questionnaires: string
  symptoms: string
  vitalCheck: string
  help: string
  contact: string
  search: string
  popularSymptoms: string
}

// Homepage specific
export interface HomepageTranslations {
  // Hero section
  mainTitle: string
  mainSubtitle: string
  searchPlaceholder: string
  searchDoctor: string
  assessButton: string
  startQuestionnaire: string
  
  // Features
  advancedTechnology: string
  intelligentQuestionnaires: string
  dynamicDescription: string
  medicalAccuracy: string
  aiPowered: string
  hipaaCompliant: string
  medicalGrade: string
  
  // Stats
  accuracyRate: string
  assessments: string
  available: string
  users: string
  
  // CTA sections
  startAssessment: string
  describeYourSymptoms: string
  startMedicalAssessment: string
  startMedicalAssessmentDescription: string
  
  // Footer
  footerDisclaimer: string
  consultProfessionals: string
  
  // Emergency
  emergencyAssessment: string
  emergencyDescription: string
  
  // Specialties and doctors
  familyMedicine: string
  pediatrics: string
  dermatology: string
  internalMedicine: string
  neurology: string
  generalMedicine: string
  dentistry: string
  otolaryngology: string
  psychiatry: string
  cardiology: string
  emergencyMedicine: string
  
  // UI elements
  more: string
  patientPortal: string
  aboutVitalCheck: string
  
  // Additional homepage properties
  feelBetterAbout: string
  findingHealthcare: string
  guessworkOut: string
  rightDoctors: string
  profilesEveryDoctor: string
  millionRatings: string
  setLocation: string
  youMayBeLookingFor: string
  topHospital: string
  telehealth: string
  covid19: string
  orthopedicSurgery: string
  popularSearches: string
  specialties: string
  conditions: string
  procedures: string
  findRightDoctor: string
  rightAtFingerips: string
  toolsAndInformation: string
  findBestDoctor: string
  searchNow: string
  searchNearestHospital: string
  findDoctorsHospitals: string
  appointmentBestDoctor: string
  convenientlySchedule: string
  getConsultant: string
  connectQualified: string
  whyChoose: string
  getFreeConsultation: string
  meetSpecialists: string
  aiAgentsSubtitle: string
  // Agents
  aiGeneralMedicine: string
  aiCardiology: string
  aiNeurology: string
  aiPediatrics: string
  aiDermatology: string
  aiRadiology: string
  aiEmergency: string
  aiOncology: string
  
  // Agent descriptions
  aiGeneralDescription: string
  aiCardiologyDescription: string
  aiNeurologyDescription: string
  aiPediatricsDescription: string
  aiDermatologyDescription: string
  aiRadiologyDescription: string
  aiEmergencyDescription: string
  aiOncologyDescription: string
  
  // Image scanning features
  imageScanning: string
  imageScanningDescription: string
  mriAnalysis: string
  ctScanAnalysis: string
  xrayAnalysis: string
  ultrasoundAnalysis: string
  pathologyAnalysis: string
  
  // Medical Procedures
  aiCtScan: string
  aiMri: string
  aiXray: string
  aiBloodTest: string
  aiUltrasound: string
  aiEndoscopy: string
  
  // Procedure descriptions
  aiCtScanDescription: string
  aiMriDescription: string
  aiXrayDescription: string
  aiBloodTestDescription: string
  aiUltrasoundDescription: string
  aiEndoscopyDescription: string
  
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
  drJennyWilson: string
  internDermatologist: string
  cardiologists: string
  patientsFeedback: string
  testimonialDescription: string
  brooklynJacob: string
  newYork: string
  clinicalCareReview: string
  mariaRodriguez: string
  mariaLocation: string
  mariaReview: string
  johnSmith: string
  johnLocation: string
  johnReview: string
  advancedDiagnostics: string
  advancedDiagnosticsDesc: string
  aiPoweredAnalysis: string
  aiPoweredAnalysisDesc: string
  remoteHealthcare: string
  remoteHealthcareDesc: string
  subscribeNews: string
  subscribeDescription: string
  enterEmail: string
  subscribe: string
  advancedMedicalAI: string
  aiSystemDescription: string
  evidenceBased: string
  evidenceBasedDesc: string
  securePrivate: string
  securePrivateDesc: string
  comprehensive: string
  comprehensiveDesc: string
  
  // Emergency tags
  emergencyTags: {
    emergency: string
    critical: string
    immediate: string
  }
}

// Health Topics
export interface HealthTopicsTranslations {
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
export interface MedicalDisclaimerTranslations {
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
  
  // Detailed content
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
  
  // Privacy and security
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
export interface EmergencyTranslations {
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

// Questionnaire System
export interface QuestionnaireTranslations {
  // Main questionnaire flow
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
  
  // Page content
  title: string
  subtitle: string
  availableAssessments: string
  startAssessment: string
  whyChoose: string
  howItWorks: string
  readyToStart: string
  readyToStartDescription: string
  startGeneralAssessment: string
  learnMore: string
  
  // Assessment types
  types: {
    generalHealth: {
      title: string
      description: string
      features: string[]
      duration: string
    }
    symptomAnalysis: {
      title: string
      description: string
      features: string[]
      duration: string
    }
    mentalHealth: {
      title: string
      description: string
      features: string[]
      duration: string
    }
    chronicCondition: {
      title: string
      description: string
      features: string[]
      duration: string
    }
    emergencyAssessment: {
      title: string
      description: string
      features: string[]
      duration: string
    }
    preventiveCare: {
      title: string
      description: string
      features: string[]
      duration: string
    }
  }
  
  // Benefits
  benefits: {
    aiPowered: {
      title: string
      description: string
    }
    privacyProtected: {
      title: string
      description: string
    }
    availability: {
      title: string
      description: string
    }
    expertValidated: {
      title: string
      description: string
    }
  }
  
  // How it works steps
  steps: {
    chooseAssessment: {
      title: string
      description: string
    }
    answerQuestions: {
      title: string
      description: string
    }
    getInsights: {
      title: string
      description: string
    }
  }
}

// Question Types
export interface QuestionsTranslations {
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

// Assessment Results
export interface ResultsTranslations {
  assessmentResults: string
  severityLevel: string
  possibleConditions: string
  recommendations: string
  followUpAdvice: string
  newAssessment: string
  findProvider: string
  match: string
}

// Authentication
export interface AuthTranslations {
  login: {
    title: string
    subtitle: string
    emailLabel: string
    emailPlaceholder: string
    passwordLabel: string
    passwordPlaceholder: string
    loginButton: string
    forgotPassword: string
    noAccount: string
    signUpLink: string
    backToHome: string
    clerkRedirect: string
    signIn: string
    signUp: string
    errors: {
      emailRequired: string
      emailInvalid: string
      passwordRequired: string
      passwordMinLength: string
      loginFailed: string
    }
  }
  signup: {
    title: string
    subtitle: string
    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    passwordLabel: string
    passwordPlaceholder: string
    confirmPasswordLabel: string
    confirmPasswordPlaceholder: string
    agreeToTerms: string
    signupButton: string
    haveAccount: string
    loginLink: string
    backToHome: string
    errors: {
      firstNameRequired: string
      lastNameRequired: string
      emailRequired: string
      emailInvalid: string
      phoneRequired: string
      phoneInvalid: string
      passwordRequired: string
      passwordMinLength: string
      confirmPasswordRequired: string
      passwordsMatch: string
      termsRequired: string
      signupFailed: string
    }
  }
}

// Patient Portal
export interface PatientPortalTranslations {
  loading: string
  
  nav: {
    title: string
    welcome: string
    signOut: string
    dashboard: string
    dashboardDescription: string
    profile: string
    profileDescription: string
    consultations: string
    consultationsDescription: string
    medicalHistory: string
    medicalHistoryDescription: string
  }
  
  dashboard: {
    title: string
    subtitle: string
    welcomeTitle: string
    welcomeDescription: string
    welcomeBack: string
    recentConsultations: string
    medicalHistory: string
    upcomingAppointments: string
    healthSummary: string
    viewAll: string
    noConsultations: string
    startFirstConsultation: string
    quickActions: string
    updateProfile: string
    newConsultation: string
    activeConditions: string
    lastActivity: string
    lastConsultation: string
    noConsultationsYet: string
    noActiveConditions: string
    stats: {
      totalConsultations: string
      currentMedications: string
      activeConditions: string
      recentActivity: string
    }
  }
  
  profile: {
    title: string
    subtitle: string
    personalInfo: string
    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    dateOfBirthLabel: string
    dateOfBirthPlaceholder: string
    genderLabel: string
    genderPlaceholder: string
    emergencyContactLabel: string
    emergencyContactPlaceholder: string
    emergencyContact: string
    emergencyContactNamePlaceholder: string
    emergencyContactPhonePlaceholder: string
    emergencyContactRelationshipPlaceholder: string
    contactName: string
    contactPhone: string
    relationship: string
    accountInformation: string
    patientId: string
    memberSince: string
    lastUpdated: string
    accountStatus: string
    active: string
    notAvailable: string
    notProvided: string
    saveChanges: string
    cancel: string
  }
  
  consultations: {
    title: string
    subtitle: string
    noConsultations: string
    startNewConsultation: string
    viewDetails: string
  }
  
  consultationHistory: {
    title: string
    subtitle: string
    newConsultation: string
    searchPlaceholder: string
    filterByStatus: string
    sortBy: string
    allStatus: string
    active: string
    completed: string
    cancelled: string
    date: string
    doctor: string
    status: string
    messages: string
    view: string
    consultationRecords: string
    noConsultationsFound: string
    tryAdjustingSearch: string
    noConsultationsYet: string
    startFirstConsultation: string
    stats: {
      totalConsultations: string
      completed: string
      active: string
      cancelled: string
    }
  }
  
  medicalHistory: {
    title: string
    subtitle: string
    conditions: string
    medications: string
    allergies: string
    procedures: string
    addNew: string
    editHistory: string
    allergiesPlaceholder: string
    addMedication: string
    medicationName: string
    medicationNamePlaceholder: string
    dosage: string
    dosagePlaceholder: string
    frequency: string
    frequencyPlaceholder: string
    prescribedBy: string
    doctorNamePlaceholder: string
    noMedications: string
    chronicConditions: string
    conditionsPlaceholder: string
    pastSurgeries: string
    noPastSurgeries: string
    addSurgery: string
    procedure: string
    procedureNamePlaceholder: string
    date: string
    hospital: string
    hospitalNamePlaceholder: string
    familyHistory: string
    familyHistoryPlaceholder: string
  }
}

// About page
export interface AboutTranslations {
  teamImageAlt: string
  values: {
    compassionateCare: {
      title: string
      description: string
    }
    privacySecurity: {
      title: string
      description: string
    }
    evidenceBased: {
      title: string
      description: string
    }
    advancedAI: {
      title: string
      description: string
    }
  }
}

// Symptoms page
export interface SymptomsTranslations {
  title: string
  subtitle: string
  searchPlaceholder: string
  categories: {
    all: string
    cardiovascular: string
    neurological: string
    respiratory: string
    emergency: string
  }
  features: {
    intelligentAnalysis: string
    intelligentAnalysisDesc: string
    privacyProtected: string
    privacyProtectedDesc: string
    accessible: string
    accessibleDesc: string
    expertValidated: string
    expertValidatedDesc: string
  }
  symptomDetails: {
    chestPain: string
    chestPainDesc: string
    chestPainUrgency: string
    shortnessBreath: string
    shortnessBreathDesc: string
    shortnessBreathUrgency: string
    headache: string
    headacheDesc: string
    headacheUrgency: string
    fever: string
    feverDesc: string
    feverUrgency: string
    nausea: string
    nauseaDesc: string
    nauseaUrgency: string
    dizziness: string
    dizzinessDesc: string
    dizzinessUrgency: string
    fatigue: string
    fatigueDesc: string
    fatigueUrgency: string
    abdominalPain: string
    abdominalPainDesc: string
    abdominalPainUrgency: string
    jointPain: string
    jointPainDesc: string
    jointPainUrgency: string
    cough: string
    coughDesc: string
    coughUrgency: string
    rash: string
    rashDesc: string
    rashUrgency: string
    backPain: string
    backPainDesc: string
    backPainUrgency: string
  }
  emergencySymptoms: {
    severeChestPain: string
    difficultyBreathing: string
    lossConsciousness: string
    severeBleeding: string
    strokeSigns: string
    severeAllergic: string
  }
}

// FAQ page
export interface FAQTranslations {
  title: string
  subtitle: string
  searchPlaceholder: string
  noResults: string
  noResultsDescription: string
  categories: {
    allQuestions: string
    all: string
    general: string
    privacy: string
    technical: string
    medical: string
  }
  questions: {
    whatIsVitalCheck: {
      question: string
      answer: string
    }
    isVitalCheckFree: {
      question: string
      answer: string
    }
    howAccurate: {
      question: string
      answer: string
    }
    isDataSecure: {
      question: string
      answer: string
    }
    canReplaceDoctor: {
      question: string
      answer: string
    }
    howLongAssessment: {
      question: string
      answer: string
    }
    whatIfEmergency: {
      question: string
      answer: string
    }
    canUseChildren: {
      question: string
      answer: string
    }
    howOftenUse: {
      question: string
      answer: string
    }
    whatLanguages: {
      question: string
      answer: string
    }
    howGetResults: {
      question: string
      answer: string
    }
    howProtected: {
      question: string
      answer: string
    }
    doYouStore: {
      question: string
      answer: string
    }
    devicesSupported: {
      question: string
      answer: string
    }
    technicalIssues: {
      question: string
      answer: string
    }
    whenSeekAttention: {
      question: string
      answer: string
    }
    forChildren: {
      question: string
      answer: string
    }
    mobileApp: {
      question: string
      answer: string
    }
    deleteAccount: {
      question: string
      answer: string
    }
  }
}

// Help & FAQ
export interface HelpTranslations {
  title: string
  subtitle: string
  searchPlaceholder: string
  noResults: string
  noResultsDescription: string
  faqTitle: string
  getSupport: string
  additionalResources: string
  accessResource: string
  stillNeedHelp: string
  stillNeedHelpDescription: string
  supportTeam: string
  contactSupport: string
  startAssessment: string
  
  categories: {
    all: string
    allTopics: string
    gettingStarted: string
    features: string
    technical: string
    account: string
  }
  
  topics: {
    gettingStarted: {
      question: string
      answer: string
    }
    features: {
      question: string
      answer: string
    }
    technical: {
      question: string
      answer: string
    }
    account: {
      question: string
      answer: string
    }
    startAssessment: {
      question: string
      answer: string
    }
    informationNeeded: {
      question: string
      answer: string
    }
    aiAnalysis: {
      question: string
      answer: string
    }
    saveResults: {
      question: string
      answer: string
    }
    devicesSupported: {
      question: string
      answer: string
    }
    technicalIssues: {
      question: string
      answer: string
    }
    createAccount: {
      question: string
      answer: string
    }
    resetPassword: {
      question: string
      answer: string
    }
    security: {
      question: string
      answer: string
    }
    emergency: {
      question: string
      answer: string
    }
  }
  
  supportOptions: {
    liveChat: {
      title: string
      description: string
      availability: string
      action: string
    }
    email: {
      title: string
      description: string
      availability: string
      action: string
    }
    phone: {
      title: string
      description: string
      availability: string
      action: string
    }
    helpCenter: {
      title: string
      description: string
      availability: string
      action: string
    }
  }
  
  resources: {
    documentation: {
      title: string
      description: string
      type: string
    }
    videoTutorials: {
      title: string
      description: string
      type: string
    }
    community: {
      title: string
      description: string
      type: string
    }
    userGuide: {
      title: string
      description: string
      type: string
    }
    mobileApp: {
      title: string
      description: string
      type: string
    }
    communityForum: {
      title: string
      description: string
      type: string
    }
  }
}

// Main Translations Interface
export interface Translations {
  // Basic info
  title: string
  subtitle: string
  switchLanguage: string
  
  // Core sections
  common: CommonTranslations
  navigation: NavigationTranslations
  homepage: HomepageTranslations
  healthTopics: HealthTopicsTranslations
  medicalDisclaimer: MedicalDisclaimerTranslations
  emergency: EmergencyTranslations
  questionnaire: QuestionnaireTranslations
  questions: QuestionsTranslations
  results: ResultsTranslations
  auth: AuthTranslations
  patientPortal: PatientPortalTranslations
  about: AboutTranslations
  symptoms: SymptomsTranslations
  help: HelpTranslations
  faq: FAQTranslations
  
  // Medical AI / VitalCheck page
  vitalCheck: {
    title: string
    subtitle: string
    features: {
      intelligentAnalysis: {
        title: string
        description: string
        features: string[]
      }
      dynamicQuestionnaires: {
        title: string
        description: string
        features: string[]
      }
      riskAssessment: {
        title: string
        description: string
        features: string[]
      }
      emergencyDetection: {
        title: string
        description: string
        features: string[]
      }
    }
    capabilities: {
      machineLearning: {
        title: string
        description: string
      }
      hipaaCompliant: {
        title: string
        description: string
      }
      expertValidated: {
        title: string
        description: string
      }
      realTimeProcessing: {
        title: string
        description: string
      }
      personalizedCare: {
        title: string
        description: string
      }
      continuousMonitoring: {
        title: string
        description: string
      }
    }
    statistics: {
      accuracyRate: string
      assessmentsCompleted: string
      availability: string
      medicalSpecialties: string
    }
    testimonials: {
      drMitchell: {
        name: string
        role: string
        quote: string
      }
      drChen: {
        name: string
        role: string
        quote: string
      }
      drRodriguez: {
        name: string
        role: string
        quote: string
      }
    }
    aiPoweredFeatures: string
    performanceMetrics: string
    advancedCapabilities: string
    howItWorks: string
    steps: {
      dataInput: {
        title: string
        description: string
      }
      aiAnalysis: {
        title: string
        description: string
      }
      riskAssessment: {
        title: string
        description: string
      }
      recommendations: {
        title: string
        description: string
      }
    }
    trustedByProfessionals: string
    technologyStack: string
    technologies: {
      nlp: {
        name: string
        description: string
      }
      ml: {
        name: string
        description: string
      }
      databases: {
        name: string
        description: string
      }
      realTime: {
        name: string
        description: string
      }
    }
    experienceAI: string
    experienceAIDescription: string
    tryAIAssessment: string
    viewQuestionnaires: string
  }
  
  // Contact form
  contact: {
    form: {
      namePlaceholder: string
    }
  }
  
  // Severity and duration options
  severity: {
    mild: string
    moderate: string
    severe: string
    emergency: string
    unbearable: string
  }
  
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
  
  gender: {
    male: string
    female: string
    other: string
    preferNotSay: string
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
  
  // Consultation
  consultation: {
    startConsultation: string
    chooseSpecialty: string
    select: string
    busy: string
    noDoctorsFound: string
    startConversation: string
    consultationHistory: string
    noHistory: string
    viewDetails: string
    restartConsultation: string
    title: string
    subtitle: string
    selectDoctor: string
    currentConsultation: string
    history: string
    selectedDoctor: string
  }
  
  // Consultation Chat
  consultationChat: {
    welcomeMessages: {
      generalMedicine: string
      cardiology: string
      neurology: string
      pediatrics: string
      internalMedicine: string
    }
    quickActions: {
      generalMedicine: string
      cardiology: string
      neurology: string
      pediatrics: string
      internalMedicine: string
    }
    endConsultation: string
    doctorTyping: string
    typeMessage: string
    send: string
  }
  
  // Scale
  scale: {
    scaleLabel: string
    lowLabel: string
    highLabel: string
  }

  // Symptom autocomplete
  symptomAutocomplete: {
    orDescribeSymptoms: string
    describeSymptomsPlaceholder: string
    typeSymptomsPlaceholder: string
    noMatchingSymptoms: string
    generatingSuggestions: string
    popularSymptoms: {
      headache: string
      fever: string
      cough: string
      soreThroat: string
      nausea: string
      dizziness: string
      fatigue: string
      shortnessOfBreath: string
    }
  }

  // Medical options with English translations
  medicalOptions: {
    severity: {
      mild: string
      moderate: string
      severe: string
      verySevere: string
      unbearable: string
    }
    duration: {
      minutes: string
      hours: string
      days: string
      weeks: string
      months: string
    }
    location: {
      head: string
      chest: string
      abdomen: string
      back: string
      arms: string
      legs: string
    }
    symptoms: {
      cough: string
      soreThroat: string
      headache: string
      muscleAches: string
      fatigue: string
      nausea: string
      vomiting: string
      fever: string
      chills: string
      sweating: string
      dizziness: string
      shortnessOfBreath: string
      chestPain: string
      abdominalPain: string
      backPain: string
      jointPain: string
    }
    responses: {
      yes: string
      no: string
      notSure: string
      sometimes: string
      always: string
      never: string
    }
  }

  // AI Agent data
  aiAgents: {
    general: {
      name: string
      specialty: string
      benefits: {
        eliminateCommute: string
        flexiblePlans: string
        accurateDiagnostics: string
      }
    }
    cardiology: {
      name: string
      specialty: string
      benefits: {
        specializedConsultations: string
        personalizedPrevention: string
        directAccess: string
        continuousMonitoring: string
      }
    }
    neurology: {
      name: string
      specialty: string
      benefits: {
        advancedEvaluations: string
        earlyDetection: string
        personalizedRehabilitation: string
        continuousMonitoring: string
        innovativeTherapies: string
      }
    }
    pediatrics: {
      name: string
      specialty: string
      benefits: {
        childDevelopment: string
        vaccinationCare: string
        familyConsultations: string
        personalizedGrowth: string
      }
    }
    internalMedicine: {
      name: string
      specialty: string
      benefits: {
        chronicDiseaseManagement: string
        careCoordination: string
        advancedPreventive: string
        predictiveAnalytics: string
        personalizedCare: string
      }
    }
  }

  // About page
  aboutPage: {
    title: string
    subtitle: string
    mission: {
      title: string
      description1: string
      description2: string
    }
    coreValues: {
      title: string
    }
    team: {
      title: string
      members: {
        sarahMitchell: {
          name: string
          role: string
          description: string
        }
        alexRodriguez: {
          name: string
          role: string
          description: string
        }
        emilyChen: {
          name: string
          role: string
          description: string
        }
      }
    }
    impact: {
      title: string
      assessmentsCompleted: string
      userSatisfaction: string
      availability: string
      medicalSpecialties: string
    }
    cta: {
      title: string
      description: string
      buttonText: string
    }
  }

  // Emergency messages
  emergencyMessages: {
    goToNearestER: string
    doNotDelay: string
    emergencySymptoms: string
    call911: string
    seekImmediateCare: string
  }

  // Common conditions
  commonConditions: {
    diabetes: string
    hypertension: string
    asthma: string
    migraine: string
    depression: string
    anxiety: string
  }

  // Doctor selection
  doctorSelection: {
    allSpecialties: string
    responseTime: string
    rating: string
    consultations: string
    available: string
    busy: string
    quickActions: string
    chooseSpecialty: string
    aiPoweredWithKnowledge: string
    specializedInComprehensive: string
    specializedInHeartHealth: string
    specializedInBrainConditions: string
    specializedInChildHealth: string
    specializedInAdultMedicine: string
    aiPoweredWithCardiology: string
    aiPoweredWithNeurology: string
    aiPoweredWithPediatric: string
    aiPoweredWithInternal: string
  }

  // Mock doctor responses
  mockResponses: {
    generalMedicine: string[]
    cardiology: string[]
    neurology: string[]
    pediatrics: string[]
    internalMedicine: string[]
  }
}