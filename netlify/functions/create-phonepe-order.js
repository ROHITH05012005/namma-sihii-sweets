import crypto from 'crypto';
import axios from 'axios';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { orderId, amount, userId, userPhone } = JSON.parse(event.body);

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    
    // Production PhonePe Endpoint
    const baseUrl = 'https://api.phonepe.com/apis/hermes';

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: orderId,
      merchantUserId: userId || 'MUID123',
      amount: Math.round(amount * 100), // Convert to paise
      redirectUrl: `https://namma-sihii-sweets.netlify.app/payment-status?transactionId=${orderId}`,
      redirectMode: 'REDIRECT',
      callbackUrl: `https://namma-sihii-sweets.netlify.app/api/verify-phonepe-payment`,
      mobileNumber: userPhone || '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString('base64');
    
    const endpoint = '/pg/v1/pay';
    const stringToSign = base64Payload + endpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
    const checksum = sha256 + '###' + saltIndex;

    const options = {
      method: 'post',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: base64Payload
      }
    };

    const response = await axios(options);

    if (response.data && response.data.success) {
      const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, redirectUrl })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'PhonePe API Error', data: response.data })
      };
    }

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
