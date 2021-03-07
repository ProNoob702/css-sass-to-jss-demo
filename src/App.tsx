import * as React from "react";
import clsx from "clsx";
import { useStyles } from "./App.styles";
import { CssToJssExample } from "./components/cssToJssExample";
import { JsonToCssExample } from "./components/jssToSassExample";
import { NavigationItems, NavigationPanel } from "./components/navigation";

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [selectedCase, setSelectedCase] = React.useState<string>(
    NavigationItems.CSSTOJSS
  );
  const onClickPanelItem = (clickedItemId: string) => {
    setSelectedCase(clickedItemId);
  };
  return (
    <div className={clsx(classes.root)}>
      <NavigationPanel panelItemClicked={onClickPanelItem} />
      <div className={clsx(classes.flexColumn, classes.examples)}>
        <RenderCase selectedCase={selectedCase} />
      </div>
    </div>
  );
};

const RenderCase: React.FC<{ selectedCase: string }> = ({ selectedCase }) => {
  switch (selectedCase) {
    case NavigationItems.CSSTOJSS:
      return <CssToJssExample />;
    case NavigationItems.JSSTOCSS:
      return <JsonToCssExample />;
    default:
      return <CssToJssExample />;
  }
};

export default App;
