import React from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
});

const visibleLayers = [];
const socioeconomicLayers = ["Relative Wealth: District", "GDP / PPP", "Health Care Institutions", "SV: Ground Truth", "Financial Institutions", "Population Density", "Educational Facilities", "Population Density Mask", "Built Environment", "Disaster Count"];
const geodataLayers = ["Distance to Waterway", "Distance to Healthcare", "Distance to Coast", "Distance to Finance", "Elevation", "Plant Health"];

export default class MapDrawerContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: visibleLayers.concat(socioeconomicLayers, geodataLayers)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
    }

    render() {
        return (
        <div className="drawercontent">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" type="ITEM">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Divider>
                            Visible Layers
                        </Divider>
                        <MapDrawerList items={visibleLayers} provided={provided}/>
                        <Divider>
                            Socioeconomic Layers
                        </Divider>
                        <MapDrawerList items={socioeconomicLayers} provided={provided}/>
                        <Divider>
                            Geodata Layers
                        </Divider>
                        <MapDrawerList items={geodataLayers} provided={provided}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        );
    }
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
                            <div
                            // ref={provided.innerRef}
                            // {...provided.draggableProps}
                            // {...provided.draggableProps}
                            >
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