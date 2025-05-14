import { InterfaceLabels } from '@/host-constants';

interface Codes {
  message: string;
  status: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500;
}
export const ERROR_CODES: Record<string, Codes> = {
  any: { message: InterfaceLabels.SOMETHING_WENT_WRONG, status: 500 },
  403: { message: InterfaceLabels.ACCESS_DENIED, status: 403 },
  404: { message: InterfaceLabels.PAGE_NOT_FOUND, status: 404 },
  500: { message: InterfaceLabels.INTERNAL_SERVER_ERROR, status: 500 },
};
