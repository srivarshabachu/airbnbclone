import  { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AccountPage() {
    const { ready, user } = useContext(UserContext); 
    const { subpage } = useParams();
    if (!ready) {
        return "Loading .....";
    }

    if (ready && !user) {
        return <Navigate to="/login" />;
    }
    function linkclasses(type = null) {
        let classes = 'py-2 px-6'
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes +=' bg-pink text-white rounded-full'
        }
        return classes
    }
    return (
        <div>
        <nav className="w-full flex justify-center mt-8 gap-4">
            <Link to={'/account'} className={linkclasses('profile')}>My Profile</Link>  
                <Link to={'/account/bookings'} className={linkclasses('bookings')}>My bookings</Link>  
                <Link to={'/account/places'} className={linkclasses('places')}>My Places</Link>  
        </nav>
        </div>
    );
}
