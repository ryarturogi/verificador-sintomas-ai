"use client";

import { forwardRef, useMemo } from "react";
import AsyncSelect from "react-select/async";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  data?: Record<string, unknown>;
}

export interface AsyncAutocompleteProps {
  loadOptions: (inputValue: string) => Promise<Option[]>;
  onChange?: (option: Option | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  value?: Option | null;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
  isClearable?: boolean;
  cacheOptions?: boolean;
  defaultOptions?: boolean | Option[];
  menuPortalTarget?: HTMLElement | null;
  styles?: Record<string, unknown>;
  components?: Record<string, unknown>;
  debounceDelay?: number;
}

interface StyleState {
  isFocused?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
}

type StyleFn = (provided: Record<string, unknown>, state: StyleState) => Record<string, unknown>;

const customStyles: Record<string, StyleFn | (() => Record<string, unknown>)> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "2.75rem",
    height: "2.75rem",
    borderColor: state.isFocused ? "#0891b2" : "#d1d5db",
    borderRadius: "0.5rem",
    boxShadow: state.isFocused ? "0 0 0 1px #0891b2" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#0891b2" : "#9ca3af",
    },
    fontSize: "0.875rem",
    backgroundColor: "#ffffff",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "2.75rem",
    padding: "0 0.75rem",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "2.75rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "0.875rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "#111827",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0.25rem",
    maxHeight: "200px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#0891b2"
      : state.isFocused
      ? "#ecfeff"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#111827",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    margin: "0.125rem 0",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? "#0891b2" : "#ecfeff",
    },
  }),
  loadingMessage: (provided) => ({
    ...provided,
    color: "#6b7280",
    padding: "0.75rem",
    fontSize: "0.875rem",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "#6b7280",
    padding: "0.75rem",
    fontSize: "0.875rem",
  }),
};

let debounceTimer: NodeJS.Timeout | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AsyncAutocomplete = forwardRef<any, AsyncAutocompleteProps>(
  (
    {
      loadOptions,
      onChange,
      onInputChange,
      placeholder = "Type to search...",
      value,
      className,
      isDisabled = false,
      isLoading = false,
      noOptionsMessage = "No options found",
      loadingMessage = "Loading...",
      isClearable = true,
      cacheOptions = true,
      defaultOptions = false,
      menuPortalTarget,
      styles,
      components,
      debounceDelay = 300,
      ...props
    },
    ref
  ) => {
    const debouncedLoadOptions = useMemo(() => {
      return (inputValue: string, callback: (options: Option[]) => void) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        
        debounceTimer = setTimeout(async () => {
          try {
            const options = await loadOptions(inputValue);
            callback(options);
          } catch (error) {
            console.error("Error loading options:", error);
            callback([]);
          }
        }, debounceDelay);
      };
    }, [loadOptions, debounceDelay]);

    const mergedStyles = useMemo(() => {
      return styles ? { ...customStyles, ...styles } : customStyles;
    }, [styles]);

    return (
      <AsyncSelect
        ref={ref}
        loadOptions={debouncedLoadOptions}
        onChange={onChange}
        onInputChange={onInputChange}
        placeholder={placeholder}
        value={value}
        className={cn("react-select-container", className)}
        classNamePrefix="react-select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
        menuPortalTarget={menuPortalTarget}
        styles={mergedStyles}
        components={components}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        {...props}
      />
    );
  }
);

AsyncAutocomplete.displayName = "AsyncAutocomplete";

export { AsyncAutocomplete };