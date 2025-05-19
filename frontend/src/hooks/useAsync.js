import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for handling asynchronous operations
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} [immediate=true] - Whether to execute immediately on mount
 * @param {Array} [dependencies=[]] - Dependencies for useEffect/useCallback
 * @returns {Object} State and control functions for the async operation
 */
const useAsync = (asyncFunction, immediate = true, dependencies = []) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Reset state
  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  // Execute the async function
  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setData(null);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        setStatus('success');
        return result;
      } catch (err) {
        setError(err);
        setStatus('error');
        throw err;
      }
    },
    [asyncFunction, ...dependencies]
  );

  // Execute immediately on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    reset,
    status,
    data,
    error,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};

export default useAsync; 
