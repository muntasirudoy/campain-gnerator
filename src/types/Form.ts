
export type FieldType = 'text' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'number' | 'email' | 'password' | 'date'

export interface ValidationRule {
  rule: (value: any) => boolean
  message: string
}

export interface FormField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  options?: string[]       
  validations?: ValidationRule[]
  defaultValue?: any
  required?: boolean
  disabled?: boolean
}
