const FARM_SIZE=16,SAVE_KEY="cjajlkFarmV1",BACKUP_KEY="cjajlkFarmV1_backup",FEED_MS=10*60*1000;
let RESETTING_GAME=false;
const CROPS={wheat:{name:"Blé",ready:"🌾",price:15,sell:28,time:2*60*1000,level:1},carrot:{name:"Carotte",ready:"🥕",price:35,sell:68,time:5*60*1000,level:3},corn:{name:"Maïs",ready:"🌽",price:70,sell:140,time:10*60*1000,level:6}};
const BUILDINGS={barn:{name:"Grange",emoji:"🏚️",price:450,level:1,kind:"buildings",production:true,img:"assets/buildings/barn/barn_lv1.png"},coop:{name:"Poulailler",emoji:"🐔",price:500,level:3,kind:"buildings",production:true,img:"assets/buildings/chicken-coop/chicken_coop_lv1.png"},stable:{name:"Étable",emoji:"🐄",price:0,level:1,kind:"buildings",production:true,img:"assets/buildings/stable/stable_lv1.png"},pond:{name:"Étang",emoji:"💧",price:0,level:1,kind:"water"},
 mill:{name:"Moulin",emoji:"⚙️",price:1600,level:1,kind:"production",production:true,img:"assets/buildings/production/moulin.png"},
 sawmill:{name:"Scierie",emoji:"🪚",price:1400,level:1,kind:"production",production:true,img:"assets/buildings/production/scierie.png"},
 miner:{name:"Mine / atelier minier",emoji:"⛏️",price:2500,level:1,kind:"production",production:true,img:"assets/buildings/production/mine.png"},
 laiterie:{name:"Laiterie",emoji:"🥛",price:1800,level:1,kind:"production",production:true,img:"assets/buildings/production/laiterie.png"},
 huilerie:{name:"Huilerie",emoji:"🌻",price:1900,level:1,kind:"production",production:true,img:"assets/buildings/production/huilerie.png"},
 boulangerie:{name:"Boulangerie",emoji:"🥖",price:2100,level:1,kind:"production",production:true,img:"assets/buildings/production/boulangerie.png"},
 distillerie:{name:"Distillerie",emoji:"🧪",price:2600,level:1,kind:"production",production:true,img:"assets/buildings/production/distillerie.png"},
 carriere:{name:"Carrière",emoji:"🪨",price:2300,level:1,kind:"production",production:true,img:"assets/buildings/production/carriere.png"},
 fromagerie:{name:"Fromagerie",emoji:"🧀",price:2400,level:1,kind:"production",production:true,img:"assets/buildings/production/fromagerie.png"},
 sucrerie:{name:"Sucrerie",emoji:"🍬",price:2800,level:1,kind:"production",production:true,img:"assets/buildings/production/sucrerie.png"},
 atelierTextile:{name:"Atelier textile",emoji:"🧵",price:3000,level:1,kind:"production",production:true,img:"assets/buildings/production/atelier-textile.png"},
 atelierArtisan:{name:"Atelier artisanal",emoji:"🧰",price:3200,level:1,kind:"production",production:true,img:"assets/buildings/production/atelier-artisan.png"},
 forge:{name:"Forge",emoji:"🔥",price:3500,level:1,kind:"production",production:true,img:"assets/buildings/production/forge.png"},
 miellerie:{name:"Miellerie",emoji:"🍯",price:2200,level:1,kind:"production",production:true,img:"assets/buildings/production/miellerie.png"},
 serre:{name:"Serre",emoji:"🌿",price:3300,level:1,kind:"production",production:true,img:"assets/buildings/production/serre.png"},
 pepiniere:{name:"Pépinière",emoji:"🌱",price:2500,level:1,kind:"production",production:true,img:"assets/buildings/production/pepiniere.png"},
 atelierMenuiserie:{name:"Atelier de menuiserie",emoji:"🪚",price:3100,level:1,kind:"production",production:true,img:"assets/buildings/production/atelier-menuiserie.png"},
 charbonniere:{name:"Charbonnière",emoji:"🪵",price:2700,level:1,kind:"production",production:true,img:"assets/buildings/production/charbonniere.png"}};
