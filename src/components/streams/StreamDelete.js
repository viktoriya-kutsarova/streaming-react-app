import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

const StreamDelete = (props) => {

    useEffect(() => {
        props.fetchStream(props.match.params.id);
        
    }, []);

    const actions = (
        <React.Fragment>
            <button onClick={() => props.deleteStream(props.match.params.id)} className="ui button negative">Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    );

    const renderContent = () => {
        if (!props.stream) {
            return "Are you sure you want to delete this stream?";
        } else {
            return `Are you sure you want to delete stream with title: ${props.stream.title}?`
        }
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={actions}
            onDismiss={() => history.push('/')} />
        );
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);