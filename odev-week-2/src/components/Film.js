import { useState, useEffect } from "react";
import axios from "axios";

const Film = ({ url }) => {
    const [title, setTitle] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const fetchFilms = async (url) => {
        const res = await axios.get(url);
        const results = await res.data;
        setIsloading(false);
        return results;
    };

    useEffect(() => {
        const showFilms = async (url) => {
            const fetchData = await fetchFilms(url);
            setTitle(fetchData.title);
        };
        showFilms(url);
    }, []);

    return (
        <>
            {isLoading ? (
                <span>  </span>
            ) : (
                <span> ({title}) </span>
            )}
        </>
    );
};

export default Film;
