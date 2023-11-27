import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  PopoverTrigger,
  Popover,
  PopoverContent,
  ButtonGroup,
  Textarea,
} from "@nextui-org/react";
import { BsSearch } from "react-icons/bs";
import { Question } from "./global";
import List from "./List";
import QuestionImporter from "./QuestionImporter";

export default function NavBar(props: {
  onChangeSearchText: Function;
  onClickImport: Function;
  onSelectQuiz: Function;
}) {
  const [explanationKey, setExplanationKey] = React.useState("explanation");
  const [arrayKey, setArrayKey] = React.useState("results");
  const [title, setTitle] = React.useState("New quiz");
  const [answersKey, setAnswersKey] = React.useState("correct_response");
  const [optionsKey, setOptionsKey] = React.useState("answers");
  const [feedbackKey, setFeedbackKey] = React.useState("feedbacks");
  const [questionKey, setQuestionKey] = React.useState("question");
  const [json, setJson] = React.useState("");
  const [parsedJson, setParsedJson] = React.useState();

  return (
    <Navbar isBordered className="justify-between">
      <div className="flex gap-5">
        <NavbarContent>
          <NavbarBrand>
            <p className="font-bold text-inherit">Quiz Hub</p>
          </NavbarBrand>
        </NavbarContent>
      </div>

      <NavbarContent as="div" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search project"
          size="sm"
          startContent={<BsSearch />}
          type="search"
          onChange={(e: any) => props.onChangeSearchText(e.target.value)}
        />
        <Popover showArrow offset={10}>
          <PopoverTrigger>
            <Button color="primary">Collection</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px]">
            {(titleProps) => (
              <div className="px-1 py-2 w-full">
                <List onSelectQuiz={props.onSelectQuiz} />
              </div>
            )}
          </PopoverContent>
        </Popover>

        <QuestionImporter onClickImport={props.onClickImport} />
      </NavbarContent>
    </Navbar>
  );
}
