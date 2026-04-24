const STAGES=["Discovery","Modeling","Startup","Existence","Survival","Success","Adaptation","Independence","Exit"];

function createPlayer(name,isAI=false){return{name,isAI,stage:0,cash:100,revenue:10,burn:5,talent:5,reputation:5,innovation:5,valuation:100,equity:100,ap:2,marketShare:5,log:[]}}

function calculateValuation(p){p.valuation=Math.round((p.revenue*10)+(p.innovation*5)+(p.reputation*3));}

function applyAction(p,action){if(p.ap<=0)return"No AP";
if(action==="invest"&&p.cash>=10){p.cash-=10;p.innovation+=3;p.revenue+=2;p.ap--;return"Invested"}
if(action==="marketing"&&p.cash>=8){p.cash-=8;p.reputation+=4;p.ap--;return"Marketing success"}
if(action==="hire"&&p.cash>=12){p.cash-=12;p.talent+=3;p.ap--;return"Hired talent"}
if(action==="funding"){let amount=50;let dilution=amount/(p.valuation+amount);p.cash+=amount;p.equity-=dilution*100;p.ap--;return"Raised funding"}
return"Action failed"}

function drawSectorCard(p){const cards=[
{t:"AI Boom",f:()=>p.innovation+=5},
{t:"Market Crash",f:()=>p.cash-=10},
{t:"Viral Growth",f:()=>p.revenue+=5},
{t:"Regulation",f:()=>p.reputation-=3}
];
const c=cards[Math.floor(Math.random()*cards.length)];c.f();return c.t}

function nextStage(p){if(p.revenue>20&&p.innovation>10&&p.stage<STAGES.length-1)p.stage++}

function endTurn(p){p.cash+=p.revenue-p.burn;calculateValuation(p);nextStage(p);p.ap=2}

function aiTurn(p){if(p.cash<20)applyAction(p,"funding");
else if(p.innovation<10)applyAction(p,"invest");
else applyAction(p,"marketing");}

function checkWin(p,turn){if(p.stage===8)return"Exit achieved";
if(p.valuation>2500)return"Unicorn achieved";
if(turn>=24)return"Time victory";
return null}
