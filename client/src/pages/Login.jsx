import React, { useState } from 'react'
import { assets } from '../assets/assets'

function Login() {
  const [state, setState] = useState('sign up') // toggle between "sign up" and "login"

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Auth Card */}
      <div className="bg-slate-900 text-white p-10 rounded-lg shadow-lg w-full sm:w-[400px]">
        <h2 className="text-2xl font-bold mb-2">
          {state === 'sign up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-gray-400 mb-6">
          {state === 'sign up' ? 'Create your account' : 'Login to your account'}
        </p>

        <form className="space-y-4">
          {/* Show only in sign up */}
          {state === 'sign up' && (
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                className="bg-transparent outline-none w-full"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="" className="w-5 h-5" />
            <input
              className="bg-transparent outline-none w-full"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="" className="w-5 h-5" />
            <input
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2.5 rounded-full font-semibold"
          >
            {state === 'sign up' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm mt-4">
          {state === 'sign up'
            ? 'Already have an account?'
            : "Don’t have an account?"}{' '}
          <span
            className="text-blue-400 font-semibold cursor-pointer"
            onClick={() => setState(state === 'sign up' ? 'login' : 'sign up')}
          >
            {state === 'sign up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
