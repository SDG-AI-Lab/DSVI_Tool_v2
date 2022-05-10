import React from "react";
import { useCallback, useReducer } from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from "immer";

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
});

const dragReducer = produce((draft, action) => {
    switch (action.type) {
    case "MOVE": {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      }
      break;
    default: break;
    }
});

const visibleLayers = [];
const socioeconomicLayers = ["Relative Wealth: District", "GDP / PPP", "Health Care Institutions", "SV: Ground Truth", "Financial Institutions", "Population Density", "Educational Facilities", "Population Density Mask", "Built Environment", "Disaster Count"];
const geodataLayers = ["Distance to Waterway", "Distance to Healthcare", "Distance to Coast", "Distance to Finance", "Elevation", "Plant Health"];

export default function MapDrawerContent() {

    const [state, dispatch] = useReducer(dragReducer, {
        items: visibleLayers,
        items2: socioeconomicLayers,
        items3: geodataLayers,
    });

    const onDragEnd = useCallback((result) => {
        if (result.reason === "DROP") {
          if (!result.destination) {
            return;
          }
          dispatch({
            type: "MOVE",
            from: result.source.droppableId,
            to: result.destination.droppableId,
            fromIndex: result.source.index,
            toIndex: result.destination.index,
          });
        }
    }, []);

    return (
        <div className="drawercontent">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items" type="ITEM">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Divider>
                            Visible Layers
                        </Divider>
                        <MapDrawerList items={state.items} provided={provided}/>
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="items2" type="ITEM">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Divider>
                            Socioeconomic Layers
                        </Divider>
                        <MapDrawerList items={state.items2} provided={provided}/>
                        </div>
                    )} 
                </Droppable>
                <Droppable droppableId="items3" type="ITEM">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Divider>
                            Geodata Layers
                        </Divider>
                        <MapDrawerList items={state.items3} provided={provided}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
    
}

class DrawerListItem extends React.Component {
    //handleClick(i) { }

    render() {
        return (
            <ListItem button key={this.props.name}
                ref={this.props.provided.innerRef}
                {...this.props.provided.draggableProps}
                {...this.props.provided.dragHandleProps}
                style={getItemStyle(
                    this.props.snapshot.isDragging,
                    this.props.provided.draggableProps.style
                )}
                >
                <ListItemIcon>
                    <DragHandleIcon/>
                </ListItemIcon>
                <ListItemText primary={this.props.name}/>
            </ListItem>
        );
    }
}


class MapDrawerList extends React.Component {

    render() {
        return (
            <List>
                {this.props.items.map((text, index) => (
                    <Draggable key={text} draggableId={text} index={index}>
                        {(provided, snapshot) => (
                            <div>
                                <DrawerListItem name={text} provided={provided} snapshot={snapshot}/>
                            </div>
                        )}
                    </Draggable>
                ))}
                {this.props.provided.placeholder}
            </List>
        );
    }
}