"use client";

import styles from "./signupForm.module.css";
import { login, signup } from "@/lib/action";
import { useFormState } from "react-dom";
import { authInfo } from "@/lib/model";

export default function SignupForm() {
  const initialState: authInfo = { message: null, errors: {} };

  const [state, formAction] = useFormState(signup, initialState);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Email" name="email" id="email" />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <input
        type="password"
        placeholder="re-enter password"
        name="re-password"
        id="re-password"
      />
      <button type="submit">Sign Up</button>
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
      {state.errors?.repassword &&
        state.errors.repassword.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      {state.message && (
        <p className="mt-2 text-sm text-red-500" key={state.message}>
          {state.message}
        </p>
      )}
      {/* 
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link> */}
    </form>
  );
}
