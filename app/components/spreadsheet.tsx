'use client'
import React from 'react';
import Cell from './cell';

interface SpreadsheetProps {
  data: string[][];
  onCellChange: (row: number, col: number, value: string) => void;
  onScroll: (event: React.UIEvent<HTMLElement>) => void;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ data, onCellChange, onScroll }) => {
  const initialColumns = 10;

  return (
    <div onScroll={onScroll} className="overflow-auto h-screen">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `auto repeat(${initialColumns}, minmax(0, 1fr))`,
        }}
      >
        <div className="p-2 text-xs font-bold text-gray-500 flex items-center justify-center"></div> {/* Empty cell for row numbers */}
        {Array.from({ length: initialColumns }).map((_, colIndex) => (
          <div key={colIndex} className="p-2 text-xs font-bold text-gray-500 flex items-center justify-center">
            {String.fromCharCode(65 + colIndex)}
          </div>
        ))}

        {data.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="p-2 text-xs font-bold text-gray-500 flex items-center justify-center">
              {rowIndex + 1}
            </div>
            {rowData.map((cellValue, colIndex) => (
              <Cell
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                value={cellValue}
                onChange={onCellChange}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Spreadsheet;
