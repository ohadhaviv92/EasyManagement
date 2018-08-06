import React, { Component } from 'react'
import Modal from '../SmartModal/Modal';
import Input from '../FileUpload/Input';
export default class Home extends Component {

  render() {
    return (
      <div>
        <Modal>
          <Input />
        </Modal>
     </div>
    )
  }
}