const FARM_EDIT_ASSETS={
 maison_bleue:{name:"Maison de ferme bleue",img:"assets/buildings/ferme/maison_ferme_bleue.png",w:15,h:19,level:1,price:0},
 maison_rouge:{name:"Maison de ferme rouge",img:"assets/buildings/ferme/maison_ferme_rouge.png",w:15,h:19,level:2,price:150},
 enclos_poules:{name:"Enclos à poules",img:"assets/buildings/enclos/enclos_poules.png",w:15,h:17,level:3,price:500},
 enclos_vaches:{name:"Enclos à vaches",img:"assets/buildings/enclos/enclos_vaches..png",w:17,h:18,level:5,price:1200},
 enclos_cochons:{name:"Enclos à cochons",img:"assets/buildings/enclos/enclos_cochons.png",w:15,h:17,level:7,price:1800}
};
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
// V59.07 — améliorations avec les ressources du domaine. Niveau 5 est la limite actuelle ; buildingStars réserve la progression future.
const BUILDING_MAX_LEVEL=5;
const UPGRADE_RESOURCE_COSTS={
 barn:{1:{wood:12,stone:8},2:{plank:16,stone:18,wheat:20},3:{plank:35,iron:10,corn:30},4:{plank:70,iron:25,diamond:2}},
 coop:{1:{wood:10,wheat:12},2:{plank:14,corn:18,stone:10},3:{plank:30,iron:8,corn:35},4:{plank:60,iron:18,diamond:1}},
 stable:{1:{wood:18,wheat:20},2:{plank:22,stone:20,corn:20},3:{plank:45,iron:12,wheat:45},4:{plank:90,iron:30,diamond:2}},
 pond:{1:{wood:10,stone:12},2:{plank:18,stone:24},3:{plank:35,iron:10,stone:40},4:{plank:70,iron:24,diamond:2}},
 mill:{1:{wheat:15,wood:12,stone:8},2:{corn:25,plank:18,stone:20},3:{flour:20,plank:35,iron:12},4:{flour:50,plank:75,iron:30,diamond:2}},
 sawmill:{1:{wood:20,stone:8},2:{wood:35,stone:20,iron:6},3:{plank:35,iron:14},4:{plank:80,iron:30,diamond:2}},
 miner:{1:{wood:15,stone:20},2:{plank:20,stone:35,iron:8},3:{plank:35,iron:20},4:{plank:70,iron:40,diamond:3,ruby:1}}
};
const RESOURCE_ICONS={wheat:"🌾",carrot:"🥕",corn:"🌽",wood:"🪵",plank:"🪚",stone:"🪨",iron:"⚙️",diamond:"💎",ruby:"♦️",flour:"🥣"};
const BUILDING_LEVEL_BENEFITS={
 mill:["Rations de base","Débloque la farine et +1 ration","+1 rendement de transformation","+1 rendement de transformation","Rendement maximal actuel"],
 sawmill:["Transformation du bois","+1 planche par fabrication","+1 planche par fabrication","+1 planche par fabrication","Rendement maximal actuel"],
 miner:["Extraction de base","Extraction et champignons plus rapides","Temps encore réduits","Temps encore réduits","Vitesse maximale actuelle"],
 barn:["Stockage de base","Capacité augmentée","Capacité augmentée","Capacité augmentée","Capacité maximale actuelle"],
 coop:["Élevage de base","Capacité augmentée","Capacité augmentée","Capacité augmentée","Capacité maximale actuelle"],
 stable:["Élevage de base","Capacité augmentée","Capacité augmentée","Capacité augmentée","Capacité maximale actuelle"],
 pond:["Élevage de base","Capacité augmentée","Capacité augmentée","Capacité augmentée","Capacité maximale actuelle"]
};
const EXPANSION_COSTS={5:300,6:500,7:800,8:1200,9:1800,10:2600,11:3800,12:5500,13:8000,14:11500,15:16000};
const ZONES={main:{name:"Ferme principale",emoji:"🌾",type:"farm",cost:0,start:5,level:1},production:{name:"Zone de production",emoji:"🏭",type:"production",cost:0,start:16,level:1},livestock:{name:"Zone d’élevage",emoji:"🐾",type:"livestock",cost:1600,start:16,level:7},prairie:{name:"Prairie sauvage",emoji:"🌿",type:"farm",cost:1200,start:4,level:7},forest:{name:"Bois enchanté",emoji:"🌲",type:"forest",cost:1800,start:5,level:4},mine:{name:"Mine ancienne",emoji:"⛏️",type:"mine",cost:3500,start:5,level:8},freeA:{name:"Terrain libre A",emoji:"🗺️",type:"free",cost:9000,start:5,level:20},freeB:{name:"Terrain libre B",emoji:"🗺️",type:"free",cost:18000,start:5,level:30}};
function emptyTile(){return{state:"grass",crop:null,plantedAt:null,building:null,resource:null,startedAt:null,decor:null,decorRotation:0}}
function emptyFarm(){return Array.from({length:FARM_SIZE},()=>Array.from({length:FARM_SIZE},emptyTile))}
function normTile(t={}){if("s" in t&&!t.state){let map={grass:"grass",soil:"plowed",crop:"planted",ready:"ready",sapling:"sapling",tree:"tree",mining:"mining",ore:"ore",mushroom:"mushroom",mushready:"mushready"};return{state:map[t.s]||"grass",crop:t.crop||null,plantedAt:t.at||null,building:t.building||null,resource:t.ore||null,startedAt:t.at||null}}return{...emptyTile(),...t,decor:t.decor||null,decorRotation:Number(t.decorRotation)||0}}
function normFarm(f){let out=emptyFarm();if(!Array.isArray(f))return out;let h=Math.min(FARM_SIZE,f.length||0),w=Math.min(FARM_SIZE,Math.max(0,...f.map(r=>Array.isArray(r)?r.length:0)));let ox=w<=10?Math.floor((FARM_SIZE-w)/2):0,oy=h<=10?Math.floor((FARM_SIZE-h)/2):0;for(let y=0;y<h;y++)for(let x=0;x<Math.min(w,f[y]?.length||0);x++)out[y+oy][x+ox]=normTile(f[y][x]);return out}
let game={version:59.21,mapZoom:1,mapPanX:0,mapPanY:0,productionPage:1,tileScales:{},zoneToolbarCollapsed:{},editMode:false,selectedEditAsset:null,editMoveId:null,editOwnedAssets:{},orders:[],ordersDone:0,mineSupplies:{charge:0,spore:0},forestSupplies:{sapling:0},mastery:{farm:0,animal:0,forest:0,mine:0},missions:[],missionsDone:0,money:250,level:1,xp:0,selectedTool:"plow",selectedCrop:"wheat",selectedBuilding:"barn",selectedDecor:"tree_green",buildTab:"buildings",mineMode:"ore",moveSource:null,seeds:{wheat:3,carrot:2,corn:1},stock:{wheat:0,carrot:0,corn:0,eggs:0,milk:0,fish:0,feed:0,wood:0,plank:0,stone:0,iron:0,diamond:0,ruby:0,mushroom:0,flour:0,cheese:0,ingot:0},chickens:0,cows:0,fishCount:0,livestockPositions:{chicken:[],cow:[]},livestockReady:{eggs:0,milk:0},lastEggAt:Date.now(),lastMilkAt:Date.now(),lastFishAt:Date.now(),fedUntil:{coop:0,stable:0,pond:0},buildingLevels:{barn:1,coop:1,stable:1,pond:1,mill:1},autoFeed:false,currentZone:"main",zones:{}};
function freshZones(){let z={};for(const[k,d]of Object.entries(ZONES))z[k]={unlocked:k==="main"||k==="production",type:d.type,size:d.start,farm:emptyFarm(),buildingLevels:{},buildingStars:{},slotBuildings:{},productionScales:{},editPlacements:[]};return z}
function migrate(raw){let d={...raw};let zones=freshZones();let v20=raw?.zones&&Object.values(raw.zones).some(z=>z&&typeof z.size==="number");
 if(v20){for(const k of Object.keys(zones)){let o=raw.zones?.[k];if(o){zones[k]={...zones[k],...o,farm:normFarm(o.farm)}}}zones.main.farm=normFarm(raw.zones?.main?.farm||raw.farm||zones.main.farm);zones.main.size=Math.max(zones.main.size,Math.min(FARM_SIZE,raw.zones?.main?.size||raw.expansionLevel+5||ZONES.main.start));}
 else {zones.main.farm=normFarm(raw.farm);zones.main.size=Math.min(FARM_SIZE,5+(raw.expansionLevel||0));if(raw.zones?.prairie){zones.prairie={...zones.prairie,...raw.zones.prairie,size:Math.min(FARM_SIZE,4+(raw.zones.prairie.expansionLevel||0)),farm:normFarm(raw.zones.prairie.farm)}}}
 for(const [zk,z] of Object.entries(zones)){
  z.buildingLevels={...(z.buildingLevels||{})};
  z.buildingStars={...(z.buildingStars||{})};
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
d.version=59.15;
// V59.13 — sortie du mode test V59.06 : une zone ouverte artificiellement avant son niveau réel
// est reverrouillée, sans effacer son contenu. Elle redeviendra accessible normalement.
for(const [zk,zd] of Object.entries(ZONES)){
 if(zk!=="main"&&zk!=="production"&&zones[zk]&&Number(raw.level||1)<Number(zd.level||1))zones[zk].unlocked=false;
}
d.editOwnedAssets={...(raw.editOwnedAssets||{})};
for(const z of Object.values(zones))if(!z.productionScales||typeof z.productionScales!="object")z.productionScales={};
for(const z of Object.values(zones))for(const item of z.editPlacements||[])if(item?.asset)d.editOwnedAssets[item.asset]=true;
for(const key of Object.keys(d.editOwnedAssets))if(!FARM_EDIT_ASSETS[key])delete d.editOwnedAssets[key];
d.mineSupplies={charge:0,spore:0,...(raw.mineSupplies||{})};d.forestSupplies={sapling:0,...(raw.forestSupplies||{})};d.mastery={farm:0,animal:0,forest:0,mine:0,...(raw.mastery||{})};d.missions=Array.isArray(raw.missions)?raw.missions:[];d.missionsDone=raw.missionsDone||0;d.orders=Array.isArray(raw.orders)?raw.orders:[];d.ordersDone=raw.ordersDone||0;d.zones=zones;d.currentZone=raw.currentZone||raw.current||"main";if(!zones[d.currentZone]?.unlocked)d.currentZone="main";d.seeds={wheat:3,carrot:2,corn:1,...(raw.seeds||{})};d.stock={...game.stock,...(raw.stock||{})};d.chickens=raw.chickens||0;d.cows=raw.cows||0;d.fishCount=raw.fishCount||0;d.livestockPositions={chicken:Array.isArray(raw.livestockPositions?.chicken)?raw.livestockPositions.chicken:[],cow:Array.isArray(raw.livestockPositions?.cow)?raw.livestockPositions.cow:[]};d.livestockReady={eggs:Math.max(0,Number(raw.livestockReady?.eggs)||0),milk:Math.max(0,Number(raw.livestockReady?.milk)||0)};d.lastEggAt=raw.lastEggAt||Date.now();d.lastMilkAt=raw.lastMilkAt||Date.now();d.lastFishAt=raw.lastFishAt||Date.now();d.fedUntil={coop:0,stable:0,pond:0,...(raw.fedUntil||{})};d.buildingLevels={barn:1,coop:1,stable:1,pond:1,mill:1,...(raw.buildingLevels||{})};d.autoFeed=!!raw.autoFeed;d.mapZoom=Math.max(.8,Math.min(1.4,Number(raw.mapZoom)||1));d.tileScales=(raw.tileScales&&typeof raw.tileScales==="object")?raw.tileScales:{};d.zoneToolbarCollapsed={...(raw.zoneToolbarCollapsed||{})};d.mineMode=raw.mineMode||"ore";d.selectedDecor=raw.selectedDecor||"tree_green";d.moveSource=null;d.editMode=false;d.selectedEditAsset=null;d.editMoveId=null;for(const z of Object.values(zones))if(!Array.isArray(z.editPlacements))z.editPlacements=[];return d}
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
function hasBuilding(k){return Object.values(game.zones).some(z=>z.unlocked&&zoneHasBuilding(k,z))}
function zoneHasBuilding(k,z=zone()){return !!(z.slotBuildings&&Object.values(z.slotBuildings).includes(k))||z.farm.some(r=>r.some(t=>t.building===k))}
function zoneBLevel(k,z=zone()){return zoneHasBuilding(k,z)?((z.buildingLevels||{})[k]||1):0}
function bLevel(k){let levels=Object.values(game.zones).filter(z=>z.unlocked&&zoneHasBuilding(k,z)).map(z=>zoneBLevel(k,z));return levels.length?Math.max(...levels):0}
function cropCapacity(){let total=25;for(const z of Object.values(game.zones)){if(!z.unlocked||!zoneHasBuilding("barn",z))continue;let lv=zoneBLevel("barn",z);total += [75,150,250][Math.max(0,lv-1)]||75}return total}
function cropStored(){return game.stock.wheat+game.stock.carrot+game.stock.corn}
function ensureCropProgress(){if(!game.cropProgress)game.cropProgress={};for(const k of Object.keys(CROPS)){let p=game.cropProgress[k]||{};game.cropProgress[k]={level:Math.max(1,Math.min(100,Number(p.level)||1)),stars:Math.max(0,Number(p.stars)||0),xp:Math.max(0,Number(p.xp)||0)}}}
function cropXpNeed(k){ensureCropProgress();let p=game.cropProgress[k];return Math.round(8*Math.pow(1.055,p.level-1)+p.level*1.5)}
function gainCropXp(k,n=1){ensureCropProgress();let p=game.cropProgress[k];p.xp+=n;while(p.xp>=cropXpNeed(k)){p.xp-=cropXpNeed(k);p.level++;if(p.level>100){p.level=1;p.stars++;success(`⭐ ${CROPS[k].name} gagne une étoile de maîtrise !`)}}}
function cropRankText(k){ensureCropProgress();let p=game.cropProgress[k];return `${p.stars?"⭐".repeat(Math.min(5,p.stars))+" ":""}Niv.${p.level} · ${p.xp}/${cropXpNeed(k)} XP`}

function animalCap(k){let lv=bLevel(k);return k==="coop"?[4,6,8][Math.max(0,lv-1)]:k==="stable"?[2,4,6][Math.max(0,lv-1)]:k==="pond"?[3,5,8][Math.max(0,lv-1)]:0}
const LEVEL_REWARDS={2:["🏚️ Grange","🗺️ Extension 6×6"],3:["🥕 Carotte"],4:["🌲 Bois enchanté","🪚 Scierie"],5:["🐔 Poulailler"],6:["🌽 Maïs"],7:["🌿 Prairie sauvage"],8:["⛏️ Mine ancienne","🛠️ Atelier minier"],9:["⚙️ Moulin"],10:["🐄 Étable"],11:["⬆️ Grange niv.2"],12:["⬆️ Moulin niv.2"],13:["⬆️ Poulailler niv.2"],14:["⬆️ Scierie niv.2"],15:["🐟 Étang & poissons"],16:["📦 Capacité agricole"],17:["⬆️ Atelier minier niv.2"],18:["⬆️ Étable niv.2"],19:["💎 Ressources rares"],20:["🗺️ Terrain libre A"],21:["⬆️ Grange niv.3"],22:["⬆️ Étang niv.2"],23:["⬆️ Poulailler niv.3"],24:["⬆️ Moulin niv.3"],25:["⬆️ Scierie niv.3"],26:["📋 Commandes avancées"],27:["⬆️ Atelier minier niv.3"],28:["⬆️ Étable niv.3"],29:["⭐ Bonus de maîtrise"],30:["🗺️ Terrain libre B","⬆️ Étang niv.3"]};
function levelUnlocks(lv){return LEVEL_REWARDS[lv]||[]}
function addXP(n){game.xp+=n;let gained=[];while(game.xp>=Math.round(80*Math.pow(game.level,1.18))){game.xp-=Math.round(80*Math.pow(game.level,1.18));game.level++;let reward=75+game.level*25;game.money+=reward;gained.push(`Niveau ${game.level} • +${reward}💰`+(levelUnlocks(game.level).length?` • Nouveau : ${levelUnlocks(game.level).join(", ")}`:""))}if(gained.length)setTimeout(()=>msg("⭐ "+gained.join(" | ")),0)}
function specialDuration(state){
  if(state==="sapling")return Math.max(4*60*1000,8*60*1000-(Math.max(1,bLevel("sawmill"))-1)*2*60*1000);
  if(state==="mining")return Math.max(9*60*1000,15*60*1000-(Math.max(1,bLevel("miner"))-1)*3*60*1000);
  if(state==="mushroom")return Math.max(7*60*1000,12*60*1000-(Math.max(1,bLevel("miner"))-1)*2.5*60*1000);
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
const AUTO_PATH_KEYS=new Set();
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
function tileScaleKey(x,y){return `${game.currentZone}:${x}:${y}`}
function getTileScale(x,y){game.tileScales=game.tileScales||{};return Math.max(.6,Math.min(1.6,Number(game.tileScales[tileScaleKey(x,y)])||1))}
function setTileScale(x,y,v){game.tileScales=game.tileScales||{};game.tileScales[tileScaleKey(x,y)]=Math.max(.6,Math.min(1.6,Number(v)||1));save();renderAll()}
function setTileVisual(b,t,x=null,y=null){let src=tileAsset(t);if(src){let im=document.createElement("img");im.className="tile-art";im.src=src;im.alt="";im.draggable=false;if(t.decor)im.style.setProperty("--rot",`${Number(t.decorRotation)||0}deg`);if(x!==null&&y!==null)im.style.transform=`scale(${getTileScale(x,y)}) rotate(${Number(t.decorRotation)||0}deg)`;im.onerror=()=>{im.remove();b.insertAdjacentText("afterbegin",tileIcon(t))};b.appendChild(im)}else b.textContent=tileIcon(t)}
function renderFarm(){let el=document.getElementById("farm");el.style.zoom=String(Math.max(1,Math.min(1.4,Number(game.mapZoom)||1)));let sceneFarm=zone().type==="farm"&&game.currentZone==="main";let sceneProduction=zone().type==="production";let sceneLivestock=zone().type==="livestock";let freeZone=["freeA","freeB"].includes(game.currentZone);let illustratedKind=freeZone?(zone().type==="farm"?"prairie":zone().type):game.currentZone;let sceneIllustrated=["prairie","forest","mine","livestock"].includes(illustratedKind);el.className=`farm zone-${zone().type}${sceneFarm?" farm-scene-main":""}${sceneProduction?" production-scene":""}${sceneIllustrated?` illustrated-zone illustrated-${illustratedKind}`:""}`;el.innerHTML="";if(sceneProduction){renderProductionSlots(el);renderFarmEditLayer(el);return}if(sceneLivestock){renderLivestockAnimals(el);renderFarmEditLayer(el);return}let grid=el;if(sceneFarm||sceneIllustrated){grid=document.createElement("div");grid.className=sceneFarm?"farm-field-grid":"illustrated-field-grid";el.appendChild(grid)}for(let y=0;y<FARM_SIZE;y++)for(let x=0;x<FARM_SIZE;x++){let t=farm()[y][x],b=document.createElement("button");b.className="tile";b.dataset.x=x;b.dataset.y=y;if(!unlocked(x,y)){b.classList.add("locked");b.setAttribute("aria-label","Terrain verrouillé");grid.appendChild(b);continue}let footprint=buildingAtCell(x,y);if(footprint&&!(footprint.x===x&&footprint.y===y)){b.classList.add("building-footprint");b.dataset.building=footprint.key}mature(t);if(t.decor)b.classList.add("decorated");if(t.building){b.classList.add("building");let[fw,fh]=buildingFootprint(t.building);b.style.setProperty("--fw",fw);b.style.setProperty("--fh",fh);if(t.building==="pond")b.classList.add("water")}if(["plowed","planted","ready"].includes(t.state))b.classList.add(t.state==="ready"?"ready":"plowed");if(["sapling","tree"].includes(t.state))b.classList.add("forest-tile");if(["mining","ore"].includes(t.state))b.classList.add("rock");if(game.moveSource&&game.moveSource.zone===game.currentZone&&game.moveSource.x===x&&game.moveSource.y===y)b.classList.add("selected");setTileVisual(b,t,x,y);grid.appendChild(b)}renderFarmEditLayer(el)}

const FARM_SCENE_SLOTS={L1:{left:4,top:5,width:16,height:18},L2:{left:4,top:43,width:16,height:18},R1:{left:80,top:36,width:16,height:18},R2:{left:80,top:62,width:16,height:18}};
const PRODUCTION_SLOTS={
 // Les 16 emplacements suivent exactement les parcelles dessinées sur production-zone-01.png.
 P01:{left:9.2,top:24.0,width:8.5,height:14.5},
 P02:{left:18.1,top:24.0,width:8.5,height:14.5},
 P03:{left:27.0,top:24.0,width:8.5,height:14.5},
 P04:{left:35.9,top:24.0,width:8.5,height:14.5},
 P05:{left:57.7,top:24.0,width:8.5,height:14.5},
 P06:{left:66.6,top:24.0,width:8.5,height:14.5},
 P07:{left:75.5,top:24.0,width:8.5,height:14.5},
 P08:{left:84.4,top:24.0,width:8.5,height:14.5},
 P09:{left:9.2,top:56.0,width:8.5,height:14.5},
 P10:{left:18.1,top:56.0,width:8.5,height:14.5},
 P11:{left:27.0,top:56.0,width:8.5,height:14.5},
 P12:{left:35.9,top:56.0,width:8.5,height:14.5},
 P13:{left:57.7,top:56.0,width:8.5,height:14.5},
 P14:{left:66.6,top:56.0,width:8.5,height:14.5},
 P15:{left:75.5,top:56.0,width:8.5,height:14.5},
 P16:{left:84.4,top:56.0,width:8.5,height:14.5}
};
function productionImage(k){return BUILDINGS[k]?.img||null}
function buildAtProductionSlot(id){let k=game.selectedBuilding,d=BUILDINGS[k];if(zone().type!=="production")return false;if(!d?.production){activatePanel("build");return missing("🏭 Choisis d’abord un bâtiment de production.")}if(game.level<d.level)return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);zone().slotBuildings=zone().slotBuildings||{};if(zone().slotBuildings[id])return missing("🏗️ Cet emplacement est déjà occupé.");if(zoneHasBuilding(k))return missing(`🏗️ ${d.name} est déjà installé dans cette zone.`);let price=d.price;if(game.money<price)return missing(`💰 Il manque ${price-game.money} pièce(s).`);game.money-=price;zone().slotBuildings[id]=k;zone().buildingLevels=zone().buildingLevels||{};zone().buildingLevels[k]=1;save();renderAll();success(`🏭 ${d.name} installé.`)}
function ensureLivestockPositions(kind,count,defaults){
 game.livestockPositions=game.livestockPositions||{chicken:[],cow:[]};
 let arr=Array.isArray(game.livestockPositions[kind])?game.livestockPositions[kind]:(game.livestockPositions[kind]=[]);
 while(arr.length<count){let d=defaults[arr.length%defaults.length];arr.push({x:d[0],y:d[1]})}
 if(arr.length>count)arr.length=count;
 return arr
}

function livestockScaleKey(kind,index){return kind+":"+index}
function getLivestockScale(kind,index){
 game.livestockScales=game.livestockScales||{};
 let k=livestockScaleKey(kind,index),v=Number(game.livestockScales[k]??1);
 return Number.isFinite(v)?Math.max(.6,Math.min(1.65,v)):1;
}
function setLivestockScale(kind,index,v){
 game.livestockScales=game.livestockScales||{};
 game.livestockScales[livestockScaleKey(kind,index)]=Math.max(.6,Math.min(1.65,Number(v)||1));
 save();renderFarm();
}
function showLivestockScaleControls(kind,index){
 closeContextActions();
 contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.textContent="✏️ "+(kind==="cow"?"Vache":"Poule");contextActions.appendChild(title);
 let minus=document.createElement("button");minus.textContent="−";minus.onclick=()=>setLivestockScale(kind,index,getLivestockScale(kind,index)-.1);contextActions.appendChild(minus);
 let val=document.createElement("span");val.textContent=Math.round(getLivestockScale(kind,index)*100)+" %";contextActions.appendChild(val);
 let plus=document.createElement("button");plus.textContent="+";plus.onclick=()=>setLivestockScale(kind,index,getLivestockScale(kind,index)+.1);contextActions.appendChild(plus);
 let close=document.createElement("button");close.textContent="✕ Fermer";close.onclick=closeContextActions;contextActions.appendChild(close);
 contextOverlay.classList.remove("hidden");
}
function productionScaleKey(id){return id}
function getProductionScale(id){
 zone().productionScales=zone().productionScales||{};
 let v=Number(zone().productionScales[productionScaleKey(id)]??1);
 return Number.isFinite(v)?Math.max(.6,Math.min(1.6,v)):1;
}
function setProductionScale(id,v){
 zone().productionScales=zone().productionScales||{};
 zone().productionScales[productionScaleKey(id)]=Math.max(.6,Math.min(1.6,Number(v)||1));
 save();renderAll();
}
function renderLivestockAnimals(el){
 const layer=document.createElement("div");
 layer.className="livestock-animal-layer"+(game.editMode?" editing":"");
 const chickenPos=[[18,48],[23,53],[28,47],[33,55],[20,59],[30,61],[25,43],[35,49]];
 const cowPos=[[57,42],[66,48],[75,43],[61,55],[71,57],[80,51]];
 const chickenImgs=["chicken_hen_brown.png","chicken_hen_white.png","chicken_hen_brown_eating.png"];
 const cowImgs=["cow_standing_01.png","cow_standing_02.png","cow_standing_03.png","cow_eating.png","cow_resting_01.png","cow_resting_02.png"];
 const add=(kind,count,defaults,imgs,dir)=>{
  const positions=ensureLivestockPositions(kind,count,defaults);
  for(let i=0;i<count;i++){
   const img=document.createElement("img"),pos=positions[i];
   img.className=`livestock-animal livestock-${kind}`;
   img.src=`assets/animals/${dir}/${imgs[i%imgs.length]}`;
   img.alt=kind==="chicken"?"Poule":"Vache";img.title=game.editMode?`${img.alt} — glisser pour déplacer`:img.alt;
   img.style.left=pos.x+"%";img.style.top=pos.y+"%";img.style.setProperty("--animal-scale",String(getLivestockScale(kind,i)));
   if(!game.editMode){
    img.style.pointerEvents="auto";img.style.cursor="pointer";
    img.onclick=e=>{e.preventDefault();e.stopPropagation();openLivestockContext(kind)};
   }
   if(game.editMode){
    img.style.pointerEvents="auto";img.style.cursor="grab";img.dataset.animalKind=kind;img.dataset.animalIndex=String(i);
    let dragging=false,moved=false;
    img.onclick=e=>{e.preventDefault();e.stopPropagation();showLivestockScaleControls(kind,i)};
    img.onpointerdown=e=>{e.preventDefault();e.stopPropagation();dragging=true;moved=false;img.setPointerCapture?.(e.pointerId)};
    img.onpointermove=e=>{if(!dragging)return;e.preventDefault();e.stopPropagation();moved=true;let pt=editPointFromEvent(e);pos.x=pt.x;pos.y=pt.y;img.style.left=pos.x+"%";img.style.top=pos.y+"%"};
    img.onpointerup=e=>{e.preventDefault();e.stopPropagation();if(!dragging){showLivestockScaleControls(kind,i);return}dragging=false;img.releasePointerCapture?.(e.pointerId);if(moved){save();success("✋ Position de l’animal sauvegardée.")}else showLivestockScaleControls(kind,i)};
    img.onpointercancel=e=>{dragging=false;moved=false;try{img.releasePointerCapture?.(e.pointerId)}catch(_){}};
   }
   layer.appendChild(img);
  }
 };
 add("chicken",game.chickens||0,chickenPos,chickenImgs,"chicken");
 add("cow",game.cows||0,cowPos,cowImgs,"cow");
 el.appendChild(layer);
}

function productionSlotId(baseId){let n=Number(String(baseId).replace("P",""))||1;return `P${String(n+((game.productionPage||1)-1)*16).padStart(2,"0")}`}
function renderProductionSlots(el){
 let layer=document.createElement("div");layer.className="production-slot-layer";zone().slotBuildings=zone().slotBuildings||{};zone().productionScales=zone().productionScales||{};
 game.productionPage=Math.max(1,Math.min(2,Number(game.productionPage)||1));
 for(const[baseId,pos]of Object.entries(PRODUCTION_SLOTS)){let id=productionSlotId(baseId),slot=document.createElement("button"),k=zone().slotBuildings[id];slot.className="production-slot"+(k?" occupied":"");slot.style.cssText=`left:${pos.left}%;top:${pos.top}%;width:${pos.width}%;height:${pos.height}%;`;slot.dataset.slot=id;if(k){let im=document.createElement("img"),scale=Math.max(.6,Math.min(1.6,Number(zone().productionScales[id])||1));im.src=productionImage(k);im.alt=BUILDINGS[k]?.name||k;im.style.transform=`scale(${scale})`;im.style.transformOrigin="center center";slot.appendChild(im);slot.title=BUILDINGS[k]?.name||k;slot.onclick=e=>{e.preventDefault();e.stopPropagation();if(game.editMode){openProductionEditContext(id,k);return}openProductionBuildingWindow(id,k)}}else{slot.title=`Emplacement ${id} libre`;slot.onclick=e=>{e.stopPropagation();if(game.productionMoveSource){moveProductionToSlot(id);return}openProductionContext(id)}}layer.appendChild(slot)}el.appendChild(layer);
 let nav=document.createElement("div");nav.className="production-page-nav";nav.innerHTML=`<button type="button" data-prod-page="1" class="${game.productionPage===1?'active':''}">Production 1</button><span>16 emplacements</span><button type="button" data-prod-page="2" class="${game.productionPage===2?'active':''}">Production 2</button>`;el.appendChild(nav);nav.querySelectorAll('[data-prod-page]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();game.productionPage=+b.dataset.prodPage;game.productionMoveSource=null;closeContextActions();save();renderFarm()})
}
function buildAtFarmSlot(id){let d=BUILDINGS[game.selectedBuilding],k=game.selectedBuilding;if(!d)return msg("Choisis un bâtiment.");if(game.selectedTool!=="build")return msg("🛠️ Choisis Construire puis un bâtiment.");if(d.zoneType||zone().type!=="farm")return msg("Ce bâtiment ne se place pas ici.");zone().slotBuildings=zone().slotBuildings||{};if(zone().slotBuildings[id])return msg("🏗️ Cet emplacement est déjà occupé.");if(zoneHasBuilding(k))return msg(`🏗️ Cette parcelle possède déjà : ${d.name}.`);if(game.level<d.level)return msg(`🔒 ${d.name} : niveau ${d.level}.`);if(game.money<d.price)return missing(`💰 Ressources insuffisantes : il manque ${d.price-game.money} pièce(s) pour ${d.name}.`);game.money-=d.price;zone().slotBuildings[id]=k;zone().buildingLevels=zone().buildingLevels||{};zone().buildingLevels[k]=1;if(k==="coop")game.fedUntil.coop=Date.now()+FEED_MS;if(k==="stable")game.fedUntil.stable=Date.now()+FEED_MS;if(k==="pond")game.fedUntil.pond=Date.now()+FEED_MS;save();renderAll();success(`🏗️ ${d.name} construit.`)}
function renderFarmSlots(el){let layer=document.createElement("div");layer.className="farm-slot-layer";zone().slotBuildings=zone().slotBuildings||{};zone().slotDecorations=zone().slotDecorations||{};for(const[id,pos]of Object.entries(FARM_SCENE_SLOTS)){let slot=document.createElement("button"),k=zone().slotBuildings[id],decor=zone().slotDecorations[id];slot.className="farm-scene-slot"+((k||decor)?" occupied":"");slot.style.cssText=`left:${pos.left}%;top:${pos.top}%;width:${pos.width}%;height:${pos.height}%`;slot.dataset.slot=id;if(k){let src=ASSETS.buildings[k];let lv=Math.max(1,Math.min(3,zoneBLevel(k)||1));let im=document.createElement("img");im.src=src+lv+(k==="sawmill"&&lv===2?"..png":".png");im.alt=BUILDINGS[k]?.name||"Bâtiment";slot.appendChild(im);slot.title=BUILDINGS[k]?.name||k}else if(decor&&DECORS[decor]){let im=document.createElement("img");im.src=DECORS[decor].img;im.alt=DECORS[decor].name;slot.appendChild(im);slot.title=DECORS[decor].name;slot.onclick=e=>{e.stopPropagation();openFarmSlotDecorContext(id,decor)}}else{slot.title="Emplacement décoration libre";slot.onclick=e=>{e.stopPropagation();openFarmSlotDecorContext(id)}}layer.appendChild(slot)}el.appendChild(layer)}
function buildAt(t,x,y){let k=game.selectedBuilding,d=BUILDINGS[k];if(!d)return msg("Choisis un bâtiment.");if(d.zoneType&&d.zoneType!==zone().type)return msg("Ce bâtiment appartient à une autre zone.");if(!d.zoneType&&zone().type!=="farm")return msg("Ces bâtiments se construisent dans une zone agricole.");if(game.level<d.level)return msg(`🔒 ${d.name} : niveau ${d.level}.`);let[w,h]=buildingFootprint(k);if(!footprintFree(x,y,k))return msg(`🏗️ Il faut un espace libre de ${w}×${h} cases.`);if(zoneHasBuilding(k))return msg(`🏗️ Cette parcelle possède déjà : ${d.name}.`);if(game.money<d.price)return missing(`💰 Ressources insuffisantes : il manque ${d.price-game.money} pièce(s) pour ${d.name}.`);game.money-=d.price;t.building=k;zone().buildingLevels=zone().buildingLevels||{};zone().buildingLevels[k]=1;if(k==="coop")game.fedUntil.coop=Date.now()+FEED_MS;if(k==="stable")game.fedUntil.stable=Date.now()+FEED_MS;if(k==="pond")game.fedUntil.pond=Date.now()+FEED_MS;msg(`🏗️ ${d.name} construit sur ${w}×${h} cases.`)}
function moveAct(x,y,t){if(!game.moveSource){let hit=buildingAtCell(x,y);if(hit&&!(hit.x===x&&hit.y===y)){x=hit.x;y=hit.y;t=farm()[y][x]}if(t.state==="grass"&&!t.building&&!t.decor)return msg("Choisis une culture, décoration, ressource ou bâtiment à déplacer.");game.moveSource={zone:game.currentZone,x,y,data:structuredClone(t)};msg(t.building?"✋ Bâtiment sélectionné : choisis un espace 2×2 libre.":"✋ Choisis maintenant une case verte libre.");return renderAll()}let src=game.zones[game.moveSource.zone].farm[game.moveSource.y][game.moveSource.x],k=game.moveSource.data.building;if(k){if(!footprintFree(x,y,k,zone(),{x:game.moveSource.x,y:game.moveSource.y}))return msg("🏗️ Il faut un espace 2×2 libre pour déplacer ce bâtiment.")}else if(t.state!=="grass"||t.building||buildingAtCell(x,y))return msg("Destination occupée.");Object.assign(t,structuredClone(game.moveSource.data));Object.assign(src,emptyTile());game.moveSource=null;msg("✋ Élément déplacé.");save();renderAll()}
function rotateAct(x,y,t){if(!t.decor)return msg("🔄 Choisis une décoration ou un animal placé.");t.decorRotation=((Number(t.decorRotation)||0)+90)%360;save();renderAll();msg("🔄 Élément tourné de 90°.")}
function deleteDecorAct(x,y,t){if(!t.decor)return msg("🗑️ Choisis une décoration ou un animal placé.");let d=DECORS[t.decor],name=d?.name||"Élément",kind=decorNetworkKind(t.decor);askConfirm(`Supprimer ${name} ?`,()=>{t.decor=null;t.decorRotation=0;if(kind)retileNetworkAround(x,y);save();renderAll();success(`🗑️ ${name} supprimé.`)})}
function ensureEditPlacements(z=zone()){if(!Array.isArray(z.editPlacements))z.editPlacements=[];return z.editPlacements}
function ensureEditOwnedAssets(){if(!game.editOwnedAssets||typeof game.editOwnedAssets!="object")game.editOwnedAssets={};return game.editOwnedAssets}
function editAssetState(key){let d=FARM_EDIT_ASSETS[key];let owned=!!ensureEditOwnedAssets()[key];if(owned)return{kind:"owned",text:"✓ Possédé",note:"Déjà acheté"};if(game.level<(d?.level||1))return{kind:"locked",text:`🔒 Niveau ${d.level}`,note:`Débloqué au niveau ${d.level}`};return{kind:"buy",text:d.price?`🪙 ${d.price}`:"Gratuit",note:d.price?`Coût unique : ${d.price} pièces`:`Aucun coût`}}
function buyEditAsset(key){let d=FARM_EDIT_ASSETS[key];if(!d)return false;if(game.level<d.level)return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`),false;let owned=ensureEditOwnedAssets();if(owned[key])return true;let price=Number(d.price)||0;if(game.money<price)return missing("🪙 Pièces insuffisantes."),false;game.money-=price;owned[key]=true;save();renderAll();success(price?`🪙 ${d.name} acheté.`:`✓ ${d.name} obtenu.`);return true}
function renderFarmEditLayer(el){
 let layer=document.createElement("div");layer.className="farm-edit-layer"+(game.editMode?" editing":"");
 for(const item of ensureEditPlacements()){
  let d=FARM_EDIT_ASSETS[item.asset];if(!d)continue;
  let b=document.createElement("button");b.className="farm-edit-item";b.dataset.editId=item.id;
  let scale=Math.max(.6,Math.min(1.6,Number(item.scale)||1));
  b.style.cssText=`left:${item.x}%;top:${item.y}%;width:${d.w*scale}%;height:${d.h*scale}%`;
  b.innerHTML=`<img src="${d.img}" alt="${d.name}">`;
  b.title=d.name;b.onclick=e=>{e.stopPropagation();if(!game.editMode)openEditItemContext(item.id)};
  if(game.editMode){
   let dragging=false,moved=false;
   b.onpointerdown=e=>{e.stopPropagation();dragging=true;moved=false;b.setPointerCapture?.(e.pointerId)};
   b.onpointermove=e=>{if(!dragging)return;e.stopPropagation();moved=true;let pt=editPointFromEvent(e),sc=Math.max(.6,Math.min(1.6,Number(item.scale)||1));item.x=Math.max(0,Math.min(100-d.w*sc,pt.x-d.w*sc/2));item.y=Math.max(0,Math.min(100-d.h*sc,pt.y-d.h*sc/2));b.style.left=item.x+"%";b.style.top=item.y+"%"};
   b.onpointerup=e=>{if(!dragging)return;e.stopPropagation();dragging=false;b.releasePointerCapture?.(e.pointerId);if(moved){save();success("✋ Position sauvegardée.")}else openEditItemContext(item.id)};
  }
  layer.appendChild(b)
 }
 if(game.editMode){let hint=document.createElement("div");hint.className="edit-mode-badge";hint.textContent=game.editMoveId?"✋ Touche le nouvel emplacement":"✏️ MODE ÉDITION";layer.appendChild(hint)}
 el.appendChild(layer)
}
function editPointFromEvent(e){let r=document.getElementById("farm").getBoundingClientRect();return{x:Math.max(1,Math.min(99,(e.clientX-r.left)/r.width*100)),y:Math.max(1,Math.min(99,(e.clientY-r.top)/r.height*100))}}
function placeEditAssetAt(e){
 if(!game.editMode)return false;let pt=editPointFromEvent(e),items=ensureEditPlacements();
 if(game.editMoveId){let it=items.find(v=>v.id===game.editMoveId);if(it){let d=FARM_EDIT_ASSETS[it.asset];it.x=Math.max(0,Math.min(100-d.w,pt.x-d.w/2));it.y=Math.max(0,Math.min(100-d.h,pt.y-d.h/2));game.editMoveId=null;save();renderAll();success("✋ Élément déplacé.");return true}}
 let d=FARM_EDIT_ASSETS[game.selectedEditAsset];if(!d)return missing("✏️ Choisis d’abord un élément dans le menu Édition."),true;
 if(!ensureEditOwnedAssets()[game.selectedEditAsset]){if(!buyEditAsset(game.selectedEditAsset))return true}
 items.push({id:"e"+Date.now()+Math.random().toString(16).slice(2),asset:game.selectedEditAsset,x:Math.max(0,Math.min(100-d.w,pt.x-d.w/2)),y:Math.max(0,Math.min(100-d.h,pt.y-d.h/2)),scale:1});save();renderAll();success(`🏡 ${d.name} placé.`);return true
}
function openEditItemContext(id){
 let item=ensureEditPlacements().find(v=>v.id===id);if(!item)return;let d=FARM_EDIT_ASSETS[item.asset];
 contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";title.textContent=`🏡 ${d?.name||"Élément"}`;contextActions.appendChild(title);
 contextButton("➖",()=>{item.scale=Math.max(.6,Math.round(((Number(item.scale)||1)-.1)*10)/10);save();renderAll();openEditItemContext(id)});
 let size=document.createElement("span");size.className="edit-size-label";size.textContent=`${Math.round((Number(item.scale)||1)*100)} %`;contextActions.appendChild(size);
 contextButton("➕",()=>{item.scale=Math.min(1.6,Math.round(((Number(item.scale)||1)+.1)*10)/10);save();renderAll();openEditItemContext(id)});
 contextButton("✋ Déplacer",()=>{game.editMode=true;game.editMoveId=id;closeContextActions();renderAll();success("✋ Glisse l’élément ou touche son nouvel emplacement.")});
 contextButton("🗑️ Retirer",()=>askConfirm("Retirer cet élément de la ferme ?",()=>{zone().editPlacements=ensureEditPlacements().filter(v=>v.id!==id);save();closeContextActions();renderAll();success("🗑️ Élément retiré.")}));
 contextButton("✕ Fermer",closeContextActions)
}
function recoverEditedAssets(){
 game.livestockScales=game.livestockScales||{};for(const k of Object.keys(game.livestockScales))game.livestockScales[k]=Math.max(.6,Math.min(1.65,Number(game.livestockScales[k])||1));
 game.livestockPositions=game.livestockPositions||{chicken:[],cow:[]};for(const kind of ["chicken","cow"])for(const p of (game.livestockPositions[kind]||[])){p.x=Math.max(4,Math.min(96,Number(p.x)||50));p.y=Math.max(8,Math.min(92,Number(p.y)||50))}
 for(const item of ensureEditPlacements()){item.scale=Math.max(.6,Math.min(1.6,Number(item.scale)||1));item.x=Math.max(3,Math.min(97,Number(item.x)||50));item.y=Math.max(5,Math.min(95,Number(item.y)||50))}
 save();renderAll();success("🛟 Éléments replacés dans la zone visible.")
}
function renderEditCatalog(){let box=document.getElementById("edit-catalog");if(!box)return;ensureEditOwnedAssets();box.innerHTML=`<div class="edit-status"><b>✏️ ${game.editMode?"Mode Édition actif":"Mode Édition inactif"}</b><button id="toggle-edit-mode" class="choice">${game.editMode?"Quitter":"Activer"}</button></div><p class="hint">Choisis un élément puis touche exactement l’endroit où tu veux le placer. Taille minimale des animaux : 60 %. Si un élément est perdu, utilise la récupération.</p><button id="recover-edit-assets" class="choice">🛟 Récupérer les éléments perdus</button><div class="edit-catalog-grid">${Object.entries(FARM_EDIT_ASSETS).map(([k,d])=>{let st=editAssetState(k);return `<button class="edit-choice ${game.selectedEditAsset===k?"active":""} ${st.kind}" data-edit-asset="${k}" ${st.kind==="locked"?"disabled":""}><img src="${d.img}" alt=""><span>${d.name}</span><small>${st.text}</small></button>`}).join("")}</div>`;let r=box.querySelector("#recover-edit-assets");if(r)r.onclick=recoverEditedAssets;let t=box.querySelector("#toggle-edit-mode");if(t)t.onclick=()=>{game.editMode=!game.editMode;game.editMoveId=null;if(!game.editMode)game.selectedEditAsset=null;save();closeGameModal();renderAll();success(game.editMode?"✏️ Mode Édition activé.":"✅ Mode Édition terminé.")};box.querySelectorAll("[data-edit-asset]").forEach(b=>b.onclick=()=>{let key=b.dataset.editAsset,st=editAssetState(key);if(st.kind==="locked")return missing(`🔒 ${FARM_EDIT_ASSETS[key].name} se débloque au niveau ${FARM_EDIT_ASSETS[key].level}.`);if(st.kind==="buy"&&!buyEditAsset(key))return;game.editMode=true;game.selectedEditAsset=key;game.editMoveId=null;closeGameModal();renderAll();success(`✏️ ${FARM_EDIT_ASSETS[key].name} : touche son emplacement.`)})}
function openTileEditContext(x,y){
 if(!game.editMode||!unlocked(x,y))return;let t=farm()[y][x],hit=buildingAtCell(x,y);if(hit){x=hit.x;y=hit.y;t=farm()[y][x]}
 if(!t.building&&!t.decor&&!tileAsset(t))return missing("✏️ Aucun asset modifiable sur cette case.");
 let name=t.building?(BUILDINGS[t.building]?.name||"Bâtiment"):t.decor?(DECORS[t.decor]?.name||"Décoration"):t.crop?(CROPS[t.crop]?.name||"Culture"):t.state==="tree"?"Arbre":t.state==="sapling"?"Jeune arbre":t.state==="ore"?(STOCK_META[t.resource]?.[1]||"Minerai"):t.state.startsWith("mush")?"Champignon":"Ressource";
 closeContextActions();contextActions.innerHTML="";contextOverlay.classList.remove("hidden");let title=document.createElement("strong");title.className="context-title";title.textContent=`✏️ ${name}`;contextActions.appendChild(title);
 contextButton("➖ Taille",()=>{setTileScale(x,y,getTileScale(x,y)-.1);openTileEditContext(x,y)});let v=document.createElement("span");v.className="edit-size-label";v.textContent=`${Math.round(getTileScale(x,y)*100)} %`;contextActions.appendChild(v);contextButton("➕ Taille",()=>{setTileScale(x,y,getTileScale(x,y)+.1);openTileEditContext(x,y)});
 contextButton("✋ Déplacer",()=>{game.selectedTool="move";closeContextActions();success("✋ Touche l’emplacement de destination.")});
 if(t.decor)contextButton("🔄 Tourner",()=>{rotateAct(x,y,t);openTileEditContext(x,y)});
 if(t.decor)contextButton("🗑️ Supprimer",()=>deleteDecorAct(x,y,t));contextButton("✕ Fermer",closeContextActions);
}
function act(x,y,silent=false){if(!unlocked(x,y))return false;let t=farm()[y][x],foot=buildingAtCell(x,y);if(foot&&!(foot.x===x&&foot.y===y)&&game.selectedTool!=="move"){if(!silent)missing("🏗️ Cette case fait partie d’un bâtiment.");return false}if(game.selectedTool==="move"){moveAct(x,y,t);return true}if(game.selectedTool==="rotate"){rotateAct(x,y,t);return true}if(game.selectedTool==="deleteDecor"){deleteDecorAct(x,y,t);return true}if(game.selectedTool==="decorate"){if(t.state!=="grass"||t.building||buildingAtCell(x,y)||t.decor){if(!silent)missing("🌿 Cette case est occupée.");return false}let d=DECORS[game.selectedDecor];if(!d)return false;if(game.level<d.level){if(!silent)missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);return false}if(game.money<d.price){if(!silent)missing(`💰 Il manque ${d.price-game.money} pièce(s).`);return false}game.money-=d.price;t.decor=game.selectedDecor;t.decorRotation=0;if(decorNetworkKind(t.decor))retileNetworkAround(x,y);if(!silent){success(`🌿 ${d.name} placé.`);save();renderAll()}return true}if(game.selectedTool==="build"){if(!silent){buildAt(t,x,y);save();renderAll()}return true}if(t.building||t.decor){if(!silent)missing("🏗️ Cette case est occupée.");return false}let changed=false,type=zone().type;if(type==="farm"){if(game.selectedTool==="plow"&&t.state==="grass"){t.state="plowed";changed=true}else if(game.selectedTool==="plow"&&t.state==="plowed"){Object.assign(t,emptyTile());changed=true;if(!silent)success("🌱 Case remise en herbe.")}else if(game.selectedTool==="plant"&&t.state==="plowed"){if(!cropUnlocked(game.selectedCrop)){if(!silent)missing(`🔒 ${CROPS[game.selectedCrop].name} se débloque au niveau ${CROPS[game.selectedCrop].level}.`);return false}if(game.seeds[game.selectedCrop]<=0){if(!silent)missing(`🌱 Il te manque 1 graine de ${CROPS[game.selectedCrop].name}.`);return false}game.seeds[game.selectedCrop]--;t.state="planted";t.crop=game.selectedCrop;t.plantedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"){mature(t);if(t.state==="ready"){if(cropStored()>=cropCapacity()){if(!silent)missing("📦 Grange pleine : libère de la place avant de récolter.");return false}game.stock[t.crop]+=specialBonus("farm",1);gainCropXp(t.crop,1);gainMastery("farm",1);missionProgress("crop",1);t.state="plowed";t.crop=null;t.plantedAt=null;addXP(5);changed=true}}}else if(type==="forest"){if(game.selectedTool==="plant"&&t.state==="grass"){if((game.forestSupplies.sapling||0)<1){if(!silent)missing("🌱 Il te manque 1 jeune plant. Achète-en dans Produire.");return false}game.forestSupplies.sapling--;t.state="sapling";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"&&t.state==="tree"){game.stock.wood+=specialBonus("forest",2);gainMastery("forest",2);missionProgress("wood",2);Object.assign(t,emptyTile());addXP(5);changed=true}}else if(type==="mine"){if(game.selectedTool==="extract"&&game.mineMode==="ore"&&t.state==="grass"){if((game.mineSupplies.charge||0)<1){if(!silent)missing("⛏️ Il te manque 1 charge d’extraction. Achète-en dans Produire.");return false}game.mineSupplies.charge--;t.state="mining";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="plant"&&game.mineMode==="mushroom"&&t.state==="grass"){if((game.mineSupplies.spore||0)<1){if(!silent)missing("🍄 Il te manque 1 spore de champignon. Achète-en dans Produire.");return false}game.mineSupplies.spore--;t.state="mushroom";t.startedAt=Date.now();changed=true}else if(game.selectedTool==="harvest"){mature(t);if(t.state==="ore"){let r=t.resource;game.stock[r]++;gainMastery("mine",1);missionProgress("mine",1);Object.assign(t,emptyTile());addXP(["diamond","ruby"].includes(r)?15:5);changed=true}else if(t.state==="mushready"){game.stock.mushroom++;gainMastery("mine",1);missionProgress("mine",1);Object.assign(t,emptyTile());addXP(5);changed=true}}}if(changed){save();if(!silent)renderAll()}return changed}
function quick(kind){let old=game.selectedTool,count=0;game.selectedTool=kind;for(let y=0;y<FARM_SIZE;y++)for(let x=0;x<FARM_SIZE;x++)if(act(x,y,true))count++;game.selectedTool=old;msg(`Action de zone : ${count} case(s).`);save();renderAll()}
function buySeed(c,q=1){let d=CROPS[c];if(!cropUnlocked(c))return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);let cost=d.price*q;if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour acheter ${q} graine(s) de ${d.name}.`);game.money-=cost;game.seeds[c]+=q;success(`${d.ready} +${q} graine(s) de ${d.name}.`);save();renderAll()}
const SELL_PRICE={wheat:28,carrot:68,corn:140,eggs:85,milk:180,fish:240,wood:45,plank:110,stone:65,iron:180,diamond:1200,ruby:850,mushroom:160,flour:95,cheese:420,ingot:480};
const STOCK_META={wheat:["🌾","Blé","Récoltes"],carrot:["🥕","Carotte","Récoltes"],corn:["🌽","Maïs","Récoltes"],eggs:["🥚","Œufs","Animaux"],milk:["🥛","Lait","Animaux"],fish:["🐟","Poissons","Animaux"],feed:["🍚","Rations","Transformation"],wood:["🌲","Bois","Forêt"],plank:["🪵","Planches","Transformation"],stone:["🪨","Pierre","Mine"],iron:["⚙️","Fer","Mine"],diamond:["💎","Diamant","Mine"],ruby:["♦️","Rubis","Mine"],mushroom:["🍄","Champignons","Mine"],flour:["🥣","Farine","Transformation"],cheese:["🧀","Fromage","Transformation"],ingot:["🔩","Lingot","Transformation"]};
function sellResource(k,n){let have=game.stock[k]||0,p=SELL_PRICE[k]||0;if(!p||have<=0)return msg("Rien à vendre.");let q=Math.min(have,n===Infinity?have:n);game.stock[k]-=q;game.money+=q*p;msg(`💰 ${STOCK_META[k]?.[1]||k} ×${q} : +${q*p} pièces.`);save();renderAll()}
function sellAll(){let earned=0;for(const[k,p]of Object.entries(SELL_PRICE)){earned+=(game.stock[k]||0)*p;game.stock[k]=0}if(!earned)return msg("Rien à vendre.");game.money+=earned;msg(`💰 Vente totale : +${earned} pièces.`);save();renderAll()}
function buyAnimal(kind){let c={chicken:["coop","chickens",250,"🐔"],cow:["stable","cows",900,"🐄"],fish:["pond","fishCount",450,"🐟"]}[kind],[b,f,p,e]=c;if(!hasBuilding(b)||game[f]>=animalCap(b)||game.money<p)return missing("Achat impossible.");game.money-=p;game[f]++;save();renderAll();if(activePanel==="manage")renderAnimals();success(`${e} Animal ajouté.`)}
function feed(kind){let crop=kind==="stable"?"wheat":"corn";if(game.stock[crop]<1)return missing(`🍽️ Ressource manquante : 1 ${CROPS[crop].name}.`);let now=Date.now(),wasStopped=(game.fedUntil[kind]||0)<=now;game.stock[crop]--;game.fedUntil[kind]=Math.max(now,game.fedUntil[kind]||0)+FEED_MS;if(wasStopped){if(kind==="coop")game.lastEggAt=now;if(kind==="stable")game.lastMilkAt=now;if(kind==="pond")game.lastFishAt=now}save();renderAll()}
function makeFeed(){if(game.stock.wheat<1||game.stock.corn<2)return missing(`⚙️ Ressources manquantes : ${Math.max(0,1-game.stock.wheat)} blé et ${Math.max(0,2-game.stock.corn)} maïs.`);let lv=Math.max(1,bLevel("mill"));game.stock.wheat--;game.stock.corn-=2;game.stock.feed+=2+lv;save();renderAll()}
function autoFeedTick(){if(!game.autoFeed||!hasBuilding("mill")||game.stock.feed<=0)return;for(const k of["coop","stable","pond"])if(hasBuilding(k)&&(game.fedUntil[k]||0)-Date.now()<10000&&game.stock.feed>0){game.stock.feed--;game.fedUntil[k]=Date.now()+FEED_MS}}
function production(){autoFeedTick();let now=Date.now();game.livestockReady=game.livestockReady||{eggs:0,milk:0};function tick(b,count,clock,interval,stock){if(!hasBuilding(b)||count<=0||now>=(game.fedUntil[b]||0))return;let cycles=Math.floor((now-game[clock])/interval);if(cycles>0){if(stock==="eggs"||stock==="milk")game.livestockReady[stock]=(game.livestockReady[stock]||0)+cycles*count;else game.stock[stock]+=cycles*count;game[clock]+=cycles*interval;save()}}tick("coop",game.chickens,"lastEggAt",10*60*1000,"eggs");tick("stable",game.cows,"lastMilkAt",20*60*1000,"milk");tick("pond",game.fishCount,"lastFishAt",30*60*1000,"fish")}
function livestockInfo(kind){return kind==="chicken"?{b:"coop",stock:"eggs",clock:"lastEggAt",interval:10*60*1000,emoji:"🥚",label:"Œufs",animal:"Poule"}:{b:"stable",stock:"milk",clock:"lastMilkAt",interval:20*60*1000,emoji:"🥛",label:"Lait",animal:"Vache"}}
function collectLivestock(kind){production();let i=livestockInfo(kind),q=Math.max(0,game.livestockReady?.[i.stock]||0);if(!q)return missing(`${i.emoji} Rien à collecter pour le moment.`);game.stock[i.stock]=(game.stock[i.stock]||0)+q;game.livestockReady[i.stock]=0;gainMastery("animal",q);missionProgress("animal",q);addXP(Math.max(1,q*2));save();renderAll();closeContextActions();success(`${i.emoji} ${i.label} ×${q} ajouté${q>1?"s":""} au Stock.`)}
function openLivestockContext(kind){production();let i=livestockInfo(kind),ready=Math.max(0,game.livestockReady?.[i.stock]||0),count=kind==="chicken"?(game.chickens||0):(game.cows||0),now=Date.now();contextActions.innerHTML="";contextOverlay.classList.remove("hidden");let title=document.createElement("strong");title.className="context-title";title.textContent=`${kind==="chicken"?"🐔":"🐄"} ${i.animal} · ${i.label}`;contextActions.appendChild(title);if(ready>0)contextButton(`${i.emoji} Collecter ${ready}`,()=>collectLivestock(kind));let fed=(game.fedUntil[i.b]||0)>now;if(!fed)contextButton("😴 Production arrêtée · nourrir dans Gestion",()=>{},true);else{let left=Math.max(0,i.interval-(now-(game[i.clock]||now))),sec=Math.ceil(left/1000),txt=sec>=60?`${Math.floor(sec/60)} min ${sec%60} s`:`${sec} s`;contextButton(`⏳ Prochaine production · ${txt}`,()=>{},true)}contextButton(`${kind==="chicken"?"🐔":"🐄"} ${count} animal${count>1?"aux":""} · ${ready} prêt${ready>1?"s":""}`,()=>{},true);contextButton("✕ Fermer",closeContextActions)}
function feedPct(k){return Math.max(0,Math.min(100,((game.fedUntil[k]||0)-Date.now())/FEED_MS*100))}
function upgradeCost(k,lv){return UPGRADE_RESOURCE_COSTS[k]?.[lv]||null}
function resourceCostText(cost){return Object.entries(cost||{}).map(([r,q])=>`${RESOURCE_ICONS[r]||"📦"} ${q}`).join(" · ")}
function missingUpgradeResources(cost){return Object.entries(cost||{}).filter(([r,q])=>(game.stock[r]||0)<q).map(([r,q])=>`${RESOURCE_ICONS[r]||r} ${q-(game.stock[r]||0)}`).join(" · ")}
function upgrade(k){let lv=zoneBLevel(k);if(!lv)return msg("Bâtiment absent de cette parcelle.");if(lv>=BUILDING_MAX_LEVEL)return msg("⭐ Niveau maximum actuel. Les paliers Étoiles sont réservés pour une future évolution.");let cost=upgradeCost(k,lv);if(!cost)return msg("Cette amélioration n’est pas encore configurée.");let miss=missingUpgradeResources(cost);if(miss)return missing(`📦 Ressources manquantes : ${miss}.`);for(const[r,q]of Object.entries(cost))game.stock[r]-=q;zone().buildingLevels=zone().buildingLevels||{};zone().buildingStars=zone().buildingStars||{};zone().buildingLevels[k]=lv+1;if(zone().buildingStars[k]==null)zone().buildingStars[k]=0;msg(`⬆️ ${BUILDINGS[k].name} passe niveau ${lv+1}.`);save();renderAll()}
function expandCurrent(){if(size()>=FARM_SIZE)return;let cost=EXPANSION_COSTS[size()]||20000;if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour agrandir.`);game.money-=cost;zone().size++;save();renderAll()}
function travel(k){if(!game.zones[k].unlocked)return unlockZone(k);closeContextActions();game.currentZone=k;game.moveSource=null;playerStartForZone();closeMap();msg(`🗺️ Déplacement : ${ZONES[k].name}.`);save();renderAll()}
function unlockZone(k){let d=ZONES[k],z=game.zones[k];if(game.level<(d.level||1))return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);if(game.money<d.cost)return missing(`💰 Il manque ${d.cost-game.money} pièce(s) pour débloquer cette zone.`);game.money-=d.cost;z.unlocked=true;if(d.type==="free")return chooseFree(k);travel(k)}

const DOMAIN_CARD_BACKGROUNDS={"main": "farm_main_reference.png", "production": "production-zone-01.png", "prairie": "prairie-zone-01.png", "forest": "fond_bois.png", "mine": "fond_mine.png", "livestock": "livestock-zone-01.png"};
function openMap(){if(typeof closeGameModal==="function"&&typeof modal!=="undefined"&&!modal.classList.contains("hidden"))closeGameModal();renderMap();document.getElementById("map-modal").classList.remove("hidden");document.body.classList.add("modal-open")}function closeMap(){document.getElementById("map-modal").classList.add("hidden");document.body.classList.remove("modal-open")
 document.querySelectorAll("[data-zone]").forEach(card=>{
   const key=card.dataset.zone;
   const file=DOMAIN_CARD_BACKGROUNDS[key]||DOMAIN_CARD_BACKGROUNDS[(game.zones[key]||{}).type];
   if(file){
     card.classList.add("domain-zone-card");
     card.style.setProperty("--zone-bg",`url("assets/backgrounds/${file}")`);
   }
 });
}
function renderMap(){document.getElementById("map-zones").innerHTML=Object.entries(ZONES).map(([k,d])=>{let z=game.zones[k],locked=!z.unlocked,spec=z.type==="free"?"À spécialiser":z.type==="farm"?"Zone agricole":z.type==="production"?"Bâtiments & transformations":z.type==="livestock"?"Élevage & animaux":z.type==="forest"?"Bois & ressources":"Mine & champignons";return `<button class="zone-card ${game.currentZone===k?"current":""} ${locked?"locked-zone":""}" data-zone="${k}"><h3>${locked?"🔒":d.emoji} ${d.name}</h3><p>${spec} · ${z.size}×${z.size}</p><p>${locked?`Niv.${d.level||1} · ${d.cost}💰`:"Voyager vers cette zone."}</p></button>`}).join("");document.querySelectorAll("[data-zone]").forEach(b=>b.onclick=()=>travel(b.dataset.zone))}
function chooseFree(k){document.getElementById("map-zones").innerHTML=`<div class="spec-wrap"><h3>Choisis la spécialisation de ${ZONES[k].name}</h3><button class="zone-card" data-spec="farm"><h3>🌾 Nouveau champ</h3><p>Agriculture, bâtiments et élevage.</p></button><button class="zone-card" data-spec="forest"><h3>🌲 Nouveau bois</h3><p>Arbres, bois et scierie.</p></button><button class="zone-card" data-spec="mine"><h3>⛏️ Nouvelle mine</h3><p>Minerais et champignons.</p></button></div>`;document.querySelectorAll("[data-spec]").forEach(b=>b.onclick=()=>{game.zones[k].type=b.dataset.spec;game.zones[k].farm=emptyFarm();closeContextActions();game.currentZone=k;save();closeMap();renderAll()})}
function installLivestockBuilding(k){
 if(zone().type!=="livestock")return missing("🐾 Ce bâtiment s’installe dans la Zone d’élevage.");
 if(!["coop","stable"].includes(k))return missing("🐾 Bâtiment d’élevage inconnu.");
 if(zoneHasBuilding(k))return msg(`🏗️ ${BUILDINGS[k].name} est déjà installé.`);
 zone().slotBuildings=zone().slotBuildings||{};
 zone().buildingLevels=zone().buildingLevels||{};
 zone().slotBuildings[`livestock_${k}`]=k;
 zone().buildingLevels[k]=1;
 if(k==="coop")game.fedUntil.coop=Date.now()+FEED_MS;
 if(k==="stable")game.fedUntil.stable=Date.now()+FEED_MS;
 save();renderAll();success(`🏗️ ${BUILDINGS[k].name} installé gratuitement dans la Zone d’élevage.`);
}
function renderBuild(){
 const box=document.getElementById("building-shop");
 if(!box)return;
 const buildSection=box.closest('section[data-source="build"]')||box.parentElement;
 const tabs=buildSection?buildSection.querySelector(".tabs"):null;
 if(zone().type==="production"){
   if(tabs)tabs.style.display="none";
   const entries=Object.entries(BUILDINGS).filter(([,d])=>d.production);
   box.innerHTML='<div class="zone-note">🏭 Zone spécialisée : choisis un bâtiment de production puis touche un emplacement libre.</div>'+entries.map(([k,d])=>`<button class="choice ${game.selectedBuilding===k?"active":""}" data-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé":d.price+"💰 · niv."+d.level+" requis"}</small></button>`).join("");
 }else if(zone().type==="livestock"){
   if(tabs)tabs.style.display="none";
   const entries=[["coop",BUILDINGS.coop],["stable",BUILDINGS.stable]];
   box.innerHTML='<div class="zone-note">🐾 Installe ici les bâtiments d’élevage. Ils sont gratuits pendant la phase de test.</div>'+entries.map(([k,d])=>`<button class="choice" data-livestock-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé · niv."+zoneBLevel(k):"GRATUIT · niveau 1"}</small></button>`).join("");
 }else if(zone().type==="farm"){
   if(tabs)tabs.style.display="grid";
   if(buildSection)buildSection.querySelectorAll("[data-buildtab]").forEach(b=>b.classList.toggle("active",b.dataset.buildtab===game.buildTab));
   const entries=Object.entries(BUILDINGS).filter(([,d])=>!d.zoneType&&!d.production&&d.kind===game.buildTab);
   box.innerHTML='<div class="zone-note">Bâtiments en 2×2 : choisis-en un, puis touche le coin supérieur gauche d’un espace libre.</div>'+entries.map(([k,d])=>`<button class="choice ${game.selectedBuilding===k?"active":""}" data-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé · niv."+zoneBLevel(k):d.price+"💰 · 2×2 · niv."+d.level+" requis"}</small></button>`).join("");
 }else{
   if(tabs)tabs.style.display="none";
   const entries=Object.entries(BUILDINGS).filter(([,d])=>d.zoneType===zone().type);
   box.innerHTML='<div class="zone-note">Choisis le bâtiment spécial de cette parcelle, puis touche une case verte libre.</div>'+entries.map(([k,d])=>`<button class="choice ${game.selectedBuilding===k?"active":""}" data-building="${k}" ${zoneHasBuilding(k)?"disabled":""}>${d.emoji} ${d.name}<br><small>${zoneHasBuilding(k)?"Déjà installé · niv."+zoneBLevel(k):d.price+"💰"}</small></button>`).join("");
 }
 box.querySelectorAll("[data-building]").forEach(b=>b.onclick=()=>{game.selectedBuilding=b.dataset.building;game.selectedTool="build";closeGameModal();msg(zone().type==="production"?`🏭 ${BUILDINGS[game.selectedBuilding].name} sélectionné : touche un emplacement libre.`:`🔨 ${BUILDINGS[game.selectedBuilding].name} sélectionné : touche une case verte libre.`);renderAll()});
 box.querySelectorAll("[data-livestock-building]").forEach(b=>b.onclick=()=>installLivestockBuilding(b.dataset.livestockBuilding));
} 
function renderAnimals(){let box=document.getElementById("animals");if(zone().type!=="livestock"){box.innerHTML='<p class="hint">🐾 Va dans la Zone d’élevage pour gérer les poules et les vaches. Les poissons auront leur propre carte.</p>';return}let rows=[["coop","🐔","Poules","chickens","chicken",250],["stable","🐄","Vaches","cows","cow",900]];box.innerHTML=rows.map(([b,e,n,f,a,p])=>{if(!hasBuilding(b))return `<div class="compact"><span>${e} <b>${BUILDINGS[b].name}</b> requis pour les ${n.toLowerCase()}.</span><button class="mini" data-install-livestock="${b}">Installer GRATUIT</button></div>`;let pct=feedPct(b),food=b==="stable"?"🌾 blé":"🌽 maïs";return `<div class="compact"><span>${e} ${n} <b>${game[f]}/${animalCap(b)}</b></span><button class="mini" data-animal="${a}">+ ${p}💰</button></div><div class="feedbar"><i style="width:${pct}%"></i></div><div class="compact"><span>${pct?`🍽️ ${Math.ceil(((game.fedUntil[b]||0)-Date.now())/1000)} s`:"😴 Arrêt"}</span><button class="mini" data-feed="${b}">Nourrir (${food})</button></div>`}).join("");box.querySelectorAll("[data-install-livestock]").forEach(b=>b.onclick=()=>installLivestockBuilding(b.dataset.installLivestock));box.querySelectorAll("[data-animal]").forEach(b=>b.onclick=()=>buyAnimal(b.dataset.animal));box.querySelectorAll("[data-feed]").forEach(b=>b.onclick=()=>feed(b.dataset.feed))}
function renderProduction(){let box=document.getElementById("production");
if(zone().type==="forest"){
 let lv=bLevel("sawmill"),yieldN=lv?2+lv:0;
 box.innerHTML=lv?`<div class="compact"><span>🪚 Scierie niv.${lv}</span><span>🌲 ${game.stock.wood} · 🪵 ${game.stock.plank}</span></div><button id="make-plank" class="primary">2 bois → ${yieldN} planches</button>`:'<p class="hint">Construis une Scierie sur cette parcelle.</p>';
}else if(zone().type==="mine"){
 let lv=bLevel("miner");
 box.innerHTML=lv?`<div class="compact"><span>🛠️ Atelier minier niv.${lv}</span><span>⛏️ ${specialDuration("mining")/1000}s · 🍄 ${specialDuration("mushroom")/1000}s</span></div><p class="hint">Améliorer l’atelier réduit les temps d’extraction et de culture.</p>`:'<p class="hint">Construis l’Atelier minier pour améliorer les temps de cette parcelle.</p>';
}else{
 box.innerHTML=hasBuilding("mill")?`<div class="compact"><span>⚙️ Moulin niv.${bLevel("mill")}</span><span>🍚 ${game.stock.feed}</span></div><button id="make-feed" class="primary">1 blé + 2 maïs → ${2+Math.max(1,bLevel("mill"))} rations</button><div class="compact"><span>🤖 Mangeoire auto</span><button id="toggle-auto" class="mini">${game.autoFeed?"ON":"OFF"}</button></div>`:'<p class="hint">Construis un Moulin sur cette parcelle pour préparer les rations.</p>';
}
let p=document.getElementById("make-plank");if(p)p.onclick=()=>{let lv=bLevel("sawmill");if(game.stock.wood>=2){game.stock.wood-=2;game.stock.plank+=2+lv;save();renderAll()}else missing(`🪵 Ressource manquante : ${2-game.stock.wood} bois.`)};
let m=document.getElementById("make-feed");if(m)m.onclick=makeFeed;let a=document.getElementById("toggle-auto");if(a)a.onclick=()=>{game.autoFeed=!game.autoFeed;save();renderAll()};let recipeBox=document.getElementById("production"),ml=bLevel("mill");if(recipeBox&&ml>=2)recipeBox.insertAdjacentHTML("beforeend",`<div class="recipe-list"><button data-craft="flour">2 🌾 → 2 🥣 Farine</button></div>`);document.querySelectorAll("[data-craft]").forEach(b=>b.onclick=()=>craft(b.dataset.craft))}
function renderUpgrades(){let box=document.getElementById("upgrades");
let keys=zone().type==="farm"?["coop","stable","pond"]:zone().type==="production"?Object.keys(BUILDINGS).filter(k=>BUILDINGS[k].production&&UPGRADE_RESOURCE_COSTS[k]):zone().type==="forest"?["sawmill"]:zone().type==="mine"?["miner"]:[];
let present=keys.filter(k=>zoneHasBuilding(k));
let terrain=size()<FARM_SIZE?`<div class="upgrade-row terrain-upgrade"><div class="compact"><span>🗺️ <b>Extension du terrain</b> · ${size()}×${size()}</span><button id="expand-from-manage" class="mini">🔓 ${EXPANSION_COSTS[size()]||20000}💰</button></div><div class="upgrade-effect">Débloque une nouvelle couronne de cases autour de la zone actuelle.</div></div>`:`<div class="upgrade-row terrain-upgrade"><div class="compact"><span>🗺️ <b>Terrain</b> · ${size()}×${size()}</span><b>MAX ⭐</b></div></div>`;
let buildings=present.length?present.map(k=>{let lv=zoneBLevel(k),max=lv>=BUILDING_MAX_LEVEL,cost=max?null:upgradeCost(k,lv),effect=BUILDING_LEVEL_BENEFITS[k]?.[Math.max(0,lv-1)]||"Capacité / efficacité augmentée";return `<div class="upgrade-row"><div class="compact"><span>${BUILDINGS[k].emoji} <b>${BUILDINGS[k].name}</b> · niv.${lv}</span>${max?'<b>MAX ⭐ · paliers futurs prévus</b>':cost?`<button class="mini" data-upgrade="${k}">⬆️ ${resourceCostText(cost)}</button>`:'<span>À venir</span>'}</div><div class="upgrade-effect">${effect}</div></div>`}).join(""):'<p class="hint">Aucun bâtiment à améliorer sur cette parcelle.</p>';
box.innerHTML=terrain+buildings;
let ex=document.getElementById("expand-from-manage");if(ex)ex.onclick=expandCurrent;
document.querySelectorAll("[data-upgrade]").forEach(b=>b.onclick=()=>upgrade(b.dataset.upgrade))}
function buyMineSupply(kind,q=1){let names={charge:"charge d’extraction",spore:"spore de champignon"},unit=kind==="charge"?120:90,cost=q*unit;if(game.money<cost)return missing(`💰 Il te manque ${cost-game.money} pièce(s).`);game.money-=cost;game.mineSupplies[kind]=(game.mineSupplies[kind]||0)+q;success(`${kind==="charge"?"⛏️":"🍄"} +${q} ${names[kind]}.`);save();renderAll()}
function buySapling(q=1){let cost=q*60;if(game.money<cost)return missing(`💰 Il te manque ${cost-game.money} pièce(s) pour ${q} jeune(s) plant(s).`);game.money-=cost;game.forestSupplies.sapling=(game.forestSupplies.sapling||0)+q;success(`🌱 +${q} jeune(s) plant(s).`);save();renderAll()}
function renderZoneActions(){let ss=document.getElementById("seed-selector"),shop=document.getElementById("seed-shop");if(zone().type==="production"){ss.innerHTML="<div class=\"seed active\">🏭<br><small>Production</small></div>";shop.innerHTML="<p class=\"hint\">Les cultures restent dans les zones agricoles. Ici, installe tes bâtiments de production.</p>"}else if(zone().type==="livestock"){ss.innerHTML="<div class=\"seed active\">🐾<br><small>Élevage</small></div>";shop.innerHTML="<p class=\"hint\">Zone dédiée aux animaux. Achète et nourris tes poules et vaches depuis Gestion → Animaux.</p>"}else if(zone().type==="farm"){ss.innerHTML=Object.entries(CROPS).map(([k,d])=>`<button class="seed ${game.selectedCrop===k?"active":""}" data-crop="${k}">${d.ready}<br><small>${game.seeds[k]}</small></button>`).join("");shop.innerHTML=Object.entries(CROPS).map(([k,d])=>`<div class="shop-line"><span>${d.ready} <b>${d.name}</b><small>Stock graines : ${game.seeds[k]} · ${d.price}💰/u</small></span><span><button data-buy="${k}" data-q="1">Acheter ×1</button><button data-buy="${k}" data-q="10">×10</button></span></div>`).join("");document.querySelectorAll("[data-crop]").forEach(b=>b.onclick=()=>{game.selectedCrop=b.dataset.crop;game.selectedTool="plant";renderAll()});document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>buySeed(b.dataset.buy,+b.dataset.q))}else if(zone().type==="mine"){ss.innerHTML=`<button class="seed ${game.mineMode==="ore"?"active":""}" data-mine="ore">⛏️<br><small>Minerais</small></button><button class="seed ${game.mineMode==="mushroom"?"active":""}" data-mine="mushroom">🍄<br><small>Champignons</small></button>`;shop.innerHTML=`<div class="shop-line"><span>⛏️ <b>Charge d’extraction</b><small>Stock : ${game.mineSupplies.charge||0} · 120💰/u</small></span><span><button data-buy-mine="charge" data-q="1">×1</button><button data-buy-mine="charge" data-q="10">×10</button></span></div><div class="shop-line"><span>🍄 <b>Spore</b><small>Stock : ${game.mineSupplies.spore||0} · 90💰/u</small></span><span><button data-buy-mine="spore" data-q="1">×1</button><button data-buy-mine="spore" data-q="10">×10</button></span></div>`;document.querySelectorAll("[data-mine]").forEach(b=>b.onclick=()=>{game.mineMode=b.dataset.mine;game.selectedTool=game.mineMode==="ore"?"extract":"plant";renderAll()});document.querySelectorAll("[data-buy-mine]").forEach(b=>b.onclick=()=>buyMineSupply(b.dataset.buyMine,+b.dataset.q))}else{ss.innerHTML=`<button class="seed ${game.selectedTool==="plant"?"active":""}" data-forest-tool="plant">🌱<br><small>Planter</small></button><button class="seed ${game.selectedTool==="harvest"?"active":""}" data-forest-tool="harvest">🪓<br><small>Récolter</small></button>`;shop.innerHTML=`<div class="shop-line"><span>🌱 <b>Jeune plant</b><small>Stock : ${game.forestSupplies.sapling||0} · 60💰/u · pousse ${Math.round(specialDuration("sapling")/60000)} min</small></span><span><button data-sap="1">Acheter ×1</button><button data-sap="10">×10</button></span></div>`;document.querySelectorAll("[data-forest-tool]").forEach(b=>b.onclick=()=>{game.selectedTool=b.dataset.forestTool;renderAll()});shop.querySelectorAll("[data-sap]").forEach(b=>b.onclick=()=>buySapling(+b.dataset.sap))}}
function renderProduceBalance(){let shop=document.getElementById("seed-shop");if(shop&&!shop.querySelector(".produce-balance"))shop.insertAdjacentHTML("afterbegin",`<div class="produce-balance"><span>💰 Solde disponible</span><b>${game.money} pièces</b></div>`)}
function renderStock(){
 let box=document.getElementById("stock");if(!box)return;
 const groups=[
  {name:"Cultures",icon:"🌾",keys:["wheat","carrot","corn"]},
  {name:"Élevage & pêche",icon:"🐾",keys:["eggs","milk","fish"]},
  {name:"Bois",icon:"🌲",keys:["wood","plank"]},
  {name:"Mine & champignons",icon:"⛏️",keys:["stone","iron","diamond","ruby","mushroom"]},
  {name:"Produits transformés",icon:"⚙️",keys:["feed","flour","cheese","ingot"]}
 ];
 const stored=cropStored(),capacity=cropCapacity(),pct=Math.max(0,Math.min(100,capacity?stored/capacity*100:0));
 const total=Object.values(game.stock||{}).reduce((a,v)=>a+(Number(v)||0),0);
 const supplyCards=[
  ["🌱","Graines de blé",game.seeds?.wheat||0],["🥕","Graines de carotte",game.seeds?.carrot||0],["🌽","Graines de maïs",game.seeds?.corn||0],
  ["🌳","Jeunes plants",game.forestSupplies?.sapling||0],["🧨","Charges d’extraction",game.mineSupplies?.charge||0],["🍄","Spores",game.mineSupplies?.spore||0]
 ];
 const resourceCard=k=>{let m=STOCK_META[k]||["📦",k,""],q=game.stock[k]||0,p=SELL_PRICE[k]||0;return `<article class="stock-card ${q?"has-stock":"empty-stock"}"><div class="stock-card-main"><span class="stock-icon">${m[0]}</span><span class="stock-card-text"><b>${m[1]}</b><strong>${q}</strong>${p?`<small>${p} 💰 / unité</small>`:`<small>Utilisé dans le domaine</small>`}</span></div>${p?`<div class="stock-card-actions"><button data-sell="${k}" data-q="1" ${q<1?"disabled":""}>−1</button><button data-sell="${k}" data-q="10" ${q<1?"disabled":""}>−10</button></div>`:`<span class="stock-use-badge">Réserve</span>`}</article>`};
 box.innerHTML=`<div class="stock-dashboard"><div class="stock-summary"><span><b>📦 Stock global</b><small>${total} unité(s) en réserve</small></span><span class="stock-money">💰 ${game.money}</span></div><div class="stock-capacity"><div><span>🌾 Grange — cultures</span><b>${stored} / ${capacity}</b></div><div class="stock-capacity-track"><i style="width:${pct}%"></i></div><small>Seules les récoltes occupent actuellement cette capacité.</small></div></div>`+
 groups.map(g=>`<section class="stock-section"><h4>${g.icon} ${g.name}<span>${g.keys.reduce((a,k)=>a+(game.stock[k]||0),0)}</span></h4><div class="stock-grid">${g.keys.map(resourceCard).join("")}</div></section>`).join("")+
 `<section class="stock-section stock-supplies"><h4>🧰 Fournitures <span>${supplyCards.reduce((a,x)=>a+x[2],0)}</span></h4><div class="stock-grid">${supplyCards.map(x=>`<article class="stock-card supply-card"><div class="stock-card-main"><span class="stock-icon">${x[0]}</span><span class="stock-card-text"><b>${x[1]}</b><strong>${x[2]}</strong><small>Acheté depuis Produire</small></span></div></article>`).join("")}</div></section>`;
 box.querySelectorAll("[data-sell]").forEach(b=>b.onclick=()=>sellResource(b.dataset.sell,+b.dataset.q));
}
function renderDomain(){document.getElementById("domain").innerHTML=`<div class="compact"><span>${ZONES[game.currentZone].emoji} ${ZONES[game.currentZone].name}</span><b>${size()}×${size()}</b></div>${size()<FARM_SIZE?`<button id="expand-current" class="primary">🔓 Agrandir — ${EXPANSION_COSTS[size()]||20000}💰</button>`:'<p class="good">Zone au maximum ⭐</p>'}<button id="domain-map" class="primary">🗺️ Ouvrir la carte</button>`;let e=document.getElementById("expand-current");if(e)e.onclick=expandCurrent;document.getElementById("domain-map").onclick=openMap}
function setMapZoom(v){
 game.mapZoom=Math.max(1,Math.min(1.4,Math.round(Number(v||1)*100)/100));
 let farm=document.getElementById("farm");
 if(game.mapZoom<=1){game.mapPanX=0;game.mapPanY=0}
 if(farm)applyMapView();
 save();renderFarm();
 success(`🔎 Zoom carte : ${Math.round(game.mapZoom*100)} %`);
}
function applyMapView(){
 let farm=document.getElementById("farm");if(!farm)return;
 let z=Math.max(1,Math.min(1.4,Number(game.mapZoom)||1));
 if(z<=1){game.mapPanX=0;game.mapPanY=0}
 farm.style.zoom=String(z);
 farm.style.translate=`${Number(game.mapPanX)||0}px ${Number(game.mapPanY)||0}px`;
}
function renderToolbar(){
 const toolbar=document.getElementById("toolbar"),qb=document.getElementById("quickbar");
 if(toolbar) toolbar.innerHTML="";
 if(qb) qb.innerHTML="";
 if(toolbar&&((typeof navigator!="undefined"&&navigator.maxTouchPoints>0)||window.matchMedia&&window.matchMedia("(pointer:coarse)").matches)){
  let zoom=document.createElement("div");zoom.className="toolbar-zoom";
  let minus=document.createElement("button");minus.type="button";minus.className="mini";minus.textContent="−";minus.title="Dézoomer";minus.onclick=()=>setMapZoom(game.mapZoom-.1);
  let reset=document.createElement("button");reset.type="button";reset.className="mini";reset.textContent=`${Math.round(game.mapZoom*100)}%`;reset.title="Zoom actuel";reset.onclick=()=>setMapZoom(1);
  let plus=document.createElement("button");plus.type="button";plus.className="mini";plus.textContent="+";plus.title="Zoomer";plus.onclick=()=>setMapZoom(game.mapZoom+.1);
  zoom.append(minus,reset,plus);toolbar.appendChild(zoom);
 }
}
function orderResourceUnlocked(k){
 if(k==="wheat")return cropUnlocked("wheat");
 if(k==="carrot")return cropUnlocked("carrot");
 if(k==="corn")return cropUnlocked("corn");
 if(k==="eggs")return hasBuilding("coop");
 if(k==="milk")return hasBuilding("stable");
 if(k==="fish")return hasBuilding("pond");
 if(k==="wood")return Object.values(game.zones).some(z=>z.unlocked&&z.type==="forest");
 if(k==="stone"||k==="mushroom")return Object.values(game.zones).some(z=>z.unlocked&&z.type==="mine");
 if(k==="flour")return hasBuilding("mill")&&bLevel("mill")>=2;
 // Fromage et lingot restent exclus tant que leurs recettes de production ne sont pas jouables.
 if(k==="cheese"||k==="ingot")return false;
 return false;
}
function ensureOrders(){
 if(!Array.isArray(game.orders))game.orders=[];
 const pool=["wheat","carrot","corn","eggs","milk","fish","wood","stone","mushroom","flour"].filter(k=>game.stock[k]!==undefined&&orderResourceUnlocked(k));
 // Supprime les anciennes commandes devenues incohérentes avec la progression actuelle.
 game.orders=game.orders.filter(o=>o&&Array.isArray(o.items)&&o.items.length&&o.items.every(x=>pool.includes(x.k))&&Number.isFinite(+o.reward));
 if(!pool.length)return;
 while(game.orders.length<3){
  let n=game.level>=5&&pool.length>=2?2:1,items=[];
  for(let i=0;i<n;i++){let available=pool.filter(k=>!items.some(x=>x.k===k));let k=available[Math.floor(Math.random()*available.length)];items.push({k,q:1+Math.floor(Math.random()*3)})}
  let base=items.reduce((a,x)=>a+(SELL_PRICE[x.k]||6)*x.q,0);
  game.orders.push({id:Date.now()+Math.random(),items,reward:Math.round(base*1.5),xp:8+items.reduce((a,x)=>a+x.q*2,0)})
 }
}
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
function masteryLevel(k){let p=Math.max(0,Number(game.mastery[k])||0),n=0;while(4*(n+1)*(n+2)<=p)n++;return 1+n}
function gainMastery(k,n=1){game.mastery[k]=(game.mastery[k]||0)+n}
function specialBonus(type,q){let free=game.currentZone==="freeA"||game.currentZone==="freeB";if(!free)return q;return Math.max(q,Math.round(q*1.1))}
const MISSION_POOL=[{type:"crop",label:"Récolter 10 cultures",goal:10,reward:30},{type:"order",label:"Livrer 2 commandes",goal:2,reward:40},{type:"wood",label:"Couper 6 bois",goal:6,reward:30},{type:"mine",label:"Récolter 5 ressources minières",goal:5,reward:35}];
function ensureMissions(){if(!Array.isArray(game.missions))game.missions=[];while(game.missions.length<3){let m=MISSION_POOL[(game.missions.length+(game.missionsDone||0))%MISSION_POOL.length];game.missions.push({...m,id:Date.now()+Math.random(),progress:0})}}
function missionProgress(type,n=1){ensureMissions();for(let m of game.missions)if(m.type===type)m.progress=Math.min(m.goal,(m.progress||0)+n)}
function claimMission(id){let m=game.missions.find(x=>x.id==id);if(!m||m.progress<m.goal)return;game.money+=m.reward;addXP(10);game.missions=game.missions.filter(x=>x.id!=id);game.missionsDone=(game.missionsDone||0)+1;ensureMissions();save();renderAll();success(`⭐ Objectif terminé : +${m.reward}💰 +10 XP`)}
function lexiconEntries(){
 const out=[];
 const add=(e)=>out.push(e);
 for(const[k,d]of Object.entries(CROPS))add({key:k,group:"Cultures",name:d.name,img:`${ASSETS.crop[k]}04.png`,level:d.level,unlock:`Niveau ${d.level}`,obtain:`Acheter les graines puis cultiver à la Ferme principale.`,recipe:`Graine : ${d.price}💰 · pousse ${Math.round(d.time/60000)} min`,use:`Récolte vendable ${d.sell}💰/u et utilisée dans les commandes/améliorations.`});
 const res={
  wood:["Bois",ASSETS.forest.tree,4,"Débloquer le Bois enchanté (niveau 4).","Planter un jeune plant puis couper l’arbre mûr dans le Bois enchanté.","Sert à la construction et à fabriquer des planches."],
  plank:["Planches","assets/buildings/production/scierie.png",4,"Bois enchanté + Scierie construite.","Dans Transformations : la Scierie transforme 2 bois en planches (rendement amélioré avec son niveau).","Matériau d’amélioration des bâtiments. L’icône 🪚 dans un coût désigne les planches."],
  stone:["Pierre",ASSETS.mine.stone,8,"Débloquer la Mine ancienne (niveau 8).","Acheter une charge d’extraction, lancer une extraction dans la Mine ancienne puis récolter.","Construction et amélioration des bâtiments."],
  iron:["Fer",ASSETS.mine.iron,8,"Débloquer la Mine ancienne (niveau 8).","Extraire puis récolter dans la Mine ancienne.","Améliorations avancées et fabrication de lingots."],
  diamond:["Diamant",ASSETS.mine.diamond,8,"Débloquer la Mine ancienne (niveau 8).","Ressource rare obtenue lors des extractions minières.","Améliorations de haut niveau."],
  ruby:["Rubis",ASSETS.mine.ruby,8,"Débloquer la Mine ancienne (niveau 8).","Ressource rare obtenue lors des extractions minières.","Améliorations avancées."],
  mushroom:["Champignon",ASSETS.mine.mushready,8,"Débloquer la Mine ancienne (niveau 8).","Acheter une spore, la cultiver dans la Mine ancienne puis récolter.","Vente et commandes."],
  eggs:["Œufs","assets/animals/chicken/chicken_hen_white.png",3,"Poulailler et poules disponibles.","Nourrir les poules puis collecter les œufs dans la Zone d’élevage.","Vente, commandes et futures transformations."],
  milk:["Lait","assets/animals/cow/cow_standing_01.png",1,"Zone d’élevage et vache disponibles.","Nourrir les vaches puis collecter le lait dans la Zone d’élevage.","Fromage, vente et commandes."],
  flour:["Farine","assets/buildings/production/moulin.png",1,"Construire le Moulin.","Dans Transformations : 2 blés → 2 farines.","Améliorations, vente et transformations."],
  cheese:["Fromage","assets/buildings/production/fromagerie.png",1,"Obtenir du lait puis accéder aux Transformations.","2 laits → 1 fromage.","Vente et commandes."],
  ingot:["Lingot","assets/buildings/production/forge.png",8,"Obtenir du fer puis accéder aux Transformations.","2 fers → 1 lingot.","Fabrication et améliorations avancées."]
 };
 for(const[k,v]of Object.entries(res))add({key:k,group:"Matériaux & produits",name:v[0],img:v[1],level:v[2],unlock:v[3],obtain:v[4],recipe:"",use:v[5]});
 for(const[k,d]of Object.entries(BUILDINGS))if(d.img||ASSETS.buildings[k])add({key:k,group:"Bâtiments",name:d.name,img:d.img||(ASSETS.buildings[k]+"1.png"),level:d.level||1,unlock:`Niveau ${d.level||1} · achat ${d.price||0}💰`,obtain:d.kind==="production"?"À installer sur un emplacement de la Zone de production.":"À construire depuis le domaine.",recipe:"",use:`Améliorable jusqu’au niveau ${BUILDING_MAX_LEVEL}.`});
 for(const[k,d]of Object.entries(FARM_EDIT_ASSETS))add({key:k,group:"Aménagement",name:d.name,img:d.img,level:d.level||1,unlock:`Niveau ${d.level||1}${d.price?` · premier achat ${d.price}💰`:" · gratuit"}`,obtain:"Mode Édition : sélectionner puis placer sur la carte.",recipe:"",use:"Déplaçable et redimensionnable après acquisition."});
 return out
}
function openLexiconEntry(key){let e=lexiconEntries().find(x=>x.key===key);if(!e)return;let ov=document.createElement("div");ov.className="overlay lexicon-detail-overlay";ov.innerHTML=`<div class="window lexicon-detail-window"><div class="window-head"><h2>📖 ${e.name}</h2><button class="close">✕</button></div><div class="window-body"><div class="lexicon-detail-hero"><img src="${e.img}" alt="${e.name}"><div><b>${e.name}</b><p>🔓 ${e.unlock}</p></div></div><section><h4>📍 Comment l’obtenir</h4><p>${e.obtain}</p></section>${e.recipe?`<section><h4>🧰 Coût / recette</h4><p>${e.recipe}</p></section>`:""}<section><h4>🎯 À quoi ça sert</h4><p>${e.use}</p></section></div></div>`;document.body.appendChild(ov);ov.onclick=x=>{if(x.target===ov)ov.remove()};ov.querySelector('.close').onclick=()=>ov.remove()}
function renderLexicon(){let box=document.getElementById("lexicon");if(!box)return;let entries=lexiconEntries(),groups=[...new Set(entries.map(e=>e.group))];box.innerHTML=`<p class="hint">Guide du domaine : découvre comment obtenir chaque matériau, ses conditions de déblocage et son utilité. Les éléments futurs indiquent quand ils deviennent accessibles.</p>`+groups.map(g=>`<h4>${g}</h4><div class="lexicon-grid">${entries.filter(e=>e.group===g).map(e=>`<button type="button" class="lexicon-card ${game.level>=e.level?"":"locked"}" data-lexicon="${e.key}"><img src="${e.img}" alt="${e.name}"><div><b>${e.name}</b><small>${game.level>=e.level?`🔓 ${e.unlock}`:`🔒 ${e.unlock}`}</small><small>${e.obtain}</small></div></button>`).join("")}</div>`).join("");box.querySelectorAll('[data-lexicon]').forEach(b=>b.onclick=()=>openLexiconEntry(b.dataset.lexicon))}
function renderProgression(){let b=document.getElementById("progression");if(!b)return;ensureMissions();b.innerHTML=`<h4>Maîtrises</h4><div class="mastery-grid">${Object.entries(MASTERY_META).map(([k,m])=>`<div>${m[0]} <b>${m[1]} niv.${masteryLevel(k)}</b><small>${game.mastery[k]||0} pts</small></div>`).join("")}</div><h4>Objectifs</h4>`+game.missions.map(m=>`<div class="mission-row"><span><b>${m.label}</b><small>${m.progress||0}/${m.goal}</small></span><button data-mission="${m.id}" ${(m.progress||0)<m.goal?"disabled":""}>Réclamer ${m.reward}💰</button></div>`).join("");b.querySelectorAll("[data-mission]").forEach(x=>x.onclick=()=>claimMission(x.dataset.mission))}
function craft(kind){let recipes={flour:{need:{wheat:2},out:2,label:"🥣 Farine"},cheese:{need:{milk:2},out:1,label:"🧀 Fromage"},ingot:{need:{iron:2},out:1,label:"🔩 Lingot"}}[kind];if(!recipes)return;let miss=Object.entries(recipes.need).filter(([k,q])=>(game.stock[k]||0)<q);if(miss.length)return missing(`⚙️ Il manque : `+miss.map(([k,q])=>`${q-(game.stock[k]||0)} ${STOCK_META[k]?.[1]||k}`).join(", "));for(let[k,q]of Object.entries(recipes.need))game.stock[k]-=q;game.stock[kind]+=recipes.out;save();renderAll();success(`${recipes.label} +${recipes.out}`)}
function renderArrange(){let box=document.getElementById("arrange-catalog");if(!box)return;let groups=["Arbres","Animaux","Eau"];box.innerHTML=`<div class="arrange-actions arrange-tools"><button id="arrange-move" class="choice">✋ Déplacer<br><small>Cultures, bâtiments et décors</small></button><button id="arrange-rotate" class="choice">🔄 Tourner<br><small>Rotation de 90°</small></button><button id="arrange-delete" class="choice danger-soft">🗑️ Supprimer<br><small>Décors et animaux placés</small></button></div>`+groups.map(g=>`<h4>${g}</h4><div class="decor-grid">`+Object.entries(DECORS).filter(([,d])=>d.group===g).map(([k,d])=>{let locked=game.level<d.level;return `<button class="decor-choice ${locked?"locked-choice":""}" data-decor="${k}" ${locked?"disabled":""}><img src="${d.img}" alt=""><span><b>${d.name}</b><small>${locked?`🔒 Niveau ${d.level}`:`${d.price}💰 · niv.${d.level}`}</small></span></button>`}).join("")+`</div>`).join("");let mode=(id,tool,text)=>{let b=document.getElementById(id);if(b)b.onclick=()=>{game.selectedTool=tool;closeGameModal();msg(text);renderAll()}};mode("arrange-move","move","✋ Choisis l’élément à déplacer.");mode("arrange-rotate","rotate","🔄 Touche un décor ou un animal pour le tourner.");mode("arrange-delete","deleteDecor","🗑️ Touche le décor ou l’animal à supprimer.");box.querySelectorAll("[data-decor]").forEach(b=>b.onclick=()=>{game.selectedDecor=b.dataset.decor;game.selectedTool="decorate";closeGameModal();msg(`🌿 ${DECORS[game.selectedDecor].name} sélectionné : touche une case libre.`);renderAll()})}
function renderUI(){let pt=document.getElementById("produce-title");if(pt)pt.textContent=zone().type==="mine"?"⛏️ Extraction & culture":zone().type==="forest"?"🌲 Sylviculture":"🌱 Cultures";
document.getElementById("money").textContent=game.money;document.getElementById("level").textContent=game.level;document.getElementById("xp").textContent=`${game.xp} / ${Math.round(80*Math.pow(game.level,1.18))}`;document.getElementById("zone-name").textContent=ZONES[game.currentZone].name;document.getElementById("zone-subtitle").textContent=zone().type==="mine"?"Extrais des ressources rares ou cultive des champignons.":zone().type==="forest"?"Fais pousser ton bois et prépare tes matériaux.":zone().type==="production"?"Installe ici les bâtiments de production et de transformation.":zone().type==="livestock"?"Regroupe ici tes animaux et développe ton élevage.":"Cultive, nourris et développe ton domaine.";const renders=[renderToolbar,renderZoneActions,renderProduceBalance,renderStock,renderOrders,renderBuild,renderAnimals,renderProduction,renderUpgrades,renderDomain,renderProgression,renderLexicon,renderArrange,renderEditCatalog];for(const fn of renders){try{fn()}catch(e){console.error("V45 render",fn.name,e)}}}
function renderAll(){production();renderFarm();renderPlayer();renderUI()}

