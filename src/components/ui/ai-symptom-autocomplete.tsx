"use client";

import { useState, useCallback } from "react";
import { AsyncAutocomplete, Option } from "./async-autocomplete";
import { useTranslations } from "@/contexts/language-context";

interface AISymptomAutocompleteProps {
  onSymptomSelect?: (symptom: Option | null) => void;
  placeholder?: string;
  value?: Option | null;
  className?: string;
  questionContext?: string; // Add question context for contextual suggestions
}

export function AISymptomAutocomplete({
  onSymptomSelect,
  placeholder,
  value,
  className,
  questionContext,
}: AISymptomAutocompleteProps) {
  const t = useTranslations();
  
  // Generate contextual suggestions based on question context
  const getContextualSuggestions = useCallback(() => {
    if (!questionContext) {
      // Fallback to general symptoms if no context
      return [
        t.symptomAutocomplete.popularSymptoms.headache,
        t.symptomAutocomplete.popularSymptoms.fever,
        t.symptomAutocomplete.popularSymptoms.cough,
        t.medicalOptions.symptoms.chestPain,
        t.symptomAutocomplete.popularSymptoms.fatigue,
        t.symptomAutocomplete.popularSymptoms.nausea,
        t.symptomAutocomplete.popularSymptoms.soreThroat,
        t.medicalOptions.symptoms.backPain,
        t.symptomAutocomplete.popularSymptoms.dizziness,
        t.symptomAutocomplete.popularSymptoms.shortnessOfBreath
      ];
    }

    // Generate contextual suggestions based on question type
    const questionText = questionContext.toLowerCase();
    
    if (questionText.includes('duration') || questionText.includes('time') || questionText.includes('when')) {
      return [
        "Started 2 hours ago",
        "Started yesterday",
        "Started 3 days ago", 
        "Started last week",
        "Started 2 weeks ago",
        "Started last month",
        "Started 3 months ago",
        "Started 6 months ago",
        "Started a year ago",
        "Started years ago"
      ];
    }
    
    if (questionText.includes('severity') || questionText.includes('pain') || questionText.includes('intensity')) {
      return [
        "Mild",
        "Moderate", 
        "Severe",
        "Very severe",
        "Unbearable",
        "1/10",
        "3/10",
        "5/10",
        "7/10",
        "10/10"
      ];
    }
    
    if (questionText.includes('location') || questionText.includes('where')) {
      return [
        "Head",
        "Chest",
        "Abdomen",
        "Back",
        "Arms",
        "Legs",
        "Neck",
        "Shoulders",
        "Lower back",
        "Upper back"
      ];
    }
    
    if (questionText.includes('associated') || questionText.includes('accompanying') || questionText.includes('other')) {
      return [
        "Nausea",
        "Vomiting",
        "Dizziness",
        "Fatigue",
        "Fever",
        "Chills",
        "Sweating",
        "Weakness",
        "Confusion",
        "Shortness of breath"
      ];
    }
    
    if (questionText.includes('trigger') || questionText.includes('cause') || questionText.includes('started')) {
      return [
        "After eating",
        "During exercise",
        "At rest",
        "When lying down",
        "When standing",
        "In the morning",
        "At night",
        "After stress",
        "During sleep",
        "After medication"
      ];
    }
    
    if (questionText.includes('frequency') || questionText.includes('how often') || questionText.includes('recurring')) {
      return [
        "Once",
        "Twice",
        "Daily",
        "Several times a day",
        "Weekly",
        "Monthly",
        "Occasionally",
        "Constantly",
        "Intermittently",
        "Rarely"
      ];
    }
    
    if (questionText.includes('character') || questionText.includes('type') || questionText.includes('quality')) {
      return [
        "Sharp",
        "Dull",
        "Throbbing",
        "Burning",
        "Stabbing",
        "Aching",
        "Cramping",
        "Pulsating",
        "Radiating",
        "Localized"
      ];
    }
    
    if (questionText.includes('relief') || questionText.includes('better') || questionText.includes('worse')) {
      return [
        "Rest helps",
        "Movement helps",
        "Heat helps",
        "Cold helps",
        "Medication helps",
        "Nothing helps",
        "Gets worse with movement",
        "Gets worse at night",
        "Gets worse with stress",
        "Gets worse with activity"
      ];
    }
    
    // Default to general symptoms for other questions
    return [
      t.symptomAutocomplete.popularSymptoms.headache,
      t.symptomAutocomplete.popularSymptoms.fever,
      t.symptomAutocomplete.popularSymptoms.cough,
      t.medicalOptions.symptoms.chestPain,
      t.symptomAutocomplete.popularSymptoms.fatigue,
      t.symptomAutocomplete.popularSymptoms.nausea,
      t.symptomAutocomplete.popularSymptoms.soreThroat,
      t.medicalOptions.symptoms.backPain,
      t.symptomAutocomplete.popularSymptoms.dizziness,
      t.symptomAutocomplete.popularSymptoms.shortnessOfBreath
    ];
  }, [questionContext, t]);
  const [isLoading, setIsLoading] = useState(false);

  // AI-powered symptom suggestion function
  const loadSymptomOptions = useCallback(async (inputValue: string): Promise<Option[]> => {
    // If no input or very short input, return contextual suggestions
    if (!inputValue || inputValue.trim().length < 3) {
      const contextualSuggestions = getContextualSuggestions();
      return contextualSuggestions.map(suggestion => ({
        value: suggestion.toLowerCase().replace(/\s+/g, "-"),
        label: suggestion,
        data: { type: "contextual", original: suggestion } as Record<string, unknown>
      }));
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-symptom-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: inputValue,
          model: 'gpt-5-nano' // Using GPT-5-nano as requested
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI suggestions');
      }

      const data = await response.json();
      
      // Combine AI suggestions with popular symptoms (prioritize AI)
      const aiSuggestions = data.suggestions?.map((suggestion: string) => ({
        value: suggestion.toLowerCase().replace(/\s+/g, "-"),
        label: suggestion,
        data: { type: "ai", original: suggestion } as Record<string, unknown>
      })) || [];

      // Add contextual suggestions that match the input
      const contextualSuggestions = getContextualSuggestions();
      const matchingContextual = contextualSuggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !aiSuggestions.some((ai: Option) => ai.label.toLowerCase() === suggestion.toLowerCase())
        )
        .map(suggestion => ({
          value: suggestion.toLowerCase().replace(/\s+/g, "-"),
          label: suggestion,
          data: { type: "contextual", original: suggestion } as Record<string, unknown>
        }));

      return [...aiSuggestions, ...matchingContextual];
    } catch (error) {
      console.error('Error loading AI symptom suggestions:', error);
      
      // Fallback to contextual suggestions that match input
      const contextualSuggestions = getContextualSuggestions();
      return contextualSuggestions
        .filter(suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase()))
        .map(suggestion => ({
          value: suggestion.toLowerCase().replace(/\s+/g, "-"),
          label: suggestion,
          data: { type: "contextual", original: suggestion } as Record<string, unknown>
        }));
    } finally {
      setIsLoading(false);
    }
  }, [getContextualSuggestions]);

  return (
    <AsyncAutocomplete
      className={className}
      loadOptions={loadSymptomOptions}
      onChange={onSymptomSelect}
      placeholder={placeholder || t.symptomAutocomplete.describeSymptomsPlaceholder}
      value={value}
      isClearable={true}
      isLoading={isLoading}
      noOptionsMessage={t.symptomAutocomplete.noMatchingSymptoms}
      loadingMessage={t.symptomAutocomplete.generatingSuggestions}
      debounceDelay={200} // 200ms debounce for faster response
      defaultOptions={getContextualSuggestions().map(suggestion => ({
        value: suggestion.toLowerCase().replace(/\s+/g, "-"),
        label: suggestion,
        data: { type: "contextual", original: suggestion } as Record<string, unknown>
      }))} // Show contextual suggestions immediately on focus
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
    />
  );
}