import { SubscriptionFormData } from "../../interfaces/subscriptions";
import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import logo from "../../assets/logo.png";
import { Typography } from "@mui/material";

type PDFStepProps = {
  subscription: SubscriptionFormData;
};

function PDFStep(props: PDFStepProps) {
  const { subscription } = props;
  const year = dayjs().year();

  return (
    <>
      <Typography variant="h5" component={"p"} sx={{ marginBottom: 2 }}>
        Pensez à télécharger ou imprimer le bulletin d&apos;adhésion
      </Typography>
      <PDFViewer style={styles.viewer}>
        <Document title={`Adhésion Kosaki ${year}-${year + 1}`}>
          <Page size="A4" style={styles.page}>
            <View style={styles.title}>
              <Text>
                Bulletin d&apos;adhésion à Kosaki {year}-{year + 1}
              </Text>
            </View>

            <Image style={styles.logo} src={logo} cache />

            <View style={styles.sectionParent}>
              <View style={styles.subSection}>
                <Text>Nom :</Text>
                <Text style={styles.textfield}>{subscription.lastname}</Text>
              </View>
              <View style={styles.subSection}>
                <Text>Prénom :</Text>
                <Text style={styles.textfield}>{subscription.firstname}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text>Numéro EMA (si réadhésion) :</Text>
              <Text style={styles.shortTextfield}>
                {subscription.EMANumber}
              </Text>
            </View>

            <View style={styles.section}>
              <Text>Date de naissance :</Text>
              <Text style={styles.shortTextfield}>
                {new Date(subscription.birthdate).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text>Adresse :</Text>
              <Text style={styles.textfield}>{subscription.address}</Text>
            </View>

            <View style={styles.sectionParent}>
              <View style={styles.subSection}>
                <Text>Code postal :</Text>
                <Text style={styles.textfield}>{subscription.postalCode}</Text>
              </View>
              <View style={styles.subSection}>
                <Text>Ville :</Text>
                <Text style={styles.textfield}>{subscription.city}</Text>
              </View>
            </View>

            <View style={styles.sectionParent}>
              <View style={styles.subSection}>
                <Text>Téléphone :</Text>
                <Text style={styles.textfield}>{subscription.phone}</Text>
              </View>
              <View style={styles.subSection}>
                <Text>Courriel :</Text>
                <Text style={styles.textfield}>{subscription.email}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text>
                J&apos;autorise Kosaki à me photographier et à me filmer, à
                titre gracieux, ainsi que de publier et diffuser les
                photographies et films, à titre gratuit, dans le cadre strict de
                l&apos;objet de l&apos;assocation. Ces publications et
                diffusions ne devront pas porter atteinte à ma vie privée, ma
                dignité, ni ma réputation.
              </Text>
            </View>

            <View style={styles.section}>
              <Text>
                En vertu de la loi N°78-17 du 6 janvier 1978 relative à
                l&apos;informatique, aux fichiers et aux libertés, Kosaki
                s&apos;engage à ne pas utiliser les informations de
                l&apos;adhérent à des fins commerciales. Ce dernier dispose
                également d&apos;un droit de regard et de rectification sur les
                informations le concernant.
              </Text>
            </View>

            <View style={styles.section}>
              <Text>
                Le montant de la cotisation est de 10 €, plus 10 € avec
                l&apos;affiliation à la FFMJ.
              </Text>
            </View>

            <View style={styles.section}>
              <Text>Fait à</Text>
              <Text style={styles.shortTextfield}></Text>
              <Text>, le {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.section}>
              <Text>Signature de l&apos;adhérent</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.footer}>
              <Text style={styles.bold}>
                Bulletin d&apos;adhésion à envoyer à Kosaki :
              </Text>
              <Text>
                20 bis rue de Reims - 93600 Aulnay-sous-Bois ou
                asso.kosaki@gmail.com
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}

Font.register({
  family: "Dosis",
  src: `http://fonts.gstatic.com/s/dosis/v6/guC5lwT5Dw7anV_xfpCGqw.ttf`,
});

const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    fontFamily: "Dosis",
    margin: 0,
    padding: 20,
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 62,
  },
  title: {
    width: "40%",
    marginBottom: 20,
    padding: 6,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(33,150,243,0.08)",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgb(33,150,243)",
  },
  section: {
    flexDirection: "row",
    width: "100%",
    margin: "10 0",
  },
  sectionParent: {
    flexDirection: "row",
    width: "100%",
    margin: "10 0",
  },
  subSection: {
    flexDirection: "row",
    width: "50%",
  },
  textfield: {
    borderBottomWidth: 1,
    flexGrow: 1,
    margin: "0 10",
  },
  shortTextfield: {
    borderBottomWidth: 1,
    flexGrow: 1,
    maxWidth: 100,
    margin: "0 10",
  },
  dateTextField: {
    borderBottomWidth: 1,
    flexShrink: 1,
    maxWidth: 100,
    margin: "0 10",
  },
  viewer: {
    width: "100%",
    height: 660,
  },
  spacer: {
    flexGrow: 1,
  },
  footer: {
    width: 320,
    textAlign: "center",
  },
  bold: {
    fontWeight: 700,
  },
});

export default PDFStep;
