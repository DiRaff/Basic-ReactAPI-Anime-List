// src/components/DataTable.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DataListPage.css';

function DataTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/anime')
            .then(response => setData(response.data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            <h2 className="title">Jikan Moe Anime List Terbaru</h2> 
            <div className="card-grid">
                {data.map((anime) => (
                    <div className="card" key={anime.mal_id}>
                        <img src={anime.images.jpg.image_url} alt={anime.title} className="card-image" />
                        <div className="card-content">
                            <h3 className="card-title">{anime.title}</h3>
                            <p className="card-description">{anime.synopsis ? anime.synopsis.slice(0, 100) + '...' : 'No description available.'}</p>
                            <p>Episodes: {anime.episodes || 'N/A'}</p>
                            <Link className="detail-link" to={`/detail/${anime.mal_id}`}>
                                View Detail
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataTable;
