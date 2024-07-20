import { useState } from "react";
import "./index.css"
import Modal from 'react-modal';

interface CardProps {
    name: string;
    img: string;
    onClick: () => void;
}

function Card({name, img, onClick}:CardProps) {   
    return (
        <>
            <div className="card">
                <span className="title">{name}</span>
                <img src={img} alt="Digimon" />
                <button className="button" onClick={onClick}>Ver detalhes</button>
            </div>
        </>
    )
}
export {Card}
