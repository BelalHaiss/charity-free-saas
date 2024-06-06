type CRUD_Permissions = 'view' | 'create' | 'edit' | 'delete';
type Pages =
  | 'beneficiary'
  | 'visit'
  | 'benefit'
  | 'donate'
  | 'settings'
  | 'report'
  | 'profile';

export type PermissionsType = Record<Pages, CRUD_Permissions>;
