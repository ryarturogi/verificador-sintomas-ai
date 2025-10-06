"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AISymptomAutocomplete } from "@/components/ui/ai-symptom-autocomplete";
import { Option } from "@/components/ui/async-autocomplete";
import { DynamicQuestionnaire } from "@/components/symptom-checker/dynamic-questionnaire";
import { AssessmentResults } from "@/components/symptom-checker/assessment-results";
import { EmergencyAlert } from "@/components/symptom-checker/emergency-alert";
import { DisclaimerModal } from "@/components/symptom-checker/disclaimer-modal";
import { clientSymptomAnalyzer } from "@/services/client-symptom-analyzer";
import { QuestionResponse } from "@/types/dynamic-questionnaire";
import { AssessmentResult } from "@/types/symptom-checker";
import {
  Heart,
  Brain,
  Activity,
  Shield,
  Stethoscope,
  UserCheck,
  ClipboardList,
  Phone,
  AlertTriangle,
  CheckCircle,
  // Agent icons
  Baby,
  Microscope,
  Camera,
  AlertCircle,
  Target,
  // Image scanning icons
  Scan,
  Upload,
  // Info
} from "lucide-react";
import { LoadingCard } from "@/components/ui/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

type AppState =
  | "disclaimer"
  | "homepage"
  | "questionnaire"
  | "loading"
  | "results"
  | "error"
  | "declined";

