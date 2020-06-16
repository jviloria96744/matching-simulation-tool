import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  Slide,
  Zoom,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const MarriageAvatar = ({ person, proposer }) => {
  return (
    <Slide direction="up" in>
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
                style={{ color: proposer ? "#f50057" : "#3f50b5" }}
              />
            )
          }
        >
          <Avatar
            variant="circle"
            style={{
              height: "10vh",
              width: "10vw",
              backgroundColor: proposer ? "#3f50b5" : "#f50057",
            }}
          >
            {person.name}
          </Avatar>
        </Badge>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "1.5vh" }}
        >
          {person.preferences.map((pref) => {
            return pref === person.match ? (
              <strong>{pref}, </strong>
            ) : (
              `${pref}, `
            );
          })}
        </Typography>

        {person.matchMessage.length > 0 && (
          <Zoom in>
            <Alert severity="info">{person.matchMessage}</Alert>
          </Zoom>
        )}
      </Grid>
    </Slide>
  );
};

MarriageAvatar.propTypes = {
  person: PropTypes.object.isRequired,
  proposer: PropTypes.bool.isRequired,
};

export default MarriageAvatar;
