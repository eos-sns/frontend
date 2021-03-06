import React from 'react';
import { Checkbox } from './Checkbox';
import { TeX } from '@/_components/labels';
import {ParameterTitle} from "@/_components/parameter/ParameterTitle";

/**
 * Converts list of labels to objects with name, key, label
 */
const label2Box = (label, index) => {
  const _id = `ch${index}`;
  return {
    label,
    name: _id,
    key: _id,
  };
};

class CheckboxContainer extends React.Component {
  sendStatus = () => {
    const { checkedItems, checkboxes, onChange } = this.state;
    const checksState = []; // array of bool
    checkboxes.forEach((x) => {
      const isChecked = (checkedItems[x.name] || false);
      checksState.push(isChecked);
    });

    onChange(checksState);
  };

  constructor(props) {
    super(props);

    const {
      title, labels, descriptions, onChange, checks,
    } = props;

    const checkboxes = labels.map(label2Box);
    const checkedItems = {};

    for (let i = 0; i < checkboxes.length; i++) {
      const item = checkboxes[i].name;
      checkedItems[item] = checks[i];
      checkboxes[i].description = descriptions[i];
    }

    this.state = {
      title,
      checkedItems, // name -> checked
      checkboxes, // todo: this is const
      onChange,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { checkedItems } = this.state;
    const item = e.target.name;
    checkedItems[item] = e.target.checked;

    this.setState({
      checkedItems,
    });

    this.sendStatus();
  }

  render() {
    const { title, checkboxes, checkedItems } = this.state;

    return (
      <React.Fragment>
        <h3>{title}</h3>
        <div>
          {
            checkboxes.map(item => (
              <div key={item.key}>
                <Checkbox
                  name={item.name}
                  checked={checkedItems[item.name]}
                  onChange={this.handleChange}
                />
&nbsp;
                <label htmlFor={item.name}>
                  <ParameterTitle
                    label={item.label}
                    description={item.description}
                  />
                </label>
              </div>
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}

export { CheckboxContainer };
