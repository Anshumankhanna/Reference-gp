import jwt from 'jsonwebtoken';

const { sign } = jwt;

const generateToken = (user) => {
    return sign({ 
        enrollmentNumber: user.enrollmentNumber,
        email: user.email,
        id: user._id }, process.env.JWT_KEY);
}

const _generateToken = generateToken;
export { _generateToken as generateToken };