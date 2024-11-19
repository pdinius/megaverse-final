import JEFF from "../assets/rewards/pets/jeffrey.jpg";
import LOCKHEED from "../assets/rewards/pets/lockheed.jpg";
import ALLIGATOR_LOKI from "../assets/rewards/pets/alligator-loki.jpg";
import REDWING from "../assets/rewards/pets/redwing.jpg";
import THROG from "../assets/rewards/pets/throg.jpg";
import COSMO from "../assets/rewards/pets/cosmo.jpg";
import GOOSE from "../assets/rewards/pets/goose.jpg";
import { PetKey } from "../types/pets";

export const petIconSrcs: { [key in PetKey]?: string } = {
  PET_JEFF: JEFF,
  PET_LOCKHEED: LOCKHEED,
  // PET_ACE_THE_BAT_HOUND: "",
  PET_ALLIGATOR_LOKI: ALLIGATOR_LOKI,
  // PET_DETECTIVE_CHIMP: "",
  // PET_DEX_STARR: "",
  PET_REDWING: REDWING,
  PET_THROG: THROG,
  PET_COSMO: COSMO,
  PET_GOOSE: GOOSE,
};
