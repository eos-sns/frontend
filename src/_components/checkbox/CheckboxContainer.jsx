import React from 'react';
import {Checkbox} from './Checkbox';

const checkboxes = [
  {
    name: 'check-box-1',
    key: 'checkBox1',
    label: 'Check Box 1',
  },
  {
    name: 'check-box-2',
    key: 'checkBox2',
    label: 'Check Box 2',
  },
  {
    name: 'check-box-3',
    key: 'checkBox3',
    label: 'Check Box 3',
  },
  {
    name: 'check-box-4',
    key: 'checkBox4',
    label: 'Check Box 4',
  },
];

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),  // target name -> is checked?
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
    return (
      <React.Fragment>
        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
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