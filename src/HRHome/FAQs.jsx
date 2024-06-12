const FAQs = () => {
    return (
        <div>
            <h2 className="text-3xl font-semibold text-center my-6">Frequently Asked Questions</h2>
            <div className="flex gap-12 ">

                <div className="flex-1">
                    <img src="https://i.ibb.co/27BQGTv/faqs-concept-illustration-114360-5185.jpg" alt="" />
                </div>
                <div className="flex-1 mt-6">
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What types of assets can be tracked using AssetTrack Pro?
                        </div>
                        <div className="collapse-content">
                            <p> AssetTrack Pro allows you to track both returnable and non-returnable assets. Returnable assets include items such as laptops, keyboards, mice, chairs, desks, and cell phones. Non-returnable assets include items like pens, pencils, paper, diaries, and tissue paper.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            How can AssetTrack Pro help manage company assets more efficiently?
                        </div>
                        <div className="collapse-content">
                            <p> AssetTrack Pro provides a user-friendly interface for tracking the allocation and usage of company assets. HR managers can easily assign assets to employees, monitor their condition, and ensure timely returns of returnable items. This helps in reducing asset loss, improving accountability, and optimizing resource utilization.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Can I generate reports on asset usage and allocation with AssetTrack Pro?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, AssetTrack Pro offers robust reporting features. HR managers can generate detailed reports on asset usage, allocation, and return status. These reports can be customized based on different parameters such as department, employee, or asset type, providing valuable insights into asset management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;