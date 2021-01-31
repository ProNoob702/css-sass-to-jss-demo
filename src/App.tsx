import * as React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { Button, Divider, Typography } from "@material-ui/core";
import clsx from "clsx";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useStyles } from "./App.styles";
import cssToJss from "custom-jss-cli";

const langs: string[] = ["css", "sass"];

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [selectedlang, setSelectedLang] = React.useState<string>(langs[0]);
  const [input, setInput] = React.useState<string | undefined>();
  const [output, setOutput] = React.useState<string | undefined>();
  const onInputChange = (value: string) => {
    setInput(value);
  };
  const handleConvert = () => {
    const jss = cssToJss({
      code: input,
      unit: undefined,
      dashes: undefined,
    });
    setOutput(JSON.stringify(jss, null, 2));
  };
  const handleLangChange = (val: string) => {
    setSelectedLang(val);
  };
  return (
    <div className={clsx(classes.flexColumn, classes.root)}>
      <div className={clsx(classes.flexColumn, classes.header)}>
        <Typography variant="h3">CSS to JSS</Typography>
        <Divider />
      </div>
      <div className={clsx(classes.flexRow, classes.langSelectionZone)}>
        <LangRadioBtns
          selectedVal={selectedlang}
          handleChange={handleLangChange}
        />
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
        <Button
          variant="contained"
          color="secondary"
          endIcon={<DoubleArrowIcon />}
          onClick={handleConvert}
        >
          Convert
        </Button>
      </div>
      <div className={classes.editorWrapper}>
        <AceEditor
          className={classes.editor}
          mode="json"
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

const LangRadioBtns: React.FC<{
  handleChange: (val: string) => void;
  selectedVal: string;
}> = ({ handleChange, selectedVal }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Language</FormLabel>
      <RadioGroup
        row
        aria-label="Language"
        name="Language"
        value={selectedVal}
        onChange={(e) => handleChange(e.target.value)}
      >
        {langs.map((lang) => (
          <FormControlLabel
            key={lang}
            value={lang}
            control={<Radio />}
            label={lang.toUpperCase()}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default App;
