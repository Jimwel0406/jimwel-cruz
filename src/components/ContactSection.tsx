import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const fieldClass =
  "w-full rounded-[4px] border border-black/10 bg-black/[0.04] px-6 py-4 font-body text-[16px] text-black transition-colors placeholder:text-black/40 hover:border-black/20 focus:border-black/45 focus:outline-none";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: true; error?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "Could not send the message.");
      }

      form.reset();
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send the message."
      );
    }
  };

  return (
    <section
      id="contact"
      data-nav-theme="light"
      className="relative overflow-hidden text-black"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="mx-auto w-full max-w-[84rem] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-[1fr_1px_1fr] md:items-center md:gap-16 lg:gap-24">
          {/* Left — heading */}
          <div data-reveal className="w-full">
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              Let&apos;s build{" "}
              <span className="font-playfair italic">
                something great.
              </span>
            </h2>
          </div>

          {/* Hairline divider */}
          <span
            className="hidden w-px shrink-0 self-stretch bg-black/15 md:block"
            aria-hidden="true"
          />

          {/* Right — form */}
          <div data-reveal className="w-full">
            {status === "success" ? (
              <div className="rounded-[4px] border border-black/15 px-6 py-8">
                <p className="font-display text-[20px] tracking-[-0.01em]">
                  Thanks — your message is on its way.
                </p>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-black/65">
                  I&apos;ll get back to you at the address you left, usually
                  within a day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-body text-[14px] underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Name"
                    className={fieldClass}
                  />

                  <label className="sr-only" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="Email"
                    className={fieldClass}
                  />
                </div>

                <label className="sr-only" htmlFor="contact-project">
                  Project type
                </label>
                <input
                  id="contact-project"
                  name="projectType"
                  type="text"
                  maxLength={120}
                  placeholder="Project type"
                  className={fieldClass}
                />

                <label className="sr-only" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="Tell me about the project"
                  className={`${fieldClass} resize-y`}
                />

                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-black bg-black px-6 py-4 font-body text-[16px] font-semibold text-[#f0f0f0] transition-colors hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p
                    role="status"
                    aria-live="polite"
                    className="font-body text-[14px] text-red-700"
                  >
                    {status === "error" ? error : ""}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
