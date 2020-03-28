import React from 'react';

// const AddButton = () => {
//   return (
//     <button>add user</button>
//   );
// }

// export default AddButton;

export default class AddButton extends React.Component {
  handleClick() {
    this.props.addClicked();
  }

  render() {
    return (
      <button onClick={this.handleClick}>add user</button>
    )
  }
}