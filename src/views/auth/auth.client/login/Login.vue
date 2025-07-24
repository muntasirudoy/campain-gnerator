<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/client/client-auth-store";
import {
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Copywrite from "../../components/Copywrite.vue";

import { CLIENT_REGISTER, CLIENT_USER_REDIRECT_AFTER_LOGIN } from "@/constant";
import { clientUserLoginSchema } from "@/types/client-auth-types";
import { ErrorMessage, useField, useForm } from "vee-validate";
import AuthError from "../../components/AuthError.vue";
import AuthLogo from "../../components/AuthLogo.vue";
import AuthTitle from "../../components/AuthTitle.vue";
import AuthSideImage from "../../components/AuthSideImage.vue";
import AuthSuccess from "../../components/AuthSuccess.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const showPassword = ref(false);
const successMessage = ref("");

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: clientUserLoginSchema,
  initialValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
});

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: rememberMe } = useField("rememberMe");

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login({
      email: values.email,
      password: values.password,
    });
    successMessage.value = "Login successful! Redirecting...";
    const redirectTo = route.query.redirect || CLIENT_USER_REDIRECT_AFTER_LOGIN;
    setTimeout(() => {
      if (authStore.isAdmin && authStore.is_stepper_complete == 0) {
        const redirectToOnboard = `/create-campaign?step=${authStore.stepper_count + 1}`;
        router.push(redirectToOnboard);
      } else {
        router.push(redirectTo);
      }
    }, 200);
  } catch (error) {
    console.error("Login failed:", error);
  }
});

onMounted(() => {
  authStore.error = null;
  if (authStore.isAuthenticated) {
    router.push(CLIENT_USER_REDIRECT_AFTER_LOGIN);
  }
});
</script>

<template>
  <div
    class="bg-gray-100 flex items-center justify-center min-h-[100dvh] relative"
  >
    <AuthSideImage />
    <div
      class="w-full lg:w-1/2 text-center h-[100dvh] bg-white space-y-5 flex flex-col justify-center items-center relative px-4"
    >
      <div class="space-y-10 max-w-[400px] w-full mx-auto">
        <AuthLogo :title="'Create Account'" />
        <AuthTitle :title="'Login'" />
        <AuthError :authStore="authStore" />
        <AuthSuccess :successMessage="successMessage" />

        <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="space-y-2 text-left">
            <Label
              for="email"
              class="block text-sm font-medium text-gray-700 text-left"
              >Email Address</Label
            >
            <Input
              class="auth-input"
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              :class="{ 'border-red-500': errors.email }"
              :disabled="authStore.isLoading || isSubmitting"
            />
            <ErrorMessage
              name="email"
              class="text-sm text-red-600 text-left inline-block"
            />
          </div>

          <div class="space-y-2 text-left">
            <Label
              for="password"
              class="block text-sm font-medium text-gray-700 text-left"
              >Password</Label
            >
            <div class="relative">
              <Input
                class="auth-input"
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                :class="{ 'border-red-500': errors.password }"
                :disabled="authStore.isLoading || isSubmitting"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :disabled="authStore.isLoading || isSubmitting"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <ErrorMessage
              name="password"
              class="text-sm text-red-600 text-left"
            />
          </div>

          <div class="flex items-center space-x-2">
            <input
              id="rememberMe"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <Label for="rememberMe" class="text-sm text-gray-700"
              >Remember me</Label
            >
          </div>

          <div class="flex items-center justify-end">
            <router-link
              to="/forgot-password"
              class="text-sm text-secondary hover:text-primary font-medium"
            >
              Forgot password?
            </router-link>
          </div>

          <Button type="submit" class="btn px-10">
            <LoaderIcon
              v-if="authStore.isLoading || isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5"
            />
            {{
              authStore.isLoading || isSubmitting ? "Signing in..." : "Sign In"
            }}
          </Button>
        </form>
      </div>

      <p class="font-primary text-gray-600">
        Don't have an account yet?
        <router-link
          :to="CLIENT_REGISTER"
          class="text-secondary hover:text-primary font-medium"
        >
          Create an Account
        </router-link>
      </p>

      <Copywrite />
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
