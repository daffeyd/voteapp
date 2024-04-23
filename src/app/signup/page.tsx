
import Link from "next/link";
import styles from "./signup.module.css";
import SignupForm from "@/components/signupForm/signupForm";

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SignupForm />
        <Link href="/login">Login</Link>
        <Link href="/magic">Magic Link</Link>
        <Link href="/resetpassword">Reset Password</Link>
      </div>
    </div>
  );
}
