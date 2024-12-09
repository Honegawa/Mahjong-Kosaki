import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/LegalMentions.module.css";

function LegalMentions() {
  return (
    <Box sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Mentions Légales
      </Typography>

      <Box
        className={styles.menntionsContainer}
        sx={{ marginTop: { xs: 1, md: 3 } }}
      >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Identité
                </Typography>

                <Box display="flex" flexDirection="column">
                  <Typography>Nom du site : Mahjong Kosaki</Typography>

                  <Typography>
                    Adresse du site :{" "}
                    <a href="https://mahjong-kosaki-gcr0.onrender.com">
                      https://mahjong-kosaki-gcr0.onrender.com
                    </a>
                  </Typography>
                </Box>

                <Typography>
                  Propriétaire : Association Kosaki - 20 bis rue de Reims -
                  93600 Aulnay-sous-Bois - asso.kosaki@gmail.com
                </Typography>

                <Typography>
                  Responsable de publication : Steven Taing -
                  taing.steven@outlook.fr - 06.51.78.31.50
                </Typography>

                <Typography>
                  Hébergement du site : Render - 525 Brannan St Suite 300, San
                  Francisco, CA 94107, États-Unis - 415-319-8186 -
                  support@render.com
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Conditions d&apos;utilisation
                </Typography>

                <Typography>
                  L&apos;utilisation du présent site implique l&apos;acceptation pleine et
                  entière des conditions générales d&apos;utilisation décrites
                  ci-après. Ces conditions d&apos;utilisation sont susceptibles
                  d&apos;être modifiées ou complétées à tout moment.
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" component={"h3"} fontWeight={600}>
                    Informations
                  </Typography>

                  <Typography>
                    Les informations et documents du site sont présentés à titre
                    indicatif, sans caractère exhaustif, et ne peuvent engager
                    la responsabilité du propriétaire du site.
                  </Typography>

                  <Typography>
                    Le propriétaire du site ne peut être tenu responsable des
                    dommages directs et indirects consécutifs à l&apos;accès au site.
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" component={"h3"} fontWeight={600}>
                    Interactivité
                  </Typography>

                  <Typography>
                    Les utilisateurs du site peuvent y déposer du contenu,
                    apparaissant sur le site dans des espaces dédiés (notamment
                    via les réservations). Le contenu déposé reste sous la
                    responsabilité de leurs auteurs, qui en assument pleinement
                    l&apos;entière responsabilité juridique.
                  </Typography>

                  <Typography>
                    Le propriétaire du site se réserve néanmoins le droit de
                    retirer sans préavis et sans justification tout contenu
                    déposé par les utilisateurs qui ne satisferait pas à la
                    charte déontologique du site ou à la législation en vigueur.
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" component={"h3"} fontWeight={600}>
                    Propriété intellectuelle
                  </Typography>

                  <Typography>
                    Sauf mention contraire, tous les éléments accessibles sur le
                    site (textes, images, graphismes, logo, icônes, sons,
                    logiciels, etc.) restent la propriété exclusive de leurs
                    auteurs, en ce qui concerne les droits de propriété
                    intellectuelle ou les droits d&apos;usage.
                  </Typography>

                  <Typography>
                    Toute reproduction, représentation, modification,
                    publication, adaptation de tout ou partie des éléments du
                    site, quel que soit le moyen ou le procédé utilisé, est
                    interdite, sauf autorisation écrite préalable de l&apos;auteur.
                  </Typography>

                  <Typography>
                    Toute exploitation non autorisée du site ou de l&apos;un
                    quelconque des éléments qu&apos;il contient est considérée comme
                    constitutive d&apos;une contrefaçon et passible de poursuites
                  </Typography>

                  <Typography>
                    Les marques et logos reproduits sur le site sont déposés par
                    les sociétés qui en sont propriétaires.
                  </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" component={"h3"} fontWeight={600}>
                    Liens
                  </Typography>

                  <Box>
                    <Typography fontWeight={600}>Liens sortants</Typography>
                    <Typography>
                      Le propriétaire du site décline toute responsabilité et
                      n&apos;est pas engagé par le référencement via des liens
                      hypertextes, de ressources tierces présentes sur le réseau
                      Internet, tant en ce qui concerne leur contenu que leur
                      pertinence.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontWeight={600}>Liens entrants</Typography>
                    <Typography>
                      Le propriétaire du site autorise les liens hypertextes
                      vers l&apos;une des pages de ce site, à condition que ceux-ci
                      ouvrent une nouvelle fenêtre et soient présentés de
                      manière non-équivoque afin d&apos;éviter :
                    </Typography>

                    <ul>
                      <li>
                        <Typography>
                          tout risque de confusion entre le site citant et le
                          propriétaire du site
                        </Typography>
                      </li>
                      <li>
                        <Typography>
                          ainsi que toute présentation tendancieuse, ou
                          contraire aux lois en vigueur.
                        </Typography>
                      </li>
                    </ul>

                    <Typography>
                      Le propriétaire du site se réserve le droit de demander la
                      suppression d&apos;un lien s&apos;il estime que le site source ne
                      respecte pas les règles ainsi définies.
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="h6" component={"h3"} fontWeight={600}>
                    Confidentialité
                  </Typography>

                  <Typography>
                    Tout utilisateur dispose d&apos;un droit d&apos;accès, de
                    rectification et d&apos;opposition aux données personnelles le
                    concernant, en effectuant sa demande écrite et signée,
                    accompagnée d&apos;une preuve d&apos;identité.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default LegalMentions;
