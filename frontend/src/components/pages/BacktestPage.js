import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import StrategySelector from '../features/backtest/StrategySelector';
import BacktestForm from '../features/backtest/BacktestForm';
import BacktestResults from '../features/backtest/BacktestResults';

/**
 * BacktestPage component for running strategy backtests
 */
const BacktestPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [backtestConfig, setBacktestConfig] = useState(null);
  const [currentStep, setCurrentStep] = useState('select-strategy');

  /**
   * Handle strategy selection
   * @param {Object} strategy - Selected strategy
   */
  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
    setCurrentStep('configure');
  };

  /**
   * Handle backtest configuration submission
   * @param {Object} config - Backtest configuration
   */
  const handleConfigSubmit = (config) => {
    setBacktestConfig(config);
    setCurrentStep('results');
  };

  /**
   * Handle navigation back from configuration or results
   */
  const handleBack = () => {
    if (currentStep === 'results') {
      setCurrentStep('configure');
    } else if (currentStep === 'configure') {
      setSelectedStrategy(null);
      setCurrentStep('select-strategy');
    }
  };

  /**
   * Render content based on current step
   * @returns {React.ReactNode} Step content
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 'select-strategy':
        return <StrategySelector onStrategySelect={handleStrategySelect} />;
      case 'configure':
        return (
          <BacktestForm 
            strategy={selectedStrategy} 
            onBack={handleBack} 
            onSubmit={handleConfigSubmit} 
          />
        );
      case 'results':
        return (
          <BacktestResults 
            config={backtestConfig} 
            onBack={handleBack} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {renderStepContent()}
    </MainLayout>
  );
};

export default BacktestPage; 
