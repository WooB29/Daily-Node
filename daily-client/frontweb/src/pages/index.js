import React, { useEffect } from 'react';
import { verifyTokens } from '../utils/token';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        verifyTokens(navigate);
    },[navigate])
    
  return (
    <div>
        <h1>Hello</h1>
    </div>
    );
}

export default Index;