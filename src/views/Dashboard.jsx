import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

function Dashboard() {
  return (
      <div className="h-full   w-full flex flex-col    sm:h-screen sm:w-screen sm:flex sm:flex-col sm:overflow-hidden">
        {/* Navbar ocupa la parte superior */}
        <div className="w-full">
          <Navbar title={'Modas Betty'} />{/*aca modifique el nombre*/}
        </div>

        <div className='h-full'>
          <div className="sm:flex h-full">
            {/* Sidebar ocupa la parte izquierda y toda la altura restante por debajo del Navbar */}
            <div className=" bg-teal-900 ">
              <Sidebar />
            </div>

            {/* MainContent ocupa el espacio restante a la derecha del Sidebar */}
            <div className="sm:flex-1 ">
              <MainContent />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
