export default function Footer() {
  return (
    <footer className="relative bg-background px-3 py-6 sm:px-6 md:px-12">
      {/* Mobile back to top - fixed at top of footer */}
      <a
        href="#home"
        className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 border border-white/10 bg-[#141414] px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-accent md:hidden"
      >
        &uarr; Top
      </a>

      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Jimwel
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Jimwel0406"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-accent"
            style={{ fontSize: "0.8rem" }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jimwel-cruz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-accent"
            style={{ fontSize: "0.8rem" }}
          >
            LinkedIn
          </a>
          <a
            href="#home"
            className="hidden text-muted-foreground transition-colors hover:text-accent md:inline"
            style={{ fontSize: "0.8rem" }}
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
