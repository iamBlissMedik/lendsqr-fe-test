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

// First two items (Switch Organization & Dashboard) without section
export const primaryLinks: SidebarLink[] = [
  {
    label: "Switch Organization",
    icon: "/images/briefcase.svg",
    href: "/login",
    endIcon: createElement(FaAngleDown),
  },
  { label: "Dashboard", icon: "/images/home.svg", href: "/login" },
];

export const sidebarSections: SidebarSection[] = [
  {
    title: "CUSTOMERS",
    links: [
      { label: "Users", icon: "/images/user-friends.svg", href: "/users" },
      { label: "Guarantors", icon: "/images/users.svg", href: "/login" },
      { label: "Loans", icon: "/images/sack.svg", href: "/login" },
      {
        label: "Decision Models",
        icon: "/images/handshake.svg",
        href: "/login",
      },
      { label: "Savings", icon: "/images/piggy-bank.svg", href: "/login" },
      { label: "Loan Requests", icon: "/images/loan.svg", href: "/login" },
      { label: "Whitelist", icon: "/images/user-check.svg", href: "/login" },
      { label: "Karma", icon: "/images/user-times.svg", href: "/login" },
    ],
  },
  {
    title: "BUSINESSES",
    links: [
      { label: "Organization", icon: "/images/briefcase.svg", href: "/login" },
      { label: "Loan Products", icon: "/images/loan.svg", href: "/login" },
      { label: "Savings Products", icon: "/images/bank.svg", href: "/login" },
      {
        label: "Fees and Charges",
        icon: "/images/coins-solid.svg",
        href: "/login",
      },
      { label: "Transactions", icon: "/images/transfer.svg", href: "/login" },
      { label: "Services", icon: "/images/galaxy.svg", href: "/login" },
      {
        label: "Service Account",
        icon: "/images/user-cog.svg",
        href: "/login",
      },
      { label: "Settlements", icon: "/images/scroll.svg", href: "/login" },
      { label: "Reports", icon: "/images/chart-bar.svg", href: "/login" },
    ],
  },
  {
    title: "SETTINGS",
    links: [
      { label: "Preferences", icon: "/images/sliders.svg", href: "/login" },
      {
        label: "Fees and Pricing",
        icon: "/images/percent.svg",
        href: "/login",
      },
      { label: "Audit Logs", icon: "/images/clipboard.svg", href: "/login" },
      { label: "System Messages", icon: "/images/tire.svg", href: "/login" },
      { label: "Logout", icon: "/images/sign-out.svg", href: "/login" },
    ],
  },
];
