import React, { useState } from "react";
import {
  Tree,
  NodeModel,
  DragLayerMonitorProps,
} from "@minoru/react-dnd-treeview";
import { CustomData } from "./types";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import SampleData10 from "./sample_data10.json";
import SampleData20 from "./sample_data20.json";
import SampleData30 from "./sample_data30.json";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    height: "100%",
    "& ul": {
      listStyle: "none",
    },
    "& *": {
      margin: 0,
      padding: 0,
    },
  },
  treeRoot: {
    height: "100%",
  },
  draggingSource: {
    opacity: ".3",
  },
  dropTarget: {
    backgroundColor: "#e8f0fe",
  },
}));

type Props = {
  data: number;
};

const TreeView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const SampleData =
    props.data === 10
      ? SampleData10
      : props.data === 20
      ? SampleData20
      : SampleData30;
  const [treeData, setTreeData] = useState<NodeModel[]>(SampleData);
  const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);

  return (
    <div className={classes.app}>
      <Tree
        tree={treeData}
        rootId={props.data}
        render={(node: NodeModel<CustomData>, { depth, isOpen, onToggle }) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        )}
        dragPreviewRender={(
          monitorProps: DragLayerMonitorProps<CustomData>
        ) => <CustomDragPreview monitorProps={monitorProps} />}
        onDrop={handleDrop}
        classes={{
          root: classes.treeRoot,
          draggingSource: classes.draggingSource,
          dropTarget: classes.dropTarget,
        }}
        initialOpen={true}
      />
    </div>
  );
};

export default TreeView;
