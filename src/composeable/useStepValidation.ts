import { useForm } from 'vee-validate'
import type { AnySchema } from 'yup'

export function useStepValidation(schema: AnySchema, initialValues: Record<string, any>) {
  const form = useForm({
    validationSchema: schema,
    initialValues,
  })

  const validateStep = async () => {
    const result = await form.validate()
    return { valid: result }
  }

  return {
    ...form,
    validateStep,
  }
}
