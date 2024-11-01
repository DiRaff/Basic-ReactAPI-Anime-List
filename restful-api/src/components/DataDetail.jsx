// src/components/DataDetail.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DataDetailPage.css';

function DataDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/anime/${id}`)
            .then(response => setData(response.data.data))
            .catch(error => console.error('Error fetching detail:', error));
    }, [id]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="detail-container">
            {/* Main Header dengan judul di tengah dan tombol kembali */}
            <div className="main-header">
                <h2 className="title">Jikan Moe Anime List Terbaru</h2>
                <button className="back-button" onClick={() => navigate(-1)}>Back to Menu</button>
            </div>
            
            {/* Header judul anime */}
            <div className="header">
                <h2 className="detail-title">{data.title}</h2>
            </div>

            {/* Pindahkan sinopsis ke bagian paling atas */}
            <p className="synopsis"><strong>Synopsis:</strong> {data.synopsis || 'No synopsis available.'}</p>

            <div className="detail-content">
                <img src={data.images.jpg.image_url} alt={data.title} className="detail-image" />
                <div className="detail-info">
                    {/* Kolom pertama */}
                    <div className="column">
                        <p><strong>Type:</strong> {data.type || 'N/A'}</p>
                        <p><strong>Episodes:</strong> {data.episodes || 'N/A'}</p>
                        <p><strong>Status:</strong> {data.status || 'N/A'}</p>
                        <p><strong>Score:</strong> {data.score || 'N/A'}</p>
                        <p><strong>Rank:</strong> {data.rank || 'N/A'}</p>
                    </div>
                    {/* Kolom kedua */}
                    <div className="column">
                        <p><strong>Popularity:</strong> {data.popularity || 'N/A'}</p>
                        <p><strong>Members:</strong> {data.members || 'N/A'}</p>
                        <p><strong>Favorites:</strong> {data.favorites || 'N/A'}</p>
                        <p><strong>Duration:</strong> {data.duration || 'N/A'}</p>
                        <p><strong>Rating:</strong> {data.rating || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Info tambahan */}
            <div className="additional-info">
                <p><strong>Release Date:</strong> {data.aired.string || 'N/A'}</p>
                <p><strong>Studios:</strong> {data.studios.map(studio => studio.name).join(', ') || 'N/A'}</p>
                <p><strong>Season:</strong> {data.season || 'N/A'}</p>
                <p><strong>Genres:</strong> {data.genres.map(genre => genre.name).join(', ') || 'N/A'}</p>
            </div>
        </div>
    );
}

export default DataDetail;
