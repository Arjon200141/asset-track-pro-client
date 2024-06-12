import { useLoaderData } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Swal from "sweetalert2";

const UpdateAsset = () => {
    const loader = useLoaderData();
    console.log(loader);

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const quantity = form.quantity.value;
        const status = form.status.value;
        const updatedAsset = { type,quantity,status };
        console.log(updatedAsset);
        fetch(`https://assettrack-pro-server.vercel.app/assets/${loader._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedAsset)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Asset Updated Successfully!!',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                }
            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-lime-50 mb-12 py-8">
                <h2 className="text-4xl text-center font-semibold ">Update Details of : {loader.productName}</h2>
                <form className="md:mx-36 py-10 text-lg" onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 justify-between gap-6">
                        <div className="px-2">
                            <p>Product Name</p> <br />
                            <input type="text" name="name" id="" defaultValue={loader.productName} className="w-full h-12 rounded-md px-8" readOnly /> <br />
                        </div>
                        <div className="px-2 ">
                            <p>Product Type</p> <br />
                            <input type="text" name="type" id="" defaultValue={loader.productType} className="w-full h-12 rounded-md px-8" /> <br />
                        </div>
                        <div className="px-2">
                            <p>Product Quantity</p> <br />
                            <input type="text" name="quantity" defaultValue={loader.productQuantity} id="" className="w-full h-12 rounded-md px-8" /> <br />
                        </div>
                        <div className="px-2 ">
                            <p>Stock Status</p> <br />
                            <input type="text" name="status" defaultValue={loader.stockStatus} id="" className="w-full h-12 rounded-md px-8" /> <br />
                        </div>
                        <input type="submit" value="Update Asset Details" className="w-full h-12 rounded-lg my-8 bg-[#D2B48C] font-semibold" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAsset;