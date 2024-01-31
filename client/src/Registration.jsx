import React, { useState } from 'react'
import './Registration.css'

export default function Registration() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');

   async function handleForm(e){
        e.preventDefault();
        if(name && password) {
            console.log('Form submitted with:', {name, password})
            setname('');
            setpassword('');
        } else{
            alert('Please fill the required fields')
        }
        const response = await fetch('http://localhost:3001/api/registration',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        })
        console.log(response);
        }

  return (
    <>
    <div className='form'>
        <div className="form-content">
            <form onSubmit={handleForm}>
                <h2>Registration</h2>
                <label htmlFor="username" className='form-label'>Username:</label>
                <br/>
                <input type="text" value = {name} onChange = {(e) => setname(e.target.value)} className='field'/>
                <br/>
                <label htmlFor="username" className='form-label' >Email:</label>
                <br/>
                <input type="text" value = {email} onChange = {(e) => setemail(e.target.value)} className='field'/>
                <br/>
                <label htmlFor="password" className='form-label'>Password:</label>
                <br/>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className='field'/>
                <br/>
                <br/>
                <button className='btn'>Submit</button>
            </form>
        </div>
    </div>
     </>
  )
}
