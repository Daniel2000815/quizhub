import React from "react";
import { Listbox, ListboxItem, Button, Tooltip } from "@nextui-org/react";
import { CiCircleChevRight } from "react-icons/ci";
import { cn } from "@nextui-org/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";

const IconWrapper = ({ children, className }) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7",
    )}
  >
    {children}
  </div>
);

const ItemCounter = ({ number }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
    <CiCircleChevRight />
  </div>
);
export default function List(props: { onSelectQuiz: Function }) {
  const [storedQuizKeys, setStoreduizKeys] = React.useState([]);
  const [storedQuizLength, setStoreduizLength] = React.useState([]);

  React.useEffect(() => {
    let keys = [];
    let lengths = [];
    for (var i = 0, len = localStorage.length; i < len; i++) {
      var key = localStorage.key(i);
      console.log("as ", key?.substring(0, 5));
      if (key?.substring(0, 5) === "quiz_") {
        const json = localStorage.getItem(key);
        var result = JSON.parse(json);
        keys.push(key);
        lengths.push(result.length);
      }
    }

    setStoreduizKeys(keys);
    setStoreduizLength(lengths);
  }, []);

  const deleteItem = (key: string) => {
    localStorage.removeItem(key);
    const idx = storedQuizKeys.indexOf(key);
    setStoreduizKeys(storedQuizKeys.filter((item, i) => i !== idx));
    setStoreduizLength(storedQuizLength.filter((item, i) => i !== idx));
  };
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => props.onSelectQuiz(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {storedQuizKeys.map((key: string, idx: number) => (
        <ListboxItem
          key={key}
          endContent={<ItemCounter number={storedQuizLength[idx]} />}
          startContent={
            <>
              <Tooltip showArrow={true} placement="bottom" content="Delete">
                <Button
                  isIconOnly
                  onClick={() => deleteItem(key)}
                  color="danger"
                  variant="light"
                  aria-label="Like"
                >
                  <RiDeleteBin6Line />
                </Button>
              </Tooltip>
              <Tooltip showArrow={true} placement="bottom" content="Review">
                <Button
                  isIconOnly
                  onClick={() => props.onSelectQuiz(key, true)}
                  color="secondary"
                  variant="light"
                  aria-label="Like"
                >
                  <CiBookmark />
                </Button>
              </Tooltip>
            </>
          }
        >
          {key.substring(5)}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
