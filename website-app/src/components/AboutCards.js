import { useRef, useEffect, useState } from 'react';
import { TbHandClick } from 'react-icons/tb';
import '../styles/AboutCards.css';


export default function Card({index, fade, delay, cardInformation, parentRef, handleExpand, handleContract, numberExpanded, numberToJiggle}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [style, setStyle] = useState({});
    const [contentStyle, setContentStyle] = useState({});
    const [isJiggling, setIsJiggling] = useState(false);
    const cardRef = useRef();

    useEffect(() => {
        if (numberExpanded != 0) removeJiggle();
    }, [numberExpanded]);

    useEffect(() => {
        if (index === numberToJiggle && numberExpanded === 0) {
            addJiggle();

            setTimeout(() => {
                removeJiggle();
            }, 1500);
        }
    }, [numberToJiggle]);

    useEffect(() => {
        if (isExpanded) {
            setStyle({
                transform: `translate(${-1 * (cardRef.current.offsetLeft)}px, ${-1 * (cardRef.current.offsetTop)}px)`,
                zIndex: 5,
                transition: '.5s'
            });
            setContentStyle({
                width: `${parentRef.current.offsetWidth}px `,
                height: `${parentRef.current.offsetHeight}px`,
                display: 'block',
                opacity: 1,
                transition: '1s'
            });
        } else {
            setStyle({
                transform: 'translate(0, 0)',
                transition: '.5s'
            });
            setContentStyle({
                transition: '.5s'
            });
        }
    }, [isExpanded]);

    const handleClick = () => {
        handleChange();
        setIsExpanded(!isExpanded);
    }

    const handleChange = () => {
        if (!isExpanded) handleExpand();
        else handleContract();
    }

    const addJiggle = () => {
        if (!cardRef.current.classList.contains('jiggle')) {
            cardRef.current.classList.add('jiggle');
            setIsJiggling(true);
        }
    }
    
    const removeJiggle = () => {
        if (cardRef.current.classList.contains('jiggle')) {
            cardRef.current.classList.remove('jiggle');
            setIsJiggling(false);
        }
    }


    return (
        <div ref={cardRef} className='about-card' onClick={handleClick} style={style}>
            <div className='card-front' style={contentStyle} data-aos={fade} data-aos-delay={delay} data-aos-duration='3000'>
                {!isExpanded && <h4 className='text-center'>{isJiggling ? <TbHandClick className='click-icon'/> : cardInformation.name}</h4>}
                {isExpanded && <span data-aos='zoom-out' data-aos-delay='600'>{cardInformation.content}</span>}
            </div>
        </div>
    );
}