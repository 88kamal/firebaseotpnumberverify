
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/router';
function Home() {
  const router = useRouter()
  const [number, setNumber] = useState()
  const [otp, setOtp] = useState('')
  const [result, setResult] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  // recaptch-container

  const setUpRecaptcha = (number) => {
    const verifyCaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
    verifyCaptcha.render();
    return signInWithPhoneNumber(auth, number, verifyCaptcha)
  }


  const getOtp = async (e) => {
    e.preventDefault()
    setError("")
    if (number === "" || number === undefined) return setError(<div className=' text-red-500'>
      Please Enter Valid Number
    </div>);
    try {
      const res = await setUpRecaptcha(number)
      setResult(res)
      setShow(true)

    } catch (error) {
      setError(error.message)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    if (otp === "" || otp === undefined) return;

    try {
     const res = await result.confirm(otp)
     console.log(res)
      router.push('/signup')
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(auth)
  return (
    // <div className="App">
    //     <h1>Signup With Phone Number</h1>
    //     <form onSubmit={getOtp} style={{ display: !show ? "block" : "none" }}>
    //         <PhoneInput
    //             placeholder="Enter phone number"
    //             value={number}
    //             onChange={setNumber} />
    //         <div id='recaptcha-container'></div>
    //         <button type='submit'>Send Otp</button>
    //     </form>
    //     <form onSubmit={verifyOtp} style={{ display: show ? "block" : "none" }}>
    //         <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
    //         <button type='submit'>Send Otp</button>
    //     </form>
    // </div>

    <div>

      <div class=" container mx-auto my-64 p-4 w-full max-w-sm rounded-lg   sm:p-6 md:p-8  " style={{ background: !show ? "#00afff61" : "none", }}>


        <form class="space-y-6 " onClick={getOtp} style={{ display: !show ? "block" : "none" }} >
          <h5 class="text-xl font-medium  dark:text-white">Firebase Phone Number Verification</h5>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium  dark:text-gray-300">Enter your phone number</label>
            <PhoneInput class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter phone number"
              value={number}
              onChange={setNumber} />
          </div>
          <div className=' text-center' id='recaptcha-container'></div>
          {error && <div className=' text-red-900 text-center'>
            {error} </div>}
          <button type="submit" class="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Otp</button>
        </form>
      </div>




      <div class=" container mx-auto my-64 p-4 w-full max-w-sm rounded-lg  sm:p-6 md:p-8 " style={{ background: show ? "rgb(11 255 187 / 79%)" : "none", }} >


        <form class="space-y-6 " onClick={verifyOtp} style={{ display: show ? "block" : "none" }} >
          <h5 class="text-xl font-medium  dark:text-white">Firebase Phone Number Verification</h5>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium  dark:text-gray-300">Enter your otp</label>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" name="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div id='recaptcha-container'></div>
          {error && <div className=' text-red-900 text-center'>
            {error} </div>}
          <button type="submit" class="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">login</button>
        </form>
      </div>

    </div >
  );
}

export default Home;

