import React, { useState, useEffect } from "react";
import "./navbar.css";

export default function Navbar() {
    return (
        <div>
            <div className="contBtn">
                <div className="Onglet">General</div>
                <div className="Onglet">fra</div>
                <div className="Onglet">eng</div>
                <div className="Onglet">deu</div>
                <div className="Onglet">ell</div>
                <div className="Onglet">fin</div>
                <div className="Onglet">jpn</div>
                <div className="Onglet">ita</div>
                <div className="Onglet">por</div>
                <div className="Onglet">rus</div>
                <div className="Onglet">tur</div>
            </div>
        </div>
    );
}
