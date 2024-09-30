// helpers.js
export const formatearDinero = (monto) => {
    if (monto === undefined || monto === null) {
      console.error("Invalid amount:", monto);
      return "0 BOB"; // O un valor por defecto que desees mostrar
    }
    
    return `${(monto).toLocaleString('es-BO', { style: 'currency', currency: 'BOB' }).replace('BOB', '')} Bs`; // Reemplaza 'BOB' por el símbolo que prefieras
  };
  