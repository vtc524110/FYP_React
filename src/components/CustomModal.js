import React from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal, UncontrolledPopover, PopoverHeader, PopoverBody, UncontrolledTooltip } from "reactstrap";

function CustomModal() {
  const [tooltipsAndPopovers, setTooltipsAndPopovers] = React.useState(false);
  return(
    <>
      <Button
        color="primary"
        type="button"
        onClick={() => setTooltipsAndPopovers(true)}
      >
        Launch demo modal
      </Button>
      <Modal
        isOpen={tooltipsAndPopovers}
        toggle={() => setTooltipsAndPopovers(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalPopoversLabel">
            Confirm bidding information
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setTooltipsAndPopovers(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Popover in a modal</h5>
          <p>
            This{" "}
            <Button
              className="popover-test"
              color="secondary"
              role="button"
              id="popover1"
            >
              button
            </Button>{" "}
            <UncontrolledPopover target="#popover1" placement="top">
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>Popover body content is set here.</PopoverBody>
            </UncontrolledPopover>
            triggers a popover on click.
          </p>
          <hr />
          <h5>Tooltips in a modal</h5>
          <p>
            <a className="tooltip-test" href="#pablo" id="tooltip1">
              This link
            </a>{" "}
            <UncontrolledTooltip target="#tooltip1" placement="top">
              Tooltip
            </UncontrolledTooltip>
            and{" "}
            <a className="tooltip-test" href="#pablo" id="tooltip2">
              that link
            </a>{" "}
            <UncontrolledTooltip target="#tooltip2" placement="top">
              Tooltip
            </UncontrolledTooltip>
            have tooltips on hover.
          </p>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              onClick={() => setTooltipsAndPopovers(false)}
              type="button"
            >
              Cancel
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button className="btn-link" color="success" type="button">
              Post bidding
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomModal;