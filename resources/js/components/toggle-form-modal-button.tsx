import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Props {
    buttonLabel?: string;
    buttonClassName?: string;
    FormComponent: React.FC<{ onClose: () => void; className?: string }>;
}

export default function ToggleFormModalButton({ buttonLabel, buttonClassName, FormComponent }: Props) {
    const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <Button variant="default" className={`${buttonClassName} hover:cursor-pointer`} onClick={() => setShowForm(true)}>
          <Plus /> {buttonLabel}
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-auto w-full max-w-lg p-4">
            <div className="relative rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close form"
              >
                ✕
              </button>
              <FormComponent onClose={() => setShowForm(false)} className="w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
