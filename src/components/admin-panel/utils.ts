import { Person } from '../profile/type/Person';

export const dataMapper = (items: Person[]) =>
  items.map((el) => ({
    ...el,
    fullName: `${el?.firstName || ''} ${el?.middleName || ''} ${el?.lastName || ''}`.trim(),
  }));
