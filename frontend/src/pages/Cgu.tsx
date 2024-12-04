import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/Cgu.module.css";

function Cgu() {
  return (
    <Box sx={{ width: { xs: "100%", md: 800 } }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Conditions Générales d’Utilisation
      </Typography>

      <Box className={styles.cguContainer} sx={{ marginTop: { xs: 1, md: 3 } }}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  1. Objet
                </Typography>

                <Typography>
                  Les présentes « conditions générales d'utilisation » ont pour
                  objet l'encadrement juridique des modalités de mise à
                  disposition des services du site Mahjong Kosaki et leur
                  utilisation par "l'Utilisateur".
                </Typography>

                <Typography>
                  Les conditions générales d'utilisation doivent être acceptées
                  par tout Utilisateur souhaitant accéder au site. Elles
                  constituent le contrat entre le site et l'Utilisateur. L'accès
                  au site par l'Utilisateur signifie son acceptation des
                  présentes conditions générales d'utilisation.
                </Typography>

                <Box>
                  <Typography>Éventuellement :</Typography>

                  <ul>
                    <li>
                      <Typography>
                        En cas de non-acceptation des conditions générales
                        d'utilisation stipulées dans le présent contrat,
                        l'Utilisateur se doit de renoncer à l'accès des services
                        proposés par le site.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Mahjong Kosaki se réserve le droit de modifier
                        unilatéralement et à tout moment le contenu des
                        présentes conditions générales d'utilisation.
                      </Typography>
                    </li>
                  </ul>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  2. Définitions
                </Typography>

                <Box>
                  <Typography>
                    La présente clause a pour objet de définir les différents
                    termes essentiels du contrat :
                  </Typography>

                  <ul>
                    <li>
                      <Typography>
                        Utilisateur : ce terme désigne toute personne qui
                        utilise le site ou l'un des services proposés par le
                        site.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Contenu utilisateur : ce sont les données transmises par
                        l'Utilisateur au sein du site.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Membre : l'Utilisateur devient membre lorsqu'il est
                        identifié sur le site.
                      </Typography>
                    </li>
                    <li>
                      <Typography>
                        Identifiant et mot de passe : c'est l'ensemble des
                        informations nécessaires à l'identification d'un
                        Utilisateur sur le site. L'identifiant et le mot de
                        passe permettent à l'Utilisateur d'accéder à des
                        services réservés aux membres du site. Le mot de passe
                        est confidentiel.
                      </Typography>
                    </li>
                  </ul>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  3. Accès aux services
                </Typography>

                <Typography>
                  Le site est accessible gratuitement en tout lieu à tout
                  Utilisateur ayant un accès à Internet. Tous les frais
                  supportés par l'Utilisateur pour accéder au service (matériel
                  informatique, logiciels, connexion Internet, etc.) sont à sa
                  charge.
                </Typography>

                <Typography>Selon le cas:</Typography>

                <Typography>
                  L'Utilisateur non membre n'a pas accès aux services réservés
                  aux membres. Pour cela, il doit s'identifier à l'aide de son
                  identifiant et de son mot de passe.
                </Typography>

                <Typography>
                  Le site met en œuvre tous les moyens mis à sa disposition pour
                  assurer un accès de qualité à ses services. L'obligation étant
                  de moyens, le site ne s'engage pas à atteindre ce résultat.
                </Typography>

                <Typography>
                  Tout événement dû à un cas de force majeure ayant pour
                  conséquence un dysfonctionnement du réseau ou du serveur
                  n'engage pas la responsabilité de Mahjong Kosaki.
                </Typography>

                <Typography>
                  L'accès aux services du site peut à tout moment faire l'objet
                  d'une interruption, d'une suspension, d'une modification sans
                  préavis pour une maintenance ou pour tout autre cas.
                  L'Utilisateur s'oblige à ne réclamer aucune indemnisation
                  suite à l'interruption, à la suspension ou à la modification
                  du présent contrat.
                </Typography>

                <Typography>
                  L'Utilisateur a la possibilité de contacter le site par
                  messagerie électronique à l'adresse asso.kosaki@gmail.com.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  4. Propriété intellectuelle
                </Typography>

                <Typography>
                  Les marques, logos, signes et tout autre contenu du site font
                  l'objet d'une protection par le Code de la propriété
                  intellectuelle et plus particulièrement par le droit d'auteur.
                </Typography>

                <Typography>
                  L'Utilisateur sollicite l'autorisation préalable du site pour
                  toute reproduction, publication, copie des différents
                  contenus.
                </Typography>

                <Typography>
                  L'Utilisateur s'engage à une utilisation des contenus du site
                  dans un cadre strictement privé. Une utilisation des contenus
                  à des fins commerciales est strictement interdite.
                </Typography>

                <Typography>
                  Tout contenu mis en ligne par l'Utilisateur est de sa seule
                  responsabilité. L'Utilisateur s'engage à ne pas mettre en
                  ligne de contenus pouvant porter atteinte aux intérêts de
                  tierces personnes. Tout recours en justice engagé par un tiers
                  lésé contre le site sera pris en charge par l'Utilisateur.
                </Typography>

                <Typography>
                  Le contenu de l'Utilisateur peut être à tout moment et pour
                  n'importe quelle raison supprimé ou modifié par le site.
                  L'Utilisateur ne reçoit aucune justification et notification
                  préalablement à la suppression ou à la modification du contenu
                  Utilisateur.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  5. Données personnelles
                </Typography>

                <Typography>
                  Les informations demandées à l'inscription au site sont
                  nécessaires et obligatoires pour la création du compte de
                  l'Utilisateur. En particulier, l'adresse électronique pourra
                  être utilisée par le site pour l'administration, la gestion et
                  l'animation du service.
                </Typography>

                <Typography>
                  Le site assure à l'Utilisateur une collecte et un traitement
                  d'informations personnelles dans le respect de la vie privée
                  conformément à la loi n°78-17 du 6 janvier 1978 relative à
                  l'informatique, aux fichiers et aux libertés.
                </Typography>

                <Box>
                  <Typography>
                    En vertu des articles 48 et suivants de la loi n° 78-17
                    relative à l'informatique, aux fichiers et aux libertés en
                    date du 6 janvier 1978, réécrite par l'ordonnance n°
                    2018-1125 du 12 décembre 2018 applicable au 1er juin 2019,
                    l'Utilisateur dispose d'un droit d'accès, de rectification,
                    de suppression et d'opposition de ses données personnelles.
                    L'Utilisateur exerce ce droit via :
                  </Typography>

                  <ul>
                    <li>
                      <Typography>son espace personnel</Typography>
                    </li>
                    <li>
                      <Typography>un formulaire de contact</Typography>
                    </li>
                    <li>
                      <Typography>par mail à asso.kosaki@gmail.com</Typography>
                    </li>
                    <li>
                      <Typography>
                        par voie postale au 20 bis rue de Reims - 93600
                        Aulnay-sous-Bois
                      </Typography>
                    </li>
                  </ul>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  6. Responsabilité et force majeure
                </Typography>

                <Typography>
                  Les sources des informations diffusées sur le site sont
                  réputées fiables. Toutefois, le site se réserve la faculté
                  d'une non-garantie de la fiabilité des sources. Les
                  informations données sur le site le sont à titre purement
                  informatif. Ainsi, l'Utilisateur assume seul l'entière
                  responsabilité de l'utilisation des informations et contenus
                  du présent site.
                </Typography>

                <Typography>
                  L'Utilisateur s'assure de garder son mot de passe secret.
                  Toute divulgation du mot de passe, quelle que soit sa forme,
                  est interdite.
                </Typography>

                <Typography>
                  L'Utilisateur assume les risques liés à l'utilisation de son
                  identifiant et mot de passe. Le site décline toute
                  responsabilité.
                </Typography>

                <Typography>
                  Tout usage du service par l'Utilisateur ayant directement ou
                  indirectement pour conséquence des dommages doit faire l'objet
                  d'une indemnisation au profit du site.
                </Typography>

                <Typography>
                  Une garantie optimale de la sécurité et de la confidentialité
                  des données transmises n'est pas assurée par le site.
                  Toutefois, le site s'engage à mettre en œuvre tous les moyens
                  nécessaires afin de garantir au mieux la sécurité et la
                  confidentialité des données.
                </Typography>

                <Typography>
                  La responsabilité du site ne peut être engagée en cas de force
                  majeure ou du fait imprévisible et insurmontable d'un tiers.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  7. Liens hypertextes
                </Typography>

                <Typography>
                  De nombreux liens hypertextes sortants sont présents sur le
                  site, cependant les pages web où mènent ces liens n'engagent
                  en rien la responsabilité de Mahjong Kosaki qui n'a pas le
                  contrôle de ces liens.
                </Typography>

                <Typography>
                  L'Utilisateur s'interdit donc à engager la responsabilité du
                  site concernant le contenu et les ressources relatives à ces
                  liens hypertextes sortants.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  8. Évolution du contrat
                </Typography>

                <Typography>
                  Le site se réserve à tout moment le droit de modifier les
                  clauses stipulées dans le présent contrat.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  9. Durée
                </Typography>

                <Typography>
                  La durée du présent contrat est indéterminée. Le contrat
                  produit ses effets à l'égard de l'Utilisateur à compter de
                  l'utilisation du service.
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  10. Publication par l'Utilisateur
                </Typography>

                <Typography>
                  Le site permet aux membres de faire des réservations.
                </Typography>

                <Typography>
                  Dans ses publications, le membre s'engage à respecter les
                  règles de la Netiquette et les règles de droit en vigueur.
                </Typography>

                <Typography>
                  Le site exerce une modération a posteriori sur les
                  publications et se réserve le droit de refuser leur mise en
                  ligne, sans avoir à s'en justifier auprès du membre.
                </Typography>

                <Typography>
                  Le membre reste titulaire de l'intégralité de ses droits de
                  propriété intellectuelle. Mais en publiant une publication sur
                  le site, il cède à la société éditrice le droit non exclusif
                  et gratuit de représenter, reproduire, adapter, modifier,
                  diffuser et distribuer sa publication, directement ou par un
                  tiers autorisé, dans le monde entier, sur tout support
                  (numérique ou physique), pour la durée de la propriété
                  intellectuelle. Le Membre cède notamment le droit d'utiliser
                  sa publication sur internet et sur les réseaux de téléphonie
                  mobile.
                </Typography>

                <Typography>
                  La société éditrice s'engage à faire figurer le nom du membre
                  à proximité de chaque utilisation de sa publication.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Cgu;
