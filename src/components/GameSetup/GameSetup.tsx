import { FC, useContext } from "react";
import styles from "./GameSetup.module.scss";
import { statusContext } from "../../StatusContext";
import { villainInfo } from "../../lib/villain-info";
import ChoiceSelector from "./ChoiceSelector/ChoiceSelector";
import Accordion from "../General/Accordion/Accordion";
import { VillainBackdrop } from "./VillainBackdrop/VillainBackdrop";
import { GameSetupHeader } from "./GameSetupHeader/GameSetupHeader";
import GameSetupFooter from "./GameSetupFooter/GameSetupFooter";
import SpecialLocations from "./SpecialLocations/SpecialLocations";
import ActionTokenSelection from "./ActionTokenSelection/ActionTokenSelection";
import HeroGrid from "../HeroGrid/HeroGrid";

interface GameSetupProps {
  closeModal: () => void;
}

const GameSetup: FC<GameSetupProps> = ({ closeModal }) => {
  const {
    actionTokens,
    chained,
    currentBtnClicked,
    roster,
    toggleRosterHero,
    heroChoices,
    isHeroClickable,
    generateTeamChoiceListProps,
    generatePetChoiceListProps,
    generateEquipChoiceListProps,
  } = useContext(statusContext);

  const choices = chained.concat(heroChoices);
  const teamProps = generateTeamChoiceListProps();
  const petProps = generatePetChoiceListProps();
  const equipProps = generateEquipChoiceListProps();

  return currentBtnClicked in villainInfo ? (
    <div className={styles.container}>
      <VillainBackdrop />
      <div className={styles.innerContainer}>
        <GameSetupHeader closeModal={closeModal} />
        <HeroGrid
          heroes={choices}
          containerClass={styles.grid}
          clickHandler={toggleRosterHero}
          conditionalHeroClasses={[
            {
              fn: isHeroClickable,
              c: "clickable",
            },
            {
              fn: (h) => !roster.has(h),
              c: "semi-transparent",
            },
          ]}
          maxRowSize={Math.min(choices.length, 7)}
        />
        <SpecialLocations />
        {Object.values(actionTokens).reduce((a, b) => a + b) ? (
          <Accordion title="Action Tokens">
            <ActionTokenSelection />
          </Accordion>
        ) : null}
        {equipProps.data.length ? <ChoiceSelector {...equipProps} /> : null}
        {teamProps.data.length ? <ChoiceSelector {...teamProps} /> : null}
        {petProps.data.length ? <ChoiceSelector {...petProps} /> : null}
        <GameSetupFooter />
      </div>
    </div>
  ) : null;
};

export default GameSetup;
