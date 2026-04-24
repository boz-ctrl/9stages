let players=[];
let currentPlayer=0;
let turn=1;
let gameOver=false;

function startGame(mode){
  gameOver=false;
  turn=1;
  currentPlayer=0;
  players=[createPlayer("You",false,"balanced")];
  if(mode==="single"){
    players.push(createAIOpponent("innovator"));
    players.push(createAIOpponent("aggressive"));
  }else{
    players.push(createPlayer("Player 2",false,"balanced"));
  }
  addGlobalLog("New game started.");
  render();
}

function active(){return players[currentPlayer];}

function addGlobalLog(message){
  players.forEach(p=>p.log.unshift(message));
}

function money(value){return `£${Math.round(value)}k`;}

function render(){
  const p=active();
  document.getElementById("quarter").innerText=turn;
  document.getElementById("activePlayer").innerText=p.name;
  document.getElementById("actionPoints").innerText=p.ap;
  document.getElementById("companyName").innerText=p.name;
  document.getElementById("stageName").innerText=`Stage ${p.stage+1}: ${STAGES[p.stage]}`;
  document.getElementById("stageDescription").innerText=STAGE_DESCRIPTIONS[p.stage];
  document.getElementById("stageProgress").style.width=`${((p.stage+1)/STAGES.length)*100}%`;
  document.getElementById("sectorCard").innerHTML=`<div class="card-highlight">${p.lastCard}</div>`;

  renderMetrics(p);
  renderActions(p);
  renderPlayers();
  renderMarkets(p);
  renderLog(p);
}

function renderMetrics(p){
  const metrics=[
    ["Cash",money(p.cash)], ["Revenue",money(p.revenue)], ["Burn",money(p.burn)],
    ["Valuation",money(p.valuation)], ["Equity",`${p.equity}%`], ["Market Share",`${p.marketShare}%`],
    ["Innovation",p.innovation], ["Reputation",p.reputation], ["Talent",p.talent], ["Partnerships",p.partnerships]
  ];
  document.getElementById("metrics").innerHTML=metrics.map(([k,v])=>`<div class="metric-card"><span>${k}</span><strong>${v}</strong></div>`).join("");
}

function renderActions(p){
  document.getElementById("actionsList").innerHTML=Object.entries(ACTIONS).map(([key,a])=>{
    const disabled=p.isAI||gameOver||p.ap<a.ap||p.cash<a.cost;
    return `<button class="action-card" ${disabled?"disabled":""} onclick="doAction('${key}')">
      <strong>${a.label}</strong><span>${a.desc}</span><em>Cost ${money(a.cost)} · ${a.ap} AP</em>
    </button>`;
  }).join("");
}

function renderPlayers(){
  document.getElementById("playersList").innerHTML=players.map((p,i)=>`<div class="company-card ${i===currentPlayer?"active-company":""}">
    <div><strong>${p.name}</strong><span>${p.personality}${p.isAI?" AI":""}</span></div>
    <div>${STAGES[p.stage]} · ${money(p.valuation)}</div>
    <div class="mini-bars"><span style="width:${p.marketShare}%"></span></div>
  </div>`).join("");
}

function renderMarkets(p){
  const html=MARKETS.map(m=>{
    const share=p.marketShares[m.id]||0;
    const activeMarket=p.selectedMarket===m.id;
    return `<button class="market-card ${activeMarket?"selected":""}" onclick="selectMarket('${m.id}')">
      <strong>${m.name}</strong>
      <span>Growth ${(m.growth*100-100).toFixed(0)}% · Risk ${(m.risk*100).toFixed(0)}% · Regulation ${(m.regulation*100).toFixed(0)}%</span>
      <div class="mini-bars"><span style="width:${share}%"></span></div>
      <em>Your share: ${share}%</em>
    </button>`;
  }).join("");
  const panel=document.getElementById("winCondition");
  panel.innerHTML=`<strong>Selected market:</strong> ${getMarket(p.selectedMarket).name}<br><br>${html}`;
}

function renderLog(p){
  document.getElementById("eventLog").innerHTML=p.log.slice(0,12).map(item=>`<p>${item}</p>`).join("");
}

function selectMarket(id){
  if(gameOver)return;
  active().selectedMarket=id;
  active().log.unshift(`${active().name} focused on ${getMarket(id).name}.`);
  render();
}

function doAction(action){
  if(gameOver)return;
  const p=active();
  const result=applyAction(p,action,players);
  p.log.unshift(result);
  calculateValuation(p);
  render();
}

function endTurnUI(){
  if(gameOver)return;
  const p=active();
  const card=drawSectorCard(p);
  p.log.unshift(`Sector card: ${card}.`);
  endTurn(p);
  let win=checkWin(p,turn,players);
  if(win){finishGame(win);return;}

  currentPlayer=(currentPlayer+1)%players.length;
  while(players[currentPlayer].isAI && !gameOver){
    const ai=players[currentPlayer];
    aiTurn(ai,players);
    const aiCard=drawSectorCard(ai);
    ai.log.unshift(`Sector card: ${aiCard}.`);
    endTurn(ai);
    win=checkWin(ai,turn,players);
    if(win){finishGame(win);return;}
    currentPlayer=(currentPlayer+1)%players.length;
  }
  if(currentPlayer===0)turn++;
  render();
}

function finishGame(message){
  gameOver=true;
  addGlobalLog(`GAME OVER: ${message}`);
  render();
  setTimeout(()=>alert(message),50);
}

document.getElementById("newGameBtn").onclick=()=>startGame(document.getElementById("modeSelect").value);
document.getElementById("endTurnBtn").onclick=endTurnUI;

startGame("single");
