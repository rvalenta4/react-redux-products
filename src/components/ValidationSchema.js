import * as Yup from 'yup'

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    number: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Max of 4 digits!')
        .required('Required'),
    weight: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too Heavy!')
        .required('Required'),
    packaging: Yup.string()
        .required('Required'),
    availableSince: Yup.date()
        .min('2000-01-01', '21st century only!')
        .max('2099-12-32', '21st century only!')
        .required('Required'),
    manufacturer: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    origin: Yup.string()
        .required('Required'),
    pricingFrom: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too expensive!')
        .required('Required'),
    pricingTo: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too expensive!')
        .required('Required')
        .when('pricingFrom', ((pricingFrom, schema) => {
            if (pricingFrom) return schema.min(pricingFrom, '↑to or ↓from')
            return schema
        })),
    quantity: Yup.number()
        .min(0, 'Cannot be negative!')
        .max(9999, 'Too many items!')
        .required('Required'),
})

export default ValidationSchema