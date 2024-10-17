## Hooks folder

This folder contains the hooks of the project.

### How to use

#### Use case: a hook that fetches data from an API.

1. Create a new file in this folder. For example, `useGetData.ts`.

2. Define your hook in the file. For example:

```tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetData = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useGetData;
```

3. Use your hook in a component. For example:

```tsx
import React from 'react';
import useGetData from 'hooks/useGetData';

const MyComponent = () => {
  const { data, loading } = useGetData('https://api.example.com/data');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && <div>Data: {data}</div>}
    </div>
  );
};

export default MyComponent;
```

#### Use case: a hook that manages a state.

1. Create a new file in this folder. For example, `useMyHook.ts`.

2. Define your hook in the file. For example:

```tsx
import { useState } from 'react';

const useMyHook = () => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + 1);
  };

  return { value, increment };
};

export default useMyHook;
```

3. Use your hook in a component. For example:

```tsx
import React from 'react';
import useMyHook from 'hooks/useMyHook';

const MyComponent = () => {
  const { value, increment } = useMyHook();

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default MyComponent;
```