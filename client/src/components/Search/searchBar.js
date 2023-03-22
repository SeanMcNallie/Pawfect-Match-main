import { useEffect, useRef, useState } from "react";

export default function SearchBar({ searchHandler }) {
    const [postalCode, setPostalCode] = useState('');
    const [animalType, setAnimalType] = useState('dog');
    const onInputChange = (e) => {
        setPostalCode(e.target.value);
    }

    const onSelectChange = (e) => {
        console.log("SELECT VALUE", e.target.value);
        setAnimalType(e.target.value);
    }

    const onSubmitHandler = (e) => {
        console.log("HELLO? SUBMIT?")
        e.preventDefault();
        searchHandler({location: postalCode, animalType});
    }

    console.log("postalCode", postalCode);
    return (
        <>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitHandler}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Zip/Postal Code
                </label>
                <div class="relative">
                <input className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="searchText" placeholder="Zip/Postal Code" onChange={onInputChange} value={postalCode} />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                   Animal Type
                </label>
                <div class="relative">
                    <select onChange={onSelectChange} class="mb-2 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Bird</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button className="btn btn-md btn-info mb-2">
                    Find My New Best Friend
                </button>
            </div>
        </form>

        {/* <form onSubmit={onSubmitHandler}>
            <input type="text" name="searchText" onChange={onInputChange} value={postalCode} />
            <select onChange={onSelectChange}>
                <option>Dog</option>
                <option>Cat</option>
            </select>
            
            <button className="btn btn-md btn-info m-2">Find My New Best Friend</button>
        </form> */}
        </>
    );
}