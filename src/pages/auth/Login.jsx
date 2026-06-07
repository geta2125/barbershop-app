import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            // Logika login tiruan Anda
            if (dataForm.email === "geta@gmail.com" && dataForm.password === "2125") {
                localStorage.setItem("user", JSON.stringify(dataForm));
                navigate("/");
            } else {
                setError("Email atau password yang Anda masukkan salah.");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div>

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-1.5">
                Welcome Back
            </h2>

            <p className="text-sm text-[#D3CDC3]/60 mb-8">
                Today is a new day. Sign in to start managing your projects.
            </p>

            {/* ERROR */}
            {error && (
                <div className="bg-[#A87C2D]/20 border border-[#A87C2D] mb-4 p-3 rounded-lg flex items-center text-sm">
                    <BiError className="mr-2" />
                    {error}
                </div>
            )}

            {/* LOADING */}
            {loading && (
                <div className="bg-[#222] border border-[#A87C2D] mb-4 p-3 rounded-lg flex items-center text-sm">
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                    Loading...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div>
                    <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider block mb-1.5">
                        Email Address
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2.5 bg-[#161616] border border-white/10 rounded-lg focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/20 outline-none transition"
                        placeholder="example@email.com"
                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-[#D3CDC3]/70 uppercase tracking-wider">Password</label>
                    </div>

                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-2.5 bg-[#161616] border border-white/10 rounded-lg focus:border-[#A87C2D] focus:ring-2 focus:ring-[#A87C2D]/20 outline-none transition"
                        placeholder="********"
                    />
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked)}
                            />

                            <label
                                htmlFor="remember"
                                className="text-sm text-[#D3CDC3]/70 cursor-pointer"
                            >
                                Remember Me
                            </label>
                        </div>

                        <span className="text-[#A87C2D] text-xs cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#A87C2D] hover:bg-[#c2923c] text-black font-semibold py-2.5 rounded-lg transition transform active:scale-[0.99]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <AiOutlineLoading3Quarters className="animate-spin text-white" /> Loading...
                        </span>
                    ) : "Sign in"}
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 text-xs text-[#D3CDC3]/40">
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                    OR
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                {/* GOOGLE */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-lg hover:bg-white/10 transition"
                >
                    <FcGoogle />
                    Sign in with Google
                </button>

                {/* REGISTER */}
                <p className="text-center text-xs text-[#D3CDC3]/50">
                    Don’t have an account?{" "}
                    <span className="text-[#A87C2D] cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>

            </form>
        </div>
    );
}