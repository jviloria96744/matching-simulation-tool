import React from "react";
import { Grid, Avatar, Typography, Badge } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const MarriageAvatar = ({ person, gender }) => {
  return (
    <Grid item xs={4} align="center">
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          person.match && (
            <FavoriteIcon
              style={{ color: gender === "male" ? "#f50057" : "#3f50b5" }}
            />
          )
        }
      >
        <Avatar
          variant="circle"
          style={{
            height: "10vh",
            width: "10vw",
            backgroundColor: gender === "male" ? "#3f50b5" : "#f50057",
          }}
        >
          {person.name}
        </Avatar>
      </Badge>
      <Typography variant="body1" align="center" style={{ marginTop: "1.5vh" }}>
        {person.preferences.join(" > ")}
      </Typography>
    </Grid>
  );
};

export default MarriageAvatar;
