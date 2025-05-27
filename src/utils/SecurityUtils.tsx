import { useHasRole } from '@/hook/useHasRole';
import { useToken } from '@/hook/useToken';

export const hasAccess = (path: string): boolean => {
  const { isAuthenticated } = useToken();
  const { isManager } = useHasRole();

  switch (path) {
    case 'profile':
      return isAuthenticated;
    case 'managerPanel':
      return isManager;
    default:
      return false;
  }
};

export const getDefaultPath = (): string => {
  return process.env.REACT_APP_DEFAULT_ROUTE_PATH || '/gym';
};
