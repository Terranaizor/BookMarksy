import React from 'react';
import { getGenresSelector, getIsGenresLoadingSelector } from '../../store/reducers/catalogue.reducer';
import { useSelector } from 'react-redux';

const SideBar = () => {
    const genres = useSelector(getGenresSelector);
    const isGenresLoading = useSelector(getIsGenresLoadingSelector);
    return (
        <div className='genres-section'>
        {console.log("isGenresLoading", isGenresLoading)}
            {!isGenresLoading ? (
                <>
                    {genres.map((item, id) => (
                        <p key={id}>{item}</p>
                    ))}

                </>
            ) : (
                <>
                    <p>Loading genres...</p>
                </>
            )}
        </div>
    );
};

export default SideBar;