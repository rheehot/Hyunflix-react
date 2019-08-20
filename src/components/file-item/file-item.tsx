import React from 'react';
import { Button, Modal, Icon } from 'antd';
import { extname, basename } from 'path';

import { File } from 'models';
import { encodeFile } from 'api';
import { RenameModal } from 'components';
import './file-item.css';

interface Props {
  file: File
  callback: (File) => void
}

interface State {
  renameModalVisible: boolean;
  encodeModalVisible: boolean;
}

class Fileitem extends React.Component<Props, State> {
  state = {
    renameModalVisible: false,
    encodeModalVisible: false
  }
  
  onClick = (e) => {
    e.preventDefault();
    this.props.callback(this.props.file)
  }
  
  showModal = (e) => {
    this.setState({
      encodeModalVisible: true
    })
  }
  
  handleOk = e => {
    encodeFile(this.props.file.path)
      .then(() => {
        this.setState({
          encodeModalVisible: false,
        });
      })
      .catch((msg) => {
        alert(msg);
      });
      
  };

  handleCancel = e => {
    this.setState({
      encodeModalVisible: false,
    });
  };
  
  render () {
    const isVideo = ['.mp4', '.avi', '.mkv'].includes(extname(this.props.file.name));
    
    const link: React.ReactNode = (this.props.file.isdir || extname(this.props.file.name) === '.mp4')
      ? <a className="file-item-name" href={this.props.file.path} onClick={this.onClick}><span>{this.props.file.name}</span></a>
      : <span className="file-item-name">{this.props.file.name}</span>
    
    return (
      <div className="file-item">
        <div className="file-item-name-layout">
          { link }
        </div>
        <div className="file-item-etc-layout">
          <div className="file-item-size">{this.props.file.size}</div>
          <Button className="file-item-button" onClick={this.showRenameModal}><Icon type="edit"/></Button>
          <RenameModal
            value={this.props.file.path}
            visible={this.state.renameModalVisible}
            closeCallback={this.renameModalClosed}
            successCallback={this.renameModalSuccessed}
          />
          
          <Button className="file-item-button"><Icon type="delete"/></Button>
          <Button className="file-item-button" onClick={this.showModal} disabled={!isVideo}><Icon type="filter"/></Button>
          <Modal
            title="비디오 인코딩"
            visible={this.state.encodeModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            인코딩 하시겠습니까?
          </Modal>
        </div>
      </div>
    )
  }
  
  showRenameModal = () => {
    this.setState({ renameModalVisible: true })
  }
  
  renameModalClosed = () => {
    this.setState({ renameModalVisible: false })
  }
  
  renameModalSuccessed = (fromPath, toPath) => {
    this.props.file.path = toPath;
    this.props.file.name = basename(toPath);
    this.forceUpdate();
  }
}

export default Fileitem;