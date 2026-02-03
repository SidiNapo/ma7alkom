import { useState } from "react";
import { Flavor, FlavorSelection } from "@/types/product";
import { Plus, Minus, Sparkles } from "lucide-react";

interface FlavorSelectorProps {
  flavors: Flavor[];
  onChange: (selections: FlavorSelection[], total: number) => void;
  unitName?: string;
}

const FlavorSelector = ({ flavors, onChange, unitName = "unité" }: FlavorSelectorProps) => {
  const [selections, setSelections] = useState<Record<string, number>>({});

  const updateQuantity = (flavorId: string, delta: number) => {
    const newSelections = { ...selections };
    const currentQty = newSelections[flavorId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    if (newQty === 0) {
      delete newSelections[flavorId];
    } else {
      newSelections[flavorId] = newQty;
    }
    
    setSelections(newSelections);
    
    // Convert to FlavorSelection array and calculate total
    const selectionsArray: FlavorSelection[] = Object.entries(newSelections).map(([flavorId, quantity]) => ({
      flavorId,
      quantity
    }));
    const total = Object.values(newSelections).reduce((sum, qty) => sum + qty, 0);
    
    onChange(selectionsArray, total);
  };

  const totalSelected = Object.values(selections).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-display text-base sm:text-lg text-foreground flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          Choisissez vos saveurs
        </h3>
        <span className="text-xs sm:text-sm text-primary font-medium px-2.5 py-1 bg-primary/10 rounded-full">
          {totalSelected} {unitName}{totalSelected > 1 ? 's' : ''}
        </span>
      </div>
      
      {/* Flavor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {flavors.map((flavor) => {
          const qty = selections[flavor.id] || 0;
          const isSelected = qty > 0;
          
          return (
            <div
              key={flavor.id}
              className={`
                relative rounded-xl border p-2.5 sm:p-3 transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 bg-card/50 hover:border-primary/40'
                }
              `}
            >
              {/* Flavor info row */}
              <div className="flex items-center gap-1.5 mb-2">
                <span 
                  className="text-lg sm:text-xl w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${flavor.color}15` }}
                >
                  {flavor.emoji}
                </span>
                <span className="font-medium text-foreground text-xs sm:text-sm truncate">
                  {flavor.name}
                </span>
              </div>
              
              {/* Quantity controls */}
              <div className="flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(flavor.id, -1)}
                  disabled={qty === 0}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors
                    ${qty > 0 
                      ? 'bg-secondary hover:bg-destructive/20 text-foreground' 
                      : 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
                    }
                  `}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                
                <span 
                  className={`
                    text-base sm:text-lg font-display min-w-[1.5rem] text-center
                    ${isSelected ? 'text-primary font-bold' : 'text-muted-foreground'}
                  `}
                >
                  {qty}
                </span>
                
                <button
                  type="button"
                  onClick={() => updateQuantity(flavor.id, 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Selection badge */}
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-md">
                  {qty}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Empty state */}
      {totalSelected === 0 && (
        <p className="text-center text-xs text-muted-foreground py-1">
          Sélectionnez au moins une {unitName}
        </p>
      )}
    </div>
  );
};

export default FlavorSelector;
