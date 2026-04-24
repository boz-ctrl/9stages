# Empire Lifecycle: 9 Stages

A browser-based turn-based business strategy game built around the **9 Stages of Enterprise Development**.

Players build and grow a company from opportunity discovery through to exit while managing cash, revenue, burn, innovation, reputation, talent, equity, valuation, markets and competitors.

## Current Version

Production-ready prototype / playable browser build.

## How to Run

Open `index.html` in a modern web browser.

No build step is required. The game uses plain HTML, CSS and JavaScript.

## Game Modes

### Single Player
The player competes against AI opponents:

- **Dr Bozward** — Innovator AI
- **Dr Draycott** — Aggressive AI

### Local Multiplayer / Hotseat
Two human players can take turns on the same machine.

## The 9 Stages

1. Discovery
2. Modeling
3. Startup
4. Existence
5. Survival
6. Success
7. Adaptation
8. Independence
9. Exit

Progression is based on performance thresholds including innovation, reputation, revenue, talent, market share, valuation, cash and equity retained.

## Core Player Metrics

Each company tracks:

- Cash
- Revenue
- Burn
- Talent
- Reputation
- Innovation
- Valuation
- Equity retained
- Action points
- Market share
- Partnerships
- Selected market
- Stage

## Strategic Actions

Players can choose from:

- Invest in Product
- Research Innovation
- Marketing Campaign
- Hire Talent
- Reduce Costs
- Raise Funding
- Expand Market
- Negotiate Partnership

Each action has a cost and action point requirement.

## Funding System

Raising funding gives the player additional cash but reduces ownership through equity dilution.

Funding outcomes are linked to valuation, stage and reputation.

## Markets

The game currently includes five sectors:

- Frontier Tech
- HealthTech
- FinTech
- EdTech
- Sustainability

Each market has different growth, risk and regulation values. Players can select a market and expand market share within it.

## Sector Cards

Each turn may trigger market events such as:

- Demand Surge
- Compliance Pressure
- Talent Bottleneck
- Platform Breakthrough
- Competitor Price War

These events affect cash, reputation, revenue, innovation, talent and market share.

## Negotiation System

Players can negotiate partnerships with other companies.

Successful partnerships improve reputation and revenue. Failed negotiations may damage reputation.

Negotiation success depends on reputation, innovation, existing partnerships and the target's strategic personality.

## AI Characters and Abilities

### Dr Bozward — Innovator
**Ability: Breakthrough Thinking**

Every 3 quarters, Dr Bozward gains:

- +3 Innovation
- +1 Reputation

Strategic behaviour: prioritises research, IP creation and innovation-led growth.

### Dr Draycott — Aggressive
**Ability: Market Blitz**

Expansion actions gain extra market share but increase burn.

Strategic behaviour: prioritises rapid expansion and growth through market capture.

### Dr Hyde — Conservative
**Ability: Operational Discipline**

Reduces burn and softens some crisis penalties.

Strategic behaviour: prioritises cost control, resilience and operational survival.

### Balanced AI
Baseline strategy with no special ability.

## Win Conditions

A company can win by:

- Reaching the Exit stage
- Achieving unicorn valuation status
- Leading by valuation after 24 quarters

A company may lose through insolvency.

## File Structure

```text
index.html   # Game layout and browser entry point
style.css    # Dashboard styling and visual design
rules.js     # Game rules, actions, AI, markets, abilities and win conditions
app.js       # UI rendering, event handling and game flow
README.md    # Project documentation
AGENTS.md    # Instructions for Codex/future AI agents
```

## Architecture

The project deliberately separates responsibilities:

- `rules.js` contains the game logic and rules engine.
- `app.js` handles rendering and UI interaction.
- `style.css` controls presentation.
- `index.html` provides the persistent dashboard structure.

Do not merge rules and UI logic.

## Development Roadmap

High-value next improvements:

1. Add character selection screen
2. Display AI ability cooldowns visually
3. Add save/load game state
4. Add a 9x9 market domination grid
5. Add online multiplayer with WebSockets
6. Add a richer deal-builder negotiation interface
7. Add onboarding/tutorial prompts
8. Add balancing tests and scenario presets

## Project Purpose

This game can be used as:

- An entrepreneurship teaching simulation
- A business strategy training tool
- A foundation for an executive education game
- A prototype for a commercial SaaS simulation product
