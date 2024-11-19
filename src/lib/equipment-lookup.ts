import { EquipKey } from "../types/equipment";
import { HeroKey } from "../types/heroes";

export const equipmentLookup: { [key in EquipKey]: HeroKey | "GENERIC" } = {
  EQUIP_ANT_MAN_WRIST_GAUNTLETS: "ANT_MAN",
  EQUIP_ANT_MANS_SUIT: "ANT_MAN",
  EQUIP_BETA_RAY_BILL_STORMBREAKER: "BETA_RAY_BILL",
  EQUIP_BLACK_KNIGHT_EBONY_BLADE: "BLACK_KNIGHT",
  EQUIP_BLACK_PANTHER_HARD_LIGHT_SHIELD: "BLACK_PANTHER",
  EQUIP_BLACK_PANTHER_SHURI_HARD_LIGHT_SHIELD: "BLACK_PANTHER",
  EQUIP_BLACK_PANTHER_SHURI_SPEAR_OF_BASHENGA: "BLACK_PANTHER",
  EQUIP_BLACK_PANTHER_SPEAR_OF_BASHENGA: "BLACK_PANTHER",
  EQUIP_BLACK_WIDOW_BATTLE_BATONS: "BLACK_WIDOW",
  EQUIP_BLACK_WIDOW_WIDOWS_BITE: "BLACK_WIDOW",
  EQUIP_BLADES_SWORD: "BLADE",
  EQUIP_CAPTAIN_AMERICA_CLASSIC_CAPTAIN_AMERICAS_SHIELD: "CAPTAIN_AMERICA",
  EQUIP_CAPTAIN_AMERICA_SAM_WILSON_CAPTAIN_AMERICAS_SHIELD: "CAPTAIN_AMERICA",
  EQUIP_CAPTAIN_AMERICAS_SHIELD: "CAPTAIN_AMERICA",
  EQUIP_CAPTAIN_BRITAIN_BETSY_BRADDOCK_STARLIGHT_SWORD: "CAPTAIN_BRITAIN",
  EQUIP_CAPTAIN_CARTERS_SHIELD: "CAPTAIN_CARTER",
  EQUIP_COSMIC_GHOST_RIDER_HELL_CYCLE: "COSMIC_GHOST_RIDER",
  EQUIP_COSMIC_GHOST_RIDER_HELLFIRE_CHAIN: "COSMIC_GHOST_RIDER",
  EQUIP_CYBORG_SPIDER_MAN_SONIC_CANNON: "CYBORG",
  EQUIP_CYCLOPS_FIRST_CLASS_CYCLOPS_VISOR: "CYCLOPS",
  EQUIP_CYCLOPS_VISOR: "CYCLOPS",
  EQUIP_DAREDEVIL_BILLY_CLUB: "DAREDEVIL",
  EQUIP_DARKCHILD_SOULSWORD: "DARKCHILD",
  EQUIP_ELEKTRA_SAI: "ELEKTRA",
  EQUIP_ELSA_BLOODSTONE_MORDREDS_CAUSEWAY: "ELSA_BLOODSTONE",
  EQUIP_GAMBIT_DECK_OF_CARDS: "GAMBIT",
  EQUIP_GAMORA_GODSLAYER: "GAMORA",
  EQUIP_GENERIC_AIRLIFT: "GENERIC",
  EQUIP_GENERIC_BODY_ARMOR: "GENERIC",
  EQUIP_GENERIC_COMMUNICATION_DEVICE: "GENERIC",
  EQUIP_GENERIC_MAKESHIFT_WEAPON: "GENERIC",
  EQUIP_GHOST_RIDER_HELL_CHARGER: "GHOST_RIDER",
  EQUIP_GHOST_RIDER_HELLFIRE_CHAIN: "GHOST_RIDER",
  EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELL_CYCLE: "GHOST_RIDER",
  EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELLFIRE_CHAIN: "GHOST_RIDER",
  EQUIP_GHOST_SPIDER_WEB_SHOOTERS: "GHOST_SPIDER",
  EQUIP_HAWKEYE_TRICK_ARROW_EXPLOSIVE: "HAWKEYE",
  EQUIP_HAWKEYE_TRICK_ARROW_PYM_PARTICLES: "HAWKEYE",
  EQUIP_HAWKEYE_TRICK_ARROW_SMOKE_BOMB: "HAWKEYE",
  EQUIP_HAWKEYE_TRICK_ARROW_WIRE: "HAWKEYE",
  EQUIP_HULKBUSTER_IRON_MAN_DEFLECTOR_SHIELDS: "HULKBUSTER_IRON_MAN",
  EQUIP_HULKBUSTER_IRON_MAN_OMNIBEAM: "HULKBUSTER_IRON_MAN",
  EQUIP_HULKLING_EXCELSIOR: "HULKLING",
  EQUIP_HULKLING_NEGA_WEDDING_RING: "HULKLING",
  EQUIP_IRON_LAD_NEUROKINETIK_ARMOR: "IRON_LAD",
  EQUIP_IRON_MAN_CIVIL_WAR_DEFLECTOR_SHIELDS: "IRON_MAN",
  EQUIP_IRON_MAN_CIVIL_WAR_OMNIBEAM: "IRON_MAN",
  EQUIP_IRON_MAN_CIVIL_WAR_STEALTH_FIELD_GENERATOR: "IRON_MAN",
  EQUIP_IRON_MAN_DEFLECTOR_SHIELDS: "IRON_MAN",
  EQUIP_IRON_MAN_OMNIBEAM: "IRON_MAN",
  EQUIP_IRON_MAN_STEALTH_FIELD_GENERATOR: "IRON_MAN",
  EQUIP_IRON_SPIDER_WALDOES: "IRON_SPIDER",
  EQUIP_IRON_SPIDER_WEB_SHOOTERS: "IRON_SPIDER",
  EQUIP_KATE_BISHOP_TRICK_ARROW_EXPLOSIVE: "KATE_BISHOP",
  EQUIP_KATE_BISHOP_TRICK_ARROW_PYM_PARTICLES: "KATE_BISHOP",
  EQUIP_KATE_BISHOP_TRICK_ARROW_SMOKE_BOMB: "KATE_BISHOP",
  EQUIP_KATE_BISHOP_TRICK_ARROW_WIRE: "KATE_BISHOP",
  EQUIP_LOKI_SCEPTER: "LOKI_HERO",
  EQUIP_MAGIK_SOULSWORD: "MAGIK",
  EQUIP_MAGNETO_AOA_MAGNETOS_HELMET: "MAGNETO",
  EQUIP_MAGNETOS_HELMET: "MAGNETO",
  EQUIP_MIGHTY_THOR_MJOLNIR: "MIGHTY_THOR",
  EQUIP_MILES_MORALES_WEB_SHOOTERS: "MILES_MORALES",
  EQUIP_MOCKINGBIRD_BATTLE_STAVES: "MOCKINGBIRD",
  EQUIP_MOON_KNIGHT_CRESCENT_DARTS: "MOON_KNIGHT",
  EQUIP_MOON_KNIGHTS_SUIT: "MOON_KNIGHT",
  EQUIP_NAMOR_TRIDENT: "NAMOR",
  EQUIP_NICK_FURY_BATTLE_SUIT: "NICK_FURY",
  EQUIP_OKOYE_VIBRANIUM_SPEAR: "OKOYE",
  EQUIP_PATRIOTS_SHIELD: "PATRIOT",
  EQUIP_PENI_PARKER_BATTERIES: "PENI_PARKER",
  EQUIP_RONINS_BLADE: "RONIN",
  EQUIP_SCARLET_SPIDER_WEB_SHOOTERS: "SCARLET_SPIDER",
  EQUIP_SCARLET_WITCH_DARKHOLD: "SCARLET_WITCH",
  EQUIP_SHANG_CHI_NUNCHAKU: "SHANG_CHI",
  EQUIP_SPIDER_HAM_WEB_SHOOTERS: "SPIDER_HAM",
  EQUIP_SPIDER_MAN_WEB_SHOOTERS: "SPIDER_MAN",
  EQUIP_SPIDER_PUNK_WEB_SHOOTERS: "SPIDER_PUNK",
  EQUIP_STARLORD_SPACE_HELMET: "STAR_LORD",
  EQUIP_STARLORD_TRANSLATOR_IMPLANT: "STAR_LORD",
  EQUIP_STATURES_SUIT: "STATURE",
  EQUIP_SUPERIOR_SPIDER_MAN_MECHANICAL_SPIDER_ARMS: "SUPERIOR_SPIDER_MAN",
  EQUIP_SUPERIOR_SPIDER_MAN_WEB_SHOOTERS: "SUPERIOR_SPIDER_MAN",
  EQUIP_THOR_MJOLNIR: "THOR",
  EQUIP_US_AGENTS_SHIELD: "US_AGENT",
  EQUIP_VISION_SOLAR_GEM: "VISION",
  EQUIP_WAR_MACHINE_DEFLECTOR_SHIELDS: "WAR_MACHINE",
  EQUIP_WAR_MACHINE_OMNIBEAM: "WAR_MACHINE",
  EQUIP_WAR_MACHINE_STEALTH_FIELD_GENERATOR: "WAR_MACHINE",
  EQUIP_WASPS_STING: "WASP",
  EQUIP_WASPS_SUIT: "WASP",
  EQUIP_WHITE_WIDOW_BATTLE_BATONS: "WHITE_WIDOW",
  EQUIP_WHITE_WIDOW_WIDOWS_BITE: "WHITE_WIDOW",
  EQUIP_WICCAN_NEGA_WEDDING_RING: "WICCAN",
  EQUIP_YELLOWJACKET_DISRUPTOR_STINGS: "YELLOWJACKET",
};

