<!--
SYNC IMPACT REPORT
- Version change: 0.0.0 (unratified template) → 1.0.0 (initial ratified version)
- List of modified principles:
  * [PRINCIPLE_1_NAME] → I. Technology Stack Fidelity & Non-Assumption
  * [PRINCIPLE_2_NAME] → II. Zero-Test Architecture & Static Quality Gates
  * [PRINCIPLE_3_NAME] → III. Strict TypeScript & Module Semantics
  * [PRINCIPLE_4_NAME] → IV. Modular Component & View Architecture
  * [PRINCIPLE_5_NAME] → V. Colocated Style Objects & Zero-External-CSS
  * Added Principle VI. Centralized API Fetch & Typed Error Handling
  * Added Principle VII. Native React State & Session Storage Patterns
- Added sections:
  * Additional Architectural Constraints
  * Development Workflow & Quality Gates
- Removed sections: None (template scaffold placeholders replaced)
- Follow-up TODOs: None
-->

# Kefir Frontend Constitution

## Core Principles

### I. Technology Stack Fidelity & Non-Assumption
The application MUST strictly use the existing technologies established in the repository: React 19, TypeScript, Vite, and React Icons (`react-icons`). Developers MUST NOT introduce new frameworks, third-party state managers (such as Redux or Zustand), alternative routing libraries, CSS utility libraries (such as Tailwind), or external component libraries without explicit prior authorization. Every decision MUST reflect the actual codebase; assumptions regarding uninstalled dependencies are strictly forbidden.

### II. Zero-Test Architecture & Static Quality Gates
In accordance with explicit project directives, automated tests (unit, integration, end-to-end) MUST NOT be created for this project. Quality, correctness, and regression prevention MUST be enforced exclusively through strict TypeScript compilation (`tsc -b`), static analysis via ESLint (`eslint .`), component type contracts, runtime error handling, and manual browser verification. Test frameworks or test files (`*.test.*`, `*.spec.*`) MUST NOT be added to the repository.

### III. Strict TypeScript & Module Semantics
All code MUST conform to the project's TypeScript configuration (`tsconfig.app.json`). Developers MUST enforce `verbatimModuleSyntax` by using `import type` for all type-only imports and exports. The `erasableSyntaxOnly` flag and `noEmit` compiler modes MUST be adhered to. File imports within the application MUST include explicit extensions (`.ts`, `.tsx`) where enabled by `allowImportingTsExtensions`. The use of `any` is prohibited; all props, state variables, API parameters, and responses MUST have comprehensive, explicit type declarations located in `src/types/`.

### IV. Modular Component & View Architecture
The codebase follows a decoupled directory structure under `src/`:
- `src/api/`: Domain HTTP client wrappers encapsulating backend endpoints.
- `src/auth/`: Authentication tokens and session persistence helpers.
- `src/components/`: Reusable presentation and domain-specific UI components (e.g., tables, autocompletes), strictly driven by typed props.
- `src/pages/`: Module orchestration views structured by domain (e.g., `pages/accounts/`), separating List, Detail, and Create workflows.
- `src/hooks/`: Custom React hooks encapsulating reusable stateful domain logic (such as audit logging).
- `src/types/`: Dedicated TypeScript model interfaces per business entity.
Components MUST adhere to single responsibility: pages coordinate data fetching and view switching; presentation components render and communicate via callbacks.

### V. Colocated Style Objects & Zero-External-CSS
UI styling MUST be declared via component-colocated JavaScript style objects typed with `React.CSSProperties` placed at the bottom of component files, or through direct inline style objects for dynamic rules. Global stylesheets (`src/index.css` and `src/App.css`) are strictly reserved for document resets, base typography, root container definitions, and shared utility classes (such as `.table-scroll-container`). New third-party styling solutions, preprocessors, or global CSS sheets MUST NOT be introduced.

### VI. Centralized API Fetch & Typed Error Handling
All backend communication MUST route through the centralized `apiFetch<T>` utility in `src/api/http.ts`. Endpoint functions MUST be organized within domain-specific API files (`src/api/<domain>Api.ts`) and return typed promises (`Promise<T>`). API callers MUST handle `ApiError` and parse structured backend errors (`BackendErrorPayload`). Hardcoded URLs are forbidden; endpoint paths MUST respect the configurable base API path and proxy setup (`/api`).

### VII. Native React State & Session Storage Patterns
Application state MUST be managed using native React primitives (`useState`, `useEffect`, `useCallback`, `useRef`). View navigation across dashboard modules and entity sub-views (List, Detail, Create) MUST be orchestrated via local state and conditional rendering. Persistent state MUST follow established storage semantics: `localStorage` is used solely for authentication tokens and user identity; `sessionStorage` is used for ephemeral operational data such as session audit trails (`kefir_system_history`).

## Additional Architectural Constraints

### Code Preservation & Improvement Protocol
Developers MUST preserve established conventions and existing application code. Unprompted refactoring, deletion, or major restructuring of existing source files is strictly forbidden. If an improvement, architectural enhancement, or lint correction in existing code is identified, developers MUST consult the user and obtain explicit approval before applying any changes.

### Clean Code & Single Responsibility
Code MUST remain clean, readable, and declarative. Functions and components MUST maintain a single, distinct responsibility. Forms MUST handle validation, loading states, and error feedback cleanly without unnecessary side effects. Variable, function, and component names MUST clearly express their domain intent.

### Security & Token Lifecycle
Authentication relies on JWT bearer tokens stored in browser local storage. Components MUST respect the session lifecycle: token expiration MUST be checked proactively via `isTokenExpired()` and `getTokenRemainingTime()`, and session termination MUST clean up tokens and notify the user appropriately before redirecting to the login interface.

## Development Workflow & Quality Gates

### Pre-Commit Verification Gates
Before proposing or completing any feature or modification, the codebase MUST satisfy all quality gates:
1. **Compilation Gate**: `npm run build` (`tsc -b && vite build`) MUST pass with zero type errors.
2. **Lint Gate**: `npm run lint` (`eslint .`) MUST pass without lint violations in modified or new files.
3. **Zero Test Gate**: Do not write, generate, or execute automated test suites.
4. **Clean Code Verification**: Code must respect established naming conventions, styling approaches, and type-only import requirements.

### Non-Governance Scope Guard
Governance updates remain isolated within `.specify/memory/constitution.md`. Feature implementations, source code updates, or non-governance activities MUST NOT be performed as part of a constitution workflow.

## Governance

This Constitution acts as the supreme technical authority for the Kefir frontend codebase. All feature designs, implementation tasks, code modifications, and pull request reviews MUST verify strict compliance with the core principles and constraints herein.

### Amendment Procedure
Amendments to this constitution require:
1. Documentation of rationale for the proposed change.
2. Impact assessment on existing codebase conventions and templates.
3. Review and approval by project stakeholders.
4. Semantic version bump of this document.

### Versioning Policy
- **MAJOR**: Incompatible principle changes, technology stack shifts, or removal of core constraints.
- **MINOR**: Addition of new principles, expanded architectural guidance, or material rule modifications.
- **PATCH**: Clarifications, wording refinements, typo corrections, or non-semantic formatting changes.

**Version**: 1.0.0 | **Ratified**: 2026-09-17 | **Last Amended**: 2026-09-17
