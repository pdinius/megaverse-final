import { FC, useContext } from "react";
import styles from "./GameSetup.module.scss";
import { statusContext } from "../../StatusContext";
import ChoiceSelector from "./ChoiceSelector/ChoiceSelector";
import Accordion from "../General/Accordion/Accordion";
import { VillainBackdrop } from "./VillainBackdrop/VillainBackdrop";
import { GameSetupHeader } from "./GameSetupHeader/GameSetupHeader";
import GameSetupFooter from "./GameSetupFooter/GameSetupFooter";
import SpecialLocations from "./SpecialLocations/SpecialLocations";
import ActionTokenSelection from "./ActionTokenSelection/ActionTokenSelection";
import HeroGrid from "../HeroGrid/HeroGrid";
import { If } from "../General/If/If";

const GameSetup: FC = () => {
  const {
    getLegalHeroesForFight,
    heroRoster,
    isHeroClickable,
    showActionTokensAccordion,
    generateTeamChoiceListProps,
    generatePetChoiceListProps,
    generateEquipChoiceListProps,
  } = useContext(statusContext);

  const teamProps = generateTeamChoiceListProps();
  const petProps = generatePetChoiceListProps();
  const equipProps = generateEquipChoiceListProps();

  return (
    <div className={styles.container}>
      <VillainBackdrop />
      <div className={styles.innerContainer}>
        <GameSetupHeader />
        <HeroGrid
          heroes={getLegalHeroesForFight()}
          containerClass={styles.grid}
          conditionalHeroClass={(h) => {
            const res: Array<string> = [];
            if (isHeroClickable(h)) {
              res.push("clickable");
            }
            if (!heroRoster.has(h)) {
              res.push("semi-transparent");
            }
            return res.join(" ");
          }}
          maxRowSize={Math.min(getLegalHeroesForFight().length, 7)}
        />
        <SpecialLocations />
        <If condition={showActionTokensAccordion()}>
          <Accordion title="Action Tokens">
            <ActionTokenSelection />
          </Accordion>
        </If>
        <If condition={equipProps.data.length > 0}>
          <ChoiceSelector {...equipProps} />
        </If>
        <If condition={teamProps.data.length > 0}>
          <ChoiceSelector {...teamProps} />
        </If>
        <If condition={petProps.data.length > 0}>
          <ChoiceSelector {...petProps} />
        </If>
        <GameSetupFooter />
      </div>
    </div>
  );
};

export default GameSetup;
