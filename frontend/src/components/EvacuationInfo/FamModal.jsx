import React from "react";
import ModalView from "../BaseMUI/ModalView";
import BasicTabs from "../BaseMUI/BasicTab";
import FamInsert from "./FamInsert"; 
import FamSearch from "./FamSearch"; 
import CustomizedTab from "../BaseMUI/BasicTab";
export default class FamModal extends ModalView {

  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open !== this.props.open) {
        this.setState({ 
            open: this.props.open,
        });
    }
  }
  render() {
    return this.BaseModal({
      content: (
        <div>
        <CustomizedTab 
            label1={"Add New Family"}
            label2={"Search Family Info"}
            tab1={<FamInsert />}
            tab2={<FamSearch />}
        />
        </div>
      ),
      openModal: this.state.open, 
    });
  }
}



/*<BasicTabs
            label1={<FamInsert open={this.state.open} />}
            label2={<FamSearch open={this.state.open} />}
          />
           */