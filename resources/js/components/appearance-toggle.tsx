import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppearanceSwitch({ className }: { className?: string }) {
  const { appearance, updateAppearance } = useAppearance();

  const isDark = appearance === 'dark';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Sun className={cn('h-5 w-5 text-yellow-500 transition-opacity', isDark && 'opacity-30')} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) =>
          updateAppearance(checked ? 'dark' : 'light')
        }
      />
      <Moon className={cn('h-5 w-5 text-blue-500 transition-opacity', !isDark && 'opacity-30')} />
    </div>
  );
}

