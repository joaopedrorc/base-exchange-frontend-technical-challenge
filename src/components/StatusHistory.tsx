'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface StatusHistoryProps {
  id: string;
}

export function StatusHistory({ id }: StatusHistoryProps) {
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/status-history?id=${id}`);
      const data = await res.json();

      setHistory(data.history);
      setLoading(false);
    } catch (error) {
      console.log('ERROR', error);

      setLoading(false);
      setShow(false);
    }
  };

  const handleClick = () => {
    if (!show && !history) {
      fetchHistory();
    }
    setShow(!show);
  };

  return (
    <div>
      <Button className="bg-slate-800" onClick={handleClick}>
        {show ? 'Ocultar histórico' : 'Mostrar histórico de status'}
      </Button>

      {show && (
        <div className="mt-2 space-y-1 text-sm text-slate-700">
          {loading && <p>Carregando...</p>}
          {!loading && history?.length === 0 && (
            <p>Nenhum histórico encontrado.</p>
          )}
          {!loading &&
            history?.map((item, idx) => (
              <p key={idx} className="border-l-2 border-slate-300 pl-2">
                • {item}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
