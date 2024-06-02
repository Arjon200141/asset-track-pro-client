import Navbar from "../Home/Navbar";

const AddAssetList = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-sky-50">
            <div className="mx-96">
                <div className="hero min-h-screen ">
                    <div className=" w-full shadow-2xl bg-sky-100 rounded-xl">
                        <h2 className="text-4xl font-semibold text-center mt-8">Add an Asset</h2>
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Product Name</span>
                                </label>
                                <input type="text" name="productname" placeholder="Product Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Product Type</span>
                                </label>
                                <input type="text" name="producttype" placeholder="Product Type" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Product Quantity</span>
                                </label>
                                <input type="text" name="productquantity" placeholder="Product Quantity" className="input input-bordered" />
                            </div>
                            
                            <div className="mb-8">
                                <button className="btn bg-sky-200 py-1 px-6 w-full my-4 text-2xl font-semibold">Add Asset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AddAssetList;