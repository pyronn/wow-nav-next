'use client'
import React, { useState, useEffect } from 'react';
import {Button} from "@nextui-org/button";
import {AiOutlineUp} from "react-icons/ai";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const checkScrollTop = () => {
        if (!isVisible && window.scrollY > 400){
            setIsVisible(true);
        } else if (isVisible && window.scrollY <= 400){
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    });

    return isVisible ? (
        <Button
            isIconOnly={true}
            size={"lg"}
            aria-label={'scroll to top'}
            color={'secondary'}
            onClick={scrollToTop}
            className="fixed bottom-20 right-20 p-2 text-white rounded-full"
        >
            <AiOutlineUp />
        </Button>
    ) : null;
};

export default ScrollToTopButton;
