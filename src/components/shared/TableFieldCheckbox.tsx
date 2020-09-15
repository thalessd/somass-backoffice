import React from "react";
import { Checkbox } from "@chakra-ui/core";
type Props = {
  checked: boolean;
};

function TableFieldCheckbox({ checked }: Props) {
  return (
    <Checkbox
      isChecked={checked}
      onChange={() => null}
      variantColor="green"
      size="lg"
    >
      {undefined}
    </Checkbox>
  );
}

export default TableFieldCheckbox;
