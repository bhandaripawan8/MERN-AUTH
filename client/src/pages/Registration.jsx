import React, { useState } from 'react';
import '../pages/Registration.css';

export default function Registration() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    async function handleForm(e) {
        e.preventDefault();

        if (!name || !password) {
            alert('Please fill the required fields');
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await fetch('http://localhost:3001/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                }),
            });

            if (!response.ok) {
                console.log('Registration error:', response);
                setemail('');
                setshowErrorMessage(true);
                return;
            }

            const responseData = await response.json();
            if (responseData.status === 'ok') {
                console.log('Registration successful');
                alert('Registration successful, welcome to your App');
                setshowErrorMessage(false);
            } else {
                console.log('Registration error:', responseData);
                setemail('');
                setshowErrorMessage(true);
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
        } finally {
            setIsSubmitting(false);
            setname('');
            setemail('');
            setpassword('');
        }
    }

    return (
        <>
            <div className='form'>
                <div className="form-content">
                    <form onSubmit={handleForm}>
                        <h2>Registration</h2>
                        <label htmlFor="username" className='form-label'>Username:</label>
                        <br/>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} className='field'/>
                        <br/>
                        <label htmlFor="username" className='form-label' >Email:</label>
                        <br/>
                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className='field'/>
                        <br/>
                        <label htmlFor="password" className='form-label'>Password:</label>
                        <br/>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className='field'/>
                        <br/>
                        <br/>
                        <button className='btn' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <br/>
                        {showErrorMessage && <p>Email address already exists, please login.</p>}
                    </form>
                </div>
            </div>
        </>
    );
}
