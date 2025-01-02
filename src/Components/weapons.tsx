import { classWeaponTable, weaponTable } from '../Tables/tables.js';
import { CabinFeverClassWeaponTable } from '../Tables/cabin-fever-tables.ts';
 
export function DetermineWeapon(className: string, classValue: number, settings: any): string {
  let combinedClassWeaponTable = classWeaponTable;
  if (settings.includes('cabin-fever')){
    combinedClassWeaponTable = combinedClassWeaponTable.concat(CabinFeverClassWeaponTable);
  }
  const classWeaponValue = Math.floor((Math.random() * combinedClassWeaponTable[classValue]));

  switch (className) {
    case 'Brute':
      return 'Trusted Weapon';
    case 'Buccaneer':
        return weaponTable[9];
    case 'The Mess':
      return 'Trusted Cleaver';
    default:
      return weaponTable[classWeaponValue];
  }
}