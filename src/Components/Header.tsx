import React from 'react';
import { Menubar } from "primereact/menubar";
import { redirectToRoute } from '../Utils/StringPrototype';

type HeaderProps = {
    fireHeaderBtn: (type:string)=>{}
  }

function Header(props : HeaderProps){
    const navBar = [
        // {
        //   label: "Grid",
        //   icon: "pi pi-fw pi-th-large",
        //   command: () => {
        //     fireHeaderBtn("grid");
        //   },
        // },
        {
            label: "Month",
            icon: "pi pi-fw pi-calendar",
            command: () => { 
                redirectToRoute("month") 
            }
        },
        {
            label: "Year",
            icon: "pi pi-fw pi-calendar",
            command: () => { redirectToRoute('year') }
        },
    ];

    return(<>
    <header>
        <Menubar
            model={navBar}
            end={
                <a href="//github.com/quanict/ict-events-calendar-reactjs">
                    <i className="pi pi-github" style={{ fontSize: "2em" }} />
                </a>
            }
        />
    </header>
    </>);
}

export default Header;