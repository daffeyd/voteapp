"use client";

import styles from "./reset.module.css";
import { confirmpassword } from "@/lib/action";
import { useFormState } from "react-dom";
import { authInfo } from "@/lib/model";

export default function ResetpasswordForm() {
  const initialState: authInfo = { message: null, errors: {} };

  const [state, formAction] = useFormState(confirmpassword, initialState);
  return (
    <form className={styles.form} action={formAction}>
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
      <button type="submit">Reset Password</button>
      {state.errors?.repassword &&
        state.errors.repassword.map((error: string) => (
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
