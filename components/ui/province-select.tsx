"use client";

import { useI18n } from "@/lib/i18n";
import { AFGHANISTAN_PROVINCES, type Province, getProvinceTranslationKey } from "@/lib/constants/provinces";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface ProvinceSelectProps<TFieldValues extends FieldValues = FieldValues> {
  field?: ControllerRenderProps<TFieldValues, any>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  includeRemote?: boolean;
}

export function ProvinceSelect<TFieldValues extends FieldValues = FieldValues>({
  field,
  value,
  onChange,
  className = "",
  placeholder,
  required = false,
  disabled = false,
  includeRemote = true,
}: ProvinceSelectProps<TFieldValues>) {
  const { t, isRTL } = useI18n();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (field) {
      field.onChange(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  };

  const currentValue = field?.value || value || "";

  return (
    <select
      {...field}
      value={currentValue}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed border-gray-200 focus:border-[#0066FF] ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <option value="">
        {placeholder || t("postJob.selectLocation")}
      </option>
      
      {AFGHANISTAN_PROVINCES.map((province: Province) => (
        <option key={province.code} value={province.name_en}>
          {t(`provinces.${getProvinceTranslationKey(province)}`)}
        </option>
      ))}
      
      {includeRemote && (
        <option value="Remote">
          {t("provinces.remote")}
        </option>
      )}
    </select>
  );
}

export default ProvinceSelect;