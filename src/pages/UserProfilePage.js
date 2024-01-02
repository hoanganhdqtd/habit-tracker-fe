import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import EditProfileForm from "../components/EditProfileForm";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Avatar,
  Typography,
  Container,
  Stack,
  Tooltip,
} from "@mui/material";

function UserProfilePage() {
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);

  const { currentUser, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  // console.log("currentUser:", currentUser);
  const name = currentUser.name || "";
  const email = currentUser.email || "";
  const avatarUrl = currentUser.avatarUrl || "";
  const password = currentUser.password || "";

  // const { name, email, avatarUrl } = currentUser;

  // to save for refresh

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Tooltip title="Click to change avatar" arrow>
                          <Avatar
                            src={avatarUrl}
                            sx={{
                              height: 80,
                              mb: 2,
                              width: 80,
                            }}
                            onClick={() => {
                              setIsUploadAvatar(true);
                              setIsProfileEdit(true);
                            }}
                          />
                        </Tooltip>

                        <Typography gutterBottom variant="h5">
                          {name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {email}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <Card>
                    <CardHeader title="Profile" />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                          <Grid>
                            <TextField
                              fullWidth
                              label="Name"
                              name="name"
                              required
                              value={name}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              required
                              value={email}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              fullWidth
                              label="Password"
                              name="password"
                              type="password"
                              required
                              value={password}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              fullWidth
                              label="Avatar"
                              name="avatarUrl"
                              required
                              value={avatarUrl}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Tooltip title="Click to edit profile" arrow>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setIsProfileEdit(true)}
                        >
                          Edit Profile
                        </Button>
                      </Tooltip>

                      <Tooltip title="Back to the previous page" arrow>
                        <Button
                          color="success"
                          variant="outlined"
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </Button>
                      </Tooltip>

                      {(isProfileEdit || isUploadAvatar) && (
                        <EditProfileForm
                          isProfileEdit={isProfileEdit}
                          setIsProfileEdit={setIsProfileEdit}
                          isUploadAvatar={isUploadAvatar}
                          setIsUploadAvatar={setIsUploadAvatar}
                        />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default UserProfilePage;
