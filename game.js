const FARM_SIZE=16,SAVE_KEY="cjajlkFarmV1",BACKUP_KEY="cjajlkFarmV1_backup",FEED_MS=10*60*1000;
let RESETTING_GAME=false;
const CROPS={wheat:{name:"Blé",ready:"🌾",price:15,sell:28,time:2*60*1000,level:1},carrot:{name:"Carotte",ready:"🥕",price:35,sell:68,time:5*60*1000,level:3},corn:{name:"Maïs",ready:"🌽",price:70,sell:140,time:10*60*1000,level:6}};
const BUILDINGS={barn:{name:"Grange",emoji:"🏚️",price:450,level:2,kind:"buildings"},coop:{name:"Poulailler",emoji:"🐔",price:1000,level:5,kind:"buildings"},stable:{name:"Étable",emoji:"🐄",price:3000,level:10,kind:"buildings"},mill:{name:"Moulin",emoji:"⚙️",price:1600,level:9,kind:"buildings"},pond:{name:"Étang",emoji:"💧",price:5000,level:15,kind:"water"},sawmill:{name:"Scierie",emoji:"🪚",price:1400,level:4,kind:"special",zoneType:"forest"},miner:{name:"Atelier minier",emoji:"🛠️",price:2500,level:8,kind:"special",zoneType:"mine"}};
const BUILDING_FOOTPRINTS={barn:[2,2],coop:[2,2],stable:[2,2],mill:[2,2],pond:[2,2],sawmill:[2,2],miner:[2,2]};
const DECORS={
 tree_green:{name:"Arbre vert",img:"assets/decorations/trees/tree_green_01.png",level:1,price:2,group:"Arbres"},
 tree_green_02:{name:"Arbre feuillu",img:"assets/decorations/trees/tree_green_02.png",level:2,price:2,group:"Arbres"},
 tree_apple:{name:"Pommier",img:"assets/decorations/trees/tree_apple.png",level:2,price:3,group:"Arbres"},
 tree_cherry:{name:"Cerisier",img:"assets/decorations/trees/tree_cherry.png",level:3,price:4,group:"Arbres"},
 tree_sapling:{name:"Jeune arbre",img:"assets/decorations/trees/tree_sapling.png",level:1,price:1,group:"Arbres"},
 tree_autumn:{name:"Arbre automnal",img:"assets/decorations/trees/tree_autumn.png",level:4,price:4,group:"Arbres"},
 tree_pine:{name:"Sapin",img:"assets/decorations/trees/tree_pine.png",level:4,price:4,group:"Arbres"},
 tree_pine_snow:{name:"Sapin enneigé",img:"assets/decorations/trees/tree_pine_snow.png",level:7,price:6,group:"Arbres"},
 tree_palm:{name:"Palmier",img:"assets/decorations/trees/tree_palm.png",level:8,price:7,group:"Arbres"},
 tree_willow:{name:"Saule",img:"assets/decorations/trees/tree_willow.png",level:6,price:6,group:"Arbres"},
 path_stone:{name:"Chemin de pierre",img:"assets/terrain/paths/path_stone.png",level:1,price:1,group:"Chemins"},
 path_vertical:{name:"Chemin vertical",img:"assets/terrain/paths/path_straight_vertical.png",level:1,price:1,group:"Chemins"},
 path_horizontal:{name:"Chemin horizontal",img:"assets/terrain/paths/path_straight_horizontal.png",level:2,price:1,group:"Chemins"},
 path_corner:{name:"Virage",img:"assets/terrain/paths/path_corner.png",level:2,price:1,group:"Chemins"},
 path_t:{name:"Jonction en T",img:"assets/terrain/paths/path_t_junction.png",level:3,price:1,group:"Chemins"},
 path_cross:{name:"Croisement",img:"assets/terrain/paths/path_cross.png",level:3,price:1,group:"Chemins"},
 path_end:{name:"Fin de chemin",img:"assets/terrain/paths/path_end.png",level:4,price:1,group:"Chemins"},
 path_autumn:{name:"Chemin automnal",img:"assets/terrain/paths/path_autumn.png",level:5,price:1,group:"Chemins"},
 border_fence:{name:"Clôture bois",img:"assets/terrain/borders/border_fence_wood.png",level:2,price:2,group:"Bordures"},
 border_grass_straight:{name:"Bordure herbe",img:"assets/terrain/borders/border_grass_straight.png",level:2,price:2,group:"Bordures"},
 border_grass_corner:{name:"Coin herbe",img:"assets/terrain/borders/border_grass_corner.png",level:3,price:2,group:"Bordures"},
 border_stone_straight:{name:"Muret pierre",img:"assets/terrain/borders/border_stone_straight.png",level:3,price:2,group:"Bordures"},
 border_stone_corner:{name:"Coin pierre",img:"assets/terrain/borders/border_stone_corner.png",level:4,price:2,group:"Bordures"},
 border_hedge:{name:"Haie fleurie",img:"assets/terrain/borders/border_hedge_flowers.png",level:4,price:3,group:"Bordures"},
 border_logs:{name:"Rondins",img:"assets/terrain/borders/border_logs.png",level:5,price:3,group:"Bordures"},
 border_cliff:{name:"Falaise",img:"assets/terrain/borders/border_cliff.png",level:7,price:3,group:"Bordures"},
 water_pond:{name:"Petit étang",img:"assets/terrain/water/water_pond.png",level:3,price:4,group:"Eau"},
 water_stream:{name:"Ruisseau rocheux",img:"assets/terrain/water/water_stream_rocks.png",level:3,price:3,group:"Eau"},
 water_lilies:{name:"Nénuphars",img:"assets/terrain/water/water_pond_lilies.png",level:5,price:4,group:"Eau"},
 water_shore:{name:"Bord d’eau",img:"assets/terrain/water/water_shore_straight.png",level:3,price:2,group:"Eau"},
 water_corner:{name:"Coin d’eau",img:"assets/terrain/water/water_shore_corner.png",level:4,price:2,group:"Eau"},
 water_island:{name:"Îlot",img:"assets/terrain/water/water_pond_island.png",level:6,price:5,group:"Eau"},
 water_fall:{name:"Cascade",img:"assets/terrain/water/water_waterfall.png",level:8,price:7,group:"Eau"},
 water_river_corner:{name:"Virage rivière",img:"assets/terrain/water/water_river_corner.png",level:5,price:3,group:"Eau"},
 chicken_rooster:{name:"Coq",img:"assets/animals/chicken/chicken_rooster.png",level:3,price:2,group:"Animaux"},
 chicken_hen_brown:{name:"Poule brune",img:"assets/animals/chicken/chicken_hen_brown.png",level:3,price:2,group:"Animaux"},
 chicken_hen_white:{name:"Poule blanche",img:"assets/animals/chicken/chicken_hen_white.png",level:3,price:2,group:"Animaux"},
 chicken_hen_eating:{name:"Poule qui picore",img:"assets/animals/chicken/chicken_hen_brown_eating.png",level:4,price:2,group:"Animaux"},
 chicken_chick:{name:"Poussin",img:"assets/animals/chicken/chicken_chick.png",level:4,price:2,group:"Animaux"},
 chicken_chicks:{name:"Poussins",img:"assets/animals/chicken/chicken_chicks.png",level:5,price:2,group:"Animaux"},
 chicken_chick_eating:{name:"Poussin qui picore",img:"assets/animals/chicken/chicken_chick_eating.png",level:5,price:2,group:"Animaux"},
 cow_standing_01:{name:"Vache 1",img:"assets/animals/cow/cow_standing_01.png",level:4,price:2,group:"Animaux"},
 cow_standing_02:{name:"Vache 2",img:"assets/animals/cow/cow_standing_02.png",level:4,price:2,group:"Animaux"},
 cow_standing_03:{name:"Vache 3",img:"assets/animals/cow/cow_standing_03.png",level:5,price:2,group:"Animaux"},
 cow_resting_01:{name:"Vache couchée 1",img:"assets/animals/cow/cow_resting_01.png",level:5,price:2,group:"Animaux"},
 cow_resting_02:{name:"Vache couchée 2",img:"assets/animals/cow/cow_resting_02.png",level:6,price:2,group:"Animaux"},
 cow_eating:{name:"Vache qui mange",img:"assets/animals/cow/cow_eating.png",level:6,price:2,group:"Animaux"},
 fish_blue:{name:"Poisson bleu",img:"assets/animals/fish/fish_blue.png",level:3,price:2,group:"Animaux"},
 fish_blue_carp:{name:"Carpe bleue",img:"assets/animals/fish/fish_blue_carp.png",level:4,price:2,group:"Animaux"},
 fish_catfish:{name:"Poisson-chat",img:"assets/animals/fish/fish_catfish.png",level:4,price:2,group:"Animaux"},
 fish_golden_carp:{name:"Carpe dorée",img:"assets/animals/fish/fish_golden_carp.png",level:5,price:2,group:"Animaux"},
 fish_goldfish:{name:"Poisson rouge",img:"assets/animals/fish/fish_goldfish.png",level:3,price:2,group:"Animaux"},
 fish_koi_black:{name:"Koï noire",img:"assets/animals/fish/fish_koi_black.png",level:6,price:2,group:"Animaux"},
 fish_koi_red:{name:"Koï rouge",img:"assets/animals/fish/fish_koi_red.png",level:5,price:2,group:"Animaux"},
 fish_koi_white:{name:"Koï blanche",img:"assets/animals/fish/fish_koi_white.png",level:6,price:2,group:"Animaux"},
 fish_perch:{name:"Perche",img:"assets/animals/fish/fish_perch.png",level:4,price:2,group:"Animaux"},
 fish_pike:{name:"Brochet",img:"assets/animals/fish/fish_pike.png",level:6,price:2,group:"Animaux"},
 fish_silver:{name:"Poisson argenté",img:"assets/animals/fish/fish_silver.png",level:5,price:2,group:"Animaux"},
 fish_trout:{name:"Truite",img:"assets/animals/fish/fish_trout.png",level:4,price:2,group:"Animaux"}
};
const UPGRADE_COSTS={barn:[0,900,2200],coop:[0,1800,4200],stable:[0,4500,9000],pond:[0,7000,14000],mill:[0,3000,6500],sawmill:[0,2600,5600],miner:[0,4200,9000]};
const UPGRADE_LEVELS={barn:[0,11,21],coop:[0,13,23],stable:[0,18,28],pond:[0,22,30],mill:[0,12,24],sawmill:[0,14,25],miner:[0,17,27]};
const EXPANSION_COSTS={5:300,6:500,7:800,8:1200,9:1800,10:2600,11:3800,12:5500,13:8000,14:11500,15:16000};
const ZONES={main:{name:"Ferme principale",emoji:"🌾",type:"farm",cost:0,start:5,level:1},prairie:{name:"Prairie sauvage",emoji:"🌿",type:"farm",cost:1200,start:4,level:7},forest:{name:"Bois enchanté",emoji:"🌲",type:"forest",cost:1800,start:5,level:4},mine:{name:"Mine ancienne",emoji:"⛏️",type:"mine",cost:3500,start:5,level:8},freeA:{name:"Terrain libre A",emoji:"🗺️",type:"free",cost:9000,start:5,level:20},freeB:{name:"Terrain libre B",emoji:"🗺️",type:"free",cost:18000,start:5,level:30}};
function emptyTile(){return{state:"grass",crop:null,plantedAt:null,building:null,resource:null,startedAt:null,decor:null,decorRotation:0}}
function emptyFarm(){return Array.from({length:FARM_SIZE},()=>Array.from({length:FARM_SIZE},emptyTile))}
function normTile(t={}){if("s" in t&&!t.state){let map={grass:"grass",soil:"plowed",crop:"planted",ready:"ready",sapling:"sapling",tree:"tree",mining:"mining",ore:"ore",mushroom:"mushroom",mushready:"mushready"};return{state:map[t.s]||"grass",crop:t.crop||null,plantedAt:t.at||null,building:t.building||null,resource:t.ore||null,startedAt:t.at||null}}return{...emptyTile(),...t,decor:t.decor||null,decorRotation:Number(t.decorRotation)||0}}
function normFarm(f){let out=emptyFarm();if(!Array.isArray(f))return out;let h=Math.min(FARM_SIZE,f.length||0),w=Math.min(FARM_SIZE,Math.max(0,...f.map(r=>Array.isArray(r)?r.length:0)));let ox=w<=10?Math.floor((FARM_SIZE-w)/2):0,oy=h<=10?Math.floor((FARM_SIZE-h)/2):0;for(let y=0;y<h;y++)for(let x=0;x<Math.min(w,f[y]?.length||0);x++)out[y+oy][x+ox]=normTile(f[y][x]);return out}
let game={version:45,orders:[],ordersDone:0,mineSupplies:{charge:0,spore:0},forestSupplies:{sapling:0},mastery:{farm:0,animal:0,forest:0,mine:0},missions:[],missionsDone:0,money:250,level:1,xp:0,selectedTool:"plow",selectedCrop:"wheat",selectedBuilding:"barn",selectedDecor:"tree_green",buildTab:"buildings",mineMode:"ore",moveSource:null,seeds:{wheat:3,carrot:2,corn:1},stock:{wheat:0,carrot:0,corn:0,eggs:0,milk:0,fish:0,feed:0,wood:0,plank:0,stone:0,iron:0,diamond:0,ruby:0,mushroom:0,flour:0,cheese:0,ingot:0},chickens:0,cows:0,fishCount:0,lastEggAt:Date.now(),lastMilkAt:Date.now(),lastFishAt:Date.now(),fedUntil:{coop:0,stable:0,pond:0},buildingLevels:{barn:1,coop:1,stable:1,pond:1,mill:1},autoFeed:false,currentZone:"main",zones:{}};
function freshZones(){let z={};for(const[k,d]of Object.entries(ZONES))z[k]={unlocked:k==="main",type:d.type,size:d.start,farm:emptyFarm(),buildingLevels:{}};return z}
function migrate(raw){let d={...raw};let zones=freshZones();let v20=raw?.zones&&Object.values(raw.zones).some(z=>z&&typeof z.size==="number");
 if(v20){for(const k of Object.keys(zones)){let o=raw.zones?.[k];if(o){zones[k]={...zones[k],...o,farm:normFarm(o.farm)}}}zones.main.farm=normFarm(raw.zones?.main?.farm||raw.farm||zones.main.farm);zones.main.size=Math.max(zones.main.size,Math.min(FARM_SIZE,raw.zones?.main?.size||raw.expansionLevel+5||ZONES.main.start));}
 else {zones.main.farm=normFarm(raw.farm);zones.main.size=Math.min(FARM_SIZE,5+(raw.expansionLevel||0));if(raw.zones?.prairie){zones.prairie={...zones.prairie,...raw.zones.prairie,size:Math.min(FARM_SIZE,4+(raw.zones.prairie.expansionLevel||0)),farm:normFarm(raw.zones.prairie.farm)}}}
 for(const [zk,z] of Object.entries(zones)){
  z.buildingLevels={...(z.buildingLevels||{})};
  for(const row of z.farm)for(const t of row)if(t.building&&!z.buildingLevels[t.building]){
    z.buildingLevels[t.building]=(raw.buildingLevels&&raw.buildingLevels[t.building])||1;
  }
}
 // V44 : anciennes sauvegardes pouvaient contenir plusieurs bâtiments spéciaux identiques.
 for(const z of Object.values(zones)){
   const seen=new Set();
   for(const row of z.farm)for(const t of row){
     if(!t.building)continue;
     if(seen.has(t.building)){ Object.assign(t,emptyTile()); } else seen.add(t.building);
   }
 }
d.version=45;d.mineSupplies={charge:0,spore:0,...(raw.mineSupplies||{})};d.forestSupplies={sapling:0,...(raw.forestSupplies||{})};d.mastery={farm:0,animal:0,forest:0,mine:0,...(raw.mastery||{})};d.missions=Array.isArray(raw.missions)?raw.missions:[];d.missionsDone=raw.missionsDone||0;d.orders=Array.isArray(raw.orders)?raw.orders:[];d.ordersDone=raw.ordersDone||0;d.zones=zones;d.currentZone=raw.currentZone||raw.current||"main";if(!zones[d.currentZone]?.unlocked)d.currentZone="main";d.seeds={wheat:3,carrot:2,corn:1,...(raw.seeds||{})};d.stock={...game.stock,...(raw.stock||{})};d.chickens=raw.chickens||0;d.cows=raw.cows||0;d.fishCount=raw.fishCount||0;d.lastEggAt=raw.lastEggAt||Date.now();d.lastMilkAt=raw.lastMilkAt||Date.now();d.lastFishAt=raw.lastFishAt||Date.now();d.fedUntil={coop:0,stable:0,pond:0,...(raw.fedUntil||{})};d.buildingLevels={barn:1,coop:1,stable:1,pond:1,mill:1,...(raw.buildingLevels||{})};d.autoFeed=!!raw.autoFeed;d.mineMode=raw.mineMode||"ore";d.selectedDecor=raw.selectedDecor||"tree_green";d.moveSource=null;return d}
function load(){let s=localStorage.getItem(SAVE_KEY);if(!s){game.zones=freshZones();return}try{game={...game,...migrate(JSON.parse(s))}}catch(e){game.zones=freshZones()}}
function save(){if(RESETTING_GAME)return;game.savedAt=Date.now();let data=JSON.stringify(game);try{let prev=localStorage.getItem(SAVE_KEY);if(prev)localStorage.setItem(BACKUP_KEY,prev);localStorage.setItem(SAVE_KEY,data)}catch(e){console.error("Sauvegarde impossible",e)}}
function zone(){return game.zones[game.currentZone]}function farm(){return zone().farm}function size(){return zone().size}function unlockBounds(){let n=Math.max(1,Math.min(FARM_SIZE,size())),start=Math.floor((FARM_SIZE-n)/2);return{start,end:start+n}}function unlocked(x,y){let b=unlockBounds();return x>=b.start&&x<b.end&&y>=b.start&&y<b.end}
function buildingFootprint(k){return BUILDING_FOOTPRINTS[k]||[1,1]}
function buildingAtCell(x,y,z=zone()){for(let ay=0;ay<FARM_SIZE;ay++)for(let ax=0;ax<FARM_SIZE;ax++){let k=z.farm[ay][ax]?.building;if(!k)continue;let[w,h]=buildingFootprint(k);if(x>=ax&&x<ax+w&&y>=ay&&y<ay+h)return{x:ax,y:ay,key:k,tile:z.farm[ay][ax]}}return null}
function footprintFree(x,y,k,z=zone(),ignore=null){let[w,h]=buildingFootprint(k),n=Math.max(1,Math.min(FARM_SIZE,z.size)),st=Math.floor((FARM_SIZE-n)/2),en=st+n;if(x<st||y<st||x+w>en||y+h>en)return false;for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){if(ignore&&xx===ignore.x&&yy===ignore.y)continue;let t=z.farm[yy][xx];if(t.building||t.state!=="grass")return false;let hit=buildingAtCell(xx,yy,z);if(hit&&(!ignore||hit.x!==ignore.x||hit.y!==ignore.y))return false}return true}
function msg(t){document.getElementById("message").textContent=t}
function toast(t,type="warn"){let el=document.getElementById("game-toast");if(!el){el=document.createElement("div");el.id="game-toast";document.body.appendChild(el)}el.className=`game-toast ${type} show`;el.textContent=t;clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600)}
function missing(t){msg(t);toast(t,"warn")}
function success(t){msg(t);toast(t,"ok")}
function cropUnlocked(k){return game.level>=CROPS[k].level}function farmZones(){return Object.values(game.zones).filter(z=>z.unlocked&&z.type==="farm").map(z=>z.farm)}
function hasBuilding(k){return Object.values(game.zones).some(z=>z.unlocked&&z.farm.some(r=>r.some(t=>t.building===k)))}
function zoneHasBuilding(k,z=zone()){return z.farm.some(r=>r.some(t=>t.building===k))}
function zoneBLevel(k,z=zone()){return zoneHasBuilding(k,z)?((z.buildingLevels||{})[k]||1):0}
function bLevel(k){let levels=Object.values(game.zones).filter(z=>z.unlocked&&zoneHasBuilding(k,z)).map(z=>zoneBLevel(k,z));return levels.length?Math.max(...levels):0}
function cropCapacity(){let total=25;for(const z of Object.values(game.zones)){if(!z.unlocked||z.type!=="farm"||!zoneHasBuilding("barn",z))continue;let lv=zoneBLevel("barn",z);total += [75,150,250][Math.max(0,lv-1)]||75}return total}
function cropStored(){return game.stock.wheat+game.stock.carrot+game.stock.corn}
function animalCap(k){let lv=bLevel(k);return k==="coop"?[4,6,8][Math.max(0,lv-1)]:k==="stable"?[2,4,6][Math.max(0,lv-1)]:k==="pond"?[3,5,8][Math.max(0,lv-1)]:0}
const LEVEL_REWARDS={2:["🏚️ Grange","🗺️ Extension 6×6"],3:["🥕 Carotte"],4:["🌲 Bois enchanté","🪚 Scierie"],5:["🐔 Poulailler"],6:["🌽 Maïs"],7:["🌿 Prairie sauvage"],8:["⛏️ Mine ancienne","🛠️ Atelier minier"],9:["⚙️ Moulin"],10:["🐄 Étable"],11:["⬆️ Grange niv.2"],12:["⬆️ Moulin niv.2"],13:["⬆️ Poulailler niv.2"],14:["⬆️ Scierie niv.2"],15:["🐟 Étang & poissons"],16:["📦 Capacité agricole"],17:["⬆️ Atelier minier niv.2"],18:["⬆️ Étable niv.2"],19:["💎 Ressources rares"],20:["🗺️ Terrain libre A"],21:["⬆️ Grange niv.3"],22:["⬆️ Étang niv.2"],23:["⬆️ Poulailler niv.3"],24:["⬆️ Moulin niv.3"],25:["⬆️ Scierie niv.3"],26:["📋 Commandes avancées"],27:["⬆️ Atelier minier niv.3"],28:["⬆️ Étable niv.3"],29:["⭐ Bonus de maîtrise"],30:["🗺️ Terrain libre B","⬆️ Étang niv.3"]};
function levelUnlocks(lv){return LEVEL_REWARDS[lv]||[]}
function addXP(n){game.xp+=n;let gained=[];while(game.xp>=Math.round(80*Math.pow(game.level,1.18))){game.xp-=Math.round(80*Math.pow(game.level,1.18));game.level++;let reward=75+game.level*25;game.money+=reward;gained.push(`Niveau ${game.level} • +${reward}💰`+(levelUnlocks(game.level).length?` • Nouveau : ${levelUnlocks(game.level).join(", ")}`:""))}if(gained.length)setTimeout(()=>msg("⭐ "+gained.join(" | ")),0)}
function specialDuration(state){
  if(state==="sapling")return Math.max(4*60*1000,8*60*1000-(zoneBLevel("sawmill")-1)*2*60*1000);
  if(state==="mining")return Math.max(9*60*1000,15*60*1000-(zoneBLevel("miner")-1)*3*60*1000);
  if(state==="mushroom")return Math.max(7*60*1000,12*60*1000-(zoneBLevel("miner")-1)*2.5*60*1000);
  return 0;
}
function mature(t){let now=Date.now();if(t.state==="planted"&&t.crop&&now-t.plantedAt>=CROPS[t.crop].time)t.state="ready";if(t.state==="sapling"&&now-t.startedAt>=specialDuration("sapling"))t.state="tree";if(t.state==="mining"&&now-t.startedAt>=specialDuration("mining")){let r=Math.random();t.state="ore";t.resource=r<.03?"diamond":r<.08?"ruby":r<.35?"iron":"stone"}if(t.state==="mushroom"&&now-t.startedAt>=specialDuration("mushroom"))t.state="mushready"}
const ASSETS={
 buildings:{barn:"assets/buildings/barn/barn_lv",coop:"assets/buildings/chicken-coop/chicken_coop_lv",stable:"assets/buildings/stable/stable_lv",mill:"assets/buildings/mill/mill_lv",pond:"assets/buildings/pond/pond_lv",sawmill:"assets/buildings/sawmill/sawmill_lv",miner:"assets/buildings/mine-workshop/mine_workshop_lv"},
 crop:{wheat:"assets/crops/wheat/wheat_stage_",carrot:"assets/crops/carrot/carrot_stage_",corn:"assets/crops/corn/corn_stage_"},
 forest:{sapling:"assets/decorations/trees/tree_sapling.png",tree:"assets/decorations/trees/tree_green_01.png"},
 mine:{mining:"assets/resources/mine/rock_stone_02.png",stone:"assets/resources/mine/rock_stone_01.png",iron:"assets/resources/mine/ore_iron.png",diamond:"assets/resources/mine/crystal_blue.png",ruby:"assets/resources/mine/crystal_red.png",mushroom:"assets/resources/mine/mushroom_brown.png",mushready:"assets/resources/mine/mushroom_golden.png"}
};
function pad2(n){return String(n).padStart(2,"0")}
const AUTO_PATH_KEYS=new Set(["path_vertical","path_horizontal","path_corner","path_t","path_cross","path_end"]);
const AUTO_WATER_KEYS=new Set(["water_stream","water_river_corner"]);
function decorNetworkKind(k){return AUTO_PATH_KEYS.has(k)?"path":AUTO_WATER_KEYS.has(k)?"water":null}
function sameNetwork(x,y,kind){if(x<0||y<0||x>=FARM_SIZE||y>=FARM_SIZE)return false;let t=farm()[y][x];return decorNetworkKind(t.decor)===kind}
function retileNetworkCell(x,y){if(x<0||y<0||x>=FARM_SIZE||y>=FARM_SIZE)return;let t=farm()[y][x],kind=decorNetworkKind(t.decor);if(!kind)return;let n=sameNetwork(x,y-1,kind),e=sameNetwork(x+1,y,kind),so=sameNetwork(x,y+1,kind),w=sameNetwork(x-1,y,kind),count=[n,e,so,w].filter(Boolean).length;
 if(kind==="path"){
  if(count===4){t.decor="path_cross";t.decorRotation=0}
  else if(count===3){t.decor="path_t";t.decorRotation=!n?180:!e?270:!so?0:90}
  else if(count===2&&((n&&so)||(e&&w))){t.decor=n&&so?"path_vertical":"path_horizontal";t.decorRotation=0}
  else if(count===2){t.decor="path_corner";t.decorRotation=n&&e?0:e&&so?90:so&&w?180:270}
  else if(count===1){t.decor="path_end";t.decorRotation=n?0:e?90:so?180:270}
  else {t.decor="path_vertical";t.decorRotation=0}
 }else{
  if(count===2&&!((n&&so)||(e&&w))){t.decor="water_river_corner";t.decorRotation=n&&e?0:e&&so?90:so&&w?180:270}
  else if(count<=2){t.decor="water_stream";t.decorRotation=(e||w)&&!(n||so)?90:0}
  else {t.decor="water_pond";t.decorRotation=0}
 }
}
function retileNetworkAround(x,y){[[x,y],[x,y-1],[x+1,y],[x,y+1],[x-1,y]].forEach(([xx,yy])=>retileNetworkCell(xx,yy))}
function askConfirm(text,onYes){let old=document.getElementById("game-confirm");if(old)old.remove();let o=document.createElement("div");o.id="game-confirm";o.className="game-confirm";o.innerHTML=`<div class="game-confirm-card"><b>${text}</b><div><button data-no>Annuler</button><button data-yes class="confirm-yes">Confirmer</button></div></div>`;document.body.appendChild(o);o.querySelector("[data-no]").onclick=()=>o.remove();o.querySelector("[data-yes]").onclick=()=>{o.remove();onYes()};o.onclick=e=>{if(e.target===o)o.remove()}}
function tileAsset(t){if(t.decor&&DECORS[t.decor])return DECORS[t.decor].img;
 if(t.building){let base=ASSETS.buildings[t.building];if(!base)return null;let lv=Math.max(1,Math.min(3,zoneBLevel(t.building)||1));return base+lv+(t.building==="sawmill"&&lv===2?"..png":".png")}
 if(t.state==="planted"||t.state==="ready"){
   let c=ASSETS.crop[t.crop];if(!c)return null;
   let ratio=t.state==="ready"?1:Math.max(0,Math.min(.99,(Date.now()-t.plantedAt)/CROPS[t.crop].time));
   let stage=t.state==="ready"?4:Math.min(3,1+Math.floor(ratio*3));return c+pad2(stage)+".png";
 }
 if(t.state==="sapling"||t.state==="tree")return ASSETS.forest[t.state];
 if(t.state==="mining")return ASSETS.mine.mining;
 if(t.state==="ore")return ASSETS.mine[t.resource]||ASSETS.mine.stone;
 if(t.state==="mushroom"||t.state==="mushready")return ASSETS.mine[t.state];
 return null;
}
function tileIcon(t){if(t.building)return BUILDINGS[t.building]?.emoji||"🏗️";if(t.state==="planted")return Date.now()-t.plantedAt<CROPS[t.crop].time/2?"🌱":"🌿";if(t.state==="ready")return CROPS[t.crop].ready;if(t.state==="sapling")return"🌱";if(t.state==="tree")return"🌲";if(t.state==="mining")return"⛏️";if(t.state==="ore")return{stone:"🪨",iron:"⚙️",diamond:"💎",ruby:"♦️"}[t.resource]||"🪨";if(["mushroom","mushready"].includes(t.state))return"🍄";return""}
function setTileVisual(b,t){let src=tileAsset(t);if(src){let im=document.createElement("img");im.className="tile-art";im.src=src;im.alt="";im.draggable=false;if(t.decor)im.style.setProperty("--rot",`${Number(t.decorRotation)||0}deg`);im.onerror=()=>{im.remove();b.insertAdjacentText("afterbegin",tileIcon(t))};b.appendChild(im)}else b.textContent=tileIcon(t)}
function renderFarm(){let el=document.getElementById("farm");el.className=`farm zone-${zone().type}`;el.innerHTML="";for(let y=0;y<FARM_SIZE;y++)for(let x=0;x<FARM_SIZE;x++){let t=farm()[y][x],b=document.createElement("button");b.className="tile";b.dataset.x=x;b.dataset.y=y;if(!unlocked(x,y)){b.classList.add("locked");b.setAttribute("aria-label","Terrain verrouillé");el.appendChild(b);continue}let footprint=buildingAtCell(x,y);if(footprint&&!(footprint.x===x&&footprint.y===y)){b.classList.add("building-footprint");b.dataset.building=footprint.key}mature(t);if(t.decor)b.classList.add("decorated");if(t.building){b.classList.add("building");let[fw,fh]=buildingFootprint(t.building);b.style.setProperty("--fw",fw);b.style.setProperty("--fh",fh);if(t.building==="pond")b.classList.add("water")}if(["plowed","planted","ready"].includes(t.state))b.classList.add(t.state==="ready"?"ready":"plowed");if(["sapling","tree"].includes(t.state))b.classList.add("forest-tile");if(["mining","ore"].includes(t.state))b.classList.add("rock");if(game.moveSource&&game.moveSource.zone===game.currentZone&&game.moveSource.x===x&&game.moveSource.y===y)b.classList.add("selected");setTileVisual(b,t);let total=t.state==="planted"?CROPS[t.crop].time:["sapling","mining","mushroom"].includes(t.state)?specialDuration(t.state):0;if(total){let at=t.plantedAt||t.startedAt||Date.now(),elapsed=Math.max(0,Date.now()-at),p=Math.max(0,Math.min(99,elapsed/total*100));let bar=document.createElement("div");bar.className="crop-progress";bar.innerHTML=`<i style="width:${p}%"></i>`;b.appendChild(bar);let lab=document.createElement("span");lab.className="progress-label";lab.textContent=`${Math.floor(p)}%`;b.appendChild(lab)}el.appendChild(b)}}
function buildAt(t,x,y){let k=game.selectedBuilding,d=BUILDINGS[k];if(!d)return msg("Choisis un bâtiment.");if(d.zoneType&&d.zoneType!==zone().type)return msg("Ce bâtiment appartient à une autre zone.");if(!d.zoneType&&zone().type!=="farm")return msg("Ces bâtiments se construisent dans une zone agricole.");if(game.level<d.level)return msg(`🔒 ${d.name} : niveau ${d.level}.`);let[w,h]=buildingFootprint(k);if(!footprintFree(x,y,k))return msg(`🏗️ Il faut un espace libre de ${w}×${h} cases.`);if(zoneHasBuilding(k))return msg(`🏗️ Cette parcelle possède déjà : ${d.name}.`);if(game.money<d.price)return missing(`💰 Ressources insuffisantes : il manque ${d.price-game.money} pièce(s) pour ${d.name}.`);game.money-=d.price;t.building=k;zone().buildingLevels=zone().buildingLevels||{};zone().buildingLevels[k]=1;if(k==="coop")game.fedUntil.coop=Date.now()+FEED_MS;if(k==="stable")game.fedUntil.stable=Date.now()+FEED_MS;if(k==="pond")game.fedUntil.pond=Date.now()+FEED_MS;msg(`🏗️ ${d.name} construit sur ${w}×${h} cases.`)}
function moveAct(x,y,t){if(!game.moveSource){let hit=buildingAtCell(x,y);if(hit&&!(hit.x===x&&hit.y===y)){x=hit.x;y=hit.y;t=farm()[y][x]}if(t.state==="grass"&&!t.building&&!t.decor)return msg("Choisis une culture, décoration, ressource ou bâtiment à déplacer.");game.moveSource={zone:game.currentZone,x,y,data:structuredClone(t)};msg(t.building?"✋ Bâtiment sélectionné : choisis un espace 2×2 libre.":"✋ Choisis maintenant une case verte libre.");return renderAll()}let src=game.zones[game.moveSource.zone].farm[game.moveSource.y][game.moveSource.x],k=game.moveSource.data.building;if(k){if(!footprintFree(x,y,k,zone(),{x:game.moveSource.x,y:game.moveSource.y}))return msg("🏗️ Il faut un espace 2×2 libre pour déplacer ce bâtiment.")}else if(t.state!=="grass"||t.building||buildingAtCell(x,y))return msg("Destination occupée.");Object.assign(t,structuredClone(game.moveSource.data));Object.assign(src,emptyTile());game.moveSource=null;msg("✋ Élément déplacé.");save();renderAll()}
function rotateAct(x,y,t){if(!t.decor)return msg("🔄 Choisis une décoration ou un animal placé.");t.decorRotation=((Number(t.decorRotation)||0)+90)%360;save();renderAll();msg("🔄 Élément tourné de 90°.")}
function deleteDecorAct(x,y,t){if(!t.decor)return msg("🗑️ Choisis une décoration ou un animal placé.");let d=DECORS[t.decor],name=d?.name||"Élément",kind=decorNetworkKind(t.decor);askConfirm(`Supprimer ${name} ?`,()=>{t.decor=null;t.decorRotation=0;if(kind)retileNetworkAround(x,y);save();renderAll();success(`🗑️ ${name} supprimé.`)})}
function act(x,y,silent=false){if(!unlocked(x,y))return false;let t=farm()[y][x],foot=buildingAtCell(x,y);if(foot&&!(foot.x===x&&foot.y===y)&&game.selectedTool!=="move"){if(!silent)missing("🏗️ Cette case fait partie d’un bâtiment.");return false}if(game.selectedTool==="move"){moveAct(x,y,t);return true}if(game.selectedTool==="rotate"){rotateAct(x,y,t);return true}if(game.selectedTool==="deleteDecor"){deleteDecorAct(x,y,t);return true}if(game.selectedTool==="decorate"){if(t.state!=="grass"||t.building||buildingAtCell(x,y)||t.decor){if(!silent)missing("🌿 Cette case est occupée.");return false}let d=DECORS[game.selectedDecor];if(!d)return false;if(game.level<d.level){if(!silent)missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);return false}if(game.money<d.price){if(!silent)missing(`💰 Il manque ${d.price-game.money} pièce(s).`);return false}game.money-=d.price;t.decor=game.selectedDecor;t.decorRotation=0;if(decorNetworkKind(t.decor))retileNetworkAround(x,y);if(!silent){success(`🌿 ${d.name} placé.`);save();renderAll()}return true}if(game.selectedTool==="build"){if(!silent){buildAt(t,x,y);save();renderAll()}return true}if(t.building||t.decor){if(!silent)missing("🏗️ Cette case est occupée.");return false}let changed=false,type=zone().type;if(type==="farm"){if(game.selectedTool==="plow"&&t.state==="grass"){t.state="plowed";changed=true}else if(game.selectedTool==="plant"&&t.state==="plowed"){if(!cropUnlocked(game.selectedCrop)){if(!silent)missing(`🔒 ${CROPS[game.selectedCrop].name} se débloque au niveau ${CROPS[game.selectedCrop].level}.`);return false}if(game.seeds[game.selectedCrop]<=0){if(!silent)missing(`🌱 Il te manque 1 graine de ${CROPS[game.selectedCrop].name}.`);return false}game.seeds[game.selectedCrop]--;t.state="planted";t.crop=game.selectedCrop;t.plantedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"){mature(t);if(t.state==="ready"){if(cropStored()>=cropCapacity()){if(!silent)missing("📦 Grange pleine : libère de la place avant de récolter.");return false}game.stock[t.crop]+=specialBonus("farm",1);gainMastery("farm",1);missionProgress("crop",1);t.state="plowed";t.crop=null;t.plantedAt=null;addXP(5);changed=true}}}else if(type==="forest"){if(game.selectedTool==="plant"&&t.state==="grass"){if((game.forestSupplies.sapling||0)<1){if(!silent)missing("🌱 Il te manque 1 jeune plant. Achète-en dans Produire.");return false}game.forestSupplies.sapling--;t.state="sapling";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"&&t.state==="tree"){game.stock.wood+=specialBonus("forest",2);gainMastery("forest",2);missionProgress("wood",2);Object.assign(t,emptyTile());addXP(5);changed=true}}else if(type==="mine"){if(game.selectedTool==="extract"&&game.mineMode==="ore"&&t.state==="grass"){if((game.mineSupplies.charge||0)<1){if(!silent)missing("⛏️ Il te manque 1 charge d’extraction. Achète-en dans Produire.");return false}game.mineSupplies.charge--;t.state="mining";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="plant"&&game.mineMode==="mushroom"&&t.state==="grass"){if((game.mineSupplies.spore||0)<1){if(!silent)missing("🍄 Il te manque 1 spore de champignon. Achète-en dans Produire.");return false}game.mineSupplies.spore--;t.state="mushroom";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"){mature(t);if(t.state==="ore"){let r=t.resource;game.stock[r]++;gainMastery("mine",1);missionProgress("mine",1);Object.assign(t,emptyTile());addXP(["diamond","ruby"].includes(r)?15:5);changed=true}else if(t.state==="mushready"){game.stock.mushroom++;gainMastery("mine",1);missionProgress("mine",1);Object.assign(t,emptyTile());addXP(5);changed=true}}}if(changed){save();if(!silent)renderAll()}return changed}
function quick(kind){let old=game.selectedTool,count=0;game.selectedTool=kind;for(let y=0;y<FARM_SIZE;y++)for(let x=0;x<FARM_SIZE;x++)if(act(x,y,true))count++;game.selectedTool=old;msg(`Action de zone : ${count} case(s).`);save();renderAll()}
function buySeed(c,q=1){let d=CROPS[c];if(!cropUnlocked(c))return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);let cost=d.price*q;if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour acheter ${q} graine(s) de ${d.name}.`);game.money-=cost;game.seeds[c]+=q;success(`${d.ready} +${q} graine(s) de ${d.name}.`);save();renderAll()}
const SELL_PRICE={wheat:28,carrot:68,corn:140,eggs:85,milk:180,fish:240,wood:45,plank:110,stone:65,iron:180,diamond:1200,ruby:850,mushroom:160,flour:95,cheese:420,ingot:480};
const STOCK_META={wheat:["🌾","Blé","Récoltes"],carrot:["🥕","Carotte","Récoltes"],corn:["🌽","Maïs","Récoltes"],eggs:["🥚","Œufs","Animaux"],milk:["🥛","Lait","Animaux"],fish:["🐟","Poissons","Animaux"],feed:["🍚","Rations","Transformation"],wood:["🌲","Bois","Forêt"],plank:["🪵","Planches","Transformation"],stone:["🪨","Pierre","Mine"],iron:["⚙️","Fer","Mine"],diamond:["💎","Diamant","Mine"],ruby:["♦️","Rubis","Mine"],mushroom:["🍄","Champignons","Mine"],flour:["🥣","Farine","Transformation"],cheese:["🧀","Fromage","Transformation"],ingot:["🔩","Lingot","Transformation"]};
function sellResource(k,n){let have=game.stock[k]||0,p=SELL_PRICE[k]||0;if(!p||have<=0)return msg("Rien à vendre.");let q=Math.min(have,n===Infinity?have:n);game.stock[k]-=q;game.money+=q*p;msg(`💰 ${STOCK_META[k]?.[1]||k} ×${q} : +${q*p} pièces.`);save();renderAll()}
function sellAll(){let earned=0;for(const[k,p]of Object.entries(SELL_PRICE)){earned+=(game.stock[k]||0)*p;game.stock[k]=0}if(!earned)return msg("Rien à vendre.");game.money+=earned;msg(`💰 Vente totale : +${earned} pièces.`);save();renderAll()}
function buyAnimal(kind){let c={chicken:["coop","chickens",250,"🐔"],cow:["stable","cows",900,"🐄"],fish:["pond","fishCount",450,"🐟"]}[kind],[b,f,p,e]=c;if(!hasBuilding(b)||game[f]>=animalCap(b)||game.money<p)return msg("Achat impossible.");game.money-=p;game[f]++;msg(`${e} Animal ajouté.`);save();renderAll()}
function feed(kind){let crop=kind==="stable"?"wheat":"corn";if(game.stock[crop]<1)return missing(`🍽️ Ressource manquante : 1 ${CROPS[crop].name}.`);game.stock[crop]--;game.fedUntil[kind]=Math.max(Date.now(),game.fedUntil[kind]||0)+FEED_MS;save();renderAll()}
function makeFeed(){if(game.stock.wheat<1||game.stock.corn<2)return missing(`⚙️ Ressources manquantes : ${Math.max(0,1-game.stock.wheat)} blé et ${Math.max(0,2-game.stock.corn)} maïs.`);game.stock.wheat--;game.stock.corn-=2;game.stock.feed+=3;save();renderAll()}
function autoFeedTick(){if(!game.autoFeed||!hasBuilding("mill")||game.stock.feed<=0)return;for(const k of["coop","stable","pond"])if(hasBuilding(k)&&(game.fedUntil[k]||0)-Date.now()<10000&&game.stock.feed>0){game.stock.feed--;game.fedUntil[k]=Date.now()+FEED_MS}}
function production(){autoFeedTick();let now=Date.now();function tick(b,count,clock,interval,stock){if(!hasBuilding(b)||count<=0||now>=(game.fedUntil[b]||0))return;let cycles=Math.floor((now-game[clock])/interval);if(cycles>0){game.stock[stock]+=cycles*count;gainMastery("animal",cycles);game[clock]+=cycles*interval;save()}}tick("coop",game.chickens,"lastEggAt",10*60*1000,"eggs");tick("stable",game.cows,"lastMilkAt",20*60*1000,"milk");tick("pond",game.fishCount,"lastFishAt",30*60*1000,"fish")}
function feedPct(k){return Math.max(0,Math.min(100,((game.fedUntil[k]||0)-Date.now())/FEED_MS*100))}
function upgrade(k){let lv=zoneBLevel(k);if(!lv)return msg("Bâtiment absent de cette parcelle.");if(lv>=3)return msg("⭐ Niveau maximum.");let cost=UPGRADE_COSTS[k]?.[lv],req=UPGRADE_LEVELS[k]?.[lv]||1;if(!cost)return;if(game.level<req)return missing(`🔒 Amélioration disponible au niveau ${req}.`); if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour cette amélioration.`);game.money-=cost;zone().buildingLevels=zone().buildingLevels||{};zone().buildingLevels[k]=lv+1;msg(`⬆️ ${BUILDINGS[k].name} passe niveau ${lv+1}.`);save();renderAll()}
function expandCurrent(){if(size()>=FARM_SIZE)return;let cost=EXPANSION_COSTS[size()]||20000;if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour agrandir.`);game.money-=cost;zone().size++;save();renderAll()}
function travel(k){if(!game.zones[k].unlocked)return unlockZone(k);game.currentZone=k;game.moveSource=null;playerStartForZone();closeMap();msg(`🗺️ Déplacement : ${ZONES[k].name}.`);save();renderAll()}
function unlockZone(k){let d=ZONES[k],z=game.zones[k];if(game.level<(d.level||1))return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);if(game.money<d.cost)return missing(`💰 Il manque ${d.cost-game.money} pièce(s) pour débloquer cette zone.`);game.money-=d.cost;z.unlocked=true;if(d.type==="free")return chooseFree(k);travel(k)}
function openMap(){if(typeof closeGameModal==="function"&&typeof modal!=="undefined"&&!modal.classList.contains("hidden"))closeGameModal();renderMap();document.getElementById("map-modal").classList.remove("hidden");document.body.classList.add("modal-open")}function closeMap(){document.getElementById("map-modal").classList.add("hidden");document.body.classList.remove("modal-open")}
function renderMap(){document.getElementById("map-zones").innerHTML=Object.entries(ZONES).map(([k,d])=>{let z=game.zones[k],locked=!z.unlocked,spec=z.type==="free"?"À spécialiser":z.type==="farm"?"Zone agricole":z.type==="forest"?"Bois & scierie":"Mine & champignons";return `<button class="zone-card ${game.currentZone===k?"current":""} ${locked?"locked-zone":""}" data-zone="${k}"><h3>${locked?"🔒":d.emoji} ${d.name}</h3><p>${spec} · ${z.size}×${z.size}</p><p>${locked?`Niv.${d.level||1} · ${d.cost}💰`:"Voyager vers cette zone."}</p></button>`}).join("");document.querySelectorAll("[data-zone]").forEach(b=>b.onclick=()=>travel(b.dataset.zone))}
function chooseFree(k){document.getElementById("map-zones").innerHTML=`<div class="spec-wrap"><h3>Choisis la spécialisation de ${ZONES[k].name}</h3><button class="zone-card" data-spec="farm"><h3>🌾 Nouveau champ</h3><p>Agriculture, bâtiments et élevage.</p></button><button class="zone-card" data-spec="forest"><h3>🌲 Nouveau bois</h3><p>Arbres, bois et scierie.</p></button><button class="zone-card" data-spec="mine"><h3>⛏️ Nouvelle mine</h3><p>Minerais et champignons.</p></button></div>`;document.querySelectorAll("[data-spec]").forEach(b=>b.onclick=()=>{game.zones[k].type=b.dataset.spec;game.zones[k].farm=emptyFarm();game.currentZone=k;save();closeMap();renderAll()})}
function renderBuild(){
 const box=document.getElementById("building-shop");
 if(!box)return;
 const buildSection=box.closest('section[data-source="build"]')||box.parentElement;
 const tabs=buildSection?buildSection.querySelector(".tabs"):null;
 if(zone().type==="farm"){
   if(tabs)tabs.style.display="grid";
   if(buildSection)buildSection.querySelectorAll("[data-buildtab]").forEach(b=>b.classList.toggle("active",b.dataset.buildtab===game.buildTab));
   const entries=Object.entries(BUILDINGS).filter(([,d])=>!d.zoneType&&d.kind===game.buildTab);
   box.innerHTML='<div class="zone-note">Bâtiments en 2×2 : choisis-en un, puis touche le coin supérieur gauche d’un espace libre.</div>'+entries.map(([k,d])=>`<button class="choice ${game.selectedBuilding===k?"active":""}" data-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé · niv."+zoneBLevel(k):d.price+"💰 · 2×2 · niv."+d.level+" requis"}</small></button>`).join("");
 }else{
   if(tabs)tabs.style.display="none";
   const entries=Object.entries(BUILDINGS).filter(([,d])=>d.zoneType===zone().type);
   box.innerHTML='<div class="zone-note">Choisis le bâtiment spécial de cette parcelle, puis touche une case verte libre.</div>'+entries.map(([k,d])=>`<button class="choice ${game.selectedBuilding===k?"active":""}" data-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé · niv."+zoneBLevel(k):d.price+"💰"}</small></button>`).join("");
 }
 box.querySelectorAll("[data-building]").forEach(b=>b.onclick=()=>{game.selectedBuilding=b.dataset.building;game.selectedTool="build";closeGameModal();msg(`🔨 ${BUILDINGS[game.selectedBuilding].name} sélectionné : touche une case verte libre.`);renderAll()});
} 
function renderAnimals(){let box=document.getElementById("animals");if(zone().type!=="farm"){box.innerHTML='<p class="hint">Les animaux sont gérés depuis une zone agricole.</p>';return}let rows=[["coop","🐔","Poules","chickens","chicken",250],["stable","🐄","Vaches","cows","cow",900],["pond","🐟","Poissons","fishCount","fish",450]];box.innerHTML=rows.map(([b,e,n,f,a,p])=>{if(!hasBuilding(b))return `<p class="hint">${e} ${n} : ${BUILDINGS[b].name} requis.</p>`;let pct=feedPct(b),food=b==="stable"?"🌾 blé":"🌽 maïs";return `<div class="compact"><span>${e} ${n} <b>${game[f]}/${animalCap(b)}</b></span><button class="mini" data-animal="${a}">+ ${p}💰</button></div><div class="feedbar"><i style="width:${pct}%"></i></div><div class="compact"><span>${pct?`🍽️ ${Math.ceil(((game.fedUntil[b]||0)-Date.now())/1000)} s`:"😴 Arrêt"}</span><button class="mini" data-feed="${b}">Nourrir (${food})</button></div>`}).join("");document.querySelectorAll("[data-animal]").forEach(b=>b.onclick=()=>buyAnimal(b.dataset.animal));document.querySelectorAll("[data-feed]").forEach(b=>b.onclick=()=>feed(b.dataset.feed))}
function renderProduction(){let box=document.getElementById("production");
if(zone().type==="forest"){
 let lv=zoneBLevel("sawmill"),yieldN=lv?2+lv:0;
 box.innerHTML=lv?`<div class="compact"><span>🪚 Scierie niv.${lv}</span><span>🌲 ${game.stock.wood} · 🪵 ${game.stock.plank}</span></div><button id="make-plank" class="primary">2 bois → ${yieldN} planches</button>`:'<p class="hint">Construis une Scierie sur cette parcelle.</p>';
}else if(zone().type==="mine"){
 let lv=zoneBLevel("miner");
 box.innerHTML=lv?`<div class="compact"><span>🛠️ Atelier minier niv.${lv}</span><span>⛏️ ${specialDuration("mining")/1000}s · 🍄 ${specialDuration("mushroom")/1000}s</span></div><p class="hint">Améliorer l’atelier réduit les temps d’extraction et de culture.</p>`:'<p class="hint">Construis l’Atelier minier pour améliorer les temps de cette parcelle.</p>';
}else{
 box.innerHTML=zoneHasBuilding("mill")?`<div class="compact"><span>⚙️ Moulin niv.${zoneBLevel("mill")}</span><span>🍚 ${game.stock.feed}</span></div><button id="make-feed" class="primary">1 blé + 2 maïs → 3 rations</button><div class="compact"><span>🤖 Mangeoire auto</span><button id="toggle-auto" class="mini">${game.autoFeed?"ON":"OFF"}</button></div>`:'<p class="hint">Construis un Moulin sur cette parcelle pour préparer les rations.</p>';
}
let p=document.getElementById("make-plank");if(p)p.onclick=()=>{let lv=zoneBLevel("sawmill");if(game.stock.wood>=2){game.stock.wood-=2;game.stock.plank+=2+lv;save();renderAll()}else missing(`🪵 Ressource manquante : ${2-game.stock.wood} bois.`)};
let m=document.getElementById("make-feed");if(m)m.onclick=makeFeed;let a=document.getElementById("toggle-auto");if(a)a.onclick=()=>{game.autoFeed=!game.autoFeed;save();renderAll()};let recipeBox=document.getElementById("production");if(recipeBox&&zone().type==="farm")recipeBox.insertAdjacentHTML("beforeend",`<div class="recipe-list"><button data-craft="flour">2 🌾 → 2 🥣 Farine</button><button data-craft="cheese">2 🥛 → 1 🧀 Fromage</button><button data-craft="ingot">2 ⚙️ → 1 🔩 Lingot</button></div>`);document.querySelectorAll("[data-craft]").forEach(b=>b.onclick=()=>craft(b.dataset.craft))}
function renderUpgrades(){let box=document.getElementById("upgrades");
let keys=zone().type==="farm"?["barn","coop","stable","pond","mill"]:zone().type==="forest"?["sawmill"]:zone().type==="mine"?["miner"]:[];
let present=keys.filter(k=>zoneHasBuilding(k));
let terrain=size()<FARM_SIZE?`<div class="upgrade-row terrain-upgrade"><div class="compact"><span>🗺️ <b>Extension du terrain</b> · ${size()}×${size()}</span><button id="expand-from-manage" class="mini">🔓 ${EXPANSION_COSTS[size()]||20000}💰</button></div><div class="upgrade-effect">Débloque une nouvelle couronne de cases autour de la zone actuelle.</div></div>`:`<div class="upgrade-row terrain-upgrade"><div class="compact"><span>🗺️ <b>Terrain</b> · ${size()}×${size()}</span><b>MAX ⭐</b></div></div>`;
let buildings=present.length?present.map(k=>{let lv=zoneBLevel(k),max=lv>=3,cost=max?0:UPGRADE_COSTS[k][lv],effect=k==="sawmill"?`Rendement actuel : ${2+lv} planches / 2 bois`:k==="miner"?`Extraction : ${specialDuration("mining")/1000}s · champignons : ${specialDuration("mushroom")/1000}s`:`Capacité / efficacité augmentée au niveau suivant`;return `<div class="upgrade-row"><div class="compact"><span>${BUILDINGS[k].emoji} <b>${BUILDINGS[k].name}</b> · niv.${lv}</span>${max?'<b>MAX ⭐</b>':`<button class="mini" data-upgrade="${k}">⬆️ ${cost}💰</button>`}</div><div class="upgrade-effect">${effect}</div></div>`}).join(""):'<p class="hint">Aucun bâtiment à améliorer sur cette parcelle.</p>';
box.innerHTML=terrain+buildings;
let ex=document.getElementById("expand-from-manage");if(ex)ex.onclick=expandCurrent;
document.querySelectorAll("[data-upgrade]").forEach(b=>b.onclick=()=>upgrade(b.dataset.upgrade))}
function buyMineSupply(kind,q=1){let names={charge:"charge d’extraction",spore:"spore de champignon"},unit=kind==="charge"?120:90,cost=q*unit;if(game.money<cost)return missing(`💰 Il te manque ${cost-game.money} pièce(s).`);game.money-=cost;game.mineSupplies[kind]=(game.mineSupplies[kind]||0)+q;success(`${kind==="charge"?"⛏️":"🍄"} +${q} ${names[kind]}.`);save();renderAll()}
function buySapling(q=1){let cost=q*60;if(game.money<cost)return missing(`💰 Il te manque ${cost-game.money} pièce(s) pour ${q} jeune(s) plant(s).`);game.money-=cost;game.forestSupplies.sapling=(game.forestSupplies.sapling||0)+q;success(`🌱 +${q} jeune(s) plant(s).`);save();renderAll()}
function renderZoneActions(){let ss=document.getElementById("seed-selector"),shop=document.getElementById("seed-shop");if(zone().type==="farm"){ss.innerHTML=Object.entries(CROPS).map(([k,d])=>`<button class="seed ${game.selectedCrop===k?"active":""}" data-crop="${k}">${d.ready}<br><small>${game.seeds[k]}</small></button>`).join("");shop.innerHTML=Object.entries(CROPS).map(([k,d])=>`<div class="shop-line"><span>${d.ready} <b>${d.name}</b><small>Stock graines : ${game.seeds[k]} · ${d.price}💰/u</small></span><span><button data-buy="${k}" data-q="1">Acheter ×1</button><button data-buy="${k}" data-q="10">×10</button></span></div>`).join("");document.querySelectorAll("[data-crop]").forEach(b=>b.onclick=()=>{game.selectedCrop=b.dataset.crop;game.selectedTool="plant";renderAll()});document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buySeed(b.dataset.buy,+b.dataset.q))}else if(zone().type==="mine"){ss.innerHTML=`<button class="seed ${game.mineMode==="ore"?"active":""}" data-mine="ore">⛏️<br><small>Minerais</small></button><button class="seed ${game.mineMode==="mushroom"?"active":""}" data-mine="mushroom">🍄<br><small>Champignons</small></button>`;shop.innerHTML=`<div class="shop-line"><span>⛏️ <b>Charge d’extraction</b><small>Stock : ${game.mineSupplies.charge||0} · 120💰/u</small></span><span><button data-buy-mine="charge" data-q="1">×1</button><button data-buy-mine="charge" data-q="10">×10</button></span></div><div class="shop-line"><span>🍄 <b>Spore</b><small>Stock : ${game.mineSupplies.spore||0} · 90💰/u</small></span><span><button data-buy-mine="spore" data-q="1">×1</button><button data-buy-mine="spore" data-q="10">×10</button></span></div>`;document.querySelectorAll("[data-mine]").forEach(b=>b.onclick=()=>{game.mineMode=b.dataset.mine;game.selectedTool=game.mineMode==="ore"?"extract":"plant";renderAll()});document.querySelectorAll("[data-buy-mine]").forEach(b=>b.onclick=()=>buyMineSupply(b.dataset.buyMine,+b.dataset.q))}else{ss.innerHTML=`<div class="seed active">🌱<br><small>${game.forestSupplies.sapling||0}</small></div>`;shop.innerHTML=`<div class="shop-line"><span>🌱 <b>Jeune plant</b><small>Stock : ${game.forestSupplies.sapling||0} · 60💰/u · pousse ${Math.round(specialDuration("sapling")/60000)} min</small></span><span><button data-sap="1">Acheter ×1</button><button data-sap="10">×10</button></span></div>`;shop.querySelectorAll("[data-sap]").forEach(b=>b.onclick=()=>buySapling(+b.dataset.sap))}}
function renderProduceBalance(){let shop=document.getElementById("seed-shop");if(shop&&!shop.querySelector(".produce-balance"))shop.insertAdjacentHTML("afterbegin",`<div class="produce-balance"><span>💰 Solde disponible</span><b>${game.money} pièces</b></div>`)}
function renderStock(){let box=document.getElementById("stock");let groups=["Récoltes","Animaux","Forêt","Mine","Transformation"];box.innerHTML=`<div class="capacity-line"><b>📦 Grange</b><span>${cropStored()}/${cropCapacity()}</span></div>`+groups.map(cat=>{let rows=Object.entries(STOCK_META).filter(([k,m])=>m[2]===cat).map(([k,m])=>{let q=game.stock[k]||0,p=SELL_PRICE[k];return `<div class="stock-row"><span class="stock-name">${m[0]} <b>${m[1]}</b><small> ×${q}${p?` · ${p}💰/u`:" · non vendable"}</small></span><span class="stock-actions">${p?`<button data-sell="${k}" data-q="1" ${q<1?"disabled":""}>Vendre ×1</button><button data-sell="${k}" data-q="10" ${q<1?"disabled":""}>Vendre ×10</button>`:""}</span></div>`}).join("");return rows?`<div class="stock-group"><h4>${cat}</h4>${rows}</div>`:""}).join("");box.querySelectorAll("[data-sell]").forEach(b=>b.onclick=()=>sellResource(b.dataset.sell,+b.dataset.q))}
function renderDomain(){document.getElementById("domain").innerHTML=`<div class="compact"><span>${ZONES[game.currentZone].emoji} ${ZONES[game.currentZone].name}</span><b>${size()}×${size()}</b></div>${size()<FARM_SIZE?`<button id="expand-current" class="primary">🔓 Agrandir — ${EXPANSION_COSTS[size()]||20000}💰</button>`:'<p class="good">Zone au maximum ⭐</p>'}<button id="domain-map" class="primary">🗺️ Ouvrir la carte</button>`;let e=document.getElementById("expand-current");if(e)e.onclick=expandCurrent;document.getElementById("domain-map").onclick=openMap}
function renderToolbar(){let type=zone().type,defs=type==="mine"?[['extract','⛏️','Extraire'],['plant','🍄','Cultiver'],['harvest','🧺','Récolter'],['build','🛠️','Construire'],['move','✋','Aménager']]:type==="forest"?[['plant','🌱','Planter'],['harvest','🪓','Couper'],['build','🛠️','Construire'],['move','✋','Aménager']]:[['plow','🪏','Labourer'],['plant','🌱','Planter'],['harvest','🧺','Récolter'],['build','🛠️','Construire'],['move','✋','Aménager']];document.getElementById("toolbar").innerHTML=defs.map(([k,e,n])=>`<button class="tool ${game.selectedTool===k?"active":""}" data-tool="${k}">${e}<span>${n}</span></button>`).join("");document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>{let tool=b.dataset.tool;game.selectedTool=tool;if(type==="mine"&&tool==="extract"){game.mineMode="ore";activatePanel("produce")}else if(type==="mine"&&tool==="plant"){game.mineMode="mushroom";activatePanel("produce")}else if(tool==="plant"){activatePanel("produce")}else if(tool==="build"){activatePanel("build")}else if(tool==="move"){activatePanel("arrange")}renderAll()});let qb=document.getElementById("quickbar");qb.innerHTML=type==="farm"?'<button data-quick="plow">🪏 Zone</button><button data-quick="plant">🌱 Zone</button><button data-quick="harvest">🧺 Prêtes</button>':'';qb.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>quick(b.dataset.quick))}
function ensureOrders(){if(!Array.isArray(game.orders))game.orders=[];while(game.orders.length<3){let pool=["wheat","carrot","corn","eggs","milk","fish","wood","stone","mushroom","flour","cheese","ingot"].filter(k=>game.stock[k]!==undefined);let n=game.level>=5?2:1,items=[];for(let i=0;i<n;i++){let k=pool[Math.floor(Math.random()*pool.length)];if(items.some(x=>x.k===k)){i--;continue}items.push({k,q:1+Math.floor(Math.random()*3)})}let base=items.reduce((a,x)=>a+(SELL_PRICE[x.k]||6)*x.q,0);game.orders.push({id:Date.now()+Math.random(),items,reward:Math.round(base*1.5),xp:8+items.reduce((a,x)=>a+x.q*2,0)})}}
function completeOrder(id){let o=game.orders.find(x=>x.id==id);if(!o)return;let miss=o.items.filter(x=>(game.stock[x.k]||0)<x.q);if(miss.length)return missing(`📋 Il manque : `+miss.map(x=>`${x.q-(game.stock[x.k]||0)} ${STOCK_META[x.k]?.[1]||x.k}`).join(", "));o.items.forEach(x=>game.stock[x.k]-=x.q);game.money+=o.reward;addXP(o.xp);game.orders=game.orders.filter(x=>x.id!=id);game.ordersDone=(game.ordersDone||0)+1;missionProgress("order",1);ensureOrders();save();renderAll();success(`📋 Commande livrée : +${o.reward}💰 +${o.xp} XP`)}
function renderOrders(){
 let b=document.getElementById("orders");if(!b)return;
 if(!Array.isArray(game.orders))game.orders=[];
 game.orders=game.orders.filter(o=>o&&Array.isArray(o.items)&&o.items.length&&Number.isFinite(+o.reward));
 ensureOrders();
 b.innerHTML=game.orders.map(o=>{let ok=o.items.every(x=>(game.stock[x.k]||0)>=x.q);return `<div class="order-row"><span>${o.items.map(x=>`${STOCK_META[x.k]?.[0]||"📦"} <b>${x.q} ${STOCK_META[x.k]?.[1]||x.k}</b> <small>Stock ${game.stock[x.k]||0}</small>`).join(" + ")}</span><button data-order="${o.id}" ${ok?"":"disabled"}>Livrer<br>${o.reward}💰 +${o.xp}XP</button></div>`}).join("")||'<p class="hint">Aucune commande disponible.</p>';
 b.querySelectorAll("[data-order]").forEach(x=>x.onclick=()=>completeOrder(x.dataset.order));
}
const MASTERY_META={farm:["🌾","Agriculture"],animal:["🐾","Élevage"],forest:["🌲","Forêt"],mine:["⛏️","Mine"]};
function masteryLevel(k){return 1+Math.floor((game.mastery[k]||0)/25)}
function gainMastery(k,n=1){game.mastery[k]=(game.mastery[k]||0)+n}
function specialBonus(type,q){let free=game.currentZone==="freeA"||game.currentZone==="freeB";if(!free)return q;return Math.max(q,Math.round(q*1.1))}
const MISSION_POOL=[{type:"crop",label:"Récolter 10 cultures",goal:10,reward:30},{type:"order",label:"Livrer 2 commandes",goal:2,reward:40},{type:"wood",label:"Couper 6 bois",goal:6,reward:30},{type:"mine",label:"Récolter 5 ressources minières",goal:5,reward:35}];
function ensureMissions(){if(!Array.isArray(game.missions))game.missions=[];while(game.missions.length<3){let m=MISSION_POOL[(game.missions.length+(game.missionsDone||0))%MISSION_POOL.length];game.missions.push({...m,id:Date.now()+Math.random(),progress:0})}}
function missionProgress(type,n=1){ensureMissions();for(let m of game.missions)if(m.type===type)m.progress=Math.min(m.goal,(m.progress||0)+n)}
function claimMission(id){let m=game.missions.find(x=>x.id==id);if(!m||m.progress<m.goal)return;game.money+=m.reward;addXP(10);game.missions=game.missions.filter(x=>x.id!=id);game.missionsDone=(game.missionsDone||0)+1;ensureMissions();save();renderAll();success(`⭐ Objectif terminé : +${m.reward}💰 +10 XP`)}
function renderProgression(){let b=document.getElementById("progression");if(!b)return;ensureMissions();b.innerHTML=`<h4>Maîtrises</h4><div class="mastery-grid">${Object.entries(MASTERY_META).map(([k,m])=>`<div>${m[0]} <b>${m[1]} niv.${masteryLevel(k)}</b><small>${game.mastery[k]||0} pts</small></div>`).join("")}</div><h4>Objectifs</h4>`+game.missions.map(m=>`<div class="mission-row"><span><b>${m.label}</b><small>${m.progress||0}/${m.goal}</small></span><button data-mission="${m.id}" ${(m.progress||0)<m.goal?"disabled":""}>Réclamer ${m.reward}💰</button></div>`).join("");b.querySelectorAll("[data-mission]").forEach(x=>x.onclick=()=>claimMission(x.dataset.mission))}
function craft(kind){let recipes={flour:{need:{wheat:2},out:2,label:"🥣 Farine"},cheese:{need:{milk:2},out:1,label:"🧀 Fromage"},ingot:{need:{iron:2},out:1,label:"🔩 Lingot"}}[kind];if(!recipes)return;let miss=Object.entries(recipes.need).filter(([k,q])=>(game.stock[k]||0)<q);if(miss.length)return missing(`⚙️ Il manque : `+miss.map(([k,q])=>`${q-(game.stock[k]||0)} ${STOCK_META[k]?.[1]||k}`).join(", "));for(let[k,q]of Object.entries(recipes.need))game.stock[k]-=q;game.stock[kind]+=recipes.out;save();renderAll();success(`${recipes.label} +${recipes.out}`)}
function renderArrange(){let box=document.getElementById("arrange-catalog");if(!box)return;let groups=["Arbres","Animaux","Chemins","Bordures","Eau"];box.innerHTML=`<div class="arrange-actions arrange-tools"><button id="arrange-move" class="choice">✋ Déplacer<br><small>Cultures, bâtiments et décors</small></button><button id="arrange-rotate" class="choice">🔄 Tourner<br><small>Rotation de 90°</small></button><button id="arrange-delete" class="choice danger-soft">🗑️ Supprimer<br><small>Décors et animaux placés</small></button></div>`+groups.map(g=>`<h4>${g}</h4><div class="decor-grid">`+Object.entries(DECORS).filter(([,d])=>d.group===g).map(([k,d])=>{let locked=game.level<d.level;return `<button class="decor-choice ${locked?"locked-choice":""}" data-decor="${k}" ${locked?"disabled":""}><img src="${d.img}" alt=""><span><b>${d.name}</b><small>${locked?`🔒 Niveau ${d.level}`:`${d.price}💰 · niv.${d.level}`}</small></span></button>`}).join("")+`</div>`).join("");let mode=(id,tool,text)=>{let b=document.getElementById(id);if(b)b.onclick=()=>{game.selectedTool=tool;closeGameModal();msg(text);renderAll()}};mode("arrange-move","move","✋ Choisis l’élément à déplacer.");mode("arrange-rotate","rotate","🔄 Touche un décor ou un animal pour le tourner.");mode("arrange-delete","deleteDecor","🗑️ Touche le décor ou l’animal à supprimer.");box.querySelectorAll("[data-decor]").forEach(b=>b.onclick=()=>{game.selectedDecor=b.dataset.decor;game.selectedTool="decorate";closeGameModal();msg(`🌿 ${DECORS[game.selectedDecor].name} sélectionné : touche une case libre.`);renderAll()})}
function renderUI(){let pt=document.getElementById("produce-title");if(pt)pt.textContent=zone().type==="mine"?"⛏️ Extraction & culture":zone().type==="forest"?"🌲 Sylviculture":"🌱 Cultures";
document.getElementById("money").textContent=game.money;document.getElementById("level").textContent=game.level;document.getElementById("xp").textContent=game.xp;document.getElementById("zone-name").textContent=ZONES[game.currentZone].name;document.getElementById("zone-subtitle").textContent=zone().type==="mine"?"Extrais des ressources rares ou cultive des champignons.":zone().type==="forest"?"Fais pousser ton bois et prépare tes matériaux.":"Cultive, nourris et développe ton domaine.";const renders=[renderToolbar,renderZoneActions,renderProduceBalance,renderStock,renderOrders,renderBuild,renderAnimals,renderProduction,renderUpgrades,renderDomain,renderProgression,renderArrange];for(const fn of renders){try{fn()}catch(e){console.error("V45 render",fn.name,e)}}}
function renderAll(){production();renderFarm();renderPlayer();renderUI()}

