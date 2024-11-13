import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Book from './Book';

const SliderComponent = ({title, data}) => {
    return (
        <div className='slider-section'>
            <h5 className='slider-title'>{title}</h5>
           { console.log("data", data)}
            <Splide
                className='slider'
                options={{
                    type: 'loop',
                    perPage: 5,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                }}>
                {data.map((book) => {
                    return (
                        <SplideSlide >
                            <Book title={book.title}
                                author={book.author}
                                rating={book.rating}
                                cover={book.cover}
                                publisher={book.publisher}
                                key={book.url}
                            />
                        </SplideSlide>)
                })}
            </Splide>
        </div>
    );
};

export default SliderComponent;