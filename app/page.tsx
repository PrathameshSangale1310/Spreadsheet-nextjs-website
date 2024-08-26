// pages/index.tsx
'use client'
import React, { useState, useCallback, useEffect } from 'react';
import Spreadsheet from './components/spreadsheet'; // Adjust the import path if needed
import Navbar from './components/Navbar'; // Adjust the import path if needed

const PAGE_SIZE = 20; // Number of rows per page
const initialRows = 20; // Initial rows
const initialColumns = 10; // Default initial columns

export default function Home() {
  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('spreadsheetData');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return Array.from({ length: initialRows }, () => Array(initialColumns).fill(''));
    }
  };

  const [data, setData] = useState<string[][]>(loadDataFromLocalStorage);
  const [undoStack, setUndoStack] = useState<string[][][]>([]);
  const [redoStack, setRedoStack] = useState<string[][][]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    localStorage.setItem('spreadsheetData', JSON.stringify(data));
  }, [data]);

  const handleCellChange = (row: number, col: number, value: string) => {
    setUndoStack([...undoStack, JSON.parse(JSON.stringify(data))]);
    setRedoStack([]); // Clear redo stack on new change

    const newData = data.map((rowData, rowIndex) =>
      rowData.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setData(newData);
  };


  const undo = () => {
    if (undoStack.length > 0) {
      const previousData = undoStack[undoStack.length - 1];
      setRedoStack([data, ...redoStack]);
      setData(previousData);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextData = redoStack[0];
      setUndoStack([...undoStack, data]);
      setData(nextData);
      setRedoStack(redoStack.slice(1));
    }
  };

  const handleScroll = useCallback((event: React.UIEvent<HTMLElement>) => {
    const element = event.currentTarget;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10) {
      if (hasMoreData) {
        const newRows = Array.from({ length: PAGE_SIZE }, () => Array(initialColumns).fill(''));
        setData((prevData) => [...prevData, ...newRows]);
      }
    }
  }, [hasMoreData]);

  useEffect(() => {
    const storedData = loadDataFromLocalStorage();
    setData(storedData);
  }, []);

  return (
    <>
      <Navbar undo={undo} redo={redo} />
      <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Spreadsheet
          data={data}
          onCellChange={handleCellChange}
          onScroll={handleScroll}
        />
      </main>
    </>
  );
}
