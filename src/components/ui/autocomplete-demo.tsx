"use client";

import { useState } from "react";
import { SymptomAutocomplete } from "./symptom-autocomplete";
import { AsyncAutocomplete, Option } from "./async-autocomplete";
import { Card, CardContent } from "./card";

export function AutocompleteDemo() {
  const [selectedSymptom, setSelectedSymptom] = useState<Option | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Option | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Option | null>(null);
  const [customValue, setCustomValue] = useState<Option | null>(null);

  // Example custom load function for demonstration
  const loadCustomOptions = async (inputValue: string): Promise<Option[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!inputValue || inputValue.length < 2) return [];
    
    // Mock API response
    const mockData = [
      "Custom Option 1",
      "Custom Option 2", 
      "Custom Option 3",
      "Dynamic Result A",
      "Dynamic Result B"
    ];
    
    return mockData
      .filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))
      .map(item => ({
        value: item.toLowerCase().replace(/\s+/g, "-"),
        label: item,
        data: { type: "custom" }
      }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Async Autocomplete Components Demo
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Symptom Search</h3>
            <SymptomAutocomplete
              type="symptom"
              onSymptomSelect={setSelectedSymptom}
              value={selectedSymptom}
              className="mb-4"
            />
            {selectedSymptom && (
              <div className="bg-cyan-50 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Selected:</strong> {selectedSymptom.label}
                </p>
                <p className="text-xs text-gray-600">
                  Value: {selectedSymptom.value}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Destination Search</h3>
            <SymptomAutocomplete
              type="destination"
              onSymptomSelect={setSelectedDestination}
              value={selectedDestination}
              className="mb-4"
            />
            {selectedDestination && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Selected:</strong> {selectedDestination.label}
                </p>
                <p className="text-xs text-gray-600">
                  Value: {selectedDestination.value}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Condition Search</h3>
            <SymptomAutocomplete
              type="condition"
              onSymptomSelect={setSelectedCondition}
              value={selectedCondition}
              className="mb-4"
            />
            {selectedCondition && (
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Selected:</strong> {selectedCondition.label}
                </p>
                <p className="text-xs text-gray-600">
                  Value: {selectedCondition.value}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Custom Async</h3>
            <AsyncAutocomplete
              loadOptions={loadCustomOptions}
              onChange={setCustomValue}
              value={customValue}
              placeholder="Type to search custom data..."
              className="mb-4"
              noOptionsMessage="No custom results found"
              loadingMessage="Loading custom data..."
            />
            {customValue && (
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Selected:</strong> {customValue.label}
                </p>
                <p className="text-xs text-gray-600">
                  Value: {customValue.value}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Component Usage</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Symptom Autocomplete
<SymptomAutocomplete
  type="symptom" // or "destination" or "condition"
  onSymptomSelect={(option) => setSelectedSymptom(option)}
  value={selectedSymptom}
  placeholder="Custom placeholder..."
/>

// Custom Async Autocomplete
<AsyncAutocomplete
  loadOptions={loadCustomOptions}
  onChange={(option) => setCustomValue(option)}
  value={customValue}
  placeholder="Type to search..."
  debounceDelay={300}
  cacheOptions={true}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}