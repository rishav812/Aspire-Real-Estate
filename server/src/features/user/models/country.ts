import mongoose from "mongoose";

// Interface for country schema
interface ICountry {
    _id?: string | undefined,
    name: string;
    country_code: string;
}

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
});

const Country = mongoose.model<ICountry>("country", countrySchema);

export { Country, ICountry };
