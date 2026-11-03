import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-tr rounded-2xl flex items-center justify-center shadow-md text-white text-xl">
        🐾
      </div>
      <div>
        <span className="font-black text-xl text-slate-900 tracking-tight block">VetCare<span className="text-blue-600">Pro</span></span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block -mt-1">Veterinary System</span>
      </div>
    </div>
  );
};