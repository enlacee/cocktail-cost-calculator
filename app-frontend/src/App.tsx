import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Info } from 'lucide-react';

interface Ingredient {
  name: string;
  totalVolume: number;
  price: number;
  recipeAmount: number;
  recipeCost: number;
}

const CURRENCIES = [
  { code: 'PEN', symbol: 'S/', name: 'Sol Peruano' },
  { code: 'USD', symbol: '$', name: 'Dólar Americano' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

const COMMON_MEASURES = [
  { oz: 0.25, ml: 7.5, description: '1/4 oz - Dash/Golpe' },
  { oz: 0.5, ml: 15, description: '1/2 oz - Media medida' },
  { oz: 1, ml: 30, description: '1 oz - Una medida' },
  { oz: 1.5, ml: 45, description: '1.5 oz - Medida y media' },
  { oz: 2, ml: 60, description: '2 oz - Medida doble (estándar para destilados)' },
  { oz: 3, ml: 90, description: '3 oz - Triple medida' },
  { oz: 4, ml: 120, description: '4 oz - Cuádruple (común para mixers)' },
];

function App() {
  const [cocktailName, setCocktailName] = useState('Nuevo Coctel');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', totalVolume: 750, price: 0, recipeAmount: 2, recipeCost: 0 },
  ]);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [profit, setProfit] = useState(30);
  const [showMeasuresGuide, setShowMeasuresGuide] = useState(false);

  const addIngredient = () => {
    setIngredients([...ingredients, { 
      name: '', 
      totalVolume: 750, 
      price: 0, 
      recipeAmount: 2,
      recipeCost: 0
    }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...ingredients];
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: field === 'name' ? value : numValue
    };

    // Calculate recipeCost using the rule of three
    if (field !== 'recipeCost') {
      const ing = newIngredients[index];
      const ozToMl = ing.recipeAmount * 30; // Convert oz to ml (1 oz = 30 ml)
      newIngredients[index].recipeCost = (ozToMl * ing.price) / ing.totalVolume;
    }

    setIngredients(newIngredients);
  };

  const calculateTotalCost = () => {
    return ingredients.reduce((total, ing) => total + ing.recipeCost, 0);
  };

  const calculateFinalPrice = () => {
    const cost = calculateTotalCost();
    return cost + (cost * (profit / 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Calculadora Universal de Costos de Cocteles</h1>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nombre del Coctel</label>
              <input
                type="text"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Nombre del coctel"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Moneda</label>
              <select
                value={currency.code}
                onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.name} ({c.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Ingredientes</h2>
                <button
                  onClick={() => setShowMeasuresGuide(!showMeasuresGuide)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Ver guía de medidas"
                >
                  <Info size={20} />
                </button>
              </div>
              <button
                onClick={addIngredient}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Agregar Ingrediente
              </button>
            </div>

            {showMeasuresGuide && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Guía de Medidas Comunes en Coctelería</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {COMMON_MEASURES.map((measure, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{measure.description}</span>
                      <span className="text-gray-600"> ({measure.ml} ml)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center font-semibold text-sm text-gray-600 pb-2 border-b">
                <div className="col-span-3">Producto</div>
                <div className="col-span-2">ML (Botella)</div>
                <div className="col-span-2">Precio</div>
                <div className="col-span-2">Receta (oz)</div>
                <div className="col-span-2">Costo</div>
                <div className="col-span-1"></div>
              </div>
              {ingredients.map((ing, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={ing.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      placeholder="Nombre del producto"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={ing.totalVolume}
                      onChange={(e) => updateIngredient(index, 'totalVolume', e.target.value)}
                      placeholder="ML total"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                      min="0"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <input
                        type="number"
                        value={ing.price}
                        onChange={(e) => updateIngredient(index, 'price', e.target.value)}
                        placeholder="Precio"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                        min="0"
                        step="0.01"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">{currency.symbol}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <select
                      value={ing.recipeAmount}
                      onChange={(e) => updateIngredient(index, 'recipeAmount', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                    >
                      {COMMON_MEASURES.map((measure, i) => (
                        <option key={i} value={measure.oz}>
                          {measure.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <input
                        type="number"
                        value={ing.recipeCost.toFixed(2)}
                        readOnly
                        className="w-full p-2 bg-gray-100 border rounded outline-none"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">{currency.symbol}</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={ingredients.length === 1}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Porcentaje de Ganancia (%)</label>
              <input
                type="number"
                value={profit}
                onChange={(e) => setProfit(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 outline-none"
                min="0"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Costo Total de {cocktailName}:</span>
              <span className="text-lg">{currency.symbol}{calculateTotalCost().toFixed(2)} {currency.code}</span>
            </div>
            <div className="flex justify-between items-center text-blue-700">
              <span className="font-medium">Precio de Venta Sugerido:</span>
              <span className="text-xl font-bold">{currency.symbol}{calculateFinalPrice().toFixed(2)} {currency.code}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;