"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryLinks, sidebarSections } from "@/constants/sidebarLinks";
import styles from "./Sidebar.module.scss";
import { useSidebar } from "@/contexts/SidebarContext";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();
const { isSidebarOpen, closeSidebar } = useSidebar();
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
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : ""
        } hide-scroll-bar`}
      >
        {/* Mobile Close Button */}
        <button
          className={styles.closeBtn}
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <IoClose />
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
          <div key={section.title}>
            <h4 className={styles["links-header"]}>{section.title}</h4>
            <ul>
              {section.links.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li key={index} className={styles["link-li"]}>
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
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
    </>
  );
}
