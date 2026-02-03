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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Choisissez vos saveurs
        </h3>
        <div className="text-sm text-muted-foreground">
          {totalSelected} {unitName}{totalSelected > 1 ? 's' : ''} sélectionnée{totalSelected > 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {flavors.map((flavor) => {
          const qty = selections[flavor.id] || 0;
          const isSelected = qty > 0;
          
          return (
            <div
              key={flavor.id}
              className={`
                relative rounded-2xl border-2 p-4 transition-all duration-300
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-gold' 
                  : 'border-border/50 bg-secondary/50 hover:border-primary/50'
                }
              `}
            >
              {/* Flavor badge */}
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${flavor.color}20` }}
                >
                  {flavor.emoji}
                </span>
                <span className="font-medium text-foreground text-sm">
                  {flavor.name}
                </span>
              </div>
              
              {/* Quantity controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(flavor.id, -1)}
                  disabled={qty === 0}
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                    ${qty > 0 
                      ? 'bg-secondary hover:bg-destructive/20 text-foreground hover:text-destructive' 
                      : 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span 
                  className={`
                    text-xl font-display min-w-[2rem] text-center transition-all duration-200
                    ${isSelected ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {qty}
                </span>
                
                <button
                  type="button"
                  onClick={() => updateQuantity(flavor.id, 1)}
                  className="w-9 h-9 rounded-xl bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg"
                >
                  {qty}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {totalSelected === 0 && (
        <p className="text-center text-sm text-muted-foreground py-2">
          Sélectionnez au moins une {unitName} pour continuer
        </p>
      )}
    </div>
  );
};

export default FlavorSelector;
