"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Floating WhatsApp contact popover.
 *
 * Hidden by default. Opens only when the WhatsApp icon is clicked. Closes on
 * outside click, Escape, close button, or after choosing an action.
 *
 * Important: this component avoids blocked relay links entirely. It uses the
 * native app protocol and WhatsApp Web only.
 */
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (target && !wrapperRef.current?.contains(target)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(site.phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      {open && (
        <div
          id="whatsapp-contact-panel"
          role="dialog"
          aria-label="WhatsApp contact options"
          className="w-[calc(100vw-3rem)] max-w-72 rounded-3xl border border-line bg-white p-4 text-sm shadow-elevated"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-ink">
                Contact Precision Craft
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Open WhatsApp directly or call the studio.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp contact options"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink-soft transition-colors hover:bg-primary-50 hover:text-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <a
              href={site.whatsappApp}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1FA855] px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Open WhatsApp App
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={site.whatsappWeb}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Open WhatsApp Web
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={site.phoneHref}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Call {site.phone}
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={copyNumber}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mist px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-primary-50 hover:text-primary"
            >
              {copied ? "Number copied" : "Copy WhatsApp number"}
              {copied ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="whatsapp-contact-panel"
        aria-label="Open WhatsApp contact options"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:bg-[#1FA855] hover:shadow-gold"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink opacity-0 shadow-card transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
