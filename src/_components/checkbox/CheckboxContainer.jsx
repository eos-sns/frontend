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
    let checksState = [];  // array of {}
    checkboxes.forEach((x) => {
      checksState.push({
        name: x.name,
        label: x.label,
        checked: checkedItems[x.name] || false
      })
    });

    onChange(checksState);
  };

  constructor(props) {
    super(props);

    const {title, labels, onChange} = props;

    this.state = {
      title,
      checkedItems: {},  // name -> checked
      checkboxes: labels.map(label2Box),  // todo: this is const
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