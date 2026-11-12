import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { Icon, type IconName } from "./Icon";
import { pct } from "../lib/guide";

export type ButtonStyle = "" | "outline" | "gold" | "ghost" | "danger";
const buttonClass = (style: ButtonStyle) => ["button", style].filter(Boolean).join(" ");

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  look?: ButtonStyle;
  icon?: IconName;
}

export function Button({ look = "outline", icon, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(look)} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

export function LinkButton({ to, look = "outline", icon, children }: { to: string; look?: ButtonStyle; icon?: IconName; children: ReactNode }) {
  return (
    <Link className={buttonClass(look)} to={to}>
      {icon && <Icon name={icon} />}
      {children}
    </Link>
  );
}

export function IconButton({ label, icon, className = "icon-button", ...rest }: { label: string; icon: IconName } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={className} aria-label={label} {...rest}>
      <Icon name={icon} />
    </button>
  );
}

export function Chip({ label, value, current, onSelect }: { label: string; value: string; current: string; onSelect: (value: string) => void }) {
  return (
    <button className="chip" type="button" aria-pressed={value === current} onClick={() => onSelect(value)}>
      {label}
    </button>
  );
}

interface SelectProps {
  id: string;
  label: string;
  choices: [key: string | number, label: string][];
  value: string | number;
  onChange: (value: string) => void;
  bare?: boolean;
}

export function SelectField({ id, label, choices, value, onChange, bare = false }: SelectProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className={bare ? "sr-only" : undefined}>{label}</span>
      <select id={id} className="select" value={String(value)} onChange={(event) => onChange(event.target.value)}>
        {choices.map(([key, text]) => (
          <option key={key} value={String(key)}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProgressBar({ done, total, label }: { done: number; total: number; label: string }) {
  const value = pct(done, total);
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export function Breadcrumb({ current, first = "Red Dead Redemption" }: { current: string; first?: string }) {
  return (
    <div className="breadcrumb">
      <Icon name="compass" />
      <span>{first}</span>
      <Icon name="right" />
      <strong>{current}</strong>
    </div>
  );
}

export const Empty = ({ children }: { children: ReactNode }) => <div className="empty">{children}</div>;

export function PageHeading({ title, children, tag: Tag = "header" }: { title: string; children?: ReactNode; tag?: "header" | "div" }) {
  return (
    <Tag className="page-heading">
      <h1>{title}</h1>
      {children}
    </Tag>
  );
}
