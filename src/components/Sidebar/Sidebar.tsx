"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { primaryLinks, sidebarSections } from "@/constants/sidebarLinks";
import styles from "./Sidebar.module.scss";
import { useSidebar } from "@/contexts/SidebarContext";
import { IoClose } from "react-icons/io5";
import { clearAllUsers } from "@/lib/indexedDB";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const logout = async () => {
    document.cookie = "auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    await clearAllUsers();
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <nav
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : ""
        } hide-scroll-bar`}
        aria-label="Main navigation"
      >
        {/* Mobile Close Button */}
        <button
          className={styles.closeBtn}
          onClick={closeSidebar}
          aria-label="Close sidebar"
          type="button"
        >
          <IoClose aria-hidden="true" />
        </button>
        {/* First two links */}
        {primaryLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={`${styles["nav-link"]} ${
                isActive ? styles["active-1"] : ""
              } ${styles["top-side"]}`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.icon && (
                <Image src={link.icon} alt="icon" width={16} height={16} />
              )}
              <span>{link.label}</span>
              {link.endIcon && (
                <span className={styles["end-icon"]}>{link.endIcon}</span>
              )}
            </Link>
          );
        })}

        {/* Sections */}
        {sidebarSections.map((section) => (
          <section
            key={section.title}
            aria-label={`${section.title} navigation`}
          >
            <h4 className={styles["links-header"]}>{section.title}</h4>
            <ul>
              {section.links.map((link, index) => {
                const isActive = pathname === link.href;
                const isLogout = link.label.toLowerCase() === "logout";
                return (
                  <li key={index} className={styles["link-li"]}>
                    {isLogout ? (
                      <div onClick={logout} className={styles["nav-link"]}>
                        {link.icon && (
                          <Image
                            src={link.icon}
                            alt="icon"
                            width={16}
                            height={16}
                          />
                        )}
                        <span>{link.label}</span>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`${styles["nav-link"]} ${
                          isActive ? styles["active-1"] : ""
                        }`}
                      >
                        {link.icon && (
                          <Image
                            src={link.icon}
                            alt="icon"
                            width={16}
                            height={16}
                          />
                        )}
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </>
  );
}
