# Veils Frontend

## Selected Frameworks

- NextJS
- MUI
- Redux
- React Query
- `@testing-library` + `cypress`

### Framework Critieria

- Stability:
  - No weird issues that costs time to fix during development.  
    Issues are preferably resolved using google/stackoverflow (:
- Readability:
  - Switching context between frontend/backend requires reading a lot of code.  
    It comes with remembering what the code does and understanding it.  
    All written code should be simple and intuitive.
- Testing:
  - TDD is my preferred approach in development.  
    I write tests, before writing any code.  
    Everything should be compatible with the testing frameworks.

## Tradeoffs

Every piece of code has tradeoffs. For veils, its the following:

- Veils frontend is engineered for what users perceive (aesthetics/perception) vs raw lighthouse score.  
  To cure the itch of lighthouse performance, my portfolio is built with perfect 100 score.  
  This project utilizes react suspense + skeletons to give a sense of perceived performance.
