"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./NotFound.module.scss";
import Image from "next/image";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={174}
          height={36}
          className={styles["logo-img"]}
        />
      </header>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Redirecting to the home page...</p>
      </div>
    </div>
  );
}
