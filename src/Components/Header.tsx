import React from 'react';
import { Menubar } from "primereact/menubar";
import { useAppDispatch } from '../redux/hooks';
import { setView } from '../redux/view/viewSlice';

type HeaderProps = {
    fireHeaderBtn: (type:string)=>{}
  }

function Header(props : HeaderProps){
    const {fireHeaderBtn} = props;
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
                //fireHeaderBtn("calendar");
                window.location.href='/month'
            },
        },
        {
            label: "Year",
            icon: "pi pi-fw pi-calendar",
            command: () => {
                //dispatch(setView("year-view"));
                //fireHeaderBtn("year-view");
                window.location.href='/year'
            },
        },
        // {
        //     label: "List",
        //     icon: "pi pi-fw pi-list",
        //     command: () => {
        //         fireHeaderBtn("list");
        //     },
        // },
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