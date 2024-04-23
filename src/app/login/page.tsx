
import Link from "next/link";
import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/loginForm";

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
        <Link href="/signup">Create an account</Link>
        <Link href="/magic">Magic Link</Link>
        <Link href="/resetpassword">Reset Password</Link>
      </div>
    </div>
  );
}
