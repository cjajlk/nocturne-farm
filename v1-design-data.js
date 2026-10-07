/* NOCTURNE FARM — PACK 1
   Architecture/données V1 verrouillées.
   Ce fichier n'altère volontairement aucun gameplay V59.22.
   Console: NFV1.validate()
*/
(() => {
  "use strict";

  const D = {
    schemaVersion: 1,
    designLock: "V1",
    baseGameVersion: 59.22,
    maxV1Level: 50,
    prestigeEvery: 100,
    largePlots: { cols: 8, rows: 8, total: 64 },

    crops: {
      wheat:      { name:"Blé", level:1,  timeMin:5,   value:4,  xpNumerator:1, xpDenominator:4, assetReady:"assets/crops/wheat/wheat_stage_04.png" },
      carrot:     { name:"Carotte", level:3, timeMin:10,  value:6,  xpNumerator:1, xpDenominator:2, assetReady:"assets/crops/carrot/carrot_stage_04.png" },
      corn:       { name:"Maïs", level:6,  timeMin:20,  value:8,  xp:1, assetReady:"assets/crops/corn/corn_stage_04.png" },
      potato:     { name:"Pomme de terre", level:10, timeMin:35,  value:10, xp:1, assetReady:true },
      sunflower:  { name:"Tournesol", level:12, timeMin:60,  value:12, xp:2, assetReady:true },
      strawberry: { name:"Fraise", level:14, timeMin:90,  value:15, xp:3, assetReady:null },
      tomato:     { name:"Tomate", level:15, timeMin:120, value:17, xp:4, assetReady:true },
      beet:       { name:"Betterave sucrière", level:16, timeMin:180, value:18, xp:5, assetReady:true },
      onion:      { name:"Oignon", level:18, timeMin:240, value:20, xp:6, assetReady:true },
      pumpkin:    { name:"Citrouille", level:20, timeMin:360, value:25, xp:8, assetReady:true }
    },

    animals: {
      chicken:{name:"Poule",level:3,price:300,timeMin:15,role:"eggs",assetAvailable:true},
      cow:{name:"Vache",level:7,price:1200,timeMin:30,role:"milk",assetAvailable:true},
      fish:{name:"Poisson",level:9,price:500,timeMin:30,role:"fish",assetAvailable:true},
      sheep:{name:"Mouton",level:10,price:2000,timeMin:90,role:"wool",assetAvailable:true},
      goat:{name:"Chèvre",level:12,price:3000,timeMin:60,role:"goatMilk",assetAvailable:true},
      pig:{name:"Cochon",level:14,price:5000,timeMin:180,role:"truffle",assetAvailable:true},
      donkey:{name:"Âne",level:26,price:18000,unique:true,role:"logistics",assetAvailable:true},
      horse:{name:"Cheval",level:29,price:30000,unique:true,role:"delivery",assetAvailable:true}
    },

    city: {
      enabledInPack1:false,
      budgetCycleHours:8,
      priceCoefficients:[0.90,0.95,1.00,1.05,1.10],
      shops:{
        market:[600,1200,2200,3500,5000],
        grocery:[800,1600,2800,4500,6500],
        fishmonger:[700,1400,2500,4000,6000],
        wood:[900,1800,3200,5000,7500],
        mining:[1000,2000,3500,5500,8000],
        artisan:[1200,2500,4500,7500,11000]
      }
    },

    dayNight: {
      enabledInPack1:false,
      dawn:[6,7], day:[7,18], dusk:[18,20], night:[20,6],
      modes:["auto","day","night"]
    },

    assetPolicy: {
      missingAssetsAreNotDisplayed:true,
      stableIds:true,
      placeholdersInPlayerUI:false
    }
  };

  function validate() {
    const errors = [];
    const cropKeys = Object.keys(D.crops);
    if (D.largePlots.total !== D.largePlots.cols * D.largePlots.rows) errors.push("largePlots total incohérent");
    if (cropKeys.length !== 10) errors.push("10 cultures attendues");
    if (Object.keys(D.animals).length !== 8) errors.push("8 types animaux attendus");
    for (const [k,c] of Object.entries(D.crops)) {
      if (!(c.level >= 1 && c.level <= 50)) errors.push(`culture ${k}: niveau invalide`);
      if (!(c.timeMin > 0)) errors.push(`culture ${k}: timer invalide`);
      if (!(c.value > 0)) errors.push(`culture ${k}: valeur invalide`);
    }
    const result = {
      pack:"PACK 1 — architecture/données",
      base:"V59.22",
      gameplayModified:false,
      crops:cropKeys.length,
      animals:Object.keys(D.animals).length,
      largePlots:D.largePlots.total,
      cityActive:D.city.enabledInPack1,
      dayNightActive:D.dayNight.enabledInPack1,
      status:errors.length ? "FAIL" : "PASS",
      errors
    };
    console.table(result);
    return result;
  }

  Object.defineProperty(window, "NFV1", {
    value:Object.freeze({
      data:Object.freeze(D),
      validate,
      validatePack2(){
        const live=window.NF_LIVE_CROPS || null;
        const expected={wheat:5,carrot:10,corn:20};
        const timers={};
        for(const [k,min] of Object.entries(expected)){
          timers[k]=live?.[k] ? Math.round(live[k].time/60000) : null;
        }
        const errors=[];
        for(const [k,min] of Object.entries(expected)) if(timers[k]!==min) errors.push(`${k}: ${timers[k]} min au lieu de ${min}`);
        const result={pack:"PACK 2 — cultures existantes",timers,globalCropXp:"Blé 1/4 · Carotte 1/2 · Maïs 1",missingCropAssetsStillHidden:true,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack3(){
        const live=window.NF_PACK3_INFO?.();
        const expected={chicken:{level:3,price:300,timeMin:15,xp:4},cow:{level:7,price:1200,timeMin:30,xp:6}};
        const errors=[];
        for(const k of ["chicken","cow"]) for(const p of ["level","price","timeMin","xp"]) if(live?.[k]?.[p]!==expected[k][p]) errors.push(`${k}.${p}: ${live?.[k]?.[p]} au lieu de ${expected[k][p]}`);
        if(live?.fishDeferred!==true) errors.push("fishDeferred attendu true");
        const result={pack:"PACK 3 — poules/vaches",chicken:live?.chicken,cow:live?.cow,fishDeferred:live?.fishDeferred,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack4(){
        const live=window.NF_PACK4_INFO?.(),errors=[];
        const expected={level:9,cost:0,timeMin:30,price:500};
        if(live?.zone?.level!==expected.level)errors.push(`zone.level ${live?.zone?.level}`);
        if(live?.zone?.cost!==expected.cost)errors.push(`zone.cost ${live?.zone?.cost}`);
        if(live?.fish?.timeMin!==expected.timeMin)errors.push(`fish.timeMin ${live?.fish?.timeMin}`);
        if(live?.fish?.price!==expected.price)errors.push(`fish.price ${live?.fish?.price}`);
        if(live?.manualReady!==true)errors.push("file d'attente fish manquante");
        if(live?.fishAssets!==12)errors.push(`assets poissons ${live?.fishAssets}`);
        const result={pack:"PACK 4 — zone de pêche",unlockLevel:live?.zone?.level,background:live?.background,fishPrice:live?.fish?.price,timerMin:live?.fish?.timeMin,manualCollection:live?.manualReady,fishAssets:live?.fishAssets,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack5(){
        const live=window.NF_PACK5_INFO?.(),errors=[];
        if(!live?.coalInStock)errors.push("charbon absent du stock");
        if(live?.coalAsset!=="assets/resources/mine/ore_coal.png")errors.push("asset charbon incorrect");
        if(live?.diamondLevel!==35)errors.push("diamant != niveau 35");
        if(live?.rubyLevel!==40)errors.push("rubis != niveau 40");
        const result={pack:"PACK 5 — ressources naturelles",coalPrepared:live?.coalInStock,coalAsset:live?.coalAsset,diamondUnlock:live?.diamondLevel,rubyUnlock:live?.rubyLevel,currentTimers:live?.currentTimers,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack6(){
        const live=window.NF_PACK6_INFO?.(),errors=[];
        const expected=live?.expected||{};
        for(const [k,lvl] of Object.entries(expected)){
          if(live?.productionUnlocks?.[k]!==lvl)errors.push(`${k}: niveau ${live?.productionUnlocks?.[k]} au lieu de ${lvl}`);
        }
        const expectedPrices={mill:1600,sawmill:1400,miner:2500,laiterie:1800,huilerie:1900,boulangerie:2100,distillerie:2600,carriere:2300,fromagerie:2400,sucrerie:2800,atelierTextile:3000,atelierArtisan:3200,forge:3500,miellerie:2200,serre:3300,pepiniere:2500,atelierMenuiserie:3100,charbonniere:2700};
        for(const [k,p] of Object.entries(expectedPrices))if(live?.pricesPreserved?.[k]!==p)errors.push(`${k}: prix modifié`);
        const result={pack:"PACK 6 — déblocage bâtiments de production",buildings:Object.keys(expected).length,unlockLevels:live?.productionUnlocks,pricesPreserved:errors.filter(e=>e.includes("prix")).length===0,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack61(){
        const live=window.NF_PACK61_INFO?.(),errors=[];
        if(live?.step!==2)errors.push("extension != +2");
        if(live?.max!==16)errors.push("plafond != 16");
        if(live?.migrationDone!==true)errors.push("migration correctif non appliquée");
        const result={pack:"PACK 6.1 — extension terrain",step:live?.step,max:live?.max,currentSize:live?.current,migrationDone:live?.migrationDone,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack7(){
        const live=window.NF_PACK7_INFO?.(),expected={"mill":[1,5,19,34,45],"sawmill":[4,9,25,41,50],"miner":[8,18,29,45,50],"laiterie":[11,24,42,47,50],"huilerie":[12,32,39,46,50],"boulangerie":[13,25,43,47,50],"distillerie":[36,39,43,46,50],"carriere":[21,35,41,47,50],"fromagerie":[18,31,42,46,49],"sucrerie":[16,38,43,46,49],"atelierTextile":[23,33,44,48,50],"atelierArtisan":[24,39,44,48,50],"forge":[22,28,40,47,50],"miellerie":[17,34,44,47,49],"serre":[15,27,37,44,50],"pepiniere":[6,20,32,45,50],"atelierMenuiserie":[30,41,44,48,50],"charbonniere":[27,35,42,47,50]},errors=[];
        if(live?.buildingCount!==18)errors.push("nombre bâtiments != 18");
        for(const [k,levels] of Object.entries(expected))if(JSON.stringify(live?.matrix?.[k])!==JSON.stringify(levels))errors.push(`${k}: matrice incorrecte`);
        const result={pack:"PACK 7 — niveaux améliorations production",buildings:live?.buildingCount,status:errors.length?"FAIL":"PASS",errors};
        console.table(result);return result;
      },
      validatePack8(){
        const live=window.NF_PACK8_INFO?.(),expected=[{"id":"feed","name":"Rations","level":1,"ingredients":{"wheat":1,"corn":2},"output":{"feed":2}},{"id":"flour","name":"Farines","level":2,"ingredients":{"wheat":2},"output":{"flour":2}},{"id":"cornFlour","name":"Farines de maïs","level":3,"ingredients":{"corn":2},"output":{"cornFlour":2}},{"id":"bran","name":"Sons","level":4,"ingredients":{"wheat":3},"output":{"bran":2}},{"id":"richRation","name":"Rations enrichies","level":5,"ingredients":{"corn":2,"wheat":1,"carrot":1},"output":{"richRation":4}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes Moulin incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties Moulin absentes du stock");
        const result={pack:"PACK 8 — recettes Moulin",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack9(){
        const live=window.NF_PACK9_INFO?.(),expected=[{"id":"plank","name":"Planches","level":1,"ingredients":{"wood":2},"output":{"plank":3}},{"id":"plankPlus","name":"Planches","level":2,"ingredients":{"wood":3},"output":{"plank":5}},{"id":"beam","name":"Poutres","level":3,"ingredients":{"wood":4},"output":{"beam":2}},{"id":"treatedWood","name":"Bois traités","level":4,"ingredients":{"plank":3,"oil":1},"output":{"treatedWood":2}},{"id":"reinforcedPlank","name":"Planches renforcées","level":5,"ingredients":{"beam":2,"treatedWood":2},"output":{"reinforcedPlank":2}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes Scierie incorrectes");
        if(live?.outputs?.length!==4)errors.push("sorties Scierie absentes du stock");
        if(live?.oilPrepared!==true)errors.push("clé huile absente");
        const result={pack:"PACK 9 — recettes Scierie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,oilDependencyPrepared:live?.oilPrepared,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack10(){
        const live=window.NF_PACK10_INFO?.(),expected=[{"id":"cream","name":"Crème","level":1,"ingredients":{"milk":2},"output":{"cream":1}},{"id":"butter","name":"Beurre","level":2,"ingredients":{"cream":2},"output":{"butter":1}},{"id":"yogurt","name":"Yaourts","level":3,"ingredients":{"milk":2,"strawberry":1},"output":{"yogurt":2}},{"id":"premiumCream","name":"Crèmes premium","level":4,"ingredients":{"milk":3},"output":{"premiumCream":2}},{"id":"dairyAssortment","name":"Assortiment laitier","level":5,"ingredients":{"milk":1,"cream":1,"butter":1},"output":{"dairyAssortment":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes Laiterie incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties Laiterie absentes du stock");
        if(live?.strawberryPrepared!==true)errors.push("clé fraise absente");
        const result={pack:"PACK 10 — recettes Laiterie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,strawberryDependencyPrepared:live?.strawberryPrepared,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack11(){
        const live=window.NF_PACK11_INFO?.(),expected=[{"id":"sunflowerOil","name":"Huile","level":1,"ingredients":{"sunflower":3},"output":{"oil":1}},{"id":"cornOil","name":"Huile de maïs","level":2,"ingredients":{"corn":3},"output":{"cornOil":1}},{"id":"walnutOil","name":"Huile de noix","level":3,"ingredients":{"walnut":3},"output":{"walnutOil":1}},{"id":"herbOil","name":"Huile aromatique","level":4,"ingredients":{"oil":1,"herb":1},"output":{"herbOil":1}},{"id":"premiumOil","name":"Huile premium","level":5,"ingredients":{"oil":2,"flower":1,"herb":1},"output":{"premiumOil":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 11 — Huilerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack12(){
        const live=window.NF_PACK12_INFO?.(),expected=[{"id":"freshCheese","name":"Fromage frais","level":1,"ingredients":{"milk":2},"output":{"freshCheese":1}},{"id":"agedCheese","name":"Fromage affiné","level":2,"ingredients":{"freshCheese":1,"milk":1},"output":{"agedCheese":1}},{"id":"goatCheese","name":"Fromage de chèvre","level":3,"ingredients":{"goatMilk":2},"output":{"goatCheese":1}},{"id":"herbCheese","name":"Fromage aux herbes","level":4,"ingredients":{"agedCheese":1,"herb":1},"output":{"herbCheese":1}},{"id":"cheeseBoard","name":"Plateau de fromages","level":5,"ingredients":{"freshCheese":1,"agedCheese":1,"goatCheese":1,"honey":1},"output":{"cheeseBoard":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 12 — Fromagerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack13(){
        const live=window.NF_PACK13_INFO?.(),expected=[{"id":"sugar","name":"Sucres","level":1,"ingredients":{"beet":3},"output":{"sugar":2}},{"id":"strawberrySyrup","name":"Sirop de fraise","level":2,"ingredients":{"strawberry":1,"sugar":1},"output":{"strawberrySyrup":1}},{"id":"caramel","name":"Caramel","level":3,"ingredients":{"sugar":1,"milk":1},"output":{"caramel":1}},{"id":"candy","name":"Bonbons","level":4,"ingredients":{"sugar":1,"strawberrySyrup":1},"output":{"candy":1}},{"id":"premiumCandy","name":"Confiserie premium","level":5,"ingredients":{"caramel":1,"honey":1,"strawberry":1},"output":{"premiumCandy":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 13 — Sucrerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack14(){
        const live=window.NF_PACK14_INFO?.(),expected=[{"id":"thread","name":"Fil","level":1,"ingredients":{"wool":2},"output":{"thread":1}},{"id":"fabric","name":"Tissu","level":2,"ingredients":{"thread":2},"output":{"fabric":1}},{"id":"rope","name":"Corde","level":3,"ingredients":{"wool":1,"thread":1},"output":{"rope":1}},{"id":"canvas","name":"Toile","level":4,"ingredients":{"fabric":2,"thread":1},"output":{"canvas":1}},{"id":"premiumFabric","name":"Tissu premium","level":5,"ingredients":{"canvas":1,"wool":1,"flower":1},"output":{"premiumFabric":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 14 — Atelier textile",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack15(){
        const live=window.NF_PACK15_INFO?.(),expected=[{"id":"ingotV1","name":"Lingot","level":1,"ingredients":{"iron":2,"coal":1},"output":{"ingot":1}},{"id":"tools","name":"Outils","level":2,"ingredients":{"ingot":1,"plank":1},"output":{"tools":1}},{"id":"fittings","name":"Ferrures","level":3,"ingredients":{"ingot":2},"output":{"fittings":1}},{"id":"reinforcedTools","name":"Outils renforcés","level":4,"ingredients":{"ingot":2,"coal":1,"treatedWood":1},"output":{"reinforcedTools":1}},{"id":"preciousAlloy","name":"Alliage précieux","level":5,"ingredients":{"ingot":3,"diamond":1,"ruby":1},"output":{"preciousAlloy":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 15 — Forge",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack16(){
        const live=window.NF_PACK16_INFO?.(),expected=[{"id":"honeyV1","name":"Miel","level":1,"ingredients":{"flower":3},"output":{"honey":1}},{"id":"wax","name":"Cire","level":2,"ingredients":{"flower":3,"honey":1},"output":{"wax":1}},{"id":"honeyCandle","name":"Bougie au miel","level":3,"ingredients":{"wax":1,"honey":1},"output":{"honeyCandle":1}},{"id":"aromaticHoney","name":"Miel aromatisé","level":4,"ingredients":{"honey":1,"herb":1},"output":{"aromaticHoney":1}},{"id":"royalJelly","name":"Gelée royale","level":5,"ingredients":{"honey":2,"flower":1,"herb":1},"output":{"royalJelly":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 16 — Miellerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack17(){
        const live=window.NF_PACK17_INFO?.(),expected=[{"id":"cutStone","name":"Pierres taillées","level":1,"ingredients":{"stone":3},"output":{"cutStone":2}},{"id":"slab","name":"Dalles","level":2,"ingredients":{"cutStone":3},"output":{"slab":2}},{"id":"brick","name":"Briques","level":3,"ingredients":{"stone":2,"coal":1},"output":{"brick":2}},{"id":"reinforcedBlock","name":"Bloc renforcé","level":4,"ingredients":{"slab":2,"ingot":1},"output":{"reinforcedBlock":1}},{"id":"ornateStone","name":"Pierre ouvragée","level":5,"ingredients":{"reinforcedBlock":1,"ruby":1},"output":{"ornateStone":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 17 — Carrière",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack18(){
        const live=window.NF_PACK18_INFO?.(),expected=[{"id":"charcoal","name":"Charbons","level":1,"ingredients":{"wood":3},"output":{"coal":2}},{"id":"charcoalPlus","name":"Charbons","level":2,"ingredients":{"wood":3},"output":{"coal":3}},{"id":"briquette","name":"Briquette","level":3,"ingredients":{"coal":2,"wood":1},"output":{"briquette":1}},{"id":"denseCoal","name":"Charbon dense","level":4,"ingredients":{"coal":3},"output":{"denseCoal":1}},{"id":"premiumFuel","name":"Combustible premium","level":5,"ingredients":{"denseCoal":1,"oil":1},"output":{"premiumFuel":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==4)errors.push("sorties absentes du stock");
        const result={pack:"PACK 18 — Charbonnière",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack19(){
        const live=window.NF_PACK19_INFO?.(),expected=[{"id":"crate","name":"Caisse","level":1,"ingredients":{"plank":2},"output":{"crate":1}},{"id":"basket","name":"Panier","level":2,"ingredients":{"plank":1,"rope":1},"output":{"basket":1}},{"id":"candle","name":"Bougie","level":3,"ingredients":{"wax":1,"thread":1},"output":{"candle":1}},{"id":"truffleBasket","name":"Panier de truffes","level":3,"ingredients":{"basket":1,"truffle":2},"output":{"truffleBasket":1}},{"id":"decoratedPot","name":"Pot décoré","level":4,"ingredients":{"cutStone":1,"flower":1},"output":{"decoratedPot":1}},{"id":"giftBox","name":"Coffret","level":5,"ingredients":{"crate":1,"fabric":1,"candle":1},"output":{"giftBox":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==6)errors.push("sorties absentes du stock");
        const result={pack:"PACK 19 — Atelier artisanal",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack20(){
        const live=window.NF_PACK20_INFO?.(),expected=[{"id":"bread","name":"Pain","level":1,"ingredients":{"flour":2},"output":{"bread":1}},{"id":"cornBread","name":"Pain de maïs","level":2,"ingredients":{"flour":1,"cornFlour":1},"output":{"cornBread":1}},{"id":"carrotPie","name":"Tarte","level":3,"ingredients":{"flour":1,"carrot":1,"eggs":1},"output":{"carrotPie":1}},{"id":"potatoPie","name":"Tourte","level":3,"ingredients":{"flour":1,"potato":1,"onion":1},"output":{"potatoPie":1}},{"id":"cake","name":"Gâteau","level":4,"ingredients":{"flour":2,"milk":1,"eggs":1},"output":{"cake":1}},{"id":"pumpkinPie","name":"Tarte à la citrouille","level":4,"ingredients":{"flour":1,"milk":1,"eggs":1,"pumpkin":1},"output":{"pumpkinPie":1}},{"id":"premiumCake","name":"Gâteau premium","level":5,"ingredients":{"flour":1,"butter":1,"sugar":1,"eggs":2,"strawberry":1},"output":{"premiumCake":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==7)errors.push("sorties absentes du stock");
        const result={pack:"PACK 20 — Boulangerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack21(){
        const live=window.NF_PACK21_INFO?.(),expected=[{"id":"appleJuice","name":"Jus","level":1,"ingredients":{"apple":3},"output":{"appleJuice":2}},{"id":"redJuice","name":"Jus rouges","level":2,"ingredients":{"strawberry":3},"output":{"redJuice":2}},{"id":"syrup","name":"Sirop","level":3,"ingredients":{"apple":1,"strawberry":1,"sugar":1},"output":{"syrup":1}},{"id":"essence","name":"Essence","level":4,"ingredients":{"herb":2,"flower":1},"output":{"essence":1}},{"id":"elixir","name":"Élixir","level":5,"ingredients":{"essence":1,"honey":1,"herb":1},"output":{"elixir":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 21 — Distillerie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack22(){
        const live=window.NF_PACK22_INFO?.(),expected=[{"id":"greenhouseFlowers","name":"Fleurs","level":1,"ingredients":{},"output":{"flower":1}},{"id":"greenhouseBoost","name":"Bonus tomate/fraise","level":2,"ingredients":{},"output":{"greenhouseBoost":1}},{"id":"greenhouseHerbs","name":"Herbes","level":3,"ingredients":{},"output":{"herb":1}},{"id":"fertilizer","name":"Engrais","level":4,"ingredients":{"herb":2,"sunflower":1},"output":{"fertilizer":1}},{"id":"rarePlant","name":"Plante rare","level":5,"ingredients":{"flower":1,"herb":1},"output":{"rarePlant":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 22 — Serre",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack23(){
        const live=window.NF_PACK23_INFO?.(),expected=[{"id":"sapling","name":"Jeune plant","level":1,"ingredients":{"wood":1},"output":{"sapling":1}},{"id":"appleTree","name":"Pommier","level":2,"ingredients":{"sapling":1},"output":{"appleTree":1}},{"id":"walnutTree","name":"Noyer","level":3,"ingredients":{"sapling":1},"output":{"walnutTree":1}},{"id":"improvedTree","name":"Arbre amélioré","level":4,"ingredients":{"appleTree":1,"fertilizer":1},"output":{"improvedTree":1}},{"id":"rareEssence","name":"Essence rare","level":5,"ingredients":{"improvedTree":1,"diamond":1},"output":{"rareEssence":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 23 — Pépinière",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack24(){
        const live=window.NF_PACK24_INFO?.(),expected=[{"id":"woodCrate","name":"Caisse en bois","level":1,"ingredients":{"plank":2},"output":{"woodCrate":1}},{"id":"fence","name":"Barrière","level":2,"ingredients":{"plank":3},"output":{"fence":1}},{"id":"furniture","name":"Meuble","level":3,"ingredients":{"plank":2,"fittings":1},"output":{"furniture":1}},{"id":"frame","name":"Charpente","level":4,"ingredients":{"beam":2,"fittings":1},"output":{"frame":1}},{"id":"premiumFurniture","name":"Mobilier premium","level":5,"ingredients":{"treatedWood":1,"premiumFabric":1,"fittings":1},"output":{"premiumFurniture":1}}],errors=[];
        if(JSON.stringify(live?.recipes)!==JSON.stringify(expected))errors.push("recettes incorrectes");
        if(live?.outputs?.length!==5)errors.push("sorties absentes du stock");
        const result={pack:"PACK 24 — Atelier de menuiserie",recipes:live?.recipes?.length,outputs:live?.outputs?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack25(){
        const live=window.NF_PACK25_INFO?.(),errors=[];
        if(live?.integratedFiles!==50)errors.push("nombre d’assets intégrés incorrect");
        if(live?.gameplayChanged!==false)errors.push("le gameplay ne devait pas changer");
        const result={pack:"PACK 25 — intégration assets exploitables",integratedFiles:live?.integratedFiles,gameplayChanged:live?.gameplayChanged,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;
      },
      validatePack26(){const x=window.NF_PACK26_INFO?.(),errors=[];if(x?.crop?.level!==14)errors.push("niveau");if(Math.round((x?.crop?.time||0)/60000)!==90)errors.push("timer");if(x?.stages!==4)errors.push("stades");const result={pack:"PACK 26 — Fraise",status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack27(){const x=window.NF_PACK27_INFO?.(),errors=[];if(x?.registered?.length!==10)errors.push("10 cultures");if(x?.visible?.length!==4)errors.push("4 cultures visibles");const result={pack:"PACK 27 — architecture cultures",status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack28(){const x=window.NF_PACK28_INFO?.(),errors=[];if(x?.registered?.length!==8)errors.push("8 animaux");if(JSON.stringify(x?.missing)!==JSON.stringify(["goat","donkey","horse"]))errors.push("animaux manquants");const result={pack:"PACK 28 — registre animaux",status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack29(){const x=window.NF_PACK29_INFO?.(),expected=["wheat","carrot","corn","strawberry"],errors=[];if(JSON.stringify(x?.plantingChoices)!==JSON.stringify(expected))errors.push("menu plantation");if(JSON.stringify(x?.lexiconCrops)!==JSON.stringify(expected))errors.push("lexique cultures");if(x?.brokenCropAssetPrefixes?.length)errors.push("chemin asset");const result={pack:"PACK 29 — correctif chemins cultures",plantingChoices:x?.plantingChoices,brokenCropAssetPrefixes:x?.brokenCropAssetPrefixes,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack30(){const x=window.NF_PACK30_INFO?.(),errors=[];if(x?.sheep?.level!==10||x?.sheep?.price!==2000||x?.sheep?.timeMin!==90||x?.sheep?.xp!==8)errors.push("mouton");if(x?.pig?.level!==14||x?.pig?.price!==5000||x?.pig?.timeMin!==180||x?.pig?.xp!==12)errors.push("cochon");const result={pack:"PACK 30 — Mouton + Cochon",status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack31(){const x=window.NF_PACK31_INFO?.(),errors=[];if(!["auto","day","night"].includes(x?.mode))errors.push("mode");if(!["day","dawn","dusk","night"].includes(x?.phase))errors.push("phase");if(x?.visualOnly!==true)errors.push("cycle non visuel");const result={pack:"PACK 31 — cycle jour/nuit",mode:x?.mode,phase:x?.phase,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack32(){const x=window.NF_PACK32_INFO?.(),errors=[];if(JSON.stringify(x?.options)!==JSON.stringify(["auto","day","night"]))errors.push("options");if(!x?.optionsUi||!x?.optionsTab||!x?.optionsPage)errors.push("interface options");const result={pack:"PACK 32 — options jour/nuit",mode:x?.mode,options:x?.options,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack322(){const x=window.NF_PACK32_2_INFO?.(),errors=[];if(!["auto","day","night"].includes(x?.mode))errors.push("mode");if(!["day","dawn","dusk","night"].includes(x?.phase))errors.push("phase");if(x?.farmClasses?.length!==1)errors.push("classe visuelle");const result={pack:"PACK 32.2 — persistance jour/nuit",mode:x?.mode,phase:x?.phase,farmClasses:x?.farmClasses,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack323(){const x=window.NF_PACK32_3_INFO?.(),errors=[];if(!["auto","day","night"].includes(x?.mode))errors.push("mode");if(x?.panelClasses?.length!==1)errors.push("classe persistante");const result={pack:"PACK 32.3 — jour/nuit persistant hors modal",mode:x?.mode,phase:x?.phase,panelClasses:x?.panelClasses,modalClosed:x?.modalClosed,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack33(){const x=window.NF_PACK33_INFO?.(),errors=[];if(x?.title!=="NOCTURNE FARM")errors.push("titre navigateur");if(!x?.brand?.includes("NOCTURNE FARM"))errors.push("titre interface");const result={pack:"PACK 33 — identité NOCTURNE FARM",title:x?.title,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack34(){const x=window.NF_PACK34_INFO?.(),errors=[];if(x?.livestockMinScale!==.7)errors.push("minimum animaux");const result={pack:"PACK 34 — édition animaux",minScale:x?.livestockMinScale,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack35(){const x=window.NF_PACK35_INFO?.(),errors=[];if(x?.registered!==32)errors.push("registre décor");const result={pack:"PACK 35 — registre assets décor",registered:x?.registered,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack36(){const x=window.NF_PACK36_INFO?.(),errors=[];if(x?.visualReady?.length!==10)errors.push("10 cultures visuelles");if(Object.values(x?.assetPrefixes||{}).some(v=>!v))errors.push("préfixe asset");const result={pack:"PACK 36 — assets 10 cultures",visualReady:x?.visualReady?.length,pendingSeedPrices:x?.pendingSeedPrices,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack37(){const x=window.NF_PACK37_INFO?.(),errors=[];if(!x?.assets?.goat?.ready||!x?.assets?.donkey?.ready||!x?.assets?.horse?.ready)errors.push("assets animaux");if(x?.goat?.level!==12||x?.goat?.price!==3000||x?.goat?.timeMin!==60||x?.goat?.xp!==9)errors.push("chèvre");const result={pack:"PACK 37 — chèvre + assets âne/cheval",goat:x?.goat,passivesDeferred:x?.passivesDeferred,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack38(){const x=window.NF_PACK38_INFO?.(),errors=[];if(x?.donkey?.level!==26||x?.donkey?.price!==18000||x?.donkey?.bonus!=="storage+10%")errors.push("âne");if(x?.horse?.level!==29||x?.horse?.price!==30000||x?.horse?.bonus!=="animalSpeed+5%")errors.push("cheval");const result={pack:"PACK 38 — passifs âne/cheval",donkey:x?.donkey,horse:x?.horse,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack39(){const x=window.NF_PACK39_INFO?.(),expected={potato:80,sunflower:85,tomato:100,beet:110,onion:120,pumpkin:150},errors=[];for(const[k,v]of Object.entries(expected))if(x?.prices?.[k]!==v)errors.push(k);if(x?.seedKeys?.length<10)errors.push("clés graines");const result={pack:"PACK 39 — prix graines",prices:x?.prices,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack40(){const x=window.NF_PACK40_INFO?.(),errors=[];if(x?.extraEditAssets!==32)errors.push("32 assets");const result={pack:"PACK 40 — décorations édition",extraEditAssets:x?.extraEditAssets,allEditAssets:x?.allEditAssets,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack41(){const x=window.NF_PACK41_INFO?.(),errors=[];if(!x?.lampRegistered)errors.push("lanterne");if(x?.automatic!==true||x?.usesFuel!==false)errors.push("cycle");const result={pack:"PACK 41 — éclairage jour/nuit",phase:x?.phase,lampRegistered:x?.lampRegistered,automatic:x?.automatic,usesFuel:x?.usesFuel,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack42(){const x=window.NF_PACK42_INFO?.(),errors=[];if(x?.cityZone?.level!==10)errors.push("ville N10");if(x?.shops?.length!==8)errors.push("8 bâtiments");if(JSON.stringify(x?.priceCoef)!==JSON.stringify([.9,.95,1,1.05,1.1]))errors.push("coefficients");const result={pack:"PACK 42 — fondations Ville",shops:x?.shops?.length,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack43(){const x=window.NF_PACK43_INFO?.(),errors=[];if(!x?.cityUi)errors.push("UI ville");if(x?.shopCount!==8)errors.push("8 bâtiments");if(x?.budgetHours!==8)errors.push("budget 8h");const result={pack:"PACK 43 — interface Ville",status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack44(){const x=window.NF_PACK44_INFO?.(),errors=[];if(x?.directStockSaleButtons!==0)errors.push("vente directe Stock encore active");if(JSON.stringify(x?.priceCoef)!==JSON.stringify([.9,.95,1,1.05,1.1]))errors.push("coefficients");const result={pack:"PACK 44 — ventes Ville",directStockSaleButtons:x?.directStockSaleButtons,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack45(){const x=window.NF_PACK45_INFO?.(),errors=[];if(!x?.devCityUnlocked)errors.push("ville test");if(x?.officialCityLevel!==10)errors.push("règle officielle N10 altérée");if(JSON.stringify(x?.orderOfficeLevels)!==JSON.stringify([15,24,34,44,49]))errors.push("bureau niveaux");if(JSON.stringify(x?.depotLevels)!==JSON.stringify([26,29,39,46,50]))errors.push("dépôt niveaux");if(x?.depotBonusInvented!==false)errors.push("bonus dépôt inventé");const result={pack:"PACK 45 — Ville test + commandes + dépôt",devCityUnlocked:x?.devCityUnlocked,officialCityLevel:x?.officialCityLevel,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack46(){const x=window.NF_PACK46_INFO?.(),errors=[];if(x?.visualCount!==8)errors.push("8 bâtiments graphiques");if(!x?.background)errors.push("fond ville");if(x?.gitIncluded!==true)errors.push(".git");const result={pack:"PACK 46 — Ville graphique",visualCount:x?.visualCount,background:x?.background,gitIncluded:x?.gitIncluded,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack47(){const x=window.NF_PACK47_INFO?.(),errors=[];if(!x?.xpFunctionFixed)errors.push("XP commandes");if(!x?.editBlockedInCity)errors.push("édition Ville");if(x?.budgetPeriodHours!==8)errors.push("budget 8 h");if(x?.cityVisualCount!==8)errors.push("8 visuels Ville");if(x?.officialCityLevel!==10)errors.push("règle officielle N10");const result={pack:"PACK 47 — stabilisation Ville",xpFunctionFixed:x?.xpFunctionFixed,budgetPeriodHours:x?.budgetPeriodHours,cityVisualCount:x?.cityVisualCount,officialCityLevel:x?.officialCityLevel,devCityUnlocked:x?.devCityUnlocked,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;},
      validatePack48(){const x=window.NF_PACK48_INFO?.(),errors=[];if(x?.devCityUnlocked!==false)errors.push("ville test encore déverrouillée");if(x?.officialCityLevel!==10)errors.push("ville officielle pas N10");if(!x?.viewport)errors.push("viewport ville");if(x?.visualCount!==8)errors.push("8 bâtiments");const result={pack:"PACK 48 — Ville responsive + verrouillage réel",devCityUnlocked:x?.devCityUnlocked,officialCityLevel:x?.officialCityLevel,viewport:x?.viewport,visualCount:x?.visualCount,status:errors.length?"FAIL":"PASS",errors};console.table(result);return result;}
    }),
    writable:false,
    configurable:false
  });
})();
