import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import EditProfileForm from "../components/EditProfileForm";

function UserProfilePage() {
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  const { currentUser, isLoading } = useSelector((state) => state.user);
  let name, email, avatarUrl;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  // console.log("currentUser:", currentUser);
  if (currentUser) {
    name = currentUser.name;
    email = currentUser.email;
    avatarUrl = currentUser.avatarUrl;
  }

  // to save for refresh

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      UserProfilePage
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Avatar: {avatarUrl}</div>
      <div>
        <button onClick={() => setIsProfileEdit(true)}>Edit</button>
        {isProfileEdit && (
          <EditProfileForm
            isProfileEdit={isProfileEdit}
            setIsProfileEdit={setIsProfileEdit}
          />
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
