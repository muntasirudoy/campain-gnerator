import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Ref, ref } from 'vue'
import { Updater } from '@tanstack/vue-table'
import { FormField } from '@/types/Form'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const errors = ref<Record<string, string>>({})
export function validateField(field: FormField, value: any) {
  for (const validation of field.validations || []) {
    if (!validation.rule(value)) {
      errors.value[field.name] = validation.message
      return false
    }
  }
  errors.value[field.name] = ''
  return true
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}


export interface ParsedBackendError {
  message: string;
  status: number;
  errors: Record<string, string[]>;
}

export function parseBackendError(error: any): ParsedBackendError {
  const defaultMessage = "Something went wrong.";
  const defaultStatus = 500;

  if (!error || typeof error !== "object") {
    return {
      message: defaultMessage,
      status: defaultStatus,
      errors: {},
    };
  }

  const response = error.response || error;

  return {
    message:
      response?.data?.message ||
      response?.message ||
      defaultMessage,
    status: response?.status || defaultStatus,
    errors: response?.data?.errors || {},
  };
}

export function buildQueryParams(params: Record<string, any>): URLSearchParams {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.append(key, String(value))
  })
  return query
}
