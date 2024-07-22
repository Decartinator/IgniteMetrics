import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../AuthContext"; // Ensure this import is correct
import { useNavigate } from "react-router-dom";

function Form() {
  const { loginWithRedirect } = useAuth0();
  const { signIn } = useAuth(); // Ensure signIn is correctly imported from useAuth
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ignitemetricapi.azurewebsites.net/api/verifySignup?code=XP1XgUmbW6awBKZx-3PjNSGDXPDmEc9RONvtqSpBHr1sAzFuJu54Tg%3D%3D"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  //Function to check credentials

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = data.find((user) => user.email === email);
    if (user) {
      setError("Please sign in with Google");
    } else {
      try {
        const isValid = await signIn(email, password); // Use the signIn function and wait for its result

        if (isValid) {
          setError(""); // Clear error if sign-in is successful
        } else {
          setError("Invalid credentials"); // Set error if sign-in fails
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        setError("An error occurred during sign-in");
      }
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">Welcome!</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Hello there, please enter your details.
      </p>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-medium">Username</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
            placeholder="Enter your password"
            type="password"
            value={password} // Add value and onChange for password field
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember" className="ml-2 font-medium text-base">
              Remember me
            </label>
          </div>

          <button className="font-medium text-base text-blue-500">
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4 ">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-500 text-white text-lg font-bold  "
          >
            Sign in
          </button>
          <button
            onClick={() => loginWithRedirect()}
            className="flex rounded-xl py-3 border-2 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                fill="#EA4335"
              />
              <path
                d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                fill="#34A853"
              />
              <path
                d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                fill="#4A90E2"
              />
              <path
                d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                fill="#FBBC05"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <button
            className="text-blue-500 font-medium ml-2"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
