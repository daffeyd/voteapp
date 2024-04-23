
import Link from "next/link";
import styles from "./login.module.css";
import ResetpasswordForm from "@/components/resetpassword/resetpassword";

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ResetpasswordForm />
        <Link href="/signup">Create an account</Link>
        <Link href="/magic">Magic Link</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
