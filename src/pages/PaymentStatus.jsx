import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!transactionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`/api/verify-phonepe-payment?transactionId=${transactionId}`);
        const data = await response.json();

        if (data.success && data.status === 'PAYMENT_SUCCESS') {
          // Update order status in Firestore
          const orderRef = doc(db, 'orders', transactionId);
          await updateDoc(orderRef, {
            status: 'paid_phonepe'
          });
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [transactionId]);

  return (
    <div className="section container" style={{ textAlign: 'center', minHeight: '60vh', paddingTop: '100px' }}>
      <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px' }}>
        {status === 'verifying' && (
          <>
            <h2 style={{ color: 'var(--primary)' }}>Verifying Payment...</h2>
            <p>Please do not close this window.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <h2 style={{ color: '#28a745' }}>Payment Successful! 🎉</h2>
            <p style={{ margin: '20px 0' }}>Your order has been placed successfully.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <h2 style={{ color: '#dc3545' }}>Payment Failed ❌</h2>
            <p style={{ margin: '20px 0' }}>We could not process your payment. Please try again.</p>
            <button className="btn-primary" onClick={() => navigate('/checkout')}>Try Again</button>
          </>
        )}
        
        {status === 'error' && (
          <>
            <h2 style={{ color: '#dc3545' }}>Error occurred</h2>
            <p style={{ margin: '20px 0' }}>Something went wrong while verifying your payment.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>Return to Home</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
