

export const ClientPermissionServiceConstant = {
  // Client Users
  CLIENT_USER_ACCESS: 'access_client_user',
  CLIENT_USER_CREATE: 'create_client_user',
  CLIENT_USER_VIEW: 'view_client_user',
  CLIENT_USER_UPDATE: 'update_client_user',
  CLIENT_USER_DELETE: 'delete_client_user',

  // Client Roles
  CLIENT_ROLE_ACCESS: 'access_client_role',
  CLIENT_ROLE_CREATE: 'create_client_role',
  CLIENT_ROLE_VIEW: 'view_client_role',
  CLIENT_ROLE_UPDATE: 'update_client_role',
  CLIENT_ROLE_DELETE: 'delete_client_role',
} as const;

// Optional: For typing all possible values as a union type
export type ClientPermission = typeof ClientPermissionServiceConstant[keyof typeof ClientPermissionServiceConstant];
