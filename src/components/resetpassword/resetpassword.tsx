"use client";

import styles from "./resetpassword.module.css";
import { resetpassword } from "@/lib/action";
import { useFormState } from "react-dom";
import { authInfo } from "@/lib/model";

export default function ResetpasswordForm() {
  const initialState: authInfo = { message: null, errors: {} };

  const [state, formAction] = useFormState(resetpassword, initialState);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Email" name="email" id="email" />
      <button type="submit">Reset Password</button>
      {state.errors?.email &&
        state.errors.email.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      {state.errors?.password &&
        state.errors.password.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      {/* 
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link> */}
    </form>
  );
}
