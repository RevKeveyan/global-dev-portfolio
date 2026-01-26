import { Eye, EyeOff } from 'lucide-react';
import { useHighContrast } from '@/hooks/useHighContrast';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const AccessibilityToggle = () => {
  const { highContrastEnabled, toggleHighContrast } = useHighContrast();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleHighContrast}
            className="w-9 h-9 text-muted-foreground hover:text-foreground focus-ring"
            aria-label={highContrastEnabled ? 'Disable high contrast mode' : 'Enable high contrast mode'}
            aria-pressed={highContrastEnabled}
          >
            {highContrastEnabled ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{highContrastEnabled ? 'Disable' : 'Enable'} high contrast</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
