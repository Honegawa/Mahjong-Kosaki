import { Box, Typography } from "@mui/material";

function Rules() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>
        Le Riichi Mahjong est une variante du mahjong originaire du Japon, où
        les joueurs s'affrontent pour compléter des mains spécifiques tout en
        respectant un ensemble de règles particulières. Voici un résumé des
        règles principales :
      </Typography>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        1. But du jeu :
      </Typography>

      <Box>
        <Typography>
          L'objectif du Riichi Mahjong est de compléter une main de 14 tuiles et
          de la déclarer gagnante. Une main complète se compose de :
        </Typography>
        <ul>
          <li>
            4 groupes (sets), qui peuvent être des séquences (tuiles
            consécutives de la même couleur, par exemple 2-3-4 de bambous) ou
            des triples (3 tuiles identiques).
          </li>
          <li>1 paire (2 tuiles identiques).</li>
        </ul>
        <Typography>
          Lorsque vous avez terminé votre main, vous pouvez déclarer un Tsumo
          (en piochant la dernière tuile) ou un Ron (en récupérant une tuile
          défaussée par un autre joueur).
        </Typography>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        2. Début de la partie :
      </Typography>

      <Box>
        <ul>
          <li>Chaque joueur commence avec 13 tuiles.</li>
          <li>
            Le jeu se déroule en tours, où chaque joueur pioche une tuile et
            choisit de la garder ou de la défausser. Chaque tour se termine
            lorsqu'un joueur a 14 tuiles et a complété sa main.
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        3. Les types de tuiles :
      </Typography>

      <Box>
        <Typography>Il y a trois types de tuiles dans le jeu :</Typography>
        <ul>
          <li>
            Les tuiles numériques : Elles sont divisées en 3 couleurs : Bambous,
            Cercles et Dragons. Chaque couleur a des tuiles numérotées de 1 à 9.
          </li>
          <li>
            Les tuiles de vent : Il y a 4 vents différents : Est, Sud, Ouest,
            Nord.
          </li>
          <li>
            Les tuiles de dragon : Il y a 3 dragons : Rouge, Vert et Blanc.
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        4. Comment former une main gagnante :
      </Typography>

      <Box>
        <Typography>Pour avoir une main gagnante, vous devez :</Typography>
        <ul>
          <li>Valider au moins une combinaison valide (Yaku)</li>
          <li>
            Former quatre groupes composés de triples ou de séquences et une
            paire
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        5. Actions pendant la partie :
      </Typography>

      <Box>
        <Typography>À votre tour, vous avez trois options :</Typography>
        <ol>
          <li>Piocher : Prenez une tuile du mur (pioche).</li>
          <li>
            Défausser : Vous devez toujours défausser une tuile pour garder
            votre main à 13 tuiles.
          </li>
          <li>
            Récupérer une tuile : Si un autre joueur défausse une tuile qui vous
            permet de compléter un groupe, vous pouvez la prendre.
            <ul>
              <li>
                Chi : Vous pouvez prendre une tuile pour compléter une séquence
                (ex. : si un joueur défausse un 3 de bambous, vous pouvez
                prendre cette tuile pour former la séquence 1-2-3).
              </li>
              <li>
                Pon : Vous pouvez prendre une tuile pour compléter un triple
                (ex. : si un joueur défausse un 5 de cercles et vous avez déjà
                deux 5 de cercles, vous pouvez prendre cette tuile pour faire un
                triple de 5).
              </li>
              <li>
                Kan : Vous pouvez prendre une tuile pour compléter un quadruple
                (qui est considéré comme un triple).
              </li>
            </ul>
          </li>
        </ol>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        6. Le Riichi (le pari) :
      </Typography>

      <Box>
        <Typography>
          Lorsque vous avez presque terminé votre main et que vous êtes à une
          tuile près de la compléter, vous pouvez déclarer Riichi. Cela signifie
          que vous êtes "prêt" à gagner, mais il y a des règles spécifiques :
        </Typography>
        <ul>
          <li>
            Vous devez avoir une main presque complète (13 tuiles et une paire).
          </li>
          <li>
            Vous devez mettre en jeu une unité de mise (1000 points), et vous
            signalez le Riichi en plaçant une tuile inclinée horizontalement
            face visible devant vous.
          </li>
          <li>
            Une fois le Riichi déclaré, vous ne pouvez plus changer votre main.
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        7. Les différentes façons de gagner :
      </Typography>

      <Box>
        <Typography>Il y a deux façons principales de gagner :</Typography>
        <ul>
          <li>
            Tsumo : Vous gagnez en complétant votre main vous-même en piochant
            la dernière tuile.
          </li>
          <li>
            Ron : Vous gagnez en récupérant une tuile défaussée par un autre
            joueur pour compléter votre main.
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        8. Les Yaku (combinaisons spéciales) :
      </Typography>

      <Box>
        <Typography>
          Les mains gagnantes sont souvent associées à des Yaku (combinations
          spécifiques qui valent des points). Par exemple :
        </Typography>
        <ul>
          <li>
            Pinfu : Une main composée uniquement de séquences simples, sans
            paire.
          </li>
          <li>
            Riichi : Si vous déclarez un Riichi et gagnez ensuite, cela vous
            donne des points supplémentaires.
          </li>
          <li>
            Tanyao : Une main qui ne contient que des tuiles de 2 à 8, sans 1 ni
            9.
          </li>
          <li>
            Chinitsu : Une main formée uniquement de tuiles d'une seule couleur
            (par exemple, toutes les tuiles de bambous).
          </li>
        </ul>
      </Box>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        9. La fin de la partie :
      </Typography>

      <Typography>
        Une partie se termine lorsqu'un joueur a terminé sa main (Tsumo ou Ron).
        À ce moment, les points sont comptabilisés en fonction des combinaisons
        de Yaku réalisées. Il peut aussi arriver qu'il n'ait plus de tuiles dans
        le mur (pioche) à la fin de la partie sans avoir de gagnant, ce met
        également fin à la partie.
      </Typography>

      <Typography variant="h5" component={"h2"} fontWeight={600}>
        10. Les points :
      </Typography>

      <Typography>
        Les points sont calculés en fonction des Han (valeur des combinaisons
        spéciales) et des Fu (valeur des tuiles et des configurations). Si le
        joueur gagne par "Tsumo", tous les autres joueurs doivent lui payer des
        points. Si le joueur gagne par "Ron", seul le joueur qui a défaussé la
        tuile gagnante paie la totalité des points.
      </Typography>
    </Box>
  );
}

export default Rules;
