import React from 'react';
import {Checkbox} from './Checkbox';

/**
 * Converts list of labels to objects with name, key, label
 */
const label2Box = (label, index) => {
  const _id = 'ch' + index;
  return {
    label: label,
    name: _id,
    key: _id
  }
};

class CheckboxContainer extends React.Component {
  sendStatus = () => {
    const {checkedItems, checkboxes, onChange} = this.state;
    let checksState = [];  // array of bool
    checkboxes.forEach((x) => {
      const isChecked = (checkedItems[x.name] || false);
      checksState.push(isChecked);
    });

    onChange(checksState);
  };

  constructor(props) {
    super(props);

    const {title, labels, onChange, checks} = props;

    const checkboxes = labels.map(label2Box);
    let checkedItems = {};

    for (let i = 0; i < checks.length; i++) {
      const item = checkboxes[i].name;
      checkedItems[item] = checks[i];
    }

    this.state = {
      title,
      checkedItems,  // name -> checked
      checkboxes,  // todo: this is const
      onChange
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {checkedItems} = this.state;
    const item = e.target.name;
    checkedItems[item] = e.target.checked;

    this.setState({
      checkedItems
    });

    this.sendStatus();
  }

  render() {
    const {title, checkboxes, checkedItems} = this.state;

    return (
      <React.Fragment>
        <h3>{title}</h3>
        {
          checkboxes.map(item => (
            <label key={item.key} className={'largeCheckbox'}>
              {item.label}
              <Checkbox name={item.name}
                        checked={checkedItems[item.name]}
                        onChange={this.handleChange}/>
            </label>
          ))
        }
      </React.Fragment>
    );
  }
}

export {CheckboxContainer};