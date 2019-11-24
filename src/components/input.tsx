import React from "react";
import {
  Input as SemanticInput,
  Label as SemanticLabel
} from "semantic-ui-react";

const Input = (props: any) => {
  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;
  return (
    <>
      <SemanticInput {...field} {...rest} />
      <br />
      {touched[field.name] && errors[field.name] && (
        <>
          <SemanticLabel className="error" color="red">
            {errors[field.name]}
          </SemanticLabel>
          <br />
        </>
      )}
    </>
  );
};

export default Input;
