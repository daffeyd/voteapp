export type authInfo = {
  errors?: {
    email?: string[];
    password?: string[];
    repassword?: string[];
  };
  message?: string | null;
};
