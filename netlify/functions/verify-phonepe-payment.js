import crypto from 'crypto';
import axios from 'axios';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { transactionId } = event.queryStringParameters;
    if (!transactionId) {
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing transactionId' }) };
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    
    // Production PhonePe Endpoint
    const baseUrl = 'https://api.phonepe.com/apis/hermes';
    const endpoint = `/pg/v1/status/${merchantId}/${transactionId}`;

    const stringToSign = endpoint + saltKey;
    const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
    const checksum = sha256 + '###' + saltIndex;

    const options = {
      method: 'get',
      url: `${baseUrl}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': merchantId
      }
    };

    const response = await axios(options);

    if (response.data && response.data.success && response.data.code === 'PAYMENT_SUCCESS') {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, status: 'PAYMENT_SUCCESS', data: response.data.data })
      };
    } else {
      return {
        statusCode: 200, 
        body: JSON.stringify({ success: false, status: response.data?.code || 'FAILED', data: response.data?.data })
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
