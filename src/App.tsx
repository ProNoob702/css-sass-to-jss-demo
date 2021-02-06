import * as React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { Button, Divider, Typography } from "@material-ui/core";
import clsx from "clsx";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useStyles } from "./App.styles";
import cssToJss from "custom-jss-cli";

const langs: string[] = ["css"];

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const selectedlang = langs[0];
  const [input, setInput] = React.useState<string | undefined>();
  const [output, setOutput] = React.useState<string | undefined>();
  const onInputChange = (value: string) => {
    setInput(value);
  };
  const handleConvert = () => {
    const materialUICode = cssToJss({
      code: input,
      isSass: selectedlang === "sass",
      unit: undefined,
      dashes: undefined,
    });
    setOutput(materialUICode);
  };
  return (
    <div className={clsx(classes.flexColumn, classes.root)}>
      <div className={clsx(classes.flexColumn, classes.header)}>
        <Typography variant="h3" className={classes.headerTxt}>
          𝘾𝙎𝙎 𝙏Ø 𝙅𝙎𝙎
        </Typography>
      </div>
      <div className={clsx("flexStartCenterRow", classes.editorsZone)}>
        <EditorsZone
          onInputChange={onInputChange}
          handleConvert={handleConvert}
          selectedlang={selectedlang}
          input={input}
          output={output}
        />
      </div>
    </div>
  );
};

const EditorsZone: React.FC<{
  onInputChange: (value: string) => void;
  handleConvert: () => void;
  selectedlang: string;
  input: string | undefined;
  output: string | undefined;
}> = ({ onInputChange, handleConvert, selectedlang, input, output }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.editorWrapper}>
        <AceEditor
          className={classes.editor}
          placeholder="Enter code here"
          mode={selectedlang}
          theme="monokai"
          name="input"
          onChange={onInputChange}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={input}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      <div className={clsx(classes.flexCenterRow, classes.convertBtn)}>
        <Button variant="contained" color="default" onClick={handleConvert}>
          <strong className="white">Convert</strong>
        </Button>
      </div>
      <div className={classes.editorWrapper}>
        <AceEditor
          className={classes.editor}
          mode="javascript"
          theme="monokai"
          name="output"
          onChange={() => {}}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={output}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </>
  );
};

export default App;
