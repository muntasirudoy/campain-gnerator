<template>
  <div class="bg-white w-full max-h-[90vh] overflow-hidden flex flex-col">
    <div class="flex items-center justify-between px-3 pb-3 border-b">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ isEditing ? 'Edit Role' : 'Add New Role' }}
      </h2>
    </div>

    <form @submit.prevent="onSubmit" class="p-3 overflow-y-auto max-h-[calc(90vh-160px)] flex-1">
      <div class="mb-6">
        <Label for="roleName" class="block text-sm font-medium text-gray-700 mb-2">Role Name</Label>
        <Input
          v-model="formData.name"
          id="roleName"
          name="name"
          placeholder="Enter role name"
          class="form-input"
        />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <h3 class="text-lg font-medium mb-4">Permissions</h3>
        <div v-for="module in props.modules" :key="module.id" class="mb-4">
          <h4 class="font-semibold text-sm mb-2">{{ module.name }}</h4>
          <div class="grid grid-cols-2 gap-2 pl-2">
            <div
              v-for="permission in module.permissions"
              :key="permission.id"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :id="'perm-' + permission.id"
                v-model="formData.permissions[permission.id]"
                :disabled="!canAssignPermission(permission.id)"
                class="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label :for="'perm-' + permission.id" class="text-sm text-gray-700">
                {{ permission.name }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end space-x-3">
        <Button type="button" @click="close" class="outline rounded-[3px]" variant="outline">
          Cancel
        </Button>
        <Button type="submit" :disabled="isSubmitting" class="btn">
          {{ isEditing ? (isSubmitting ? 'Updating...' : 'Update') : (isSubmitting ? 'Submitting...' : 'Submit') }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import * as yup from 'yup'
import { useRoleStore } from '@/store/common/role-permission-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { PermissionType } from '@/types/permission-type'


const props = defineProps<{
  modules: any[] 
  roleToEdit: null | { id: string | number; name: string; permissions: PermissionType[] }
}>()

const emit = defineEmits(['close', 'submit', 'role-created', 'role-updated'])

const roleStore = useRoleStore()
const isEditing = computed(() => !!props.roleToEdit)

const isSubmitting = ref(false)
const errors = reactive<{ name?: string }>({})

const formData = reactive({
  name: '',
  permissions: {} as Record<number, boolean>,
})

const canAssignPermission = (permId: number) => {
  const canAssign = roleStore.all_permissions.some((mod) =>
    mod.permissions.some((p) => p.id === permId)
  )
  return canAssign
}

const resetForm = () => {
  formData.name = props.roleToEdit?.name ?? ''
  formData.permissions = {}

  const allowedPermissionIds = roleStore.all_permissions
    .flatMap((module) => module.permissions.map((p) => p.id))

const rolePermissionIds = props.roleToEdit?.permissions ?? []


  props.modules.forEach((module) => {
    module.permissions.forEach((perm) => {
      const isAllowed = allowedPermissionIds.includes(perm.id)
      const isAssigned = rolePermissionIds.includes(perm.id)
      formData.permissions[perm.id] = isAllowed && isAssigned
    })
  })
}




const schema = yup.object({
  name: yup.string().required('Role name is required').min(2).max(50),
  permissions: yup.object(
    props.modules.reduce((acc, module) => {
      module.permissions.forEach((perm) => {
        acc[perm.id] = yup.boolean()
      })
      return acc
    }, {} as Record<number, yup.BooleanSchema>)
  ),
})

watch(() => props.roleToEdit, () => resetForm(), { immediate: true })

const close = () => {
  emit('close')
}

const onSubmit = async () => {
  isSubmitting.value = true
  errors.name = undefined

  try {
    const validated = await schema.validate(formData, { abortEarly: false })

    const selectedPermissions = Object.entries(validated.permissions)
      .filter(([, checked]) => checked)
      .map(([id]) => parseInt(id))

    const payload = {
      name: validated.name.trim(),
      permissions: selectedPermissions,
    }

    if (isEditing.value && props.roleToEdit) {
      await roleStore.updateRole({ id: props.roleToEdit.id, ...payload })
      emit('role-updated', { id: props.roleToEdit.id, ...payload })
    } else {
      const newRole = await roleStore.addRole(payload)
      emit('role-created', newRole)
    }

    emit('submit', payload)
    close()
  } catch (error: any) {
    if (error.inner) {
      for (const err of error.inner) {
        if (err.path === 'name') errors.name = err.message
      }
    } else {
      console.error('Validation or submission failed:', error)
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
