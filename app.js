let players=[];let currentPlayer=0;let turn=1;

function startGame(mode){players=[createPlayer("You")];if(mode==="single")players.push(createPlayer("Dr Bozward AI",true));else players.push(createPlayer("Player 2"));render();}

function render(){const p=players[currentPlayer];
document.getElementById("quarter").innerText=turn;
document.getElementById("activePlayer").innerText=p.name;
document.getElementById("actionPoints").innerText=p.ap;
document.getElementById("companyName").innerText=p.name;
document.getElementById("stageName").innerText=STAGES[p.stage];

document.getElementById("metrics").innerHTML=`Cash:${p.cash} Revenue:${p.revenue} Burn:${p.burn}<br>Innovation:${p.innovation} Reputation:${p.reputation} Valuation:${p.valuation}`;

const actions=["invest","marketing","hire","funding"];
document.getElementById("actionsList").innerHTML=actions.map(a=>`<button onclick="doAction('${a}')">${a}</button>`).join("");

const log=document.getElementById("eventLog");log.innerHTML=p.log.join("<br>");}

function doAction(a){let p=players[currentPlayer];let res=applyAction(p,a);p.log.push(res);render();}

function endTurnUI(){let p=players[currentPlayer];let card=drawSectorCard(p);p.log.push("Card:"+card);
endTurn(p);
let win=checkWin(p,turn);if(win)alert(win);

currentPlayer=(currentPlayer+1)%players.length;
if(players[currentPlayer].isAI){aiTurn(players[currentPlayer]);endTurn(players[currentPlayer]);currentPlayer=(currentPlayer+1)%players.length;}
turn++;
render();}

document.getElementById("newGameBtn").onclick=()=>startGame(document.getElementById("modeSelect").value);
document.getElementById("endTurnBtn").onclick=endTurnUI;

startGame("single");