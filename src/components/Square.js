import React from "react";
import "./Square.css";

// // define component by function
const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;

// // define component by class

// export default class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => {
//           this.props.onClick();
//         }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
