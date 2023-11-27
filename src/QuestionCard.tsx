import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";
import {
  Card,
  CardBody,
  Divider,
  CardFooter,
  CardHeader,
  Image,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";
import { Question } from "./global";
import { useEffect } from "react/cjs/react.production.min";
import { SiCodereview } from "react-icons/si";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { FaRegEye, FaFlagCheckered } from "react-icons/fa";

export default function QuestionCard(props: {
  question: Question;
  onContinue: Function;
  onClickFinish: Function;
  onSubmit: Function;
  onPressReview: Function;
}) {
  const [selected, setSelected] = React.useState([]);
  const [submited, setSubmited] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);

  React.useEffect(() => {
    console.log("aqui ", props.question);
    setSubmited(false);
    setCorrect(false);
    setSelected([]);
  }, [props.question]);

  const handleNewSelection = (newSelection: string[]) => {
    if (props.question.answers.length == 1)
      setSelected([newSelection[newSelection.length - 1]]);
    else setSelected(newSelection);
  };

  const handleSubmit = () => {
    if (submited) return;
    setSubmited(true);

    setCorrect(
      selected.length === props.question.answers.length &&
        props.question.answers.every((ans) =>
          selected.includes(props.question.options[ans]),
        ),
    );

    setSelected(
      selected.concat(
        props.question.options.filter((opt) =>
          props.question.answers.includes(props.question.options.indexOf(opt)),
        ),
      ),
    );

    props.onSubmit();
  };

  const handleContinue = () => {
    setSubmited(false);
    setSelected([]);
    setCorrect(false);
    props.onContinue(correct);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex gap-3 justify-between">
          <div className="flex gap-5">
            <b className="text-md">{props.question.sentence}</b>
          </div>
          <div className="flex gap-2">
            <Button
              color="danger"
              variant="bordered"
              startContent={<FaRegEye size={20} />}
            >
              {props.question.viewCount}
            </Button>

            <Button
              onClick={() => props.onPressReview()}
              isIconOnly
              variant={props.question.review ? "solid" : "ghost"}
              color="secondary"
              aria-label="Like"
            >
              {props.question.review ? (
                <CiBookmarkCheck size={24} />
              ) : (
                <CiBookmarkPlus size={24} />
              )}
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-3">
            <CheckboxGroup
              color="warning"
              value={selected}
              onValueChange={handleNewSelection}
              radius={props.question.answers.length > 1 ? "none" : "full"}
            >
              {props.question.options.map((option, idx) => (
                <Checkbox
                  key={idx}
                  value={option}
                  color={
                    submited
                      ? props.question.answers.includes(
                          props.question.options.indexOf(option),
                        )
                        ? "success"
                        : "danger"
                      : "primary"
                  }
                >
                  {option}
                </Checkbox>
              ))}
            </CheckboxGroup>
            {submited && props.question.explanation && (
              <p className="text-default-500 text-small">
                {props.question.explanation}
              </p>
            )}
          </div>
        </CardBody>
        <Divider />
        <CardFooter
          className={
            submited ? (correct ? "bg-green-600" : "bg-rose-600") : "bg-white"
          }
        >
          <div className="flex flex-grow gap-2 items-center justify-between">
            <Button
              color="default"
              variant="ghost"
              startContent={<FaFlagCheckered size={20} />}
              onClick={() => props.onClickFinish()}
            >
              Finish
            </Button>
            <Button
              color="primary"
              radius="lg"
              size="sm"
              onClick={() => (!submited ? handleSubmit() : handleContinue())}
            >
              {submited ? "Next" : "Submit"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
