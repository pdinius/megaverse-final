import { Achievements } from "../types/game-status";

export const achievementPaths = {
  AVX_WIN_CYCLOPS:
    "M4042,3475.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4024.38,3492.9,4041.06,3476.23,4042,3475.28Z",
  AVX_WIN_JEAN:
    "M3878,3099.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3860.38,3116.9,3877.06,3100.23,3878,3099.28Z",
  AVX_WIN_BEAST:
    "M4275,2875.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4257.38,2892.9,4274.06,2876.23,4275,2875.28Z",
  AVX_WIN_ICEMAN:
    "M4502,3098.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4484.38,3115.9,4501.06,3099.23,4502,3098.28Z",
  AVX_BOTH_GAMBIT_ROGUE:
    "M4850,2995.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4832.38,3012.9,4849.06,2996.23,4850,2995.28Z",
  AVX_BOTH_COLOSSUS_KITTY:
    "M4853,3406.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4835.38,3423.9,4852.06,3407.23,4853,3406.28Z",
  AVX_WIN_STORM:
    "M3526,3680.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3508.38,3697.9,3525.06,3681.23,3526,3680.28Z",
  AVX_WIN_FORGE:
    "M3519,2982.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3501.38,2999.9,3518.06,2983.23,3519,2982.28Z",
  AVX_WIN_STARLORD:
    "M5541,5389.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C5523.38,5406.9,5540.06,5390.23,5541,5389.28Z",
  AVX_WIN_ANT_MAN:
    "M5996,5699.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C5978.38,5716.9,5995.06,5700.23,5996,5699.28Z",
  AVX_WIN_WASP:
    "M6187,5702.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C6169.38,5719.9,6186.06,5703.23,6187,5702.28Z",
  AVX_BOTH_LUKE_JESSICA:
    "M2757,5650.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2739.38,5667.9,2756.06,5651.23,2757,5650.28Z",
  AVX_WIN_MOON_KNIGHT:
    "M1838,5740.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1820.38,5757.9,1837.06,5741.23,1838,5740.28Z",
  AVX_WIN_MILES_MORALES:
    "M3117,3844.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3099.38,3861.9,3116.06,3845.23,3117,3844.28Z",
  AVX_MAPLE_4:
    "M2192,2586.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2174.38,2603.9,2191.06,2587.23,2192,2586.28Z",
  AVX_MAPLE_3:
    "M2249,2586.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2231.38,2603.9,2248.06,2587.23,2249,2586.28Z",
  AVX_MAPLE_2:
    "M2306,2586.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2288.38,2603.9,2305.06,2587.23,2306,2586.28Z",
  AVX_MAPLE_1:
    "M2363,2586.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2345.38,2603.9,2362.06,2587.23,2363,2586.28Z",
  AVX_REMOVE_WAR_MACHINE:
    "M3573,3888.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3555.38,3905.9,3572.06,3889.23,3573,3888.28Z",
  AVX_WIN_IRON_MAN:
    "M3894,4022.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3876.38,4039.9,3893.06,4023.23,3894,4022.28Z",
  AVX_WIN_CAPTAIN_AMERICA:
    "M3898,4422.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C3880.38,4439.9,3897.06,4423.23,3898,4422.28Z",
  AVX_WIN_HULK:
    "M4498,4023.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4480.38,4040.9,4497.06,4024.23,4498,4023.28Z",
  AVX_WIN_BLACK_WIDOW:
    "M4469,4423.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4451.38,4440.9,4468.06,4424.23,4469,4423.28Z",
  AVX_WIN_WANDA:
    "M4378,4586.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4360.38,4603.9,4377.06,4587.23,4378,4586.28Z",
  AVX_REMOVE_VISION:
    "M4348,4985.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4330.38,5002.9,4347.06,4986.23,4348,4985.28Z",
  AVX_WIN_BLACK_PANTHER:
    "M4924,4882.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C4906.38,4899.9,4923.06,4883.23,4924,4882.28Z",
  MIST_WIN_INHUMANS:
    "M788,2275.28a2.419,2.419,0,1,1,3.421,3.42c-0.944.95-18.384,18.39-19.329,19.33a2.411,2.411,0,0,1-3.422,0c-0.945-.94-8.719-8.72-9.664-9.66a2.419,2.419,0,0,1,3.422-3.42c0.688,0.68,5.433,5.43,7.955,7.95C770.384,2292.9,787.056,2276.23,788,2275.28Z",
  MIST_BOLTS:
    "M473,1891.28a2.419,2.419,0,0,1,3.421,3.42c-0.944.95-18.384,18.39-19.329,19.33a2.411,2.411,0,0,1-3.422,0c-0.945-.94-8.719-8.72-9.664-9.66a2.419,2.419,0,1,1,3.422-3.42c0.688,0.68,5.433,5.43,7.955,7.95C455.384,1908.9,472.056,1892.23,473,1891.28Z",
  MIST_BEAT_THANOS:
    "M1618,1774.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,1,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1600.38,1791.9,1617.06,1775.23,1618,1774.28Z",
  GALAXY_WIN_NEW_AVENGERS:
    "M1017,3194.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.407,2.407,0,0,1-3.419,0c-0.945-.94-8.719-8.72-9.664-9.66a2.419,2.419,0,0,1,3.422-3.42c0.688,0.68,5.433,5.43,7.955,7.95C999.384,3211.9,1016.06,3195.23,1017,3194.28Z",
  GALAXY_ROSTER_HULKLING:
    "M1118,3588.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1100.38,3605.9,1117.06,3589.23,1118,3588.28Z",
  GALAXY_WIN_PET:
    "M1276,3589.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1258.38,3606.9,1275.06,3590.23,1276,3589.28Z",
  GALAXY_ROSTER_NOVA:
    "M1117,2809.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1099.38,2826.9,1116.06,2810.23,1117,2809.28Z",
  MIDNIGHT_8_GATES:
    "M1860,7059.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1842.38,7076.9,1859.06,7060.23,1860,7059.28Z",
  MIDNIGHT_WIN_EBONY_BLADE:
    "M1862,6613.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C1844.38,6630.9,1861.06,6614.23,1862,6613.28Z",
  MIDNIGHT_WIN_MIDNIGHT_SONS:
    "M2711,6953.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C2693.38,6970.9,2710.06,6954.23,2711,6953.28Z",
  WAR_6_STARS_RIGHT:
    "M6016,6571.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C5998.38,6588.9,6015.06,6572.23,6016,6571.28Z",
  WAR_6_STARS_LEFT:
    "M5683,6571.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C5665.38,6588.9,5682.06,6572.23,5683,6571.28Z",
  DARKNESS_WIN_DARK_AVENGERS:
    "M7502,5313.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C7484.38,5330.9,7501.06,5314.23,7502,5313.28Z",
  CASTLE_WIN_ASGARDIANS:
    "M7964,4848.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C7946.38,4865.9,7963.06,4849.23,7964,4848.28Z",
  CASTLE_WIN_MJOLNIR:
    "M8170,4167.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C8152.38,4184.9,8169.06,4168.23,8170,4167.28Z",
  STARS_WIN_STARJAMMERS:
    "M7829,2320.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C7811.38,2337.9,7828.06,2321.23,7829,2320.28Z",
  STARS_WIN_GUARDIANS:
    "M6954,2320.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C6936.38,2337.9,6953.06,2321.23,6954,2320.28Z",
  STARS_BROOD_QUEEN:
    "M6825,1603.28a2.418,2.418,0,0,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,1,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C6807.38,1620.9,6824.06,1604.23,6825,1603.28Z",
  STARS_RECRUIT_STARJAMMERS:
    "M7663,2231.28a2.418,2.418,0,1,1,3.42,3.42c-0.94.95-18.38,18.39-19.33,19.33a2.408,2.408,0,0,1-3.42,0l-9.66-9.66a2.418,2.418,0,0,1,3.42-3.42c0.69,0.68,5.43,5.43,7.95,7.95C7645.38,2248.9,7662.06,2232.23,7663,2231.28Z",
  EXILE_WIN_ILLUMINATI:
    "M5161,572.28a2.419,2.419,0,0,1,3.42,3.423c-0.94.944-18.38,18.384-19.33,19.329a2.415,2.415,0,0,1-3.42,0c-0.94-.945-8.72-8.72-9.66-9.665a2.419,2.419,0,1,1,3.42-3.422c0.69,0.689,5.43,5.433,7.95,7.955C5143.38,589.9,5160.06,573.226,5161,572.28Z",
  EXILE_WIN_THUNDERBOLTS:
    "M6476,252.28a2.419,2.419,0,0,1,3.42,3.423c-0.94.944-18.38,18.384-19.33,19.329a2.415,2.415,0,0,1-3.42,0c-0.94-.945-8.72-8.72-9.66-9.665a2.419,2.419,0,0,1,3.42-3.422c0.69,0.689,5.43,5.433,7.95,7.955C6458.38,269.9,6475.06,253.226,6476,252.28Z",
  EXILE_12_STARS:
    "M5839,458.28a2.419,2.419,0,0,1,3.42,3.423c-0.94.944-18.38,18.384-19.33,19.329a2.415,2.415,0,0,1-3.42,0c-0.94-.945-8.72-8.72-9.66-9.665a2.419,2.419,0,0,1,3.42-3.422c0.69,0.689,5.43,5.433,7.95,7.955C5821.38,475.9,5838.06,459.226,5839,458.28Z",
};