export const heroEquipmentLookup: {
  [key in HeroKey | "GENERIC"]?: Array<EquipKey>;
} = {
  ANT_MAN: ["EQUIP_ANT_MAN_WRIST_GAUNTLETS", "EQUIP_ANT_MANS_SUIT"],
  BETA_RAY_BILL: ["EQUIP_BETA_RAY_BILL_STORMBREAKER"],
  BLACK_KNIGHT: ["EQUIP_BLACK_KNIGHT_EBONY_BLADE"],
  BLACK_PANTHER: [
    "EQUIP_BLACK_PANTHER_HARD_LIGHT_SHIELD",
    "EQUIP_BLACK_PANTHER_SHURI_HARD_LIGHT_SHIELD",
    "EQUIP_BLACK_PANTHER_SHURI_SPEAR_OF_BASHENGA",
    "EQUIP_BLACK_PANTHER_SPEAR_OF_BASHENGA",
  ],
  BLACK_WIDOW: [
    "EQUIP_BLACK_WIDOW_BATTLE_BATONS",
    "EQUIP_BLACK_WIDOW_WIDOWS_BITE",
  ],
  BLADE: ["EQUIP_BLADES_SWORD"],
  CAPTAIN_AMERICA: [
    "EQUIP_CAPTAIN_AMERICA_CLASSIC_CAPTAIN_AMERICAS_SHIELD",
    "EQUIP_CAPTAIN_AMERICA_SAM_WILSON_CAPTAIN_AMERICAS_SHIELD",
    "EQUIP_CAPTAIN_AMERICAS_SHIELD",
  ],
  CAPTAIN_BRITAIN: ["EQUIP_CAPTAIN_BRITAIN_BETSY_BRADDOCK_STARLIGHT_SWORD"],
  CAPTAIN_CARTER: ["EQUIP_CAPTAIN_CARTERS_SHIELD"],
  COSMIC_GHOST_RIDER: [
    "EQUIP_COSMIC_GHOST_RIDER_HELL_CYCLE",
    "EQUIP_COSMIC_GHOST_RIDER_HELLFIRE_CHAIN",
  ],
  CYBORG: ["EQUIP_CYBORG_SPIDER_MAN_SONIC_CANNON"],
  CYCLOPS: ["EQUIP_CYCLOPS_FIRST_CLASS_CYCLOPS_VISOR", "EQUIP_CYCLOPS_VISOR"],
  DAREDEVIL: ["EQUIP_DAREDEVIL_BILLY_CLUB"],
  DARKCHILD: ["EQUIP_DARKCHILD_SOULSWORD"],
  ELEKTRA: ["EQUIP_ELEKTRA_SAI"],
  ELSA_BLOODSTONE: ["EQUIP_ELSA_BLOODSTONE_MORDREDS_CAUSEWAY"],
  GAMBIT: ["EQUIP_GAMBIT_DECK_OF_CARDS"],
  GAMORA: ["EQUIP_GAMORA_GODSLAYER"],
  GENERIC: [
    "EQUIP_GENERIC_AIRLIFT",
    "EQUIP_GENERIC_BODY_ARMOR",
    "EQUIP_GENERIC_COMMUNICATION_DEVICE",
    "EQUIP_GENERIC_MAKESHIFT_WEAPON",
  ],
  GHOST_RIDER: [
    "EQUIP_GHOST_RIDER_HELL_CHARGER",
    "EQUIP_GHOST_RIDER_HELLFIRE_CHAIN",
    "EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELL_CYCLE",
    "EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELLFIRE_CHAIN",
  ],
  GHOST_SPIDER: ["EQUIP_GHOST_SPIDER_WEB_SHOOTERS"],
  HAWKEYE: [
    "EQUIP_HAWKEYE_TRICK_ARROW_EXPLOSIVE",
    "EQUIP_HAWKEYE_TRICK_ARROW_PYM_PARTICLES",
    "EQUIP_HAWKEYE_TRICK_ARROW_SMOKE_BOMB",
    "EQUIP_HAWKEYE_TRICK_ARROW_WIRE",
  ],
  HULKBUSTER_IRON_MAN: [
    "EQUIP_HULKBUSTER_IRON_MAN_DEFLECTOR_SHIELDS",
    "EQUIP_HULKBUSTER_IRON_MAN_OMNIBEAM",
  ],
  HULKLING: ["EQUIP_HULKLING_EXCELSIOR", "EQUIP_HULKLING_NEGA_WEDDING_RING"],
  IRON_LAD: ["EQUIP_IRON_LAD_NEUROKINETIK_ARMOR"],
  IRON_MAN: [
    "EQUIP_IRON_MAN_CIVIL_WAR_DEFLECTOR_SHIELDS",
    "EQUIP_IRON_MAN_CIVIL_WAR_OMNIBEAM",
    "EQUIP_IRON_MAN_CIVIL_WAR_STEALTH_FIELD_GENERATOR",
    "EQUIP_IRON_MAN_DEFLECTOR_SHIELDS",
    "EQUIP_IRON_MAN_OMNIBEAM",
    "EQUIP_IRON_MAN_STEALTH_FIELD_GENERATOR",
  ],
  IRON_SPIDER: ["EQUIP_IRON_SPIDER_WALDOES", "EQUIP_IRON_SPIDER_WEB_SHOOTERS"],
  KATE_BISHOP: [
    "EQUIP_KATE_BISHOP_TRICK_ARROW_EXPLOSIVE",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_PYM_PARTICLES",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_SMOKE_BOMB",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_WIRE",
  ],
  LOKI_HERO: ["EQUIP_LOKI_SCEPTER"],
  MAGIK: ["EQUIP_MAGIK_SOULSWORD"],
  MAGNETO: ["EQUIP_MAGNETO_AOA_MAGNETOS_HELMET", "EQUIP_MAGNETOS_HELMET"],
  MIGHTY_THOR: ["EQUIP_MIGHTY_THOR_MJOLNIR"],
  MILES_MORALES: ["EQUIP_MILES_MORALES_WEB_SHOOTERS"],
  MOCKINGBIRD: ["EQUIP_MOCKINGBIRD_BATTLE_STAVES"],
  MOON_KNIGHT: ["EQUIP_MOON_KNIGHT_CRESCENT_DARTS", "EQUIP_MOON_KNIGHTS_SUIT"],
  NAMOR: ["EQUIP_NAMOR_TRIDENT"],
  NICK_FURY: ["EQUIP_NICK_FURY_BATTLE_SUIT"],
  OKOYE: ["EQUIP_OKOYE_VIBRANIUM_SPEAR"],
  PATRIOT: ["EQUIP_PATRIOTS_SHIELD"],
  PENI_PARKER: ["EQUIP_PENI_PARKER_BATTERIES"],
  RONIN: ["EQUIP_RONINS_BLADE"],
  SCARLET_SPIDER: ["EQUIP_SCARLET_SPIDER_WEB_SHOOTERS"],
  SCARLET_WITCH: ["EQUIP_SCARLET_WITCH_DARKHOLD"],
  SHANG_CHI: ["EQUIP_SHANG_CHI_NUNCHAKU"],
  SPIDER_HAM: ["EQUIP_SPIDER_HAM_WEB_SHOOTERS"],
  SPIDER_MAN: ["EQUIP_SPIDER_MAN_WEB_SHOOTERS"],
  SPIDER_PUNK: ["EQUIP_SPIDER_PUNK_WEB_SHOOTERS"],
  STAR_LORD: [
    "EQUIP_STARLORD_SPACE_HELMET",
    "EQUIP_STARLORD_TRANSLATOR_IMPLANT",
  ],
  STATURE: ["EQUIP_STATURES_SUIT"],
  SUPERIOR_SPIDER_MAN: [
    "EQUIP_SUPERIOR_SPIDER_MAN_MECHANICAL_SPIDER_ARMS",
    "EQUIP_SUPERIOR_SPIDER_MAN_WEB_SHOOTERS",
  ],
  THOR: ["EQUIP_THOR_MJOLNIR"],
  US_AGENT: ["EQUIP_US_AGENTS_SHIELD"],
  VISION: ["EQUIP_VISION_SOLAR_GEM"],
  WAR_MACHINE: [
    "EQUIP_WAR_MACHINE_DEFLECTOR_SHIELDS",
    "EQUIP_WAR_MACHINE_OMNIBEAM",
    "EQUIP_WAR_MACHINE_STEALTH_FIELD_GENERATOR",
  ],
  WASP: ["EQUIP_WASPS_STING", "EQUIP_WASPS_SUIT"],
  WHITE_WIDOW: [
    "EQUIP_WHITE_WIDOW_BATTLE_BATONS",
    "EQUIP_WHITE_WIDOW_WIDOWS_BITE",
  ],
  WICCAN: ["EQUIP_WICCAN_NEGA_WEDDING_RING"],
  YELLOWJACKET: ["EQUIP_YELLOWJACKET_DISRUPTOR_STINGS"],
};
