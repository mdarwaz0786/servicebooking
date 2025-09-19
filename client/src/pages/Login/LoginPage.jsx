import BreadCrumb from "../BreadCrumb/BreadCrumb";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            
            <div className="col-md-4" style={{margin:'0 auto'}}>
              <LoginForm/>
            </div>  
              
              
             
            
          </div>
        </div>
        
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default LoginPage;