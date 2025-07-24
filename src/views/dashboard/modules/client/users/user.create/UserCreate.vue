<template>
  <div class="px-6 py-4 bg-gray-50 border-b-[1px]">
    <h1 class="text-[18px] flex items-center gap-2 font-secondary-Regular font-semibold">
      <User2/> {{ isEdit ? 'Update User' :'Create User' }}
    </h1>
  </div>
  <Form
    @submit="onSubmit"
   
    :initial-values="formValues"
    class=" relative h-full max-h-[calc(100vh-80px)] pb-6 "
  >
      <div class="px-8 space-y-4 h-[90%] overflow-y-auto no-scrollbar">
            <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <Field
              name="name"
              type="text"
              class="form-input"
              placeholder="Enter user Name"
              validate-on-input
            />
            <ErrorMessage name="name" class="text-xs text-red-500 mt-1" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Enter user email"
              class="form-input"
              validate-on-input
            />
            <ErrorMessage name="email" class="text-xs text-red-500 mt-1" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Phone</label>
            <Field
              name="phone"
              type="tel"
              class="form-input"
              validate-on-input
              placeholder="Enter user phone number"
            />
            <ErrorMessage name="phone" class="text-xs text-red-500 mt-1" />
          </div>


          <div v-if="!props.userToEdit" class=" space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter user password"
                class="form-input"
                validate-on-input
              />
              <ErrorMessage name="password" class="text-xs text-red-500 mt-1" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Confirm Password</label>
              <Field
                name="password_confirmation"
                type="password"
                class="form-input"
                placeholder="Enter user confirm password"
                validate-on-input
              />
              <ErrorMessage
                name="password_confirmation"
                class="text-xs text-red-500 mt-1"
              />
            </div>
          </div>

          <div class="bg-gray-100 p-4 rounded-md">
            <label class="block text-sm font-medium mb-2">Assign Role</label>
            <MultiSelect
              :modelValue="roles"
              @update:model-value="handleRolesChange"
              :options="
                roleStore.roles.map((r) => ({
                  value: r.id,
                  label: r.name,
                  icon: r.icon,
                }))
              "
              @blur="handleRolesBlur"
              placeholder="Select role..."
              :searchable="false"
              :select-all="false"
              :show-footer="false"
            />
            <p v-if="rolesErrorMessage" class="text-xs text-red-500 mt-1">
              {{ rolesErrorMessage }}
            </p>
          </div>

          <div ref="formRef" />
          <AlartMessage :errors="serverErrors" />
      </div>

    <div
      class="bg-gray-50 w-full  absolute bottom-0 p-3 gap-3 flex border-t-[1px] justify-end"
    >
      <!-- <Button
        @click="onClose"
        type="button"
        class="btn !bg-white !text-black"
        variant="outline"
      >
        <span v-if="loading">Closing...</span>
        <span v-else>CLOSE</span>
      </Button> -->
      <Button type="submit" :disabled="loading" class="btn">
        <span v-if="loading">
          {{ props.userToEdit ? "Updating..." : "Creating..." }}
        </span>
        <span v-else>{{ isEdit ? 'Update' :'Submit' }}</span>
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/multiselect/MultiSelect.vue";
import { parseBackendError } from "@/lib/utils";
import { clientUserService } from "@/services/client/client-user-service";
import AlartMessage from "@/shared/components/AlartMessage.vue";
import { useRoleStore } from "@/store/common/role-permission-store";

import { PersonStanding, User2 } from "lucide-vue-next";
import { ErrorMessage, Field, Form, useField, useForm } from "vee-validate";
import { computed, nextTick, ref, watch } from "vue";
import * as yup from "yup";

const props = defineProps<{
  userToEdit?: any | null;
  isEdit: boolean;
}>();
const emit = defineEmits<{ (e: "close"): void; (e: "created"): void }>();
const roleStore = useRoleStore();

const loading = ref(false);
const serverErrors = ref<Record<string, string[]>>({});
const schema = computed(() => {
  const base = {
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    roles: yup.array().of(yup.number()).min(1, "Select at least one role"),
        password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  };

  if (props.userToEdit) {
    return yup.object({
      ...base,
      password: yup.string().min(6, "Minimum 6 characters").notRequired(),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .when("password", {
          is: (val: string) => !!val,
          then: (schema) => schema.required("Confirm password is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
    });
  }

  return yup.object({
    ...base,
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
});

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  roles: [] as string[],
};

const formValues = ref({ ...defaultValues });

const { resetForm , setErrors, handleSubmit  } =
  useForm({
    
    initialValues: formValues.value,

  });

const {
  value: roles,
  errorMessage: rolesErrorMessage,
  handleChange: handleRolesChange,
  handleBlur: handleRolesBlur,
  setErrors: setRoleErrorMessage,
} = useField<number[]>("roles");




watch(
  () => props.userToEdit,
  (user) => {
    if (user) {
      console.log(user);

      formValues.value = {
        name: user.name,
        email: user.email,
        phone: user.phone ?? "",
        password: "",
        password_confirmation: "",
        roles: user.roles?.map((r: any) => r.id) ?? [],
      };
    } else {
      formValues.value = { ...defaultValues };
    }

    resetForm({ values: formValues.value });

  },
  { immediate: true }
);

const onClose = () => {
  formValues.value = { ...defaultValues };
  resetForm({ values: formValues.value });
  roles.value = [];
  serverErrors.value = {};
  emit("close");
};



const onSubmit = async (values, { resetForm: postSubmitReset }) => {

  console.log('call');
  
  if (!roles.value.length) {
    setRoleErrorMessage("Select at least one role");
    return;
  }
  loading.value = true;

  try {
    if (props.isEdit) {
      await clientUserService.update(props.userToEdit.id, {
        name: values.name,
        email:values.email,
        phone:values.phone,
        roles:roles.value.map((v)=>v)
      });
    } else {
      await clientUserService.create({
        ...values,
           roles:roles.value.map((v)=>v)
      });
    }
    emit("created");
    emit("close");
    formValues.value = { ...defaultValues };
    postSubmitReset({ values: formValues.value });
  } catch (err: any) {
    const parsed = parseBackendError(err);
    setErrors(parsed.errors);
    serverErrors.value = parsed.errors;
    nextTick(() =>
      document.querySelector(".mx-h-[100vh-60px]")?.scrollIntoView()
    );
  } finally {
    loading.value = false;
  }
};
</script>
