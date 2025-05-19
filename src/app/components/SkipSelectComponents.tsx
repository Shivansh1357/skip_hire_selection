import React, { useState } from 'react';
import Image from 'next/image';
import { SkipOption } from '../api/skips';
import { SkipImage } from './SkipImages';

// Skip names mapping based on size
const skipNameMap: Record<number, string> = {
  4: 'Mini Skip',
  6: 'Midi Skip',
  8: 'Builder\'s Skip',
  10: 'Large Skip',
  12: 'Maxi Skip',
  14: 'Extra Large Skip',
  16: 'Extra Large Skip',
  20: 'Roll-On Roll-Off',
  40: 'Roll-On Roll-Off'
};

// Skip descriptions based on size
const skipDescriptionMap: Record<number, string> = {
  4: 'Perfect for small garden or house clearance projects',
  6: 'Ideal for medium-sized projects and renovations',
  8: 'The most common skip for larger home projects',
  10: 'For major projects and commercial use',
  12: 'Suitable for large construction and commercial waste',
  14: 'For large volume waste and commercial projects',
  16: 'For large volume waste and commercial projects',
  20: 'For industrial use and large construction sites',
  40: 'For industrial use and very large construction projects'
};

// Skip suitable for map
const skipSuitabilityMap: Record<number, string[]> = {
  4: ['Small garden waste', 'House clearance', 'Small renovation projects'],
  6: ['Medium renovation projects', 'Garden clearance', 'Office clearance'],
  8: ['Home renovations', 'Building projects', 'Large garden clearance'],
  10: ['Commercial projects', 'Major renovations', 'Construction waste'],
  12: ['Large commercial projects', 'Construction waste', 'Factory clearance'],
  14: ['Large volume waste', 'Construction sites', 'Industrial waste'],
  16: ['Industrial waste', 'Factory clearance', 'Large construction projects'],
  20: ['Industrial waste', 'Major construction', 'Large volume materials'],
  40: ['Major industrial waste', 'Construction sites', 'Bulk materials']
};

// Skip dimension map (approximate dimensions in meters)
const skipDimensionsMap: Record<number, { length: string; width: string; height: string }> = {
  4: { length: '1.83m', width: '1.29m', height: '0.91m' },
  6: { length: '2.29m', width: '1.37m', height: '1.07m' },
  8: { length: '3.35m', width: '1.68m', height: '1.07m' },
  10: { length: '3.66m', width: '1.83m', height: '1.22m' },
  12: { length: '3.96m', width: '1.83m', height: '1.52m' },
  14: { length: '4.57m', width: '1.83m', height: '1.68m' },
  16: { length: '5.03m', width: '1.83m', height: '1.68m' },
  20: { length: '6.40m', width: '2.44m', height: '2.13m' },
  40: { length: '12.19m', width: '2.44m', height: '2.13m' }
};

// Header component for the skip selection page
export const Header = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Choose Your Skip Size
    </h1>
    <p className="text-gray-300 max-w-2xl mx-auto">
      Select the skip size that best suits your needs
    </p>
  </div>
);

