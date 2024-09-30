const FormBox = ({ children }) => {
  // p-4 border-5 shadow
  return (
    <div className="d-flex flex-column text-center align-items-center login-form justify-content-center">
      {children}
    </div>
  );
};

export default FormBox;
