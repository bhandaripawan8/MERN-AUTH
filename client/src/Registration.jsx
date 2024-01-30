import React, { useState } from 'react'

export default function Registration() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    function handleForm(e){
        e.preventDefault();
        if(name && password) {
            console.log('Form submitted with:', {username, password})
            setname('')
            setpassword('')
        } else{
            alert('Please fill the required fields')
        }

    }
  return (
    <>
    <form onSubmit={handleForm}>
        <label htmlFor="username" >Username</label>
        <br/>
        <input type="text" Value = {name} onChange = {(e) => setname(e.target.value)}/>
        <br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
        <br/>
        <br/>
        <button>Submit</button>
    </form>
     </>
  )
}
