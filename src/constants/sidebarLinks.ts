import { ReactNode, createElement } from "react";
import { FaAngleDown } from "react-icons/fa";

export interface SidebarLink {
  label: string;
  icon?: string; // path to the icon
  href: string;
  endIcon?: ReactNode; // optional icon at the end
}

export interface SidebarSection {
  title: string; // section title
  links: SidebarLink[];
}

export const primaryLinks: SidebarLink[] = [
  {
    label: "Switch Organization",
    icon: "/images/briefcase.svg",
    href: "/", // changed
    endIcon: createElement(FaAngleDown),
  },
  { label: "Dashboard", icon: "/images/home.svg", href: "/" }, // changed
];

export const sidebarSections: SidebarSection[] = [
  {
    title: "CUSTOMERS",
    links: [
      { label: "Users", icon: "/images/user-friends.svg", href: "/users" }, // keep
      { label: "Guarantors", icon: "/images/users.svg", href: "/" },
      { label: "Loans", icon: "/images/sack.svg", href: "/" },
      { label: "Decision Models", icon: "/images/handshake.svg", href: "/" },
      { label: "Savings", icon: "/images/piggy-bank.svg", href: "/" },
      { label: "Loan Requests", icon: "/images/loan.svg", href: "/" },
      { label: "Whitelist", icon: "/images/user-check.svg", href: "/" },
      { label: "Karma", icon: "/images/user-times.svg", href: "/" },
    ],
  },
  {
    title: "BUSINESSES",
    links: [
      { label: "Organization", icon: "/images/briefcase.svg", href: "/" },
      { label: "Loan Products", icon: "/images/loan.svg", href: "/" },
      { label: "Savings Products", icon: "/images/bank.svg", href: "/" },
      { label: "Fees and Charges", icon: "/images/coins-solid.svg", href: "/" },
      { label: "Transactions", icon: "/images/transfer.svg", href: "/" },
      { label: "Services", icon: "/images/galaxy.svg", href: "/" },
      { label: "Service Account", icon: "/images/user-cog.svg", href: "/" },
      { label: "Settlements", icon: "/images/scroll.svg", href: "/" },
      { label: "Reports", icon: "/images/chart-bar.svg", href: "/" },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      { label: "Preferences", icon: "/images/sliders.svg", href: "/" },
      { label: "Fees and Pricing", icon: "/images/percent.svg", href: "/" },
      { label: "Audit Logs", icon: "/images/clipboard.svg", href: "/" },
      { label: "System Messages", icon: "/images/tire.svg", href: "/" },
      { label: "Logout", icon: "/images/sign-out.svg", href: "logout" }, // special
    ],
  },
];
