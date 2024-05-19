import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import Perks from "./Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios"
export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extrainfo, setExtrainfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxguests, setMaxguests] = useState(1)
    const [redirect, setRedirect] = useState()
    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('http://localhost:4000/places', {
            title, address, photos,
            description, perks, extrainfo,
            checkIn, checkOut, maxguests
        }, { withCredentials: true });
        setRedirect('account/places');
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            {action != 'new' && (
                <div className="text-center mt-5">
                    <Link className="inline-flex gap-1 bg-pink text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action == 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-2xl">Title</h2>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                        <h2 className="text-2xl">Address</h2>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        <h2 className="text-2xl">Photos</h2>

                        <h2 className="text-2xl">Description</h2>
                        <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                        <h2 className="text-2xl">Perks</h2>
                        <PhotosUploader photos={photos} onChange={setPhotos} />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">

                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        <h2 className="text-2xl">Extra Info</h2>
                        <textarea placeholder="" value={extrainfo} onChange={ev => setExtrainfo(ev.target.value)}></textarea>
                        <h2 className="text-2xl">Check in & Check out times</h2>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                            <div>
                                <h3>Check in time</h3>
                                <input type="text" placeholder="14:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} /></div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text" placeholder="14:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} /></div>
                            <div>
                                <h3>Check max number of guests</h3>
                                <input type="number" placeholder="2" value={maxguests} onChange={ev => setMaxguests(ev.target.value)} />
                            </div>
                        </div>
                        <button type="submit" className="w-full gap-1 bg-pink text-white py-2 px-6 rounded-full">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}