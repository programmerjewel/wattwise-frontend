import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../contexts/auth/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const { createUser, updateUserProfile, sendEmailVerificationToUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const conpassword = watch("conpassword");

  
  const onSubmit = async (data) => {
    setError(null);
    setMessage("");

    // Check password match
    if (data.password !== data.conpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Step 1: Create new user
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // Step 2: Update display name and profile image
      await updateUserProfile(data.name, data.pictureurl);

      // Step 3: Send email verification
      await sendEmailVerificationToUser();

      // Step 4: Show message to verify email
      setMessage("Verification email sent! Please check your inbox and verify your account.");

      // Step 5: Wait for user verification
      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          navigate("/"); // Redirect to home after verification
        }
      }, 3000); // Check every 3 seconds
    } 
    catch (err) {
      console.error("Registration error: ", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already taken. Please try logging in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset p-4 md:w-4/12 w-11/12 mx-auto my-8">
        <legend className="text-3xl font-bold text-center">Register</legend>
        <p className="text-md text-center">Already have an account? Please <Link className='font-medium' to='/login'>Log In</Link> here.</p>
        {/* Top-level error */}
        {error && (
          <p className="p-2 mb-4 text-center bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </p>
        )}
        
        {message && (
          <p className="p-2 mb-4 text-center bg-green-100 text-green-700 border border-green-400 rounded">
            {message}
          </p>
        )}

        {/* Name */}
        <label className="label">User Name</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters long" },
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Profile Picture URL */}
        <label className="label">Profile Picture URL</label>
        <input
          type="url"
          className="input w-full"
          placeholder="URL"
          {...register("pictureurl", {
            required: "Profile picture URL is required",
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
              message: "Please enter a valid image URL (e.g., ending with .jpg or .png)",
            },
          })}
        />
        {errors.pictureurl && <p className="text-red-500">{errors.pictureurl.message}</p>}

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password */}
        <label className="label">Password</label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full pr-10"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
            })}
          />
          <span
            className="z-3 absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Confirm Password */}
        <label className="label">Confirm Password</label>
        <div className="relative flex items-center">
          <input
            type={showConPassword ? "text" : "password"}
            className="input w-full pr-10"
            placeholder="Confirm Password"
            {...register("conpassword", { required: "Confirm your password" })}
          />
          <span
            className="z-3 absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowConPassword(!showConPassword)}
          >
            {showConPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        {/* Live password match */}
        {password && conpassword && password !== conpassword && (
          <p className="text-red-500">Passwords do not match.</p>
        )}
        {errors.conpassword && <p className="text-red-500">{errors.conpassword.message}</p>}

        {/* Submit */}
        <button type="submit" className="btn btn-neutral my-4 btn-wide mx-auto">
          Register
        </button>
      </fieldset>
    </form>
  );
};

export default Register;
