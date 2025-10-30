import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';

export interface SearchData {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export default function App() {
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  // Slide animation variants
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait" custom={showResults ? 1 : -1}>
        {!showResults ? (
          <motion.div
            key="search"
            custom={-1}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <SearchPage onSearch={handleSearch} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            custom={1}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <ResultsPage searchData={searchData!} onBack={handleBackToSearch} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
