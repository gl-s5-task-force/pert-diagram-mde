## Classes folder

This folder contains TypeScript classes for the project.

### How to use

1. Create a new TypeScript file in this folder. For example, `my-class.ts`.

2. Define your class in the file. For example:

```typescript
export class MyClass {
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
```

3. Import the class in your code. For example:

```typescript
import { MyClass } from '../classes/my-class';
```