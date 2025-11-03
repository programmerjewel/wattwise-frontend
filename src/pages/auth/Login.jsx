import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(loginUser, loginWithGoogle)

  const [error, setError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
    .then(()=>{
      navigate(location.state?.from || '/', { replace: true });
    })
    .catch(error=>{
      console.error('Login error: ', error.message);
      setError('Please use correct credentials');
    })
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        console.log('Successfully logged in with Google');
        navigate(location.state?.from || '/', { replace: true });
      })
      .catch(error => {
        console.error('Google login error:', error.message);
        setError('Google Log In Error');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset p-4 md:w-4/12 w-11/12 mx-auto my-8">
        <legend className="text-3xl font-bold text-center">Login</legend>
        
        <p className="text-center text-md text-md">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-md hover:underline"
            to="/register"
            state={{ from: location.state?.from }}
          >
            Register Now
          </Link>
        </p>
        {error && (
          <p
            className="p-2 mb-4 text-center text-red-500 text-md"
          >
            {error}
          </p>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          name="email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          name="password"
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <p className="text-md text-md">
          <Link
            to="/forgot-password" // Replace with your actual password reset route
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </p>
        <button type="submit" className="btn btn-primary my-4">
          Login
        </button>
        <div className="divider">OR</div>
        <button type="button" onClick={handleGoogleLogin} className="btn btn-neutral">
          Login with Google
        </button>
      </fieldset>
    </form>
  );
};

export default Login;

