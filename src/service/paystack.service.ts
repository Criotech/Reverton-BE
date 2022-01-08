import httpStatus from 'http-status';
import paystackAxiosInstance from '../utils/payStackAxiosInstance';
import ApiError from '../utils/apiError';

interface InitializeDeposit {
    amount: number;
    email: string;
    fullName: string;
    userId: string
}

const initializeDeposit = async (data: InitializeDeposit) => {
  const paymentData = {
    amount: data.amount * 100,
    email: data.email,
    full_name: data.fullName,
    metadata: { userId: data.userId }
  };

  try {
    const initialize = await paystackAxiosInstance.post('/transaction/initialize', paymentData);

    return initialize.data.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.response.data.message);
  }
};

const verifyDeposit = async (ref: string) => {
  try {
    const verificationResp = await paystackAxiosInstance.get(`/transaction/verify/${encodeURIComponent(ref)}`);

    return verificationResp.data.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.response.data.message);
  }
};

export {
  initializeDeposit,
  verifyDeposit
};
