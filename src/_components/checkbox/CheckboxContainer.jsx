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
  constructor(props) {
    super(props);

    const {labels} = props;

    this.state = {
      checkedItems: new Map(),  // target name -> is checked?
      checkboxes: labels.map(label2Box)  // todo: this is const
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
    console.log(item, isChecked);
  }

  render() {
    const {checkboxes} = this.state;

    return (
      <React.Fragment>
        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.label}
              <Checkbox name={item.name}
                        checked={this.state.checkedItems.get(item.name)}
                        onChange={this.handleChange}/>
            </label>
          ))
        }
      </React.Fragment>
    );
  }
}

export {CheckboxContainer};