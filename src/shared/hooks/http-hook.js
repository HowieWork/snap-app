import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // FOR ABORT HTTP REQUESTS BEFORE COMPLETED
  // USEREF: LIKE AN INSTANCE VARIABLE CARRIED OVER AFTER RERENDER
  // AN ARRAY OF CONTROLLER OBJECTS
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      // AbortController:represents a CONTROLLER OBJECT that allows you to ABORT ONE OR MORE WEB REQUESTS as and when desired.
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          // AbortController.signal: Returns an AbortSignal Object instance, which can be used to communicate with, or to abort, a DOM request
          signal: httpAbortCtrl.signal,
        });

        // FIXME BELOW 404 IS WHAT I ADDED, NOT SURE IF CORRECT
        // HANDLING 404: NO ROUTE FOUND
        if (response.status === 404) {
          throw new Error('Could not find the route.');
        }

        const responseData = await response.json();

        // IF FETCH DATA SUCCESSFULLY, FILTER OUT COMPLETED HTTP REQUEST CONTROLLER
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // HANDLING 400s/500s STATUS CODE
        if (!response.ok) {
          // FIXME ERROR MESSAGE NEEDS TO BE UPDATED
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // CLEAN UP: ABORT ALL INCOMPLETED REQUESTS IN CASE WE'RE LEAVING THE COMPONENT BEFORE THE REQUEST COMPLETED.
    return () => {
      // abort(): Abort a DOM request before it has completed.
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
