import AdminImage from "../Assets/Images/Business.jpg";
import ComponentState from "../Components/Login/switching";

const LoginPage = () => {
  return (
    <div className="container-Fluid overflow-hidden">
      <div className="row hv-100 align-content-center">
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-center p-5 mx-auto">
          <ComponentState />
        </div>
        <div className="col-12 col-md-6 col-lg-8 p-0">
          <div
            className="d-none d-md-block"
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
