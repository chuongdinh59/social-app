import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

// Custom hook for handling navigation based on the isChangePassword value
export function useChangePasswordNavigation() {
  const navigate = useNavigate();
  const { profile: user } = useContext(UserContext);
  /**
   * if role === LECTURER && status === DeACTIVE --> change password
   *
   */
  // Function to navigate to the "/change-password" route if isChangePassword is false
  console.log(user);
  useEffect(() => {
    if (Object.keys(user).length !== 0 && user.role.name === 'ROLE_LECTURER' && user.status === 'DEACTIVE') {
      console.log('Chuyển');
      navigate('/change-password');
    }
  }, [user.status]);
}
