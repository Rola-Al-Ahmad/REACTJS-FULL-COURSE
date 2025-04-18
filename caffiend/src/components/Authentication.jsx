import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Authentication = ({ handleCloseModal }) => {
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)
    const [showPasswordInput, setShowPasswordInput] = useState(false)

    const { signup, login } = useAuth()

    async function handleAuthenticate() {

        if (!email) {
            setError('Please enter an email')
            return
        }

        if (!email.includes('@') || !email.includes('.com')) {
            setError('Please enter a valid email')
            return
        }
        if (!password) {
            setError('Please enter a password')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (isAuthenticating) {
            return
        }

        // if (!email || !email.includes('@')
        //     || !password || password.length < 6
        //     || isAuthenticating) { return }


        try {
            setIsAuthenticating(true)
            setError(null)

            if (isRegistration) {
                // register a user
                await signup(email, password)
            } else {
                // login a user
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            if (err.code === 'auth/email-already-in-use') {
                setError('Email already in use')
            }
            else if (err.code === 'auth/invalid-email') {
                setError('Invalid email')
            }
            else if (err.code === 'auth/invalid-credential') {
                setError("Incorrect email or password")
            }
            else {
                setError(err.code)
            }

        } finally {
            setIsAuthenticating(false)
        }

    }
    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p>
            {error && (
                <p className='text-red-500 text-sm'>{error}</p>
            )}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"
                className="focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <div className="relative w-full">
                <input id="password" value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="Enter password"
                    type={showPasswordInput ? 'text' : 'password'}
                    className="focus:outline-none focus:ring-1 focus:ring-blue-300"
                />

                {
                    <i
                        className={`fa-solid ${showPasswordInput ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2`}
                        onClick={() => setShowPasswordInput(!showPasswordInput)}
                    ></i>
                }
            </div>

            <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign in' : 'Sign up'}</p></button>
            </div>
        </>
    )
}

export default Authentication