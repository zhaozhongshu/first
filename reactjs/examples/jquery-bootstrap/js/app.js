'use strict';

// Simple pure-React component so we don't have to remember
// Bootstrap's classes
var BootstrapButton = React.createClass({
  render: function() {
    return (
      <a {...this.props}="" href="javascript:;" role="button" classname="{(this.props.className" ||="" '')="" +="" '="" btn'}="" target="_blank" rel="external">
    );
  }
});

var BootstrapModal = React.createClass({
  // The following two methods are the only places we need to
  // integrate Bootstrap or jQuery with the components lifecycle methods.
  componentDidMount: function() {
    // When the component is added, turn it into a modal
    $(this.getDOMNode())
      .modal({backdrop: 'static', keyboard: false, show: false})
  },
  componentWillUnmount: function() {
    $(this.getDOMNode()).off('hidden', this.handleHidden);
  },
  close: function() {
    $(this.getDOMNode()).modal('hide');
  },
  open: function() {
    $(this.getDOMNode()).modal('show');
  },
  render: function() {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <bootstrapbutton onclick="{this.handleConfirm}" classname="btn-primary">
          {this.props.confirm}
        </bootstrapbutton>
      );
    }
    if (this.props.cancel) {
      cancelButton = (
        <bootstrapbutton onclick="{this.handleCancel}" classname="btn-default">
          {this.props.cancel}
        </bootstrapbutton>
      );
    }

    return (
      <div classname="modal fade">
        <div classname="modal-dialog">
          <div classname="modal-content">
            <div classname="modal-header">
              <button type="button" classname="close" onclick="{this.handleCancel}">
                &times;
              </button>
              <h3>{this.props.title}</h3>
            </div>
            <div classname="modal-body">
              {this.props.children}
            </div>
            <div classname="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleCancel: function() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handleConfirm: function() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
});

var Example = React.createClass({
  handleCancel: function() {
    if (confirm('Are you sure you want to cancel?')) {
      this.refs.modal.close();
    }
  },
  render: function() {
    var modal = null;
    modal = (
      <bootstrapmodal ref="modal" confirm="OK" cancel="Cancel" oncancel="{this.handleCancel}" onconfirm="{this.closeModal}" title="Hello, Bootstrap!">
          This is a React component powered by jQuery and Bootstrap!
      </bootstrapmodal>
    );
    return (
      <div classname="example">
        {modal}
        <bootstrapbutton onclick="{this.openModal}" classname="btn-default">
          Open modal
        </bootstrapbutton>
      </div>
    );
  },
  openModal: function() {
    this.refs.modal.open();
  },
  closeModal: function() {
    this.refs.modal.close();
  }
});

React.render(<example>, document.getElementById('jqueryexample'));
</example></a>