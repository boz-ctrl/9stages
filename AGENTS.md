# AGENTS.md

This file provides instructions for AI agents (e.g. Codex) working on this repository.

## Core Principles

- Preserve separation of concerns:
  - `rules.js` = game logic
  - `app.js` = UI + interaction
- Do not merge logic and UI layers
- Avoid full rewrites unless explicitly instructed
- Extend incrementally
- Keep the game playable at all times

## Coding Guidelines

- Use plain JavaScript (no frameworks)
- Keep functions small and readable
- Prefer additive changes over refactoring existing stable logic
- Ensure all new features are reflected in UI

## Game Design Integrity

This project is based on the **9 Stages of Enterprise Development**.

Do not remove or fundamentally alter:

- Stage progression model
- Core business metrics
- Turn-based structure
- Resource constraints (cash, burn, etc.)

## Systems Currently Implemented

- Multi-market system
- Sector cards/events
- Funding and dilution
- Negotiation system
- AI personalities
- AI character abilities
- Economy balancing
- Win/loss conditions

## AI Characters

- Dr Bozward (Innovator)
- Dr Draycott (Aggressive)
- Dr Hyde (Conservative)

Each AI has a unique ability that must remain functional.

## When Adding Features

Ensure:

1. Rules are added to `rules.js`
2. UI controls are added to `app.js`
3. Styling is added to `style.css`
4. Documentation is updated in `README.md`

## Testing Requirements

After any change:

- Game loads without errors
- Actions execute correctly
- Turns advance correctly
- AI behaves without crashing
- Win conditions still trigger

## Next Priorities

- Character selection UI
- Ability display in dashboard
- Save/load functionality
- Multiplayer support
- Market grid expansion

## Important

This is not just a game — it is a **strategic simulation platform**.

Maintain clarity, extensibility, and educational value in all changes.
