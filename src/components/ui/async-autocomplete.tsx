"use client";

import { forwardRef, useMemo } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { cn } from "@/lib/utils";
import { Edit3 } from "lucide-react";

// Custom Option component for enhanced styling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomOption = (props: any) => {
  const { data, children, innerRef, innerProps } = props;
  const isCustom = data?.data?.custom;
  
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={cn(
        "flex items-center px-3 py-2 cursor-pointer rounded-md mx-1 my-0.5",
        props.isSelected 
          ? "bg-cyan-600 text-white" 
          : props.isFocused 
          ? "bg-cyan-50 text-gray-900"
          : "bg-white text-gray-900",
        "hover:bg-cyan-50"
      )}
    >
      {isCustom && <Edit3 className="mr-2 h-4 w-4 text-amber-600" />}
      <span className="flex-1">{children}</span>
    </div>
  );
};

export interface Option {
  value: string;
  label: string;
  data?: Record<string, unknown>;
}

export interface AsyncAutocompleteProps {
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  options?: Option[];
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
    minHeight: "3rem",
    height: "3rem",
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
    zIndex: 999999,
    position: "relative",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0.25rem",
    maxHeight: "200px",
  }),
  option: () => ({
    // Custom option component will handle all styling
    padding: 0,
    backgroundColor: "transparent",
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
      options,
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
    const mergedStyles = useMemo(() => {
      return styles ? { ...customStyles, ...styles } : customStyles;
    }, [styles]);

    const mergedComponents = useMemo(() => {
      return {
        Option: CustomOption,
        ...components
      };
    }, [components]);

    const debouncedLoadOptions = useMemo(() => {
      if (!loadOptions) return undefined;
      
      return (inputValue: string, callback: (options: Option[]) => void) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        
        debounceTimer = setTimeout(async () => {
          try {
            const result = await loadOptions(inputValue);
            callback(result);
          } catch (error) {
            console.error("Error loading options:", error);
            callback([]);
          }
        }, debounceDelay);
      };
    }, [loadOptions, debounceDelay]);

    // If options are provided, use regular Select (like your example)
    if (options) {
      return (
        <Select
          ref={ref}
          options={options}
          onChange={onChange}
          onInputChange={onInputChange}
          placeholder={placeholder}
          value={value}
          className={cn("react-select-container", className)}
          classNamePrefix="react-select"
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={true}
          menuPortalTarget={menuPortalTarget || (typeof document !== 'undefined' ? document.body : null)}
          menuPlacement="auto"
          menuShouldBlockScroll={true}
          styles={mergedStyles}
          components={mergedComponents}
          noOptionsMessage={() => noOptionsMessage}
          {...props}
        />
      );
    }

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
        menuPortalTarget={menuPortalTarget || (typeof document !== 'undefined' ? document.body : null)}
        menuPlacement="auto"
        menuShouldBlockScroll={true}
        styles={mergedStyles}
        components={mergedComponents}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        {...props}
      />
    );
  }
);

AsyncAutocomplete.displayName = "AsyncAutocomplete";

export { AsyncAutocomplete };