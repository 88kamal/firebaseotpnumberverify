import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { auth } from '../firebaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
function Signup() {
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [result, setResult] = useState('')
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    // Creating Recaptcha Function 
    const setUpRecaptcha = (number) => {
        const verifyRecaptcha = new RecaptchaVerifier("recaptch-container", {}, auth);
        verifyRecaptcha.render()
       return signInWithPhoneNumber(auth, number, verifyRecaptcha)


    }

    // const setUpReCaptcha = (number) => {
    //     const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth)
    //     recaptcha.render()
    //     return signInWithPhoneNumber(auth, number, recaptcha)

    // };

    // Creatng getOtp Function
    // const getOtp = async (e) => {
    //     setError("")
    //     e.preventDefault()

    //     if (number === "" || number === undefined)
    //         return setError("Please Enter Valid Number")
    //     try {
    //         const res = await setUpRecaptcha(number)
    //         setResult(res)
    //         setShow(true)
    //     } catch (error) {
    //         setError(error.message)
    //         console.log(error.message)
    //     }
    // }

    const getOtp = async (e) => {
        e.preventDefault()
        setError("")

        // console.log(number)
        if (number === "" || number === undefined)
            return setError("Please enter valid number")
        try {
            const res = await setUpRecaptcha(number)
            setResult(res)
            setflag(true)
        } catch (error) {
            // setError(error.message)
            console.log(error.message)
        }
    }

    // Creating verify Otp Function 

    // const verifyOtp = async (e) => {
    //     e.preventDefault()
    //     try {
    //         if (otp === "" || otp === undefined) return
    //         await result.confirm(otp)
    //     } catch (error) {
    //         setError(error)
    //     }
    // }
    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return ;
        try {
            const res = await result.confirm(otp);
            console.log(res)
            router.push("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <div>

                <div class=" container mx-auto my-64 p-4 w-full max-w-sm rounded-lg border border-gray-200 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 shadow-2xl" style={{
                    background: '#ffffff0a',
                    backdropFilter: 'blur(50000px)',
                }}>


                    <form class="space-y-6 " onClick={getOtp} style={{ display: !show ? "block" : "none" }} >
                        <h5 class="text-xl font-medium text-gray-100 dark:text-white">Firebase Phone Number Verification</h5>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-100 dark:text-gray-300">Enter your phone number</label>
                            <PhoneInput class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Enter phone number"
                                value={number}
                                onChange={setNumber} />
                        </div>
                        <div id='recaptcha-container'></div>
                        {error && <div className=' text-red-900 text-center'>
                            {error} </div>}
                        <button type="submit" class="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Otp</button>
                    </form>
                </div>




                <div class=" container mx-auto my-64 p-4 w-full max-w-sm rounded-lg  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 shadow-2xl" >


                    <form class="space-y-6 " onClick={verifyOtp} style={{ display: show ? "block" : "none" }} >
                        <h5 class="text-xl font-medium text-gray-100 dark:text-white">Firebase Phone Number Verification</h5>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-100 dark:text-gray-300">Enter your otp</label>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" name="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div id='recaptcha-container'></div>
                        {error && <div className=' text-red-900 text-center'>
                            {error} </div>}
                        <button type="submit" class="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Otp</button>
                    </form>
                </div>

            </div >
        </div>
    )
}

export default Signup