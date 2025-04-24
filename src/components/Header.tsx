import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="w-full bg-slate-800 px-4 py-3 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: App Title */}
        <h1 className="text-xl font-semibold">Gerenciador de Ordens</h1>

        {/* Right: Buttons */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className={cn('bg-slate-700 text-white hover:bg-slate-600')}
          >
            Home
          </Button>
          <Button className="bg-white text-slate-800 hover:bg-slate-100">
            Nova ordem
          </Button>
        </div>
      </div>
    </header>
  );
}
