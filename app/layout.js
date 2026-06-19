import "./globals.css";

export const metadata = {
  title: "GDScripter",
  description: "the open-source guide to GDScript and Godot.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `:root { --font-size-base: 0.9375rem; --font-weight-base: 400; --h1-size: 2.5rem; --h2-size: 0.875rem; }` }} />
      </head>
      <body className="min-h-full flex flex-col term-regular">{children}</body>
    </html>
  );
}
