// Root layout — redirects to /[lang]/ via middleware
// Actual layout is in /[lang]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
