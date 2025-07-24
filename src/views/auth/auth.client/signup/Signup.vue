<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/client/client-auth-store";
import { AlertCircleIcon, CheckCircleIcon, LoaderIcon } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Copywrite from "../../components/Copywrite.vue";

import { clientUserRegistrationSchema } from "@/types/client-auth-types";
import { ErrorMessage, useField, useForm } from "vee-validate";
import { CLIENT_LOGIN, CLIENT_USER_REDIRECT_AFTER_LOGIN } from "@/constant";
import AuthLogo from "../../components/AuthLogo.vue";
import AuthError from "../../components/AuthError.vue";
import AuthSuccess from "../../components/AuthSuccess.vue";
import AuthTitle from "../../components/AuthTitle.vue";

const router = useRouter();
const authStore = useAuthStore();

const successMessage = ref("");

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: clientUserRegistrationSchema,
  initialValues: {
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  },
});

const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: phone } = useField<string>("phone");
const { value: password } = useField<string>("password");
const { value: password_confirmation } = useField<string>(
  "password_confirmation"
);

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register(values);
    successMessage.value = "Registration successful! Redirecting...";
    setTimeout(() => {
      router.push(CLIENT_LOGIN);
    }, 400);
  } catch (err) {
    console.error("Registration failed", err);
  }
});
</script>

<template>
  <div class="flex min-h-[100dvh]">
    <!-- LEFT SIDE: Fixed image -->
    <div class="hidden lg:block lg:w-1/2">
      <img
        src="/auth/bg.png"
        alt="Background image"
        class="fixed top-0 left-0 w-1/2 h-screen object-cover"
      />
    </div>

    <div
      class="w-full lg:w-1/2 h-[100dvh] overflow-y-auto bg-white p-6 no-scrollbar"
    >
      <div class="max-w-[400px] w-full mx-auto py-10 space-y-8">
        <!-- Logo -->
        <AuthLogo />
        <AuthTitle :title="'Create Account'" />
        <AuthError :authStore="authStore" />
        <AuthSuccess :successMessage="successMessage" />

        <!-- FORM -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              v-model="name"
              placeholder="Enter your name"
              class="auth-input"
              :class="{ 'border-red-500': errors.name }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage name="name" class="text-sm text-red-600" />
          </div>

          <div class="space-y-2">
            <Label for="email">Email Address</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="auth-input"
              :class="{ 'border-red-500': errors.email }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage name="email" class="text-sm text-red-600" />
          </div>

          <div class="space-y-2">
            <Label for="phone">Phone</Label>
            <Input
              id="phone"
              v-model="phone"
              placeholder="Enter your phone"
              class="auth-input"
              :class="{ 'border-red-500': errors.phone }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage name="phone" class="text-sm text-red-600" />
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="auth-input"
              :class="{ 'border-red-500': errors.password }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage name="password" class="text-sm text-red-600" />
          </div>

          <div class="space-y-2">
            <Label for="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              v-model="password_confirmation"
              type="password"
              placeholder="Confirm your password"
              class="auth-input"
              :class="{ 'border-red-500': errors.password_confirmation }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage
              name="password_confirmation"
              class="text-sm text-red-600"
            />
          </div>

          <Button type="submit" class="btn w-full px-10">
            <LoaderIcon
              v-if="authStore.isLoading || isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5"
            />
            {{
              authStore.isLoading || isSubmitting
                ? "Creating Account..."
                : "Sign Up"
            }}
          </Button>
        </form>

        <p class="text-gray-600 text-center font-primary">
          Already have an account?
          <router-link
            :to="CLIENT_LOGIN"
            class="text-secondary hover:text-primary font-medium"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-logo {
  height: 60px;
  width: auto;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.auth-input {
  transition: all 0.2s ease-in-out;
}

.auth-input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
</style>
