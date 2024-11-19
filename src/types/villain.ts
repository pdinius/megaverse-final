const VILLAIN_LIST = [
  "ABOMINATION",
  "ABSORBING_MAN",
  "AGATHA_HARKNESS",
  "AIR_WALKER",
  "ANNIHILUS",
  "ANTI_VENOM",
  "APOCALYPSE_AGE_OF_APOCALYPSE",
  "APOCALYPSE",
  "ARCADE",
  "ARES",
  "ARES",
  "ATROCITUS",
  "AVALANCHE",
  "BANE",
  "BARON_ZEMO",
  "BIZARRO",
  "BLACK_ADAM",
  "BLACK_DWARF",
  "BLACK_HAND",
  "BLACK_MANTA",
  "BLACK_MASK",
  "BLASTAAR",
  "BLOODSPORT",
  "BOB_AGENT_OF_HYDRA",
  "BRAINIAC",
  "BROOD_QUEEN",
  "BROTHERHOOD_OF_EVIL_MUTANTS",
  "BULLSEYE",
  "CALLISTO",
  "CAPTAIN_BOOMERANG",
  "CAPTAIN_COLD",
  "CARNAGE",
  "CATWOMAN",
  "CHAMELEON",
  "CLAYFACE",
  "COLOSSUS_PHOENIX_FIVE",
  "CONDIMENT_KING",
  "CORVUS_GLAIVE",
  "COSMIC_GHOST_RIDER",
  "CRIMSON_DYNAMO",
  "CROSSBONES",
  "CYBORG_SUPERMAN",
  "CYCLOPS_PHOENIX_FIVE",
  "DAKEN",
  "DARK_AVENGERS",
  "DARK_BEAST",
  "DARK_CARNAGE",
  "DARK_PHOENIX",
  "DARKCHILD",
  "DARKSEID",
  "DEADPOOL_VILLAIN",
  "DEADSHOT",
  "DEATH",
  "DEATHBIRD",
  "DEATHSTROKE",
  "DEMOGOBLIN_DOPPELGANGER",
  "DESPERO",
  "DOCTOR_DOOM",
  "DOCTOR_OCTOPUS",
  "DOOMSDAY",
  "DORMAMMU",
  "EBONY_MAW",
  "ELECTRO",
  "EMMA_FROST_PHOENIX_FIVE",
  "EMMA_FROST",
  "EMPEROR_DOOM",
  "ENCHANTRESS",
  "FAMINE",
  "FIN_FANG_FOOM",
  "FIRELORD",
  "GALACTUS",
  "GENERAL_ZOD",
  "GLADIATOR_HULK",
  "GLADIATOR",
  "GORILLA_GRODD",
  "GORR",
  "GREEN_GOBLIN",
  "HARLEY_QUINN",
  "HELA",
  "HERALDS_OF_GALACTUS",
  "HIGH_EVOLUTIONARY",
  "HOBGOBLIN",
  "HORSEMEN",
  "IMMORTUS",
  "INDIGO_1",
  "IRON_PATRIOT",
  "JUGGERNAUT",
  "KANG",
  "KILLER_CROC",
  "KILLMONGER",
  "KING_SHARK",
  "KINGPIN",
  "KLAW",
  "KNULL",
  "KRAVEN",
  "LADY_DEATHSTRIKE",
  "LARFLEEZE",
  "LEGION",
  "LEX_LUTHOR",
  "LIZARD",
  "LOBO",
  "LOKI",
  "MAESTRO",
  "MAGIK_PHOENIX_FIVE",
  "MAGNETO",
  "MAN_BAT",
  "MARROW",
  "MASTERMIND",
  "MAXIMUS",
  "MISTER_SINISTER",
  "MODOK",
  "MODULAR_HERALDS",
  "MOJO",
  "MOLE_MAN",
  "MONGUL",
  "MOONSTONE",
  "MORBIUS",
  "MORLUN",
  "MR_FREEZE",
  "MR_MXYZPTLK",
  "MYSTERIO",
  "MYSTIQUE",
  "NAMOR_PHOENIX_FIVE",
  "NAMOR",
  "NEMESIS",
  "NEW_SINISTER_SIX",
  "NIMROD",
  "NOVA",
  "OCEAN_MASTER",
  "OMEGA_RED",
  "ONSLAUGHT",
  "PARALLAX",
  "PARASITE",
  "PEACEMAKER",
  "PESTILENCE",
  "POISON_IVY",
  "POLKA_DOT_MAN",
  "PROXIMA_MIDNIGHT",
  "PURPLE_MAN",
  "QUEEN_VERANKE",
  "RAS_AL_GHUL",
  "RED_HOOD",
  "RED_HULK",
  "RED_SKULL",
  "REVERSE_FLASH",
  "RHINO",
  "RICK_FLAG",
  "RONAN",
  "SABRETOOTH",
  "SANDMAN",
  "SAURON",
  "SCARECROW",
  "SCARLET_WITCH_QUICKSILVER",
  "SCARLET_WITCH",
  "SCORPION",
  "SCREAM",
  "SEBASTIAN_SHAW",
  "SENTINEL",
  "SHADOW_KING",
  "SHOCKER",
  "SHRIEK",
  "SILVER_SAMURAI",
  "SINESTRO",
  "SINISTER_SIX_ASSEMBLED",
  "SINISTER_SIX",
  "SKRULLS",
  "SOLOMON_GRUNDY",
  "SPIRAL",
  "SPOT",
  "STAR_SAPPHIRE",
  "STARRO",
  "STEPPENWOLF",
  "STRYFE",
  "SUPER_SKRULL",
  "SUPERIOR_SPIDER_MAN",
  "TALIA_AL_GHUL",
  "TASKMASTER",
  "TERRAX",
  "THANOS",
  "THE_BATMAN_WHO_LAUGHS",
  "THE_CHEETAH",
  "THE_JOKER",
  "THE_PENGUIN",
  "THE_RIDDLER",
  "THE_VOID",
  "TITANIA",
  "TRIGON",
  "TWO_FACE",
  "ULTRON",
  "US_AGENT",
  "VENOM_VILLAIN",
  "VULCAN",
  "VULTURE",
  "WAR",
  "WHITE_WIDOW",
  "WINTER_GUARD",
  "WRECKING_CREW",
] as const;

