// components/Cell.tsx
'use client'
import React from 'react';

interface CellProps {
  row: number;
  col: number;
  value: string;
  onChange: (row: number, col: number, value: string) => void;
}

const Cell: React.FC<CellProps> = ({ row, col, value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(row, col, e.target.value)}
      className="border border-gray-300 h-10 w-full text-black bg-white"
      placeholder=""
    />
  );
};

export default Cell;
