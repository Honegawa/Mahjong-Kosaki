import { Box, Divider, Typography } from "@mui/material";

function Formats() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h5" component={"h2"} fontWeight={600}>
          4P - Yonma
        </Typography>

        <ul>
          <li>Points de départ : 25000</li>
          <li>Points minimum pour gagner : 30000</li>
          <li>Uma : [1er+30, 2e +10, 3e -10, 4e -30]</li>
          <li>Tobi (banqueroute) : Oui</li>
          <li>Atamahane (victoire prioritaire) : Non</li>
          <li>Keishiki Tenpai (être en tenpai sans yaku) : Oui</li>
          <li>Oka : Oui</li>
          <li>
            3 tuiles rouges, Uradora, Kandora, Kanuradora, Ippatsu utilisés
          </li>
          <li>
            Kuitan (Tanyo ouvert) et Atozuke (main avec Yaku tardif) : Oui
          </li>
          <li>
            Extension vers le Sud (Tonpuusen - Seulement Est) / vers l'Ouest
            (Hanchan)
          </li>
          <li>
            Tochuu Ryuukyoku (annulation de la ronde) : Oui (inclus Kyuushu
            Kyuuhai, Suufon Renda, Suukaikan, Triple Ron, Suucha Riichi)
          </li>
          <li>Nagashi Mangan : Oui</li>
          <li>Rinshan Pao : Oui</li>
          <li>Yakuman Pao : Oui</li>
          <li>Renhou : Non</li>
          <li>Multiple Yakuman : Oui</li>
          <li>
            En cas d'égalité en fin de partie, prendre l'ordre des places en Est
            1 : {"Est > Sud > Ouest > Nord"}
          </li>
        </ul>
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column">
        <Typography variant="h5" component={"h2"} fontWeight={600}>
          3P - Sanma
        </Typography>

        <ul>
          <li>Points de départ : 35000</li>
          <li>Points minimum pour gagner : 40000</li>
          <li>Uma : [1er+20, 2e 0, 3e -20]</li>
          <li>Tobi (banqueroute) : Oui</li>
          <li>Atamahane (victoire prioritaire) : Non</li>
          <li>Keishiki Tenpai (être en tenpai sans yaku) : Oui</li>
          <li>Oka : Oui</li>
          <li>
            2 tuiles rouges, Uradora, Kandora, Kanuradora, Ippatsu utilisés
          </li>
          <li>
            Kuitan (Tanyo ouvert) et Atozuke (main avec Yaku tardif) : Oui
          </li>
          <li>Kita (tuile Nord compté comme Nukidora): Oui</li>
          <li>
            Extension vers le Sud (Tonpuusen - Seulement Est) / vers l'Ouest
            (Hanchan)
          </li>
          <li>
            Tochuu Ryuukyoku (annulation de la ronde) : Oui (inclus Kyuushu
            Kyuuhai, Suufon Renda, Suukaikan, Triple Ron, Suucha Riichi)
          </li>
          <li>Nagashi Mangan : Oui</li>
          <li>Rinshan Pao : Oui</li>
          <li>Yakuman Pao : Oui</li>
          <li>Renhou : Non</li>
          <li>Multiple Yakuman : Oui</li>
          <li>
            En cas d'égalité en fin de partie, prendre l'ordre des places en Est
            1 : {"Est > Sud > Ouest"}
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default Formats;
