import { useState, useEffect } from "react";

const TodoForm = (callback, defaultValue = {}) => {
  const [text, setText] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(text);
  };

  const handleChange = (event) => {
    event.persist();

    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setText((text) => ({ ...text, [name]: value }));
  };

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  return {
    handleChange,
    handleSubmit,
    text,
  };
};

export default TodoForm;
