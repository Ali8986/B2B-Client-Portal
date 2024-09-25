import AdminImage from "../Assets/Images/Business.jpg";
import ComponentState from "../Components/Login/switching";

const LoginPage = () => {
  return (
    <div className="container-Fluid overflow-hidden">
      <div className="row g-0">
        <div className="col-12 col-md-12 col-lg-4">
          <div className="p-3 p-md-5 d-flex flex-column hv-100 justify-content-center">
            <ComponentState />
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-8">
          <div
            className="d-none d-lg-block"
            style={{
              backgroundImage: `url(${AdminImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "100vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
