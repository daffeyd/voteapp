"use client";

import styles from "./magicForm.module.css";
import { magicLink } from "@/lib/action";
import { useFormState } from "react-dom";
import { authInfo } from "@/lib/model";

export default function MagicForm() {
  const initialState: authInfo = { message: null, errors: {} };

  const [state, formAction] = useFormState(magicLink, initialState);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Email" name="email" id="email" />
      <button type="submit">Login</button>
      {state.message && (
        <p className="mt-2 text-sm text-red-500" key={state.message}>
          {state.message}
        </p>
      )}
      {state.errors?.email &&
        state.errors.email.map((error: string) => (
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
