## types folder

This folder contains TypeScript type definitions for the project.

### How to use

1. Create a new TypeScript file in this folder. For example, `my-type.ts`.

2. Define your type in the file. For example:

```typescript
export type MyType = {
  id: string;
  name: string;
};
```

3. Import the type in your code. For example:

```typescript
import { MyType } from '../types/my-type';
```

4. Use the type in your code. For example:

```typescript
const myObject: MyType = {
  id: '1',
  name: 'John Doe',
};
```

