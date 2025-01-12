import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


export default function Github(){

    const data = useLoaderData()
    // const [data, setData] = useState([]);

    // useEffect(() => {

    //     fetch('https://api.github.com/users/7sandhu')
    //         .then(res => res.json())
    //         .then(res => {setData(res)})


    // },[])



    return (
        <>
            Github Followers : {data.followers}
        </>
    )

}


export const githubInfoLoader = async () => {

    const response = await fetch('https://api.github.com/users/7sandhu');
    return response.json();

}