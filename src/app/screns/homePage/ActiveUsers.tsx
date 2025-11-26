import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { serverApi } from "../../../lib/config";
import { User } from "../../../lib/types/user";
import MemberService from "../../services/MemberService";

export default function ActiveUsers() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const memberService = new MemberService();
        const users = await memberService.getTopUsers(); // ensure this API exists
        setTopUsers(users || []);
      } catch (err) {
        console.error("Error fetching top users:", err);
        setError("Failed to load active users");
        setTopUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <Box>Loading top users...</Box>;
  if (error) return <Box className="no-data">{error}</Box>;
  if (!topUsers || topUsers.length === 0)
    return <Box className="no-data">No Active Users!</Box>;

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className={"active-section"}>
          <Box className={"active-category-title"}>Active Users</Box>
          <Stack
            className={"active-users-cards-frame"}
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            <CssVarsProvider>
              {topUsers.map((user: User) => {
                // Handle missing images and backslashes
                const imagePath = user.userImage
                  ? `${serverApi}/${user.userImage.replace(/\\/g, "/")}`
                  : "/icons/default-user.svg"; // fallback avatar

                return (
                  <Card
                    key={user._id}
                    variant="outlined"
                    className={"active-card"}
                    sx={{ width: 150 }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={1}>
                        <img src={imagePath} alt={user.userNick} />
                      </AspectRatio>
                    </CardOverflow>
                    <CardOverflow variant="soft" className={"users-detail"}>
                      <Stack
                        className={"info"}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography className={"users-title"}>
                          {user.userNick}
                        </Typography>
                      </Stack>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
