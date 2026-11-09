import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/seo";

const fieldClass =
  "w-full rounded-[4px] border border-black/30 bg-transparent px-6 py-4 font-body text-[16px] text-black transition-colors placeholder:text-black/70 hover:border-black/55 focus:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const buttonClass =
  "inline-flex items-center gap-2 self-start rounded-[4px] border border-black bg-black px-6 py-4 font-body text-[16px] font-semibold text-[#f0f0f0] transition-colors hover:bg-transparent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60";

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
    <section id="contact" className="relative overflow-hidden text-black">
      <div className="grid min-[900px]:min-h-[780px] min-[900px]:grid-cols-2">
        {/* Left — ink panel: heading and contact line */}
        <div
          data-reveal="from-left"
          className="flex flex-col justify-between gap-14 bg-background px-6 py-24 text-foreground md:px-14 md:py-28"
        >
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            Let&apos;s build{" "}
            <span className="font-playfair italic">something great.</span>
          </h2>

          <div className="flex flex-col gap-4">
            <p className="font-body text-[20px] leading-[1.5] md:whitespace-nowrap">
              Freelance builds, Shopify stores and full-stack apps.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="self-start font-body text-[18px] underline decoration-1 underline-offset-4 transition-colors hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Right — paper panel: the form */}
        <div
          data-reveal="from-right"
          className="bg-[#f0f0f0] px-6 py-24 text-black md:px-14 md:py-28"
        >
          {status === "success" ? (
            <div className="border border-black/30 px-6 py-8">
              <p className="font-display text-[20px] tracking-[-0.01em]">
                Thanks — your message is on its way.
              </p>
              <p className="mt-2 font-body text-[16px] leading-relaxed">
                I&apos;ll get back to you at the address you left, usually
                within a day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-[2px] font-body text-[16px] underline decoration-black/50 underline-offset-4 transition-colors hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
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

              <button
                type="submit"
                disabled={status === "sending"}
                className={`${buttonClass} mt-2`}
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

              <p role="status" aria-live="polite" className="min-h-[24px] font-body text-[16px] text-red-700">
                {status === "error" ? error : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
