"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";
import { Magnetic } from "@/components/ui/magnetic";

type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "sent" }
  | { type: "error"; message: string };

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };
const FIELD_ORDER: ContactField[] = ["name", "email", "subject", "message"];

const FAILURE_COPY: Record<string, string> = {
  not_configured: "The form isn't connected right now, so nothing was sent.",
  delivery_failed: "The message couldn't be delivered, so nothing was sent.",
};

export function ContactForm() {
  const [data, setData] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as ContactField;
    setData((d) => ({ ...d, [field]: e.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[field]) setErrors((x) => ({ ...x, [field]: undefined }));
  };

  const focusFirstError = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors: clientErrors } = validateContact(data);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus({ type: "idle" });
      focusFirstError(clientErrors);
      return;
    }

    setStatus({ type: "sending" });
    const honeypot = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus({ type: "idle" });
        focusFirstError(json.errors);
        return;
      }
      if (!res.ok) throw new Error(json.error ?? "delivery_failed");

      setStatus({ type: "sent" });
      setData(EMPTY);
    } catch (err) {
      const key = err instanceof Error ? err.message : "";
      setStatus({
        type: "error",
        message: FAILURE_COPY[key] ?? "Something went wrong, so nothing was sent.",
      });
    }
  };

  const sending = status.type === "sending";

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-8">
      {/* Honeypot — hidden from people and assistive tech, filled by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <Field label="01 — Name" name="name" value={data.name} error={errors.name}
          onChange={update} placeholder="Your name" autoComplete="name" />
        <Field label="02 — Email" name="email" type="email" value={data.email} error={errors.email}
          onChange={update} placeholder="you@domain.com" autoComplete="email" />
      </div>
      <Field label="03 — Subject" name="subject" value={data.subject} error={errors.subject}
        onChange={update} placeholder="What's this about" />
      <Field label="04 — Brief" name="message" value={data.message} error={errors.message}
        onChange={update} placeholder="Tell me about the work" textarea />

      <div role="status" aria-live="polite" className="min-h-6">
        {status.type === "sent" && (
          <p className="label-mono accent-text">
            Sent. I reply within 48 hours.
          </p>
        )}
        {status.type === "error" && (
          <p className="label-mono text-[var(--danger)]">
            {status.message} Email me directly at{" "}
            <a href={`mailto:${siteConfig.email}`} className="link-edit">
              {siteConfig.email}
            </a>
            .
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
        <p className="label-mono text-[var(--muted-foreground)]">
          ※ I reply within 48 hours
        </p>
        <Magnetic strength={0.25}>
          <button
            type="submit"
            disabled={sending}
            aria-disabled={sending}
            className="btn-magnetic btn-magnetic--primary disabled:opacity-60"
          >
            <span>{sending ? "Sending…" : "Send brief"}</span>
            <span aria-hidden>{sending ? "⟳" : "→"}</span>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  textarea,
  autoComplete,
}: {
  label: string;
  name: ContactField;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required: true,
    maxLength: CONTACT_LIMITS[name],
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className:
      "w-full bg-transparent border-b pb-3 text-xl md:text-2xl font-display focus:outline-none focus-visible:border-[var(--accent)] transition-colors placeholder:text-[var(--muted-foreground)]/70 " +
      (error ? "border-[var(--danger)]" : "border-hairline"),
  };

  return (
    <div className="block group">
      <label htmlFor={id} className="eyebrow block mb-3">
        {label}
      </label>
      {textarea ? (
        <textarea {...shared} rows={6} className={shared.className + " resize-none"} />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p id={errorId} className="mt-2 label-mono text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}
