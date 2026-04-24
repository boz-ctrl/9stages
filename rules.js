const STAGES = [
  "Discovery","Modeling","Startup","Existence","Survival",
  "Success","Adaptation","Independence","Exit"
];

function createPlayer(name, isAI=false) {
  return {
    name,
    isAI,
    stage: 0,
    cash: 100,
    revenue: 10,
    burn: 5,
    talent: 5,
    reputation: 5,
    innovation: 5,
    valuation: 100,
    equity: 100,
    ap: 2,
    marketShare: 5
  };
}

function nextStage(player) {
  if (player.revenue > 20 && player.stage < STAGES.length-1) {
    player.stage++;
  }
}

function endTurn(player) {
  player.cash += player.revenue - player.burn;
  nextStage(player);
  player.ap = 2;
}

function aiTurn(player) {
  if (player.cash < 20) player.burn -= 1;
  else player.revenue += 2;
}
