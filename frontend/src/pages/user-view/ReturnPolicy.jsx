import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-12">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>

      <p className="text-gray-700 mb-4">
        At UrbanVibe, customer satisfaction is our top priority. If you are not
        completely satisfied with your purchase, we are here to help.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Returns
      </h2>
      <p className="text-gray-700 mb-4">
        Products can be returned within 7 days of delivery. Items must be unused,
        in original packaging, and in the same condition as received.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Refunds
      </h2>
      <p className="text-gray-700 mb-4">
        Once we receive your returned item, we will inspect it and notify you
        about the status of your refund. Approved refunds will be processed
        within 5–7 business days.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Non-returnable Items
      </h2>
      <p className="text-gray-700">
        Gift cards, discounted items, and personal care products are
        non-returnable.
      </p>
    </div>
  );
};


export default ReturnPolicy