export function ModernHomepage() {
  const [appState, setAppState] = useState<AppState>("disclaimer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState<Option | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [activeTab, setActiveTab] = useState("specialties");
  const [specialistSlideIndex, setSpecialistSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(0);
  const t = useTranslations();
  const { language } = useLanguage();

  // Sync searchQuery with selectedSymptom for quick actions
  useEffect(() => {
    if (searchQuery && !selectedSymptom) {
      // Create an option from the search query
      const option: Option = {
        value: searchQuery.toLowerCase().replace(/\s+/g, "-"),
        label: searchQuery,
        data: { type: "quick_action", original: searchQuery }
      };
      setSelectedSymptom(option);
    }
  }, [searchQuery, selectedSymptom]);

  // Agent data with specialties and personalized benefits
  const agentData = [
    {
      name: "Agente General",
      specialty: language === "es" ? "Medicina General" : "General Medicine",
      description:
        language === "es"
          ? "VitalCheck te da las herramientas e información que necesitas para cuidar tu salud con nuestro agente especializado."
          : "VitalCheck gives you the tools and information you need to take care of your health with our specialized agent.",
      benefits: [
        language === "es"
          ? "Acceso 24/7 - comunícate cuando lo necesites"
          : "24/7 access - reach out whenever you need",
        language === "es"
          ? "Elimina tiempo de viaje y problemas de programación"
          : "Eliminate commute time and scheduling hassles",
        language === "es"
          ? "Planes flexibles para satisfacer tus necesidades"
          : "Flexible plans to meet your needs and lifestyle",
        language === "es"
          ? "Diagnósticos precisos con tecnología avanzada"
          : "Accurate diagnostics with advanced technology",
        language === "es"
          ? "Ahorra dinero mientras recibes atención de alta calidad"
          : "Save money while receiving high-quality care",
      ],
    },
    {
      name: "Agente Cardiología",
      specialty: language === "es" ? "Cardiología" : "Cardiology",
      description:
        language === "es"
          ? "Especialista en salud cardiovascular con tecnología de punta para el cuidado de tu corazón."
          : "Cardiovascular health specialist with cutting-edge technology for your heart care.",
      benefits: [
        language === "es"
          ? "Monitoreo cardíaco 24/7 con tecnología avanzada"
          : "24/7 cardiac monitoring with advanced technology",
        language === "es"
          ? "Consultas virtuales especializadas"
          : "Specialized virtual consultations",
        language === "es"
          ? "Planes de prevención personalizados"
          : "Personalized prevention plans",
        language === "es"
          ? "Acceso directo a estudios cardiológicos"
          : "Direct access to cardiac studies",
        language === "es"
          ? "Seguimiento continuo de tu salud cardíaca"
          : "Continuous monitoring of your cardiac health",
      ],
    },
    {
      name: "Agente Neurología",
      specialty: language === "es" ? "Neurología" : "Neurology",
      description:
        language === "es"
          ? "Experto en neurología con técnicas avanzadas de diagnóstico y tratamiento neurológico."
          : "Neurology expert with advanced neurological diagnosis and treatment techniques.",
      benefits: [
        language === "es"
          ? "Evaluaciones neurológicas con tecnología avanzada"
          : "Advanced technology neurological evaluations",
        language === "es"
          ? "Detección temprana de condiciones neurológicas"
          : "Early detection of neurological conditions",
        language === "es"
          ? "Planes de rehabilitación personalizados"
          : "Personalized rehabilitation plans",
        language === "es"
          ? "Monitoreo cognitivo continuo"
          : "Continuous cognitive monitoring",
        language === "es"
          ? "Terapias neurológicas innovadoras"
          : "Innovative neurological therapies",
      ],
    },
    {
      name: "Agente Pediatría",
      specialty: language === "es" ? "Pediatría" : "Pediatrics",
      description:
        language === "es"
          ? "Especialista en salud infantil con enfoque en cuidado preventivo y desarrollo saludable."
          : "Child health specialist with focus on preventive care and healthy development.",
      benefits: [
        language === "es"
          ? "Seguimiento del desarrollo infantil"
          : "Child development tracking",
        language === "es"
          ? "Vacunación y cuidado preventivo"
          : "Vaccination and preventive care",
        language === "es"
          ? "Consultas familiares virtuales"
          : "Virtual family consultations",
        language === "es"
          ? "Planes de crecimiento personalizados"
          : "Personalized growth plans",
        language === "es" ? "Apoyo para padres 24/7" : "24/7 parental support",
      ],
    },
    {
      name: "Agente Medicina Interna",
      specialty: language === "es" ? "Medicina Interna" : "Internal Medicine",
      description:
        language === "es"
          ? "Internista experimentado en el manejo integral de enfermedades complejas y crónicas."
          : "Experienced internist in comprehensive management of complex and chronic diseases.",
      benefits: [
        language === "es"
          ? "Manejo integral de enfermedades crónicas"
          : "Comprehensive chronic disease management",
        language === "es"
          ? "Coordinación de cuidados especializados"
          : "Specialized care coordination",
        language === "es"
          ? "Medicina preventiva avanzada"
          : "Advanced preventive medicine",
        language === "es"
          ? "Análisis predictivo de salud"
          : "Predictive health analytics",
        language === "es"
          ? "Atención médica personalizada"
          : "Personalized medical care",
      ],
    },
  ];

  // Check disclaimer status on component mount
  useEffect(() => {
    const checkDisclaimerStatus = () => {
      try {
        const accepted = localStorage.getItem("disclaimer-accepted");
        if (accepted === "true") {
          setAppState("homepage");
        } else {
          setAppState("disclaimer");
        }
      } catch {
        setAppState("disclaimer");
      }
    };

    checkDisclaimerStatus();
  }, []);

  // Auto-advance specialists slider
  useEffect(() => {
    if (appState === "homepage") {
      const interval = setInterval(() => {
        setSpecialistSlideIndex((prev) => (prev + 1) % 2);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [appState]);

  // Auto-advance testimonials
  useEffect(() => {
    if (appState === "homepage") {
      const interval = setInterval(() => {
        setTestimonialIndex((prev) => (prev + 1) % 3);
      }, 4000); // Change testimonial every 4 seconds

      return () => clearInterval(interval);
    }
  }, [appState]);

  const handleDisclaimerAccept = () => {
    localStorage.setItem("disclaimer-accepted", "true");
    setAppState("homepage");
  };

  const handleDisclaimerDecline = () => {
    setAppState("declined");
  };

  const handleStartAssessment = (topic?: string, initialQuery?: string) => {
    setSelectedTopic(topic || null);
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
    setAppState("questionnaire");
  };

  const handleSearch = () => {
    const symptomText = selectedSymptom?.label || searchQuery.trim();
    if (symptomText) {
      handleStartAssessment("search", symptomText);
    }
  };


  const handleBackToHome = () => {
    setAppState("homepage");
    setSelectedTopic(null);
    setSearchQuery("");
    setSelectedSymptom(null);
    setResults(null);
    setError(null);
    setShowEmergencyAlert(false);
    setResponses([]);
  };

  const handleQuestionnaireComplete = async (
    questionnaireResponses: QuestionResponse[]
  ) => {
    setAppState("loading");
    setError(null);
    setResponses(questionnaireResponses);

    try {
      const result = await clientSymptomAnalyzer.analyzeResponses(
        questionnaireResponses,
        language
      );

      if (result.emergencyWarning) {
        setShowEmergencyAlert(true);
      }

      setResults(result);
      setAppState("results");
    } catch (err) {
      console.error("Analysis error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "An unexpected error occurred while analyzing your responses."
        );
      }

      setAppState("error");
    }
  };

  const handleEmergencyDetected = (
    questionnaireResponses: QuestionResponse[]
  ) => {
    setResponses(questionnaireResponses);
    setShowEmergencyAlert(true);

    // Generate emergency result
    const emergencyResult: AssessmentResult = {
      severity: "emergency",
      possibleConditions: [],
      recommendations: [
        "Call 911 immediately",
        "Go to the nearest emergency room",
      ],
      emergencyWarning: true,
      emergencyMessage:
        "Emergency symptoms detected. Seek immediate medical attention.",
      followUpAdvice: "Do not delay seeking emergency medical care.",
    };

    setResults(emergencyResult);
    setAppState("results");
  };

  const healthTopics = [
    {
      id: "general",
      title: t.healthTopics.physicalSymptoms,
      description: t.healthTopics.physicalDescription,
      icon: Activity,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      tags: [
        t.healthTopics.tags.pain,
        t.healthTopics.tags.fever,
        t.healthTopics.tags.fatigue,
      ],
    },
    {
      id: "mental",
      title: t.healthTopics.mentalWellness,
      description: t.healthTopics.mentalDescription,
      icon: Brain,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      tags: [
        t.healthTopics.tags.anxiety,
        t.healthTopics.tags.mood,
        t.healthTopics.tags.stress,
      ],
    },
    {
      id: "heart",
      title: t.healthTopics.cardiacSymptoms,
      description: t.healthTopics.cardiacDescription,
      icon: Heart,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      tags: [
        t.healthTopics.tags.chest,
        t.healthTopics.tags.palpitations,
        t.healthTopics.tags.pressure,
      ],
    },
    {
      id: "chat",
      title: t.healthTopics.guidedAssessment,
      description: t.healthTopics.guidedDescription,
      icon: Stethoscope,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      tags: [
        t.healthTopics.tags.ai,
        t.healthTopics.tags.personalized,
        t.healthTopics.tags.adaptive,
      ],
    },
    {
      id: "preventive",
      title: t.healthTopics.generalCheckup,
      description: t.healthTopics.generalDescription,
      icon: Shield,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      tags: [
        t.healthTopics.tags.prevention,
        t.healthTopics.tags.complete,
        t.healthTopics.tags.wellness,
      ],
    },
    {
      id: "emergency",
      title: t.homepage.emergencyAssessment,
      description: t.homepage.emergencyDescription,
      icon: AlertTriangle,
      iconColor: "text-red-700",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      isEmergency: true,
      tags: [
        t.homepage.emergencyTags.emergency,
        t.homepage.emergencyTags.critical,
        t.homepage.emergencyTags.immediate,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-cyan-100">
      {/* Disclaimer Modal - Always render but control visibility */}
      <DisclaimerModal
        isOpen={appState === "disclaimer"}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      {/* Declined State */}
      {appState === "declined" && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="heading-xl text-red-800">
                  {t.medicalDisclaimer.declinedTitle}
                </h2>
                <p className="text-red-700">
                  {t.medicalDisclaimer.declinedMessage}
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  {t.errors.refreshPage}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main App Content - Only show if not disclaimer or declined */}
      {appState !== "disclaimer" && appState !== "declined" && (
        <>
          {/* Medical Dashboard Content */}
          <div className="max-w-7xl mx-auto px-6 py-8 overflow-x-hidden">
            <AnimatePresence mode="wait">
              {appState === "homepage" && (
                <motion.div
                  key="homepage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Hero and Popular Searches Combined Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative min-h-screen flex flex-col overflow-hidden py-4 lg:py-8"
                  >
                    {/* Enhanced Background Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      {/* Subtle medical background */}
                      <div className="absolute inset-0 opacity-5">
                        <Image
                          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                          alt="Medical Background"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <motion.div
                        className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 0.8, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2,
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 4,
                        }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                    </div>

                    <div className="relative z-10 w-full flex-1 flex flex-col">
                      {/* Hero Content - Two Column Layout */}
                      <div className="flex-1 flex items-center overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center w-full">
                          {/* Left Column - Main Content (3/5 width) */}
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-left lg:col-span-3 px-4 lg:px-0"
                          >
                            <motion.h1
                              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-gray-900 leading-tight"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            >
                              <span className="block mb-1 lg:mb-2">
                                {t.homepage.feelBetterAbout}
                              </span>
                              <span className="text-cyan-600 block">
                                {t.homepage.findingHealthcare}
                              </span>
                            </motion.h1>
                            <motion.p
                              className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 lg:mb-8 max-w-md lg:max-w-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                            >
                              At VitalCheck, {t.homepage.guessworkOut}{" "}
                              {t.homepage.rightDoctors}
                            </motion.p>

                            {/* Trust Badges */}
                            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 mb-6 lg:mb-8">
                              <div className="flex items-center bg-gray-800 text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg shadow-lg">
                                <UserCheck className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                                <span className="text-xs lg:text-sm font-medium">
                                  {t.homepage.profilesEveryDoctor}
                                </span>
                              </div>
                              <div className="flex items-center bg-gray-800 text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg shadow-lg">
                                <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                                <span className="text-xs lg:text-sm font-medium">
                                  {t.homepage.millionRatings}
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Right Column - Doctor Image (2/5 width) */}
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative mt-8 lg:mt-0 lg:col-span-2 -mr-6 sm:-mr-8 lg:-mr-16 xl:-mr-20 2xl:-mr-24"
                          >
                            {/* Professional Doctor Hero Image - Edge to Edge */}
                            <div className="relative w-full">
                              <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-l-xl sm:rounded-l-2xl lg:rounded-l-3xl overflow-hidden shadow-2xl h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] relative w-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+5rem)] 2xl:w-[calc(100%+6rem)]">
                                <Image
                                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                  alt="Professional Doctor with Stethoscope"
                                  fill
                                  className="object-cover object-center"
                                  priority
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-cyan-100/20"></div>
                              </div>
                              {/* Medical icons - Responsive positioning */}
                              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-cyan-500 p-1.5 sm:p-2 lg:p-3 rounded-full shadow-lg z-10">
                                <Heart className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                              </div>
                              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-green-500 p-1.5 sm:p-2 lg:p-3 rounded-full shadow-lg z-10">
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                              </div>
                              <div className="absolute top-1/2 left-1 sm:left-2 bg-cyan-500 p-1 sm:p-1.5 lg:p-2 rounded-full shadow-lg z-10">
                                <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* We.care Style Search Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                          <div className="flex-1 relative">
                            <AISymptomAutocomplete
                              onSymptomSelect={setSelectedSymptom}
                              value={selectedSymptom}
                              placeholder={t.homepage.searchPlaceholder}
                              className="[&_.react-select-container]:h-14 [&_.react-select__control]:h-14 [&_.react-select__control]:rounded-xl [&_.react-select__control]:text-base"
                            />
                          </div>
                          <Button
                            onClick={handleSearch}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 lg:px-8 py-4 h-14 rounded-xl font-semibold transition-all duration-300 min-w-[100px] lg:min-w-[120px] flex items-center justify-center"
                          >
                            <Activity className="icon-sm mr-2" />
                            <span className="hidden sm:inline">Search</span>
                          </Button>
                        </div>

                        {/* Quick Search Tags */}
                        <div className="mt-6">
                          <p className="text-gray-600 mb-3 text-sm">
                            {t.homepage.youMayBeLookingFor}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              {
                                key: "Family Medicine",
                                label: t.homepage.familyMedicine,
                              },
                              {
                                key: "Pediatrics",
                                label: t.homepage.pediatrics,
                              },
                              {
                                key: "Top Hospital",
                                label: t.homepage.topHospital,
                              },
                              {
                                key: "Telehealth",
                                label: t.homepage.telehealth,
                              },
                              { key: "COVID-19", label: t.homepage.covid19 },
                              {
                                key: "Orthopedic Surgery",
                                label: t.homepage.orthopedicSurgery,
                              },
                            ].map((tag) => (
                              <button
                                key={tag.key}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors duration-200 flex items-center space-x-1"
                                onClick={() => setSearchQuery(tag.label)}
                              >
                                <span>{tag.label}</span>
                                <Activity className="h-2.5 w-2.5" />
                              </button>
                            ))}
                            <button
                              className="px-3 py-1.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-600 rounded-full text-xs transition-colors duration-200"
                              onClick={() => {
                                const allTags = [
                                  {
                                    key: "Dermatology",
                                    label: t.homepage.dermatology,
                                  },
                                  {
                                    key: "Internal Medicine",
                                    label: t.homepage.internalMedicine,
                                  },
                                  {
                                    key: "Neurology",
                                    label: t.homepage.neurology,
                                  },
                                  {
                                    key: "Psychiatry",
                                    label: t.homepage.psychiatry,
                                  },
                                  {
                                    key: "Cardiology",
                                    label: t.homepage.cardiology,
                                  },
                                  {
                                    key: "Emergency Medicine",
                                    label: t.homepage.emergencyMedicine,
                                  },
                                ];

                                const currentTags = [
                                  t.homepage.familyMedicine,
                                  t.homepage.pediatrics,
                                  t.homepage.topHospital,
                                  t.homepage.telehealth,
                                  t.homepage.covid19,
                                  t.homepage.orthopedicSurgery,
                                ];

                                const nextTag = allTags.find(
                                  (tag) => !currentTags.includes(tag.label)
                                );
                                if (nextTag) {
                                  setSearchQuery(nextTag.label);
                                }
                              }}
                            >
                              {t.homepage.more}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Popular Searches Section - Now part of Hero */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="relative z-10 w-full py-8"
                    >
                      <h2 className="heading-xl lg:heading-2xl text-gray-900 mb-6">
                        {t.homepage.popularSearches}
                      </h2>

                      <div className="flex border-b border-gray-200 mb-6">
                        <button
                          className={`px-4 py-2 font-semibold text-sm transition-colors ${
                            activeTab === "specialties"
                              ? "text-cyan-600 border-b-2 border-cyan-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab("specialties")}
                        >
                          {t.homepage.specialties}
                        </button>
                        <button
                          className={`px-4 py-2 font-semibold text-sm transition-colors ${
                            activeTab === "conditions"
                              ? "text-cyan-600 border-b-2 border-cyan-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab("conditions")}
                        >
                          {t.homepage.conditions}
                        </button>
                        <button
                          className={`px-4 py-2 font-semibold text-sm transition-colors ${
                            activeTab === "procedures"
                              ? "text-cyan-600 border-b-2 border-cyan-600"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setActiveTab("procedures")}
                        >
                          {t.homepage.procedures}
                        </button>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
                        >
                          {(() => {
                            const specialties = [
                              {
                                name: t.homepage.dermatology,
                                icon: Activity,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.internalMedicine,
                                icon: Heart,
                                color: "bg-red-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.neurology,
                                icon: Brain,
                                color: "bg-gray-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.generalMedicine,
                                icon: Shield,
                                color: "bg-red-100",
                                selected: true,
                              },
                              {
                                name: t.homepage.dentistry,
                                icon: UserCheck,
                                color: "bg-green-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.otolaryngology,
                                icon: Stethoscope,
                                color: "bg-teal-100",
                                selected: false,
                              },
                            ];

                            const conditions = [
                              {
                                name: "Diabetes",
                                icon: Heart,
                                color: "bg-red-100",
                                selected: false,
                              },
                              {
                                name: "Hypertension",
                                icon: Activity,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: "Asthma",
                                icon: Shield,
                                color: "bg-green-100",
                                selected: false,
                              },
                              {
                                name: "Migraine",
                                icon: Brain,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: "Depression",
                                icon: UserCheck,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: "Anxiety",
                                icon: Stethoscope,
                                color: "bg-teal-100",
                                selected: false,
                              },
                            ];

                            const procedures = [
                              {
                                name: t.homepage.aiCtScan,
                                description: t.homepage.aiCtScanDescription,
                                icon: Activity,
                                color: "bg-gray-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.aiMri,
                                description: t.homepage.aiMriDescription,
                                icon: Brain,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.aiXray,
                                description: t.homepage.aiXrayDescription,
                                icon: Shield,
                                color: "bg-cyan-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.aiBloodTest,
                                description: t.homepage.aiBloodTestDescription,
                                icon: Heart,
                                color: "bg-red-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.aiUltrasound,
                                description: t.homepage.aiUltrasoundDescription,
                                icon: UserCheck,
                                color: "bg-green-100",
                                selected: false,
                              },
                              {
                                name: t.homepage.aiEndoscopy,
                                description: t.homepage.aiEndoscopyDescription,
                                icon: Stethoscope,
                                color: "bg-teal-100",
                                selected: false,
                              },
                            ];

                            type TabItem = {
                              name: string;
                              description?: string;
                              icon: React.ComponentType<{ className?: string }>;
                              color: string;
                              selected: boolean;
                            };
                            let items: TabItem[] = [];
                            if (activeTab === "specialties")
                              items = specialties;
                            else if (activeTab === "conditions")
                              items = conditions;
                            else if (activeTab === "procedures")
                              items = procedures;

                            return items.map((item) => (
                              <motion.div
                                key={item.name}
                                className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                  item.selected
                                    ? "bg-cyan-100 border-2 border-cyan-300"
                                    : item.color + " border border-gray-200"
                                }`}
                                whileHover={{ y: -3, scale: 1.02 }}
                                onClick={() =>
                                  handleStartAssessment(item.name.toLowerCase())
                                }
                              >
                                <item.icon className="h-6 w-6 lg:h-8 lg:w-8 mx-auto mb-2 lg:mb-3 text-gray-600" />
                                <h3 className="font-semibold text-gray-900 text-xs lg:text-sm leading-tight">
                                  {item.name}
                                </h3>
                              </motion.div>
                            ));
                          })()}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Find the Right Agent and Interactive Agent Slider Combined Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="min-h-screen flex flex-col"
                  >

                    {/* Interactive Agent Slider Section */}
                    <div className="flex-1 flex items-center py-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                        <div className="relative">
                          <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="w-full h-96 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-cyan-100 to-cyan-200 relative">
                              <motion.div
                                key={selectedDoctorIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full relative"
                              >
                                <Image
                                  src={(() => {
                                    const agentImages = [
                                      "https://images.unsplash.com/photo-1677442136019-21780ccad005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Agente General - AI Brain
                                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Agente Cardiología - Data Visualization
                                      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Agente Neurología - Neural Network
                                      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Agente Pediatría - AI Interface
                                      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Agente Medicina Interna - Medical AI
                                    ];
                                    return agentImages[selectedDoctorIndex];
                                  })()}
                                  alt={`${agentData[selectedDoctorIndex].name} - ${agentData[selectedDoctorIndex].specialty}`}
                                  fill
                                  className="object-cover object-[center_20%]"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </motion.div>
                            </div>

                            {/* Interactive Agent List */}
                            <div className="space-y-3">
                              {agentData.map((agent, index) => (
                                <motion.button
                                  key={agent.name}
                                  onClick={() => setSelectedDoctorIndex(index)}
                                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                                    selectedDoctorIndex === index
                                      ? "bg-cyan-600 text-white shadow-lg"
                                      : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        selectedDoctorIndex === index
                                          ? "bg-white/20"
                                          : "bg-cyan-100"
                                      }`}
                                    >
                                      <UserCheck
                                        className={`icon-sm ${
                                          selectedDoctorIndex === index
                                            ? "text-white"
                                            : "text-cyan-600"
                                        }`}
                                      />
                                    </div>
                                    <div className="text-left">
                                      <div className="font-medium">
                                        {agent.name}
                                      </div>
                                      <div
                                        className={`text-xs ${
                                          selectedDoctorIndex === index
                                            ? "text-cyan-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        {agent.specialty}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={
                                      selectedDoctorIndex === index
                                        ? "text-white"
                                        : "text-gray-400"
                                    }
                                  >
                                    {selectedDoctorIndex === index ? "●" : "⋮"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <motion.div
                            key={selectedDoctorIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
                              {t.homepage.whyChoose}
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                              {agentData[selectedDoctorIndex].description}
                            </p>

                            <div className="space-y-3 mb-6">
                              {agentData[selectedDoctorIndex].benefits.map(
                                (benefit, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: index * 0.1,
                                    }}
                                    className="flex items-center space-x-2"
                                  >
                                    <CheckCircle className="h-5 w-5 text-cyan-600" />
                                    <span className="text-gray-700 text-sm">
                                      {benefit}
                                    </span>
                                  </motion.div>
                                )
                              )}
                            </div>

                            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm">
                              {t.homepage.getFreeConsultation}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Meet Our Specialists and Patient Testimonials Combined Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="min-h-screen flex flex-col"
                  >
                    {/* Specialized Agents Section */}
                    <div className="flex-1 flex flex-col justify-center py-8">
                      <div className="text-center mb-12">
                        <h2 className="heading-xl lg:heading-2xl text-gray-900 mb-3">
                          {t.homepage.meetSpecialists}
                        </h2>
                        <p className="text-lg text-gray-600">
                          {t.homepage.aiAgentsSubtitle}
                        </p>
                      </div>

                      <div className="relative overflow-hidden mb-6">
                        <motion.div
                          className="flex transition-transform duration-500 ease-in-out"
                          animate={{ x: -specialistSlideIndex * 100 + "%" }}
                        >
                          {[
                            [
                              {
                                name: t.homepage.aiGeneralMedicine,
                                specialty: t.homepage.aiGeneralDescription,
                                icon: Stethoscope,
                                color: "from-blue-100 to-blue-200"
                              },
                              {
                                name: t.homepage.aiCardiology,
                                specialty: t.homepage.aiCardiologyDescription,
                                icon: Heart,
                                color: "from-red-100 to-red-200"
                              },
                              {
                                name: t.homepage.aiNeurology,
                                specialty: t.homepage.aiNeurologyDescription,
                                icon: Brain,
                                color: "from-purple-100 to-purple-200"
                              },
                              {
                                name: t.homepage.aiPediatrics,
                                specialty: t.homepage.aiPediatricsDescription,
                                icon: Baby,
                                color: "from-pink-100 to-pink-200"
                              },
                            ],
                            [
                              {
                                name: t.homepage.aiDermatology,
                                specialty: t.homepage.aiDermatologyDescription,
                                icon: Microscope,
                                color: "from-green-100 to-green-200"
                              },
                              {
                                name: t.homepage.aiRadiology,
                                specialty: t.homepage.aiRadiologyDescription,
                                icon: Camera,
                                color: "from-cyan-100 to-cyan-200"
                              },
                              {
                                name: t.homepage.aiEmergency,
                                specialty: t.homepage.aiEmergencyDescription,
                                icon: AlertCircle,
                                color: "from-orange-100 to-orange-200"
                              },
                              {
                                name: t.homepage.aiOncology,
                                specialty: t.homepage.aiOncologyDescription,
                                icon: Target,
                                color: "from-yellow-100 to-yellow-200"
                              },
                            ],
                          ].map((slide, slideIndex) => (
                            <div
                              key={slideIndex}
                              className="w-full flex-shrink-0"
                            >
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                                {slide.map((agent) => (
                                  <motion.div
                                    key={agent.name}
                                    className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    whileHover={{ y: -3 }}
                                    onClick={() => {
                                      // Handle agent selection
                                      console.log('Selected agent:', agent.name);
                                    }}
                                  >
                                    <div className={`w-full h-24 lg:h-32 rounded-md lg:rounded-lg mb-2 lg:mb-3 overflow-hidden bg-gradient-to-br ${agent.color} relative flex items-center justify-center`}>
                                      <agent.icon className="h-8 w-8 lg:h-10 lg:w-10 text-gray-700" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 text-xs lg:text-sm leading-tight">
                                      {agent.name}
                                    </h3>
                                    <p className="text-gray-600 text-xs leading-tight">
                                      {agent.specialty}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Pagination dots */}
                      <div className="flex justify-center space-x-2">
                        {[0, 1].map((index) => (
                          <button
                            key={index}
                            onClick={() => setSpecialistSlideIndex(index)}
                            className={`transition-all duration-300 rounded-full ${
                              specialistSlideIndex === index
                                ? "w-8 h-2 bg-pink-400"
                                : "w-2 h-2 bg-cyan-400 hover:bg-cyan-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Image Scanning Section */}
                    <div className="flex-1 flex flex-col justify-center py-8">
                      <div className="text-center mb-12">
                        <h2 className="heading-xl lg:heading-2xl text-gray-900 mb-3">
                          {t.homepage.imageScanning}
                        </h2>
                        <p className="text-lg text-gray-600">
                          {t.homepage.imageScanningDescription}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* MRI Analysis */}
                        <motion.div
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('MRI Analysis selected');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Scan className="h-8 w-8 text-blue-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            {t.homepage.mriAnalysis}
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Análisis avanzado de resonancia magnética
                          </p>
                        </motion.div>

                        {/* CT Scan Analysis */}
                        <motion.div
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('CT Scan Analysis selected');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Microscope className="h-8 w-8 text-green-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            {t.homepage.ctScanAnalysis}
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Interpretación de tomografías computarizadas
                          </p>
                        </motion.div>

                        {/* X-ray Analysis */}
                        <motion.div
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('X-ray Analysis selected');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Camera className="h-8 w-8 text-cyan-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            {t.homepage.xrayAnalysis}
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Análisis de radiografías y rayos X
                          </p>
                        </motion.div>

                        {/* Ultrasound Analysis */}
                        <motion.div
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('Ultrasound Analysis selected');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Activity className="h-8 w-8 text-purple-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            {t.homepage.ultrasoundAnalysis}
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Interpretación de ecografías
                          </p>
                        </motion.div>

                        {/* Pathology Analysis */}
                        <motion.div
                          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('Pathology Analysis selected');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Microscope className="h-8 w-8 text-red-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            {t.homepage.pathologyAnalysis}
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Análisis de muestras patológicas
                          </p>
                        </motion.div>

                        {/* Upload Image Button */}
                        <motion.div
                          className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-cyan-300"
                          whileHover={{ y: -3 }}
                          onClick={() => {
                            console.log('Upload medical image');
                          }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <Upload className="h-8 w-8 text-cyan-700" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 text-center">
                            Subir Imagen
                          </h3>
                          <p className="text-gray-600 text-sm text-center">
                            Carga tu imagen médica para análisis
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Patient Testimonials Section */}
                    <div className="flex-1 flex items-center py-8">
                      <div className="w-full">
                        <div className="text-center mb-12">
                          <h2 className="heading-xl lg:heading-2xl text-gray-900 mb-3">
                            {t.homepage.patientsFeedback}
                          </h2>
                          <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            {t.homepage.testimonialDescription}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                          <div className="relative order-2 lg:order-1">
                            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl">
                              <div className="w-full h-48 lg:h-60 rounded-lg lg:rounded-xl overflow-hidden relative">
                                <Image
                                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                  alt="Happy Patient Experience"
                                  fill
                                  className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <div className="w-5 lg:w-6 h-5 lg:h-6 bg-pink-200 rounded-full absolute top-4 lg:top-6 left-4 lg:left-6 flex items-center justify-center">
                                  <Heart className="h-2.5 lg:h-3 w-2.5 lg:w-3 text-pink-600" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={testimonialIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-lg mb-4"
                              >
                                {(() => {
                                  const testimonials = [
                                    {
                                      name: t.homepage.brooklynJacob,
                                      location: t.homepage.newYork,
                                      review: t.homepage.clinicalCareReview,
                                    },
                                    {
                                      name: t.homepage.mariaRodriguez,
                                      location: t.homepage.mariaLocation,
                                      review: t.homepage.mariaReview,
                                    },
                                    {
                                      name: t.homepage.johnSmith,
                                      location: t.homepage.johnLocation,
                                      review: t.homepage.johnReview,
                                    },
                                  ];

                                  const currentTestimonial =
                                    testimonials[testimonialIndex];

                                  return (
                                    <>
                                      <div className="flex items-center mb-3">
                                        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-teal-100 rounded-full mr-3 flex items-center justify-center">
                                          <UserCheck className="h-4 lg:h-5 w-4 lg:w-5 text-teal-600" />
                                        </div>
                                        <div>
                                          <h3 className="font-bold text-gray-900 text-sm lg:text-base">
                                            {currentTestimonial.name}
                                          </h3>
                                          <p className="text-gray-600 text-xs lg:text-sm">
                                            {currentTestimonial.location}
                                          </p>
                                          <div className="flex text-yellow-400 text-xs space-x-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                              <CheckCircle
                                                key={i}
                                                className="h-2.5 lg:h-3 w-2.5 lg:w-3 fill-current"
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                        &ldquo;{currentTestimonial.review}
                                        &rdquo;
                                      </p>
                                    </>
                                  );
                                })()}
                              </motion.div>
                            </AnimatePresence>

                            {/* Pagination dots */}
                            <div className="flex justify-center space-x-2">
                              {[0, 1, 2].map((index) => (
                                <button
                                  key={index}
                                  onClick={() => setTestimonialIndex(index)}
                                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                    testimonialIndex === index
                                      ? "bg-cyan-600"
                                      : "bg-gray-300 hover:bg-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Medical Technology Showcase and Newsletter Subscription Combined Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.05 }}
                    className="min-h-screen flex flex-col"
                  >
                    {/* Medical Technology Showcase Section */}
                    <div className="flex-1 flex items-center py-8">
                      <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="relative group overflow-hidden rounded-2xl">
                            <Image
                              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                              alt="Advanced Medical Equipment"
                              width={600}
                              height={256}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                              <div className="p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">
                                  {t.homepage.advancedDiagnostics}
                                </h3>
                                <p className="text-sm opacity-90">
                                  {t.homepage.advancedDiagnosticsDesc}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative group overflow-hidden rounded-2xl">
                            <Image
                              src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                              alt="Advanced Technology in Healthcare"
                              width={600}
                              height={256}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                              <div className="p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">
                                  {t.homepage.aiPoweredAnalysis}
                                </h3>
                                <p className="text-sm opacity-90">
                                  {t.homepage.aiPoweredAnalysisDesc}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative group overflow-hidden rounded-2xl">
                            <Image
                              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                              alt="Telemedicine and Remote Care"
                              width={600}
                              height={256}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                              <div className="p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">
                                  {t.homepage.remoteHealthcare}
                                </h3>
                                <p className="text-sm opacity-90">
                                  {t.homepage.remoteHealthcareDesc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Newsletter Subscription Section */}
                    <div className="flex-1 flex items-center py-8">
                      <div className="w-full">
                        <div className="bg-cyan-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center text-white relative overflow-hidden">
                          {/* Newsletter Background Image */}
                          <div className="absolute inset-0 opacity-10">
                            <Image
                              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                              alt="Medical Newsletter Background"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative z-10">
                            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4">
                              {t.homepage.subscribeNews}
                            </h2>
                            <p className="text-cyan-100 mb-6 text-sm lg:text-base max-w-2xl mx-auto">
                              {t.homepage.subscribeDescription}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto items-stretch">
                              <div className="flex-1">
                                <input
                                  type="email"
                                  placeholder={t.homepage.enterEmail}
                                  className="w-full px-4 py-3 lg:py-4 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600 text-sm lg:text-base transition-all duration-300 border-0 min-h-12 lg:min-h-14"
                                />
                              </div>
                              <Button className="bg-white hover:bg-gray-100 text-cyan-600 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold text-sm lg:text-base whitespace-nowrap transition-all duration-300 hover:shadow-lg border-0 flex items-center justify-center min-h-12 lg:min-h-14">
                                {t.homepage.subscribe}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Modern Assessment Categories and Modern Information Combined Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="min-h-screen flex flex-col"
                  >
                    {/* Modern Assessment Categories Section */}
                    <div className="flex-1 flex flex-col justify-center py-8">
                      <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                          {t.homepage.startAssessment}
                        </h2>
                        <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                          Choose the type of assessment that best matches your
                          needs
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {healthTopics.map((topic, index) => (
                          <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`${
                                topic.isEmergency ? "border-2" : "border"
                              } h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-opacity-80 group backdrop-blur-sm bg-white/90 relative z-10 overflow-hidden`}
                              onClick={() => handleStartAssessment(topic.id)}
                            >
                              {/* Background Image */}
                              <div className="absolute inset-0 opacity-10">
                                <Image
                                  src={(() => {
                                    const images = {
                                      general:
                                        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                      mental:
                                        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                      heart:
                                        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                      chat: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                      preventive:
                                        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                      emergency:
                                        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                                    };
                                    return (
                                      images[topic.id as keyof typeof images] ||
                                      images.general
                                    );
                                  })()}
                                  alt={topic.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <CardContent className="p-4 lg:p-6 relative z-10">
                                <div className="space-y-6">
                                  {/* Modern Icon and Title */}
                                  <div className="flex items-start space-x-3 lg:space-x-4">
                                    <motion.div
                                      className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white ${
                                        topic.iconColor
                                      } shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                                        topic.isEmergency
                                          ? "border-2 border-red-200"
                                          : "border border-gray-200"
                                      }`}
                                      whileHover={{ rotate: 3, scale: 1.05 }}
                                    >
                                      <topic.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                                    </motion.div>
                                    <div className="flex-1">
                                      <h3
                                        className={`text-lg lg:text-xl font-bold ${
                                          topic.isEmergency
                                            ? "text-red-900"
                                            : "text-gray-900"
                                        } leading-tight mb-1 lg:mb-2`}
                                      >
                                        {topic.title}
                                      </h3>
                                      {topic.isEmergency && (
                                        <div className="flex items-center space-x-2 mb-1 lg:mb-2">
                                          <Phone className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
                                          <span className="text-xs lg:text-sm text-red-600 font-semibold">
                                            Call 911 if emergency
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Enhanced Description */}
                                  <p
                                    className={`text-sm lg:text-base leading-relaxed mb-3 lg:mb-4 ${
                                      topic.isEmergency
                                        ? "text-red-800"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {topic.description}
                                  </p>

                                  {/* Modern Tags */}
                                  {topic.tags && (
                                    <div className="flex flex-wrap gap-2">
                                      {topic.tags.map((tag, tagIndex) => (
                                        <span
                                          key={tagIndex}
                                          className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
                                            topic.isEmergency
                                              ? "bg-red-200 text-red-800 hover:bg-red-300"
                                              : "bg-white/80 border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md"
                                          }`}
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* Modern Action Indicator */}
                                  <div className="pt-4 border-t border-white/30">
                                    <div
                                      className={`flex items-center justify-between text-sm font-semibold ${
                                        topic.isEmergency
                                          ? "text-red-600"
                                          : "text-cyan-600"
                                      }`}
                                    >
                                      <span>
                                        {topic.isEmergency
                                          ? t.homepage.emergencyAssessment
                                          : t.homepage.startAssessment}
                                      </span>
                                      <motion.div
                                        className="w-6 h-6 rounded-full bg-current flex items-center justify-center"
                                        whileHover={{ scale: 1.2 }}
                                      >
                                        <span className="text-white text-xs">
                                          →
                                        </span>
                                      </motion.div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Modern Information Section */}
                    <div className="flex-1 flex items-center py-8">
                      <div className="w-full">
                        <Card className="max-w-7xl mx-auto bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-200 border border-white/20 shadow-2xl rounded-3xl backdrop-blur-sm">
                          <CardContent className="p-12">
                            <div className="text-center mb-12">
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-xl overflow-hidden"
                              >
                                <Image
                                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                  alt="Advanced Medical Technology"
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-cyan-700/80"></div>
                                <Stethoscope className="absolute h-10 w-10 text-white z-10" />
                              </motion.div>
                              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {t.homepage.advancedMedicalAI}
                              </h2>
                              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                {t.homepage.aiSystemDescription}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                              <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                whileHover={{ y: -5 }}
                              >
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                  <Image
                                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                    alt="Evidence-Based Medicine"
                                    fill
                                    className="object-cover rounded-2xl"
                                  />
                                  <div className="absolute inset-0 bg-green-500/20 rounded-2xl"></div>
                                  <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                  {t.homepage.evidenceBased}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {t.homepage.evidenceBasedDesc}
                                </p>
                              </motion.div>
                              <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                                whileHover={{ y: -5 }}
                              >
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                  <Image
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                    alt="Secure & Private Healthcare"
                                    fill
                                    className="object-cover rounded-2xl"
                                  />
                                  <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl"></div>
                                  <Shield className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                  {t.homepage.securePrivate}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {t.homepage.securePrivateDesc}
                                </p>
                              </motion.div>
                              <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                whileHover={{ y: -5 }}
                              >
                                <div className="relative w-16 h-16 mx-auto mb-4">
                                  <Image
                                    src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                    alt="Comprehensive Assessment"
                                    fill
                                    className="object-cover rounded-2xl"
                                  />
                                  <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl"></div>
                                  <ClipboardList className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white drop-shadow-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                  {t.homepage.comprehensive}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                  {t.homepage.comprehensiveDesc}
                                </p>
                              </motion.div>
                            </div>

                            <div className="text-center">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  onClick={() =>
                                    handleStartAssessment("general")
                                  }
                                  className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-bold px-12 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                                >
                                  {t.homepage.startQuestionnaire}
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {appState === "questionnaire" && (
                <motion.div
                  key="questionnaire"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-7xl mx-auto"
                >
                  <DynamicQuestionnaire
                    onComplete={handleQuestionnaireComplete}
                    onEmergencyDetected={handleEmergencyDetected}
                    initialTopic={selectedTopic || undefined}
                    initialQuery={
                      selectedTopic === "search" ? (selectedSymptom?.label || searchQuery) : undefined
                    }
                  />
                </motion.div>
              )}

              {appState === "loading" && (
                <LoadingCard
                  title={t.questionnaire.analyzing}
                  description={t.questionnaire.generatingAssessment}
                  showSteps={true}
                  steps={[
                    `${t.questionnaire.processing} ${responses.length} ${t.questionnaire.questionsAnswered}`,
                    t.questionnaire.checkingDatabases,
                    t.questionnaire.generatingAssessment,
                  ]}
                />
              )}

              {appState === "results" && results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-7xl mx-auto"
                >
                  <AssessmentResults
                    result={results}
                    onNewAssessment={handleBackToHome}
                  />
                </motion.div>
              )}

              {appState === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="max-w-7xl mx-auto"
                >
                  <Card>
                    <CardContent className="p-8">
                      <div className="text-center text-red-600">
                        <p className="font-semibold mb-2">{t.common.error}</p>
                        <p className="text-sm mb-4">{error}</p>
                        <Button onClick={handleBackToHome} variant="outline">
                          {t.questions.tryAgain}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <EmergencyAlert
            isOpen={showEmergencyAlert}
            onClose={() => setShowEmergencyAlert(false)}
            message={results?.emergencyMessage}
          />
        </>
      )}
    </div>
  );
}
