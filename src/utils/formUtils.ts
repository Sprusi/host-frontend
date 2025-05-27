import { Rule } from 'antd/es/form';

import { InterfaceLabels } from '@/host-constants';

import { MessageService } from '@/services/MessageService';

export const getRequiredRule = (required?: boolean): Rule => ({
  required: required ?? true,
  message: InterfaceLabels.REQUIRED_FIELD,
});

export const showError = (e: any) => {
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.join?.('\n') ||
    e?.message ||
    e?.message?.join?.('\n') ||
    String(e);
  MessageService.warn(msg);
};
