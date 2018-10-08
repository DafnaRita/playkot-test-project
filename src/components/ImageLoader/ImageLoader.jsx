import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,
  CustomInput, FormGroup, Label, TabContent, TabPane,
  Nav, NavItem, NavLink, Button, Row, Col, Input } from 'reactstrap';

import classnames from 'classnames';

import imageURLchecker from '../../app/imageURLchecker';

const imageStyle = {
  width: '200px',
  height: '200px',
};

const TAB_TYPES = {
  FILE: 'tabFile',
  URL: 'tabURL',
};

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      imageURL: null,
      activeTab: TAB_TYPES.FILE,
      isValidImage: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return { modal: !prevState.modal };
    });
  }

  changeTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleFileChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imageURL: reader.result,
        isValidImage: true,
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  handleURLChange = (e) => {
    e.preventDefault();
    imageURLchecker(e.target.value)
      .then((img) => {
        this.setState(() => ({
          isValidImage: true,
          imageURL: img.src,
        }));
      })
      .catch((error) => {
        this.setState(() => ({
          isValidImage: false,
        }));
        console.error(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('handle uploading-', this.state.imageURL);
    this.toggleModal();
  }

  render() {
    const downloadByFile = (
      <TabPane tabId="tabFile">
        <Row>
          <Col sm="12">
            <ModalBody>
              <form onSubmit={ e => this.handleSubmit(e)}>
                <FormGroup>
                  <Label for="loadImageByFile">File Browser</Label>
                  <CustomInput
                    type="file"
                    id="loadImageByFile"
                    name="customFile"
                    onChange={ e => this.handleFileChange(e)}
                    accept="image/x-png,image/gif,image/jpeg"
                    label="Pick a image" />
                </FormGroup>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="submitButton"
                type="submit"
                onClick={ e => this.handleSubmit(e)}>Download
              </Button>
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Col>
        </Row>
      </TabPane>
    );

    const downloadByURL = (
      <TabPane tabId="tabURL">
        <Row>
          <Col sm="12">
            <ModalBody>
              <FormGroup>
                <Label for="imageURL">Enter the URL</Label>
                <Input onChange={ e => this.handleURLChange(e)}
                  type="textarea"
                  name="text"
                  id="imageURL"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {this.state.isValidImage && <Button
                color="primary"
                className="submitButton"
                type="submit"
                onClick={ e => this.handleSubmit(e)}>Download
              </Button>
              }
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Col>
        </Row>
      </TabPane>
    );

    return (
      <div className='container-fluid'>
        <div className='row'>
          {(this.state.imageURL && !this.state.modal)
            ? <img style={imageStyle} src={this.state.imageURL}/>
            : <Button
              color="primary"
              className="mx-auto mt-4"
              onClick={this.toggleModal}>
              Add a image
            </Button>
          }
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader>Download a image</ModalHeader>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === TAB_TYPES.FILE })}
                onClick={() => { this.changeTab(TAB_TYPES.FILE); }}
              >
                File
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === TAB_TYPES.URL })}
                onClick={() => { this.changeTab(TAB_TYPES.URL); }}
              >
                URL
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {downloadByFile}
            {downloadByURL}
          </TabContent>
        </Modal>
      </div>
    );
  }
}

export default ImageLoader;
