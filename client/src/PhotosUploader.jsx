import axios from "axios"
import PropTypes from 'prop-types';
import { useState } from "react";
export default function PhotosUploader({photos,onChange}) {
    const [photolink, setPhotolink] = useState('');
    async function addPhotobyLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('http://localhost:4000/upload-by-link', { link: photolink });
        onChange(prev => {
            return [...prev, filename];
        });
    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('http://localhost:4000/upload', data, {
            headers: { "Content-Type": 'multipart/form-data' }
        }).then(response => {
            const { data: filename } = response;
            onChange(prev => {
                return [...prev, filename];
            });
        }
        )
    }
    return (
        <>
            <div className="flex gap-3">
                <input type="text" value={photolink} onChange={ev => setPhotolink(ev.target.value)} placeholder="Add using link...jpg" className=""></input>
                <button onClick={addPhotobyLink} className="bg-gray-200 px-4 text-black rounded-2xl grow">Add&nbsp;Photo</button>
            </div>
            <div className="flex gap-4">
                {photos.length > 0 && photos.map(link => (
                    <div key={link} className="h-32 flex m-5">
                        <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt='' />
                    </div>
                ))}
                <label className="flex gap-4 border cursor-pointer h-32  bg-transparent rounded-3xl m-5  py-10 px-10">
                    <input type="file" className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload from your device
                </label>

            </div>
        </>
    )
}

PhotosUploader.propTypes = {
    photos: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
};