export const achievementToKeyLookup: {
  [key in keyof typeof achievementPaths]?: keyof Achievements;
} = {
  AVX_WIN_BEAST: "win_with_beast",
  AVX_WIN_ICEMAN: "win_with_iceman",
  AVX_WIN_JEAN: "win_with_jean",
  AVX_WIN_CYCLOPS: "win_with_cyclops",
  AVX_WIN_FORGE: "win_with_forge",
  AVX_WIN_STORM: "win_with_storm",
  AVX_WIN_MILES_MORALES: "win_with_miles",
  AVX_WIN_IRON_MAN: "win_with_iron_man",
  AVX_WIN_HULK: "win_with_hulk",
  AVX_WIN_CAPTAIN_AMERICA: "win_with_cap",
  AVX_WIN_BLACK_WIDOW: "win_with_widow",
  AVX_WIN_WANDA: "win_with_wanda",
  AVX_WIN_BLACK_PANTHER: "win_with_black_panther",
  AVX_WIN_STARLORD: "win_with_starlord",
  AVX_WIN_ANT_MAN: "win_with_antman",
  AVX_WIN_WASP: "win_with_wasp",
  AVX_WIN_MOON_KNIGHT: "win_with_moon_knight",
  MIST_WIN_INHUMANS: "win_with_inhumans",
  GALAXY_WIN_NEW_AVENGERS: "win_with_new_avengers",
  MIDNIGHT_WIN_MIDNIGHT_SONS: "win_with_midnight_sons",
  DARKNESS_WIN_DARK_AVENGERS: "win_with_dark_avengers",
  CASTLE_WIN_ASGARDIANS: "win_with_asgardians",
  STARS_WIN_STARJAMMERS: "win_with_starjammers",
  STARS_WIN_GUARDIANS: "win_with_guardians_galaxy",
  EXILE_WIN_ILLUMINATI: "win_with_illuminati",
  EXILE_WIN_THUNDERBOLTS: "win_with_thunderbolts",
  MIDNIGHT_WIN_EBONY_BLADE: "win_with_ebony_blade",
  CASTLE_WIN_MJOLNIR: "win_with_mjolnir",
  GALAXY_WIN_PET: "win_with_pet",
  AVX_BOTH_GAMBIT_ROGUE: "unlock_rogue_and_gambit",
  AVX_BOTH_COLOSSUS_KITTY: "unlock_colossus_and_kitty",
  AVX_BOTH_LUKE_JESSICA: "unlock_jessica_and_luke",
  STARS_RECRUIT_STARJAMMERS: "unlock_chod_corsair_hepzibah_raza",
  AVX_REMOVE_WAR_MACHINE: "war_machine_removed",
  AVX_REMOVE_VISION: "vision_removed",
  MIST_BEAT_THANOS: "thanos_defeated",
};
