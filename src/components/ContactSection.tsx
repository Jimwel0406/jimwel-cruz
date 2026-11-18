import { useState } from "react";
import { Loader2, Send } from "lucide-react";

// Quiet boxes: 1px rule, 4px radius, example placeholder inside. Focus doubles the rule.
const fieldClass =
  "w-full rounded-[4px] border border-black/35 bg-transparent px-4 py-3.5 font-body text-[16px] text-black transition-colors placeholder:text-[#5a5a5a] hover:border-black/60 focus:border-black focus:shadow-[0_0_0_1px_#0a0a0a] focus:outline-none";

const labelClass =
  "mb-2 block font-body text-[16px] font-medium leading-[1.3] text-black";

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
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-6 py-28 text-foreground md:px-12 md:py-32"
    >
      {/* A single sheet of paper, like a letter, centred on the ink ground */}
      <div
        data-reveal
        className="mx-auto w-full max-w-[52rem] rounded-2xl bg-[#f0f0f0] px-6 pb-14 pt-16 text-black md:px-[72px] md:pb-[72px] md:pt-[88px]"
      >
        <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">
          Let&apos;s build{" "}
          <span className="font-playfair italic">something great.</span>
        </h2>

        {status === "success" ? (
          <div className="mt-12 border-t border-black pt-8">
            <p className="font-display text-[20px] tracking-[-0.01em]">
              Thanks — your message is on its way.
            </p>
            <p className="mt-2 font-body text-[16px] leading-relaxed text-[#2b2b2b]">
              I&apos;ll get back to you at the address you left, usually within
              a day.
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
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-project" className={labelClass}>
                Project type
              </label>
              <input
                id="contact-project"
                name="projectType"
                type="text"
                maxLength={120}
                placeholder="Shopify store, web app, other"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                maxLength={5000}
                placeholder="A few lines about the project, the timeline, and anything already in place."
                className={`${fieldClass} min-h-[148px] resize-y`}
              />
            </div>

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

            <p
              role="status"
              aria-live="polite"
              className="min-h-[24px] font-body text-[16px] text-red-700"
            >
              {status === "error" ? error : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
