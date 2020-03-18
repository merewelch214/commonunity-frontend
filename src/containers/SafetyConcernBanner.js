import React from 'react';

function SafetyConcernBanner() {
    return (
        <div className='modal'>
            <div className='safety-concern-banner'>
                <h3>You logged a safety concern.</h3>
                <p>Help is on the way. This alert will disappear once your manager has confirmed that you are safe.</p>
                {/* <p>Didn't mean to do this? Remove concern by clicking here.</p> */}
            </div>
        </div>
    )
}

export default SafetyConcernBanner;