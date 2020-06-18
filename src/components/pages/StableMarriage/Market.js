import React, { useContext } from "react";
import { Grid, Divider, Paper, Typography } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MarriageAvatar from "./MarriageAvatar";
import MarriageContext from "../../../context/marriage/marriageContext";

const getItemStyle = (isDragging, draggableStyle) => ({
  margin: "5px",
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

const getMarketCardStyle = () => ({
  marginBottom: "10px",
  marginLeft: "10px",
  marginRight: "10px",
  textAlign: "center",
});

const Market = () => {
  const marriageContext = useContext(MarriageContext);
  const { market, algoProposer, updatePreferences } = marriageContext;

  const onDragEnd = ({ source, destination }) => {
    //console.log(result);
    //console.log(market);
    if (!destination) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newPrefs = [
      ...market.find((person) => person.name === destination.droppableId)
        .preferences,
    ];

    newPrefs.splice(destination.index, 0, newPrefs.splice(source.index, 1)[0]);
    //console.log(newPrefs);

    updatePreferences(destination.droppableId, newPrefs);
  };

  const acceptableAvatars = (prefs, gender, personName) => {
    return prefs.map((pref, index) => {
      const otherSide = gender === algoProposer ? suitees : suitors;
      const prefObject = otherSide.find((person) => person.name === pref);
      return (
        <Draggable
          key={pref}
          index={index}
          draggableId={`${personName}-${pref}`}
        >
          {(provided, snapshot) => {
            return (
              <Paper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <MarriageAvatar
                  person={prefObject}
                  proposer={prefObject.gender === algoProposer}
                />
              </Paper>
            );
          }}
        </Draggable>
      );
    });
  };

  const marketCards = (group) => {
    return group.map((person) => {
      return (
        <Grid item xs={3} key={person.name}>
          <Paper elevation={3} style={getMarketCardStyle()}>
            <MarriageAvatar
              person={person}
              proposer={person.gender === algoProposer}
            />
            <Divider />
            <Droppable droppableId={person.name} key={person.name}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    // style={{
                    //   background: snapshot.isDraggingOver
                    //     ? "lightblue"
                    //     : "lightgrey",
                    // }}
                    {...provided.droppableProps}
                  >
                    {acceptableAvatars(
                      person.preferences,
                      person.gender,
                      person.name
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </Paper>
        </Grid>
      );
    });
  };

  const suitors = market.filter((person) => person.gender === algoProposer);
  const suitees = market.filter((person) => person.gender !== algoProposer);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" style={{ marginBottom: "3vh" }} align="left">
            Men
          </Typography>
        </Grid>
        {marketCards(suitors)}
        <Grid item xs={12}>
          <Divider />
          <Typography variant="h3" style={{ marginBottom: "3vh" }} align="left">
            Women
          </Typography>
        </Grid>
        {marketCards(suitees)}
      </Grid>
    </DragDropContext>
  );
};

export default Market;
