// src/components/sections/Resume.tsx
import Section from "@/components/ui/Section";

export default function ResumeSection() {
  return (
    <Section id="resume" title="Resume">
      <div className="mt-4 flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground/90">
            Download my resume (PDF). Contains work history, selected projects, and contact info.
          </p>

          <ul className="mt-3 text-xs text-muted-foreground">
            <li>• Format: PDF</li>
            <li>• Size: ~ <span id="resume-size">checking...</span> (we recommend ≤ 300 KB)</li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="YourName_Resume.pdf"
            className="btn-accent inline-block px-4 py-2 rounded"
            aria-label="Download resume PDF"
            target="_blank"
            rel="noopener"
          >
            Download Resume
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="px-4 py-2 rounded border text-sm"
            aria-label="Open resume in new tab"
          >
            Open in tab
          </a>
        </div>
      </div>
    </Section>
  );
}
