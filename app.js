let players = [];
let currentPlayer = 0;

function startGame(mode) {
  players = [createPlayer("You")];
  if (mode === "single") players.push(createPlayer("Dr Bozward AI", true));
  else players.push(createPlayer("Player 2"));
  render();
}

function render() {
  const p = players[currentPlayer];
  document.body.innerHTML = `
    <h1>${p.name}</h1>
    <p>Stage: ${p.stage}</p>
    <p>Cash: ${p.cash}</p>
    <p>Revenue: ${p.revenue}</p>
    <button onclick="invest()">Invest</button>
    <button onclick="endTurnUI()">End Turn</button>
  `;
}

function invest() {
  let p = players[currentPlayer];
  p.cash -= 10;
  p.revenue += 5;
  render();
}

function endTurnUI() {
  let p = players[currentPlayer];
  endTurn(p);
  currentPlayer = (currentPlayer + 1) % players.length;

  if (players[currentPlayer].isAI) {
    aiTurn(players[currentPlayer]);
    endTurn(players[currentPlayer]);
    currentPlayer = (currentPlayer + 1) % players.length;
  }

  render();
}

startGame("single");
