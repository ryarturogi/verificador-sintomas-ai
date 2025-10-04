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
    vitalCheck: string
    help: string
    search: string
    popularSymptoms: string
  }
  
  // Homepage
  homepage: {
    mainTitle: string
    mainSubtitle: string
    searchPlaceholder: string
    searchDoctor: string
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
  
  // Consultation
  consultation: {
    title: string
    subtitle: string
    selectDoctor: string
    chooseSpecialty: string
    selectedDoctor: string
    startConsultation: string
    endConsultation: string
    currentConsultation: string
    history: string
    consultationHistory: string
    noHistory: string
    select: string
    busy: string
    noDoctorsFound: string
    startConversation: string
    typeMessage: string
    doctorTyping: string
    viewDetails: string
    restartConsultation: string
    available: string
    responseTime: string
    rating: string
    consultations: string
    status: string
    startTime: string
    endTime: string
    messages: string
    summary: string
    recommendations: string
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
    send: string
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

  // Symptoms page
  symptoms: {
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
  }

  // Help page
  help: {
    title: string
    subtitle: string
    searchPlaceholder: string
    categories: {
      all: string
      gettingStarted: string
      features: string
      technical: string
      account: string
    }
  }

  // FAQ page
  faq: {
    title: string
    subtitle: string
    searchPlaceholder: string
    categories: {
      all: string
      general: string
      privacy: string
      technical: string
      medical: string
    }
    questions: {
      whatIsVitalCheck: string
      whatIsVitalCheckAnswer: string
      isVitalCheckFree: string
      isVitalCheckFreeAnswer: string
      howAccurate: string
      howAccurateAnswer: string
      isDataSecure: string
      isDataSecureAnswer: string
      canReplaceDoctor: string
      canReplaceDoctorAnswer: string
      howLongAssessment: string
      howLongAssessmentAnswer: string
      whatIfEmergency: string
      whatIfEmergencyAnswer: string
      canUseChildren: string
      canUseChildrenAnswer: string
      howOftenUse: string
      howOftenUseAnswer: string
      whatLanguages: string
      whatLanguagesAnswer: string
      howGetResults: string
      howGetResultsAnswer: string
    }
  }

  // Auth forms
  auth: {
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

  // Patient portal
  patientPortal: {
    dashboard: {
      title: string
      subtitle: string
      welcomeBack: string
      recentConsultations: string
      medicalHistory: string
      upcomingAppointments: string
      healthSummary: string
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
    medicalHistory: {
      title: string
      subtitle: string
      conditions: string
      medications: string
      allergies: string
      procedures: string
      addNew: string
    }
  }

  // Consultation chat
  consultationChat: {
    welcomeMessages: {
      generalMedicine: string
      cardiology: string
      neurology: string
      pediatrics: string
      internalMedicine: string
    }
    quickActions: {
      generalMedicine: string[]
      cardiology: string[]
      neurology: string[]
      pediatrics: string[]
      internalMedicine: string[]
    }
    typeMessage: string
    send: string
    endConsultation: string
    restartConsultation: string
    doctorTyping: string
  }

  // Page titles and metadata
  pages: {
    symptoms: {
      title: string
      description: string
    }
    help: {
      title: string
      description: string
    }
    faq: {
      title: string
      description: string
    }
    consultation: {
      title: string
      description: string
    }
    patientPortal: {
      title: string
      description: string
    }
    consultations: {
      title: string
      description: string
    }
    profile: {
      title: string
      description: string
    }
    medicalHistory: {
      title: string
      description: string
    }
    login: {
      title: string
      description: string
    }
    signup: {
      title: string
      description: string
    }
  }

  // API validation messages
  api: {
    validation: {
      provideMoreDetails: string
    }
  }

  // Medical AI
  vitalCheck: {
    title: string
    subtitle: string
    aiPoweredFeatures: string
    performanceMetrics: string
    advancedCapabilities: string
    howItWorks: string
    trustedByProfessionals: string
    technologyStack: string
    experienceAI: string
    experienceAIDescription: string
    tryAIAssessment: string
    viewQuestionnaires: string
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
      vitalCheck: "VitalCheck",
      help: "Help",
      search: "Search",
      popularSymptoms: "Popular symptoms"
    },
    
    homepage: {
      mainTitle: "VitalCheck - AI-Powered Health Assessment Tool",
      mainSubtitle: "Dynamic questionnaire that adapts to your responses for personalized medical assessment",
      searchPlaceholder: "Describe your symptoms...",
      searchDoctor: "Search Doctor",
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
      feelBetterAbout: "VitalCheck helps you feel better about",
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
      popularSearches: "Popular Searches on VitalCheck",
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
      toolsAndInformation: "VitalCheck gives you the tools and information you need to",
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
      whyChoose: "Why you choose VitalCheck",
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
      subscribeNews: "Subscribe for any news update from VitalCheck",
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
      faq: "VitalCheck FAQ",
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
    
    consultation: {
      title: "Free AI Doctor Consultation",
      subtitle: "Get expert medical advice from AI agents specialized in different medical fields",
      selectDoctor: "Select Doctor",
      chooseSpecialty: "Choose an AI Doctor Specialty",
      selectedDoctor: "Selected Doctor",
      startConsultation: "Start Consultation",
      endConsultation: "End Consultation",
      currentConsultation: "Current Consultation",
      history: "History",
      consultationHistory: "Consultation History",
      noHistory: "No consultation history found",
      select: "Select",
      busy: "Busy",
      noDoctorsFound: "No doctors found for this specialty",
      startConversation: "Start the conversation by describing your symptoms or concerns",
      typeMessage: "Type your message...",
      doctorTyping: "AI Doctor is typing...",
      viewDetails: "View Details",
      restartConsultation: "Restart Consultation",
      available: "Available",
      responseTime: "Response time",
      rating: "Rating",
      consultations: "Consultations",
      status: "Status",
      startTime: "Start Time",
      endTime: "End Time",
      messages: "Messages",
      summary: "Summary",
      recommendations: "Recommendations"
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
      processing: "Processing...",
      send: "Send"
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
    },

    symptoms: {
      title: "Symptoms Library",
      subtitle: "Explore common symptoms and their characteristics",
      searchPlaceholder: "Search symptoms...",
      categories: {
        all: "All Symptoms",
        cardiovascular: "Cardiovascular",
        neurological: "Neurological",
        respiratory: "Respiratory",
        emergency: "Emergency"
      },
      symptomDetails: {
        chestPain: "Chest Pain",
        chestPainDesc: "Pain or discomfort in the chest area",
        chestPainUrgency: "Seek immediate medical attention if severe or persistent",
        shortnessBreath: "Shortness of Breath",
        shortnessBreathDesc: "Difficulty breathing or feeling breathless",
        shortnessBreathUrgency: "Emergency if sudden onset or severe",
        headache: "Headache",
        headacheDesc: "Pain or discomfort in the head or neck area",
        headacheUrgency: "Seek medical attention if severe or sudden onset",
        fever: "Fever",
        feverDesc: "Elevated body temperature above normal range",
        feverUrgency: "Monitor and seek care if persistent or high grade",
        nausea: "Nausea",
        nauseaDesc: "Feeling of sickness with inclination to vomit",
        nauseaUrgency: "Usually self-limiting, seek care if persistent",
        dizziness: "Dizziness",
        dizzinessDesc: "Feeling of lightheadedness or unsteadiness",
        dizzinessUrgency: "Seek care if frequent or severe",
        fatigue: "Fatigue",
        fatigueDesc: "Extreme tiredness or lack of energy",
        fatigueUrgency: "Monitor and seek care if persistent or severe",
        abdominalPain: "Abdominal Pain",
        abdominalPainDesc: "Pain or discomfort in the stomach area",
        abdominalPainUrgency: "Seek care if severe, persistent, or worsening",
        jointPain: "Joint Pain",
        jointPainDesc: "Pain or discomfort in joints",
        jointPainUrgency: "Monitor and seek care if severe or persistent",
        cough: "Cough",
        coughDesc: "Reflex action to clear throat or airways",
        coughUrgency: "Seek care if persistent, severe, or with blood",
        rash: "Rash",
        rashDesc: "Change in skin appearance or texture",
        rashUrgency: "Seek care if widespread, severe, or with fever",
        backPain: "Back Pain",
        backPainDesc: "Pain or discomfort in the back area",
        backPainUrgency: "Seek care if severe, persistent, or with other symptoms"
      },
      emergencySymptoms: {
        severeChestPain: "Severe chest pain",
        difficultyBreathing: "Difficulty breathing",
        lossConsciousness: "Loss of consciousness",
        severeBleeding: "Severe bleeding",
        strokeSigns: "Signs of stroke",
        severeAllergic: "Severe allergic reaction"
      },
      features: {
        intelligentAnalysis: "Intelligent Analysis",
        intelligentAnalysisDesc: "AI-powered symptom analysis with medical-grade accuracy",
        privacyProtected: "Privacy Protected",
        privacyProtectedDesc: "Your health information is encrypted and never shared without consent",
        accessible: "24/7 Accessible",
        accessibleDesc: "Get symptom analysis and guidance anytime, anywhere",
        expertValidated: "Expert Validated",
        expertValidatedDesc: "All assessments are validated by medical professionals"
      }
    },

    help: {
      title: "Help Center",
      subtitle: "Find answers to your questions and learn how to use VitalCheck",
      searchPlaceholder: "Search help topics...",
      categories: {
        all: "All Topics",
        gettingStarted: "Getting Started",
        features: "Features",
        technical: "Technical",
        account: "Account"
      }
    },

    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about VitalCheck",
      searchPlaceholder: "Search questions...",
      categories: {
        all: "All Questions",
        general: "General",
        privacy: "Privacy & Security",
        technical: "Technical",
        medical: "Medical"
      },
      questions: {
        whatIsVitalCheck: "What is VitalCheck and how does it work?",
        whatIsVitalCheckAnswer: "VitalCheck is an advanced AI-powered platform that helps users assess their symptoms and provides intelligent health guidance. Our system uses sophisticated machine learning algorithms trained on comprehensive medical databases to analyze symptoms and provide personalized recommendations. The platform asks targeted questions based on your responses and generates evidence-based health insights.",
        isVitalCheckFree: "Is VitalCheck free to use?",
        isVitalCheckFreeAnswer: "Yes, VitalCheck offers a free tier that includes basic symptom assessment and health guidance. We also offer premium features for more detailed analysis and personalized health tracking. Our goal is to make quality healthcare guidance accessible to everyone.",
        howAccurate: "How accurate is VitalCheck's assessment?",
        howAccurateAnswer: "VitalCheck uses advanced AI models trained on extensive medical databases and validated by healthcare professionals. While our assessments are highly accurate, they are not a substitute for professional medical diagnosis. We recommend consulting with healthcare providers for any serious concerns.",
        isDataSecure: "Is my health data secure?",
        isDataSecureAnswer: "Yes, we take data security very seriously. All health information is encrypted using industry-standard protocols, and we comply with HIPAA regulations. Your data is never shared without your explicit consent, and we use it only to provide you with better health insights.",
        canReplaceDoctor: "Can VitalCheck replace my doctor?",
        canReplaceDoctorAnswer: "No, VitalCheck is designed to complement, not replace, professional medical care. It provides health information and guidance but should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.",
        howLongAssessment: "How long does an assessment take?",
        howLongAssessmentAnswer: "A typical assessment takes 5-15 minutes, depending on the complexity of your symptoms and the number of follow-up questions needed. The AI adapts the questionnaire based on your responses to provide the most relevant assessment.",
        whatIfEmergency: "What if I have an emergency?",
        whatIfEmergencyAnswer: "If you're experiencing a medical emergency, call 911 or go to the nearest emergency room immediately. VitalCheck is not designed for emergency situations and should not delay seeking immediate medical attention.",
        canUseChildren: "Can I use VitalCheck for my children?",
        canUseChildrenAnswer: "Yes, VitalCheck has specialized pediatric assessments designed for children. However, we recommend consulting with a pediatrician for any serious concerns about your child's health.",
        howOftenUse: "How often can I use VitalCheck?",
        howOftenUseAnswer: "You can use VitalCheck as often as needed. There are no limits on the number of assessments you can perform. We encourage regular health monitoring and symptom tracking.",
        whatLanguages: "What languages does VitalCheck support?",
        whatLanguagesAnswer: "Currently, VitalCheck supports English and Spanish. We're working on adding more languages to make our platform accessible to a broader audience.",
        howGetResults: "How do I get my assessment results?",
        howGetResultsAnswer: "Your assessment results are displayed immediately after completing the questionnaire. You can also access your assessment history through your patient portal account. Results include symptom analysis, possible conditions, and recommendations."
      }
    },

    auth: {
      login: {
        title: "Sign In",
        subtitle: "Welcome back to your VitalCheck account",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        loginButton: "Sign In",
        forgotPassword: "Forgot your password?",
        noAccount: "Don't have an account?",
        signUpLink: "Sign up here",
        backToHome: "Back to Home",
        errors: {
          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email address",
          passwordRequired: "Password is required",
          passwordMinLength: "Password must be at least 6 characters",
          loginFailed: "Login failed. Please check your credentials and try again."
        }
      },
      signup: {
        title: "Create Account",
        subtitle: "Join VitalCheck and start your health journey",
        firstNameLabel: "First Name",
        firstNamePlaceholder: "First name",
        lastNameLabel: "Last Name",
        lastNamePlaceholder: "Last name",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        phoneLabel: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        passwordLabel: "Password",
        passwordPlaceholder: "Create a password",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
        agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
        signupButton: "Create Account",
        haveAccount: "Already have an account?",
        loginLink: "Sign in here",
        backToHome: "Back to Home",
        errors: {
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required",
          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email address",
          phoneRequired: "Phone number is required",
          phoneInvalid: "Please enter a valid phone number",
          passwordRequired: "Password is required",
          passwordMinLength: "Password must be at least 6 characters",
          confirmPasswordRequired: "Please confirm your password",
          passwordsMatch: "Passwords do not match",
          termsRequired: "You must agree to the terms and conditions",
          signupFailed: "Sign up failed. Please try again."
        }
      }
    },

    patientPortal: {
      dashboard: {
        title: "Patient Portal",
        subtitle: "Your Health Dashboard",
        welcomeBack: "Welcome back",
        recentConsultations: "Recent Consultations",
        medicalHistory: "Medical History",
        upcomingAppointments: "Upcoming Appointments",
        healthSummary: "Health Summary"
      },
      profile: {
        title: "Profile",
        subtitle: "Manage your personal information",
        personalInfo: "Personal Information",
        firstNameLabel: "First Name",
        firstNamePlaceholder: "Enter your first name",
        lastNameLabel: "Last Name",
        lastNamePlaceholder: "Enter your last name",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email address",
        phoneLabel: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        dateOfBirthLabel: "Date of Birth",
        dateOfBirthPlaceholder: "Select your date of birth",
        genderLabel: "Gender",
        genderPlaceholder: "Select gender",
        emergencyContactLabel: "Emergency Contact",
        emergencyContactPlaceholder: "Emergency contact name",
        saveChanges: "Save Changes",
        cancel: "Cancel"
      },
      consultations: {
        title: "Consultations",
        subtitle: "Your consultation history",
        noConsultations: "No consultations found",
        startNewConsultation: "Start New Consultation",
        viewDetails: "View Details"
      },
      medicalHistory: {
        title: "Medical History",
        subtitle: "Manage your health records",
        conditions: "Medical Conditions",
        medications: "Current Medications",
        allergies: "Allergies",
        procedures: "Procedures",
        addNew: "Add New"
      }
    },

    consultationChat: {
      welcomeMessages: {
        generalMedicine: "Hello! I'm Dr. Henry, your AI General Medicine specialist. I'm here to help you with any health concerns or questions you may have. Please describe what's bothering you today, and I'll do my best to provide helpful guidance.",
        cardiology: "Hello! I'm Dr. Floyd Miles, your AI Cardiology specialist. I specialize in heart health and cardiovascular conditions. Please tell me about any heart-related symptoms or concerns you're experiencing.",
        neurology: "Hello! I'm Dr. McKinney, your AI Neurology specialist. I focus on brain and nervous system conditions. Please describe any neurological symptoms, headaches, or concerns you'd like to discuss.",
        pediatrics: "Hello! I'm Dr. Jacob, your AI Pediatrics specialist. I specialize in child health and developmental concerns. Please tell me about your child's symptoms or any pediatric health questions you have.",
        internalMedicine: "Hello! I'm Dr. Warren, your AI Internal Medicine specialist. I handle adult medicine and complex medical cases. Please describe your symptoms or health concerns, and I'll provide appropriate guidance."
      },
      quickActions: {
        generalMedicine: [
          "I have a headache",
          "I feel tired all the time",
          "I have a fever",
          "I have stomach pain",
          "I have a cough"
        ],
        cardiology: [
          "I have chest pain",
          "I feel short of breath",
          "My heart is racing",
          "I have chest pressure",
          "I feel dizzy"
        ],
        neurology: [
          "I have a severe headache",
          "I feel dizzy",
          "I have vision problems",
          "I have numbness",
          "I have memory issues"
        ],
        pediatrics: [
          "My child has a fever",
          "My child won't eat",
          "My child is crying a lot",
          "My child has a rash",
          "My child is coughing"
        ],
        internalMedicine: [
          "I have chronic pain",
          "I feel fatigued",
          "I have digestive issues",
          "I have joint pain",
          "I have breathing problems"
        ]
      },
      typeMessage: "Type your message...",
      send: "Send",
      endConsultation: "End Consultation",
      restartConsultation: "Restart Consultation",
      doctorTyping: "AI Doctor is typing..."
    },

    pages: {
      symptoms: {
        title: "Symptoms | VitalCheck",
        description: "Explore common symptoms and their characteristics with detailed medical information"
      },
      help: {
        title: "Help Center | VitalCheck",
        description: "Find answers to your questions and learn how to use VitalCheck effectively"
      },
      faq: {
        title: "FAQ | VitalCheck",
        description: "Frequently asked questions about VitalCheck and its features"
      },
      consultation: {
        title: "AI Doctor Consultation | VitalCheck",
        description: "Get free consultation with AI doctors specializing in different medical fields"
      },
      patientPortal: {
        title: "Patient Portal | Your Health Dashboard",
        description: "Access your health information, consultation history, and medical records securely"
      },
      consultations: {
        title: "Consultations | Patient Portal",
        description: "View your consultation history and manage appointments"
      },
      profile: {
        title: "Profile | Patient Portal",
        description: "Manage your personal information and account settings"
      },
      medicalHistory: {
        title: "Medical History | Patient Portal",
        description: "Manage your medical history, medications, and health records"
      },
      login: {
        title: "Login | VitalCheck Patient Portal",
        description: "Sign in to your VitalCheck patient portal account"
      },
      signup: {
        title: "Sign Up | VitalCheck Patient Portal",
        description: "Create your VitalCheck patient portal account"
      }
    },

    api: {
      validation: {
        provideMoreDetails: "Please provide more details about your concern"
      }
    },

    // Contact page
    contact: {
      form: {
        namePlaceholder: "Your full name"
      }
    },

    // About page
    about: {
      teamImageAlt: "Medical Team",
      values: {
        compassionateCare: {
          title: "Compassionate Care",
          description: "Every interaction is guided by empathy and understanding of patient needs."
        },
        privacySecurity: {
          title: "Privacy & Security",
          description: "Your health information is protected with enterprise-grade security measures."
        },
        evidenceBased: {
          title: "Evidence-Based",
          description: "All recommendations are grounded in current medical literature and best practices."
        }
      }
    },

    // Patient Portal Medical History
    patientPortal: {
      loading: "Loading Patient Portal...",
      nav: {
        title: "VitalCheck Portal",
        welcome: "Welcome",
        signOut: "Sign Out",
        dashboard: "Dashboard",
        dashboardDescription: "Overview of your health data",
        profile: "Profile",
        profileDescription: "Manage your personal information",
        consultations: "Consultations",
        consultationsDescription: "View consultation history",
        medicalHistory: "Medical History",
        medicalHistoryDescription: "Manage your medical information"
      },
      medicalHistory: {
        medicationNamePlaceholder: "Enter medication name",
        doctorNamePlaceholder: "Doctor's name",
        procedureNamePlaceholder: "Enter procedure name",
        hospitalNamePlaceholder: "Hospital name"
      },
      consultationHistory: {
        title: "Consultation History",
        subtitle: "View and manage your consultation records",
        newConsultation: "New Consultation",
        searchPlaceholder: "Search consultations...",
        filterByStatus: "Filter by status",
        sortBy: "Sort by",
        stats: {
          totalConsultations: "Total Consultations",
          completed: "Completed",
          active: "Active"
        }
      }
    },

    // Medical AI
    vitalCheck: {
      title: "Medical AI Technology",
      subtitle: "Advanced artificial intelligence for healthcare assessment and diagnosis",
      aiPoweredFeatures: "AI-Powered Features",
      performanceMetrics: "AI Performance Metrics",
      advancedCapabilities: "Advanced AI Capabilities",
      howItWorks: "How Our AI Works",
      trustedByProfessionals: "Trusted by Medical Professionals",
      technologyStack: "Advanced Technology Stack",
      experienceAI: "Experience AI-Powered Healthcare",
      experienceAIDescription: "Get personalized health insights powered by cutting-edge artificial intelligence",
      tryAIAssessment: "Try AI Assessment",
      viewQuestionnaires: "View Questionnaires",
      features: {
        intelligentAnalysis: {
          title: "Intelligent Symptom Analysis",
          description: "Advanced AI algorithms analyze your symptoms with medical-grade accuracy",
          features: [
            "Real-time symptom analysis",
            "Medical database integration",
            "Risk assessment algorithms",
            "Emergency detection"
          ]
        },
        dynamicQuestionnaires: {
          title: "Dynamic Questionnaires",
          description: "Adaptive questioning that evolves based on your responses",
          features: [
            "Personalized question flow",
            "Context-aware follow-ups",
            "Medical specialty targeting",
            "Comprehensive assessment"
          ]
        },
        riskAssessment: {
          title: "Risk Assessment",
          description: "Evaluate potential health risks with precision",
          features: [
            "Multi-factor analysis",
            "Risk stratification",
            "Preventive recommendations",
            "Follow-up guidance"
          ]
        },
        emergencyDetection: {
          title: "Emergency Detection",
          description: "Immediate identification of urgent medical conditions",
          features: [
            "Critical symptom recognition",
            "Emergency protocol activation",
            "Immediate care recommendations",
            "Emergency contact integration"
          ]
        }
      },
      capabilities: {
        machineLearning: {
          title: "Machine Learning",
          description: "Continuously improving algorithms that learn from medical data and outcomes"
        },
        hipaaCompliant: {
          title: "HIPAA Compliant",
          description: "Enterprise-grade security and privacy protection for all health data"
        },
        expertValidated: {
          title: "Expert Validated",
          description: "Developed and validated by medical professionals and clinical experts"
        },
        realTimeProcessing: {
          title: "Real-Time Processing",
          description: "Instant analysis and recommendations without delays"
        },
        personalizedCare: {
          title: "Personalized Care",
          description: "Tailored recommendations based on individual health profiles"
        },
        continuousMonitoring: {
          title: "Continuous Monitoring",
          description: "Ongoing health tracking and trend analysis"
        }
      },
      statistics: {
        accuracyRate: "Accuracy Rate",
        assessmentsCompleted: "Assessments Completed",
        availability: "Availability",
        medicalSpecialties: "Medical Specialties"
      },
      testimonials: {
        drMitchell: {
          name: "Dr. Sarah Mitchell",
          role: "Chief Medical Officer",
          quote: "This AI system has revolutionized how we approach preliminary health assessments. The accuracy and speed are remarkable."
        },
        drChen: {
          name: "Dr. Emily Chen",
          role: "Head of Clinical Research",
          quote: "The machine learning algorithms are incredibly sophisticated. They catch nuances that even experienced clinicians might miss."
        },
        drRodriguez: {
          name: "Dr. Michael Rodriguez",
          role: "Emergency Medicine Specialist",
          quote: "The emergency detection capabilities have saved lives. It's like having a medical expert available 24/7."
        }
      },
      steps: {
        dataInput: {
          title: "Data Input",
          description: "Comprehensive symptom and health information collection"
        },
        aiAnalysis: {
          title: "AI Analysis",
          description: "Advanced algorithms process and analyze your health data"
        },
        riskAssessment: {
          title: "Risk Assessment",
          description: "Evaluation of potential health risks and conditions"
        },
        recommendations: {
          title: "Recommendations",
          description: "Personalized health guidance and next steps"
        }
      },
      technologies: {
        nlp: {
          name: "Natural Language Processing",
          description: "Advanced NLP for understanding and processing medical text"
        },
        ml: {
          name: "Machine Learning",
          description: "Deep learning algorithms for pattern recognition and prediction"
        },
        databases: {
          name: "Medical Databases",
          description: "Integration with comprehensive medical knowledge bases"
        },
        realTime: {
          name: "Real-Time Processing",
          description: "Instant analysis and response capabilities"
        }
      }
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
      vitalCheck: "VitalCheck",
      help: "Ayuda",
      search: "Buscar",
      popularSymptoms: "Síntomas populares"
    },
    
    homepage: {
      mainTitle: "VitalCheck - Evaluación de salud inteligente con IA",
      mainSubtitle: "Cuestionario dinámico que se adapta a tus respuestas para una evaluación médica personalizada",
      searchPlaceholder: "Describe tus síntomas...",
      searchDoctor: "Buscar Doctor",
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
      feelBetterAbout: "VitalCheck te ayuda a sentirte mejor acerca de",
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
      popularSearches: "Búsquedas Populares en VitalCheck",
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
      toolsAndInformation: "VitalCheck te da las herramientas e información que necesitas para",
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
      whyChoose: "Por qué elegir VitalCheck",
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
      subscribeNews: "Suscríbete para recibir actualizaciones de noticias de VitalCheck",
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
      faq: "Preguntas Frecuentes de VitalCheck",
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
    
    consultation: {
      title: "Consulta Gratuita con Doctores IA",
      subtitle: "Obtén consejo médico experto de agentes IA especializados en diferentes campos médicos",
      selectDoctor: "Seleccionar Doctor",
      chooseSpecialty: "Elegir una Especialidad de Doctor IA",
      selectedDoctor: "Doctor Seleccionado",
      startConsultation: "Iniciar Consulta",
      endConsultation: "Terminar Consulta",
      currentConsultation: "Consulta Actual",
      history: "Historial",
      consultationHistory: "Historial de Consultas",
      noHistory: "No se encontró historial de consultas",
      select: "Seleccionar",
      busy: "Ocupado",
      noDoctorsFound: "No se encontraron doctores para esta especialidad",
      startConversation: "Inicia la conversación describiendo tus síntomas o preocupaciones",
      typeMessage: "Escribe tu mensaje...",
      doctorTyping: "El Doctor IA está escribiendo...",
      viewDetails: "Ver Detalles",
      restartConsultation: "Reiniciar Consulta",
      available: "Disponible",
      responseTime: "Tiempo de respuesta",
      rating: "Calificación",
      consultations: "Consultas",
      status: "Estado",
      startTime: "Hora de inicio",
      endTime: "Hora de fin",
      messages: "Mensajes",
      summary: "Resumen",
      recommendations: "Recomendaciones"
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
      processing: "Procesando...",
      send: "Enviar"
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
    },

    symptoms: {
      title: "Biblioteca de Síntomas",
      subtitle: "Explora síntomas comunes y sus características",
      searchPlaceholder: "Buscar síntomas...",
      categories: {
        all: "Todos los Síntomas",
        cardiovascular: "Cardiovascular",
        neurological: "Neurológico",
        respiratory: "Respiratorio",
        emergency: "Emergencia"
      },
      symptomDetails: {
        chestPain: "Dolor de Pecho",
        chestPainDesc: "Dolor o molestia en el área del pecho",
        chestPainUrgency: "Busca atención médica inmediata si es severo o persistente",
        shortnessBreath: "Dificultad para Respirar",
        shortnessBreathDesc: "Dificultad para respirar o sensación de falta de aire",
        shortnessBreathUrgency: "Emergencia si es de inicio súbito o severo",
        headache: "Dolor de Cabeza",
        headacheDesc: "Dolor o molestia en la cabeza o área del cuello",
        headacheUrgency: "Busca atención médica si es severo o de inicio súbito",
        fever: "Fiebre",
        feverDesc: "Temperatura corporal elevada por encima del rango normal",
        feverUrgency: "Monitorea y busca atención si es persistente o alta",
        nausea: "Náusea",
        nauseaDesc: "Sensación de malestar con inclinación a vomitar",
        nauseaUrgency: "Generalmente autolimitada, busca atención si persiste",
        dizziness: "Mareo",
        dizzinessDesc: "Sensación de aturdimiento o inestabilidad",
        dizzinessUrgency: "Busca atención si es frecuente o severo",
        fatigue: "Fatiga",
        fatigueDesc: "Cansancio extremo o falta de energía",
        fatigueUrgency: "Monitorea y busca atención si es persistente o severo",
        abdominalPain: "Dolor Abdominal",
        abdominalPainDesc: "Dolor o molestia en el área del estómago",
        abdominalPainUrgency: "Busca atención si es severo, persistente o empeorando",
        jointPain: "Dolor Articular",
        jointPainDesc: "Dolor o molestia en las articulaciones",
        jointPainUrgency: "Monitorea y busca atención si es severo o persistente",
        cough: "Tos",
        coughDesc: "Acción refleja para limpiar la garganta o vías respiratorias",
        coughUrgency: "Busca atención si es persistente, severa o con sangre",
        rash: "Erupción",
        rashDesc: "Cambio en la apariencia o textura de la piel",
        rashUrgency: "Busca atención si es generalizada, severa o con fiebre",
        backPain: "Dolor de Espalda",
        backPainDesc: "Dolor o molestia en el área de la espalda",
        backPainUrgency: "Busca atención si es severo, persistente o con otros síntomas"
      },
      emergencySymptoms: {
        severeChestPain: "Dolor severo de pecho",
        difficultyBreathing: "Dificultad para respirar",
        lossConsciousness: "Pérdida de conciencia",
        severeBleeding: "Sangrado severo",
        strokeSigns: "Signos de derrame cerebral",
        severeAllergic: "Reacción alérgica severa"
      },
      features: {
        intelligentAnalysis: "Análisis Inteligente",
        intelligentAnalysisDesc: "Análisis de síntomas impulsado por IA con precisión de grado médico",
        privacyProtected: "Privacidad Protegida",
        privacyProtectedDesc: "Tu información de salud está encriptada y nunca se comparte sin consentimiento",
        accessible: "Accesible 24/7",
        accessibleDesc: "Obtén análisis de síntomas y orientación en cualquier momento, en cualquier lugar",
        expertValidated: "Validado por Expertos",
        expertValidatedDesc: "Todas las evaluaciones están validadas por profesionales médicos"
      }
    },

    help: {
      title: "Centro de Ayuda",
      subtitle: "Encuentra respuestas a tus preguntas y aprende cómo usar VitalCheck",
      searchPlaceholder: "Buscar temas de ayuda...",
      categories: {
        all: "Todos los Temas",
        gettingStarted: "Primeros Pasos",
        features: "Características",
        technical: "Técnico",
        account: "Cuenta"
      }
    },

    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Encuentra respuestas a preguntas comunes sobre VitalCheck",
      searchPlaceholder: "Buscar preguntas...",
      categories: {
        all: "Todas las Preguntas",
        general: "General",
        privacy: "Privacidad y Seguridad",
        technical: "Técnico",
        medical: "Médico"
      },
      questions: {
        whatIsVitalCheck: "¿Qué es VitalCheck y cómo funciona?",
        whatIsVitalCheckAnswer: "VitalCheck es una plataforma avanzada impulsada por IA que ayuda a los usuarios a evaluar sus síntomas y proporciona orientación de salud inteligente. Nuestro sistema utiliza algoritmos sofisticados de aprendizaje automático entrenados en bases de datos médicas integrales para analizar síntomas y proporcionar recomendaciones personalizadas. La plataforma hace preguntas específicas basadas en tus respuestas y genera conocimientos de salud basados en evidencia.",
        isVitalCheckFree: "¿Es VitalCheck gratuito?",
        isVitalCheckFreeAnswer: "Sí, VitalCheck ofrece un nivel gratuito que incluye evaluación básica de síntomas y orientación de salud. También ofrecemos características premium para análisis más detallados y seguimiento de salud personalizado. Nuestro objetivo es hacer que la orientación de salud de calidad sea accesible para todos.",
        howAccurate: "¿Qué tan preciso es la evaluación de VitalCheck?",
        howAccurateAnswer: "VitalCheck utiliza modelos de IA avanzados entrenados en extensas bases de datos médicas y validados por profesionales de la salud. Aunque nuestras evaluaciones son muy precisas, no son un sustituto del diagnóstico médico profesional. Recomendamos consultar con proveedores de atención médica para cualquier preocupación seria.",
        isDataSecure: "¿Están seguros mis datos de salud?",
        isDataSecureAnswer: "Sí, nos tomamos la seguridad de los datos muy en serio. Toda la información de salud está encriptada usando protocolos estándar de la industria, y cumplimos con las regulaciones HIPAA. Tus datos nunca se comparten sin tu consentimiento explícito, y los usamos solo para proporcionarte mejores conocimientos de salud.",
        canReplaceDoctor: "¿Puede VitalCheck reemplazar a mi doctor?",
        canReplaceDoctorAnswer: "No, VitalCheck está diseñado para complementar, no reemplazar, la atención médica profesional. Proporciona información y orientación de salud pero no debe usarse como sustituto del consejo, diagnóstico o tratamiento médico profesional. Siempre consulta con proveedores de atención médica calificados para preocupaciones médicas.",
        howLongAssessment: "¿Cuánto tiempo toma una evaluación?",
        howLongAssessmentAnswer: "Una evaluación típica toma 5-15 minutos, dependiendo de la complejidad de tus síntomas y el número de preguntas de seguimiento necesarias. La IA adapta el cuestionario basado en tus respuestas para proporcionar la evaluación más relevante.",
        whatIfEmergency: "¿Qué pasa si tengo una emergencia?",
        whatIfEmergencyAnswer: "Si estás experimentando una emergencia médica, llama al 911 o ve a la sala de emergencias más cercana inmediatamente. VitalCheck no está diseñado para situaciones de emergencia y no debe retrasar la búsqueda de atención médica inmediata.",
        canUseChildren: "¿Puedo usar VitalCheck para mis hijos?",
        canUseChildrenAnswer: "Sí, VitalCheck tiene evaluaciones pediátricas especializadas diseñadas para niños. Sin embargo, recomendamos consultar con un pediatra para cualquier preocupación seria sobre la salud de tu hijo.",
        howOftenUse: "¿Con qué frecuencia puedo usar VitalCheck?",
        howOftenUseAnswer: "Puedes usar VitalCheck tan a menudo como necesites. No hay límites en el número de evaluaciones que puedes realizar. Alentamos el monitoreo regular de salud y el seguimiento de síntomas.",
        whatLanguages: "¿Qué idiomas soporta VitalCheck?",
        whatLanguagesAnswer: "Actualmente, VitalCheck soporta inglés y español. Estamos trabajando en agregar más idiomas para hacer nuestra plataforma accesible a una audiencia más amplia.",
        howGetResults: "¿Cómo obtengo mis resultados de evaluación?",
        howGetResultsAnswer: "Tus resultados de evaluación se muestran inmediatamente después de completar el cuestionario. También puedes acceder a tu historial de evaluaciones a través de tu cuenta del portal del paciente. Los resultados incluyen análisis de síntomas, condiciones posibles y recomendaciones."
      }
    },

    auth: {
      login: {
        title: "Iniciar Sesión",
        subtitle: "Bienvenido de vuelta a tu cuenta de VitalCheck",
        emailLabel: "Dirección de Correo Electrónico",
        emailPlaceholder: "Ingresa tu correo electrónico",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Ingresa tu contraseña",
        loginButton: "Iniciar Sesión",
        forgotPassword: "¿Olvidaste tu contraseña?",
        noAccount: "¿No tienes una cuenta?",
        signUpLink: "Regístrate aquí",
        backToHome: "Volver al Inicio",
        errors: {
          emailRequired: "El correo electrónico es requerido",
          emailInvalid: "Por favor ingresa una dirección de correo electrónico válida",
          passwordRequired: "La contraseña es requerida",
          passwordMinLength: "La contraseña debe tener al menos 6 caracteres",
          loginFailed: "Error al iniciar sesión. Por favor verifica tus credenciales e intenta de nuevo."
        }
      },
      signup: {
        title: "Crear Cuenta",
        subtitle: "Únete a VitalCheck y comienza tu viaje de salud",
        firstNameLabel: "Nombre",
        firstNamePlaceholder: "Nombre",
        lastNameLabel: "Apellido",
        lastNamePlaceholder: "Apellido",
        emailLabel: "Dirección de Correo Electrónico",
        emailPlaceholder: "Ingresa tu correo electrónico",
        phoneLabel: "Número de Teléfono",
        phonePlaceholder: "Ingresa tu número de teléfono",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Crea una contraseña",
        confirmPasswordLabel: "Confirmar Contraseña",
        confirmPasswordPlaceholder: "Confirma tu contraseña",
        agreeToTerms: "Acepto los Términos de Servicio y la Política de Privacidad",
        signupButton: "Crear Cuenta",
        haveAccount: "¿Ya tienes una cuenta?",
        loginLink: "Inicia sesión aquí",
        backToHome: "Volver al Inicio",
        errors: {
          firstNameRequired: "El nombre es requerido",
          lastNameRequired: "El apellido es requerido",
          emailRequired: "El correo electrónico es requerido",
          emailInvalid: "Por favor ingresa una dirección de correo electrónico válida",
          phoneRequired: "El número de teléfono es requerido",
          phoneInvalid: "Por favor ingresa un número de teléfono válido",
          passwordRequired: "La contraseña es requerida",
          passwordMinLength: "La contraseña debe tener al menos 6 caracteres",
          confirmPasswordRequired: "Por favor confirma tu contraseña",
          passwordsMatch: "Las contraseñas no coinciden",
          termsRequired: "Debes aceptar los términos y condiciones",
          signupFailed: "Error al registrarse. Por favor intenta de nuevo."
        }
      }
    },

    patientPortal: {
      dashboard: {
        title: "Portal del Paciente",
        subtitle: "Tu Tablero de Salud",
        welcomeBack: "Bienvenido de vuelta",
        recentConsultations: "Consultas Recientes",
        medicalHistory: "Historial Médico",
        upcomingAppointments: "Citas Próximas",
        healthSummary: "Resumen de Salud"
      },
      profile: {
        title: "Perfil",
        subtitle: "Gestiona tu información personal",
        personalInfo: "Información Personal",
        firstNameLabel: "Nombre",
        firstNamePlaceholder: "Ingresa tu nombre",
        lastNameLabel: "Apellido",
        lastNamePlaceholder: "Ingresa tu apellido",
        emailLabel: "Dirección de Correo Electrónico",
        emailPlaceholder: "Ingresa tu dirección de correo electrónico",
        phoneLabel: "Número de Teléfono",
        phonePlaceholder: "Ingresa tu número de teléfono",
        dateOfBirthLabel: "Fecha de Nacimiento",
        dateOfBirthPlaceholder: "Selecciona tu fecha de nacimiento",
        genderLabel: "Género",
        genderPlaceholder: "Seleccionar género",
        emergencyContactLabel: "Contacto de Emergencia",
        emergencyContactPlaceholder: "Nombre del contacto de emergencia",
        saveChanges: "Guardar Cambios",
        cancel: "Cancelar"
      },
      consultations: {
        title: "Consultas",
        subtitle: "Tu historial de consultas",
        noConsultations: "No se encontraron consultas",
        startNewConsultation: "Iniciar Nueva Consulta",
        viewDetails: "Ver Detalles"
      },
      medicalHistory: {
        title: "Historial Médico",
        subtitle: "Gestiona tus registros de salud",
        conditions: "Condiciones Médicas",
        medications: "Medicamentos Actuales",
        allergies: "Alergias",
        procedures: "Procedimientos",
        addNew: "Agregar Nuevo"
      }
    },

    consultationChat: {
      welcomeMessages: {
        generalMedicine: "¡Hola! Soy el Dr. Henry, tu especialista en Medicina General con IA. Estoy aquí para ayudarte con cualquier preocupación o pregunta de salud que puedas tener. Por favor describe qué te molesta hoy, y haré mi mejor esfuerzo para proporcionar orientación útil.",
        cardiology: "¡Hola! Soy el Dr. Floyd Miles, tu especialista en Cardiología con IA. Me especializo en salud del corazón y condiciones cardiovasculares. Por favor cuéntame sobre cualquier síntoma o preocupación relacionada con el corazón que estés experimentando.",
        neurology: "¡Hola! Soy el Dr. McKinney, tu especialista en Neurología con IA. Me enfoco en condiciones del cerebro y sistema nervioso. Por favor describe cualquier síntoma neurológico, dolores de cabeza, o preocupaciones que te gustaría discutir.",
        pediatrics: "¡Hola! Soy el Dr. Jacob, tu especialista en Pediatría con IA. Me especializo en salud infantil y preocupaciones de desarrollo. Por favor cuéntame sobre los síntomas de tu hijo o cualquier pregunta de salud pediátrica que tengas.",
        internalMedicine: "¡Hola! Soy el Dr. Warren, tu especialista en Medicina Interna con IA. Manejo medicina de adultos y casos médicos complejos. Por favor describe tus síntomas o preocupaciones de salud, y proporcionaré orientación apropiada."
      },
      quickActions: {
        generalMedicine: [
          "Tengo dolor de cabeza",
          "Me siento cansado todo el tiempo",
          "Tengo fiebre",
          "Tengo dolor de estómago",
          "Tengo tos"
        ],
        cardiology: [
          "Tengo dolor de pecho",
          "Me siento sin aliento",
          "Mi corazón está acelerado",
          "Tengo presión en el pecho",
          "Me siento mareado"
        ],
        neurology: [
          "Tengo dolor de cabeza severo",
          "Me siento mareado",
          "Tengo problemas de visión",
          "Tengo entumecimiento",
          "Tengo problemas de memoria"
        ],
        pediatrics: [
          "Mi hijo tiene fiebre",
          "Mi hijo no quiere comer",
          "Mi hijo está llorando mucho",
          "Mi hijo tiene una erupción",
          "Mi hijo está tosiendo"
        ],
        internalMedicine: [
          "Tengo dolor crónico",
          "Me siento fatigado",
          "Tengo problemas digestivos",
          "Tengo dolor articular",
          "Tengo problemas respiratorios"
        ]
      },
      typeMessage: "Escribe tu mensaje...",
      send: "Enviar",
      endConsultation: "Terminar Consulta",
      restartConsultation: "Reiniciar Consulta",
      doctorTyping: "El Doctor IA está escribiendo..."
    },

    pages: {
      symptoms: {
        title: "Síntomas | VitalCheck",
        description: "Explora síntomas comunes y sus características con información médica detallada"
      },
      help: {
        title: "Centro de Ayuda | VitalCheck",
        description: "Encuentra respuestas a tus preguntas y aprende cómo usar VitalCheck efectivamente"
      },
      faq: {
        title: "Preguntas Frecuentes | VitalCheck",
        description: "Preguntas frecuentes sobre VitalCheck y sus características"
      },
      consultation: {
        title: "Consulta con Doctor IA | VitalCheck",
        description: "Obtén consulta gratuita con doctores IA especializados en diferentes campos médicos"
      },
      patientPortal: {
        title: "Portal del Paciente | Tu Tablero de Salud",
        description: "Accede a tu información de salud, historial de consultas y registros médicos de forma segura"
      },
      consultations: {
        title: "Consultas | Portal del Paciente",
        description: "Ve tu historial de consultas y gestiona citas"
      },
      profile: {
        title: "Perfil | Portal del Paciente",
        description: "Gestiona tu información personal y configuración de cuenta"
      },
      medicalHistory: {
        title: "Historial Médico | Portal del Paciente",
        description: "Gestiona tu historial médico, medicamentos y registros de salud"
      },
      login: {
        title: "Iniciar Sesión | Portal del Paciente VitalCheck",
        description: "Inicia sesión en tu cuenta del portal del paciente VitalCheck"
      },
      signup: {
        title: "Registrarse | Portal del Paciente VitalCheck",
        description: "Crea tu cuenta del portal del paciente VitalCheck"
      }
    },

    api: {
      validation: {
        provideMoreDetails: "Por favor proporciona más detalles sobre tu preocupación"
      }
    },

    // Contact page
    contact: {
      form: {
        namePlaceholder: "Tu nombre completo"
      }
    },

    // About page
    about: {
      teamImageAlt: "Equipo Médico",
      values: {
        compassionateCare: {
          title: "Atención Compasiva",
          description: "Cada interacción está guiada por la empatía y comprensión de las necesidades del paciente."
        },
        privacySecurity: {
          title: "Privacidad y Seguridad",
          description: "Tu información de salud está protegida con medidas de seguridad de nivel empresarial."
        },
        evidenceBased: {
          title: "Basado en Evidencia",
          description: "Todas las recomendaciones están fundamentadas en la literatura médica actual y las mejores prácticas."
        }
      }
    },

    // Patient Portal Medical History
    patientPortal: {
      loading: "Cargando Portal del Paciente...",
      nav: {
        title: "Portal VitalCheck",
        welcome: "Bienvenido",
        signOut: "Cerrar Sesión",
        dashboard: "Tablero",
        dashboardDescription: "Resumen de tus datos de salud",
        profile: "Perfil",
        profileDescription: "Gestiona tu información personal",
        consultations: "Consultas",
        consultationsDescription: "Ve el historial de consultas",
        medicalHistory: "Historial Médico",
        medicalHistoryDescription: "Gestiona tu información médica"
      },
      medicalHistory: {
        medicationNamePlaceholder: "Ingresa el nombre del medicamento",
        doctorNamePlaceholder: "Nombre del doctor",
        procedureNamePlaceholder: "Ingresa el nombre del procedimiento",
        hospitalNamePlaceholder: "Nombre del hospital"
      },
      consultationHistory: {
        title: "Historial de Consultas",
        subtitle: "Ve y gestiona tus registros de consultas",
        newConsultation: "Nueva Consulta",
        searchPlaceholder: "Buscar consultas...",
        filterByStatus: "Filtrar por estado",
        sortBy: "Ordenar por",
        stats: {
          totalConsultations: "Consultas Totales",
          completed: "Completadas",
          active: "Activas"
        }
      }
    },

    // Medical AI
    vitalCheck: {
      title: "Tecnología de IA Médica",
      subtitle: "Inteligencia artificial avanzada para evaluación y diagnóstico de salud",
      aiPoweredFeatures: "Características Impulsadas por IA",
      performanceMetrics: "Métricas de Rendimiento de IA",
      advancedCapabilities: "Capacidades Avanzadas de IA",
      howItWorks: "Cómo Funciona Nuestra IA",
      trustedByProfessionals: "Confiado por Profesionales Médicos",
      technologyStack: "Stack de Tecnología Avanzada",
      experienceAI: "Experimenta la Atención Médica Impulsada por IA",
      experienceAIDescription: "Obtén información de salud personalizada impulsada por inteligencia artificial de vanguardia",
      tryAIAssessment: "Probar Evaluación de IA",
      viewQuestionnaires: "Ver Cuestionarios",
      features: {
        intelligentAnalysis: {
          title: "Análisis Inteligente de Síntomas",
          description: "Algoritmos de IA avanzados analizan tus síntomas con precisión médica",
          features: [
            "Análisis de síntomas en tiempo real",
            "Integración de bases de datos médicas",
            "Algoritmos de evaluación de riesgos",
            "Detección de emergencias"
          ]
        },
        dynamicQuestionnaires: {
          title: "Cuestionarios Dinámicos",
          description: "Cuestionamiento adaptativo que evoluciona según tus respuestas",
          features: [
            "Flujo de preguntas personalizado",
            "Seguimientos conscientes del contexto",
            "Enfoque en especialidades médicas",
            "Evaluación integral"
          ]
        },
        riskAssessment: {
          title: "Evaluación de Riesgos",
          description: "Evalúa riesgos de salud potenciales con precisión",
          features: [
            "Análisis multifactorial",
            "Estratificación de riesgos",
            "Recomendaciones preventivas",
            "Orientación de seguimiento"
          ]
        },
        emergencyDetection: {
          title: "Detección de Emergencias",
          description: "Identificación inmediata de condiciones médicas urgentes",
          features: [
            "Reconocimiento de síntomas críticos",
            "Activación de protocolos de emergencia",
            "Recomendaciones de atención inmediata",
            "Integración de contactos de emergencia"
          ]
        }
      },
      capabilities: {
        machineLearning: {
          title: "Aprendizaje Automático",
          description: "Algoritmos en mejora continua que aprenden de datos médicos y resultados"
        },
        hipaaCompliant: {
          title: "Cumple con HIPAA",
          description: "Seguridad y protección de privacidad de nivel empresarial para todos los datos de salud"
        },
        expertValidated: {
          title: "Validado por Expertos",
          description: "Desarrollado y validado por profesionales médicos y expertos clínicos"
        },
        realTimeProcessing: {
          title: "Procesamiento en Tiempo Real",
          description: "Análisis instantáneo y recomendaciones sin retrasos"
        },
        personalizedCare: {
          title: "Atención Personalizada",
          description: "Recomendaciones adaptadas basadas en perfiles de salud individuales"
        },
        continuousMonitoring: {
          title: "Monitoreo Continuo",
          description: "Seguimiento continuo de la salud y análisis de tendencias"
        }
      },
      statistics: {
        accuracyRate: "Tasa de Precisión",
        assessmentsCompleted: "Evaluaciones Completadas",
        availability: "Disponibilidad",
        medicalSpecialties: "Especialidades Médicas"
      },
      testimonials: {
        drMitchell: {
          name: "Dra. Sarah Mitchell",
          role: "Directora Médica",
          quote: "Este sistema de IA ha revolucionado cómo abordamos las evaluaciones preliminares de salud. La precisión y velocidad son notables."
        },
        drChen: {
          name: "Dra. Emily Chen",
          role: "Jefa de Investigación Clínica",
          quote: "Los algoritmos de aprendizaje automático son increíblemente sofisticados. Detectan matices que incluso clínicos experimentados podrían pasar por alto."
        },
        drRodriguez: {
          name: "Dr. Michael Rodriguez",
          role: "Especialista en Medicina de Emergencias",
          quote: "Las capacidades de detección de emergencias han salvado vidas. Es como tener un experto médico disponible 24/7."
        }
      },
      steps: {
        dataInput: {
          title: "Entrada de Datos",
          description: "Recopilación integral de información de síntomas y salud"
        },
        aiAnalysis: {
          title: "Análisis de IA",
          description: "Algoritmos avanzados procesan y analizan tus datos de salud"
        },
        riskAssessment: {
          title: "Evaluación de Riesgos",
          description: "Evaluación de riesgos de salud potenciales y condiciones"
        },
        recommendations: {
          title: "Recomendaciones",
          description: "Orientación de salud personalizada y próximos pasos"
        }
      },
      technologies: {
        nlp: {
          name: "Procesamiento de Lenguaje Natural",
          description: "NLP avanzado para entender y procesar texto médico"
        },
        ml: {
          name: "Aprendizaje Automático",
          description: "Algoritmos de aprendizaje profundo para reconocimiento de patrones y predicción"
        },
        databases: {
          name: "Bases de Datos Médicas",
          description: "Integración con bases de conocimiento médico integrales"
        },
        realTime: {
          name: "Procesamiento en Tiempo Real",
          description: "Capacidades de análisis e respuesta instantánea"
        }
      }
    }
  }
}