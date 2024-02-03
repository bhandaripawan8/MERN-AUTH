import React, { useState } from 'react';
import './Registration.css';
import {useNavigate} from 'react-router-dom';

export default function Registration() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [showErrorMessage, setshowErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

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
                return;
            }

            const responseData = await response.json();
            if (responseData.status === 'ok') {
                console.log('Registration successful');
                navigate('api/login');
            } else if (responseData.status === 'error' && responseData.error === 'email already exists') {
                setemail('');
                setshowErrorMessage(true);
            } else {
                console.log('Registration error:', responseData);
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
                        {showErrorMessage && <p>Email address already exists</p>}
                    </form>
                </div>
            </div>
        </>
    );
}
