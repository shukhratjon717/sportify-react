import React from "react";
import { Box, Container, Stack, Typography, IconButton, Link as MuiLink, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

export default function Footer() {
  const authMember = null;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        color: "text.secondary",
        py: 8,
        borderTop: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 8,
            fontWeight: 700,
            background: "linear-gradient(45deg, #2c3e50 30%, #2ecc71 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Let's enjoy shopping
        </Typography>

        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <img src="/img/Sportify.png" alt="Sportify" style={{ height: 40, borderRadius: 8 }} />
            </Box>
            <Typography variant="body2" sx={{ mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
              Sportify is your go-to online store for all things brand clothes.
              From top to bottom, find top-quality products for every activity.
              With easy browsing, secure payments, and fast shipping, we've got
              your needs covered.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
              Trending
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink component={Link} to="/" color="inherit" underline="hover">
                Men's
              </MuiLink>
              <MuiLink component={Link} to="/products" color="inherit" underline="hover">
                Style
              </MuiLink>
              {authMember && (
                <MuiLink component={Link} to="/orders" color="inherit" underline="hover">
                  Orders
                </MuiLink>
              )}
              <MuiLink component={Link} to="/help" color="inherit" underline="hover">
                Fashion
              </MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
              Women's Fashion
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink href="#" color="inherit" underline="hover">
                Collaborate with us
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Designers welcome
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Join our team
              </MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
              Fashion Tips
            </Typography>
            <Stack spacing={1.5}>
              <MuiLink href="#" color="inherit" underline="hover">
                Gift ideas
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                New arrivals
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Exclusive deals
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: "1px solid rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Sportify. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
