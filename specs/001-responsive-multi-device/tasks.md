# Implementation Tasks: Responsive Multi-Device Display

**Feature**: `001-responsive-multi-device`  
**Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize responsive hooks and foundational styling utilities

- [X] T001 Create responsive viewport interface and types (`ViewportState`, `BREAKPOINTS`) in `src/hooks/useViewport.ts`
- [X] T002 [P] Add responsive scrollbar utilities and global layout resets in `src/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core viewport detection and layout primitives that MUST be completed before any user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Implement `useViewport` hook with `window.matchMedia`, resize listeners, and cleanup in `src/hooks/useViewport.ts`
- [X] T004 [P] Add mobile touch scroll and layout wrapper utilities in `src/App.css`

**Checkpoint**: Viewport detection and layout primitives ready — user story implementation can begin

---

## Phase 3: User Story 1 - Smartphone Navigation and Dashboard Usability (Priority: P1) 🎯 MVP

**Goal**: Transform `Dashboard.tsx` into a responsive single-column layout on mobile (< 768px) with an off-canvas drawer navigation, top hamburger bar, and responsive login card, eliminating element overlap and screen cutoff.

**Independent Test**: Simulate smartphone viewport (375x667px); verify login card is centered and scrolls; verify dashboard hides desktop sidebar and shows top header with hamburger toggle; verify tapping hamburger opens drawer; selecting a module switches view and closes drawer; backdrop click dismisses drawer; timeline displays stacked history without overlapping badges.

### Implementation for User Story 1

- [X] T005 [P] [US1] Implement responsive card padding and virtual keyboard scroll container in `src/pages/LoginPage.tsx`
- [X] T006 [US1] Implement responsive mobile header with branding and hamburger button (`FaBars`) in `src/pages/Dashboard.tsx`
- [X] T007 [US1] Implement off-canvas mobile navigation drawer with backdrop and close button (`FaTimes`) in `src/pages/Dashboard.tsx`
- [X] T008 [US1] Reflow system activity timeline and dashboard content area (`whiteBody`) for mobile viewports in `src/pages/Dashboard.tsx`

**Checkpoint**: User Story 1 complete. Core navigation and application shell are fully usable on smartphones.

---

## Phase 4: User Story 2 - Compact Data Tables and Record Browsing (Priority: P2)

**Goal**: Ensure all tabular data views and list management screens remain contained within screen width, scroll horizontally inside their card container, and have touch-friendly tap targets and responsive pagination controls without breaking page boundaries.

**Independent Test**: In mobile viewport (375px), navigate to Accounts, Customers, Loans, and Users; verify tables scroll horizontally within their cards; verify list headers wrap cleanly; verify pagination buttons fit; verify tapping a row navigates to Detail view.

### Implementation for User Story 2

- [ ] T009 [P] [US2] Add contained horizontal scroll and touch-friendly cell padding in `src/components/accounts/AccountTable.tsx`
- [ ] T010 [P] [US2] Add contained horizontal scroll and touch-friendly cell padding in `src/components/customers/CustomerTable.tsx`
- [ ] T011 [P] [US2] Add contained horizontal scroll and touch-friendly cell padding in `src/components/loans/LoanTable.tsx`
- [ ] T012 [P] [US2] Add contained horizontal scroll and touch-friendly cell padding in `src/components/loans/LoanInstallmentTable.tsx`
- [ ] T013 [P] [US2] Add contained horizontal scroll and touch-friendly cell padding in `src/components/users/UserTable.tsx`
- [ ] T014 [P] [US2] Add contained horizontal scroll in `src/components/banks/BankTable.tsx`, `src/components/currencies/CurrencyTable.tsx`, `src/components/customerTypes/CustomerTypesTable.tsx`, and `src/components/loanTypes/LoanTypeTable.tsx`
- [ ] T015 [P] [US2] Implement responsive header wrap and mobile pagination controls in `src/pages/accounts/AccountListPage.tsx`
- [ ] T016 [P] [US2] Implement responsive header wrap and mobile pagination controls in `src/pages/customers/CustomerListPage.tsx`
- [ ] T017 [P] [US2] Implement responsive header wrap and mobile pagination controls in `src/pages/loans/LoanListPage.tsx`
- [ ] T018 [P] [US2] Implement responsive header wrap and mobile pagination controls in `src/pages/users/UserListPage.tsx`
- [ ] T019 [P] [US2] Implement responsive header wrap and mobile pagination controls in `src/pages/banks/BankListPage.tsx`, `src/pages/currencies/CurrencyListPage.tsx`, `src/pages/customerTypes/CustomerTypeListPage.tsx`, and `src/pages/loanTypes/LoanTypeListPage.tsx`

**Checkpoint**: User Stories 1 AND 2 complete. Tabular browsing and pagination are functional on compact screens.

---

## Phase 5: User Story 3 - Responsive Forms and Creation Flows (Priority: P3)

**Goal**: Reflow multi-column form grids and detail summary grids into a single-column layout on compact screens (< 768px), optimize button touch targets, and ensure autocomplete dropdown menus stay bounded within the viewport.

**Independent Test**: Navigate to "New Account", "New Customer", "New Loan", and "New User" on mobile (375px); verify form fields stack into a single column with full-width inputs; type in `CustomerAutocomplete` and verify the dropdown renders within visible screen bounds; submit record; verify detail pages display labels and values cleanly without overlap.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Implement responsive single-column form grid reflow and touch button sizing in `src/pages/accounts/NewAccountPage.tsx`
- [ ] T021 [P] [US3] Implement responsive single-column form grid reflow and touch button sizing in `src/pages/customers/NewCustomerPage.tsx`
- [ ] T022 [P] [US3] Implement responsive single-column form grid reflow and touch button sizing in `src/pages/loans/NewLoanPage.tsx`
- [ ] T023 [P] [US3] Implement responsive single-column form grid reflow and touch button sizing in `src/pages/users/NewUserPage.tsx`
- [ ] T024 [P] [US3] Implement viewport-bounded dropdown positioning and mobile touch selection in `src/components/customers/CustomerAutocomplete.tsx`
- [ ] T025 [P] [US3] Implement responsive summary grid reflow and header action wrap in `src/pages/accounts/AccountDetailPage.tsx`
- [ ] T026 [P] [US3] Implement responsive summary grid reflow and header action wrap in `src/pages/customers/CustomerDetailPage.tsx`
- [ ] T027 [P] [US3] Implement responsive summary grid reflow and header action wrap in `src/pages/loans/LoanDetailPage.tsx`
- [ ] T028 [P] [US3] Implement responsive summary grid reflow in `src/pages/banks/BankDetailPage.tsx`, `src/pages/currencies/CurrencyDetailPage.tsx`, `src/pages/customerTypes/CustomerTypeDetailPage.tsx`, and `src/pages/loanTypes/LoanTypeDetailPage.tsx`

**Checkpoint**: User Stories 1, 2, and 3 complete. Record creation, search autocomplete, and detail views work seamlessly on mobile.

---

## Phase 6: User Story 4 - Tablet and Adaptive Intermediate Displays (Priority: P4)

**Goal**: Refine tablet viewports (768px–1023px) across portrait and landscape orientations to ensure balanced spacing, appropriate card margins, and flawless orientation switching without state loss.

**Independent Test**: In DevTools, resize viewport to 768px (portrait) and 1024px (landscape); verify navigation and cards adapt smoothly; rotate orientation while inputs are populated and verify state is preserved without reloads.

### Implementation for User Story 4

- [ ] T029 [US4] Refine intermediate tablet layout, card paddings, and navigation transitions in `src/pages/Dashboard.tsx`
- [ ] T030 [P] [US4] Adjust tablet viewports and text layout in `src/pages/AboutPage.tsx`
- [ ] T031 [US4] Verify orientation switching handling and session preservation across tablet and mobile viewports in `src/App.tsx`

**Checkpoint**: All user stories (P1 through P4) complete and functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verification against quality gates and browser matrix

- [ ] T032 Run static compilation quality gate via `npm run build`
- [ ] T033 Run ESLint verification via `npm run lint`
- [ ] T034 Execute end-to-end manual validation matrix across 320px, 375px, 768px, 1024px, and 1440px viewports per `specs/001-responsive-multi-device/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - User Story 1 (P1): Can proceed immediately after Foundational.
  - User Story 2 (P2): Depends on Phase 2; can proceed in parallel with or after US1.
  - User Story 3 (P3): Depends on Phase 2; can proceed in parallel with or after US1/US2.
  - User Story 4 (P4): Depends on Phase 3, 4, 5 layouts in place.