let activePanel=null;
const modal=document.getElementById("game-modal"), modalBody=document.getElementById("modal-body"), modalTitle=document.getElementById("modal-title");
const panelSources=document.getElementById("panel-sources");
const fullscreenToggle=document.getElementById("fullscreen-toggle");
const modalTitles={produce:"🌱 Produire",build:"🔨 Construire",stock:"📦 Stock",manage:"⚙️ Gestion de la parcelle",domain:"🗺️ Domaine",arrange:"✋ Aménager"};
function restoreModalSource(){
  const sec=modalBody.querySelector("section[data-source]");
  if(sec)panelSources.appendChild(sec);
}
function activatePanel(name){
  // Toujours remettre le panneau courant dans sa source avant d'en ouvrir un autre.
  // Sans cela, modalBody.innerHTML détruisait le panneau précédent et ses IDs.
  restoreModalSource();
  activePanel=name;
  document.querySelectorAll(".dock [data-open]").forEach(b=>b.classList.toggle("active",b.dataset.open===name));
  const src=panelSources.querySelector(`[data-source="${name}"]`);
  if(!src)return;
  modalTitle.textContent=modalTitles[name]||"Menu";
  modalBody.replaceChildren(src);
  if(name==="manage")bindResetGame();
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  // V45 : le panneau vient de changer de parent ; on repeuple ses contenus et événements maintenant.
  renderZoneActions(); renderStock(); renderOrders(); renderBuild(); renderAnimals(); renderProduction(); renderUpgrades(); renderDomain(); renderProgression(); renderArrange();
}
function closeGameModal(){
  restoreModalSource();
  modal.classList.add("hidden");document.body.classList.remove("modal-open");activePanel=null;
  document.querySelectorAll(".dock [data-open]").forEach(b=>b.classList.remove("active"));
}
function updateFullscreenButton(){
  if(!fullscreenToggle)return;
  const active=!!document.fullscreenElement;
  fullscreenToggle.textContent=active?"🗗 Quitter plein écran":"⛶ Plein écran";
  fullscreenToggle.setAttribute("aria-pressed",active?"true":"false");
}
async function toggleFullscreen(){
  try{
    if(document.fullscreenElement){
      if(document.exitFullscreen)await document.exitFullscreen();
      return;
    }
    if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();
  }catch(e){}
}
document.querySelectorAll(".dock [data-open]").forEach(b=>b.onclick=()=>activatePanel(b.dataset.open));
function bindResetGame(){
  const btn=document.getElementById("reset-game");
  if(!btn)return;
  btn.onclick=()=>askConfirm("Réinitialiser complètement la partie ? Cette action efface la ferme et les sauvegardes locales de secours sur cet appareil.",()=>{
    RESETTING_GAME=true;
    try{
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem(BACKUP_KEY);
      sessionStorage.clear();
    }catch(e){console.error("Réinitialisation impossible",e)}
    location.reload();
  });
}
document.getElementById("modal-close").onclick=closeGameModal;
modal.onclick=e=>{if(e.target===modal)closeGameModal()};
if(fullscreenToggle){
  fullscreenToggle.onclick=toggleFullscreen;
  updateFullscreenButton();
  document.addEventListener("fullscreenchange",updateFullscreenButton);
}
// Personnage visuel V47 : utilise les 28 PNG fournis, sans modifier les mécaniques de ferme.
const PLAYER_FRAMES={front:6,back:6,left:6,right:6};
let playerVisual={x:0,y:0,dir:"front",frame:0,timer:null};
function playerStartForZone(){let b=unlockBounds();playerVisual.x=Math.floor((b.start+b.end-1)/2);playerVisual.y=b.end-1}
function playerSrc(dir,frame=0){return frame?`assets/character/base/player_${dir}_walk_${pad2(frame)}.png`:`assets/character/base/player_${dir}_idle.png`}
function renderPlayer(){let farm=document.getElementById("farm");let el=document.getElementById("farm-player");if(!el){el=document.createElement("img");el.id="farm-player";el.className="farm-player";el.alt="Personnage";el.draggable=false;farm.appendChild(el)}el.src=playerSrc(playerVisual.dir,playerVisual.frame);el.style.setProperty("--px",playerVisual.x);el.style.setProperty("--py",playerVisual.y)}
function movePlayer(dx,dy,dir){let nx=playerVisual.x+dx,ny=playerVisual.y+dy;if(!unlocked(nx,ny))return;playerVisual.x=nx;playerVisual.y=ny;playerVisual.dir=dir;playerVisual.frame=playerVisual.frame%PLAYER_FRAMES[dir]+1;renderPlayer();clearTimeout(playerVisual.timer);playerVisual.timer=setTimeout(()=>{playerVisual.frame=0;renderPlayer()},140)}
window.addEventListener("keydown",e=>{if(!document.getElementById("game-modal").classList.contains("hidden")||!document.getElementById("map-modal").classList.contains("hidden"))return;let k=e.key.toLowerCase(),m={arrowup:[0,-1,"back"],w:[0,-1,"back"],z:[0,-1,"back"],arrowdown:[0,1,"front"],s:[0,1,"front"],arrowleft:[-1,0,"left"],a:[-1,0,"left"],q:[-1,0,"left"],arrowright:[1,0,"right"],d:[1,0,"right"]}[k];if(m){e.preventDefault();movePlayer(...m)}});
// V52.2 — commandes tactiles : appui bref = 1 case, appui maintenu = déplacement répété.
const MOBILE_MOVES={up:[0,-1,"back"],down:[0,1,"front"],left:[-1,0,"left"],right:[1,0,"right"]};
let mobileMoveDelay=null,mobileMoveRepeat=null;
function stopMobileMove(){clearTimeout(mobileMoveDelay);clearInterval(mobileMoveRepeat);mobileMoveDelay=null;mobileMoveRepeat=null;document.querySelectorAll(".move-btn.is-held").forEach(b=>b.classList.remove("is-held"))}
function startMobileMove(btn){
  if(!document.getElementById("game-modal").classList.contains("hidden")||!document.getElementById("map-modal").classList.contains("hidden"))return;
  const m=MOBILE_MOVES[btn.dataset.move];if(!m)return;stopMobileMove();btn.classList.add("is-held");movePlayer(...m);
  mobileMoveDelay=setTimeout(()=>{mobileMoveRepeat=setInterval(()=>movePlayer(...m),135)},260);
}
document.querySelectorAll(".move-btn[data-move]").forEach(btn=>{
  btn.addEventListener("pointerdown",e=>{e.preventDefault();try{btn.setPointerCapture(e.pointerId)}catch(_){}startMobileMove(btn)});
  btn.addEventListener("pointerup",e=>{e.preventDefault();stopMobileMove()});
  btn.addEventListener("pointercancel",stopMobileMove);btn.addEventListener("lostpointercapture",stopMobileMove);
});
window.addEventListener("blur",stopMobileMove);document.addEventListener("visibilitychange",()=>{if(document.hidden)stopMobileMove()});
const farmEl=document.getElementById("farm");let dragging=false,seen=new Set();farmEl.addEventListener("pointerdown",e=>{let t=e.target.closest(".tile");if(!t||["build","move","rotate","deleteDecor","decorate"].includes(game.selectedTool))return;dragging=true;seen.clear();let x=+t.dataset.x,y=+t.dataset.y;seen.add(`${x},${y}`);act(x,y,true)});farmEl.addEventListener("pointermove",e=>{if(!dragging)return;let el=document.elementFromPoint(e.clientX,e.clientY)?.closest(".tile");if(!el||!farmEl.contains(el))return;let x=+el.dataset.x,y=+el.dataset.y,k=`${x},${y}`;if(!seen.has(k)){seen.add(k);act(x,y,true)}});farmEl.addEventListener("pointerup",()=>{if(dragging){dragging=false;save();renderAll();msg("✋ Action par glissement terminée.")}});farmEl.addEventListener("click",e=>{let t=e.target.closest(".tile");if(t&&["build","move","rotate","deleteDecor","decorate"].includes(game.selectedTool))act(+t.dataset.x,+t.dataset.y)});
document.querySelectorAll("[data-buildtab]").forEach(b=>b.onclick=()=>{game.buildTab=b.dataset.buildtab;renderAll()});document.getElementById("sell-all").onclick=sellAll;document.getElementById("open-map").onclick=()=>{if(typeof closeGameModal==="function"&&!modal.classList.contains("hidden"))closeGameModal();openMap()};document.getElementById("close-map").onclick=closeMap;document.getElementById("map-modal").onclick=e=>{if(e.target.id==="map-modal")closeMap()};load();playerStartForZone();renderAll();window.addEventListener("pagehide",save);window.addEventListener("beforeunload",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save()});setInterval(save,15000);setInterval(()=>{production();renderFarm();renderPlayer();renderUI()},500);
