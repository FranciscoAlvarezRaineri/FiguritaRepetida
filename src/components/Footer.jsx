import { Box, Grid, Typography, Stack, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import img from "../utils/fr_logo.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 3,
        mt: "10%",
        background: "#F6AA38",
      }}
    >
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <a href="/">
                <img src={img} height="150px" width="250px" alt="logo"></img>
              </a>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" color="#B21515">
                Navega por nuestro sitio
              </Typography>
              <Link href="/register" color="inherit">
                <Typography>Registrate</Typography>
              </Link>
              <Link href="/login" color="inherit">
                <Typography>Inicia sesion</Typography>
              </Link>
              <Link href="/" color="inherit">
                <Typography>Inicio</Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" color="#B21515">
                Sobre nosotros
              </Typography>
              <a>
                Somos <a href="/">Figurita Repetida &reg;</a> el primer
                ecommerce de venta figuritas del mundial de 2022 en Argentina y
                Uruguay. Este sitio es solo un ejercicio, ninguna figurita puede
                ser comprada y nunca te pedirá datos reales.
              </a>
            </Stack>
          </Grid>
          <Grid item xs={5} md={3}>
            <Stack spacing={1}>
              <Typography variant="h6" color="#B21515">
                Nuestras redes sociales
              </Typography>
              <Link
                href="https://m.facebook.com/PlataformaCinco/?locale2=en_GB"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <FacebookIcon sx={{ color: "#B21515", fontSize: 30 }}>
                    {" "}
                  </FacebookIcon>
                  FACEBOOK
                </Typography>
              </Link>
              <Link
                href="https://github.com/FranciscoAlvarezRaineri/FiguritaRepetida"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <GitHubIcon
                    sx={{ color: "#B21515", fontSize: 30 }}
                  ></GitHubIcon>
                  GITHUB
                </Typography>
              </Link>
              <Link
                href="https://www.instagram.com/plataforma5/?hl=es"
                underline="none"
                color="inherit"
                target="_blank"
              >
                <Typography>
                  <InstagramIcon
                    sx={{ color: "#B21515", fontSize: 30 }}
                  ></InstagramIcon>{" "}
                  INSTAGRAM
                </Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        textAlign="center"
        pl={{ xs: 10, sm: 1 }}
        pb={{ xs: 10, sm: 1 }}
        mt="20px"
      >
        Figurita Repetida &reg; {new Date().getFullYear()}
      </Box>
    </Box>
  );
};

export default Footer;
