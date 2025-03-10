import { HeroKey } from "../types/heroes";

export const OR_PATHS = [
  "CASTLE_PATH_1",
  "FLAME_PATH_20",
  "FLAME_PATH_21",
  "MIDNIGHT_PATH_14",
  "MIDNIGHT_PATH_25",
  "MIDNIGHT_PATH_34",
];

export const pathRewards: {
  [key: string]: Array<string>;
} = {
  JOURNEY_GROUP_1: [
    "IRONHEART",
    "BLACK_PANTHER_SHURI",
    "CAPTAIN_CARTER",
    "MIGHTY_THOR",
    "PORTAL",
    "PORTAL",
  ],
  JOURNEY_PATH_13: ["EQUIP_CAPTAIN_CARTERS_SHIELD"],
  JOURNEY_PATH_12: ["EQUIP_MIGHTY_THOR_MJOLNIR"],
  JOURNEY_PATH_5: ["LOKI_HERO"],
  JOURNEY_PATH_6: ["KEY", "HOURGLASS", "BRAIN", "PLANET"],
  JOURNEY_PATH_3: ["STAR"],
  JOURNEY_PATH_2: ["SPIDER_MAN_2099_ORIGINAL_SUIT", "PORTAL"],
  JOURNEY_PATH_10: ["TEAM_A_FORCE"],
  JOURNEY_PATH_18: ["PORTAL"],
  JOURNEY_PATH_19: ["RECOVER"],
  JOURNEY_PATH_17: ["STAR", "GEAR", "BRAIN", "MAGIC", "KEY"],
  JOURNEY_PATH_7: ["PLANET", "COSMIC_GHOST_RIDER", "MAGIC", "GEAR", "PORTAL"],
  JOURNEY_PATH_4: [
    "EQUIP_COSMIC_GHOST_RIDER_HELL_CYCLE",
    "EQUIP_COSMIC_GHOST_RIDER_HELLFIRE_CHAIN",
  ],
  JOURNEY_PATH_11: [
    "EQUIP_IRON_MAN_DEFLECTOR_SHIELDS",
    "EQUIP_IRON_MAN_STEALTH_FIELD_GENERATOR",
    "EQUIP_IRON_MAN_OMNIBEAM",
  ],
  JOURNEY_GROUP_2: ["PORTAL", "KEY", "HOURGLASS", "PLANET", "GEAR"],
  JOURNEY_PATH_15: ["PET_JEFF"],
  JOURNEY_PATH_14: ["TEAM_UNITED_HEROES"],
  JOURNEY_PATH_16: ["PORTAL"],
  JOURNEY_GROUP_4: ["PORTAL"],
  JOURNEY_GROUP_3: [
    "EQUIP_BLACK_PANTHER_SPEAR_OF_BASHENGA",
    "EQUIP_BLACK_PANTHER_SHURI_SPEAR_OF_BASHENGA",
    "GEAR",
    "PORTAL",
  ],
  JOURNEY_PATH_8: ["BRAIN", "GEAR", "GEAR"],
  JOURNEY_PATH_9: [
    "EQUIP_BLACK_PANTHER_HARD_LIGHT_SHIELD",
    "EQUIP_BLACK_PANTHER_SHURI_HARD_LIGHT_SHIELD",
    "TEAM_WAKANDANS",
  ],
  WAR_GROUP_1: ["GOLIATH", "PORTAL"],
  WAR_PATH_23: ["SPECTRUM"],
  WAR_PATH_19: ["HOURGLASS", "KEY"],
  WAR_PATH_20: ["MAGIC", "KEY", "PUZZLE", "BRAIN", "EYE", "CHOICE"],
  WAR_PATH_3: [
    "CAPTAIN_AMERICA_CLASSIC",
    "TEAM_CAPTAIN_AMERICA_SECRET_AVENGERS",
    "IRON_LAD",
    "EQUIP_IRON_LAD_NEUROKINETIK_ARMOR",
    "KATE_BISHOP",
    "EQUIP_HAWKEYE_TRICK_ARROW_EXPLOSIVE",
    "EQUIP_HAWKEYE_TRICK_ARROW_PYM_PARTICLES",
    "EQUIP_HAWKEYE_TRICK_ARROW_SMOKE_BOMB",
    "EQUIP_HAWKEYE_TRICK_ARROW_WIRE",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_EXPLOSIVE",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_PYM_PARTICLES",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_SMOKE_BOMB",
    "EQUIP_KATE_BISHOP_TRICK_ARROW_WIRE",
  ],
  WAR_PATH_28: ["STATURE"],
  WAR_PATH_26: ["EQUIP_STATURES_SUIT"],
  WAR_PATH_27: ["TEAM_YOUNG_AVENGERS"],
  WAR_PATH_29: ["PATRIOT"],
  WAR_PATH_30: ["EQUIP_PATRIOTS_SHIELD"],
  WAR_PATH_24: [
    "WICCAN",
    "HULKLING",
    "EQUIP_WICCAN_NEGA_WEDDING_RING",
    "EQUIP_HULKLING_NEGA_WEDDING_RING",
  ],
  WAR_PATH_25: ["SPEED"],
  WAR_PATH_15: ["TEAM_WEST_COAST_AVENGERS", "WONDER_MAN"],
  WAR_PATH_16: ["SENTRY"],
  WAR_PATH_13: ["EQUIP_WASPS_STING", "EQUIP_WASPS_SUIT"],
  WAR_PATH_14: ["SONGBIRD"],
  WAR_PATH_4: [
    "IRON_MAN_CIVIL_WAR",
    "IRON_SPIDER",
    "TEAM_IRON_MAN_PROREGISTRATION",
  ],
  WAR_PATH_10: ["YELLOWJACKET", "EQUIP_YELLOWJACKET_DISRUPTOR_STINGS"],
  WAR_PATH_11: ["EQUIP_ANT_MANS_SUIT", "EQUIP_ANT_MAN_WRIST_GAUNTLETS"],
  WAR_PATH_12: ["PORTAL"],
  WAR_PATH_9: ["DEADPOOL_2"],
  WAR_PATH_8: ["TIGRA"],
  WAR_PATH_2: ["EQUIP_IRON_SPIDER_WEB_SHOOTERS"],
  WAR_PATH_1: ["EQUIP_IRON_SPIDER_WALDOES"],
  WAR_PATH_6: ["STAR"],
  WAR_PATH_7: ["STAR"],
  WAR_PATH_5: ["CHOICE"],
  MIDNIGHT_PATH_2: ["PORTAL"],
  MIDNIGHT_PATH_5: ["TEAM_MIDNIGHT_SONS"],
  MIDNIGHT_PATH_4: ["EYE"],
  MIDNIGHT_PATH_1: ["ELSA_BLOODSTONE"],
  MIDNIGHT_PATH_6: ["RECOVER", "MORBIUS"],
  MIDNIGHT_PATH_8: ["KEY", "BRAIN", "GEAR"],
  MIDNIGHT_PATH_11: ["BLACK_KNIGHT"],
  MIDNIGHT_PATH_12: ["TEAM_SAVAGE_AVENGERS"],
  MIDNIGHT_PATH_13: ["EQUIP_BLACK_KNIGHT_EBONY_BLADE"],
  MIDNIGHT_PATH_14: ["KEY", "HOURGLASS"],
  MIDNIGHT_PATH_33: ["WONG", "MAGIC"],
  MIDNIGHT_PATH_38: ["RECOVER"],
  MIDNIGHT_PATH_35: ["PORTAL"],
  MIDNIGHT_PATH_32: ["MAN_THING", "STAR"],
  MIDNIGHT_PATH_34: ["MAGIC", "HOURGLASS"],
  MIDNIGHT_PATH_15: ["KEY", "MAGIC", "EQUIP_ELSA_BLOODSTONE_MORDREDS_CAUSEWAY"],
  MIDNIGHT_PATH_18: ["PUZZLE"],
  MIDNIGHT_PATH_17: ["WEREWOLF_BY_NIGHT"],
  MIDNIGHT_PATH_23: ["EQUIP_BLADES_SWORD"],
  MIDNIGHT_PATH_24: ["EQUIP_DARKCHILD_SOULSWORD"],
  MIDNIGHT_PATH_25: ["MAGIC", "HOURGLASS"],
  MIDNIGHT_PATH_20: ["KEY", "MAGIC", "MAGIC", "DARKCHILD"],
  MIDNIGHT_PATH_22: ["MOVE"],
  MIDNIGHT_PATH_21: ["MOVE"],
  MIDNIGHT_PATH_29: ["GHOST_RIDER_JOHNNY_BLAZE"],
  MIDNIGHT_GROUP_1: ["STAR", "PORTAL"],
  MIDNIGHT_PATH_27: ["RECOVER", "KEY", "HOURGLASS"],
  MIDNIGHT_PATH_30: [
    "EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELL_CYCLE",
    "EQUIP_GHOST_RIDER_JOHNNY_BLAZE_HELLFIRE_CHAIN",
  ],
  MIDNIGHT_PATH_37: ["KEY", "BRAIN"],
  MIDNIGHT_PATH_36: ["MAGIC", "HOURGLASS"],
  FOOL_PATH_33: ["DEADPOOL_X_FORCE", "PLANET"],
  FOOL_PATH_11: ["BRAIN"],
  FOOL_PATH_1: ["DNA"],
  FOOL_PATH_2: ["MAGIC", "BRAIN"],
  FOOL_PATH_29: ["KEY"],
  FOOL_PATH_3: ["GEAR"],
  FOOL_PATH_6: ["BRAIN"],
  FOOL_PATH_4: ["KEY"],
  FOOL_PATH_10: ["CHIMI"],
  FOOL_PATH_7: ["GEAR"],
  FOOL_PATH_12: ["KEY"],
  FOOL_PATH_15: ["GEAR"],
  FOOL_PATH_14: ["STAR"],
  FOOL_PATH_32: ["PUZZLE"],
  FOOL_PATH_22: ["KEY"],
  FOOL_PATH_21: ["GEAR"],
  FOOL_PATH_36: ["TEAM_DEADPOOL_TEAMUP"],
  FOOL_PATH_17: ["BRAIN"],
  FOOL_PATH_28: ["PLANET", "GEAR"],
  FOOL_PATH_27: ["KEY"],
  FOOL_PATH_26: ["KEY"],
  FOOL_PATH_25: ["STAR"],
  FOOL_PATH_13: ["HOURGLASS"],
  FOOL_PATH_20: ["GEAR"],
  FOOL_PATH_35: ["EQUIP_GENERIC_BODY_ARMOR"],
  FOOL_PATH_34: ["EQUIP_GENERIC_COMMUNICATION_DEVICE"],
  FOOL_PATH_37: ["EQUIP_GENERIC_MAKESHIFT_WEAPON"],
  FEAR_GROUP_1: ["EYE", "PORTAL", "GEAR", "KEY", "KEY"],
  FEAR_PATH_20: ["SILK"],
  FEAR_GROUP_4: ["PORTAL", "KEY", "GEAR"],
  FEAR_PATH_7: ["TEAM_MARVEL_KNIGHTS", "KEY"],
  FEAR_PATH_8: ["BRAIN"],
  FEAR_PATH_9: ["BRAIN"],
  FEAR_PATH_14: ["STAR"],
  FEAR_GROUP_3: [
    "KEY",
    "MAGIC",
    "CYBORG_SPIDER_MAN",
    "EQUIP_CYBORG_SPIDER_MAN_SONIC_CANNON",
  ],
  FEAR_PATH_1: ["TEAM_SPIDER_ARMY"],
  FEAR_PATH_13: ["SCARLET_SPIDER", "SUPERIOR_SPIDER_MAN"],
  FEAR_PATH_2: ["EQUIP_SPIDER_MAN_WEB_SHOOTERS"],
  FEAR_PATH_3: [
    "EQUIP_SUPERIOR_SPIDER_MAN_WEB_SHOOTERS",
    "EQUIP_SUPERIOR_SPIDER_MAN_MECHANICAL_SPIDER_ARMS",
  ],
  FEAR_GROUP_2: ["GEAR", "BRAIN"],
  FEAR_PATH_10: ["KEY"],
  FEAR_PATH_15: ["SPIDER_MAN_NOIR"],
  FEAR_PATH_4: ["KEY", "BRAIN", "EQUIP_SCARLET_SPIDER_WEB_SHOOTERS"],
  FEAR_PATH_17: ["STAR", "BRAIN"],
  FEAR_PATH_5: ["EQUIP_PENI_PARKER_BATTERIES", "KEY"],
  FEAR_PATH_16: ["PENI_PARKER"],
  FEAR_PATH_19: ["SPIDER_PUNK"],
  FEAR_PATH_6: ["EQUIP_SPIDER_PUNK_WEB_SHOOTERS"],
  FEAR_PATH_18: ["GEAR"],
  GALAXY_PATH_3: ["PLANET", "EQUIP_STARLORD_SPACE_HELMET"],
  GALAXY_PATH_4: ["GEAR", "EQUIP_GAMORA_GODSLAYER"],
  GALAXY_PATH_21: ["PET_COSMO"],
  GALAXY_PATH_5: ["EQUIP_VISION_SOLAR_GEM", "BRAIN"],
  GALAXY_PATH_6: ["EQUIP_NAMOR_TRIDENT", "PUZZLE"],
  GALAXY_PATH_13: ["GEAR", "MAGIC", "PLANET"],
  GALAXY_PATH_20: ["QUASAR"],
  GALAXY_PATH_16: ["PHYLA_VELL", "MOONDRAGON"],
  GALAXY_PATH_2: ["TEAM_NEW_AVENGERS"],
  GALAXY_PATH_1: ["PORTAL"],
  GALAXY_PATH_14: ["KEY", "KEY", "BRAIN"],
  GALAXY_PATH_10: ["RONIN"],
  GALAXY_PATH_17: ["PET_GOOSE"],
  GALAXY_PATH_11: ["PLANET"],
  GALAXY_PATH_12: ["RECOVER"],
  GALAXY_PATH_18: ["PLANET"],
  GALAXY_PATH_19: ["NOVA_PRIME"],
  GALAXY_PATH_9: ["MAGIC", "GEAR", "KEY", "EYE"],
  GALAXY_PATH_8: ["STAR", "PORTAL"],
  GALAXY_PATH_15: ["MAGIC", "KEY", "BRAIN"],
  GALAXY_PATH_7: ["MAGIC", "RECOVER", "EQUIP_HULKLING_EXCELSIOR"],
  MIST_PATH_3: ["MOON_GIRL_DEVIL_DINOSAUR", "BRAIN", "BOLT"],
  MIST_PATH_13: ["HOURGLASS", "GEAR"],
  MIST_PATH_4: ["BOLT"],
  MIST_PATH_21: ["BOLT", "BOLT"],
  MIST_PATH_22: ["BOLT", "GEAR"],
  MIST_PATH_23: ["BOLT", "BOLT"],
  MIST_PATH_24: ["BOLT", "BOLT"],
  MIST_PATH_1: ["PLANET"],
  MIST_PATH_5: ["EQUIP_GENERIC_AIRLIFT"],
  MIST_PATH_19: ["PLANET"],
  MIST_PATH_20: ["STAR"],
  MIST_PATH_26: ["PLANET", "BRAIN"],
  MIST_GROUP_1: ["KEY", "KEY", "PUZZLE", "PORTAL"],
  MIST_PATH_7: ["TEAM_INFINITY_WATCH"],
  MIST_PATH_12: ["KEY", "PLANET", "BRAIN"],
  MIST_PATH_28: ["TRITON"],
  MIST_PATH_8: ["LOCKJAW", "STAR"],
  MIST_PATH_33: ["PORTAL"],
  MIST_PATH_10: ["GORGON"],
  MIST_PATH_18: ["PLANET"],
  MIST_PATH_11: ["BLACK_BOLT"],
  MIST_PATH_2: ["PLANET", "GEAR", "KEY", "BRAIN"],
  MIST_PATH_29: ["KARNAK"],
  MIST_PATH_32: ["CRYSTAL"],
  MIST_PATH_30: ["KEY", "PORTAL"],
  MIST_PATH_31: ["MEDUSA", "TEAM_INHUMANS"],
  MIST_PATH_6: ["EYE"],
  AVX_PATH_245: ["WILD", "WILD"],
  AVX_PATH_243: ["ADAM_WARLOCK"],
  AVX_PATH_2: ["MOVE"],
  AVX_PATH_242: ["NOVA"],
  AVX_PATH_235: ["BRAIN", "KEY"],
  AVX_PATH_231: ["GEAR", "KEY"],
  AVX_PATH_229: ["KEY", "HEROIC"],
  AVX_PATH_233: ["KEY", "FIGHT"],
  AVX_GROUP_7: [
    "STAR",
    "MAGIC",
    "BRAIN",
    "KEY",
    "KEY",
    "KEY",
    "KEY",
    "GEAR",
    "HOURGLASS",
    "RECOVER",
    "PORTAL",
    "PORTAL",
  ],
  AVX_PATH_196: ["FIGHT"],
  AVX_PATH_190: ["NEBULA"],
  AVX_PATH_180: ["CAPTAIN_MARVEL", "GEAR"],
  AVX_PATH_276: ["MKRAAN_CRYSTAL", "PUNISHER", "KEY", "KEY"],
  AVX_PATH_277: ["BRAIN", "BLADE"],
  AVX_PATH_278: ["GHOST_RIDER"],
  AVX_PATH_279: ["MOON_KNIGHT"],
  AVX_PATH_280: ["KEY", "FIGHT"],
  AVX_PATH_274: ["MOVE", "FIGHT", "KEY"],
  AVX_PATH_261: ["RECOVER"],
  AVX_PATH_258: ["BRAIN", "GEAR", "KEY"],
  AVX_PATH_263: ["GEAR"],
  AVX_PATH_265: ["KEY"],
  AVX_PATH_282: ["KEY", "NICK_FURY"],
  AVX_PATH_264: ["WINTER_SOLDIER"],
  AVX_PATH_247: ["BRAIN", "KEY"],
  AVX_PATH_267: ["DAREDEVIL"],
  AVX_PATH_269: ["LUKE_CAGE"],
  AVX_PATH_272: ["JESSICA_JONES"],
  AVX_PATH_271: ["AMERICA_CHAVEZ"],
  AVX_PATH_270: ["IRON_FIST"],
  AVX_PATH_281: ["KEY"],
  AVX_PATH_268: ["KEY"],
  AVX_PATH_249: ["SPIDER_MAN_2099"],
  AVX_PATH_250: ["WILD", "KEY"],
  AVX_PATH_30: ["KEY", "PORTAL"],
  AVX_PATH_257: ["FIGHT"],
  AVX_PATH_10: ["MKRAAN_CRYSTAL", "GEAR", "KEY", "MAGIC"],
  AVX_PATH_252: ["VENOM_HERO"],
  AVX_PATH_256: ["BLACK_CAT"],
  AVX_PATH_254: ["FIGHT", "KEY"],
  AVX_PATH_255: ["GEAR"],
  AVX_PATH_4: ["GEAR", "KEY", "BRAIN", "SQUIRREL_GIRL"],
  AVX_PATH_5: ["MS_MARVEL"],
  AVX_PATH_8: ["BRAIN", "HEROIC"],
  AVX_PATH_9: ["BRAIN", "GEAR"],
  AVX_PATH_225: ["SPIDER_HAM"],
  AVX_PATH_224: ["GHOST_SPIDER"],
  AVX_PATH_6: ["KEY"],
  AVX_PATH_7: ["KEY"],
  AVX_PATH_226: ["MILES_MORALES"],
  AVX_PATH_211: ["SNOWBIRD"],
  AVX_PATH_212: ["NORTHSTAR"],
  AVX_PATH_210: ["SASQUATCH"],
  AVX_PATH_209: ["PUCK"],
  AVX_PATH_208: ["KEY"],
  AVX_PATH_143: ["LADY_DEADPOOL"],
  AVX_PATH_142: ["GWENPOOL"],
  AVX_PATH_141: ["DEADPOOL", "MAPLE"],
  AVX_PATH_140: ["BOB_AGENT_OF_HYDRA"],
  AVX_PATH_145: ["KEY"],
  AVX_GROUP_6: ["MOVE", "PORTAL", "KEY", "MKRAAN_CRYSTAL"],
  AVX_GROUP_5: ["PORTAL"],
  AVX_PATH_80: ["WEAPON_X"],
  AVX_PATH_25: [
    "BEAST_FIRST_CLASS",
    "ICEMAN_FIRST_CLASS",
    "MARVEL_GIRL_FIRST_CLASS",
    "CYCLOPS_FIRST_CLASS",
    "ANGEL_FIRST_CLASS",
    "DANGER_ROOM",
  ],
  AVX_PATH_152: ["X_23"],
  AVX_PATH_154: ["KEY", "CHIMI"],
  AVX_PATH_153: ["FANTOMEX"],
  AVX_PATH_147: ["STORM_MOHAWK"],
  AVX_PATH_146: ["KEY", "GEAR"],
  AVX_PATH_148: ["MARROW"],
  AVX_PATH_149: ["FERAL"],
  AVX_PATH_150: ["KEY"],
  AVX_PATH_220: ["DOOP", "KEY"],
  AVX_PATH_219: ["WILD", "KEY", "GEAR", "OLD_MAN_LOGAN"],
  AVX_PATH_218: [
    "PHOENIX",
    "STAR",
    "KEY",
    "KEY",
    "MAGIC",
    "BRAIN",
    "BRAIN",
    "PORTAL",
  ],
  AVX_PATH_215: ["HEROIC"],
  AVX_PATH_214: ["SILVER_SURFER"],
  AVX_PATH_216: ["BRAIN", "BRAIN"],
  AVX_PATH_213: ["BLINK"],
  AVX_PATH_78: ["GEAR", "KEY"],
  AVX_PATH_14: ["KEY", "GEAR"],
  AVX_PATH_222: ["NAMOR"],
  AVX_PATH_28: ["PORTAL", "DOCTOR_DOOM", "HOURGLASS"],
  AVX_PATH_221: ["GEAR", "BRAIN"],
  AVX_PATH_72: ["BISHOP", "HOURGLASS"],
  AVX_GROUP_1: [
    "PORTAL",
    "PORTAL",
    "MKRAAN_CRYSTAL",
    "GEAR",
    "GEAR",
    "KEY",
    "DANGER_ROOM",
  ],
  AVX_PATH_76: ["BRAIN", "KEY"],
  AVX_PATH_74: ["GEAR", "KEY"],
  AVX_PATH_62: ["MAGIC", "KEY", "MYSTIQUE"],
  AVX_PATH_83: ["HEROIC"],
  AVX_PATH_84: ["KEY"],
  AVX_PATH_60: ["KEY", "BRAIN"],
  AVX_PATH_85: ["POLARIS"],
  AVX_PATH_86: ["MOVE"],
  AVX_PATH_57: ["QUICKSILVER_2", "SCARLET_WITCH_2", "MAGIC", "KEY"],
  AVX_PATH_55: ["MOVE", "KEY"],
  AVX_PATH_54: ["KEY"],
  AVX_PATH_56: ["KEY", "HEROIC"],
  AVX_PATH_82: ["CLOAK", "DAGGER"],
  AVX_PATH_65: ["MAGNETO"],
  AVX_PATH_53: ["HAVOK"],
  AVX_PATH_51: ["BANSHEE"],
  AVX_PATH_52: ["GEAR", "SHATTERSTAR"],
  AVX_PATH_49: ["MKRAAN_CRYSTAL", "KEY", "BRAIN"],
  AVX_PATH_40: ["SUNFIRE", "GEAR", "KEY"],
  AVX_PATH_41: ["BRAIN", "KEY"],
  AVX_PATH_42: ["CABLE"],
  AVX_PATH_43: ["HOURGLASS"],
  AVX_PATH_87: ["WILD", "DOMINO"],
  AVX_PATH_288: ["ARCHANGEL"],
  AVX_PATH_45: ["APOCALYPSE", "HOURGLASS", "GEAR"],
  AVX_PATH_47: ["BRAIN", "KEY"],
  AVX_PATH_46: ["KEY", "HOURGLASS", "STAR"],
  AVX_PATH_88: ["CANNONBALL"],
  AVX_PATH_90: ["EMMA_FROST"],
  AVX_PATH_89: ["SUNSPOT"],
  AVX_PATH_94: ["KEY", "KEY"],
  AVX_PATH_95: ["KEY"],
  AVX_PATH_96: ["MIRAGE"],
  AVX_PATH_97: ["WARLOCK"],
  AVX_PATH_98: ["KEY", "BRAIN"],
  AVX_PATH_99: ["MKRAAN_CRYSTAL", "KEY", "BRAIN", "HEROIC"],
  AVX_PATH_114: ["MAGIK"],
  AVX_PATH_112: ["STRONG_GUY"],
  AVX_PATH_113: ["MULTIPLE_MAN"],
  AVX_PATH_115: ["WOLFSBANE"],
  AVX_PATH_128: ["WARPATH"],
  AVX_PATH_129: ["FIRESTAR"],
  AVX_PATH_130: ["KEY", "MOVE"],
  AVX_PATH_110: ["LEGION"],
  AVX_PATH_111: ["KEY", "KEY"],
  AVX_PATH_123: ["CAPTAIN_BRITAIN"],
  AVX_PATH_124: ["BRAIN"],
  AVX_PATH_121: ["PIXIE", "BRAIN", "BRAIN"],
  AVX_PATH_120: ["BOOM_BOOM"],
  AVX_PATH_125: ["KEY", "BRAIN"],
  AVX_PATH_103: ["SPIRAL", "BRAIN"],
  AVX_PATH_101: ["GEAR", "LONGSHOT"],
  AVX_PATH_102: ["PSYLOCKE"],
  AVX_PATH_158: ["KEY"],
  AVX_PATH_159: ["RECOVER"],
  AVX_PATH_253: ["HOURGLASS", "GEAR", "MAGIC", "KEY"],
  AVX_PATH_160: ["KEY"],
  AVX_PATH_137: ["KEY"],
  AVX_PATH_136: ["THOR"],
  AVX_PATH_169: ["PORTAL"],
  AVX_PATH_168: ["VALKYRIE"],
  AVX_PATH_167: ["BETA_RAY_BILL"],
  AVX_PATH_166: ["MAGIC"],
  AVX_PATH_203: ["KEY"],
  AVX_PATH_163: ["MKRAAN_CRYSTAL", "STAR", "KEY", "KEY"],
  AVX_PATH_289: ["KEY"],
  AVX_PATH_106: ["MOVE"],
  AVX_PATH_107: ["MOVE"],
  AVX_PATH_108: ["WILD"],
  AVX_PATH_157: ["INVISIBLE_WOMAN", "MR_FANTASTIC", "HUMAN_TORCH", "THING"],
  AVX_PATH_173: ["GEAR", "MKRAAN_CRYSTAL"],
  AVX_PATH_174: ["MOVE", "FIGHT"],
  AVX_PATH_206: ["KORG"],
  AVX_PATH_207: ["KEY", "MAGIC", "BRAIN"],
  AVX_PATH_205: ["HOURGLASS"],
  AVX_PATH_171: ["KEY", "KEY"],
  AVX_GROUP_2: ["HOURGLASS", "HOURGLASS", "PORTAL", "MKRAAN_CRYSTAL"],
  AVX_PATH_172: ["RECOVER"],
  AVX_PATH_192: ["ANT_MAN", "WASP", "PORTAL"],
  AVX_PATH_193: ["KEY", "GEAR", "FIGHT"],
  AVX_PATH_194: ["BRAIN", "KEY"],
  AVX_PATH_195: ["HOWARD"],
  AVX_PATH_183: ["KEY", "GEAR"],
  AVX_PATH_182: ["KEY", "BRAIN"],
  AVX_PATH_184: ["STAR_LORD"],
  AVX_PATH_186: ["DRAX"],
  AVX_PATH_185: ["GROOT"],
  AVX_PATH_187: ["ROCKET", "GEAR"],
  AVX_PATH_188: ["MANTIS"],
  AVX_PATH_189: ["GAMORA"],
  AVX_PATH_197: ["KEY"],
  AVX_PATH_199: ["PORTAL", "KEY"],
  AVX_PATH_198: ["YONDU"],
  AVX_PATH_286: ["WAR_MACHINE"],
  AVX_PATH_285: ["GEAR", "KEY"],
  AVX_PATH_284: ["FALCON"],
  AVX_GROUP_3: ["PORTAL", "GEAR", "KEY"],
  AVX_PATH_178: ["FIGHT"],
  AVX_PATH_177: ["SPIDER_WOMAN"],
  AVX_PATH_179: ["MOCKINGBIRD"],
  AVX_PATH_201: ["SCARLET_WITCH", "QUICKSILVER"],
  AVX_PATH_200: ["VISION"],
  AVX_GROUP_4: ["BRAIN", "KEY", "PORTAL"],
  AVX_PATH_176: ["HEROIC"],
  AVX_PATH_175: ["BLACK_PANTHER"],
  AVX_PATH_134: ["HAWKEYE"],
  AVX_PATH_135: ["SHANG_CHI", "KEY"],
  AVX_PATH_133: ["SHE_HULK"],
  AVX_PATH_156: ["CAPTAIN_AMERICA", "BLACK_WIDOW", "HULK", "IRON_MAN"],
  AVX_PATH_23: ["KEY", "KEY"],
  AVX_PATH_151: ["STORM"],
  AVX_PATH_24: ["DAZZLER"],
  AVX_PATH_27: ["CYCLOPS", "ICEMAN", "BEAST", "JEAN_GREY"],
  AVX_PATH_19: ["PROFESSOR_X", "KEY"],
  AVX_PATH_18: ["KEY"],
  AVX_PATH_17: ["KEY"],
  AVX_PATH_20: ["HEROIC"],
  AVX_PATH_21: ["WILD"],
  AVX_PATH_22: ["DANGER_ROOM"],
  AVX_PATH_117: ["KITTY_PRYDE"],
  AVX_PATH_116: ["COLOSSUS"],
  AVX_PATH_119: ["NIGHTCRAWLER"],
  AVX_PATH_118: ["KEY"],
  AVX_PATH_38: ["ROGUE"],
  AVX_PATH_37: ["GAMBIT"],
  AVX_PATH_36: ["KEY", "GEAR"],
  AVX_PATH_35: ["KEY", "GEAR"],
  AVX_PATH_34: ["MAGNETO_X1"],
  AVX_PATH_67: ["FIGHT", "DANGER_ROOM"],
  AVX_PATH_68: ["MOVE"],
  AVX_PATH_69: ["KEY", "FIGHT"],
  AVX_PATH_66: ["FORGE"],
  AVX_PATH_26: ["JUBILEE"],
  AVX_PATH_33: ["HOURGLASS"],
  ABYSS_PATH_3: ["HYBRID_DECK"],
  ABYSS_PATH_10: ["EQUIP_GHOST_SPIDER_WEB_SHOOTERS"],
  ABYSS_PATH_11: ["KEY", "KEY"],
  ABYSS_GROUP_1: ["EYE", "PORTAL", "PORTAL", "STAR", "PLANET", "KEY", "KEY"],
  ABYSS_PATH_14: ["PLANET", "KEY"],
  ABYSS_PATH_6: ["AGENT_VENOM"],
  ABYSS_PATH_7: ["STAR"],
  ABYSS_PATH_4: ["ANTI_VENOM", "RECOVER", "GEAR"],
  ABYSS_PATH_5: ["SYMBIOTE_SPIDER_MAN"],
  ABYSS_GROUP_3: ["KEY", "BRAIN", "PORTAL"],
  ABYSS_GROUP_2: ["PORTAL", "RECOVER", "BRAIN"],
  ABYSS_PATH_15: ["BRAIN", "PUZZLE"],
  ABYSS_PATH_16: ["MAGIC", "KEY", "GEAR"],
  ABYSS_PATH_9: ["LASHER", "EQUIP_SPIDER_HAM_WEB_SHOOTERS"],
  ABYSS_PATH_8: ["AGONY", "EQUIP_MILES_MORALES_WEB_SHOOTERS"],
  ABYSS_PATH_1: ["RIOT"],
  ABYSS_PATH_2: ["PHAGE"],
  SHIELD_PATH_8: ["GEAR", "KEY"],
  SHIELD_PATH_7: ["NICK_FURY_SR", "TEAM_AVENGERS"],
  SHIELD_PATH_23: ["STAR"],
  SHIELD_PATH_24: ["PLANET", "PORTAL"],
  SHIELD_PATH_28: ["BOB_AGENT_OF_HYDRA_2", "KEY"],
  SHIELD_PATH_15: ["PORTAL"],
  SHIELD_PATH_14: ["STAR"],
  SHIELD_PATH_29: ["MARIA_HILL"],
  SHIELD_PATH_25: ["GEAR", "GEAR", "GEAR"],
  SHIELD_PATH_10: ["BRAIN", "BRAIN"],
  SHIELD_PATH_27: ["QUAKE"],
  SHIELD_PATH_4: ["TEAM_SHIELD"],
  SHIELD_PATH_5: ["TEAM_FORCE_WORKS"],
  SHIELD_PATH_3: ["EQUIP_NICK_FURY_BATTLE_SUIT"],
  SHIELD_PATH_30: ["CAPTAIN_AMERICA_SAM_WILSON"],
  SHIELD_PATH_6: ["PET_REDWING"],
  SHIELD_PATH_11: ["EQUIP_CAPTAIN_AMERICA_SAM_WILSON_CAPTAIN_AMERICAS_SHIELD"],
  SHIELD_PATH_26: ["PUZZLE", "GEAR", "CAMP_HAMMOND"],
  SHIELD_PATH_9: ["GEAR", "KEY"],
  DARKNESS_PATH_5: ["EQUIP_ELEKTRA_SAI", "EQUIP_DAREDEVIL_BILLY_CLUB"],
  DARKNESS_PATH_17: ["BRAIN", "FLAG"],
  DARKNESS_GROUP_2: ["KEY", "BRAIN", "GEAR", "FLAG", "PORTAL"],
  DARKNESS_PATH_14: ["BRAIN"],
  DARKNESS_PATH_6: ["KEY", "MAGIC"],
  DARKNESS_PATH_20: ["EQUIP_MOON_KNIGHTS_SUIT"],
  DARKNESS_PATH_21: ["EQUIP_MOON_KNIGHT_CRESCENT_DARTS"],
  DARKNESS_PATH_18: [
    "EQUIP_WAR_MACHINE_DEFLECTOR_SHIELDS",
    "EQUIP_WAR_MACHINE_OMNIBEAM",
    "EQUIP_WAR_MACHINE_STEALTH_FIELD_GENERATOR",
  ],
  DARKNESS_GROUP_1: ["PORTAL", "FLAG", "KEY", "KEY", "MAGIC"],
  DARKNESS_PATH_7: ["KEY", "FLAG"],
  DARKNESS_PATH_9: ["BRAIN", "FLAG"],
  DARKNESS_PATH_19: ["FLAG", "GEAR"],
  DARKNESS_PATH_13: ["FLAG", "KEY"],
  DARKNESS_PATH_12: ["FLAG", "KEY"],
  DARKNESS_PATH_23: ["TEAM_DARK_AVENGERS", "STAR", "RECOVER", "BRAIN", "GEAR"],
  DARKNESS_PATH_25: ["KEY"],
  DARKNESS_PATH_26: ["KEY"],
  DARKNESS_PATH_24: ["EYE"],
  DARKNESS_PATH_22: ["EQUIP_US_AGENTS_SHIELD"],
  DARKNESS_PATH_27: ["TEAM_DEFENDERS_MANHATTAN"],
  DARKNESS_PATH_8: ["KEY", "BRAIN", "FLAG"],
  DARKNESS_PATH_4: ["US_AGENT"],
  DARKNESS_PATH_3: ["DAKEN"],
  DARKNESS_PATH_1: ["ARES"],
  DARKNESS_PATH_2: ["MOONSTONE"],
  SHIELD_PATH_1: ["EYE"],
  CASTLE_PATH_15: ["STAR"],
  CASTLE_GROUP_2: ["KEY", "PUZZLE", "MAGIC", "EYE", "PORTAL"],
  CASTLE_PATH_36: ["PET_ALLIGATOR_LOKI"],
  CASTLE_PATH_8: ["KEY", "GEAR", "KEY", "GEAR"],
  CASTLE_PATH_35: ["GEAR", "KEY"],
  CASTLE_GROUP_1: ["KEY", "BRAIN", "MAGIC", "PORTAL"],
  CASTLE_PATH_2: ["TEAM_ASGARDIANS_ALLIES"],
  CASTLE_PATH_1: ["PLANET", "HOURGLASS"],
  CASTLE_PATH_6: ["EQUIP_LOKI_SCEPTER"],
  CASTLE_PATH_7: ["KEY", "KEY"],
  CASTLE_PATH_29: ["STAR"],
  CASTLE_PATH_28: ["MAGIC"],
  CASTLE_PATH_32: ["PORTAL"],
  CASTLE_GROUP_3: ["PORTAL", "EQUIP_THOR_MJOLNIR"],
  CASTLE_PATH_17: ["KID_LOKI"],
  CASTLE_PATH_26: ["RECOVER"],
  CASTLE_PATH_5: ["PET_THROG"],
  CASTLE_PATH_27: ["BRAIN", "KEY", "MAGIC"],
  CASTLE_PATH_31: ["MAGIC", "HOURGLASS", "BRAIN"],
  CASTLE_PATH_12: ["EQUIP_MAGIK_SOULSWORD"],
  CASTLE_PATH_22: ["EQUIP_SHANG_CHI_NUNCHAKU"],
  CASTLE_PATH_10: ["EQUIP_SCARLET_WITCH_DARKHOLD"],
  CASTLE_PATH_25: ["EQUIP_BETA_RAY_BILL_STORMBREAKER"],
  CASTLE_PATH_14: ["EQUIP_OKOYE_VIBRANIUM_SPEAR"],
  FLAME_PATH_21: ["BRAIN", "GEAR"],
  FLAME_PATH_20: ["GEAR", "KEY"],
  FLAME_PATH_13: ["PORTAL", "STAR"],
  FLAME_PATH_18: ["DARKSTAR"],
  FLAME_PATH_17: ["URSA_MAJOR"],
  FLAME_PATH_16: ["RED_GUARDIAN"],
  FLAME_PATH_12: ["EQUIP_CAPTAIN_AMERICAS_SHIELD"],
  FLAME_PATH_24: ["BRAIN", "PUZZLE", "GEAR", "GEAR", "WHITE_WIDOW"],
  FLAME_PATH_10: [
    "EQUIP_BLACK_WIDOW_WIDOWS_BITE",
    "EQUIP_WHITE_WIDOW_WIDOWS_BITE",
  ],
  FLAME_PATH_9: ["EQUIP_WHITE_WIDOW_BATTLE_BATONS"],
  FLAME_PATH_7: ["TEAM_FANTASTIC_FOUR"],
  FLAME_PATH_22: ["BRAIN", "GEAR"],
  FLAME_PATH_23: ["PUZZLE", "KEY", "AURORA"],
  FLAME_PATH_3: ["TEAM_ALPHA_FLIGHT"],
  FLAME_PATH_8: ["PORTAL"],
  FLAME_GROUP_1: ["PORTAL", "KEY", "PLANET", "MAGIC", "STAR", "EYE"],
  STARS_PATH_7: ["EQUIP_CYCLOPS_VISOR"],
  STARS_PATH_11: ["TEAM_GUARDIANS_OF_THE_GALAXY"],
  STARS_PATH_12: ["PORTAL"],
  STARS_PATH_10: ["EQUIP_STARLORD_TRANSLATOR_IMPLANT"],
  STARS_PATH_3: ["PORTAL"],
  STARS_PATH_2: ["PLANET"],
  STARS_PATH_21: ["KEY", "BRAIN", "PLANET"],
  STARS_PATH_20: ["GEAR", "GEAR", "KEY"],
  STARS_GROUP_1: ["PORTAL", "LILANDRA"],
  STARS_PATH_14: ["PUZZLE"],
  STARS_PATH_16: ["STAR"],
  STARS_PATH_13: ["EYE"],
  STARS_PATH_15: ["TEAM_STARJAMMERS"],
  STARS_PATH_9: ["RAZA"],
  STARS_PATH_8: ["HEPZIBAH"],
  STARS_PATH_6: ["CORSAIR"],
  STARS_PATH_1: ["CHOD"],
  STARS_PATH_18: ["GLADIATOR"],
  STARS_PATH_5: ["PLANET"],
  STARS_PATH_23: ["KEY", "PLANET", "BRAIN"],
  STARS_PATH_22: ["GEAR", "KEY", "PLANET"],
  STARS_PATH_19: ["EYE", "STAR", "PLANET", "BRAIN", "KEY"],
  EXILE_PATH_10: ["TEAM_RED_HULKS_THUNDERBOLTS"],
  EXILE_PATH_14: ["KEY"],
  EXILE_PATH_9: ["RED_HULK"],
  EXILE_PATH_22: ["GEAR", "KEY"],
  EXILE_PATH_20: ["GEAR", "GEAR"],
  EXILE_PATH_16: ["HERCULES"],
  EXILE_PATH_1: ["TEAM_CHAMPIONS"],
  EXILE_PATH_3: [
    "EQUIP_HULKBUSTER_IRON_MAN_DEFLECTOR_SHIELDS",
    "EQUIP_HULKBUSTER_IRON_MAN_OMNIBEAM",
  ],
  EXILE_PATH_7: ["HULKBUSTER_IRON_MAN"],
  EXILE_PATH_19: ["KEY", "KEY"],
  EXILE_PATH_13: ["STAR"],
  EXILE_PATH_2: ["PORTAL"],
  EXILE_GROUP_1: ["PORTAL", "GLADIATOR_HULK", "PUZZLE", "GEAR", "KEY", "EYE"],
  EXILE_PATH_24: ["GEAR", "GEAR"],
  EXILE_PATH_23: ["PUZZLE"],
  EXILE_PATH_26: ["GREY_HULK"],
  EXILE_PATH_25: ["BRAIN", "PLANET", "TEAM_ILLUMINATI"],
  EXILE_PATH_8: ["PLANET"],
  EXILE_PATH_6: ["KEY"],
  EXILE_PATH_4: ["RECOVER"],
  EXILE_PATH_5: ["DOC_SAMSON"],
  EXILE_PATH_15: ["KEY"],
  FINALITY_PATH_11: ["SPARKLE"],
  FINALITY_PATH_10: ["KEY"],
  FINALITY_PATH_8: ["KEY"],
  FINALITY_PATH_24: ["GEAR", "SPARKLE"],
  FINALITY_GROUP_1: ["PLANET", "SPARKLE", "PORTAL", "NOVA_FRANKIE_RAYE"],
  FINALITY_PATH_21: ["SPARKLE", "BRAIN"],
  FINALITY_PATH_9: ["KEY"],
  FINALITY_PATH_16: ["KEY"],
  FINALITY_PATH_15: ["SILVER_SURFER_2", "SPARKLE"],
  FINALITY_PATH_14: ["SPARKLE", "MAGIC"],
  FINALITY_PATH_18: ["PORTAL"],
  FINALITY_PATH_4: ["KEY"],
  FINALITY_PATH_7: ["KEY"],
  FINALITY_PATH_5: ["STAR"],
  CHARIOT_PATH_29: ["CYPHER", "HAVOK_X_FACTOR"],
  CHARIOT_PATH_15: ["TEAM_XMEN"],
  CHARIOT_PATH_8: ["EQUIP_MAGNETO_AOA_MAGNETOS_HELMET"],
  CHARIOT_PATH_38: ["MAGNETO_APOCALYPSE"],
  CHARIOT_PATH_36: ["DNA"],
  CHARIOT_PATH_37: ["DNA"],
  CHARIOT_PATH_34: ["BRAIN"],
  CHARIOT_PATH_35: ["BRAIN"],
  CHARIOT_PATH_4: ["CAPTAIN_BRITAIN_BETSY_BRADDOCK"],
  CHARIOT_GROUP_2: ["MEGGAN", "PORTAL", "TEAM_EXCALIBUR"],
  CHARIOT_PATH_9: ["TEAM_SWORDBEARERS_OF_KRAKOA", "KEY"],
  CHARIOT_PATH_16: ["TEAM_NEW_MUTANTS"],
  CHARIOT_PATH_22: ["TEAM_XFACTOR", "BRAIN"],
  CHARIOT_PATH_23: ["TEAM_XFORCE", "GEAR"],
  CHARIOT_GROUP_1: ["TEAM_UNCANNY_XFORCE", "DEATHLOK", "PORTAL"],
  CHARIOT_PATH_18: ["SIRYN"],
  CHARIOT_PATH_3: ["EQUIP_GAMBIT_DECK_OF_CARDS"],
  CHARIOT_PATH_7: ["MORPH"],
  CHARIOT_PATH_13: ["SABRETOOTH_WILDCHILD"],
  CHARIOT_PATH_25: ["GEAR", "DNA"],
  CHARIOT_PATH_26: ["DNA", "BRAIN"],
  CHARIOT_PATH_2: ["PET_LOCKHEED"],
  CHARIOT_PATH_12: ["DNA", "X_MAN"],
  CHARIOT_PATH_14: ["STAR"],
  CHARIOT_PATH_20: ["JUGGERNAUT"],
  CHARIOT_PATH_19: ["BRAIN", "KEY", "DNA"],
  CHARIOT_PATH_24: ["MAGIC", "DNA"],
  CHARIOT_PATH_10: ["HUSK"],
  CHARIOT_PATH_6: ["M"],
  CHARIOT_PATH_11: ["CHAMBER"],
  CHARIOT_PATH_21: ["MISTER_SINISTER", "MAGIC"],
  CHARIOT_PATH_27: ["TEAM_GENX"],
  CHARIOT_PATH_28: ["TEAM_RESISTANCE_AGAINST_APOCALYPSE"],
  CHARIOT_PATH_17: ["EQUIP_MAGNETOS_HELMET"],
  CHARIOT_PATH_5: [
    "DNA",
    "BRAIN",
    "PLANET",
    "GEAR",
    "KEY",
    "HOURGLASS",
    "STAR",
    "EYE",
  ],
};

export const chainedHeroes: { [key: string]: Array<HeroKey> } = {
  AVX_APOCALYPSE_149: ["LOGAN"],
  AVX_MISTER_SINISTER_217: ["HOPE_SUMMERS"],
  AVX_SABRETOOTH_157: ["WOLVERINE"],
  AVX_AVALANCHE_203: ["GUARDIAN"],
  AVX_BULLSEYE_170: ["ELEKTRA"],
  AVX_RHINO_188: ["SPIDER_MAN"],
  AVX_KILLMONGER_180: ["OKOYE", "SHURI"],
  AVX_DORMAMMU_183: ["DOCTOR_STRANGE"],
  MIDNIGHT_SCARLET_WITCH_7: ["AGATHA_HARKNESS"],
};
