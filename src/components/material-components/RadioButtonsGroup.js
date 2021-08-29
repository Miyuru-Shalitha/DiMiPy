import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({
  radioItems: { itemTitles, func },
}) {
  const [value, setValue] = React.useState(itemTitles[0]);

  const handleChange = (event) => {
    setValue(event.target.value);
    func(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Category</FormLabel> */}
      <RadioGroup
        // aria-label="category"
        // name="category"
        value={value}
        onChange={handleChange}
      >
        {/* <FormControlLabel value="female" control={<Radio />} label="2020" />
        <FormControlLabel value="male" control={<Radio />} label="2021" />
        <FormControlLabel value="other" control={<Radio />} label="2022" /> */}

        {itemTitles.map((itemTitle, index) => {
          return (
            <FormControlLabel
              key={index}
              value={itemTitle}
              control={<Radio />}
              label={itemTitle}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
