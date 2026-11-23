# Implementation Plan: Cat Clicker

## Overview

Build a self-contained `index.html` file implementing the Cat Clicker SPA. The file contains all HTML structure, a `<style>` block for custom CSS keyframe animations, a Tailwind CSS CDN link, and a `<script>` block with the full MVC implementation. Tasks are ordered so each step produces runnable output that can be verified in a browser.

## Tasks

- [x] 1. Create `index.html` with HTML skeleton and Tailwind CDN
  - Create `d:\RevpU\RevoU-Coding-Camp\index.html`
  - Add `<!DOCTYPE html>`, `<html lang="en">`, `<head>` with charset, viewport meta, and Tailwind CDN `<script>` tag
  - Add `<body>` with the `#app` wrapper div (centered column, `max-w-sm` on `md+`)
  - Add the four semantic child elements: `#reaction-display`, `#cat-image` (`<img>` with `alt="A cat"`), `#counter-display`, `#reset-button`
  - Apply Tailwind utility classes for layout: flex column, items-center, gap, padding
  - Leave `<style>` and `<script>` blocks empty (populated in later tasks)
  - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3_

- [x] 2. Add CSS keyframe animations in `<style>` block
  - [x] 2.1 Define all 8 `@keyframes` blocks and matching `.anim-*` classes
    - Write `@keyframes` and `.anim-*` class for each of the 8 reactions: `anim-bounce`, `anim-shake`, `anim-sway`, `anim-spin`, `anim-wobble`, `anim-pulse`, `anim-tilt`, `anim-zoom`
    - Each animation duration ≤ 500 ms with `animation-fill-mode: none`
    - _Requirements: 3.3, 3.4_

- [x] 3. Implement the JavaScript model — state variables and `reactionPool`
  - [x] 3.1 Declare state variables and define `reactionPool`
    - Declare `let clickCount = 0`, `let currentReaction = null`, `let lastReactionIndex = -1`
    - Define `const reactionPool` array with exactly 8 `Reaction` objects, each having `label`, `emoji`, and `animationClass` fields matching the design table
    - _Requirements: 2.2, 3.1, 3.2_

- [x] 4. Implement `pickReaction` pure function
  - [x] 4.1 Write `pickReaction(pool, lastIndex)` with no-repeat logic
    - Return `null` if `pool` is empty
    - When `pool.length >= 2`, exclude `lastIndex` from the candidate set before random selection (Fisher-Yates partial or index-exclusion approach)
    - When `pool.length === 1`, return `pool[0]` unconditionally
    - Return the selected `Reaction` object
    - _Requirements: 2.2, 2.4_

  - [ ]* 4.2 Write property test for `pickReaction` — Property 1: no-repeat when pool ≥ 2
    - **Property 1: Reaction selection never repeats immediately when pool is large enough**
    - **Validates: Requirements 2.4**
    - Use fast-check; generate arbitrary non-empty reaction arrays and valid `lastIndex` values
    - Assert `result.index !== lastIndex` for all pool sizes ≥ 2 (minimum 100 iterations)

  - [ ]* 4.3 Write property test for `pickReaction` — Property 2: result is always a pool member
    - **Property 2: Reaction selection always returns a valid pool member**
    - **Validates: Requirements 2.2, 3.1**
    - Use fast-check; generate arbitrary non-empty reaction arrays and arbitrary `lastIndex`
    - Assert `pool.includes(result)` for all inputs (minimum 100 iterations)

- [x] 5. Implement state mutation functions
  - [x] 5.1 Write `incrementCounter()` and `resetState()`
    - `incrementCounter()`: increment `clickCount` by 1, call `pickReaction(reactionPool, lastReactionIndex)`, update `currentReaction` and `lastReactionIndex`
    - `resetState()`: set `clickCount = 0`, `currentReaction = null`, `lastReactionIndex = -1`
    - _Requirements: 2.1, 2.2, 5.2, 5.3_

  - [ ]* 5.2 Write unit tests for state mutation functions
    - `incrementCounter` increases `clickCount` by exactly 1 per call
    - `resetState` sets `clickCount` to 0, `currentReaction` to null, `lastReactionIndex` to -1
    - _Requirements: 2.1, 5.2, 5.3_

- [x] 6. Checkpoint — verify pure logic before wiring DOM
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement view rendering functions
  - [-] 7.1 Write `renderCounter()`
    - Read `clickCount` and write it as an integer string (no decimal) into `#counter-display`
    - _Requirements: 4.1, 4.2, 4.3_

  - [-] 7.2 Write `renderReaction()`
    - Write `currentReaction.emoji + " " + currentReaction.label` into `#reaction-display` (empty string when `currentReaction` is null)
    - Remove any active `.anim-*` class from `#cat-image`, then re-add `currentReaction.animationClass` on the next `requestAnimationFrame` to restart the CSS animation
    - _Requirements: 2.3, 3.3, 3.4_

  - [-] 7.3 Write `renderReset()`
    - Clear `#reaction-display` text content
    - Remove any active `.anim-*` class from `#cat-image`
    - _Requirements: 5.3, 5.4_

  - [ ]* 7.4 Write unit tests for view rendering functions
    - `renderCounter` writes an integer string with no decimal point into `#counter-display`
    - `renderReaction` writes the correct `emoji + " " + label` and toggles the animation class
    - `renderReset` clears `#reaction-display` and removes all animation classes
    - _Requirements: 2.3, 4.3, 5.3, 5.4_

- [ ] 8. Implement event handlers and wire everything on `DOMContentLoaded`
  - [~] 8.1 Write `handleCatClick` and `handleResetClick` event handlers
    - `handleCatClick(event)`: call `incrementCounter()`, then `renderCounter()`, then `renderReaction()`
    - `handleResetClick(event)`: call `resetState()`, then `renderCounter()`, then `renderReset()`
    - _Requirements: 2.1, 2.2, 2.3, 5.1, 5.2, 5.3, 5.4_

  - [~] 8.2 Attach event listeners inside a `DOMContentLoaded` handler
    - Bind `handleCatClick` to `click` on `#cat-image`
    - Bind `handleResetClick` to `click` on `#reset-button`
    - Call `renderCounter()` on load to show initial count of 0
    - _Requirements: 2.1, 4.1, 5.1_

- [~] 9. Final checkpoint — full integration verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests (4.2, 4.3) require extracting `pickReaction` into a testable module or using JSDOM; because the final deliverable is a single HTML file, the simplest approach is to export the function in a separate `.js` file for testing only, keeping `index.html` self-contained
- All requirements are traceable through task references; the entire requirements document is covered
- The app must function via `file://` protocol — avoid any `import`/`export` in `index.html` itself; the `<script>` tag should be a plain (non-module) script

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["4.1"] },
    { "id": 4, "tasks": ["4.2", "4.3", "5.1"] },
    { "id": 5, "tasks": ["5.2"] },
    { "id": 6, "tasks": ["6"] },
    { "id": 7, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 8, "tasks": ["7.4", "8.1"] },
    { "id": 9, "tasks": ["8.2"] },
    { "id": 10, "tasks": ["9"] }
  ]
}
```
