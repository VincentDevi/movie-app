/* eslint-disable react/prop-types */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Carrousel } from "../components/Carousel/Carrousel";
import { Header } from "../components/Header/Header";
import { InputSelectGenre } from "../components/InputSelect/InputSelectGenre";
import { SelectGenre } from "../components/InputSelect/SelectGenre";
import { MobileNav } from "../components/MobileNav/MobileNav";
import { useFetch } from "../hooks/useFetch";
import { getUrlByGenre } from "../util/getListOfGenre";


export const MoviesPage = () =>{
    const {type} =useParams();
    const allGenres = useFetch("https://api.themoviedb.org/3/genre/"+type+"/list?api_key=1f23cb937d155a995019ffd894a97ddd");
    
    return (
        <div className="w-screen">  
            <Header/>
            { ( allGenres[0] ) ? <SelectGenre type={type}>{allGenres[0].genres}</SelectGenre> : <p>Loading</p>}

            <div className="h-contentMobile overflow-y-scroll overflow-x-hidden">
            { ( allGenres[0] ) ? <GenresCarrousel type={type}>{allGenres[0].genres}</GenresCarrousel> : <p>Loading</p>}
            </div>
            <MobileNav/>

        </div>
    );
}

const GenresCarrousel = ({type,children}) =>{
    return (
        <div className="mt-1">
        {children.map((item,index) =>
            <div key={index}>
                <h2 className="text-white text-xtra sm:text-enormous mb-5 mx-8 sm:mx-24">
                    <Link className="flex items-center" to={"/bygenre/"+type+"/"+item.name+"/"+item.id} >{item.name}
                        <div className="ml-2 w-3">
                            <img className="w-full h-auto" src="../../public/more.png" alt="show more" />
                        </div>
                    </Link>
                </h2>
                <Carrousel type={type}>{getUrlByGenre(type,item.id)}</Carrousel>
            </div>

        )}
        </div>
        
    );
}
