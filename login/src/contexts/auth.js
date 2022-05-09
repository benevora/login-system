import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();



  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);


  // ======== signin ====================
  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    
    const hasUser = usersStorage?.filter((user) => user.email === email);
    
    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "Incorrect email or password";
      }
      
    } else {
      return "User not registered";
    }
  };
  
  
  
  
  
  // ======== signup ====================
  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    
    const hasUser = usersStorage?.filter((user) => user.email === email);
    
    if (hasUser?.length) {
      return "Already have an account with this email";
    }
    
    let newUser;
    
    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }
    
    localStorage.setItem("users_db", JSON.stringify(newUser));
    
    return;
  };
  
  // ======== signout ====================
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  // ====================== return of values ========================================
  return (
    <AuthContext.Provider
     value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};