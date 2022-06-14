import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, transformBossData } from "../../constants";
import myEpicGame from "../../utils/MyEpicGame.json";
import "./Arena.css";
import LoadingIndicator from "../LoadingIndicator";

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT, setCharacterNFT, currentAccount }) => {
  // State
  const [gameContract, setGameContract] = useState(null);
  const [boss, setBoss] = useState(null);
  const [attackState, setAttackState] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss();
      console.log("Boss:", bossTxn);
      setBoss(transformBossData(bossTxn));
    };

    const onAttackComplete = (from, newBossHp, newPlayerHp, playerAttack, bossAttack) => {
      const bossHp = newBossHp.toNumber();
      const playerHp = newPlayerHp.toNumber();
      const sender = from.toString();

      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);
      console.log(`Critical Hit?: ${playerAttack > characterNFT.attackDamage ? 'Yes' : 'no'}`);
      console.log(`Boss Attack?: ${bossAttack === 0 ? 'Miss!!!' : bossAttack}`);

      if (currentAccount === sender.toLowerCase()) {

        setBoss((prevState) => {
          return { ...prevState, hp: bossHp };
        });
        setCharacterNFT((prevState) => {
          return { ...prevState, hp: playerHp };
        });
      }
      else {
        setBoss((prevState) => {
          return { ...prevState, hp: bossHp };
        });
      }
    }

    if (gameContract) {
      fetchBoss();
      gameContract.on('AttackComplete', onAttackComplete);
    }

    return () => {
      if (gameContract) {
        gameContract.off('AttackComplete', onAttackComplete);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameContract]);

  // UseEffects
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log("Ethereum object not found");
    }
  }, []);

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState('attacking');
        console.log('Attacking boss...');
        const attackTxn = await gameContract.attackBoss();
        await attackTxn.wait();
        console.log('attackTxn:', attackTxn);
        setAttackState('hit');

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error attacking boss:', error);
      setAttackState('');
    }
  };

  return (
    <div className="arena-container">
      {boss && characterNFT && (
        <div id="toast" className={showToast ? 'show' : ''}>
          <div id="desc">{`💥 ${boss.name} was hit for ${characterNFT.attackDamage}!`}</div>
        </div>
      )}
      {boss && (
        <>
          <div className={`card boss-container ${attackState}`}>
            <p className="character-name">{boss.name}</p>
            <div className="character-background">
              <div className="character-image" style={{backgroundImage:`url(${boss.imageURI})`}}></div>
              <div className="health-bar">
                <progress value={boss.hp} max={boss.maxHp} />
                <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
              </div>
            </div>
            <p className="character-type">Creature - Woke</p>
            <div className="character-desc">
              <p><b>Can miss attacks!</b><br/><i>Lengend says has the faked fear for life and has a loud mouth.</i></p>
            </div>
            <p className="character-stats">⚔️ {boss.attackDamage}</p>
          </div>
          <div className="attack-container">
            <button className="cta-button" onClick={runAttackAction}>
              {`💥 Attack ${boss.name}`}
            </button>
          </div>
          {attackState === 'attacking' && (
            <div className="loading-indicator">
              <LoadingIndicator />
              <p>Attacking ⚔️</p>
            </div>
          )}
        </>
      )}

      {characterNFT && (
        <div className="players-container">
          <div className="card player-container">
            <p className="character-name">{characterNFT.name}</p>
            <div className="character-background">
              <div className="character-image" style={{backgroundImage:`url(${characterNFT.imageURI})`}}></div>
              <div className="health-bar">
                <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
              </div>
            </div>
            <p className="character-type">Commentator</p>
            <div className="character-desc">
              <p>
                Critical chance: <b>{characterNFT.criticalChance}%</b><br/>
                Defense: <b>{characterNFT.defense}</b><br/>
                {characterNFT.weapon ? '' : 'no weapon'}<br/>
                {characterNFT.xp ? `XP: <b>${characterNFT.xp}</b>` : ''}<br/>
              </p>
            </div>
            <p className="character-stats">⚔️ {characterNFT.attackDamage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Arena;
