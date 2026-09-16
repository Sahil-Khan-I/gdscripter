import "./globals.css";
import Nav from "../components/Nav";
import ThemeScript from "../components/ThemeScript";

export const metadata = {
  title: "GDScripter — Learn GDScript like a game",
  description:
    "From integers to 3D — flowchart, sprite lab, mini-games, and build tutorials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Nunito:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('gdscripter-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col arcade-bg arcade-dots font-sans text-ink">
        <ThemeScript />
        <Nav />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
