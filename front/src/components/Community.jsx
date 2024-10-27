import React, { Fragment } from 'react';

import readingImg from '../assets/images/community/reading.png';
import connectionsImg from '../assets/images/community/connections.png';
import discussionImg from '../assets/images/community/discussion.png';
import shareImg from '../assets/images/community/share.png';
import discoverImg from '../assets/images/community/discover.png';
import exploreImg from '../assets/images/community/explore.png';

const Community = () => {
    const communityAdvantages = [
        { imageSrc: readingImg, label: 'Read Together' },
        { imageSrc: connectionsImg, label: 'Build Connections' },
        { imageSrc: discussionImg, label: 'Discuss Books' },
        { imageSrc: shareImg, label: 'Share Books' },
        { imageSrc: discoverImg, label: 'Discover Reads' },
        { imageSrc: exploreImg, label: 'Explore Together' }
    ];

    return (
        <Fragment>
            <h2>Join Community</h2>
            <section className='community-grid'>
                {communityAdvantages.map((item, index) => (
                    <div className='community-grid--element' key={index}>
                        <img src={item.imageSrc} alt={item.label} />
                        <p>{item.label}</p>
                    </div>
                ))}
            </section>
        </Fragment>
    );
};

export default Community;