const startScreen=document.getElementById("start-screen");
const startGameButton=document.getElementById("start-game");
let gameReady=false;
function enterGame(){if(!startScreen||!document.body.classList.contains("start-screen-active"))return;gameReady=true;startScreen.classList.add("exiting");document.body.classList.remove("start-screen-active");renderAll();setTimeout(()=>{startScreen.remove()},180)}
if(startGameButton){startGameButton.onclick=enterGame;startGameButton.addEventListener("pointerup",e=>{if(e.pointerType==="touch")enterGame()})}

let activePanel=null;
const modal=document.getElementById("game-modal"), modalBody=document.getElementById("modal-body"), modalTitle=document.getElementById("modal-title");
const panelSources=document.getElementById("panel-sources");
const fullscreenToggle=document.getElementById("fullscreen-toggle");
const modalTitles={produce:"🌱 Produire",build:"🔨 Construire",stock:"📦 Stock",manage:"⚙️ Gestion du domaine",domain:"🗺️ Domaine",arrange:"✋ Aménager",edit:"✏️ Mode Édition"};
function restoreModalSource(){
  const sec=modalBody.querySelector("section[data-source]");
  if(sec)panelSources.appendChild(sec);
}
function activatePanel(name){
  closeContextActions();
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
  bindPanelTabs(src);
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  // V45 : le panneau vient de changer de parent ; on repeuple ses contenus et événements maintenant.
  renderZoneActions(); renderStock(); renderOrders(); renderBuild(); renderAnimals(); renderProduction(); renderUpgrades(); renderDomain(); renderProgression(); renderLexicon(); renderArrange(); renderEditCatalog();
}
function closeGameModal(){
  closeContextActions();
  restoreModalSource();
  modal.classList.add("hidden");document.body.classList.remove("modal-open");activePanel=null;
  document.querySelectorAll(".dock [data-open]").forEach(b=>b.classList.remove("active"));
}
function updateFullscreenButton(){
  if(!fullscreenToggle)return;
  const active=!!document.fullscreenElement;
  fullscreenToggle.textContent=active?"⛶ Quitter plein écran":"⛶ Plein écran";
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
function bindPanelTabs(src){
  if(!src)return;
  const tabs=[...src.querySelectorAll("[data-paneltab]")];
  const pages=[...src.querySelectorAll("[data-panelpage]")];
  tabs.forEach(tab=>tab.onclick=()=>{
    tabs.forEach(t=>t.classList.toggle("active",t===tab));
    pages.forEach(page=>page.classList.toggle("active",page.dataset.panelpage===tab.dataset.paneltab));
    modalBody.scrollTop=0;
  });
}
const dock=document.querySelector(".dock"),dockToggle=document.getElementById("dock-toggle");
if(dockToggle&&dock){dockToggle.onclick=()=>{const hidden=dock.classList.toggle("dock-hidden");dockToggle.textContent=hidden?"☰":"✕";dockToggle.setAttribute("aria-expanded",hidden?"false":"true")}}
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
function movePlayer(dx,dy,dir){if(!gameReady)return;let nx=playerVisual.x+dx,ny=playerVisual.y+dy;if(!unlocked(nx,ny))return;playerVisual.x=nx;playerVisual.y=ny;playerVisual.dir=dir;playerVisual.frame=playerVisual.frame%PLAYER_FRAMES[dir]+1;renderPlayer();clearTimeout(playerVisual.timer);playerVisual.timer=setTimeout(()=>{playerVisual.frame=0;renderPlayer()},140)}
window.addEventListener("keydown",e=>{if(!gameReady||!document.getElementById("game-modal").classList.contains("hidden")||!document.getElementById("map-modal").classList.contains("hidden"))return;let k=e.key.toLowerCase(),m={arrowup:[0,-1,"back"],w:[0,-1,"back"],z:[0,-1,"back"],arrowdown:[0,1,"front"],s:[0,1,"front"],arrowleft:[-1,0,"left"],a:[-1,0,"left"],q:[-1,0,"left"],arrowright:[1,0,"right"],d:[1,0,"right"]}[k];if(m){e.preventDefault();movePlayer(...m)}});
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
const farmEl=document.getElementById("farm");let dragging=false,seen=new Set();
if(farmEl)farmEl.style.touchAction="none";
const contextOverlay=document.getElementById("context-actions");
const contextActions=document.createElement("div");
contextActions.className="context-window-card";
contextOverlay.appendChild(contextActions);
contextOverlay.addEventListener("click",e=>{if(e.target===contextOverlay)closeContextActions()});
function closeContextActions(){contextOverlay.classList.add("hidden");contextActions.innerHTML=""}
function contextButton(label,fn,disabled=false){let b=document.createElement("button");b.type="button";b.className="context-action-btn";b.textContent=label;b.disabled=disabled;b.onclick=e=>{e.stopPropagation();fn()};contextActions.appendChild(b)}
function contextAssetButton({label,sub="",img="",disabled=false,onClick=()=>{}}){let b=document.createElement("button");b.type="button";b.className="context-asset-btn";b.disabled=disabled;b.innerHTML=`${img?`<img src="${img}" alt="">`:""}<span>${label}</span>${sub?`<small>${sub}</small>`:""}`;b.onclick=e=>{e.stopPropagation();onClick()};contextActions.appendChild(b);return b}
function exactBatchPicker(label,x,y,kind,predicate){let qty=1,wrap=document.createElement("div");wrap.className="context-exact-picker";let minus=document.createElement("button"),num=document.createElement("span"),plus=document.createElement("button"),go=document.createElement("button");minus.type=plus.type=go.type="button";minus.textContent="−";plus.textContent="+";go.className="context-action-btn";const sync=()=>{let cells=farmCellsFrom(x,y,predicate);qty=Math.max(1,Math.min(qty,Math.max(1,cells.length)));num.textContent=qty;go.textContent=`${label} ${qty}`;go.disabled=cells.length<1;minus.disabled=qty<=1;plus.disabled=qty>=cells.length};minus.onclick=e=>{e.stopPropagation();qty--;sync()};plus.onclick=e=>{e.stopPropagation();qty++;sync()};go.onclick=e=>{e.stopPropagation();farmBatch(kind,x,y,qty)};wrap.append(minus,num,plus,go);contextActions.appendChild(wrap);sync()}
function farmCellsFrom(x,y,predicate){let out=[];for(let yy=y;yy<FARM_SIZE;yy++)for(let xx=(yy===y?x:0);xx<FARM_SIZE;xx++){if(unlocked(xx,yy)){let t=farm()[yy][xx];mature(t);if(predicate(t,xx,yy))out.push([xx,yy])}}for(let yy=0;yy<=y;yy++)for(let xx=0;xx<(yy===y?x: FARM_SIZE);xx++){if(unlocked(xx,yy)){let t=farm()[yy][xx];mature(t);if(predicate(t,xx,yy))out.push([xx,yy])}}return out}
function farmBatch(kind,x,y,limit){let predicate=kind==="plow"?(t=>t.state==="grass"&&!t.building&&!t.decor):(t=>t.state==="ready"&&!t.building&&!t.decor);let cells=farmCellsFrom(x,y,predicate),wanted=limit===Infinity?cells.length:Math.min(limit,cells.length),old=game.selectedTool,count=0;game.selectedTool=kind;for(const[xx,yy]of cells.slice(0,wanted)){if(kind==="harvest"&&cropStored()>=cropCapacity())break;if(act(xx,yy,true))count++}game.selectedTool=old;save();renderAll();closeContextActions();if(kind==="harvest"&&count<wanted&&cropStored()>=cropCapacity())missing(`📦 Stock plein — ${count} case(s) récoltée(s).`);else success(`${kind==="plow"?"🪏":"🧺"} ${count} case(s) ${kind==="plow"?"labourée(s)":"récoltée(s)"}.`)}
function farmPlantBatch(x,y,crop,limit,autoBuy=true){
 let d=CROPS[crop];if(!d||!cropUnlocked(crop))return missing(`🔒 ${d?.name||"Culture"} non disponible.`);
 let cells=farmCellsFrom(x,y,t=>t.state==="plowed"&&!t.building&&!t.decor),target=limit===Infinity?cells.length:Math.min(limit,cells.length);
 if(target<=0)return missing(`🌱 Pas assez de cases labourées pour planter ${d.name}.`);
 let available=game.seeds[crop]||0,need=Math.max(0,target-available);
 if(autoBuy&&need>0){let cost=need*d.price;if(game.money<cost)return missing(`💰 Il manque ${cost-game.money} pièce(s) pour acheter ${need} graine(s) de ${d.name}.`);game.money-=cost;game.seeds[crop]=(game.seeds[crop]||0)+need;available=game.seeds[crop]}
 let wanted=Math.min(target,available);
 if(wanted<=0)return missing(`🌱 Pas assez de graines de ${d.name}.`);
 let oldTool=game.selectedTool,oldCrop=game.selectedCrop,count=0;game.selectedTool="plant";game.selectedCrop=crop;
 for(const[xx,yy]of cells.slice(0,wanted))if(act(xx,yy,true))count++;
 game.selectedTool=oldTool;game.selectedCrop=oldCrop;save();renderAll();closeContextActions();success(`${d.ready} ${count} case(s) de ${d.name} plantée(s).`)
}
function openSpecialZoneContext(x,y){
 if(!unlocked(x,y)){closeContextActions();missing("🔒 Cette case n’est pas encore débloquée.");return}
 let t=farm()[y][x],type=zone().type;mature(t);contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";
 if(type==="forest"){
  title.textContent=t.state==="grass"?"🌿 Emplacement libre":t.state==="sapling"?"🌱 Jeune arbre":t.state==="tree"?"🌳 Arbre prêt":"🌲 Bois enchanté";contextActions.appendChild(title);
  if(t.state==="grass"){
   let qty=1;
   const drawQty=()=>{
    let cells=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor),stock=game.forestSupplies.sapling||0,missingQty=Math.max(0,qty-stock),cost=missingQty*60;
    contextActions.innerHTML="";contextActions.appendChild(title);
    contextAssetButton({label:"Jeune arbre",sub:`Stock : ${stock} · 60💰/u`,img:"assets/decorations/trees/tree_sapling.png",disabled:true});
    contextButton("➖",()=>{qty=Math.max(1,qty-1);drawQty()});
    let n=document.createElement("span");n.className="edit-size-label";n.textContent=String(qty);contextActions.appendChild(n);
    contextButton("➕",()=>{qty=Math.min(cells.length,qty+1);drawQty()},qty>=cells.length);
    let label=missingQty>0?`🌱 Planter ${qty} · acheter ${missingQty} (${cost}💰)`: `🌱 Planter ${qty}`;
    contextButton(label,()=>{
     let availableCells=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor),need=Math.max(0,qty-(game.forestSupplies.sapling||0)),buyCost=need*60;
     if(need>0){if(game.money<buyCost)return missing(`💰 Il manque ${buyCost-game.money} pièce(s) pour acheter ${need} jeune(s) plant(s).`);game.money-=buyCost;game.forestSupplies.sapling=(game.forestSupplies.sapling||0)+need}
     let wanted=Math.min(qty,game.forestSupplies.sapling||0,availableCells.length),old=game.selectedTool,count=0;
     game.selectedTool="plant";for(const[xx,yy]of availableCells.slice(0,wanted))if(act(xx,yy,true))count++;game.selectedTool=old;
     save();renderAll();closeContextActions();success(`🌱 ${count} jeune(s) plant(s) planté(s).`)
    },cells.length<1||(missingQty>0&&game.money<cost));
    contextButton("🌱 Tout planter",()=>{
     let availableCells=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor),need=Math.max(0,availableCells.length-(game.forestSupplies.sapling||0)),buyCost=need*60;
     if(need>0){if(game.money<buyCost)return missing(`💰 Il manque ${buyCost-game.money} pièce(s) pour acheter ${need} jeune(s) plant(s).`);game.money-=buyCost;game.forestSupplies.sapling=(game.forestSupplies.sapling||0)+need}
     let wanted=Math.min(availableCells.length,game.forestSupplies.sapling||0),old=game.selectedTool,count=0;
     game.selectedTool="plant";for(const[xx,yy]of availableCells.slice(0,wanted))if(act(xx,yy,true))count++;game.selectedTool=old;
     save();renderAll();closeContextActions();success(`🌱 ${count} jeune(s) plant(s) planté(s).`)
    },cells.length<1);
    contextButton("✕ Fermer",closeContextActions);
   };drawQty();return;
  }
  else if(t.state==="sapling"){let left=Math.max(0,specialDuration("sapling")-(Date.now()-(t.startedAt||Date.now()))),sec=Math.ceil(left/1000),txt=sec>=60?`${Math.floor(sec/60)} min ${sec%60} s`:`${sec} s`;contextButton(`⏳ Jeune arbre en croissance · ${txt} restante${sec>1?"s":""}`,()=>{},true);}
  else if(t.state==="tree"){
   let qty=1;
   const drawCutQty=()=>{
    let trees=farmCellsFrom(x,y,v=>v.state==="tree"&&!v.building&&!v.decor);
    contextActions.innerHTML="";contextActions.appendChild(title);
    contextAssetButton({label:"Arbre prêt",sub:`${trees.length} disponible${trees.length>1?"s":""}`,img:"assets/decorations/trees/tree_green_01.png",disabled:true});
    contextButton("➖",()=>{qty=Math.max(1,qty-1);drawCutQty()});
    let n=document.createElement("span");n.className="edit-size-label";n.textContent=String(qty);contextActions.appendChild(n);
    contextButton("➕",()=>{qty=Math.min(trees.length,qty+1);drawCutQty()},qty>=trees.length);
    contextButton(`🪓 Couper ${qty}`,()=>{
     let available=farmCellsFrom(x,y,v=>v.state==="tree"&&!v.building&&!v.decor),wanted=Math.min(qty,available.length),old=game.selectedTool,count=0;
     game.selectedTool="harvest";for(const[xx,yy]of available.slice(0,wanted))if(act(xx,yy,true))count++;game.selectedTool=old;
     save();renderAll();closeContextActions();success(`🪓 ${count} arbre(s) coupé(s).`)
    },trees.length<1);
    contextButton("🪓 Tout couper",()=>{
     let available=farmCellsFrom(x,y,v=>v.state==="tree"&&!v.building&&!v.decor),old=game.selectedTool,count=0;
     game.selectedTool="harvest";for(const[xx,yy]of available)if(act(xx,yy,true))count++;game.selectedTool=old;
     save();renderAll();closeContextActions();success(`🪓 ${count} arbre(s) coupé(s).`)
    },trees.length<1);
    contextButton("✕ Fermer",closeContextActions);
   };drawCutQty();return;
  }
  else contextButton("ℹ️ Case occupée",()=>{},true);
 }else if(type==="mine"){
  title.textContent=t.state==="grass"?"🌿 Emplacement libre":t.state==="mining"?"⛏️ Extraction":t.state==="mushroom"?"🍄 Champignons":(t.state==="ore"||t.state==="mushready")?"🧺 Ressource prête":"⛏️ Mine ancienne";contextActions.appendChild(title);
  const supplyInfo=()=>game.mineMode==="mushroom"?{mode:"mushroom",tool:"plant",stock:"spore",price:90,emoji:"🍄",name:"spore(s)",verb:"Cultiver"}:{mode:"ore",tool:"extract",stock:"charge",price:120,emoji:"⛏️",name:"charge(s)",verb:"Extraire"};
  const sellMineAll=()=>{let keys=["stone","iron","diamond","ruby","mushroom"],earned=0,count=0;for(const k of keys){let q=game.stock[k]||0;if(q>0){earned+=q*(SELL_PRICE[k]||0);count+=q;game.stock[k]=0}}if(!count)return missing("📦 Aucune ressource de la mine à vendre.");game.money+=earned;save();renderAll();closeContextActions();success(`💰 ${count} ressource(s) de la mine vendue(s) : +${earned} pièces.`)};
  if(t.state==="grass"){
   let qty=1;
   const drawMineQty=()=>{
    let info=supplyInfo(),cells=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor),stock=game.mineSupplies[info.stock]||0,missingQty=Math.max(0,qty-stock),cost=missingQty*info.price;
    contextActions.innerHTML="";contextActions.appendChild(title);
    contextAssetButton({label:"Minerais",sub:game.mineMode==="ore"?"Sélectionné":"Extraction",img:"assets/resources/mine/ore_iron.png",disabled:false,onClick:()=>{game.mineMode="ore";qty=1;drawMineQty()}});
    contextAssetButton({label:"Champignons",sub:game.mineMode==="mushroom"?"Sélectionné":"Culture",img:"assets/resources/mine/mushroom_brown.png",disabled:false,onClick:()=>{game.mineMode="mushroom";qty=1;drawMineQty()}});
    info=supplyInfo();cells=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor);stock=game.mineSupplies[info.stock]||0;missingQty=Math.max(0,qty-stock);cost=missingQty*info.price;
    contextButton("➖",()=>{qty=Math.max(1,qty-1);drawMineQty()});
    let n=document.createElement("span");n.className="edit-size-label";n.textContent=String(qty);contextActions.appendChild(n);
    contextButton("➕",()=>{qty=Math.min(cells.length,qty+1);drawMineQty()},qty>=cells.length);
    let label=missingQty>0?`${info.emoji} ${info.verb} ${qty} · acheter ${missingQty} (${cost}💰)`: `${info.emoji} ${info.verb} ${qty}`;
    const placeQty=(wantedQty)=>{let i=supplyInfo(),available=farmCellsFrom(x,y,v=>v.state==="grass"&&!v.building&&!v.decor),wanted=Math.min(wantedQty,available.length),need=Math.max(0,wanted-(game.mineSupplies[i.stock]||0)),buyCost=need*i.price;if(need>0){if(game.money<buyCost)return missing(`💰 Il manque ${buyCost-game.money} pièce(s) pour acheter ${need} ${i.name}.`);game.money-=buyCost;game.mineSupplies[i.stock]=(game.mineSupplies[i.stock]||0)+need}let oldTool=game.selectedTool,oldMode=game.mineMode,count=0;game.mineMode=i.mode;game.selectedTool=i.tool;for(const[xx,yy]of available.slice(0,wanted))if(act(xx,yy,true))count++;game.selectedTool=oldTool;game.mineMode=oldMode;save();renderAll();closeContextActions();success(`${i.emoji} ${count} emplacement(s) lancé(s).`)};
    contextButton(label,()=>placeQty(qty),cells.length<1||(missingQty>0&&game.money<cost));
    let maxAffordable=Math.min(cells.length,stock+Math.floor(game.money/info.price));
    contextButton(`📍 Tout placer (${maxAffordable})`,()=>placeQty(maxAffordable),maxAffordable<1);
    contextButton("💰 Tout vendre",sellMineAll);
    contextButton("✕ Fermer",closeContextActions);
   };drawMineQty();return;
  }else if(t.state==="mining"||t.state==="mushroom"){
   let kind=t.state,total=specialDuration(kind),left=Math.max(0,total-(Date.now()-(t.startedAt||Date.now()))),sec=Math.ceil(left/1000),txt=sec>=60?`${Math.floor(sec/60)} min ${sec%60} s`:`${sec} s`;
   contextButton(`${kind==="mining"?"⛏️ Extraction":"🍄 Champignons"} en cours · ${txt} restante${sec>1?"s":""}`,()=>{},true);
   contextButton("💰 Tout vendre",sellMineAll);
  }else if(t.state==="ore"||t.state==="mushready"){
   contextButton("🧺 Récolter",()=>{game.selectedTool="harvest";if(act(x,y))closeContextActions()});
   contextButton("🧺 Tout récolter",()=>{let ready=farmCellsFrom(x,y,v=>v.state==="ore"||v.state==="mushready"),old=game.selectedTool,count=0;game.selectedTool="harvest";for(const[xx,yy]of ready)if(act(xx,yy,true))count++;game.selectedTool=old;save();renderAll();closeContextActions();success(`🧺 ${count} ressource(s) récoltée(s).`)});
   contextButton("💰 Tout vendre",sellMineAll);
  }else contextButton("ℹ️ Case occupée",()=>{},true);

 }
 contextButton("✕ Fermer",closeContextActions);
}
function moveProductionToSlot(targetId){
 if(zone().type!=="production"||!game.productionMoveSource)return;
 zone().slotBuildings=zone().slotBuildings||{};if(zone().slotBuildings[targetId])return missing("🏗️ Cet emplacement est déjà occupé.");
 zone().productionScales=zone().productionScales||{};
 let src=game.productionMoveSource,k=zone().slotBuildings[src],scale=zone().productionScales[src];
 if(!k){game.productionMoveSource=null;return missing("🏗️ Le bâtiment à déplacer n’existe plus.")}
 delete zone().slotBuildings[src];zone().slotBuildings[targetId]=k;if(scale!=null)zone().productionScales[targetId]=scale;delete zone().productionScales[src];
 game.productionMoveSource=null;save();renderAll();closeContextActions();success(`✋ ${BUILDINGS[k]?.name||k} déplacé.`)
}
function deleteProductionBuilding(id,k){
 zone().slotBuildings=zone().slotBuildings||{};zone().productionScales=zone().productionScales||{};if(zone().slotBuildings[id]!==k)return;
 contextActions.innerHTML="";contextOverlay.classList.remove("hidden");let d=BUILDINGS[k];let title=document.createElement("strong");title.className="context-title";title.textContent=`🗑️ Supprimer ${d?.name||k} ?`;contextActions.appendChild(title);
 contextButton("Oui, supprimer",()=>{delete zone().slotBuildings[id];delete zone().productionScales[id];if(zone().buildingLevels)delete zone().buildingLevels[k];game.productionMoveSource=null;save();renderAll();closeContextActions();success(`🗑️ ${d?.name||k} supprimé.`)});
 contextButton("Annuler",()=>{closeContextActions();openProductionBuildingWindow(id,k)});
}
function closeProductionBuildingWindow(){
 let ov=document.getElementById("production-building-modal");if(ov)ov.remove();
}
function openProductionBuildingWindow(id,k){
 if(zone().type!=="production")return;
 closeContextActions();closeProductionBuildingWindow();
 let d=BUILDINGS[k],lv=zoneBLevel(k),cost=upgradeCost(k,lv);
 let ov=document.createElement("div");ov.id="production-building-modal";ov.className="overlay production-building-overlay";
 let actions=[];
 if(k==="barn")actions.push(`<button type="button" data-pb="stock">📦 Ouvrir le stock</button>`);
 actions.push(`<button type="button" data-pb="transform">⚙️ Transformations</button>`);
 if(cost&&lv<BUILDING_MAX_LEVEL){actions.push(`<button type="button" data-pb="upgrade">⬆️ Améliorer niv.${lv+1}<small>${resourceCostText(cost)}</small></button>`);actions.push(`<button type="button" data-pb="materials">📖 Comment obtenir les matériaux ?</button>`);}
 else actions.push(`<button type="button" disabled>⭐ Niveau ${lv} atteint<small>${BUILDING_LEVEL_BENEFITS[k]?.[Math.max(0,lv-1)]||"Bâtiment de production"}</small></button>`);
 if(game.editMode){actions.push(`<button type="button" data-pb="move">✋ Déplacer</button>`);actions.push(`<button type="button" data-pb="delete" class="danger-soft">🗑️ Supprimer</button>`)}
 ov.innerHTML=`<div class="window production-building-window"><div class="window-head"><h2>${d?.emoji||"🏭"} ${d?.name||k}</h2><button type="button" class="close" data-pb="close">✕</button></div><div class="window-body"><div class="production-building-hero">${d?.img?`<img src="${d.img}" alt="${d.name}">`:""}<div><b>Niveau ${lv}</b><p>${BUILDING_LEVEL_BENEFITS[k]?.[Math.max(0,lv-1)]||"Bâtiment de production et de transformation."}</p></div></div><div class="production-building-actions">${actions.join("")}</div></div></div>`;
 document.body.appendChild(ov);document.body.classList.add("modal-open");
 ov.onclick=e=>{if(e.target===ov)closeProductionBuildingWindow()};
 ov.querySelector('[data-pb="close"]').onclick=closeProductionBuildingWindow;
 let b=ov.querySelector('[data-pb="stock"]');if(b)b.onclick=()=>{closeProductionBuildingWindow();activatePanel("stock")};
 b=ov.querySelector('[data-pb="transform"]');if(b)b.onclick=()=>{closeProductionBuildingWindow();activatePanel("produce");setTimeout(()=>document.querySelector('[data-paneltab="produce-transform"]')?.click(),0)};
 b=ov.querySelector('[data-pb="upgrade"]');if(b)b.onclick=()=>{upgrade(k);closeProductionBuildingWindow();setTimeout(()=>openProductionBuildingWindow(id,k),0)};
 b=ov.querySelector('[data-pb="materials"]');if(b)b.onclick=()=>{closeProductionBuildingWindow();activatePanel("manage");setTimeout(()=>document.querySelector('[data-paneltab="manage-lexicon"]')?.click(),0)};
 b=ov.querySelector('[data-pb="move"]');if(b)b.onclick=()=>{game.productionMoveSource=id;closeProductionBuildingWindow();success("✋ Touche maintenant un emplacement libre.");renderAll()};
 b=ov.querySelector('[data-pb="delete"]');if(b)b.onclick=()=>{closeProductionBuildingWindow();deleteProductionBuilding(id,k)};
}
function openProductionEditContext(id,k){
 if(zone().type!=="production"||!game.editMode)return;
 closeProductionBuildingWindow();closeContextActions();
 let d=BUILDINGS[k];contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";title.textContent=`✏️ ${d?.name||k}`;contextActions.appendChild(title);
 contextButton("➖",()=>{setProductionScale(id,getProductionScale(id)-.1);openProductionEditContext(id,k)});
 let val=document.createElement("span");val.className="edit-size-label";val.textContent=`${Math.round(getProductionScale(id)*100)} %`;contextActions.appendChild(val);
 contextButton("➕",()=>{setProductionScale(id,getProductionScale(id)+.1);openProductionEditContext(id,k)});
 contextButton("✋ Déplacer",()=>{game.productionMoveSource=id;closeContextActions();success("✋ Touche maintenant un emplacement libre.");renderAll()});
 contextButton("🗑️ Supprimer",()=>deleteProductionBuilding(id,k));
 contextButton("✕ Fermer",closeContextActions);
}
function openInstalledProductionContext(id,k){
 if(zone().type!=="production")return;
 let d=BUILDINGS[k];contextActions.innerHTML="";contextOverlay.classList.remove("hidden");zone().productionScales=zone().productionScales||{};
 let title=document.createElement("strong");title.className="context-title";title.textContent=`${d?.emoji||"🏭"} ${d?.name||k}`;contextActions.appendChild(title);
 if(game.editMode){
  contextButton("➖",()=>{setProductionScale(id,getProductionScale(id)-.1);openInstalledProductionContext(id,k)});
  let val=document.createElement("span");val.className="edit-size-label";val.textContent=`${Math.round(getProductionScale(id)*100)} %`;contextActions.appendChild(val);
  contextButton("➕",()=>{setProductionScale(id,getProductionScale(id)+.1);openInstalledProductionContext(id,k)});
 }
 if(k==="mill")contextButton("⚙️ Transformations",()=>{closeContextActions();activatePanel("produce");setTimeout(()=>{let t=document.querySelector('[data-paneltab="produce-transform"]');if(t)t.click()},0)});
 if(k==="barn")contextButton("📦 Ouvrir le stock",()=>{closeContextActions();activatePanel("stock")});
 let lv=zoneBLevel(k),cost=upgradeCost(k,lv);
 if(cost&&lv<BUILDING_MAX_LEVEL)contextButton(`⬆️ Améliorer niv.${lv+1} · ${resourceCostText(cost)}`,()=>{upgrade(k);openInstalledProductionContext(id,k)});
 else if(lv>=BUILDING_MAX_LEVEL)contextButton("⭐ Niveau 5 atteint · Étoiles à venir",()=>{},true);
 contextButton(`ℹ️ Niv.${lv} · ${BUILDING_LEVEL_BENEFITS[k]?.[Math.max(0,lv-1)]||"Bâtiment de production"}`,()=>{},true);
 contextButton("✋ Déplacer",()=>{game.productionMoveSource=id;closeContextActions();success("✋ Touche maintenant un emplacement libre.");renderAll()});
 contextButton("🗑️ Supprimer",()=>deleteProductionBuilding(id,k));
 contextButton("✕ Fermer",closeContextActions);
}
function openProductionContext(id){
 if(zone().type!=="production")return;
 zone().slotBuildings=zone().slotBuildings||{};contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";title.textContent=`🏭 Emplacement ${id.replace("P","")}`;contextActions.appendChild(title);
 for(const[k,d]of Object.entries(BUILDINGS).filter(([,d])=>d.production)){
   let installed=zoneHasBuilding(k),price=d.price;
   contextAssetButton({label:d.name,sub:installed?"✓ Posé":`${price}💰`,img:d.img||"",disabled:installed,onClick:()=>{game.selectedBuilding=k;game.selectedTool="build";if(buildAtProductionSlot(id)!==false)closeContextActions()}});
 }
 contextButton("✕ Fermer",closeContextActions)
}
function openFarmSlotDecorContext(id,current=null){
 if(game.currentZone!=="main")return;zone().slotDecorations=zone().slotDecorations||{};contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";title.textContent=current&&DECORS[current]?`🌿 ${DECORS[current].name}`:`🏡 Emplacement déco ${id}`;contextActions.appendChild(title);
 if(current){contextButton("🗑️ Retirer",()=>{delete zone().slotDecorations[id];save();renderAll();closeContextActions();success("🗑️ Décoration retirée.")});contextButton("✕ Fermer",closeContextActions);return}
 let choices=Object.entries(DECORS).filter(([,d])=>game.level>=d.level&&d.group!=="Animaux").slice(0,8);
 for(const[k,d]of choices)contextButton(`${d.name} · ${d.price}💰`,()=>{if(game.money<d.price)return missing(`💰 Il manque ${d.price-game.money} pièce(s).`);game.money-=d.price;zone().slotDecorations[id]=k;save();renderAll();closeContextActions();success(`🌿 ${d.name} installé.`)});
 contextButton("🌿 Catalogue complet",()=>{closeContextActions();activatePanel("arrange")});contextButton("✕ Fermer",closeContextActions)
}
function openCropQuantityContext(x,y,k){
 let d=CROPS[k];if(!d)return;if(!cropUnlocked(k))return missing(`🔒 ${d.name} se débloque au niveau ${d.level}.`);
 contextActions.innerHTML="";contextOverlay.classList.remove("hidden");let qty=game.seeds[k]||0;
 let hero=document.createElement("div");hero.className="context-crop-hero";hero.innerHTML=`<img src="assets/crops/${k}/${k}_stage_04.png" alt=""><div><strong>${d.ready} ${d.name}</strong><small>Stock : ${qty} graine${qty>1?"s":""}</small></div>`;contextActions.appendChild(hero);
 let plantLabel=document.createElement("span");plantLabel.className="context-section-label";plantLabel.textContent="🌱 Planter";contextActions.appendChild(plantLabel);
 let buyQty=1,plantQty=Math.max(1,Math.min(999,qty||1)),buyWrap=document.createElement("div"),plantWrap=document.createElement("div");
 buyWrap.className="seed-qty-picker";plantWrap.className="seed-qty-picker";
 let buyMinus=document.createElement("button");buyMinus.type="button";buyMinus.textContent="−";
 let buyInput=document.createElement("input");buyInput.type="number";buyInput.min="1";buyInput.max="999";buyInput.value="1";buyInput.inputMode="numeric";
 let buyPlus=document.createElement("button");buyPlus.type="button";buyPlus.textContent="+";
 let buy=document.createElement("button");buy.type="button";buy.className="context-action-btn seed-buy-exact";
 let plantMinus=document.createElement("button");plantMinus.type="button";plantMinus.textContent="−";
 let plantInput=document.createElement("input");plantInput.type="number";plantInput.min="1";plantInput.max="999";plantInput.value=String(plantQty);plantInput.inputMode="numeric";
 let plantPlus=document.createElement("button");plantPlus.type="button";plantPlus.textContent="+";
 let plant=document.createElement("button");plant.type="button";plant.className="context-action-btn";
 const syncBuy=()=>{buyQty=Math.max(1,Math.min(999,parseInt(buyInput.value,10)||1));buyInput.value=buyQty;buy.textContent=`🛒 Acheter ${buyQty} · ${d.price*buyQty}💰`;buy.disabled=game.money<d.price*buyQty};
 const syncPlant=()=>{let maxCells=farmCellsFrom(x,y,t=>t.state==="plowed"&&!t.building&&!t.decor).length;plantQty=Math.max(1,Math.min(999,parseInt(plantInput.value,10)||1,maxCells||1));plantInput.value=plantQty;plant.textContent=`🌱 Planter ${plantQty}`;plant.disabled=(game.seeds[k]||0)<1||maxCells<1};
 buyMinus.onclick=e=>{e.stopPropagation();buyInput.value=Math.max(1,(parseInt(buyInput.value,10)||1)-1);syncBuy()};buyPlus.onclick=e=>{e.stopPropagation();buyInput.value=Math.min(999,(parseInt(buyInput.value,10)||1)+1);syncBuy()};buyInput.oninput=syncBuy;
 buy.onclick=e=>{e.stopPropagation();buySeed(k,buyQty);openCropQuantityContext(x,y,k)};
 plantMinus.onclick=e=>{e.stopPropagation();plantInput.value=Math.max(1,(parseInt(plantInput.value,10)||1)-1);syncPlant()};plantPlus.onclick=e=>{e.stopPropagation();plantInput.value=Math.min(999,(parseInt(plantInput.value,10)||1)+1);syncPlant()};plantInput.oninput=syncPlant;
 plant.onclick=e=>{e.stopPropagation();farmPlantBatch(x,y,k,plantQty,true);if(contextOverlay.classList.contains("hidden"))return;openCropQuantityContext(x,y,k)};
 buyWrap.append(buyMinus,buyInput,buyPlus,buy);plantWrap.append(plantMinus,plantInput,plantPlus,plant);contextActions.appendChild(plantWrap);let buyLabel=document.createElement("span");buyLabel.className="context-section-label";buyLabel.textContent="🛒 Acheter des graines";contextActions.appendChild(buyLabel);contextActions.appendChild(buyWrap);syncPlant();syncBuy();
 contextButton("🌱 Tout planter",()=>farmPlantBatch(x,y,k,Infinity,true));
 contextButton("← Retour",()=>openFarmContext(x,y));
 contextButton("✕ Fermer",closeContextActions);
}
function openFarmContext(x,y){
 if(zone().type!=="farm")return;
 if(!unlocked(x,y)){missing("🔒 Cette case n’est pas encore débloquée.");return closeContextActions()}
 let t=farm()[y][x];mature(t);contextActions.innerHTML="";contextOverlay.classList.remove("hidden");
 let title=document.createElement("strong");title.className="context-title";contextActions.appendChild(title);
 if(t.building||t.decor||buildingAtCell(x,y)){title.textContent="🏗️ Élément placé";contextButton("Fermer",closeContextActions);return}
 if(t.state==="grass"){
   title.textContent="🌿 Case libre";
   exactBatchPicker("🪏 Labourer",x,y,"plow",t=>t.state==="grass"&&!t.building&&!t.decor);
   contextButton("🪏 Tout labourer",()=>farmBatch("plow",x,y,Infinity));
   contextButton("✕ Fermer",closeContextActions);return;
 }
 if(t.state==="plowed"){
   title.textContent="🌱 Que veux-tu planter ?";
   for(const[k,d]of Object.entries(CROPS)){
     let locked=!cropUnlocked(k),qty=game.seeds[k]||0;
     contextAssetButton({label:d.name,sub:locked?`🔒 niv.${d.level}`:`${qty} graine${qty>1?"s":""}`,img:`assets/crops/${k}/${k}_stage_04.png`,disabled:locked,onClick:()=>openCropQuantityContext(x,y,k)})
   }
   contextButton("🌿 Remettre en herbe",()=>{game.selectedTool="plow";act(x,y);closeContextActions()});
   contextButton("✕ Fermer",closeContextActions);return;
 }
 if(t.state==="planted"){
   let d=CROPS[t.crop],elapsed=Math.max(0,Date.now()-t.plantedAt),pct=Math.min(99,Math.floor(elapsed/d.time*100)),left=Math.max(0,d.time-elapsed),min=Math.ceil(left/60000);
   title.textContent=`${d.ready} ${d.name} · ${pct}% · ~${min} min`;
   contextButton("Fermer",closeContextActions);return;
 }
 if(t.state==="ready"){
   let d=CROPS[t.crop];title.textContent=`${d.ready} ${d.name} prêt`;
   exactBatchPicker("🧺 Récolter",x,y,"harvest",t=>t.state==="ready"&&!t.building&&!t.decor);
   contextButton("🧺 Tout récolter",()=>farmBatch("harvest",x,y,Infinity));
   contextButton("✕ Fermer",closeContextActions);return;
 }
 title.textContent="Case";contextButton("Fermer",closeContextActions)
}
let farmTouchActive=false,pinchStartDistance=0,pinchStartZoom=1,panStart=null,suppressFarmClick=false;
function endFarmGesture(){pinchStartDistance=0;panStart=null;farmTouchActive=false;suppressFarmClick=false}
farmEl.addEventListener("touchstart",e=>{
 if(e.touches.length===1&&!panStart&&!pinchStartDistance)suppressFarmClick=false;
 farmTouchActive=true;
 if(e.touches.length===2){let a=e.touches[0],b=e.touches[1];pinchStartDistance=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);pinchStartZoom=Math.max(1,Math.min(1.4,Number(game.mapZoom)||1));panStart=null;closeContextActions();return}
 if(e.touches.length===1&&Number(game.mapZoom)>1&&!game.editMode&&!e.target.closest(".livestock-animal,.farm-edit-item,.production-slot")){let t=e.touches[0];panStart={x:t.clientX,y:t.clientY,px:Number(game.mapPanX)||0,py:Number(game.mapPanY)||0,moved:false}}
},{passive:true});
farmEl.addEventListener("touchmove",e=>{
 if(e.touches.length===2&&pinchStartDistance){let a=e.touches[0],b=e.touches[1],dist=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),next=Math.max(.8,Math.min(1.4,pinchStartZoom*(dist/pinchStartDistance)));game.mapZoom=Math.round(next*100)/100;applyMapView();e.preventDefault();return}
 if(e.touches.length===1&&panStart&&Number(game.mapZoom)>1){let t=e.touches[0],dx=t.clientX-panStart.x,dy=t.clientY-panStart.y;if(Math.hypot(dx,dy)>8){panStart.moved=true;suppressFarmClick=true;closeContextActions()}let maxX=farmEl.clientWidth*(game.mapZoom-1)/game.mapZoom,maxY=farmEl.clientHeight*(game.mapZoom-1)/game.mapZoom;game.mapPanX=Math.max(-maxX,Math.min(maxX,panStart.px+dx));game.mapPanY=Math.max(-maxY,Math.min(maxY,panStart.py+dy));applyMapView();if(panStart.moved)e.preventDefault()}
},{passive:false});
farmEl.addEventListener("touchend",e=>{if(e.touches.length<2&&pinchStartDistance){pinchStartDistance=0;save();success(`🔎 Zoom carte : ${Math.round(game.mapZoom*100)} %`)}if(e.touches.length===0){if(panStart?.moved)save();panStart=null;setTimeout(()=>{farmTouchActive=false;suppressFarmClick=false},180)}},{passive:true});
farmEl.addEventListener("touchcancel",endFarmGesture);window.addEventListener("touchend",e=>{if(e.touches.length===0)setTimeout(endFarmGesture,200)},{passive:true});window.addEventListener("blur",endFarmGesture);document.addEventListener("visibilitychange",()=>{if(document.hidden)endFarmGesture()});
farmEl.addEventListener("pointerdown",e=>{if(["farm","forest","mine","production"].includes(zone().type)||game.editMode)return;let t=e.target.closest(".tile");if(!t||["build","move","rotate","deleteDecor","decorate"].includes(game.selectedTool))return;dragging=true;seen.clear();let x=+t.dataset.x,y=+t.dataset.y;seen.add(`${x},${y}`);act(x,y,true)});
farmEl.addEventListener("pointermove",e=>{if(["farm","forest","mine","production"].includes(zone().type)||game.editMode||!dragging)return;let el=document.elementFromPoint(e.clientX,e.clientY)?.closest(".tile");if(!el||!farmEl.contains(el))return;let x=+el.dataset.x,y=+el.dataset.y,k=`${x},${y}`;if(!seen.has(k)){seen.add(k);act(x,y,true)}});
farmEl.addEventListener("pointerup",()=>{if(["farm","forest","mine","production"].includes(zone().type)||game.editMode)return;if(dragging){dragging=false;save();renderAll();msg("✋ Action par glissement terminée.")}});
farmEl.addEventListener("click",e=>{if(suppressFarmClick)return;if(game.editMode){if(e.target.closest(".farm-edit-item,.livestock-animal,.production-slot"))return;let et=e.target.closest(".tile");if(et&&(et.querySelector(".tile-art")||et.classList.contains("building")||et.classList.contains("decorated"))){openTileEditContext(+et.dataset.x,+et.dataset.y);return}placeEditAssetAt(e);return}let t=e.target.closest(".tile");if(!t)return;let tx=+t.dataset.x,ty=+t.dataset.y;if(!unlocked(tx,ty)){closeContextActions();missing("🔒 Cette case n’est pas encore débloquée.");return;}if(zone().type==="farm"){openFarmContext(tx,ty);return}if(["forest","mine"].includes(zone().type)&&!["build","move","rotate","deleteDecor","decorate"].includes(game.selectedTool)){openSpecialZoneContext(tx,ty);return}if(["build","move","rotate","deleteDecor","decorate"].includes(game.selectedTool))act(tx,ty)});
document.querySelectorAll("[data-buildtab]").forEach(b=>b.onclick=()=>{game.buildTab=b.dataset.buildtab;renderAll()});document.getElementById("sell-all").onclick=sellAll;document.getElementById("open-map").onclick=()=>{if(typeof closeGameModal==="function"&&!modal.classList.contains("hidden"))closeGameModal();openMap()};document.getElementById("close-map").onclick=closeMap;document.getElementById("map-modal").onclick=e=>{if(e.target.id==="map-modal")closeMap()};load();playerStartForZone();renderAll();window.addEventListener("pagehide",save);window.addEventListener("beforeunload",save);document.addEventListener("visibilitychange",()=>{if(document.hidden)save()});setInterval(save,15000);setInterval(()=>{production();if(!farmTouchActive&&contextOverlay.classList.contains("hidden")&&!document.body.classList.contains("modal-open"))renderFarm();renderPlayer();renderUI()},1000);
