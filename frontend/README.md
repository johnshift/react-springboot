<h1 align="center"> Veils Frontend </h1>

<p align="center">
  <a href="https://codecov.io/gh/johnshift/veils">
		<img src="https://codecov.io/gh/johnshift/veils/branch/main/graph/badge.svg?token=VEGDX3IKZE"/>
	</a>
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/johnshift/veils?logo=github" />
	<img alt='Github build' src="https://img.shields.io/github/workflow/status/johnshift/veils/Production?style=flat-square" />
</p>
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

## Best Practices

- Enforce custom hooks on component logic. This separates logic and view aspect of component.  
  This also improves code behavior since you can test the hooks separately.  
  This is enforced by the `use-encapsulation` eslint plugin.

## Issues

    - userEvent inside act inconsistent behaviour: `https://github.com/testing-library/user-event/issues/387`
    	- never wrap `userEvent` and `fireEvent` in `act`. See https://twitter.com/kentcdodds/status/1330937800321974272?lang=en