- **Polish (Phase 7)**: Depends on all user story implementations being complete.

### Parallel Opportunities

- **Setup Phase**: T001 and T002 can run in parallel.
- **Foundational Phase**: T003 and T004 can run in parallel.
- **User Story 2 (Tables)**: T009 through T019 touch distinct component and page files and can run in parallel.
- **User Story 3 (Forms & Details)**: T020 through T028 touch distinct page files and can run in parallel.

---

## Parallel Example: User Story 2 (Tables)

```bash
# Launch table component responsive adjustments in parallel:
Task: "Add contained horizontal scroll and touch-friendly cell padding in src/components/accounts/AccountTable.tsx"
Task: "Add contained horizontal scroll and touch-friendly cell padding in src/components/customers/CustomerTable.tsx"
Task: "Add contained horizontal scroll and touch-friendly cell padding in src/components/loans/LoanTable.tsx"
Task: "Add contained horizontal scroll and touch-friendly cell padding in src/components/users/UserTable.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002).
2. Complete Phase 2: Foundational (T003, T004) — unlocks story development.
3. Complete Phase 3: User Story 1 (T005, T006, T007, T008).
4. **STOP and VALIDATE**: Verify mobile navigation, drawer menu, and login card in 375px viewport. This delivers an immediate MVP where mobile users can navigate the application without overlapping elements!

### Incremental Delivery

1. Foundation ready (Phases 1 & 2).
2. Deliver US1 (MVP: Navigation & Dashboard) → Test independently.
3. Deliver US2 (Data Tables & List Pages) → Test independently.
4. Deliver US3 (Forms, Autocomplete & Details) → Test independently.
5. Deliver US4 (Tablet & Orientation Adaptation) → Test independently.
6. Execute Polish & Quality Gates (Phase 7).
