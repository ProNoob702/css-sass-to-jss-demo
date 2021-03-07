import * as React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import { Button, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "../App.styles";
import { cssToJss } from "css-to-jss-lib";
import { useSnackbar } from "notistack";

const selectedlang = "css";
const exampleCode = `.tesla {
  margin: 0;
  overflow-x:hidden;
  height: 100vh;
  width: 100vw;
}

#beta {
  height: 100%;
  width: 100%;
  padding-left: 16px;
  display:flex;
}
`;

export const CssToJssExample: React.FC<{}> = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [input, setInput] = React.useState<string | undefined>(exampleCode);
  const [output, setOutput] = React.useState<string | undefined>();
  const onInputChange = (value: string) => {
    setInput(value);
  };
  const handleConvert = () => {
    closeSnackbar();
    try {
      const materialUICode = cssToJss({
        code: input,
        unit: undefined,
        dashes: undefined,
      });
      setOutput(materialUICode);
    } catch (err) {
      handleError(err);
    }
  };
  const handleError = (errorInfo: string) => {
    enqueueSnackbar(`${errorInfo}`, {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "right" },
      preventDuplicate: true,
      autoHideDuration: 7000,
    });
  };
  return (
    <React.Fragment>
      <div className={clsx(classes.flexColumn, classes.header)}>
        <Typography variant="h3" className={classes.headerTxt}>
          𝘾𝙎𝙎 𝙏Ø 𝙅𝙎𝙎
        </Typography>
      </div>
      <div className={clsx(classes.flexStartCenterRow, classes.editorsZone)}>
        <EditorsZone
          onInputChange={onInputChange}
          handleConvert={handleConvert}
          selectedlang={selectedlang}
          input={input}
          output={output}
        />
      </div>
    </React.Fragment>
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
          theme="solarized_dark"
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
          theme="solarized_dark"
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
