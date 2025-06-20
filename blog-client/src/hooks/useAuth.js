import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
 // adjust path if needed

const useAuth = () => {
  return useContext(AuthContext)
};

export default useAuth;
