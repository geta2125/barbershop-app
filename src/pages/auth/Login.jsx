import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setError("")

        setTimeout(() => {
            // VALIDASI LOGIN
            if (
                dataForm.email === "geta@gmail.com" &&
                dataForm.password === "2125"
            ) {
                localStorage.setItem("user", JSON.stringify(dataForm))
                navigate("/")
            } else {
                setError("Email atau password salah")
            }

            setLoading(false)
        }, 1000)
    };

    const errorInfo = error ? (
        <div className="bg-[#7A1F2D]/20 border border-[#7A1F2D] mb-5 p-4 text-sm text-[#D3CDC3] rounded flex items-center">
            <BiError className="text-[#7A1F2D] me-2 text-lg" />
            {error}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-[#222323] border border-[#7A1F2D] mb-5 p-4 text-sm text-[#D3CDC3] rounded flex items-center">
            <AiOutlineLoading3Quarters className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-[#D3CDC3] mb-6 text-center">
                Welcome Back 👋
            </h2>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Email Address
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#7A1F2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#7A1F2D] focus:ring-2 focus:ring-[#7A1F2D]/30 outline-none"
                        placeholder="you@example.com"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-[#D3CDC3]/70 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 bg-[#222323] border border-[#7A1F2D] rounded-lg 
                        text-[#D3CDC3] placeholder-[#D3CDC3]/60 
                        focus:border-[#7A1F2D] focus:ring-2 focus:ring-[#7A1F2D]/30 outline-none"
                        placeholder="********"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#7A1F2D] hover:bg-[#641824] text-white font-semibold py-2 rounded-lg transition shadow-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
}