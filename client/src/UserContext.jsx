import { createContext, useEffect } from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
export const UserContext = createContext({});
import axios from "axios"
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:4000/profile').then(({ data }) => {
                setUser(data);
                setReady(true)
            });
        }
    }, []); // Add user as a dependency

    return (
        <UserContext.Provider value ={{ user ,setUser ,ready}} >
            {children}
       </UserContext.Provider>
    )
}
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired // Validate children prop
};