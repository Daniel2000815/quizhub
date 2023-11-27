import React from "react";
import {
  Input,
  Button,
  PopoverTrigger,
  Popover,
  PopoverContent,
  ButtonGroup,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";

const removeHTML = (htmlString) => {
  if (!htmlString) return "";

  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function QuestionImporter(props: { onClickImport: Funcion }) {
  const [explanationKey, setExplanationKey] =
    React.useState("prompt.explanation");
  const [arrayKey, setArrayKey] = React.useState("questions");
  const [title, setTitle] = React.useState("New quiz");
  const [apiUrl, setApiUrl] = React.useState("");
  const [answersKey, setAnswersKey] = React.useState("correct_response");
  const [optionsKey, setOptionsKey] = React.useState("answers");
  const [feedbackKey, setFeedbackKey] = React.useState("feedbacks");
  const [questionKey, setQuestionKey] = React.useState("question");
  const [json, setJson] = React.useState("");
  const [mode, setMode] = React.useState<"json" | "api">("json");

  const getNestedProperty = (path: string, json: JSON) => {
    var parts = path.split(".");
    var resultado = json;
    console.log("trying to get path ", path, " from ", json);
    for (var i = 0; i < parts.length; i++) {
      if (!resultado.hasOwnProperty(parts[i])) {
        console.log(resultado, " NO TIENE LA PROPIEDAD ", parts[i]);
        return null;
      }

      resultado = resultado[parts[i]];
    }

    console.log("devuelvo ", resultado);
    return resultado;
  };

  const parseJson = (json) => {
    console.log(json["questions"][0]);

    let questions: Question[] = json[arrayKey].map(
      (entry: any, idx: number) => ({
        id: idx,
        sentence: removeHTML(getNestedProperty(questionKey, entry)),
        options: getNestedProperty(optionsKey, entry)?.map((ans) =>
          removeHTML(ans),
        ),
        answers: getNestedProperty(answersKey, entry)?.map(
          (letter) => letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0),
        ),
        explanation: removeHTML(getNestedProperty(explanationKey, entry)),
        feedback: getNestedProperty(feedbackKey, entry),
        review: false,
        viewCount: 0
      }),
    );
    console.log("qustions: ", questions);

    localStorage.setItem(`quiz_${title}`, JSON.stringify(questions));
    props.onClickImport(`quiz_${title}`);
  };

  const handleClickParse = () => {
    let parsedJson = null;
    console.log("sas ", apiUrl);
    if (mode === "api") {
      console.log("a");
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => parseJson(data))
        .catch((err) => console.log("error", err));
    } else {
      try {
        parsedJson = JSON.parse(json);
      } catch {}
    }

    if (parsedJson == null) return;

    console.log(parsedJson);
    let missingKeys = [];

    /*
    if (!parsedJson.hasOwnProperty(arrayKey))
      missingKeys = missingKeys.concat(arrayKey);
    if (!parsedJson[arrayKey][0].hasOwnProperty(answersKey))
      missingKeys = missingKeys.concat(answersKey);
    if (!parsedJson[arrayKey][0].prompt.hasOwnProperty(optionsKey))
      missingKeys = missingKeys.concat(optionsKey);
    if (!parsedJson[arrayKey][0].prompt.hasOwnProperty(feedbackKey))
      missingKeys = missingKeys.concat(feedbackKey);
    if (!parsedJson[arrayKey][0].prompt.hasOwnProperty(questionKey))
      missingKeys = missingKeys.concat(questionKey);
    if (!parsedJson[arrayKey][0].prompt.hasOwnProperty(explanationKey))
      missingKeys = missingKeys.concat(explanationKey);

    if (missingKeys.length > 0) {
      console.log("L ", missingKeys);
      return;
    }
    */
  };

  return (
    <Popover showArrow offset={10}>
      <PopoverTrigger>
        <Button color="primary">Import questions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[650px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <ButtonGroup color="secondary" className="w-full py-2">
              <Button onClick={() => setMode("json")}>JSON</Button>
              <Button onClick={() => setMode("api")}>API Call</Button>
            </ButtonGroup>
            <p
              className="text-small font-bold text-foreground py-2"
              {...titleProps}
            >
              Introduce title, JSON keys and JSON:
            </p>
            <Input
              value={title}
              label="Title"
              onValueChange={setTitle}
              // color={
              //   parsedJson == null ||
              //   parsedJson.hasOwnProperty(arrayKey)
              //     ? "default"
              //     : "danger"
              // }
            />

            <div className="mt-2 flex flex-col gap-2 w-full">
              <div className="flex gap-2">
                <Input
                  value={arrayKey}
                  label="Array"
                  size="sm"
                  variant="bordered"
                  onValueChange={setArrayKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(arrayKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
                <Input
                  value={optionsKey}
                  label="Options"
                  size="sm"
                  variant="bordered"
                  onValueChange={setOptionsKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson[0].hasOwnProperty(
                  //     `${arrayKey}.prompt.${optionsKey}`,
                  //   )
                  //     ? "default"
                  //     : "danger"
                  // }
                />
                <Input
                  value={answersKey}
                  label="Answers"
                  size="sm"
                  variant="bordered"
                  onValueChange={setAnswersKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(answersKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
              </div>
              <div className="flex gap-2">
                <Input
                  value={questionKey}
                  label="Question"
                  size="sm"
                  variant="bordered"
                  onValueChange={setQuestionKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(questionKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
                <Input
                  value={explanationKey}
                  label="Explanation"
                  size="sm"
                  variant="bordered"
                  onValueChange={setExplanationKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(explanationKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
                <Input
                  value={feedbackKey}
                  label="Feedback"
                  size="sm"
                  variant="bordered"
                  onValueChange={setFeedbackKey}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(feedbackKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
              </div>
              {mode === "json" ? (
                <Textarea
                  maxRows={20}
                  label="JSON"
                  placeholder="Enter your questions"
                  onValueChange={setJson}
                />
              ) : (
                <Input
                  value={apiUrl}
                  label="API call"
                  placeholder="URL"
                  onValueChange={setApiUrl}
                  // color={
                  //   parsedJson == null ||
                  //   parsedJson.hasOwnProperty(arrayKey)
                  //     ? "default"
                  //     : "danger"
                  // }
                />
              )}
              <Button color="secondary" onClick={() => handleClickParse()}>
                Parse
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
