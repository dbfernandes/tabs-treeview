import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NodeModel, useDragOver } from "@minoru/react-dnd-treeview";
import { CustomData } from "./types";
import { TypeIcon } from "./TypeIcon";
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "auto auto 1fr auto",
    height: 32,
    paddingInlineEnd: 8,
  },  
  expandIconWrapper: {
    alignItems: "center",
    fontSize: 0,
    cursor: "pointer",
    display: "flex",
    height: 24,
    justifyContent: "center",
    width: 24,
    transition: "transform linear 0.1s",
    transform: "rotate(0deg)",
  },
  isOpen: {
      transform: "rotate(90deg)",
  },  
  labelGridItem: {
    paddingInlineStart: 8,
  }
  
}));

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${classes.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div className={`${classes.expandIconWrapper} ${props.isOpen ? classes.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={classes.labelGridItem}>
        <Typography variant="body2">
          {props.node.text}
        </Typography>
      </div>
    </div>
  );
};
