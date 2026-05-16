# Interview notes

## Storybook vs Vitest

Storybook and Vitest are complementary, but they solve different problems.

Storybook is a living catalog for UI components. I use it to document how a component looks, which props it accepts, which variants it supports, and how it behaves in visual states such as loading, disabled, error, or empty.

Vitest is for automated confidence. I use it to write assertions that fail if component behavior, form interactions, stores, or service logic break after a change.

Interview answer:

> I use Storybook to document and review isolated UI components, especially reusable SFCs with props, slots, states, and accessibility variants. I use Vitest and Vue Test Utils for automated tests because I need assertions that can run in CI and catch regressions. Storybook helps me understand and communicate the component API; Vitest helps me prove the behavior still works.

## What this project tests

- `BaseButton`: slot rendering, click event, loading state.
- `BaseInput`: `v-model` event and accessible error state.
- `LoginView`: form submission calls the auth flow.
- `authService`: mock login success and failure.
- `kanban` store: task grouping and task movement across columns.

Interview answer:

> I started testing the most reusable and business-relevant areas first: base components, login, service behavior, and the Kanban store. I would not try to test every line immediately; I would prioritize components reused across the app and flows that could break user work, such as authentication, forms, task state, and API error handling.

## Why this matters for the role

The role asks for reusable Vue 3 SFC components, CRM screens, forms, REST services, Storybook documentation, and testing. This setup demonstrates the difference between documenting components visually and validating behavior automatically.

Interview answer:

> In a component library, tests protect the contract of the component. For example, if `BaseInput` stops emitting `update:modelValue`, every form using it can break. Testing that behavior once at the base component level gives confidence to the whole application.

