import React, { Component } from "react";
import "./Input.css";

export default class Input extends Component {
  render() {
    return (
      <div>
        <input type="file" name="file" id="file" className="inputfile" />
        <label htmlFor="file">
          <img src='icons/upload.svg' alt='Upload' className='inputfile--btn' />
        </label>
      </div>
    );
  }
}
