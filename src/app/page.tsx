"use client";

import React, { useState, useEffect } from 'react';

interface HistoryItem {
  id: number;
  type: 'suku' | 'jumlah';
  a: number;
  b: number;
  n: number;
  result: number;
  formula: string;
  label: string;
}

// Fungsi untuk membaca dari localStorage
const loadHistoryFromLocalStorage = (): HistoryItem[] => {
  if (typeof window !== 'undefined') {
    const savedHistory = localStorage.getItem('arithmeticHistory');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        console.error("Error loading history from localStorage", e);
        return [];
      }
    }
  }
  return [];
};

const Kalkulator_aritmatika_deret_baris = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [formulaUsed, setFormulaUsed] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  // Inisialisasi state history langsung dari localStorage
  const [history, setHistory] = useState<HistoryItem[]>(loadHistoryFromLocalStorage);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Simpan history ke localStorage setiap kali history berubah
  useEffect(() => {
    localStorage.setItem('arithmeticHistory', JSON.stringify(history));
  }, [history]);

  const handleHitungSuku = () => {
    if (!a || !b || !n) {
      alert("Mohon isi semua nilai: Suku Awal (a), Beda (b), dan Suku ke-n (n)");
      return;
    }
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const nNum = parseInt(n, 10);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(nNum) || nNum <= 0) {
      alert("Pastikan semua input valid (angka)");
      return;
    }

    const Un = aNum + (nNum - 1) * bNum;
    setResult(Un);
    setFormulaUsed(`U(n) = a + (n - 1) * b`);
    setLabel(`Suku ke-${nNum} (Un)`);
    const newHistory: HistoryItem = {
      id: Date.now(),
      type: 'suku',
      a: aNum,
      b: bNum,
      n: nNum,
      result: Un,
      formula: `U(${nNum}) = ${aNum} + (${nNum} - 1) * ${bNum}`,
      label: `Suku ke-${nNum}`
    };
    setHistory(prev => [newHistory, ...prev]);
    setShowModal(true);
  };

  const handleHitungJumlah = () => {
    if (!a || !b || !n) {
      alert("Mohon isi semua nilai: Suku Awal (a), Beda (b), dan Jumlah Suku (n)");
      return;
    }
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const nNum = parseInt(n, 10);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(nNum) || nNum <= 0) {
      alert("Pastikan semua input valid (angka)");
      return;
    }

    const Sn = (nNum / 2) * (2 * aNum + (nNum - 1) * bNum);
    setResult(Sn);
    setFormulaUsed(`S(n) = n/2 * (2a + (n - 1)b)`);
    setLabel(`Jumlah ${nNum} Suku Pertama (Sn)`);
    const newHistory: HistoryItem = {
      id: Date.now(),
      type: 'jumlah',
      a: aNum,
      b: bNum,
      n: nNum,
      result: Sn,
      formula: `S(${nNum}) = ${nNum}/2 * (2*${aNum} + (${nNum} - 1)*${bNum})`,
      label: `Jumlah ${nNum} Suku`
    };
    setHistory(prev => [newHistory, ...prev]);
    setShowModal(true);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('arithmeticHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Kalkulator Deret Aritmatika</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suku Awal (a)</label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Beda (b)</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suku ke-n / Jumlah Suku (n)</label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 5"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={handleHitungSuku}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Hitung Suku Ke-n
            </button>
            <button
              onClick={handleHitungJumlah}
              className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
            >
              Hitung Jumlah n Suku
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              {showHistory ? "Sembunyikan" : "Lihat"} Riwayat
            </button>
            {showHistory && history.length > 0 && (
              <button
                onClick={clearHistory}
                className="ml-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200"
              >
                Hapus Riwayat
              </button>
            )}
          </div>

          {showHistory && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-2">Riwayat Perhitungan</h3>
              {history.length === 0 ? (
                <p className="text-gray-500 text-center">Belum ada riwayat</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((item) => (
                    <li key={item.id} className="text-sm bg-white p-3 rounded border border-gray-200">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-gray-600">{item.formula} = {item.result.toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && result !== null && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Perhitungan</h2>
            <p className="text-gray-700 mb-2"><span className="font-medium">Rumus:</span> {formulaUsed}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Perhitungan:</span> {label}</p>
            <p className="text-2xl font-bold text-indigo-600 mb-6">{result.toFixed(2)}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kalkulator_aritmatika_deret_baris;