// Component for displaying a single skip option
export const SkipOptionCard = ({ 
  skip, 
  selected, 
  onSelect 
}: { 
  skip: SkipOption; 
  selected: boolean;
  onSelect: (id: number) => void;
}) => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate total price including VAT
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  // Get the skip name based on size
  const skipName = skipNameMap[skip.size] || `${skip.size} Yard Skip`;
  
  // Get the skip suitable for list
  const skipSuitability = skipSuitabilityMap[skip.size] || ['General waste', 'Construction waste'];
  
  // Get the skip dimensions
  const skipDimensions = skipDimensionsMap[skip.size] || {
    length: 'Varies',
    width: 'Varies',
    height: 'Varies'
  };

  const handleSelect = () => {
    if (!skip.forbidden) {
      // If already selected, just deselect without highlighting animation
      if (selected) {
        onSelect(-1); // Using -1 or any invalid ID to deselect
        setButtonHighlighted(false); // Reset highlighted state
      } else {
        setButtonHighlighted(true);
        // Set a timeout to animate the button, then select the skip
        setTimeout(() => {
          onSelect(skip.id);
        }, 300);
      }
    }
  };

  // Toggle details on mobile
  const toggleDetails = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      e.stopPropagation();
      setShowDetails(!showDetails);
    }
  };

  return (
    <div 
      className={`bg-[#1a2333] rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform ${
        selected ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:scale-[1.01]'
      } ${skip.forbidden ? 'opacity-75' : ''}`}
      onClick={toggleDetails}
    >
      <div className="relative">
        <div className="h-32 sm:h-40 md:h-48 bg-[#151f2e] relative flex items-center justify-center p-4">
          {/* Skip image */}
          <div className="w-full h-full flex items-center justify-center">
            <SkipImage size={skip.size} />
          </div>
          
          {/* Size badge */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-blue-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
            {skip.size} Yards
          </div>
          
          {/* Road warning */}
          {!skip.allowed_on_road && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-800/80 text-yellow-300 px-2 py-0.5 md:px-3 md:py-1 rounded-md text-xs font-medium flex items-center">
              <span className="mr-1">⚠️</span> 
              <span className="hidden sm:inline">Not Allowed On The Road</span>
              <span className="sm:hidden">No Road</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">{skip.size} Yard Skip</h3>
            <p className="text-xs md:text-sm text-gray-400">{skip.hire_period_days} day hire period</p>
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-500">
            £{Math.round(totalPrice)}
          </div>
        </div>
        
        {/* Mobile toggle button */}
        <button 
          className="w-full py-1 text-xs text-gray-400 border-t border-b border-gray-700 my-2 sm:hidden"
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
        
        {/* Additional details section - visible on desktop or when expanded on mobile */}
        <div className={`space-y-3 ${showDetails ? 'block' : 'hidden sm:block'}`}>
          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-1 md:gap-2 text-xs">
            <div className="bg-[#131d2c] p-1.5 md:p-2 rounded text-center">
              <div className="font-medium text-gray-300 text-xs mb-0.5 md:mb-1">Length</div>
              <div className="text-gray-400 text-xs">{skipDimensions.length}</div>
            </div>
            <div className="bg-[#131d2c] p-1.5 md:p-2 rounded text-center">
              <div className="font-medium text-gray-300 text-xs mb-0.5 md:mb-1">Width</div>
              <div className="text-gray-400 text-xs">{skipDimensions.width}</div>
            </div>
            <div className="bg-[#131d2c] p-1.5 md:p-2 rounded text-center">
              <div className="font-medium text-gray-300 text-xs mb-0.5 md:mb-1">Height</div>
              <div className="text-gray-400 text-xs">{skipDimensions.height}</div>
            </div>
          </div>
          
          {/* Suitable for */}
          <div className="bg-[#131d2c] p-2 md:p-3 rounded">
            <h4 className="font-medium text-gray-300 text-xs md:text-sm mb-1 md:mb-2">Suitable for:</h4>
            <ul className="space-y-0.5 md:space-y-1">
              {skipSuitability.slice(0, 2).map((item, index) => (
                <li key={index} className="text-xs text-gray-400 flex items-center">
                  <span className="mr-1 md:mr-2 text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Restrictions */}
          <div className="grid grid-cols-2 gap-1 md:gap-2">
            <div className={`text-xs flex items-center p-1.5 md:p-2 rounded ${skip.allowed_on_road ? 'bg-[#162843] text-green-400' : 'bg-[#2a1e23] text-red-400'}`}>
              <span className={`mr-1 md:mr-2 ${skip.allowed_on_road ? 'text-green-500' : 'text-red-500'}`}>
                {skip.allowed_on_road ? '✓' : '✕'}
              </span>
              {skip.allowed_on_road ? 'Road Placement' : 'No Road Placement'}
            </div>
            
            <div className={`text-xs flex items-center p-1.5 md:p-2 rounded ${skip.allows_heavy_waste ? 'bg-[#162843] text-green-400' : 'bg-[#2a1e23] text-red-400'}`}>
              <span className={`mr-1 md:mr-2 ${skip.allows_heavy_waste ? 'text-green-500' : 'text-red-500'}`}>
                {skip.allows_heavy_waste ? '✓' : '✕'}
              </span>
              {skip.allows_heavy_waste ? 'Heavy Waste' : 'No Heavy Waste'}
            </div>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
          disabled={skip.forbidden}
          className={`w-full mt-3 py-2 md:py-3 px-4 rounded-md flex items-center justify-center transition-all duration-300 ${
            skip.forbidden 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : selected
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : buttonHighlighted
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : 'bg-[#1e2a3d] hover:bg-[#273548] text-white'
          }`}
          aria-label={`${selected ? 'Deselect' : 'Select'} ${skip.size} yard skip`}
        >
          <span>Select This Skip</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 md:h-5 md:w-5 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Component for the skip selection grid
export const SkipSelectGrid = ({ 
  skips, 
  selectedSkipId, 
  onSelectSkip 
}: { 
  skips: SkipOption[]; 
  selectedSkipId: number | null;
  onSelectSkip: (id: number) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipOptionCard
          key={skip.id}
          skip={skip}
          selected={selectedSkipId === skip.id}
          onSelect={onSelectSkip}
        />
      ))}
    </div>
  );
};

// Component for the action buttons
export const ActionButtons = ({ 
  onProceed, 
  selectedSkip 
}: { 
  onProceed: () => void; 
  selectedSkip: SkipOption | null;
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
      <button
        className="px-6 py-3 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
        aria-label="Go back to previous step"
      >
        Back
      </button>
      <button
        className={`px-6 py-3 rounded-md transition-all duration-300 ${
          selectedSkip && !selectedSkip.forbidden
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
        onClick={selectedSkip && !selectedSkip.forbidden ? onProceed : undefined}
        disabled={!selectedSkip || selectedSkip.forbidden}
        aria-label="Proceed with selected skip"
      >
        Continue
      </button>
    </div>
  );
}; 