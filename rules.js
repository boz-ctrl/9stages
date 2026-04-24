const STAGES = ["Discovery", "Modeling", "Startup", "Existence", "Survival", "Success", "Adaptation", "Independence", "Exit"];

const STAGE_DESCRIPTIONS = [
  "Find and test a credible opportunity.",
  "Design the business model and route to market.",
  "Launch the first operating version of the venture.",
  "Win customers and prove repeatable demand.",
  "Reach cash discipline and survive pressure.",
  "Scale what works without losing control.",
  "Adapt to shocks, regulation and competitors.",
  "Build defensible market independence.",
  "Prepare acquisition, IPO, succession or legacy exit."
];

const MARKETS = [
  { id: "frontier", name: "Frontier Tech", growth: 1.18, risk: 0.18, regulation: 0.12 },
  { id: "health", name: "HealthTech", growth: 1.10, risk: 0.16, regulation: 0.28 },
  { id: "finance", name: "FinTech", growth: 1.12, risk: 0.22, regulation: 0.25 },
  { id: "education", name: "EdTech", growth: 1.08, risk: 0.12, regulation: 0.14 },
  { id: "sustainability", name: "Sustainability", growth: 1.14, risk: 0.15, regulation: 0.18 }
];

const ACTIONS = {
  invest: { label: "Invest in Product", cost: 14, ap: 1, desc: "Boost innovation and revenue." },
  research: { label: "Research Innovation", cost: 12, ap: 1, desc: "Create IP and unlock stage progress." },
  marketing: { label: "Marketing Campaign", cost: 10, ap: 1, desc: "Improve reputation and market share." },
  hire: { label: "Hire Talent", cost: 16, ap: 1, desc: "Increase capability and execution." },
  costs: { label: "Reduce Costs", cost: 0, ap: 1, desc: "Lower burn, with a small reputation risk." },
  funding: { label: "Raise Funding", cost: 0, ap: 1, desc: "Gain cash in exchange for equity dilution." },
  expand: { label: "Expand Market", cost: 18, ap: 1, desc: "Grow share in the selected market." },
  negotiate: { label: "Negotiate Partnership", cost: 5, ap: 1, desc: "Attempt a deal with another company." }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createPlayer(name, isAI = false, personality = "balanced") {
  return {
    name,
    isAI,
    personality,
    stage: 0,
    cash: 120,
    revenue: 12,
    burn: 7,
    talent: 6,
    reputation: 6,
    innovation: personality === "innovator" ? 10 : 6,
    valuation: 130,
    equity: 100,
    ap: 2,
    marketShare: 5,
    selectedMarket: "frontier",
    marketShares: { frontier: 5, health: 0, finance: 0, education: 0, sustainability: 0 },
    partnerships: 0,
    lastCard: "No sector card drawn yet.",
    log: []
  };
}

function createAIOpponent(personality = "innovator") {
  if (personality === "innovator") return createPlayer("Dr Bozward", true, "innovator");
  if (personality === "aggressive") return createPlayer("Aggressive Scale AI", true, "aggressive");
  if (personality === "conservative") return createPlayer("Conservative Operator AI", true, "conservative");
  return createPlayer("Balanced AI", true, "balanced");
}

function calculateValuation(p) {
  const quality = (p.innovation * 5) + (p.reputation * 4) + (p.talent * 3);
  const market = p.marketShare * 8;
  const earnings = Math.max(0, p.revenue - p.burn) * 18;
  const equityPenalty = (100 - p.equity) * 2;
  p.valuation = Math.round(clamp(quality + market + earnings - equityPenalty, 50, 3000));
}

function applyAction(p, action, players = []) {
  const config = ACTIONS[action];
  if (!config) return "Unknown action.";
  if (p.ap < config.ap) return "Not enough action points.";
  if (p.cash < config.cost) return "Not enough cash.";

  p.cash -= config.cost;
  p.ap -= config.ap;

  if (action === "invest") {
    p.innovation += 3;
    p.revenue += 2;
    p.burn += 1;
    return `${p.name} invested in product development.`;
  }
  if (action === "research") {
    p.innovation += 5;
    p.talent += 1;
    return `${p.name} created new intellectual property.`;
  }
  if (action === "marketing") {
    p.reputation += 4;
    p.marketShare += 2;
    p.marketShares[p.selectedMarket] = clamp((p.marketShares[p.selectedMarket] || 0) + 2, 0, 60);
    return `${p.name} improved brand visibility.`;
  }
  if (action === "hire") {
    p.talent += 4;
    p.burn += 2;
    return `${p.name} hired stronger talent.`;
  }
  if (action === "costs") {
    p.burn = Math.max(2, p.burn - 3);
    p.reputation = Math.max(0, p.reputation - 1);
    return `${p.name} reduced operating costs.`;
  }
  if (action === "funding") {
    calculateValuation(p);
    const amount = Math.round(55 + p.stage * 18 + p.reputation * 2);
    const dilution = clamp((amount / (p.valuation + amount)) * 100, 4, 28);
    p.cash += amount;
    p.equity = clamp(p.equity - dilution, 35, 100);
    p.reputation += 1;
    return `${p.name} raised £${amount}k and diluted ownership by ${dilution.toFixed(1)}%.`;
  }
  if (action === "expand") {
    p.marketShare += 4;
    p.revenue += 3;
    p.burn += 1;
    p.marketShares[p.selectedMarket] = clamp((p.marketShares[p.selectedMarket] || 0) + 5, 0, 70);
    return `${p.name} expanded in ${getMarket(p.selectedMarket).name}.`;
  }
  if (action === "negotiate") {
    return negotiatePartnership(p, players);
  }
  return "Action completed.";
}

function getMarket(id) {
  return MARKETS.find(m => m.id === id) || MARKETS[0];
}

function negotiatePartnership(p, players) {
  const target = players.find(other => other !== p && other.cash > 0);
  if (!target) return "No negotiation target available.";
  const offerScore = p.reputation + p.innovation + p.partnerships * 2;
  const targetCaution = target.personality === "conservative" ? 22 : target.personality === "aggressive" ? 18 : 15;
  if (offerScore >= targetCaution) {
    p.partnerships += 1;
    p.reputation += 2;
    p.revenue += 3;
    target.reputation += 1;
    return `${p.name} negotiated a partnership with ${target.name}.`;
  }
  p.reputation = Math.max(0, p.reputation - 1);
  return `${p.name}'s negotiation with ${target.name} failed.`;
}

function drawSectorCard(p) {
  const market = getMarket(p.selectedMarket);
  const cards = [
    { title: `${market.name} Demand Surge`, effect: () => { p.revenue += Math.round(4 * market.growth); p.marketShare += 1; } },
    { title: `${market.name} Compliance Pressure`, effect: () => { p.cash -= Math.round(8 * market.regulation * 4); p.reputation -= 1; } },
    { title: "Talent Bottleneck", effect: () => { p.burn += 1; p.talent = Math.max(0, p.talent - 1); } },
    { title: "Platform Breakthrough", effect: () => { p.innovation += 4; p.valuation += 20; } },
    { title: "Competitor Price War", effect: () => { p.revenue = Math.max(0, p.revenue - 3); p.marketShare = Math.max(0, p.marketShare - 1); } }
  ];
  const card = cards[Math.floor(Math.random() * cards.length)];
  card.effect();
  p.lastCard = card.title;
  return card.title;
}

function nextStage(p) {
  const requirements = [
    p.innovation >= 8 && p.reputation >= 6,
    p.innovation >= 12 && p.revenue >= 14,
    p.revenue >= 18 && p.talent >= 8,
    p.revenue >= 24 && p.marketShare >= 10,
    p.cash >= 80 && p.revenue > p.burn,
    p.valuation >= 500 && p.marketShare >= 18,
    p.innovation >= 28 && p.reputation >= 20,
    p.valuation >= 1200 && p.equity >= 45,
    false
  ];
  if (requirements[p.stage] && p.stage < STAGES.length - 1) {
    p.stage += 1;
    p.log.unshift(`${p.name} advanced to Stage ${p.stage + 1}: ${STAGES[p.stage]}.`);
  }
}

function balanceEconomy(p) {
  p.cash = Math.round(clamp(p.cash, -75, 2000));
  p.revenue = Math.round(clamp(p.revenue, 0, 220));
  p.burn = Math.round(clamp(p.burn, 2, 160));
  p.innovation = Math.round(clamp(p.innovation, 0, 100));
  p.reputation = Math.round(clamp(p.reputation, 0, 100));
  p.talent = Math.round(clamp(p.talent, 0, 100));
  p.marketShare = Math.round(clamp(p.marketShare, 0, 75));
  p.equity = Math.round(clamp(p.equity, 35, 100));
}

function endTurn(p) {
  const profit = p.revenue - p.burn;
  p.cash += profit;
  const market = getMarket(p.selectedMarket);
  p.revenue = Math.round(p.revenue * (0.96 + (market.growth - 1) * 0.35));
  if (p.marketShare > 35) p.burn += 2;
  if (p.cash < 0) { p.reputation = Math.max(0, p.reputation - 2); p.burn += 1; }
  balanceEconomy(p);
  calculateValuation(p);
  nextStage(p);
  p.ap = 2;
}

function aiTurn(p, players) {
  const priorities = {
    innovator: p.innovation < 30 ? "research" : p.marketShare < 18 ? "expand" : "invest",
    aggressive: p.cash > 45 ? "expand" : "funding",
    conservative: p.cash < 70 ? "costs" : p.revenue < p.burn + 10 ? "marketing" : "hire",
    balanced: p.cash < 35 ? "funding" : p.innovation < 15 ? "invest" : "marketing"
  };
  let first = priorities[p.personality] || priorities.balanced;
  let result = applyAction(p, first, players);
  if (result.includes("Not enough") || result.includes("failed")) result = applyAction(p, "funding", players);
  p.log.unshift(result);
}

function checkWin(p, turn, players) {
  if (p.stage === 8) return `${p.name} achieved a successful exit.`;
  if (p.valuation >= 2500) return `${p.name} achieved unicorn status.`;
  if (turn >= 24) {
    const leader = [...players].sort((a, b) => b.valuation - a.valuation)[0];
    return `${leader.name} wins after 24 quarters with the highest valuation.`;
  }
  if (p.cash <= -75) return `${p.name} has become insolvent.`;
  return null;
}
