export const consumtionQueries = {
    getAllIndexedValues: `
        Select * From indexed_values
    `,
    getMeterById: `
        Select * from meters Where id = $1
    `
}