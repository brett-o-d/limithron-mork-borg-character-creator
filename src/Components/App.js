import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { TextStyles, PositionStyles } from './styles.js'
import {distinctiveFlawsTable, physicalAilmentTable, idiosyncraciesTable, 
        unfortunateIncidentsTable, thingOfImportanceTable, backgroundTable,
        clothingTable, hatTable, weaponTable, firstNamesTable, nicknameTable, 
        lastNameTable, statLookupTable, classTable, classAbilityTables, classStatsModifierTable, 
        classHatTable, classHpTable, classDevilsLuckCircleFillTable, 
        classClothingTable, classWeaponTable, 
        bruteWeaponTable, buccaneerWeaponTable } from '../Tables/tables.js';
import PirateBorgCharacterSheetv3letter from '../Assets/PirateBorgCharacterSheetv3letter.jpg';
import RollStat from '../Utilities/stat-roller.js';
import WeaponDisplay from './weapons.js';
import GearDisplay from './gear.js';
import './css/App.css';
import './css/print.css'

function App() {
  //Used to generate a new Pirate without refreshing the page
  const [throwaway, setThrowaway] = useState([0]);

  const classValue = Math.floor((Math.random() * classTable.length));

  const className = classTable[classValue];

  const devilsLuck = classDevilsLuckCircleFillTable[classValue];

  const classAbilityValue = Math.floor((Math.random() * classAbilityTables[classValue].length));
  const classAbility = classAbilityTables[classValue][classAbilityValue];

  const classClothingValue = Math.floor((Math.random() * classClothingTable[classValue]));
  const classHatValue = Math.floor((Math.random() * classHatTable[classValue]));
  const classWeaponValue = Math.floor((Math.random() * classWeaponTable[classValue]));

  const strengthStat = Math.max(parseInt(statLookupTable[RollStat()]) + classStatsModifierTable[classValue][0], -3);
  const agilityStat = Math.max(parseInt(statLookupTable[RollStat()]) + classStatsModifierTable[classValue][1], -3);
  const presenceStat = Math.max(parseInt(statLookupTable[RollStat()]) + classStatsModifierTable[classValue][2], -3);
  const toughnessStat = Math.max(parseInt(statLookupTable[RollStat()]) + classStatsModifierTable[classValue][3], -3);
  const spiritStat = Math.max(parseInt(statLookupTable[RollStat()]) + classStatsModifierTable[classValue][4], -3);

  const classHp = Math.max(Math.floor((Math.random() * classHpTable[classValue])) + toughnessStat, 1);

  const distinctiveFlawValue = Math.floor((Math.random() * distinctiveFlawsTable.length));
  const physicalAilmentValue = Math.floor((Math.random() * physicalAilmentTable.length));
  const idiosyncraciesValue = Math.floor((Math.random() * idiosyncraciesTable.length));
  const unfortunateIncidentsValue = Math.floor((Math.random() * unfortunateIncidentsTable.length));
  const thingOfImportanceValue = Math.floor((Math.random() * thingOfImportanceTable.length));
  const backgroundValue = Math.floor((Math.random() * backgroundTable.length));
  const firstNamesValue = Math.floor((Math.random() * firstNamesTable.length));
  const nicknameValue = Math.floor((Math.random() * nicknameTable.length));
  const lastNameValue = Math.floor((Math.random() * lastNameTable.length));

  const distinctiveFlaw = distinctiveFlawsTable[distinctiveFlawValue];
  const physicalAilment = physicalAilmentTable[physicalAilmentValue];
  const idiosyncracies = idiosyncraciesTable[idiosyncraciesValue];
  const unfortunateIncidents = unfortunateIncidentsTable[unfortunateIncidentsValue];
  const thingOfImportance = thingOfImportanceTable[thingOfImportanceValue];
  const background = backgroundTable[backgroundValue];

  const clothing = clothingTable[classClothingValue];
  const hat = hatTable[classHatValue];
  const weapon = classValue === 2 /* Buccaneer */  ? weaponTable[9] /* Musket */ :  weaponTable[classWeaponValue];
  const firstNames = firstNamesTable[firstNamesValue];
  const nickname = nicknameTable[nicknameValue];
  const lastName = lastNameTable[lastNameValue];

  //Import (material-ui) text styles
  const textStyleClasses = TextStyles();
  const positionStyleClasses = PositionStyles();

  function ClothesDisplay(){
    return (
      <div className={textStyleClasses.mediumText + " clothes-text " + positionStyleClasses.Clothes}>
        <strong>Clothes:</strong> {clothing}
        <br/>
        <strong>Hat:</strong> {hat}
      </div>
    );
  }

  function DevilsLuckCircles(){
    return (
      <div>
        <div className={'devils-luck-circle-one ' + textStyleClasses.largeText}>
          {(devilsLuck === '1') ? "⬤" : ""}
        </div>
        <div className={'devils-luck-circle-two ' + textStyleClasses.largeText}>
          {(devilsLuck === '2') ? "⬤" : ""}
        </div>
        <div className={'devils-luck-circle-three ' + textStyleClasses.largeText}>
          {(devilsLuck === '3') ? "⬤" : ""}
        </div>
      </div>
    );
  }

  const PrintDiv = (() => {
      window.print();
  });

  const NewPirate = (() => {
    setThrowaway(Number(throwaway) + 1);
    console.log(throwaway);
  });
  
  return (
    <div>
      <div className='no-print'>
        <BrowserView>
          <input type="button" value="Print this pirate" onClick={PrintDiv}></input>
          <input type="button" value="To Davey Jones wit' ye" onClick={NewPirate}></input>
        </BrowserView>        
        <MobileView>
          <input type="button" value="To Davey Jones wit' ye" onClick={NewPirate}></input>
        </MobileView>
      </div>
      <div className="container" id="print-content">
        <img src={PirateBorgCharacterSheetv3letter} className="character-sheet" alt=""></img>

        <div className={textStyleClasses.largeText + " character-name-text " + positionStyleClasses.CharacterName}>
          <span>{firstNames + " “" + nickname + "” " + lastName}</span>
        </div>
        <div className={textStyleClasses.largeText + " class-name " + positionStyleClasses.ClassName}>{className}</div>
        <div className={textStyleClasses.mediumText + " class-features " + positionStyleClasses.ClassFeatures}>
        {classValue === 2 /* Buccaneer */
              ? <div>{buccaneerWeaponTable[Math.floor((Math.random() * buccaneerWeaponTable.length))]}<br/><br/></div>
              : null}
        <div>{classAbility}</div>
        {classValue === 0 /* Brute */
            ? <div><br/>{bruteWeaponTable[Math.floor((Math.random() * bruteWeaponTable.length))]}</div> 
            : null}
        </div>

        <div className={textStyleClasses.extraLargeText + " hp " + positionStyleClasses.HitPoints}>
          <strong>{classHp}</strong>
        </div>

        <div className={textStyleClasses.extraLargeText + " strength " + positionStyleClasses.Strength}>
          {(strengthStat >= 0)? "+"+strengthStat : strengthStat}
        </div>
        <div className={textStyleClasses.extraLargeText + " agility " + positionStyleClasses.Agility}>
          {(agilityStat >= 0)? "+"+agilityStat : agilityStat}
        </div>
        <div className={textStyleClasses.extraLargeText + " presence " + positionStyleClasses.Presence}>
          {(presenceStat >= 0)? "+"+presenceStat : presenceStat}
        </div>
        <div className={textStyleClasses.extraLargeText + " toughness " + positionStyleClasses.Toughness}>
          {(toughnessStat >= 0)? "+"+toughnessStat : toughnessStat}
        </div>    
        <div className={textStyleClasses.extraLargeText + " spirit " + positionStyleClasses.Spirit}>
          {(spiritStat >= 0)? "+"+spiritStat : spiritStat}
        </div>
        {DevilsLuckCircles()}

        {WeaponDisplay(weapon, classValue, textStyleClasses.mediumText, positionStyleClasses.Weapon)}


        <div className={textStyleClasses.mediumText + " character-background"}>
          {background}
        </div>
        <div className={textStyleClasses.mediumText + " distinctive-flaw"}>
          {distinctiveFlaw}
        </div>
        <div className={textStyleClasses.mediumText + " physical-ailment"}>
          {physicalAilment}
        </div>
        <div className={textStyleClasses.mediumText + " idiosyncracies"}>
          {idiosyncracies}
        </div>
        <div className={textStyleClasses.mediumText + " unfortunate-incidents"}>
          {unfortunateIncidents}
        </div>
        <div className={textStyleClasses.mediumText + " thing-of-importance"}>
          {thingOfImportance}
        </div>

        {ClothesDisplay()}
        {GearDisplay(textStyleClasses.mediumText)}
      </div>
    </div>
  );
}

export default App;
