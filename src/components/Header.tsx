import { Button } from '@/components/ui/button';
import Link from 'next/link';

//TODO: add the link component to '/new-order'

export function Header() {
  return (
    <header className="w-full bg-slate-800 px-4 py-3 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: App Title */}
        <h1 className="text-xl font-semibold">
          <Link href="/"> Gerenciador de Ordens </Link>
        </h1>

        <div className="flex gap-2">
          <Button className="bg-white text-slate-800 hover:bg-slate-100">
            Nova ordem
          </Button>
        </div>
      </div>
    </header>
  );
}
