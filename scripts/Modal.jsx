class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='modalbackdrop'>
                <div className="modal">
                    <div className='modaltitle'>
                        {this.props.title}
                    </div>
                    <div className='modalcontent'>
                        {this.props.renderContent()}
                    </div>
                    <div className='modalbuttoncontainer'>
                        <button className='okbutton' onClick={this.props.onClickOk} disabled={this.props.disableOkButton()}>
                            {this.props.okButtonText}
                        </button>
                        <button className='cancelbutton' onClick={this.props.onClickCancel}>
                            {this.props.cancelButtonText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.defaultProps = {
    title: '',
    okButtonText: 'OK',
    cancelButtonText: 'Cancel',
    showOkButton: true,
    showCancelButton: true,
    disableOkButton: () => { return false },
    onClickOk: () => {},
    onClickCancel: () => {},
    renderContent: () => {}
}