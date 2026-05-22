export type ActiveView = 'overview' | 'users' | 'settings' | 'employees';

export interface AdminUser {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  math_challenge_enabled: boolean;
  phone_alias_enabled: boolean;
}

export interface EmployeeRecord {
  id?: string;
  created_at?: string;
  employer_code?: string;
  for_the_month_of: string;
  year_of_contribution: number;
  staff_id?: string;
  rsa_pin: string;
  name_of_employee: string;
  normal_contribution_for_employee?: number;
  normal_contribution_for_employer?: number;
  voluntary_contribution_by_employee?: number;
  voluntary_contribution_by_employer?: number;
  other_contribution?: number;
  total_amount: number;
  pfa_code: string;
}

export interface PublicLink {
  label: string;
  href: string;
  icon: React.ElementType;
}
