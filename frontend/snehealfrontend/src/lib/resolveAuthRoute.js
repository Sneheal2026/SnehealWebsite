/**
 * Post-login destination for the doctor portal.
 * @param {{ role?: string|null, profileCompleted?: boolean }|null} user
 * @param {boolean} isAuthenticated
 */
export function resolveAuthRoute(user, isAuthenticated) {
  if (!isAuthenticated) {
    return '/doctor/login';
  }
  if (!user || user.role !== 'doctor') {
    return '/doctor/unauthorized';
  }
  if (!user.profileCompleted) {
    return '/doctor/register';
  }
  return '/doctor/dashboard';
}
