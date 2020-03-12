import React from 'react';

class Modal extends React.Component {
    state = {
        title: '',
        category: '',
        summary: '',
        expires_at: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }
    
    render() {

        return (
            <div className={this.props.show ? "modal display-block" : "modal display-none"}>
                <section className="modal-main">
                <form onSubmit={null}>
                        <label name='title' />
                        Title <br />
                        <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
                        Category <br />
                        <label name='category' />
                        <select value={this.state.category} onChange={this.handleChange}>
                            <option value='announcement'>Announcement</option>
                            <option value='new_feature'>New Feature</option>
                            <option value='shout_out'>Shout Out</option>
                            <option value='urgent_alert'>Urgent Alert</option>
                        </select>    
                        Summary <br />
                        <label name='summary' />
                        <input type='text' name='summary' value={this.state.summary} onChange={this.handleChange}/>
                        {/* {this.state.category === 'safety_alert' ? <label name='expires_at' /><input type='date' name='expires_at' value={this.state.expires_at}/> : null } */}
                </form>
                <button onClick={this.props.handleClose}>close</button>
                </section>
            </div>
            );
    }
};

export default Modal;