export function Footer() {
  return (
    <footer className="mt-auto w-full bg-slate-800 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-sm sm:flex-row">
        <span>&copy; {new Date().getFullYear()} Gerenciador de Ordens</span>
      </div>
    </footer>
  );
}
