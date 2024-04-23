"use client";

import styles from "./loginForm.module.css";
import { useState } from "react";
import { login, signup } from "@/lib/action";
import { useFormState } from "react-dom";
import { authInfo } from "@/lib/model";

export default function LoginForm () {
  const initialState:authInfo = { message: null , errors: {} };

  const [state, formAction] = useFormState(login, initialState);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Email" name="email" id="email" />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <button type="submit">Login</button>
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
};
