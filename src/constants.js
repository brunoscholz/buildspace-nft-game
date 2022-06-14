const CONTRACT_ADDRESS = '0x7c9bb0338D21C4cD2E554afd66b76D9a48cA6911';

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
    criticalChance: characterData.critChance.toNumber(),
    defense: characterData.defense.toNumber(),
    weapon: characterData.weapon.toNumber(),
    xp: characterData.xp.toNumber(),
  };
};

const transformBossData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber()
  };
};

export { CONTRACT_ADDRESS, transformCharacterData, transformBossData };