"use client";

import { AsyncAutocomplete, Option } from "./async-autocomplete";

interface SymptomAutocompleteProps {
  onSymptomSelect?: (symptom: Option | null) => void;
  placeholder?: string;
  value?: Option | null;
  className?: string;
  type?: "symptom" | "destination" | "condition";
}

// Common medical symptoms for quick autocomplete
const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Chest pain",
  "Shortness of breath",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Abdominal pain",
  "Back pain",
  "Joint pain",
  "Muscle pain",
  "Fatigue",
  "Dizziness",
  "Sore throat",
  "Runny nose",
  "Congestion",
  "Rash",
  "Itching",
  "Swelling",
  "Palpitations",
  "Anxiety",
  "Depression",
  "Insomnia",
  "Loss of appetite",
  "Weight loss",
  "Weight gain",
  "Difficulty swallowing",
  "Hoarseness",
  "Bleeding",
  "Bruising",
  "Vision problems",
  "Hearing problems",
  "Memory problems",
  "Confusion",
  "Seizures",
  "Tremor",
  "Weakness",
  "Numbness",
  "Tingling",
];

// Common medical destinations/locations
const commonDestinations = [
  "Emergency Room",
  "Urgent Care",
  "Primary Care Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Psychiatrist",
  "Gynecologist",
  "Pediatrician",
  "ENT Specialist",
  "Ophthalmologist",
  "Gastroenterologist",
  "Endocrinologist",
  "Pulmonologist",
  "Rheumatologist",
  "Oncologist",
  "Radiologist",
  "Anesthesiologist",
  "Pathologist",
  "General Hospital",
  "Specialty Clinic",
  "Walk-in Clinic",
  "Telemedicine",
  "Home Care",
];

// Common medical conditions
const commonConditions = [
  "Hypertension",
  "Diabetes",
  "Asthma",
  "COPD",
  "Heart Disease",
  "Stroke",
  "Cancer",
  "Arthritis",
  "Osteoporosis",
  "Depression",
  "Anxiety",
  "Migraine",
  "Epilepsy",
  "Thyroid Disorder",
  "Kidney Disease",
  "Liver Disease",
  "Pneumonia",
  "Bronchitis",
  "UTI",
  "Gastritis",
  "IBS",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Fibromyalgia",
  "Lupus",
  "Multiple Sclerosis",
  "Parkinson's Disease",
  "Alzheimer's Disease",
];

export function SymptomAutocomplete({
  onSymptomSelect,
  placeholder,
  value,
  className,
  type = "symptom",
}: SymptomAutocompleteProps) {
  const getDataSource = () => {
    switch (type) {
      case "destination":
        return commonDestinations;
      case "condition":
        return commonConditions;
      default:
        return commonSymptoms;
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (type) {
      case "destination":
        return "Search for medical facility or specialist...";
      case "condition":
        return "Search for medical condition...";
      default:
        return "Describe your symptoms...";
    }
  };

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 150));
    
    if (!inputValue || inputValue.length < 2) {
      return [];
    }

    const dataSource = getDataSource();
    const filtered = dataSource
      .filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map(item => ({
        value: item.toLowerCase().replace(/\s+/g, "-"),
        label: item,
        data: { type, original: item } as Record<string, unknown>
      }))
      .slice(0, 10); // Limit to 10 results

    // If no exact matches, add the user input as an option
    if (filtered.length === 0 || !filtered.some(option => 
      option.label.toLowerCase() === inputValue.toLowerCase()
    )) {
      filtered.unshift({
        value: inputValue.toLowerCase().replace(/\s+/g, "-"),
        label: inputValue,
        data: { type, original: inputValue, custom: true } as Record<string, unknown>
      });
    }

    return filtered;
  };

  return (
    <AsyncAutocomplete
      loadOptions={loadOptions}
      onChange={onSymptomSelect}
      placeholder={getPlaceholder()}
      value={value}
      className={className}
      noOptionsMessage="No matching results found"
      loadingMessage="Searching..."
      cacheOptions={true}
      defaultOptions={false}
      debounceDelay={200}
    />
  );
}