export type UserType = {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  country?: string;
  country_code?: string;
  token: string;
  isAuth: boolean;
  complete_info?: boolean;
  has_permission?: boolean;
};
