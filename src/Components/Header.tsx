import React from 'react';
import { redirectToRoute } from '../Utils/StringPrototype';

type HeaderProps = {
    // fireHeaderBtn: (type:string)=>{}
}

function Header(props : HeaderProps){

    return(
    <header className='fixed-top border-bottom bg-secondary-subtle  pb-2'>
        <div className='container p-0 mt-0 mb-0'>
        <nav className="nav">
            <a className="nav-link active" aria-current="page" href='./month' onClick={()=>{ redirectToRoute("month")}} >📑 Month</a>
            <a className="nav-link" aria-current="page" href='./year' onClick={()=>{ redirectToRoute("year")}} >📆 Year</a>
        </nav>
        </div>
    </header>
    );
}

export default Header;