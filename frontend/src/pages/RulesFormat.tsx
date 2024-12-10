import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/RulesFormats.module.css";
import { useState } from "react";
import Rules from "../components/RulesFormatsContent/Rules";
import Formats from "../components/RulesFormatsContent/Formats";

function RulesFormat() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <Box sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Règles et Formats
      </Typography>
      <Box
        className={styles.rulesFormatsContainer}
        sx={{ marginTop: { xs: 1, md: 3 } }}
      >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={2}>
                <Button
                  onClick={() => setPageIndex(0)}
                  sx={
                    pageIndex === 0
                      ? { textDecoration: "underline", fontWeight: 600 }
                      : {}
                  }
                  color="inherit"
                >
                  Règles
                </Button>
                <Button
                  onClick={() => setPageIndex(1)}
                  sx={
                    pageIndex === 1
                      ? { textDecoration: "underline", fontWeight: 600 }
                      : {}
                  }
                  color="inherit"
                >
                  Formats
                </Button>
              </Box>

              {pageIndex === 0 ? <Rules /> : <Formats />}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default RulesFormat;
