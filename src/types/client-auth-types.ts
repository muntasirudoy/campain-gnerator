import * as yup from 'yup';
import type { InferType } from 'yup';

export type ClientUserRegisterResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};


export const clientUserLoginSchema = yup.object({
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().default(false),
});


export type ClientUserLoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  is_admin:number;
  stepper_count?: 2;
  is_stepper_complete?: 0
};



export const clientUserRegistrationSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  phone: yup.string()
    .required('Phone is required')
    .matches(/^\d+$/, 'Phone must contain only numbers')
    .min(7, 'Phone must be at least 7 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});


export const resetPasswordSchema = yup.object({

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  password_confirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),

});



export type ResetPassword = InferType<typeof resetPasswordSchema>;
export type ClientUserRegistration = yup.InferType<typeof clientUserRegistrationSchema>;
export type ClientUserLogin = InferType<typeof clientUserLoginSchema>;