export type VillainKey = (typeof VILLAIN_LIST)[number];

export type VillainName =
  | "Abomination"
  | "Absorbing Man"
  | "Air-Walker"
  | "Annihilus"
  | "Apocalypse (Age of Apocalypse)"
  | "Arcade"
  | "Ares"
  | "Atrocitus"
  | "Avalanche"
  | "Bane"
  | "Baron Zemo"
  | "Black Dwarf"
  | "Black Hand"
  | "Black Manta"
  | "Black Mask"
  | "Blastaar"
  | "Brainiac"
  | "Brood Queen"
  | "Brotherhood of Evil Mutants"
  | "Bullseye"
  | "Callisto"
  | "Carnage"
  | "Chameleon"
  | "Clayface"
  | "Colossus (Phoenix Five)"
  | "Condiment King"
  | "Corvus Glaive"
  | "Crimson Dynamo"
  | "Crossbones"
  | "Cyborg Superman"
  | "Cyclops (Phoenix Five)"
  | "Dark Beast"
  | "Dark Carnage"
  | "Dark Phoenix"
  | "Darkseid"
  | "Deadpool"
  | "Death"
  | "Deathbird"
  | "Deathstroke"
  | "Demogoblin & Doppelganger"
  | "Despero"
  | "Doctor Octopus"
  | "Doomsday"
  | "Dormammu"
  | "Ebony Maw"
  | "Electro"
  | "Emma Frost (Phoenix Five)"
  | "Emperor Doom"
  | "Enchantress"
  | "Famine"
  | "Fin Fang Foom"
  | "Firelord"
  | "Galactus"
  | "General Zod"
  | "Gorilla Grodd"
  | "Gorr"
  | "Green Goblin"
  | "Hela"
  | "Heralds of Galactus"
  | "High Evolutionary"
  | "Hobgoblin"
  | "Immortus"
  | "Iron Patriot"
  | "Juggernaut"
  | "Kang"
  | "Killer Croc"
  | "Killmonger"
  | "Kingpin"
  | "Klaw"
  | "Knull"
  | "Kraven"
  | "Lady Deathstrike"
  | "Larfleeze"
  | "Lex Luthor"
  | "Lizard"
  | "Loki"
  | "Maestro"
  | "Magik (Phoenix Five)"
  | "Man-Bat"
  | "Mastermind"
  | "Maximus"
  | "Mister Sinister"
  | "M.O.D.O.K."
  | "Modular Heralds of Galactus"
  | "Mojo"
  | "Mole Man"
  | "Mongul"
  | "Morlun"
  | "Mr. Freeze"
  | "Mr. Mxyzptlk"
  | "Mysterio"
  | "Namor (Phoenix Five)"
  | "Nemesis"
  | "New Sinister Six"
  | "Nimrod"
  | "Ocean Master"
  | "Omega Red"
  | "Onslaught"
  | "Parallax"
  | "Parasite"
  | "Pestilence"
  | "Poison Ivy"
  | "Proxima Midnight"
  | "Purple Man"
  | "Queen Veranke"
  | "Ra's Al Ghul"
  | "Red Skull"
  | "Reverse-Flash"
  | "Rhino"
  | "Ronan"
  | "Sabretooth"
  | "Sandman"
  | "Sauron"
  | "Scarecrow"
  | "Scarlet Witch"
  | "Scarlet Witch & Quicksilver"
  | "Scorpion"
  | "Scream"
  | "Sebastian Shaw"
  | "Sentinel"
  | "Shadow King"
  | "Shocker"
  | "Shriek"
  | "Silver Samurai"
  | "Sinister Six"
  | "Sinister Six Assembled"
  | "Sinestro"
  | "Skrulls"
  | "Solomon Grundy"
  | "Spot"
  | "Starro"
  | "Steppenwolf"
  | "Stryfe"
  | "Super-Skrull"
  | "Talia Al Ghul"
  | "Taskmaster"
  | "Terrax"
  | "Thanos"
  | "The Batman Who Laughs"
  | "The Cheetah"
  | "The Joker"
  | "The Penguin"
  | "The Riddler"
  | "The Void"
  | "Titania"
  | "Trigon"
  | "Two-Face"
  | "Ultron"
  | "Venom"
  | "Vulcan"
  | "Vulture"
  | "War"
  | "Winter Guard"
  | "Wrecking Crew";

export const isVillainKey = (v: string): v is VillainKey =>
  VILLAIN_LIST.includes(v as VillainKey);
