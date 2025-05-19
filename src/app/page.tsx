"use client";

import React, { useState, useEffect } from 'react';
import { SkipOption, fetchSkipData } from './api/skips';
import { formatErrorMessage } from './api/utils';
import { Header, SkipSelectGrid, ActionButtons } from './components/SkipSelectComponents';
import ProgressBar from './components/ProgressBar';

export default function SkipSelectPage() {
  const [skipOptions, setSkipOptions] = useState<SkipOption[]>([]);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get the selected skip object based on ID
  const selectedSkip = skipOptions.find(skip => skip.id === selectedSkipId) || null;

  // Fetch skip data on component mount
  useEffect(() => {
    const getSkipData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using the postcode from the project requirements - using NR32 to match sample API data
        const data = await fetchSkipData('NR32', 'Lowestoft');
        
        if (data && data.length > 0) {
          // Sort skips by size for better presentation
          const sortedData = [...data].sort((a, b) => a.size - b.size);
          setSkipOptions(sortedData);
        } else {
          setError('No skip options available for this location.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(formatErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    getSkipData();
  }, []);

  // Handler for selecting a skip
  const handleSelectSkip = (id: number) => {
    // If selected the same skip or receiving -1, deselect
    if (id === -1 || id === selectedSkipId) {
      setSelectedSkipId(null);
    } else {
      setSelectedSkipId(id);
    }
  };

  // Handler for the proceed button
  const handleProceed = () => {
    if (!selectedSkip) return;
    
    // Calculate total price including VAT
    const totalPrice = selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100);
    
    // In a real application, this would navigate to the next page or submit the selection
    console.log('Selected skip:', selectedSkip);
    alert(`You selected: ${selectedSkip.size} Yard Skip - £${Math.round(totalPrice)}`);
  };

  // Retry handler
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Force re-fetch data by remounting the component
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#080D17] text-white p-4 md:p-8">
      <main className="max-w-6xl mx-auto">
        <ProgressBar />
        <Header />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-300">Loading skip options...</span>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-6 rounded-lg text-center my-8">
            <h3 className="font-bold text-lg mb-2">Error</h3>
            <p>{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={handleRetry}
              aria-label="Try loading skip options again"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {skipOptions.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-gray-300 mb-4">No skip options available for this location.</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleRetry}
                  aria-label="Refresh skip options"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <>
                <SkipSelectGrid 
                  skips={skipOptions} 
                  selectedSkipId={selectedSkipId}
                  onSelectSkip={handleSelectSkip} 
                />
                <ActionButtons onProceed={handleProceed} selectedSkip={selectedSkip} />
              </>
            )}
          </>
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>© 2025 Skip Hire Service. All rights reserved.</p>
      </footer>
    </div>
  );
} 