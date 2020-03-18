import React from 'react';
import SafetyConcernCard from './SafetyConcernCard';

class SafetyContainer extends React.Component {
    state = {
        safety_concerns: []
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/safety_concerns`)
        .then(resp=>resp.json())
        .then(data=>this.setState({safety_concerns: data})
        )
    }

    getUpdatedSafetyConcerns = updatedConcern => {
        let copiedState = this.state.safety_concerns
        const findMatch = (concern) => concern.id === updatedConcern.id
        const index = this.state.safety_concerns.findIndex(findMatch)
        copiedState[index] = updatedConcern 
        this.setState({
            safety_concerns: copiedState 
        })
    }

   
    render() {

        return (
            <div className='Feed'>
                <h1> Logged Safety Concerns </h1>
                {this.state.safety_concerns.map(concern => <SafetyConcernCard concern={concern} key={concern.id} update={this.getUpdatedSafetyConcerns}/>)}
            </div>
        )
    }
}

export default SafetyContainer;