## English Version: Simulating ES6+ Classes Using ES5 Functions

```markdown
# Simulating ES6+ Classes Using ES5 Functions

In ES5 environments, since there is no native `class` syntax, we need to simulate ES6+ classes using functions and prototypes. This document summarizes common approaches, key points, and provides implementation examples.

## 1. Basic Principles

- **Constructor Function**:  
  Use a function as a constructor to create instances with the `new` keyword, and initialize instance properties within the constructor.

- **Prototype**:  
  Define class methods on the constructor's prototype so that all instances share the same method, which saves memory and improves performance.

- **Strict Mode**:  
  Enable `"use strict"` to prevent incorrect `this` binding, accidental global variable creation, and to catch common errors.

---

## 2. Preventing Incorrect Invocation

In ES6 classes, if the constructor or prototype methods are called directly (without `new`), an error is thrown. To simulate this behavior in ES5, we can:

- **Constructor Invocation Check**:  
  Inside the constructor, check if `this instanceof Constructor` to ensure it was called with `new`; if not, throw an error.

- **Prototype Method Invocation Check**:  
  Wrap prototype methods to detect if they are incorrectly invoked with `new`. This is typically done by checking `this instanceof method` (where `method` is the original function) to see if the method is being used as a constructor.

---

## 3. Defining Prototype Methods with Object.defineProperty

To mimic the default behavior of ES6 class methods, pay attention to the following:

- **Non-enumerable**:  
  Methods in a class should not be enumerated (e.g., in a `for...in` loop), so set `enumerable` to `false` when defining methods with `Object.defineProperty`.

- **Writable & Configurable**:  
  By default, properties defined with `Object.defineProperty` are not writable or configurable. To allow modifications and reconfiguration later, set both `writable` and `configurable` to `true`.

---

## 4. Wrapping Prototype Methods

To uniformly detect if a prototype method is mistakenly invoked with `new`, we can encapsulate the detection logic in a helper function (e.g., `innerDefineOwnProperty`).

[example](./target.ts#L23-L56)

About Named vs. Anonymous Functions
- **Named Functions**:
    Named functions are recommended as they provide clearer error messages and stack traces during debugging.
- **Anonymous Functions**:
    Although anonymous functions work, they can make debugging more difficult since the function name is not available in error messages. Therefore, using named functions is advised for easier maintenance.

## 5. Complete Example

[class](./class.ts)

[target](./target.ts)


## 6. Summary
- Use constructor functions and prototypes to simulate ES6+ classes.
- Enable strict mode to prevent incorrect this binding and global variable pollution.
- Define prototype methods using Object.defineProperty with non-enumerable, writable, and configurable attributes.
- Wrap prototype methods to detect if they are mistakenly invoked with new to maintain correct class behavior.
- Named functions are recommended for easier debugging, although anonymous functions are technically acceptable.