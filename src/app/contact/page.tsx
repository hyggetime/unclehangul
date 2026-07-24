import type { Metadata } from "next";
import Link from "next/link";
import { getContactMetadata } from "@/lib/contact/metadata";

const INSTAGRAM_URL = "https://www.instagram.com/uncle_hangul/";
const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UC0Rtx0qDJhDqet5xWVMslfg";
const CONTACT_EMAIL = "unclehangul@gmail.com";

export const metadata: Metadata = getContactMetadata();

export default function ContactPage() {
  return (
    <div className="md:col-span-12">
      <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
        <div className="flex h-10 items-center justify-between border-b-[0.5px] border-[#D9D9D3] px-1">
          <p className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45">
            Contact
          </p>
          <Link
            href="/"
            className="font-en text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-[#FF4B3E]"
          >
            Home ↗
          </Link>
        </div>

        <article className="mx-auto max-w-2xl border-b-[0.5px] border-[#D9D9D3] px-1 py-10 md:py-12">
          <h1 className="font-en text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl">
            Say Hello to Uncle Han-guel!
          </h1>

          <div className="font-en mt-8 space-y-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            <p>
              Have a question about Korean cultural contexts? Or maybe you want
              to suggest the next vocabulary pair for me to cover? Feel free to
              reach out. I&apos;m always open to interesting conversations.
            </p>
          </div>

          <ul className="font-en mt-8 space-y-4 border-t-[0.5px] border-[#D9D9D3] pt-8 text-sm leading-relaxed text-foreground/75 md:text-base">
            <li>
              <span className="font-bold text-foreground">Email</span>
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <span className="font-bold text-foreground">Socials</span>
              <br />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                Instagram · @uncle_hangul
              </a>
              <span className="text-foreground/40"> / </span>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[0.5px] underline-offset-4 transition-colors hover:text-[#FF4B3E]"
              >
                YouTube ↗
              </a>
            </li>
          </ul>

          <p className="font-en mt-8 text-xs leading-relaxed text-foreground/50 md:text-sm">
            Note: I read every single message, but as a busy designer and
            creator, it might take a moment for me to reply. Thanks for
            understanding!
          </p>
        </article>
      </div>
    </div>
  );
}
