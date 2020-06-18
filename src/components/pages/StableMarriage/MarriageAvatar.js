import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Typography,
  Badge,
  Slide,
  Zoom,
  Icon,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FavoriteIcon from "@material-ui/icons/Favorite";
//import MarriageContext from "../../../context/marriage/marriageContext";
import "./StableMarriage.css";

export const MarriageAvatar = ({ person, proposer }) => {
  //const marriageContext = useContext(MarriageContext);
  //const { setAvatarClass, clearAvatarClass } = marriageContext;

  return (
    <Slide direction="up" in>
      <div style={{ paddingTop: "1vh" }}>
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
            style={{
              height: "80px",
              width: "80px",
              backgroundColor: proposer ? "#3f50b5" : "#f50057",
            }}
            className={person.className}
            //onMouseEnter={() => setAvatarClass(person.name, person.match)}
            //onMouseLeave={() => clearAvatarClass()}
          >
            {/* {person.name} */}
            <Icon
              style={{ textAlign: "center", height: "60px", width: "60px" }}
            >
              <img
                alt=""
                src={person.avatarUrl}
                style={{ height: "100%", width: "100%" }}
              />
            </Icon>
          </Avatar>
        </Badge>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "1.5vh" }}
        >
          {person.name}
        </Typography>

        {person.matchMessage.length > 0 && (
          <Zoom in>
            <Alert severity="info">{person.matchMessage}</Alert>
          </Zoom>
        )}
      </div>
    </Slide>
  );
};

MarriageAvatar.propTypes = {
  person: PropTypes.object.isRequired,
  proposer: PropTypes.bool.isRequired,
};

export default MarriageAvatar;
