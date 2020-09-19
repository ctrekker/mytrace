import { useEffect, useState } from 'react';
import Config from '../Config';

function RequireAuth(props) {
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    Config.sendRequest('/api/users', 'GET')
      .then(user => {
        if(user) {
          setAuthorized(true);
        }
      })
      .catch(() => {
        setAuthorized(false);
      });
  });
  
  if(!authorized) {
    return props.not;
  }
  
  return props.children;
}

export default RequireAuth;