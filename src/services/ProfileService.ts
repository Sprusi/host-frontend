import { AxiosResponse } from 'axios';

import { Person } from '@/components/profile/type/Person';

import instance from './axios';

export const getUserById = (id: string): Promise<AxiosResponse<Person>> => {
  return instance.get<Person>(`/users/${id}`);
};

export const getAllUsers = (): Promise<AxiosResponse<Person[]>> => {
  return instance.get<Person[]>(`/users`);
};

export const changeUserById = (id: string, formData: Record<string, string>): Promise<AxiosResponse<void>> => {
  return instance.patch<void>(`users/${id}`, formData);
};
