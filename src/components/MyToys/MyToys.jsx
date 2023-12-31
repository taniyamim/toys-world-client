import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const MyToys = () => {
    const myToys = useLoaderData();
    console.log(myToys);
    const [toys, setToys] = useState(myToys);
    const { user } = useContext(AuthContext);
    console.log(user);

    // Filter the toys array based on the logged-in user's email
    const filteredToys = toys.filter((toy) => toy.sellerEmail === user.email);

    const handleDelete = (id) => {
        const proceed = confirm('Are you sure you want to delete?');
        if (proceed) {
            fetch(`https://toys-marketplace-server-taniyamim.vercel.app/toys/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your Toy has been deleted.',
                            'success'
                        )
                        const remaining = toys.filter((toy) => toy._id !== id);
                        setToys(remaining);
                    }
                })
                .catch((error) => {
                    console.log('Error deleting toy:', error);
                });
        }
    };

   

    return (
        <div className="m-5">
            {/* <h3>My Toys {filteredToys.length}</h3> */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* table head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Toy Details</th>
                            <th>Seller Details</th>
                            <th>Sub-Category</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Quantity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Generate table rows dynamically */}
                        {filteredToys.map((toy, index) => (
                            <tr key={index} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {toy.picture && (
                                                    <img
                                                        src={toy.picture}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{toy.toyName}</div>
                                            <div className="text-sm opacity-50">{toy.details}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {toy.sellerName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {toy.sellerEmail}
                                    </span>
                                </td>
                                <td>{toy.subCategory}</td>
                                <td>{toy.price}</td>
                                <td>{toy.rating}</td>
                                <td>{toy.availableQuantity}</td>
                                <td>
                                    <Link to={`/updateToy/${toy._id}`}>
                                        <button className="btn bg-sky-700 btn-sm text-white">
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(toy._id)}
                                        className="btn btn-sm btn-circle bg-red-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyToys;
