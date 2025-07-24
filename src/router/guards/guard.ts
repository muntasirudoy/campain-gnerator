import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../../store/client/client-auth-store';


export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const auth = useAuthStore();

  const isPublic = to.meta.public === true;
  const requiresAuth = to.meta.requiresAuth === true;
  const allowedRoles = to.meta.roles as string[] | undefined;


  

  if (requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login' });
  }

  if (isPublic && auth.isAuthenticated) {
    return next({ name: 'Overview' });
  }

  // if (requiresAuth && allowedRoles && !allowedRoles.includes(auth.userRole)) {
  //   return next({ name: 'Forbidden' }); 
  // }
  return next();
}