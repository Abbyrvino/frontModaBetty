import { Outlet } from "react-router-dom";

const MainContent = () => {
    return ( 
        <div className="component-over-scroll w-full mb-4">
            <Outlet />
        
      
    </div>
     );
}
 
export default MainContent;