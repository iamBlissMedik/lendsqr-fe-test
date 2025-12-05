"use client";

import { FaBars, FaCaretDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { LiaBellSolid } from "react-icons/lia";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Mobile toggle */}
        <i className={styles.mobileToggle}>
          <FaBars />
        </i>

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={30}
          loading="eager"
        />

        {/* Search box */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search for anything" />
          <div className={styles.searchIcon}>
            <IoSearch />
          </div>
        </div>

        {/* Right section */}
        <div className={styles.rightNav}>
          <Link href={"/users"} className={styles.docsLink}>
            Docs
          </Link>

          <LiaBellSolid className={styles.bell} />

          <Image
            src="/avatar.png"
            alt="user"
            width={48}
            height={48}
            className={styles.userPic}
          />

          <p className={styles.username}>
            Adedeji <FaCaretDown />
          </p>
        </div>
      </nav>
    </header>
  );
}
