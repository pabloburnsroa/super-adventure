import { DependencyList, useCallback, useEffect, useState } from 'react';

export function useAsync(func: Function, dependencies: any[] = []) {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn(func: Function, dependencies = []) {
  return useAsyncInternal(func, dependencies, false);
}

// Types???

function useAsyncInternal(
  func: Function,
  dependencies: DependencyList,
  initialLoading = false
) {
  // Set states
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState({});

  // Fire off the function that will be called
  const execute = useCallback((...params: any) => {
    setLoading(true);
    return func(...params)
      .then((data: any) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error: any) => {
        setError(error);
        // setValue(undefined);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute };
}
