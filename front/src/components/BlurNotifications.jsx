import React from 'react';

const notifications = [
    { message: 'YOU HAVE', value: '##', type: 'MESSAGES' },
    { message: 'SOMEONE LIKED YOUR COMMENT', value: '################', type: '' },
    { message: 'YOU HAVE', value: '#', type: 'FRIEND REQUESTS' },
    { message: 'NEW NOTIFICATIONS:', value: '#', type: '' },
];

const BlurNotifications = () => {
    return (
        <section className="blur-container">
            {notifications.map((item, index) => (
                <p key={index}>
                    {item.message}{" "}
                    <span className="blur">{item.value}</span>{" "}
                    {item.type}
                </p>
            ))
            }
        </section>
    );
};

export default BlurNotifications;