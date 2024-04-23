
import Link from "next/link";
import styles from "./login.module.css";
import MagicForm from "@/components/magicForm/magicForm";

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <MagicForm />
        <Link href="/signup">Create an account</Link>
        <Link href="/login">Login</Link>
        <Link href="/resetpassword">Reset Password</Link>
      </div>
    </div>
  );
}
