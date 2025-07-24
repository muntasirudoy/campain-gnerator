export default [
  
  {
    path: '/auth/client/login',
    name: 'Login',
    meta: { public: true },
    component: () => import('../../views/auth/auth.client/login/Login.vue'),
  },
  {
    path: '/auth/client/signup',
    name: 'Signup',
    meta: { public: true },
    component: () => import('../../views/auth/auth.client/signup/Signup.vue'),
  },
    {
    path: '/forgot-password',
    name: 'ForgotPassword',
    meta: { public: true },
    component: () => import('../../views/auth/components/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    meta: { public: true },
    component: () => import('../../views/auth/components/ResetPassword.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { public: true },
    component: () => import('../../shared/components/NotFound.vue'),
  },
  
];


