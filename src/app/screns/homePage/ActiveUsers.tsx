import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { User } from "../../../lib/types/user";

const topUsersRetriver = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));


export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriver);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className={"active-section"}>
          <Box className={"active-category-title"}>Active Users </Box>
          <Stack className={"active-users-cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((user:User) => {
                  const imagePath = `${serverApi}/${user.userImage}`;
                  return (
                    <Card
                      key={user._id}
                      variant="outlined"
                      className={"active-card"}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow variant="soft" className={"users-detail"}>
                        <Stack className={"info"}>
                          <Stack flexDirection={"row"}>
                            <Typography className={"users-title"}>
                              {user.userNick}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
