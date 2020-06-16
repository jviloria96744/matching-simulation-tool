import React, { useContext } from "react";
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
import MarriageContext from "../../../context/marriage/marriageContext";
import "./StableMarriage.css";

export const MarriageAvatar = ({ person, proposer }) => {
  const marriageContext = useContext(MarriageContext);
  const { setAvatarClass, clearAvatarClass } = marriageContext;

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
            className={person.className}
            onMouseEnter={() => setAvatarClass(person.name, person.match)}
            onMouseLeave={() => clearAvatarClass()}
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
