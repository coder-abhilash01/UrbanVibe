const addressModel = require("../../model/address.model");


const addAddress = async (req, res) => {
    try {

        const { address, city, state, pincode, phone, country, notes } = req.body;
        const userId = req.user.id

        if (!address || !city || !state || !pincode || !phone || !country) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"

            })
        }

        const createdAddress = await addressModel.create({
            userId,
            address,
            city,
            state,
            pincode,
            phone,
            country,
            notes: notes || ""
        })
        res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: createdAddress
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }

}


const fetchAddress = async (req, res) => {
    try {
          const userId = req.user.id

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required"
            })
        }

        const addressList = await addressModel.find({ userId })


        res.status(200).json({
            success: true,
            message: "Address fetched successfully",
            data: addressList
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
          const userId = req.user.id
        const FormData = req.body;
        if (!addressId) {
            return res.status(400).json({
                success: false,
                message: "Address id are required"
            })
        }
        const address = await addressModel.findOneAndUpdate({ _id: addressId, userId },
            FormData, { new: true });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}





const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
          const userId = req.user.id

        if (!addressId) {
            return res.status(400).json({
                success: false,
                message: "User and Address id are required"
            })
        }
        const address = await addressModel.findOneAndDelete({ _id: addressId, userId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


module.exports = { addAddress, fetchAddress, updateAddress, deleteAddress }