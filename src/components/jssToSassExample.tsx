import * as React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";
import { Button, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "../App.styles";
import { jssToCss } from "css-to-jss-lib";
import { useSnackbar } from "notistack";

const selectedlang = "json";
const exampleCode = `{
  cardViewContent: {
    flexGrow: 1,
    overflow: "hidden",
    "itemsCount": {
      marginLeft: 8,
      fontSize: 13
    },
    "cardBox": {
      width: 300,
      maxWidth: 300,
      marginBottom: 8,
      fontSize: 13,
      "fullCoverWithBorder": {
        padding: "10px 10px 10px 10px"
      },
      "cardPadding": {
        padding: "0px 8px",
        marginBottom: 8
      }
    }
  }
}
`;

export const JsonToCssExample: React.FC<{}> = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [input, setInput] = React.useState<string | undefined>(exampleCode);
  const [output, setOutput] = React.useState<string | undefined>();
  const onInputChange = (value: string) => {
    setInput(value);
  };
  const handleConvert = () => {
    closeSnackbar();
    let json;
    try {
      json = JSON.parse(input);
    } catch (err) {
      try {
        const correctJson = input.replace(
          /(['"])?([a-z0-9A-Z_]+)(['"])?:/g,
          '"$2": '
        );
        json = JSON.parse(correctJson);
      } catch (err) {
        handleError(err);
      }
    }
    try {
      const cssString = jssToCss(json);
      setOutput(cssString);
    } catch (err) {
      handleError(err);
    }
  };
  const handleError = (errorInfo: string) => {
    console.error(errorInfo);
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
          𝙅𝙎𝙎 𝙏Ø 𝙎𝘼𝙎𝙎
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
          mode="sass"
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
